package server.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import server.server.entity.Users;

public interface UsersRepository extends JpaRepository<Users, Long> {
}
