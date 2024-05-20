package server.server.api;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
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
public class ProfileApiController {

    private final ProfileService profileService;

    @PostMapping
    public ResponseEntity<Object> createProfile(
            UsersAuth user,
            @RequestBody ProfileRequest profileRequest) {

        Long profileId = profileService.create(user.getUserId(), profileRequest);

        return ResponseEntity
                .created(URI.create("/profiles" + profileId))
                .build();
    }

    @GetMapping("/list")
    public ResponseEntity<ProfileResponse> getProfileList(UsersAuth user) {
        List<Profile> profiles = profileService.getProfiles(user.getUserId());
        return ResponseEntity.ok(new ProfileResponse(profiles));
    }

    @GetMapping("/{profile_id}/history")
    public ResponseEntity<ProfileHistoryResponse> getProfileHistory(
            UsersAuth user,
            @PathVariable("profile_id") Long profile_id
    ) {

        List<Contents> contents = profileService.getContents(user.getUserId(), profile_id);

        return ResponseEntity.ok(new ProfileHistoryResponse(contents));
    }
}
