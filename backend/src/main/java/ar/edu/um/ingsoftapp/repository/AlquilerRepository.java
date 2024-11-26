package ar.edu.um.ingsoftapp.repository;

import ar.edu.um.ingsoftapp.domain.Alquiler;
import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Alquiler entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AlquilerRepository extends JpaRepository<Alquiler, Long> {
    @Query("select alquiler from Alquiler alquiler where alquiler.user.login = ?#{authentication.name}")
    List<Alquiler> findByUserIsCurrentUser();

    List<Alquiler> findByUserId(Long id);
}
