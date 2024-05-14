package server.server.api;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import server.server.application.ContentsService;
import server.server.entity.Contents;

import java.util.List;

@RestController
@RequestMapping("/videos")
@RequiredArgsConstructor
public class ContentsApiController {
    private final ContentsService contentsService;

    public ResponseEntity<List<Contents>> listVideos(@RequestParam(required = false) String sessionId) {
        List<Contents> videos = ContentsService.findAllVideos(); // 비디오 서비스에서 모든 비디오 정보를 가져옵니다.
        return ResponseEntity.ok().body(videos);
    }

}
