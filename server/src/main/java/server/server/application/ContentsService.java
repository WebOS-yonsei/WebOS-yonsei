package server.server.application;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import server.server.entity.Contents;
import server.server.exception.ContentNotFoundException;
import server.server.repository.ContentsRepository;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ContentsService {
    private final ContentsRepository contentsRepository;

    // contents list 조회
    public List<Contents> getContents(final Long userId) {

        // userId 조회 @Session
        long id = 1L;

        Optional<Contents> optionalContents = contentsRepository.findById(id);
        if (optionalContents.isEmpty()) {
            throw new ContentNotFoundException("Content not found with id: " + id);
        }

        return Collections.singletonList(optionalContents.get());
    }
}
