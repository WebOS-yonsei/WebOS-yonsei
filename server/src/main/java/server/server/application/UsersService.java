package server.server.application;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import server.server.entity.Profile;
import server.server.entity.Session;
import server.server.entity.Users;
import server.server.repository.ProfileRepository;
import server.server.repository.SessionRepository;
import server.server.repository.UsersRepository;

import java.util.List;
import java.util.NoSuchElementException;

@RequiredArgsConstructor
@Service
public class UsersService {

    private final UsersRepository memberRepository;
    private final SessionRepository sessionRepository;
    private final ProfileRepository profileRepository;

    public Long join(final String loginId, final String password) {
        final Users member = Users
                .basicLogin()
                .loginId(loginId)
                .password(password)
                .build();
        return memberRepository.save(member).getId();
    }

    public Long login(final String loginId, final String password) {
        final Users member = memberRepository.getByLoginId(loginId);
        member.checkPassword(password);
        return member.getId();
    }

    public String loginId(final Long userId) {
        final Users user = memberRepository.findById(userId).orElseThrow(NoSuchElementException::new);
        return user.getLoginId();
    }

    public List<String> currentProfileInfo(final Long sessionId) {
        final Session session = sessionRepository.findById(sessionId).orElseThrow(NoSuchElementException::new);
        final Profile profile = profileRepository.findById(session.getProfileId()).orElseThrow(NoSuchElementException::new);

        if(profile.getImageURI() == null) return List.of(profile.getNickname(), "");
        return List.of(profile.getNickname(), profile.getImageURI());
    }
}
