package server.server;

import io.restassured.RestAssured;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.test.context.TestPropertySource;
import server.server.common.AcceptanceTest;

import java.io.File;

import static io.restassured.http.ContentType.JSON;
import static org.assertj.core.api.Assertions.assertThat;

class ProfileAcceptanceTest extends AcceptanceTest {

    @Test
    void server_profile_create() {

        File jsonFile = new File("src/test/resources/mock/profileRequest.json");

        String sessionId = "3u34dwj3245htg4j32htj231324354";
        final ExtractableResponse<Response> response = RestAssured.given()
                .log().all()
                .contentType(JSON)
                .header("sessionId", sessionId)
                .body(jsonFile)

                .when()
                .post("/profiles")

                .then()
                .log().all()
                .extract();

        assertThat(response.statusCode()).isEqualTo(HttpStatus.CREATED.value());
    }
}