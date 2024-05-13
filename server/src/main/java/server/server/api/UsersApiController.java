package server.server.api;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import server.server.api.request.JoinRequest;
import server.server.application.SessionService;
import server.server.application.UsersService;

@RequiredArgsConstructor
@RestController
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
}
