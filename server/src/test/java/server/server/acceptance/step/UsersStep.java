package server.server.acceptance.step;

import io.restassured.RestAssured;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import server.server.api.request.JoinRequest;
import server.server.api.request.LoginRequest;
import server.server.api.response.LoginResponse;

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

    public static String 로그인_요청하고_세션_아이디_반환(LoginRequest request) {
        final ExtractableResponse<Response> response = 로그인_요청(request);
        final LoginResponse loginResponse = response.body().as(LoginResponse.class);
        return loginResponse.getSessionId();
    }
}
