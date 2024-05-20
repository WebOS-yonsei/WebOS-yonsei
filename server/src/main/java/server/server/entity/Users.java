package server.server.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import server.server.util.PasswordUtil;

import static lombok.AccessLevel.PROTECTED;

@AllArgsConstructor(access = PROTECTED)
@NoArgsConstructor(access = PROTECTED)
@Getter
@Entity
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String loginId;
    private String password;

    @Builder(builderMethodName = "basicLogin")
    public Users(
            final String loginId,
            final String password
    ) {
        this.loginId = loginId;
        this.password = encryptPassword(password);
    }

    private static String encryptPassword(final String password) {
        if (password != null) {
            return PasswordUtil.encrypt(password);
        }
        return null;
    }

    public void checkPassword(final String password) {
        final String encryptedPassword = PasswordUtil.encrypt(password);
        if (!this.password.equals(encryptedPassword)) {
            throw new IllegalAccessError("아이디 또는 비밀번호가 잘못되었습니다.");
        }
    }
}
