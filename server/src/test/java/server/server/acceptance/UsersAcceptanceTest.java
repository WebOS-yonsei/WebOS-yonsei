package server.server.acceptance;

import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import server.server.api.request.JoinRequest;
import server.server.api.request.LoginRequest;
import server.server.api.response.LoginResponse;
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
    void 로그인을_할_수_있다() {
        회원가입_요청(JoinRequest.of("gitchan", "webos"));

        final LoginRequest request = LoginRequest.of("gitchan", "webos");
        final ExtractableResponse<Response> response = 로그인_요청(request);
        final LoginResponse loginResponse = response.body().as(LoginResponse.class);

        assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
        assertThat(loginResponse.getSessionId()).isNotEmpty();
    }
}
