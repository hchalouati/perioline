package fr.perioline.web.rest;

import fr.perioline.PeriolineApp;

import fr.perioline.domain.Practitioner;
import fr.perioline.repository.PractitionerRepository;
import fr.perioline.service.PractitionerService;
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
import org.springframework.util.Base64Utils;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;


import static fr.perioline.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import fr.perioline.domain.enumeration.Gender;
/**
 * Test class for the PractitionerResource REST controller.
 *
 * @see PractitionerResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PeriolineApp.class)
public class PractitionerResourceIntTest {

    private static final Gender DEFAULT_GENDER = Gender.MALE;
    private static final Gender UPDATED_GENDER = Gender.FEMALE;

    private static final String DEFAULT_FIRST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_FIRST_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_LAST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_LAST_NAME = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_BIRTH_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_BIRTH_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_CIVILITY = "AAAAAAAAAA";
    private static final String UPDATED_CIVILITY = "BBBBBBBBBB";

    private static final String DEFAULT_DIPLOMA = "AAAAAAAAAA";
    private static final String UPDATED_DIPLOMA = "BBBBBBBBBB";

    private static final byte[] DEFAULT_PHOTO = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_PHOTO = TestUtil.createByteArray(2, "1");
    private static final String DEFAULT_PHOTO_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_PHOTO_CONTENT_TYPE = "image/png";

    private static final String DEFAULT_SIGNATURE = "AAAAAAAAAA";
    private static final String UPDATED_SIGNATURE = "BBBBBBBBBB";

    @Autowired
    private PractitionerRepository practitionerRepository;

    

    @Autowired
    private PractitionerService practitionerService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPractitionerMockMvc;

    private Practitioner practitioner;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PractitionerResource practitionerResource = new PractitionerResource(practitionerService);
        this.restPractitionerMockMvc = MockMvcBuilders.standaloneSetup(practitionerResource)
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
    public static Practitioner createEntity(EntityManager em) {
        Practitioner practitioner = new Practitioner()
            .gender(DEFAULT_GENDER)
            .firstName(DEFAULT_FIRST_NAME)
            .lastName(DEFAULT_LAST_NAME)
            .birthDate(DEFAULT_BIRTH_DATE)
            .civility(DEFAULT_CIVILITY)
            .diploma(DEFAULT_DIPLOMA)
            .photo(DEFAULT_PHOTO)
            .photoContentType(DEFAULT_PHOTO_CONTENT_TYPE)
            .signature(DEFAULT_SIGNATURE);
        return practitioner;
    }

    @Before
    public void initTest() {
        practitioner = createEntity(em);
    }

    @Test
    @Transactional
    public void createPractitioner() throws Exception {
        int databaseSizeBeforeCreate = practitionerRepository.findAll().size();

        // Create the Practitioner
        restPractitionerMockMvc.perform(post("/api/practitioners")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(practitioner)))
            .andExpect(status().isCreated());

        // Validate the Practitioner in the database
        List<Practitioner> practitionerList = practitionerRepository.findAll();
        assertThat(practitionerList).hasSize(databaseSizeBeforeCreate + 1);
        Practitioner testPractitioner = practitionerList.get(practitionerList.size() - 1);
        assertThat(testPractitioner.getGender()).isEqualTo(DEFAULT_GENDER);
        assertThat(testPractitioner.getFirstName()).isEqualTo(DEFAULT_FIRST_NAME);
        assertThat(testPractitioner.getLastName()).isEqualTo(DEFAULT_LAST_NAME);
        assertThat(testPractitioner.getBirthDate()).isEqualTo(DEFAULT_BIRTH_DATE);
        assertThat(testPractitioner.getCivility()).isEqualTo(DEFAULT_CIVILITY);
        assertThat(testPractitioner.getDiploma()).isEqualTo(DEFAULT_DIPLOMA);
        assertThat(testPractitioner.getPhoto()).isEqualTo(DEFAULT_PHOTO);
        assertThat(testPractitioner.getPhotoContentType()).isEqualTo(DEFAULT_PHOTO_CONTENT_TYPE);
        assertThat(testPractitioner.getSignature()).isEqualTo(DEFAULT_SIGNATURE);
    }

    @Test
    @Transactional
    public void createPractitionerWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = practitionerRepository.findAll().size();

        // Create the Practitioner with an existing ID
        practitioner.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPractitionerMockMvc.perform(post("/api/practitioners")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(practitioner)))
            .andExpect(status().isBadRequest());

        // Validate the Practitioner in the database
        List<Practitioner> practitionerList = practitionerRepository.findAll();
        assertThat(practitionerList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPractitioners() throws Exception {
        // Initialize the database
        practitionerRepository.saveAndFlush(practitioner);

        // Get all the practitionerList
        restPractitionerMockMvc.perform(get("/api/practitioners?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(practitioner.getId().intValue())))
            .andExpect(jsonPath("$.[*].gender").value(hasItem(DEFAULT_GENDER.toString())))
            .andExpect(jsonPath("$.[*].firstName").value(hasItem(DEFAULT_FIRST_NAME.toString())))
            .andExpect(jsonPath("$.[*].lastName").value(hasItem(DEFAULT_LAST_NAME.toString())))
            .andExpect(jsonPath("$.[*].birthDate").value(hasItem(DEFAULT_BIRTH_DATE.toString())))
            .andExpect(jsonPath("$.[*].civility").value(hasItem(DEFAULT_CIVILITY.toString())))
            .andExpect(jsonPath("$.[*].diploma").value(hasItem(DEFAULT_DIPLOMA.toString())))
            .andExpect(jsonPath("$.[*].photoContentType").value(hasItem(DEFAULT_PHOTO_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].photo").value(hasItem(Base64Utils.encodeToString(DEFAULT_PHOTO))))
            .andExpect(jsonPath("$.[*].signature").value(hasItem(DEFAULT_SIGNATURE.toString())));
    }
    

    @Test
    @Transactional
    public void getPractitioner() throws Exception {
        // Initialize the database
        practitionerRepository.saveAndFlush(practitioner);

        // Get the practitioner
        restPractitionerMockMvc.perform(get("/api/practitioners/{id}", practitioner.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(practitioner.getId().intValue()))
            .andExpect(jsonPath("$.gender").value(DEFAULT_GENDER.toString()))
            .andExpect(jsonPath("$.firstName").value(DEFAULT_FIRST_NAME.toString()))
            .andExpect(jsonPath("$.lastName").value(DEFAULT_LAST_NAME.toString()))
            .andExpect(jsonPath("$.birthDate").value(DEFAULT_BIRTH_DATE.toString()))
            .andExpect(jsonPath("$.civility").value(DEFAULT_CIVILITY.toString()))
            .andExpect(jsonPath("$.diploma").value(DEFAULT_DIPLOMA.toString()))
            .andExpect(jsonPath("$.photoContentType").value(DEFAULT_PHOTO_CONTENT_TYPE))
            .andExpect(jsonPath("$.photo").value(Base64Utils.encodeToString(DEFAULT_PHOTO)))
            .andExpect(jsonPath("$.signature").value(DEFAULT_SIGNATURE.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingPractitioner() throws Exception {
        // Get the practitioner
        restPractitionerMockMvc.perform(get("/api/practitioners/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePractitioner() throws Exception {
        // Initialize the database
        practitionerService.save(practitioner);

        int databaseSizeBeforeUpdate = practitionerRepository.findAll().size();

        // Update the practitioner
        Practitioner updatedPractitioner = practitionerRepository.findById(practitioner.getId()).get();
        // Disconnect from session so that the updates on updatedPractitioner are not directly saved in db
        em.detach(updatedPractitioner);
        updatedPractitioner
            .gender(UPDATED_GENDER)
            .firstName(UPDATED_FIRST_NAME)
            .lastName(UPDATED_LAST_NAME)
            .birthDate(UPDATED_BIRTH_DATE)
            .civility(UPDATED_CIVILITY)
            .diploma(UPDATED_DIPLOMA)
            .photo(UPDATED_PHOTO)
            .photoContentType(UPDATED_PHOTO_CONTENT_TYPE)
            .signature(UPDATED_SIGNATURE);

        restPractitionerMockMvc.perform(put("/api/practitioners")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPractitioner)))
            .andExpect(status().isOk());

        // Validate the Practitioner in the database
        List<Practitioner> practitionerList = practitionerRepository.findAll();
        assertThat(practitionerList).hasSize(databaseSizeBeforeUpdate);
        Practitioner testPractitioner = practitionerList.get(practitionerList.size() - 1);
        assertThat(testPractitioner.getGender()).isEqualTo(UPDATED_GENDER);
        assertThat(testPractitioner.getFirstName()).isEqualTo(UPDATED_FIRST_NAME);
        assertThat(testPractitioner.getLastName()).isEqualTo(UPDATED_LAST_NAME);
        assertThat(testPractitioner.getBirthDate()).isEqualTo(UPDATED_BIRTH_DATE);
        assertThat(testPractitioner.getCivility()).isEqualTo(UPDATED_CIVILITY);
        assertThat(testPractitioner.getDiploma()).isEqualTo(UPDATED_DIPLOMA);
        assertThat(testPractitioner.getPhoto()).isEqualTo(UPDATED_PHOTO);
        assertThat(testPractitioner.getPhotoContentType()).isEqualTo(UPDATED_PHOTO_CONTENT_TYPE);
        assertThat(testPractitioner.getSignature()).isEqualTo(UPDATED_SIGNATURE);
    }

    @Test
    @Transactional
    public void updateNonExistingPractitioner() throws Exception {
        int databaseSizeBeforeUpdate = practitionerRepository.findAll().size();

        // Create the Practitioner

        // If the entity doesn't have an ID, it will throw BadRequestAlertException 
        restPractitionerMockMvc.perform(put("/api/practitioners")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(practitioner)))
            .andExpect(status().isBadRequest());

        // Validate the Practitioner in the database
        List<Practitioner> practitionerList = practitionerRepository.findAll();
        assertThat(practitionerList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePractitioner() throws Exception {
        // Initialize the database
        practitionerService.save(practitioner);

        int databaseSizeBeforeDelete = practitionerRepository.findAll().size();

        // Get the practitioner
        restPractitionerMockMvc.perform(delete("/api/practitioners/{id}", practitioner.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Practitioner> practitionerList = practitionerRepository.findAll();
        assertThat(practitionerList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Practitioner.class);
        Practitioner practitioner1 = new Practitioner();
        practitioner1.setId(1L);
        Practitioner practitioner2 = new Practitioner();
        practitioner2.setId(practitioner1.getId());
        assertThat(practitioner1).isEqualTo(practitioner2);
        practitioner2.setId(2L);
        assertThat(practitioner1).isNotEqualTo(practitioner2);
        practitioner1.setId(null);
        assertThat(practitioner1).isNotEqualTo(practitioner2);
    }
}
