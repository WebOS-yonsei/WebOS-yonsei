package server.server.api.response;

import lombok.Getter;

@Getter
public class CurrentUserResponse {

    private String loginId;

    public CurrentUserResponse(final String loginId) {
        this.loginId = loginId;
    }

    public CurrentUserResponse() {
    }

    public static CurrentUserResponse of(final String loginId) {
        return new CurrentUserResponse(loginId);
    }
}
