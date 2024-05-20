package server.server.acceptance.step;

import io.restassured.RestAssured;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import server.server.api.request.JoinRequest;
import server.server.api.request.LoginRequest;

import static io.restassured.http.ContentType.JSON;

public class UsersStep {

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

    public static ExtractableResponse<Response> 로그인_요청(final LoginRequest request) {
        return RestAssured.given()
                .log().all()
                .contentType(JSON)
                .body(request)

                .when()
                .post("/users/login")

                .then()
                .log().all()
                .extract();
    }
}
