package server.server.api;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import server.server.api.response.ContentsResponse;
import server.server.application.ContentsService;
import server.server.config.resolver.UsersAuth;
import server.server.entity.Contents;

import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/videos")
public class ContentsApiController {

    private final ContentsService contentsService;

    @GetMapping
    public ResponseEntity<ContentsResponse> getContentsList(UsersAuth user) {
        List<Contents> contents = contentsService.getContents(user.getUserId());
        return ResponseEntity.ok(ContentsResponse.of(contents));
    }
}
