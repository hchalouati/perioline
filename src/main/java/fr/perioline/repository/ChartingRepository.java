package fr.perioline.repository;

import fr.perioline.domain.Charting;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Charting entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ChartingRepository extends JpaRepository<Charting, Long> {

}
