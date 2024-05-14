package server.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import server.server.entity.ProfileContents;
import server.server.entity.Session;

import java.util.Optional;

public interface SessionRepository extends JpaRepository<Session, Long> {
}
