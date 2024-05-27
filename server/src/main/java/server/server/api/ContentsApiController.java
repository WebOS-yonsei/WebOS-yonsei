package server.server.api;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
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
    public ResponseEntity<ContentsResponse> getContentsList(UsersAuth user) {
        List<Contents> contents = contentsService.getContents();
        return ResponseEntity.ok(ContentsResponse.of(contents));
    }

    @PostMapping("/{video_id}/time/{profile_id}")
    public ResponseEntity<ContentsResponse> recordContentsTime(
            @PathVariable("video_id") Long videoId,
            @PathVariable("profile_id") Long profileId,
            UsersAuth user,
            @RequestBody TimeRecordRequest timeRecordRequest) {

        contentsService.recordTime(profileId, videoId, timeRecordRequest.getTime());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{video_id}")
    public ResponseEntity<Contents> getContentInfo(UsersAuth user, @PathVariable("video_id") Long videoId) {
        Contents contentInfo = contentsService.getContentInfo(videoId);
        return ResponseEntity.ok(contentInfo);
    }
}
