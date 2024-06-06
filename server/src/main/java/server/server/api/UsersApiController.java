package server.server.api;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import server.server.api.request.JoinRequest;
import server.server.api.request.LoginRequest;
import server.server.api.response.CurrentUserResponse;
import server.server.api.response.LoginResponse;
import server.server.application.SessionService;
import server.server.application.UsersService;
import server.server.config.resolver.UsersAuth;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/users")
public class UsersApiController {

    private final UsersService usersService;
    private final SessionService sessionService;

    @Operation(
            summary = "현재 사용자 조회",
            description = "현재 로그인한 사용자의 정보를 조회합니다.",
            security = @SecurityRequirement(name = "Authorization")
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "성공적으로 사용자 정보를 조회했습니다."),
            @ApiResponse(responseCode = "401", description = "인증되지 않은 사용자입니다."),
            @ApiResponse(responseCode = "403", description = "접근이 금지되었습니다."),
            @ApiResponse(responseCode = "404", description = "요청한 리소스를 찾을 수 없습니다.")
    })
    @GetMapping
    public ResponseEntity<CurrentUserResponse> queryUser(
            @Parameter(description = "인증된 사용자 정보", hidden = true) UsersAuth user
    ) {
        final Long userId = user.getUserId();
        final Long sessionId = user.getSessionId();
        final String loginId = usersService.loginId(userId);
        final List<String> info = usersService.currentProfileInfo(sessionId);

        return ResponseEntity.ok(CurrentUserResponse.of(loginId, info.get(0), info.get(1)));
    }

    @Operation(
            summary = "회원 가입",
            description = "새로운 사용자를 등록합니다."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "성공적으로 회원 가입을 완료했습니다."),
            @ApiResponse(responseCode = "400", description = "잘못된 요청입니다."),
            @ApiResponse(responseCode = "409", description = "중복된 사용자입니다.")
    })
    @PostMapping("/join")
    public ResponseEntity<Void> join(
            @Parameter(description = "회원 가입 요청 정보", required = true) @RequestBody JoinRequest request
    ) {
        usersService.join(request.getLoginId(), request.getPassword());

        return ResponseEntity
                .status(HttpStatus.OK.value())
                .build();
    }

    @Operation(
            summary = "로그인",
            description = "사용자가 로그인합니다."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "성공적으로 로그인을 완료했습니다."),
            @ApiResponse(responseCode = "400", description = "잘못된 요청입니다."),
            @ApiResponse(responseCode = "401", description = "유효하지 않은 사용자 이름 또는 비밀번호입니다.")
    })
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @Parameter(description = "로그인 요청 정보", required = true) @RequestBody LoginRequest request,
            @Parameter(description = "HTTP 응답 객체", hidden = true) HttpServletResponse response
    ) {
        final Long userId = usersService.login(request.getLoginId(), request.getPassword());
        final String sessionId = sessionService.createSessionId(userId);

        return ResponseEntity
                .status(HttpStatus.OK.value())
                .body(LoginResponse.from(sessionId));
    }
}
