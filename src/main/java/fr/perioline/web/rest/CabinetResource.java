package fr.perioline.web.rest;

import com.codahale.metrics.annotation.Timed;
import fr.perioline.domain.Cabinet;
import fr.perioline.service.CabinetService;
import fr.perioline.web.rest.errors.BadRequestAlertException;
import fr.perioline.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Cabinet.
 */
@RestController
@RequestMapping("/api")
public class CabinetResource {

    private final Logger log = LoggerFactory.getLogger(CabinetResource.class);

    private static final String ENTITY_NAME = "cabinet";

    private final CabinetService cabinetService;

    public CabinetResource(CabinetService cabinetService) {
        this.cabinetService = cabinetService;
    }

    /**
     * POST  /cabinets : Create a new cabinet.
     *
     * @param cabinet the cabinet to create
     * @return the ResponseEntity with status 201 (Created) and with body the new cabinet, or with status 400 (Bad Request) if the cabinet has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/cabinets")
    @Timed
    public ResponseEntity<Cabinet> createCabinet(@RequestBody Cabinet cabinet) throws URISyntaxException {
        log.debug("REST request to save Cabinet : {}", cabinet);
        if (cabinet.getId() != null) {
            throw new BadRequestAlertException("A new cabinet cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Cabinet result = cabinetService.save(cabinet);
        return ResponseEntity.created(new URI("/api/cabinets/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /cabinets : Updates an existing cabinet.
     *
     * @param cabinet the cabinet to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated cabinet,
     * or with status 400 (Bad Request) if the cabinet is not valid,
     * or with status 500 (Internal Server Error) if the cabinet couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/cabinets")
    @Timed
    public ResponseEntity<Cabinet> updateCabinet(@RequestBody Cabinet cabinet) throws URISyntaxException {
        log.debug("REST request to update Cabinet : {}", cabinet);
        if (cabinet.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Cabinet result = cabinetService.save(cabinet);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, cabinet.getId().toString()))
            .body(result);
    }

    /**
     * GET  /cabinets : get all the cabinets.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many)
     * @return the ResponseEntity with status 200 (OK) and the list of cabinets in body
     */
    @GetMapping("/cabinets")
    @Timed
    public List<Cabinet> getAllCabinets(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Cabinets");
        return cabinetService.findAll();
    }

    /**
     * GET  /cabinets/:id : get the "id" cabinet.
     *
     * @param id the id of the cabinet to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the cabinet, or with status 404 (Not Found)
     */
    @GetMapping("/cabinets/{id}")
    @Timed
    public ResponseEntity<Cabinet> getCabinet(@PathVariable Long id) {
        log.debug("REST request to get Cabinet : {}", id);
        Optional<Cabinet> cabinet = cabinetService.findOne(id);
        return ResponseUtil.wrapOrNotFound(cabinet);
    }

    /**
     * DELETE  /cabinets/:id : delete the "id" cabinet.
     *
     * @param id the id of the cabinet to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/cabinets/{id}")
    @Timed
    public ResponseEntity<Void> deleteCabinet(@PathVariable Long id) {
        log.debug("REST request to delete Cabinet : {}", id);
        cabinetService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
