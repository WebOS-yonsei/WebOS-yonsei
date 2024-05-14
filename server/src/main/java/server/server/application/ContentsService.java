package server.server.application;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import server.server.entity.Contents;
import server.server.repository.ContentsRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ContentsService {
    private final ContentsRepository contentsRepository;

    public static List<Contents> findAllVideos() {
        return null;
    }
}
