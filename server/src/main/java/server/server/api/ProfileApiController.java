package server.server.api;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import server.server.api.request.ProfileRequest;
import server.server.application.ProfileService;

import java.io.IOException;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/profiles")
public class ProfileApiController {

    private final ProfileService profileService;

    @PostMapping
    public void createProfile(
            @RequestHeader("sessionId") String sessionId,
            @RequestBody ProfileRequest profileRequest,
            HttpServletResponse response) throws IOException {

        Long profileId = profileService.create(sessionId, profileRequest);
        response.setHeader("Location","/profiles/"+profileId);
        response.setStatus(HttpServletResponse.SC_CREATED);
    }

}