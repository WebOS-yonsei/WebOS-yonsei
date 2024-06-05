package server.server.application;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import server.server.entity.Contents;
import server.server.entity.Profile;
import server.server.entity.ProfileContents;
import server.server.entity.Session;
import server.server.repository.ContentsRepository;
import server.server.repository.ProfileContentsRepository;
import server.server.repository.ProfileRepository;
import server.server.repository.SessionRepository;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static server.server.entity.ProfileContents.State.COMPLETED;
import static server.server.entity.ProfileContents.State.WATCHING;

@Transactional
@Service
@RequiredArgsConstructor
public class ContentsService {
    private final ProfileRepository profileRepository;
    private final ProfileContentsRepository profileContentsRepository;
    private final ContentsRepository contentsRepository;
    private final SessionRepository sessionRepository;

    // contents list 조회
    public List<Contents> getContents() {
        return contentsRepository.findAll();
    }

    // 시청 시간 기록
    public void recordTime(final Long userId, Long sessionId, Long videoId, Float time) {
        Long profileId = getProfileId(userId, sessionId);

        final Optional<ProfileContents> profileContents = profileContentsRepository.findByProfileIdAndContentsId(profileId, videoId);
        if (profileContents.isEmpty()) {
            profileContentsRepository.save(
                    ProfileContents.builder()
                            .profileId(profileId)
                            .contentsId(videoId)
                            .time(time)
                            .state(WATCHING)
                            .build()
            );
            return;
        }

        final Contents content = contentsRepository.findById(videoId).orElseThrow(NoSuchElementException::new);

        // 1초 정도 남은 건 다 봤다고 생각
        if ( content.getDuration() <= (time + 1)){
            profileContents.get().setState(COMPLETED);
            time = 0F;
        }else{
            profileContents.get().setState(WATCHING);
        }
        profileContents.get().setTime(time);
    }

    private Long getProfileId(Long userId, Long sessionId) {
        final Session session = sessionRepository.findById(sessionId).orElseThrow(NoSuchElementException::new);
        Long profileId = session.getProfileId();
        final Profile profile = profileRepository.findById(profileId).orElseThrow(NoSuchElementException::new);
        if (!profile.checkUser(userId)) {
            throw new IllegalArgumentException("해당 프로필에 접근 권한이 있는 유저가 아닙니다.");
        }
        return profileId;
    }

    public Contents getContentInfo(final Long videoId){
        return contentsRepository.findById(videoId).orElseThrow(NoSuchElementException::new);
    }

    public Float getCurrentPlaybackTime(Long videoId, Long sessionId){

        final Session session = sessionRepository.findById(sessionId).orElseThrow(NoSuchElementException::new);
        final Long profileId = session.getProfileId();
        final Optional<ProfileContents> profileContents = profileContentsRepository.findByProfileIdAndContentsId(profileId, videoId);
        if (profileContents.isEmpty()) {
            return 0F;
        }
        return profileContents.get().getTime();
    }
}

