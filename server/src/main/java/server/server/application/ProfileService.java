package server.server.application;

import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.stereotype.Service;
import server.server.api.request.ProfileRequest;
import server.server.entity.Profile;
import server.server.repository.ProfileRepository;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final ProfileRepository profilerepository;

//    // 유저 인증
//    public Long getUserId(String sessionId) throws BadRequestException {
//        Session session = sessionRepository.findBySessionId(sessionId).orElseThrow();
//        if (!session.getIsValid()) {
//            throw new BadRequestException("Not logged in");
//        }
//
//        return session.getUserId();
//    }


    // profile 생성
    public Long create(String sessionId, ProfileRequest profileRequest) throws BadRequestException {

        // userId 조회 @Session
        // Long userId = getUserId(sessionId);
        long userId = 1L;

        // 현재 계정에 존재하는 프로필 개수 확인 - 3개 미만인지
        if (profilerepository.getProfilesNumber(userId) >= 3) {
            throw new BadRequestException("Cannot create more than 3 profiles");
        }

        // 프로필 생성
        Profile profile = profileRequest.toEntity(userId);

        return profilerepository.save(profile).getId();
    }

}