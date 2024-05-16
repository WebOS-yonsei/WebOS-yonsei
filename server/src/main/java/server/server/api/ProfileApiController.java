package server.server.api;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import server.server.api.request.ProfileRequest;
import server.server.api.response.ProfileHistoryResponse;
import server.server.api.response.ProfileResponse;
import server.server.application.ProfileService;
import server.server.entity.Contents;
import server.server.entity.Profile;

import java.io.IOException;
import java.util.List;
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
    public ResponseEntity<ProfileResponse> getProfileList(
            @RequestHeader("sessionId") String sessionId) {

        Set<Profile> profileSet = profileService.getProfiles(sessionId);

        return ResponseEntity.ok(new ProfileResponse(profileSet));
    }


    @GetMapping("/{profile_id}/history")
    public ResponseEntity<ProfileHistoryResponse> getProfileHistory(
            @PathVariable("profile_id") Long profile_id,
            @RequestHeader("sessionId") String sessionId) {

        List<Contents> contentsSet = profileService.getContents(sessionId, profile_id);

        return ResponseEntity.ok(new ProfileHistoryResponse(contentsSet));
    }

}