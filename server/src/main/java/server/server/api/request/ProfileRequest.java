package server.server.api.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import server.server.entity.Grade;
import server.server.entity.Profile;

import static lombok.AccessLevel.PROTECTED;

@Getter
@Builder
@Setter
@NoArgsConstructor
@AllArgsConstructor(access = PROTECTED)
public class ProfileRequest {

    private String nickname;
    private String profileUri;
    private Grade grade;
    private String profilePassword;

    public static ProfileRequest of(final String nickname, final String profilePassword) {
        return new ProfileRequest(nickname, null, Grade.CHILD, profilePassword);
    }

    public Profile toEntity(Long userId) {
        return Profile.builder()
                .userId(userId)
                .nickname(nickname)
                .imageURI(profileUri)
                .grade(grade)
                .password(profilePassword)
                .build();
    }
}
