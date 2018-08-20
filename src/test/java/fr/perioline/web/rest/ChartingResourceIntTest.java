package fr.perioline.web.rest;

import fr.perioline.PeriolineApp;

import fr.perioline.domain.Charting;
import fr.perioline.repository.ChartingRepository;
import fr.perioline.service.ChartingService;
import fr.perioline.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;


import static fr.perioline.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ChartingResource REST controller.
 *
 * @see ChartingResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PeriolineApp.class)
public class ChartingResourceIntTest {

    private static final String DEFAULT_ORG_ID = "AAAAAAAAAA";
    private static final String UPDATED_ORG_ID = "BBBBBBBBBB";

    private static final String DEFAULT_NOTES = "AAAAAAAAAA";
    private static final String UPDATED_NOTES = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private ChartingRepository chartingRepository;

    

    @Autowired
    private ChartingService chartingService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restChartingMockMvc;

    private Charting charting;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ChartingResource chartingResource = new ChartingResource(chartingService);
        this.restChartingMockMvc = MockMvcBuilders.standaloneSetup(chartingResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Charting createEntity(EntityManager em) {
        Charting charting = new Charting()
            .orgId(DEFAULT_ORG_ID)
            .notes(DEFAULT_NOTES)
            .date(DEFAULT_DATE);
        return charting;
    }

    @Before
    public void initTest() {
        charting = createEntity(em);
    }

    @Test
    @Transactional
    public void createCharting() throws Exception {
        int databaseSizeBeforeCreate = chartingRepository.findAll().size();

        // Create the Charting
        restChartingMockMvc.perform(post("/api/chartings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(charting)))
            .andExpect(status().isCreated());

        // Validate the Charting in the database
        List<Charting> chartingList = chartingRepository.findAll();
        assertThat(chartingList).hasSize(databaseSizeBeforeCreate + 1);
        Charting testCharting = chartingList.get(chartingList.size() - 1);
        assertThat(testCharting.getOrgId()).isEqualTo(DEFAULT_ORG_ID);
        assertThat(testCharting.getNotes()).isEqualTo(DEFAULT_NOTES);
        assertThat(testCharting.getDate()).isEqualTo(DEFAULT_DATE);
    }

    @Test
    @Transactional
    public void createChartingWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = chartingRepository.findAll().size();

        // Create the Charting with an existing ID
        charting.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restChartingMockMvc.perform(post("/api/chartings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(charting)))
            .andExpect(status().isBadRequest());

        // Validate the Charting in the database
        List<Charting> chartingList = chartingRepository.findAll();
        assertThat(chartingList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllChartings() throws Exception {
        // Initialize the database
        chartingRepository.saveAndFlush(charting);

        // Get all the chartingList
        restChartingMockMvc.perform(get("/api/chartings?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(charting.getId().intValue())))
            .andExpect(jsonPath("$.[*].orgId").value(hasItem(DEFAULT_ORG_ID.toString())))
            .andExpect(jsonPath("$.[*].notes").value(hasItem(DEFAULT_NOTES.toString())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())));
    }
    

    @Test
    @Transactional
    public void getCharting() throws Exception {
        // Initialize the database
        chartingRepository.saveAndFlush(charting);

        // Get the charting
        restChartingMockMvc.perform(get("/api/chartings/{id}", charting.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(charting.getId().intValue()))
            .andExpect(jsonPath("$.orgId").value(DEFAULT_ORG_ID.toString()))
            .andExpect(jsonPath("$.notes").value(DEFAULT_NOTES.toString()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingCharting() throws Exception {
        // Get the charting
        restChartingMockMvc.perform(get("/api/chartings/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCharting() throws Exception {
        // Initialize the database
        chartingService.save(charting);

        int databaseSizeBeforeUpdate = chartingRepository.findAll().size();

        // Update the charting
        Charting updatedCharting = chartingRepository.findById(charting.getId()).get();
        // Disconnect from session so that the updates on updatedCharting are not directly saved in db
        em.detach(updatedCharting);
        updatedCharting
            .orgId(UPDATED_ORG_ID)
            .notes(UPDATED_NOTES)
            .date(UPDATED_DATE);

        restChartingMockMvc.perform(put("/api/chartings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCharting)))
            .andExpect(status().isOk());

        // Validate the Charting in the database
        List<Charting> chartingList = chartingRepository.findAll();
        assertThat(chartingList).hasSize(databaseSizeBeforeUpdate);
        Charting testCharting = chartingList.get(chartingList.size() - 1);
        assertThat(testCharting.getOrgId()).isEqualTo(UPDATED_ORG_ID);
        assertThat(testCharting.getNotes()).isEqualTo(UPDATED_NOTES);
        assertThat(testCharting.getDate()).isEqualTo(UPDATED_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingCharting() throws Exception {
        int databaseSizeBeforeUpdate = chartingRepository.findAll().size();

        // Create the Charting

        // If the entity doesn't have an ID, it will throw BadRequestAlertException 
        restChartingMockMvc.perform(put("/api/chartings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(charting)))
            .andExpect(status().isBadRequest());

        // Validate the Charting in the database
        List<Charting> chartingList = chartingRepository.findAll();
        assertThat(chartingList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCharting() throws Exception {
        // Initialize the database
        chartingService.save(charting);

        int databaseSizeBeforeDelete = chartingRepository.findAll().size();

        // Get the charting
        restChartingMockMvc.perform(delete("/api/chartings/{id}", charting.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Charting> chartingList = chartingRepository.findAll();
        assertThat(chartingList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Charting.class);
        Charting charting1 = new Charting();
        charting1.setId(1L);
        Charting charting2 = new Charting();
        charting2.setId(charting1.getId());
        assertThat(charting1).isEqualTo(charting2);
        charting2.setId(2L);
        assertThat(charting1).isNotEqualTo(charting2);
        charting1.setId(null);
        assertThat(charting1).isNotEqualTo(charting2);
    }
}
