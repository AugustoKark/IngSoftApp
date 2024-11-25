package ar.edu.um.ingsoftapp.repository;

import ar.edu.um.ingsoftapp.domain.Auto;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Auto entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AutoRepository extends JpaRepository<Auto, Long> {}
