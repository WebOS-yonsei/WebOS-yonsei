package server.server.application;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import server.server.entity.Session;
import server.server.repository.SessionRepository;

import java.util.List;

@RequiredArgsConstructor
@Service
public class SessionService {

    private static final int MAX_SESSION_SIZE = 3;
    private final SessionRepository sessionRepository;

    public String createSessionId(final Long userId) {
        final List<Session> sessions = sessionRepository.findByUserId(userId);
        if (sessions.size() >= MAX_SESSION_SIZE) {
            throw new IllegalArgumentException("3명 이상의 유저가 동시에 로그인할 수 없습니다.");
        }
        final Session session = sessionRepository.save(Session.from(userId));
        return String.valueOf(session.getId());
    }
}

