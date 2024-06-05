package server.server.acceptance;

import io.restassured.RestAssured;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import server.server.api.request.JoinRequest;
import server.server.api.request.LoginRequest;
import server.server.api.request.ProfileRequest;
import server.server.common.AcceptanceTest;
import server.server.entity.Contents;
import server.server.entity.Grade;
import server.server.entity.Profile;
import server.server.entity.ProfileContents;
import server.server.repository.ContentsRepository;
import server.server.repository.ProfileContentsRepository;
import server.server.repository.ProfileRepository;

import static io.restassured.http.ContentType.JSON;
import static org.assertj.core.api.Assertions.assertThat;
import static server.server.acceptance.step.ProfilesStep.*;
import static server.server.acceptance.step.UsersStep.*;

public class ContentAcceptanceTest extends AcceptanceTest {

    @Autowired
    private ProfileContentsRepository profileContentsRepository;

    @Autowired
    private ContentsRepository contentsRepository;

    @Autowired
    private ProfileRepository profileRepository;

    @Test
    void 시청_시간을_기록할_수_있다() {

        회원가입_요청(JoinRequest.of("gitchan", "webos"));
        final String sessionId = 로그인_요청하고_세션_아이디_반환(LoginRequest.of("gitchan", "webos"));
        final Long profileId = 프로필_생성_요청하고_아이디_반환(sessionId, ProfileRequest.of("깃짱", "1234"));
        프로필_선택_요청(sessionId, profileId);

        Contents content = Contents.builder().title("아마겟돈").duration(203.44F).build();
        Long contentId = contentsRepository.save(content).getId();
        ProfileContents profileContents = ProfileContents.builder()
                .profileId(profileId)
                .contentsId(contentId)
                .build();
        profileContentsRepository.save(profileContents);

        // when
        final ExtractableResponse<Response> response = RestAssured.given()
                .log().all()
                .contentType(JSON)
                .header("Authorization", sessionId)
                .body("{\"time\": 206.333333}")

                .when()
                .post("/videos/2/time")

                .then()
                .log().all()
                .extract();

        // then
        assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
    }

    @Test
    void 영상을_상세_조회할_수_있다(){

        회원가입_요청(JoinRequest.of("gitchan", "webos"));
        final String sessionId = 로그인_요청하고_세션_아이디_반환(LoginRequest.of("gitchan", "webos"));
        final Long profileId = 프로필_생성_요청하고_아이디_반환(sessionId, ProfileRequest.of("깃짱", "1234"));
        프로필_선택_요청(sessionId, profileId);

        Contents content1 = Contents.builder().title("아마겟돈ff").duration(400F).build();
        final Long contentId = contentsRepository.save(content1).getId();

        ProfileContents profileContents = ProfileContents.builder().profileId(profileId).contentsId(contentId).time(230.3F).build();
        profileContentsRepository.save(profileContents);

        // when
        final ExtractableResponse<Response> response = RestAssured.given()
                .log().all()
                .contentType(JSON)
                .header("Authorization", sessionId)

                .when()
                .get("/videos/1")

                .then()
                .log().all()
                .extract();

        // then
        assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
    }
}
