package server.server.acceptance.step;

import io.restassured.RestAssured;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import server.server.api.request.ProfileRequest;

import static io.restassured.http.ContentType.JSON;

public class ProfilesStep {

    public static Long 프로필_생성_요청하고_아이디_반환(final String sessionId, final ProfileRequest request) {
        final ExtractableResponse<Response> response = 프로필_생성_요청(sessionId, request);
        final String location = response.header("Location");
        return Long.valueOf(location.split("/")[2]);
    }

    public static ExtractableResponse<Response> 프로필_생성_요청(final String sessionId, final ProfileRequest request) {
        return RestAssured.given()
                .log().all()
                .contentType(JSON)
                .header("Authorization", sessionId)
                .body(request)

                .when()
                .post("/profiles")

                .then()
                .log().all()
                .extract();
    }

    public static ExtractableResponse<Response> 프로필_선택_요청(final String sessionId, final Long profileId) {
        return RestAssured.given()
                .log().all()
                .contentType(JSON)
                .header("Authorization", sessionId)

                .when()
                .post("/profiles/" + profileId)

                .then()
                .log().all()
                .extract();
    }
}
