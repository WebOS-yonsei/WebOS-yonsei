package server.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import server.server.entity.Profile;
import server.server.entity.ProfileContents;

public interface ProfileContentsRepository extends JpaRepository<ProfileContents, Long> {
}
