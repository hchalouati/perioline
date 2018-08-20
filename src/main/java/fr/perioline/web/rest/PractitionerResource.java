package fr.perioline.web.rest;

import com.codahale.metrics.annotation.Timed;
import fr.perioline.domain.Practitioner;
import fr.perioline.service.PractitionerService;
import fr.perioline.web.rest.errors.BadRequestAlertException;
import fr.perioline.web.rest.util.HeaderUtil;
import fr.perioline.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Practitioner.
 */
@RestController
@RequestMapping("/api")
public class PractitionerResource {

    private final Logger log = LoggerFactory.getLogger(PractitionerResource.class);

    private static final String ENTITY_NAME = "practitioner";

    private final PractitionerService practitionerService;

    public PractitionerResource(PractitionerService practitionerService) {
        this.practitionerService = practitionerService;
    }

    /**
     * POST  /practitioners : Create a new practitioner.
     *
     * @param practitioner the practitioner to create
     * @return the ResponseEntity with status 201 (Created) and with body the new practitioner, or with status 400 (Bad Request) if the practitioner has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/practitioners")
    @Timed
    public ResponseEntity<Practitioner> createPractitioner(@RequestBody Practitioner practitioner) throws URISyntaxException {
        log.debug("REST request to save Practitioner : {}", practitioner);
        if (practitioner.getId() != null) {
            throw new BadRequestAlertException("A new practitioner cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Practitioner result = practitionerService.save(practitioner);
        return ResponseEntity.created(new URI("/api/practitioners/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /practitioners : Updates an existing practitioner.
     *
     * @param practitioner the practitioner to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated practitioner,
     * or with status 400 (Bad Request) if the practitioner is not valid,
     * or with status 500 (Internal Server Error) if the practitioner couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/practitioners")
    @Timed
    public ResponseEntity<Practitioner> updatePractitioner(@RequestBody Practitioner practitioner) throws URISyntaxException {
        log.debug("REST request to update Practitioner : {}", practitioner);
        if (practitioner.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Practitioner result = practitionerService.save(practitioner);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, practitioner.getId().toString()))
            .body(result);
    }

    /**
     * GET  /practitioners : get all the practitioners.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of practitioners in body
     */
    @GetMapping("/practitioners")
    @Timed
    public ResponseEntity<List<Practitioner>> getAllPractitioners(Pageable pageable) {
        log.debug("REST request to get a page of Practitioners");
        Page<Practitioner> page = practitionerService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/practitioners");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /practitioners/:id : get the "id" practitioner.
     *
     * @param id the id of the practitioner to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the practitioner, or with status 404 (Not Found)
     */
    @GetMapping("/practitioners/{id}")
    @Timed
    public ResponseEntity<Practitioner> getPractitioner(@PathVariable Long id) {
        log.debug("REST request to get Practitioner : {}", id);
        Optional<Practitioner> practitioner = practitionerService.findOne(id);
        return ResponseUtil.wrapOrNotFound(practitioner);
    }

    /**
     * DELETE  /practitioners/:id : delete the "id" practitioner.
     *
     * @param id the id of the practitioner to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/practitioners/{id}")
    @Timed
    public ResponseEntity<Void> deletePractitioner(@PathVariable Long id) {
        log.debug("REST request to delete Practitioner : {}", id);
        practitionerService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
