package server.server.api;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
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

    @Operation(
            summary = "컨텐츠 목록 조회",
            description = "사용자의 등급에 따라 비디오 컨텐츠 목록을 반환합니다.",
            security = @SecurityRequirement(name = "Authorization")
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "성공적으로 목록을 조회했습니다."),
            @ApiResponse(responseCode = "401", description = "인증되지 않은 사용자입니다."),
            @ApiResponse(responseCode = "403", description = "접근이 금지되었습니다."),
            @ApiResponse(responseCode = "404", description = "요청한 리소스를 찾을 수 없습니다.")
    })
    @GetMapping
    public ResponseEntity<ContentsResponse> getContentsList(
            @Parameter(description = "인증된 사용자 정보", hidden = true) UsersAuth user
    ) {
        List<Contents> contents = contentsService.getContents(user.getUserId(), user.getSessionId());
        return ResponseEntity.ok(ContentsResponse.of(contents));
    }

    @Operation(
            summary = "시청 시간 기록",
            description = "사용자가 특정 비디오를 본 시간을 기록합니다.",
            security = @SecurityRequirement(name = "Authorization")
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "성공적으로 시간을 기록했습니다."),
            @ApiResponse(responseCode = "400", description = "잘못된 요청입니다."),
            @ApiResponse(responseCode = "404", description = "요청한 리소스를 찾을 수 없습니다.")
    })
    @PostMapping("/{videoId}/time")
    public ResponseEntity<Void> recordContentsTime(
            @Parameter(description = "인증된 사용자 정보", hidden = true) UsersAuth user,
            @Parameter(description = "시청 시간을 기록할 비디오 ID", required = true) @PathVariable("videoId") Long videoId,
            @Parameter(description = "시청 시간 요청 본문", required = true) @RequestBody TimeRecordRequest timeRecordRequest) {
        contentsService.recordTime(user.getUserId(), user.getSessionId(), videoId, timeRecordRequest.getTime());
        return ResponseEntity.ok().build();
    }

    @Operation(
            summary = "컨텐츠 정보 조회",
            description = "특정 비디오 컨텐츠의 상세 정보를 반환합니다.",
            security = @SecurityRequirement(name = "Authorization")
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "성공적으로 정보를 조회했습니다."),
            @ApiResponse(responseCode = "404", description = "요청한 리소스를 찾을 수 없습니다.")
    })
    @GetMapping("/{videoId}")
    public ResponseEntity<ContentsResponse.ContentInfo> contentInfo(
            @Parameter(description = "인증된 사용자 정보", hidden = true) UsersAuth user,
            @Parameter(description = "정보를 조회할 비디오 ID", required = true) @PathVariable("videoId") Long videoId) {
        Contents content = contentsService.getContentInfo(videoId);
        Float currentPlaybackTime = contentsService.getCurrentPlaybackTime(videoId, user.getSessionId());
        return ResponseEntity.ok(ContentsResponse.ContentInfo.of(content, currentPlaybackTime));
    }
}
