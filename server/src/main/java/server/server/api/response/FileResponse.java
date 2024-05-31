package server.server.api.response;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FileResponse {

    public String url;

    public static FileResponse of(final String url) {
        return new FileResponse(url);
    }
}
