package server.server.api;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import server.server.api.response.ContentsResponse;
import server.server.application.ContentsService;
import server.server.entity.Contents;

import java.util.List;
import java.util.Set;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/videos")
public class ContentsApiController {
    private final ContentsService contentsService;

    @GetMapping
    public ResponseEntity<ContentsResponse> getContentsList(
            @RequestHeader("sessionId") String sessionId){

        List<Contents> contentsList = contentsService.getContents(sessionId);

        return ResponseEntity.ok(new ContentsResponse(contentsList));
    }
}
