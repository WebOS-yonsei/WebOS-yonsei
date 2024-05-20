package server.server.api.request;

import lombok.*;
import server.server.entity.Contents;
import server.server.entity.Grade;

import java.sql.Time;

import static lombok.AccessLevel.*;

@Getter
@Builder
@Setter
@NoArgsConstructor
@AllArgsConstructor(access = PROTECTED)
public class ContentsRequest {
    private String title;
    private String description;
    private float duration;
    private Grade grade;
    private String thumbnailURI;
    private String genre;
    private String sourceURI;

    public Contents toEntity(){
        return Contents.builder()
                .title(this.title)
                .description(this.description)
                .duration(this.duration)
                .grade(this.grade)
                .thumbnailURI(this.thumbnailURI)
                .genre(this.genre)
                .sourceURI(this.sourceURI)
                .build();
    }
}
