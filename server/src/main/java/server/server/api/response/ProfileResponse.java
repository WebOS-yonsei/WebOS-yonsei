package server.server.api.response;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Setter;
import server.server.entity.Profile;

import java.util.List;

@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProfileResponse {

    public List<Profile> profiles;
}
