package server.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import server.server.entity.Contents;
import server.server.entity.Users;

import java.util.Set;

public interface ContentsRepository extends JpaRepository<Contents, Long> {
    Set<Contents> findById(long id);
}
