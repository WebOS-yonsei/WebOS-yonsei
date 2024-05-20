package server.server.config.resolver;

import lombok.Getter;

@Getter
public class UsersAuth {

    private Long userId;

    public UsersAuth(final Long userId) {
        this.userId = userId;
    }

    public UsersAuth() {
    }
}
