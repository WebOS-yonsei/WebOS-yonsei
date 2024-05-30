package server.server.api.response;

import lombok.Getter;

@Getter
public class CurrentUserResponse {

    private String loginId;
    private String nickname;
    private String profileURI;

    public CurrentUserResponse(final String loginId, final String nickname, final String profileURI) {
        this.nickname = nickname;
        this.profileURI = profileURI;
        this.loginId = loginId;
    }

    public CurrentUserResponse() {
    }

    public static CurrentUserResponse of(final String loginId, final String nickname, final String profileURI) {
        return new CurrentUserResponse(loginId, nickname, profileURI);
    }
}
