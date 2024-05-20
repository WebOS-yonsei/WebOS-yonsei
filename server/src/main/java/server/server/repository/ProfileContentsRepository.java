package server.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import server.server.entity.ProfileContents;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface ProfileContentsRepository extends JpaRepository<ProfileContents, Long> {

    List<ProfileContents> findByProfileIdAndState(Long profileId, ProfileContents.State state);

    Optional<ProfileContents> findByProfileIdAndContentsId(Long profileId, Long videoId);
}
