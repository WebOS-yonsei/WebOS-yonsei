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
}
