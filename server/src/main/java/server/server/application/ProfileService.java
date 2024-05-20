package server.server.application;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import server.server.api.request.ProfileRequest;
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
import java.util.stream.Collectors;

@Transactional
@Service
@RequiredArgsConstructor
public class ProfileService {

    private final ProfileRepository profilerepository;
    private final ProfileContentsRepository profilecontentsrepository;
    private final ContentsRepository contentsRepository;
    private final SessionRepository sessionRepository;

//    현재 로그인 된 유저 인증
//    public Long getUserId(String sessionId) throws BadRequestException {
//        Session session = sessionRepository.findBySessionId(sessionId).orElseThrow();
//        if (!session.getIsValid()) {
//            throw new BadRequestException("Not logged in");
//        }
//
//        return session.getUserId();
//    }

    // profile 생성
    public Long create(final Long userId, ProfileRequest profileRequest) {
        // 현재 계정에 존재하는 프로필 개수 확인 - 3개 미만인지
        if (profilerepository.getProfilesNumber(userId) >= 3) {
            throw new IllegalArgumentException("Cannot create more than 3 profiles");
        }

        // 프로필 생성
        Profile profile = profileRequest.toEntity(userId);

        return profilerepository.save(profile).getId();
    }

    public void chooseProfile(final Long sessionId, final Long profileId) {
        final Optional<Session> session = sessionRepository.findById(sessionId);
        if (session.isEmpty()) {
            throw new NoSuchElementException("해당 세션은 존재하지 않습니다.");
        }

        final Long userId = session.get().getUserId();
        final Optional<Session> profileSession = sessionRepository.findByUserIdAndProfileId(userId, profileId);

        if (profileSession.isPresent()) {
            throw new IllegalArgumentException("해당 프로필은 이미 다른 세션에서 사용중입니다");
        }

        session.get().enterProfile(profileId);
    }

    // profile list 조회
    public List<Profile> getProfiles(final Long userId) {
        return profilerepository.findByUserId(userId);
    }

    public List<Contents> getContents(final Long userId, Long profileId) {

        // 로그인 확인 @Session

        List<Long> contentsIdSet = profilecontentsrepository.findByProfileIdAndState(profileId, ProfileContents.State.WATCHING)
                .stream()
                .map(ProfileContents::getContentsId)
                .collect(Collectors.toList());

        return contentsRepository.findAllById(contentsIdSet);
    }

    public void exitProfile(final Long sessionId) {
        final Session session = sessionRepository.findById(sessionId).orElseThrow(NoSuchElementException::new);
        session.exitProfile();
    }
}
