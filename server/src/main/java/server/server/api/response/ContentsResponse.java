package server.server.api.response;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Setter;
import server.server.entity.Contents;

import java.util.Set;

@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ContentsResponse {
    public Set<Contents> contents;
}
