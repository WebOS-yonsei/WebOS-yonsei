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
import server.server.entity.ProfileContents;
import server.server.repository.ContentsRepository;
import server.server.repository.ProfileContentsRepository;

import static io.restassured.http.ContentType.JSON;
import static org.assertj.core.api.Assertions.assertThat;
import static server.server.acceptance.step.ProfilesStep.프로필_생성_요청;
import static server.server.acceptance.step.UsersStep.*;

public class ContentAcceptanceTest extends AcceptanceTest {

    @Autowired
    private ProfileContentsRepository profileContentsRepository;

    @Autowired
    private ContentsRepository contentsRepository;

    @Test
    void 시청_시간을_기록할_수_있다() {

        회원가입_요청(JoinRequest.of("gitchan", "webos"));
        final String sessionId = 로그인_요청하고_세션_아이디_반환(LoginRequest.of("gitchan", "webos"));

        final ProfileRequest profileRequest = ProfileRequest.builder()
                .nickname("gitchan")
                .profileUri("https://3rkewj4g32rk41r5t45r")
                .grade(Grade.ADULT)
                .profilePassword("0123")
                .build();

        프로필_생성_요청(sessionId, profileRequest);

        final ProfileContents profileContent = ProfileContents.builder()
                .profileId(1L)
                .contentsId(1L)
                .state(ProfileContents.State.WATCHING)
                .build();

        profileContentsRepository.save(profileContent);

        // when
        final ExtractableResponse<Response> response = RestAssured.given()
                .log().all()
                .contentType(JSON)
                .header("Authorization", sessionId)
                .body("{\"time\": 203.333333}")

                .when()
                .post("/videos/1/time/1")

                .then()
                .log().all()
                .extract();

        // then
        assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
    }

    @Test
    void 전체_영상_리스트를_가져올_수_있다() {

        회원가입_요청(JoinRequest.of("gitchan", "webos"));
        final String sessionId = 로그인_요청하고_세션_아이디_반환(LoginRequest.of("gitchan", "webos"));

        Contents content1 = Contents.builder().title("1").build();
        Contents content2 = Contents.builder().title("2").build();
        Contents content3 = Contents.builder().title("3").build();
        Contents content4 = Contents.builder().title("4").build();

        contentsRepository.save(content1);
        contentsRepository.save(content2);
        contentsRepository.save(content3);
        contentsRepository.save(content4);

        // when
        final ExtractableResponse<Response> response = RestAssured.given()
                .log().all()
                .contentType(JSON)
                .header("Authorization", sessionId)

                .when()
                .get("/videos")

                .then()
                .log().all()
                .extract();

        // then
        assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
    }

    @Test
    void 영상_상세_설명을_가져올_수_있다(){

        회원가입_요청(JoinRequest.of("gitchan", "webos"));
        final String sessionId = 로그인_요청하고_세션_아이디_반환(LoginRequest.of("gitchan", "webos"));

        Contents content1 = Contents.builder()
                .title("다운 더 래빗 홀")
                .description("풍족한 환경과 문화 속에서 성장한 토치틀리. 소년의 여유로운 생활은 아버지의 범죄 행위에서 풍기는 어둠과 극명한 대비를 이룬다.")
                .duration(6120.0F)
                .grade(Grade.valueOf("CHILD"))
                .thumbnailURI("hh")
                .genre("드라마")
                .sourceURI("https://www.netflix.com/kr/title/81640439")
                .build();

        contentsRepository.save(content1);

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
