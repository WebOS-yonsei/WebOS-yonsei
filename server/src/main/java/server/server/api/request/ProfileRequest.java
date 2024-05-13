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
    private Long userId;
    private String nickname;
    private String profileUri;
    private Grade grade;
    private String profilePassword;

    public Profile toEntity() {
        return Profile.builder()
                .userId(this.userId)
                .nickname(this.nickname)
                .imageURI(this.profileUri)
                .grade(this.grade)
                .password(this.profilePassword)
                .build();
    }
}