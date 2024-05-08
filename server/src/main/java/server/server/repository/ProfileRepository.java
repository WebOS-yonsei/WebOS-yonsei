package server.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import server.server.entity.Profile;
import server.server.entity.Users;

public interface ProfileRepository extends JpaRepository<Profile, Long> {
}
