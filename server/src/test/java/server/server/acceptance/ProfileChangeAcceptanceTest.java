package server.server.acceptance;

import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import server.server.api.request.JoinRequest;
import server.server.api.request.LoginRequest;
import server.server.api.request.ProfileRequest;
import server.server.common.AcceptanceTest;

import static org.assertj.core.api.Assertions.assertThat;
import static server.server.acceptance.step.ProfilesStep.프로필_생성_요청하고_아이디_반환;
import static server.server.acceptance.step.ProfilesStep.프로필_선택_요청;
import static server.server.acceptance.step.UsersStep.로그인_요청하고_세션_아이디_반환;
import static server.server.acceptance.step.UsersStep.회원가입_요청;

public class ProfileChangeAcceptanceTest extends AcceptanceTest {

    @Test
    void 로그인한_사용자는_프로필을_고를_수_있다() {
        회원가입_요청(JoinRequest.of("gitchan", "webos"));
        final String sessionId = 로그인_요청하고_세션_아이디_반환(LoginRequest.of("gitchan", "webos"));
        final Long profileId = 프로필_생성_요청하고_아이디_반환(sessionId, ProfileRequest.of("깃짱", "1234"));

        final ExtractableResponse<Response> response = 프로필_선택_요청(sessionId, profileId);

        assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
    }

    @Test
    void 한_프로필에_2명_이상의_사용자가_진입할_수_없다() {
        회원가입_요청(JoinRequest.of("gitchan", "webos"));
        final String session1Id = 로그인_요청하고_세션_아이디_반환(LoginRequest.of("gitchan", "webos"));
        final String session2Id = 로그인_요청하고_세션_아이디_반환(LoginRequest.of("gitchan", "webos"));
        final Long profileId = 프로필_생성_요청하고_아이디_반환(session1Id, ProfileRequest.of("깃짱", "1234"));

        프로필_선택_요청(session1Id, profileId);
        final ExtractableResponse<Response> response = 프로필_선택_요청(session2Id, profileId);

        assertThat(response.statusCode()).isEqualTo(HttpStatus.BAD_REQUEST.value());
    }
}
