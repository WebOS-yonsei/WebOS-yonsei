package server.server.api.response;

public class LoginResponse {

    private String sessionId;

    public LoginResponse(final String sessionId) {
        this.sessionId = sessionId;
    }

    public LoginResponse() {
    }

    public static LoginResponse from(final String sessionId) {
        return new LoginResponse(sessionId);
    }

    public String getSessionId() {
        return sessionId;
    }
}
