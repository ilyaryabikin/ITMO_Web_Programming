package se.ifmo.web.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import se.ifmo.web.model.Point;

@Repository
public interface PointRepository extends JpaRepository<Point, Integer> {
}
