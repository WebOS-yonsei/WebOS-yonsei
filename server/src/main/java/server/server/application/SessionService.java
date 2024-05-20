package server.server.application;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import server.server.entity.Session;
import server.server.repository.SessionRepository;

@RequiredArgsConstructor
@Service
public class SessionService {

    private final SessionRepository sessionRepository;
    private final SessionEncryptor sessionEncryptor;

    public String createSessionId(final Long userId) {
        final Session session = sessionRepository.save(Session.from(userId));
        return sessionEncryptor.encrypt(session.getId());
    }
}
