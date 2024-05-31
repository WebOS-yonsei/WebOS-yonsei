package server.server.api;

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

    @PostMapping
    public ResponseEntity<FileResponse> uploadFile(
            UsersAuth user,
            @RequestParam MultipartFile file) {

        String url = fileService.upload(user.getUserId(), file);

        return ResponseEntity.ok(FileResponse.of(url));
    }
}
