package server.server.api.request;

import lombok.*;
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

    public Profile toEntity(Long userId) {
        return Profile.builder()
                .userId(userId)
                .nickname(this.nickname)
                .imageURI(this.profileUri)
                .grade(this.grade)
                .password(this.profilePassword)
                .build();
    }
}