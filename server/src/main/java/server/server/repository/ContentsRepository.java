package server.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import server.server.entity.Contents;
import server.server.entity.Users;

public interface ContentsRepository extends JpaRepository<Contents, Long> {
}
