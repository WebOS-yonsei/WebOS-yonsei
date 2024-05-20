package server.server.api.request;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public class JoinRequest {

    private final String loginId;

    private final String password;

    public static JoinRequest of(final String loginId, final String password) {
        return new JoinRequest(loginId, password);
    }
}
