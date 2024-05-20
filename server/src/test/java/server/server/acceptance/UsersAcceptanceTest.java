package server.server.acceptance;

import io.restassured.RestAssured;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import server.server.api.request.JoinRequest;
import server.server.common.AcceptanceTest;

import static io.restassured.http.ContentType.JSON;
import static org.assertj.core.api.Assertions.assertThat;

public class UsersAcceptanceTest extends AcceptanceTest {

    @Test
    void 회원가입을_할_수_있다() {
        final JoinRequest request = JoinRequest.of("gitchan", "webos");
        final ExtractableResponse<Response> response = 회원가입_요청(request);

        assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
    }

    public static ExtractableResponse<Response> 회원가입_요청(JoinRequest request) {
        return RestAssured.given()
                .log().all()
                .contentType(JSON)
                .body(request)

                .when()
                .post("/users/join")

                .then()
                .log().all()
                .extract();
    }
}
