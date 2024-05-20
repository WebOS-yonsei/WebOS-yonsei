package server.server.application;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import server.server.api.request.ProfileRequest;
import server.server.entity.Contents;
import server.server.entity.Profile;
import server.server.entity.ProfileContents;
import server.server.repository.ContentsRepository;
import server.server.repository.ProfileContentsRepository;
import server.server.repository.ProfileRepository;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final ProfileRepository profilerepository;
    private final ProfileContentsRepository profilecontentsrepository;
    private final ContentsRepository contentsRepository;

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

    // profile list 조회
    public Set<Profile> getProfiles(String sessionId) {

        // userId 조회 @Session
        // Long userId = getUserId(sessionId);
        long userId = 1L;

        return profilerepository.findByUserId(userId);
    }

    public List<Contents> getContents(String sessionId, Long profileId) {

        // 로그인 확인 @Session

        List<Long> contentsIdSet = profilecontentsrepository.findByProfileIdAndState(profileId, ProfileContents.State.WATCHING)
                .stream()
                .map(ProfileContents::getContentsId)
                .collect(Collectors.toList());

        return contentsRepository.findAllById(contentsIdSet);
    }
}
