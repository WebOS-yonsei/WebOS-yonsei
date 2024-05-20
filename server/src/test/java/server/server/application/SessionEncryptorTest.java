package server.server.application;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class SessionEncryptorTest {

    @Autowired
    private SessionEncryptor sessionEncryptor;

    @Test
    void 세션_아이디를_암호화_및_복호화할_수_있다() {
        Long sessionId = 1L;
        final String encrypt = sessionEncryptor.encrypt(sessionId);
        final Long decrypt = sessionEncryptor.decrypt(encrypt);

        assertThat(decrypt).isEqualTo(sessionId);
    }
}
