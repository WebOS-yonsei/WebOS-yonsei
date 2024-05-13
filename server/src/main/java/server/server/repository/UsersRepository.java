package server.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import server.server.entity.Users;

import java.util.NoSuchElementException;
import java.util.Optional;

public interface UsersRepository extends JpaRepository<Users, Long> {

    default Users getByLoginId(final String loginId) {
        final Optional<Users> member = findByLoginId(loginId);
        if (member.isEmpty()) {
            throw new NoSuchElementException("Member with login id " + loginId + " not found");
        }
        return member.get();
    }

    Optional<Users> findByLoginId(final String loginId);
}
