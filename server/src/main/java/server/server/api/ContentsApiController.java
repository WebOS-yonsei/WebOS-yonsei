package server.server.api;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import server.server.api.request.TimeRecordRequest;
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
    public ResponseEntity<ContentsResponse> getContentsList(
            UsersAuth user
    ) {
        List<Contents> contents = contentsService.getContents();
        return ResponseEntity.ok(ContentsResponse.of(contents));
    }

    @PostMapping("/{videoId}/time")
    public ResponseEntity<Void> recordContentsTime(
            UsersAuth user,
            @PathVariable("videoId") Long videoId,
            @RequestBody TimeRecordRequest timeRecordRequest) {
        contentsService.recordTime(user.getUserId(), user.getSessionId(), videoId, timeRecordRequest.getTime());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{videoId}")
    public ResponseEntity<ContentsResponse.ContentInfo> contentInfo(
            UsersAuth user,
            @PathVariable("videoId") Long videoId) {
        Contents content = contentsService.getContentInfo(videoId);
        Float currentPlaybackTime = contentsService.getCurrentPlaybackTime(videoId, user.getSessionId());
        return ResponseEntity.ok(ContentsResponse.ContentInfo.of(content, currentPlaybackTime));
    }
}
