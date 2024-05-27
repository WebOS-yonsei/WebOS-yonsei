package server.server.api.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import server.server.entity.Contents;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ContentsResponse {

    private List<Contents> videos;

    public static ContentsResponse of(final List<Contents> videos) {
        return new ContentsResponse(videos);
    }
}
