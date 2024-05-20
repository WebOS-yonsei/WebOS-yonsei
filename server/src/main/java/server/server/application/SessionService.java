package server.server.application;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import server.server.entity.Session;
import server.server.repository.SessionRepository;

@Transactional
@RequiredArgsConstructor
@Service
public class SessionService {

    private final SessionRepository sessionRepository;

    public String createSessionId(final Long userId) {
        final Session session = sessionRepository.save(Session.from(userId));
        return session.getId().toString();
    }
}
