package server.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import server.server.entity.Profile;

import java.util.List;

public interface ProfileRepository extends JpaRepository<Profile, Long> {

    List<Profile> findByUserId(Long userId);

    default int getProfilesNumber(final long userId) {
        List<Profile> profiles = findByUserId(userId);
        return profiles.size();
    }
}
