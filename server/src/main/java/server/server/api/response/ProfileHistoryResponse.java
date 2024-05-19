package server.server.api.response;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Setter;
import server.server.entity.Contents;

import java.util.List;

@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProfileHistoryResponse {
    public List<Contents> videos;
}
