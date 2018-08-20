package fr.perioline.service;

import fr.perioline.domain.Charting;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Charting.
 */
public interface ChartingService {

    /**
     * Save a charting.
     *
     * @param charting the entity to save
     * @return the persisted entity
     */
    Charting save(Charting charting);

    /**
     * Get all the chartings.
     *
     * @return the list of entities
     */
    List<Charting> findAll();


    /**
     * Get the "id" charting.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Charting> findOne(Long id);

    /**
     * Delete the "id" charting.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
