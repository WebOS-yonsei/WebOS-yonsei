package server.server.api;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import server.server.api.response.FileResponse;
import server.server.application.FileService;
import server.server.config.resolver.UsersAuth;

@RequiredArgsConstructor
@RestController
@RequestMapping("/file")
public class FileApiController {

    final private FileService fileService;

    @Operation(
            summary = "파일 업로드",
            description = "사용자가 파일을 업로드합니다.",
            security = @SecurityRequirement(name = "Authorization")
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "성공적으로 파일을 업로드했습니다."),
            @ApiResponse(responseCode = "400", description = "잘못된 요청입니다."),
            @ApiResponse(responseCode = "401", description = "인증되지 않은 사용자입니다."),
            @ApiResponse(responseCode = "403", description = "접근이 금지되었습니다.")
    })
    @PostMapping
    public ResponseEntity<FileResponse> uploadFile(
            @Parameter(description = "인증된 사용자 정보", hidden = true) UsersAuth user,
            @Parameter(description = "업로드할 파일", required = true) @RequestParam MultipartFile file) {

        String url = fileService.upload(user.getUserId(), file);

        return ResponseEntity.ok(FileResponse.of(url));
    }
}
