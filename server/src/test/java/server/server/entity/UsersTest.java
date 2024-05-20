package server.server.entity;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;

class UsersTest {

    @Test
    void 로그인_사용자를_생성하면_비밀번호가_암호화된다() {
        final Users gitchan = Users.basicLogin()
                .loginId("gitchan")
                .password("gitchan123")
                .build();

        assertEquals(gitchan.getLoginId(), "gitchan");
        assertNotEquals(gitchan.getPassword(), "gitchan123");
    }

    @Test
    void 비밀번호가_정확한지_검증할_수_있다() {
        final String password = "gitchan123";

        final Users gitchan = Users.basicLogin()
                .loginId("gitchan")
                .password(password)
                .build();

        assertDoesNotThrow(() -> gitchan.checkPassword(password));
    }
}
