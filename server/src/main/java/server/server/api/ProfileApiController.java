package server.server.api;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import server.server.api.request.ProfileRequest;
import server.server.api.response.ProfileResponse;
import server.server.application.ProfileService;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

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
        response.setHeader("Location", "/profiles/" + profileId);
        response.setStatus(HttpServletResponse.SC_CREATED);
    }

    @GetMapping("/list")
    public ResponseEntity<Map<String, Set<ProfileResponse>>> getProfileList(
            @RequestHeader("sessionId") String sessionId) {

        Set<ProfileResponse> profileSet = profileService.getProfiles(sessionId);
        Map<String, Set<ProfileResponse>> body = new HashMap<>();
        body.put("profiles", profileSet);

        return ResponseEntity.ok(body);
    }

}