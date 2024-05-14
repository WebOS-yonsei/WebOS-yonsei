package server.server;

import io.restassured.RestAssured;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import org.junit.jupiter.api.Test;

import org.mockito.Mockito;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import server.server.common.AcceptanceTest;
import server.server.entity.Profile;
import server.server.repository.ProfileRepository;

import java.io.File;
import java.util.HashSet;
import java.util.Set;

import static io.restassured.http.ContentType.JSON;
import static org.assertj.core.api.Assertions.assertThat;


class ProfileAcceptanceTest extends AcceptanceTest {

    private final String SESSION_ID = "3u34dwj3245htg4j32htj231324354";

    @MockBean
    private ProfileRepository profileRepository;

    @Test
    void server_profile_create() {
        // given
        File jsonFile = new File("src/test/resources/mock/profileRequest.json");

        // when
        final ExtractableResponse<Response> response = RestAssured.given()
                .log().all()
                .contentType(JSON)
                .header("sessionId", SESSION_ID)
                .body(jsonFile)

                .when()
                .post("/profiles")

                .then()
                .log().all()
                .extract();

        // then
        assertThat(response.statusCode()).isEqualTo(HttpStatus.CREATED.value());
    }

    @Test
    void server_profileList() {
        // given
        Set<Profile> profileSet = new HashSet<>();
        profileSet.add(Profile.builder()
                .id(1L)
                .userId(1L)
                .nickname("프로필1")
                .build());

        profileSet.add(Profile.builder()
                .id(2L)
                .userId(1L)
                .nickname("프로필2")
                .build());

        Mockito.when(profileRepository.findByUserId(1L)).thenReturn(profileSet);

        // when
        final ExtractableResponse<Response> response = RestAssured.given()
                .log().all()
                .contentType(JSON)
                .header("sessionId", SESSION_ID)

                .when()
                .get("/profiles/list")

                .then()
                .log().all()
                .extract();

        // then
        assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
    }
}