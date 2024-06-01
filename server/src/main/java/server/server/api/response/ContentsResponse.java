package server.server.api.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import server.server.entity.Contents;
import server.server.entity.Grade;

import java.util.List;

@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ContentsResponse {

    private List<Contents> contents;

    public static ContentsResponse of(final List<Contents> contents) {
        return new ContentsResponse(contents);
    }

    @Getter
    @AllArgsConstructor
    public static class ContentInfo{
        private Long id;
        private String title;
        private String description;
        private Float duration;
        private Grade grade;
        private String thumbnailURI;
        private String genre;
        private String sourceURI;
        private Float currentPlaybackTime;

        public static ContentInfo of(final Contents contents, final Float currentPlaybackTime) {
            return new ContentInfo(
                    contents.getId(),
                    contents.getTitle(),
                    contents.getDescription(),
                    contents.getDuration(),
                    contents.getGrade(),
                    contents.getThumbnailURI(),
                    contents.getGenre(),
                    contents.getSourceURI(),
                    currentPlaybackTime
            );
        }
    }
}
