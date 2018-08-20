package fr.perioline.web.rest;

import fr.perioline.PeriolineApp;

import fr.perioline.domain.Cabinet;
import fr.perioline.repository.CabinetRepository;
import fr.perioline.service.CabinetService;
import fr.perioline.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;


import static fr.perioline.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the CabinetResource REST controller.
 *
 * @see CabinetResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PeriolineApp.class)
public class CabinetResourceIntTest {

    private static final String DEFAULT_ORG_ID = "AAAAAAAAAA";
    private static final String UPDATED_ORG_ID = "BBBBBBBBBB";

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_ACTIVITY = "AAAAAAAAAA";
    private static final String UPDATED_ACTIVITY = "BBBBBBBBBB";

    private static final String DEFAULT_WEBSITE = "AAAAAAAAAA";
    private static final String UPDATED_WEBSITE = "BBBBBBBBBB";

    private static final byte[] DEFAULT_LOGO = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_LOGO = TestUtil.createByteArray(2, "1");
    private static final String DEFAULT_LOGO_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_LOGO_CONTENT_TYPE = "image/png";

    @Autowired
    private CabinetRepository cabinetRepository;
    @Mock
    private CabinetRepository cabinetRepositoryMock;
    
    @Mock
    private CabinetService cabinetServiceMock;

    @Autowired
    private CabinetService cabinetService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCabinetMockMvc;

    private Cabinet cabinet;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CabinetResource cabinetResource = new CabinetResource(cabinetService);
        this.restCabinetMockMvc = MockMvcBuilders.standaloneSetup(cabinetResource)
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
    public static Cabinet createEntity(EntityManager em) {
        Cabinet cabinet = new Cabinet()
            .orgId(DEFAULT_ORG_ID)
            .name(DEFAULT_NAME)
            .activity(DEFAULT_ACTIVITY)
            .website(DEFAULT_WEBSITE)
            .logo(DEFAULT_LOGO)
            .logoContentType(DEFAULT_LOGO_CONTENT_TYPE);
        return cabinet;
    }

    @Before
    public void initTest() {
        cabinet = createEntity(em);
    }

