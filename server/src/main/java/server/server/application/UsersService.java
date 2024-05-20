package server.server.application;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import server.server.entity.Users;
import server.server.repository.UsersRepository;

@RequiredArgsConstructor
@Service
public class UsersService {

    private final UsersRepository memberRepository;

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
}
