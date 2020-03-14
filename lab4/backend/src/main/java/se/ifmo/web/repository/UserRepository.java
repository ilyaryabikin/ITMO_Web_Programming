package se.ifmo.web.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import se.ifmo.web.model.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByLogin(String login);
}
