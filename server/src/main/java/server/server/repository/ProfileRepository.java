package server.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import server.server.entity.Profile;
import server.server.entity.Users;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.Set;

public interface ProfileRepository extends JpaRepository<Profile, Long> {

    Set<Profile> findByUserId(Long userId);

    default int getProfilesNumber(final long userId) {
        Set<Profile> profiles = findByUserId(userId);
        return profiles.size();
    }

}
