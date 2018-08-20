package fr.perioline.service;

import fr.perioline.domain.Cabinet;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Cabinet.
 */
public interface CabinetService {

    /**
     * Save a cabinet.
     *
     * @param cabinet the entity to save
     * @return the persisted entity
     */
    Cabinet save(Cabinet cabinet);

    /**
     * Get all the cabinets.
     *
     * @return the list of entities
     */
    List<Cabinet> findAll();

    /**
     * Get all the Cabinet with eager load of many-to-many relationships.
     *
     * @return the list of entities
     */
    Page<Cabinet> findAllWithEagerRelationships(Pageable pageable);
    
    /**
     * Get the "id" cabinet.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Cabinet> findOne(Long id);

    /**
     * Delete the "id" cabinet.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
