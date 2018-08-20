package fr.perioline.repository;

import fr.perioline.domain.Practitioner;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Practitioner entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PractitionerRepository extends JpaRepository<Practitioner, Long> {

}