    @Test
    @Transactional
    public void createCabinet() throws Exception {
        int databaseSizeBeforeCreate = cabinetRepository.findAll().size();

        // Create the Cabinet
        restCabinetMockMvc.perform(post("/api/cabinets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cabinet)))
            .andExpect(status().isCreated());

        // Validate the Cabinet in the database
        List<Cabinet> cabinetList = cabinetRepository.findAll();
        assertThat(cabinetList).hasSize(databaseSizeBeforeCreate + 1);
        Cabinet testCabinet = cabinetList.get(cabinetList.size() - 1);
        assertThat(testCabinet.getOrgId()).isEqualTo(DEFAULT_ORG_ID);
        assertThat(testCabinet.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testCabinet.getActivity()).isEqualTo(DEFAULT_ACTIVITY);
        assertThat(testCabinet.getWebsite()).isEqualTo(DEFAULT_WEBSITE);
        assertThat(testCabinet.getLogo()).isEqualTo(DEFAULT_LOGO);
        assertThat(testCabinet.getLogoContentType()).isEqualTo(DEFAULT_LOGO_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void createCabinetWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cabinetRepository.findAll().size();

        // Create the Cabinet with an existing ID
        cabinet.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCabinetMockMvc.perform(post("/api/cabinets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cabinet)))
            .andExpect(status().isBadRequest());

        // Validate the Cabinet in the database
        List<Cabinet> cabinetList = cabinetRepository.findAll();
        assertThat(cabinetList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCabinets() throws Exception {
        // Initialize the database
        cabinetRepository.saveAndFlush(cabinet);

        // Get all the cabinetList
        restCabinetMockMvc.perform(get("/api/cabinets?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cabinet.getId().intValue())))
            .andExpect(jsonPath("$.[*].orgId").value(hasItem(DEFAULT_ORG_ID.toString())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].activity").value(hasItem(DEFAULT_ACTIVITY.toString())))
            .andExpect(jsonPath("$.[*].website").value(hasItem(DEFAULT_WEBSITE.toString())))
            .andExpect(jsonPath("$.[*].logoContentType").value(hasItem(DEFAULT_LOGO_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].logo").value(hasItem(Base64Utils.encodeToString(DEFAULT_LOGO))));
    }
    
    public void getAllCabinetsWithEagerRelationshipsIsEnabled() throws Exception {
        CabinetResource cabinetResource = new CabinetResource(cabinetServiceMock);
        when(cabinetServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restCabinetMockMvc = MockMvcBuilders.standaloneSetup(cabinetResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restCabinetMockMvc.perform(get("/api/cabinets?eagerload=true"))
        .andExpect(status().isOk());

        verify(cabinetServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    public void getAllCabinetsWithEagerRelationshipsIsNotEnabled() throws Exception {
        CabinetResource cabinetResource = new CabinetResource(cabinetServiceMock);
            when(cabinetServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restCabinetMockMvc = MockMvcBuilders.standaloneSetup(cabinetResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restCabinetMockMvc.perform(get("/api/cabinets?eagerload=true"))
        .andExpect(status().isOk());

            verify(cabinetServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getCabinet() throws Exception {
        // Initialize the database
        cabinetRepository.saveAndFlush(cabinet);

        // Get the cabinet
        restCabinetMockMvc.perform(get("/api/cabinets/{id}", cabinet.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(cabinet.getId().intValue()))
            .andExpect(jsonPath("$.orgId").value(DEFAULT_ORG_ID.toString()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.activity").value(DEFAULT_ACTIVITY.toString()))
            .andExpect(jsonPath("$.website").value(DEFAULT_WEBSITE.toString()))
            .andExpect(jsonPath("$.logoContentType").value(DEFAULT_LOGO_CONTENT_TYPE))
            .andExpect(jsonPath("$.logo").value(Base64Utils.encodeToString(DEFAULT_LOGO)));
    }
    @Test
    @Transactional
    public void getNonExistingCabinet() throws Exception {
        // Get the cabinet
        restCabinetMockMvc.perform(get("/api/cabinets/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCabinet() throws Exception {
        // Initialize the database
        cabinetService.save(cabinet);

        int databaseSizeBeforeUpdate = cabinetRepository.findAll().size();

        // Update the cabinet
        Cabinet updatedCabinet = cabinetRepository.findById(cabinet.getId()).get();
        // Disconnect from session so that the updates on updatedCabinet are not directly saved in db
        em.detach(updatedCabinet);
        updatedCabinet
            .orgId(UPDATED_ORG_ID)
            .name(UPDATED_NAME)
            .activity(UPDATED_ACTIVITY)
            .website(UPDATED_WEBSITE)
            .logo(UPDATED_LOGO)
            .logoContentType(UPDATED_LOGO_CONTENT_TYPE);

        restCabinetMockMvc.perform(put("/api/cabinets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCabinet)))
            .andExpect(status().isOk());

        // Validate the Cabinet in the database
        List<Cabinet> cabinetList = cabinetRepository.findAll();
        assertThat(cabinetList).hasSize(databaseSizeBeforeUpdate);
        Cabinet testCabinet = cabinetList.get(cabinetList.size() - 1);
        assertThat(testCabinet.getOrgId()).isEqualTo(UPDATED_ORG_ID);
        assertThat(testCabinet.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testCabinet.getActivity()).isEqualTo(UPDATED_ACTIVITY);
        assertThat(testCabinet.getWebsite()).isEqualTo(UPDATED_WEBSITE);
        assertThat(testCabinet.getLogo()).isEqualTo(UPDATED_LOGO);
        assertThat(testCabinet.getLogoContentType()).isEqualTo(UPDATED_LOGO_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingCabinet() throws Exception {
        int databaseSizeBeforeUpdate = cabinetRepository.findAll().size();

        // Create the Cabinet

        // If the entity doesn't have an ID, it will throw BadRequestAlertException 
        restCabinetMockMvc.perform(put("/api/cabinets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cabinet)))
            .andExpect(status().isBadRequest());

        // Validate the Cabinet in the database
        List<Cabinet> cabinetList = cabinetRepository.findAll();
        assertThat(cabinetList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCabinet() throws Exception {
        // Initialize the database
        cabinetService.save(cabinet);

        int databaseSizeBeforeDelete = cabinetRepository.findAll().size();

        // Get the cabinet
        restCabinetMockMvc.perform(delete("/api/cabinets/{id}", cabinet.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Cabinet> cabinetList = cabinetRepository.findAll();
        assertThat(cabinetList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Cabinet.class);
        Cabinet cabinet1 = new Cabinet();
        cabinet1.setId(1L);
        Cabinet cabinet2 = new Cabinet();
        cabinet2.setId(cabinet1.getId());
        assertThat(cabinet1).isEqualTo(cabinet2);
        cabinet2.setId(2L);
        assertThat(cabinet1).isNotEqualTo(cabinet2);
        cabinet1.setId(null);
        assertThat(cabinet1).isNotEqualTo(cabinet2);
    }
}
