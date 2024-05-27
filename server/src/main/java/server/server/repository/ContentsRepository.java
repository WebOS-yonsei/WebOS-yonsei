package server.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import server.server.entity.Contents;

public interface ContentsRepository extends JpaRepository<Contents, Long> {
}
