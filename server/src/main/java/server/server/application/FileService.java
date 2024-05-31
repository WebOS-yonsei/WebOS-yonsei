package server.server.application;

import org.springframework.beans.factory.annotation.Value;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Objects;

@Transactional
@Service
@RequiredArgsConstructor
public class FileService {

    private static final String UPLOAD_DIRECTORY = "src/main/resources/static/upload";

    public String upload(Long userId, MultipartFile requestFile){

        Path uploadPath = Paths.get(UPLOAD_DIRECTORY, String.valueOf(userId));
        if(Files.notExists(uploadPath)){
            try {
                Files.createDirectories(uploadPath);
            } catch (IOException e) {
                return e.toString();
            }
        }

        String originalFilename = Objects.requireNonNull(requestFile.getOriginalFilename());
        Path filePath = uploadPath.resolve(originalFilename);

        try{
            requestFile.transferTo(filePath);
        } catch (IOException e) {
            return e.toString();
        }

        return "upload/" + userId + "/" + originalFilename;
    }
}
