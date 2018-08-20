package fr.perioline.service.impl;

import fr.perioline.service.ChartingService;
import fr.perioline.domain.Charting;
import fr.perioline.repository.ChartingRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.Optional;
/**
 * Service Implementation for managing Charting.
 */
@Service
@Transactional
public class ChartingServiceImpl implements ChartingService {

    private final Logger log = LoggerFactory.getLogger(ChartingServiceImpl.class);

    private final ChartingRepository chartingRepository;

    public ChartingServiceImpl(ChartingRepository chartingRepository) {
        this.chartingRepository = chartingRepository;
    }

    /**
     * Save a charting.
     *
     * @param charting the entity to save
     * @return the persisted entity
     */
    @Override
    public Charting save(Charting charting) {
        log.debug("Request to save Charting : {}", charting);        return chartingRepository.save(charting);
    }

    /**
     * Get all the chartings.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Charting> findAll() {
        log.debug("Request to get all Chartings");
        return chartingRepository.findAll();
    }


    /**
     * Get one charting by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Charting> findOne(Long id) {
        log.debug("Request to get Charting : {}", id);
        return chartingRepository.findById(id);
    }

    /**
     * Delete the charting by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Charting : {}", id);
        chartingRepository.deleteById(id);
    }
}
