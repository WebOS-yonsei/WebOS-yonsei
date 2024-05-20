package server.server.acceptance;

import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import server.server.api.request.JoinRequest;
import server.server.api.request.LoginRequest;
import server.server.common.AcceptanceTest;

import static org.assertj.core.api.Assertions.assertThat;
import static server.server.acceptance.step.UsersStep.로그인_요청;
import static server.server.acceptance.step.UsersStep.회원가입_요청;

public class UsersAcceptanceTest extends AcceptanceTest {

    @Test
    void 회원가입을_할_수_있다() {
        final JoinRequest request = JoinRequest.of("gitchan", "webos");
        final ExtractableResponse<Response> response = 회원가입_요청(request);

        assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
    }

    @Test
    void 로그인하면_세션_아이디를_받는다() {
        final String loginId = "gitchan";
        final String password = "webos";

        회원가입_요청(JoinRequest.of(loginId, password));

        final ExtractableResponse<Response> response = 로그인_요청(LoginRequest.of(loginId, password));
        assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
        assertThat(response.header("SessionId")).isNotBlank();
    }
}
