package server.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import server.server.entity.Contents;
import server.server.entity.Grade;

import java.util.List;
import java.util.Optional;


public interface ContentsRepository extends JpaRepository<Contents, Long> {
    Optional<Contents> findById(long id);
    List<Contents> findAllByGrade(Grade grade);
}
