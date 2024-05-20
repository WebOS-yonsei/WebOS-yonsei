package server.server.api.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class LoginRequest {

    private String loginId;
    private String password;

    public static LoginRequest of(final String loginId, final String password) {
        return new LoginRequest(loginId, password);
    }
}
