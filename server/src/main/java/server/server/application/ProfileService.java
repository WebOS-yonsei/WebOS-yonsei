package server.server.application;

import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.stereotype.Service;
import server.server.api.request.ProfileRequest;
import server.server.entity.Profile;
import server.server.entity.Session;
import server.server.repository.ProfileRepository;
import server.server.repository.SessionRepository;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final ProfileRepository profilerepository;
    private final SessionRepository sessionRepository;

    // profile 생성
    public Long create(String sessionId, ProfileRequest profileRequestDTO) throws BadRequestException {

        // userId 조회 @Session
        Session session = sessionRepository.findBySessionId(sessionId).orElseThrow();
        if(!session.getIsValid()) {
            throw new BadRequestException("Not logged in");
        }

        // 현재 계정에 존재하는 프로필 개수 확인 - 3개 미만인지
        Long userId = session.getUserId();
        if(profilerepository.getProfilesNumber(userId) >= 3){
            throw new BadRequestException("Cannot create more than 3 profiles");
        }

        // 프로필 생성
        profileRequestDTO.setUserId(session.getUserId());
        Profile profile = profileRequestDTO.toEntity();

        return profilerepository.save(profile).getId();
    }

}