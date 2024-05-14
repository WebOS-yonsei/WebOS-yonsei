package server.server.application;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import server.server.repository.ContentsRepository;

@Service
@RequiredArgsConstructor
public class ContentsService {
    private final ContentsRepository contentsRepository;

}
