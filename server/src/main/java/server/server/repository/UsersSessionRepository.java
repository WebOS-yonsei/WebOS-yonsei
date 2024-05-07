package server.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import server.server.entity.Session;
import server.server.entity.UsersSession;

public interface UsersSessionRepository extends JpaRepository<UsersSession, Long> {
}
