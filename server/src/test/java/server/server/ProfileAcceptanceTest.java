package server.server;

import io.restassured.RestAssured;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import org.junit.jupiter.api.Test;

import org.mockito.Mockito;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import server.server.common.AcceptanceTest;
import server.server.entity.Contents;
import server.server.entity.Grade;
import server.server.entity.Profile;
import server.server.entity.ProfileContents;
import server.server.repository.ContentsRepository;
import server.server.repository.ProfileContentsRepository;
import server.server.repository.ProfileRepository;

import java.io.File;
import java.sql.Time;
import java.util.*;

import static io.restassured.http.ContentType.JSON;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;


class ProfileAcceptanceTest extends AcceptanceTest {

    private final String SESSION_ID = "3u34dwj3245htg4j32htj231324354";

    @MockBean
    private ProfileRepository profileRepository;

    @MockBean
    private ProfileContentsRepository profileContentsRepository;

    @MockBean
    private ContentsRepository contentsRepository;

    @Test
    void server_profile_create() {
        // given
        File jsonFile = new File("src/test/resources/mock/profileRequest.json");
        Profile profile = Profile.builder()
                .id(2L)
                .userId(1L)
                .nickname("프로필1")
                .build();
        Mockito.when(profileRepository.save(any(Profile.class))).thenReturn(profile);

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

    @Test
    void server_profile_historyList() {
        // given
        List<ProfileContents> profileContentsList = new ArrayList<>();
        ProfileContents profileContent1 = ProfileContents.builder().profileId(1L).contentsId(1L).build();
        ProfileContents profileContent2 = ProfileContents.builder().profileId(1L).contentsId(2L).build();
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

        Mockito.when(profileContentsRepository.findByProfileIdAndStateNot(1L, ProfileContents.State.NONE)).thenReturn(profileContentsList);
        Mockito.when(contentsRepository.findAllById(ids)).thenReturn(contentsList);


        // when
        final ExtractableResponse<Response> response = RestAssured.given()
                .log().all()
                .contentType(JSON)
                .header("sessionId", SESSION_ID)

                .when()
                .get("/profiles/1/history")

                .then()
                .log().all()
                .extract();

        // then
        assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
    }
}