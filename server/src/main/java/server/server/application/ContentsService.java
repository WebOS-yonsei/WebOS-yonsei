package server.server.application;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import server.server.entity.Contents;
import server.server.entity.Profile;
import server.server.entity.ProfileContents;
import server.server.repository.ContentsRepository;
import server.server.repository.ProfileContentsRepository;
import server.server.repository.ProfileRepository;

import java.util.Collections;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static server.server.entity.ProfileContents.State.WATCHING;

@Transactional
@Service
@RequiredArgsConstructor
public class ContentsService {
    private final ProfileRepository profileRepository;
    private final ContentsRepository contentsRepository;
    private final ProfileContentsRepository profileContentsRepository;

    // contents list 조회
    public List<Contents> getContents(final Long userId) {

        Optional<Contents> optionalContents = contentsRepository.findById(userId);
        if (optionalContents.isEmpty()) {
            throw new NoSuchElementException("Content not found with id: " + userId);
        }

        return Collections.singletonList(optionalContents.get());
    }

    // 시청 시간 기록
    public void recordTime(final Long userId, Long profileId, Long videoId, Float time) {
        final Profile profile = profileRepository.findById(profileId).orElseThrow(NoSuchElementException::new);
        if (!profile.checkUser(userId)) {
            throw new IllegalArgumentException("해당 프로필에 접근 권한이 있는 유저가 아닙니다.");
        }

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
        profileContents.get().setTime(time);
    }
}
