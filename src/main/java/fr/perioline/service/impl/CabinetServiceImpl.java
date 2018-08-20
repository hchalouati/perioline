package fr.perioline.service.impl;

import fr.perioline.service.CabinetService;
import fr.perioline.domain.Cabinet;
import fr.perioline.repository.CabinetRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.Optional;
/**
 * Service Implementation for managing Cabinet.
 */
@Service
@Transactional
public class CabinetServiceImpl implements CabinetService {

    private final Logger log = LoggerFactory.getLogger(CabinetServiceImpl.class);

    private final CabinetRepository cabinetRepository;

    public CabinetServiceImpl(CabinetRepository cabinetRepository) {
        this.cabinetRepository = cabinetRepository;
    }

    /**
     * Save a cabinet.
     *
     * @param cabinet the entity to save
     * @return the persisted entity
     */
    @Override
    public Cabinet save(Cabinet cabinet) {
        log.debug("Request to save Cabinet : {}", cabinet);        return cabinetRepository.save(cabinet);
    }

    /**
     * Get all the cabinets.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Cabinet> findAll() {
        log.debug("Request to get all Cabinets");
        return cabinetRepository.findAllWithEagerRelationships();
    }

    /**
     * Get all the Cabinet with eager load of many-to-many relationships.
     *
     * @return the list of entities
     */
    public Page<Cabinet> findAllWithEagerRelationships(Pageable pageable) {
        return cabinetRepository.findAllWithEagerRelationships(pageable);
    }
    

    /**
     * Get one cabinet by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Cabinet> findOne(Long id) {
        log.debug("Request to get Cabinet : {}", id);
        return cabinetRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the cabinet by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Cabinet : {}", id);
        cabinetRepository.deleteById(id);
    }
}
