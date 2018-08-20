package fr.perioline.service;

import fr.perioline.domain.Practitioner;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing Practitioner.
 */
public interface PractitionerService {

    /**
     * Save a practitioner.
     *
     * @param practitioner the entity to save
     * @return the persisted entity
     */
    Practitioner save(Practitioner practitioner);

    /**
     * Get all the practitioners.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<Practitioner> findAll(Pageable pageable);


    /**
     * Get the "id" practitioner.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Practitioner> findOne(Long id);

    /**
     * Delete the "id" practitioner.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
