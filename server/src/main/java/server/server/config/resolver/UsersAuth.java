package server.server.config.resolver;

import lombok.Getter;

@Getter
public class UsersAuth {

    private Long userId;
    private Long sessionId;

    public UsersAuth(final Long userId, final Long sessionId) {
        this.userId = userId;
        this.sessionId = sessionId;
    }

    public UsersAuth() {
    }
}
