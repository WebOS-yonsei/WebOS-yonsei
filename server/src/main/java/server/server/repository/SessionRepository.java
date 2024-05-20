package server.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import server.server.entity.Session;

import java.util.List;

public interface SessionRepository extends JpaRepository<Session, Long> {
    List<Session> findByUserId(Long userId);
}
