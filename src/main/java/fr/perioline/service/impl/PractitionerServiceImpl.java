package fr.perioline.service.impl;

import fr.perioline.service.PractitionerService;
import fr.perioline.domain.Practitioner;
import fr.perioline.repository.PractitionerRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.Optional;
/**
 * Service Implementation for managing Practitioner.
 */
@Service
@Transactional
public class PractitionerServiceImpl implements PractitionerService {

    private final Logger log = LoggerFactory.getLogger(PractitionerServiceImpl.class);

    private final PractitionerRepository practitionerRepository;

    public PractitionerServiceImpl(PractitionerRepository practitionerRepository) {
        this.practitionerRepository = practitionerRepository;
    }

    /**
     * Save a practitioner.
     *
     * @param practitioner the entity to save
     * @return the persisted entity
     */
    @Override
    public Practitioner save(Practitioner practitioner) {
        log.debug("Request to save Practitioner : {}", practitioner);        return practitionerRepository.save(practitioner);
    }

    /**
     * Get all the practitioners.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Practitioner> findAll(Pageable pageable) {
        log.debug("Request to get all Practitioners");
        return practitionerRepository.findAll(pageable);
    }


    /**
     * Get one practitioner by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Practitioner> findOne(Long id) {
        log.debug("Request to get Practitioner : {}", id);
        return practitionerRepository.findById(id);
    }

    /**
     * Delete the practitioner by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Practitioner : {}", id);
        practitionerRepository.deleteById(id);
    }
}
