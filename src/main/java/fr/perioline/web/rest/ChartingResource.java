package fr.perioline.web.rest;

import com.codahale.metrics.annotation.Timed;
import fr.perioline.domain.Charting;
import fr.perioline.service.ChartingService;
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
 * REST controller for managing Charting.
 */
@RestController
@RequestMapping("/api")
public class ChartingResource {

    private final Logger log = LoggerFactory.getLogger(ChartingResource.class);

    private static final String ENTITY_NAME = "charting";

    private final ChartingService chartingService;

    public ChartingResource(ChartingService chartingService) {
        this.chartingService = chartingService;
    }

    /**
     * POST  /chartings : Create a new charting.
     *
     * @param charting the charting to create
     * @return the ResponseEntity with status 201 (Created) and with body the new charting, or with status 400 (Bad Request) if the charting has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/chartings")
    @Timed
    public ResponseEntity<Charting> createCharting(@RequestBody Charting charting) throws URISyntaxException {
        log.debug("REST request to save Charting : {}", charting);
        if (charting.getId() != null) {
            throw new BadRequestAlertException("A new charting cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Charting result = chartingService.save(charting);
        return ResponseEntity.created(new URI("/api/chartings/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /chartings : Updates an existing charting.
     *
     * @param charting the charting to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated charting,
     * or with status 400 (Bad Request) if the charting is not valid,
     * or with status 500 (Internal Server Error) if the charting couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/chartings")
    @Timed
    public ResponseEntity<Charting> updateCharting(@RequestBody Charting charting) throws URISyntaxException {
        log.debug("REST request to update Charting : {}", charting);
        if (charting.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Charting result = chartingService.save(charting);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, charting.getId().toString()))
            .body(result);
    }

    /**
     * GET  /chartings : get all the chartings.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of chartings in body
     */
    @GetMapping("/chartings")
    @Timed
    public List<Charting> getAllChartings() {
        log.debug("REST request to get all Chartings");
        return chartingService.findAll();
    }

    /**
     * GET  /chartings/:id : get the "id" charting.
     *
     * @param id the id of the charting to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the charting, or with status 404 (Not Found)
     */
    @GetMapping("/chartings/{id}")
    @Timed
    public ResponseEntity<Charting> getCharting(@PathVariable Long id) {
        log.debug("REST request to get Charting : {}", id);
        Optional<Charting> charting = chartingService.findOne(id);
        return ResponseUtil.wrapOrNotFound(charting);
    }

    /**
     * DELETE  /chartings/:id : delete the "id" charting.
     *
     * @param id the id of the charting to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/chartings/{id}")
    @Timed
    public ResponseEntity<Void> deleteCharting(@PathVariable Long id) {
        log.debug("REST request to delete Charting : {}", id);
        chartingService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
