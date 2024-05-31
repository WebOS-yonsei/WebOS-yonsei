package server.server.acceptance;

import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import server.server.api.request.JoinRequest;
import server.server.api.request.LoginRequest;
import server.server.common.AcceptanceTest;

import java.io.File;

import static org.assertj.core.api.Assertions.assertThat;
import static server.server.acceptance.step.UsersStep.로그인_요청하고_세션_아이디_반환;
import static server.server.acceptance.step.UsersStep.회원가입_요청;

public class FileAcceptanceTest extends AcceptanceTest {

    @Test
    void 프로필_사진을_업로드하고_저장된_경로를_받을_수_있다() {

        회원가입_요청(JoinRequest.of("gitchan", "webos"));
        final String sessionId = 로그인_요청하고_세션_아이디_반환(LoginRequest.of("gitchan", "webos"));

        File file = new File("src/test/resources/static/1.png");
        final ExtractableResponse<Response> response = RestAssured.given()
                .log().all()
                .contentType(ContentType.MULTIPART)
                .header("Authorization", sessionId)
                .multiPart("file", file)

                .when()
                .post("/file")

                .then()
                .log().all()
                .extract();

        assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
        assertThat(response.body().toString()).isNotEmpty();
    }
}
