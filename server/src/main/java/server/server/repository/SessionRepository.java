package server.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import server.server.entity.Session;

import java.util.List;
import java.util.Optional;

public interface SessionRepository extends JpaRepository<Session, Long> {
  
    List<Session> findByUserId(Long userId);

    List<Session> findByUserId(final Long userId);

    Optional<Session> findByIdAndProfileId(final Long id, final Long profileId);
}
