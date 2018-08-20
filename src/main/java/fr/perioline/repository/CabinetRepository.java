package fr.perioline.repository;

import fr.perioline.domain.Cabinet;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Cabinet entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CabinetRepository extends JpaRepository<Cabinet, Long> {

    @Query(value = "select distinct cabinet from Cabinet cabinet left join fetch cabinet.cabinets",
        countQuery = "select count(distinct cabinet) from Cabinet cabinet")
    Page<Cabinet> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct cabinet from Cabinet cabinet left join fetch cabinet.cabinets")
    List<Cabinet> findAllWithEagerRelationships();

    @Query("select cabinet from Cabinet cabinet left join fetch cabinet.cabinets where cabinet.id =:id")
    Optional<Cabinet> findOneWithEagerRelationships(@Param("id") Long id);

}
