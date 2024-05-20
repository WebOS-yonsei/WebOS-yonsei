package server.server.api.response;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Setter;
import server.server.entity.Contents;

import java.util.List;

@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ContentsResponse {

    private List<Contents> contents;

    public static ContentsResponse of(final List<Contents> contents) {
        return new ContentsResponse(contents);
    }
}
