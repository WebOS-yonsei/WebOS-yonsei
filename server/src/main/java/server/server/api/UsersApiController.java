package server.server.api;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import server.server.api.request.JoinRequest;
import server.server.api.request.LoginRequest;
import server.server.api.response.LoginResponse;
import server.server.application.SessionService;
import server.server.application.UsersService;

@RequiredArgsConstructor
@RestController
@RequestMapping("/users")
public class UsersApiController {

    private final UsersService usersService;
    private final SessionService sessionService;

    @PostMapping("/join")
    public ResponseEntity<Void> join(@RequestBody JoinRequest request) {
        usersService.join(request.getLoginId(), request.getPassword());

        return ResponseEntity
                .status(HttpStatus.OK.value())
                .build();
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request, HttpServletResponse response) {
        final Long userId = usersService.login(request.getLoginId(), request.getPassword());
        final String sessionId = sessionService.createSessionId(userId);

        return ResponseEntity
                .status(HttpStatus.OK.value())
                .body(LoginResponse.from(sessionId));
    }
}
