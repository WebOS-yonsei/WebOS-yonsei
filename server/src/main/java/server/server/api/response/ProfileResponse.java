package server.server.api.response;

import lombok.*;
import server.server.entity.Profile;

import java.util.Set;

@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProfileResponse {
    public Set<Profile> profiles;
}
