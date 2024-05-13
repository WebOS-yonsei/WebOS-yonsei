package server.server;

import io.restassured.RestAssured;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import server.server.common.AcceptanceTest;
import server.server.entity.Session;
import server.server.repository.SessionRepository;

import java.io.File;
import java.util.Optional;

import static io.restassured.http.ContentType.JSON;
import static org.assertj.core.api.Assertions.assertThat;

class ProfileAcceptanceTest extends AcceptanceTest {
    // 통합 테스트
    
    @MockBean
    private SessionRepository sessionRepository;

    private String sessionId;

    @BeforeEach
    void setUp() {
        // Mock 세션 데이터 설정
        sessionId = "3u34dwj3245htg4j32htj231324354";
        Session session = Session.builder()
                        .sessionId(sessionId)
                        .userId(1L)
                        .isValid(true)
                        .build();
        Mockito.when(sessionRepository.findBySessionId(sessionId)).thenReturn(Optional.of(session));
    }

    @Test
    void server_profile_check(){

        File jsonFile = new File("src/test/resources/mock/profileRequest.json");

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