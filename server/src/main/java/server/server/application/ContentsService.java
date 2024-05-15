package server.server.application;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import server.server.entity.Contents;
import server.server.repository.ContentsRepository;

import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class ContentsService {
    private final ContentsRepository contentsRepository;

    // contents list 조회
    public Set<Contents> getContents(String sessionId) {

        // userId 조회 @Session
        // Long userId = getUserId(sessionId);
        long userId = 1L;

        return contentsRepository.findByUserId(userId);
    }
}
