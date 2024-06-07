package server.server.api;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import server.server.api.request.ProfileRequest;
import server.server.api.response.ProfileHistoryResponse;
import server.server.api.response.ProfileResponse;
import server.server.application.ProfileService;
import server.server.config.resolver.UsersAuth;
import server.server.entity.Contents;
import server.server.entity.Profile;

import java.net.URI;
import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/profiles")
@Tag(name = "Profile", description = "Profile API")
public class ProfileApiController {

    private final ProfileService profileService;

    @Operation(
            summary = "프로필 생성",
            description = "사용자의 새로운 프로필을 생성합니다.",
            security = @SecurityRequirement(name = "Authorization")
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "성공적으로 프로필을 생성했습니다."),
            @ApiResponse(responseCode = "400", description = "잘못된 요청입니다."),
            @ApiResponse(responseCode = "401", description = "인증되지 않은 사용자입니다."),
            @ApiResponse(responseCode = "403", description = "접근이 금지되었습니다.")
    })
    @PostMapping
    public ResponseEntity<Object> createProfile(
            @Parameter(description = "인증된 사용자 정보", hidden = true) UsersAuth user,
            @Parameter(description = "프로필 생성 요청 정보", required = true) @RequestBody ProfileRequest profileRequest) {

        Long profileId = profileService.create(user.getUserId(), profileRequest);

        return ResponseEntity
                .created(URI.create("/profiles/" + profileId))
                .build();
    }

    @Operation(
            summary = "프로필 선택",
            description = "사용자가 특정 프로필을 선택합니다.",
            security = @SecurityRequirement(name = "Authorization")
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "성공적으로 프로필을 선택했습니다."),
            @ApiResponse(responseCode = "400", description = "잘못된 요청입니다."),
            @ApiResponse(responseCode = "401", description = "인증되지 않은 사용자입니다."),
            @ApiResponse(responseCode = "403", description = "접근이 금지되었습니다.")
    })
    @PostMapping("/{profileId}")
    public ResponseEntity<Void> chooseProfile(
            @Parameter(description = "인증된 사용자 정보", hidden = true) UsersAuth user,
            @Parameter(description = "선택할 프로필 ID", required = true) @PathVariable("profileId") Long profileId
    ) {
        profileService.chooseProfile(user.getSessionId(), profileId);
        return ResponseEntity.ok().build();
    }

    @Operation(
            summary = "프로필 종료",
            description = "사용자가 현재 프로필에서 종료합니다.",
            security = @SecurityRequirement(name = "Authorization")
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "성공적으로 프로필에서 종료했습니다."),
            @ApiResponse(responseCode = "400", description = "잘못된 요청입니다."),
            @ApiResponse(responseCode = "401", description = "인증되지 않은 사용자입니다."),
            @ApiResponse(responseCode = "403", description = "접근이 금지되었습니다.")
    })
    @PostMapping("/exit")
    public ResponseEntity<Void> exitProfile(
            @Parameter(description = "인증된 사용자 정보", hidden = true) UsersAuth user
    ) {
        profileService.exitProfile(user.getSessionId());
        return ResponseEntity.ok().build();
    }

    @Operation(
            summary = "프로필 목록 조회",
            description = "사용자의 프로필 목록을 조회합니다.",
            security = @SecurityRequirement(name = "Authorization")
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "성공적으로 프로필 목록을 조회했습니다."),
            @ApiResponse(responseCode = "401", description = "인증되지 않은 사용자입니다."),
            @ApiResponse(responseCode = "403", description = "접근이 금지되었습니다."),
            @ApiResponse(responseCode = "404", description = "요청한 리소스를 찾을 수 없습니다.")
    })
    @GetMapping("/list")
    public ResponseEntity<ProfileResponse> getProfileList(
            @Parameter(description = "인증된 사용자 정보", hidden = true) UsersAuth user
    ) {
        List<Profile> profiles = profileService.getProfiles(user.getUserId());
        return ResponseEntity.ok(new ProfileResponse(profiles));
    }

    @Operation(
            summary = "프로필 시청 기록 조회",
            description = "특정 프로필의 시청 기록을 조회합니다.",
            security = @SecurityRequirement(name = "Authorization")
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "성공적으로 시청 기록을 조회했습니다."),
            @ApiResponse(responseCode = "401", description = "인증되지 않은 사용자입니다."),
            @ApiResponse(responseCode = "403", description = "접근이 금지되었습니다."),
            @ApiResponse(responseCode = "404", description = "요청한 리소스를 찾을 수 없습니다.")
    })
    @GetMapping("/{profileId}/history")
    public ResponseEntity<ProfileHistoryResponse> getProfileHistory(
            @Parameter(description = "인증된 사용자 정보", hidden = true) UsersAuth user,
            @Parameter(description = "시청 기록을 조회할 프로필 ID", required = true) @PathVariable("profileId") Long profileId
    ) {
        List<Contents> contents = profileService.getContents(user.getUserId(), profileId);
        return ResponseEntity.ok(new ProfileHistoryResponse(contents));
    }
}
