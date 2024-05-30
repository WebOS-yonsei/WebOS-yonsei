package server.server.acceptance;

import io.restassured.RestAssured;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import server.server.api.request.JoinRequest;
import server.server.api.request.LoginRequest;
import server.server.api.request.ProfileRequest;
import server.server.api.response.LoginResponse;
import server.server.common.AcceptanceTest;

import static io.restassured.http.ContentType.JSON;
import static org.assertj.core.api.Assertions.assertThat;
import static server.server.acceptance.step.ProfilesStep.프로필_생성_요청하고_아이디_반환;
import static server.server.acceptance.step.ProfilesStep.프로필_선택_요청;
import static server.server.acceptance.step.UsersStep.*;

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

    @Test
    void 네_명_이상의_사용자는_하나의_아이디로_로그인할_수_없다() {
        회원가입_요청(JoinRequest.of("gitchan", "webos"));

        로그인_요청(LoginRequest.of("gitchan", "webos"));
        로그인_요청(LoginRequest.of("gitchan", "webos"));
        로그인_요청(LoginRequest.of("gitchan", "webos"));

        final ExtractableResponse<Response> response = 로그인_요청(LoginRequest.of("gitchan", "webos"));
        Assertions.assertThat(response.statusCode()).isEqualTo(HttpStatus.BAD_REQUEST.value());
    }

    @Test
    void 현재_로그인한_유저_정보를_가져올_수_있다() {

        회원가입_요청(JoinRequest.of("gitchan", "webos"));
        final String sessionId = 로그인_요청하고_세션_아이디_반환(LoginRequest.of("gitchan", "webos"));
        final Long profileId = 프로필_생성_요청하고_아이디_반환(sessionId, ProfileRequest.of("프로필1", "1234"));

        프로필_선택_요청(sessionId, profileId);

        final ExtractableResponse<Response> response = RestAssured.given()
                .log().all()
                .contentType(JSON)
                .header("Authorization", sessionId)

                .when()
                .get("/users")

                .then()
                .log().all()
                .extract();

        // then
        assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
    }
}
