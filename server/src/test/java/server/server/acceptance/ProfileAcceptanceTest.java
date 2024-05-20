package server.server.acceptance;

import io.restassured.RestAssured;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
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
import server.server.repository.ProfileRepository;

import java.util.ArrayList;
import java.util.List;

import static io.restassured.http.ContentType.JSON;
import static org.assertj.core.api.Assertions.assertThat;
import static server.server.acceptance.step.ProfilesStep.프로필_생성_요청;
import static server.server.acceptance.step.UsersStep.로그인_요청하고_세션_아이디_반환;
import static server.server.acceptance.step.UsersStep.회원가입_요청;

class ProfileAcceptanceTest extends AcceptanceTest {

    @Autowired
    private ProfileRepository profileRepository;

    @MockBean
    private ProfileContentsRepository profileContentsRepository;

    @MockBean
    private ContentsRepository contentsRepository;

    @Test
    void 프로필_생성을_할_수_있다() {

        // given
        final ProfileRequest profileRequest = ProfileRequest.builder()
                .nickname("gitchan")
                .profileUri("https://3rkewj4g32rk41r5t45r")
                .grade(Grade.ADULT)
                .profilePassword("0123")
                .build();

        회원가입_요청(JoinRequest.of("gitchan", "webos"));
        final String sessionId = 로그인_요청하고_세션_아이디_반환(LoginRequest.of("gitchan", "webos"));

        // when
        final ExtractableResponse<Response> response = 프로필_생성_요청(sessionId, profileRequest);

        // then
        assertThat(response.statusCode()).isEqualTo(HttpStatus.CREATED.value());
        assertThat(response.header("Location")).isNotBlank();
    }

    @Test
    void 프로필_리스트_조회를_할_수_있다() {
        // given
        회원가입_요청(JoinRequest.of("gitchan", "webos"));
        final String sessionId = 로그인_요청하고_세션_아이디_반환(LoginRequest.of("gitchan", "webos"));

        final ProfileRequest profileRequest1 = ProfileRequest.builder()
                .nickname("gitchan1")
                .profileUri("https://3rkewj4g32rk41r5t45r")
                .grade(Grade.ADULT)
                .profilePassword("0123")
                .build();

        final ProfileRequest profileRequest2 = ProfileRequest.builder()
                .nickname("gitchan2")
                .profileUri("https://3rkewj4g32rk41r5t45r")
                .grade(Grade.CHILD)
                .profilePassword("0123")
                .build();

        final ProfileRequest profileRequest3 = ProfileRequest.builder()
                .nickname("gitchan3")
                .profileUri("https://3rkewj4g32rk41r5t45r")
                .grade(Grade.ADULT)
                .profilePassword("2345")
                .build();

        프로필_생성_요청(sessionId, profileRequest1);
        프로필_생성_요청(sessionId, profileRequest2);
        프로필_생성_요청(sessionId, profileRequest3);

        // when
        final ExtractableResponse<Response> response = RestAssured.given()
                .log().all()
                .contentType(JSON)
                .header("Authorization", sessionId)

                .when()
                .get("/profiles/list")

                .then()
                .log().all()
                .extract();

        // then
        assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
        assertThat(response.jsonPath().getList("profiles")).hasSize(3);
    }

    @Test
    void 프로필별_시청_기록을_조회할_수_있다() {
        // given
        List<ProfileContents> profileContentsList = new ArrayList<>();
        ProfileContents profileContent1 = ProfileContents.builder().profileId(1L).contentsId(1L).state(ProfileContents.State.WATCHING).build();
        ProfileContents profileContent2 = ProfileContents.builder().profileId(1L).contentsId(2L).state(ProfileContents.State.WATCHING).build();
        profileContentsList.add(profileContent1);
        profileContentsList.add(profileContent2);

        List<Long> ids = List.of(1L, 2L);

        List<Contents> contentsList = new ArrayList<>();
        Contents content1 = Contents.builder()
                .id(1L)
                .title("다운 더 래빗 홀")
                .description("풍족한 환경과 문화 속에서 성장한 토치틀리. 소년의 여유로운 생활은 아버지의 범죄 행위에서 풍기는 어둠과 극명한 대비를 이룬다.")
                .duration(6120.0F)
                .grade(Grade.valueOf("CHILD"))
                .thumbnailURI("hh")
                .genre("드라마")
                .sourceURI("https://www.netflix.com/kr/title/81640439")
                .build();

        Contents content2 = Contents.builder()
                .id(2L)
                .title("멕시코 만세?")
                .description("광부였던 할아버지가 죽은 뒤 아내와 아이들을 데리고 고향으로 향한 판초. 그곳에서 유산 상속 문제로 친척들과 한바탕 난리를 치르게 되는데.")
                .duration(11460.0F)
                .grade(Grade.valueOf("ADULT"))
                .thumbnailURI("hh2")
                .genre("코미디")
                .sourceURI("https://www.netflix.com/kr/title/81357618")
                .build();
        contentsList.add(content1);
        contentsList.add(content2);

        Mockito.when(profileContentsRepository.findByProfileIdAndState(1L, ProfileContents.State.WATCHING)).thenReturn(profileContentsList);
        Mockito.when(contentsRepository.findAllById(ids)).thenReturn(contentsList);

        회원가입_요청(JoinRequest.of("gitchan", "webos"));
        final String sessionId = 로그인_요청하고_세션_아이디_반환(LoginRequest.of("gitchan", "webos"));

        // when
        final ExtractableResponse<Response> response = RestAssured.given()
                .log().all()
                .contentType(JSON)
                .header("Authorization", sessionId)

                .when()
                .get("/profiles/1/history")

                .then()
                .log().all()
                .extract();

        // then
        assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
    }
}