package fr.perioline.web.rest;

import fr.perioline.PeriolineApp;

import fr.perioline.domain.PaymentDetails;
import fr.perioline.repository.PaymentDetailsRepository;
import fr.perioline.service.PaymentDetailsService;
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
import java.util.List;


import static fr.perioline.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import fr.perioline.domain.enumeration.CardType;
/**
 * Test class for the PaymentDetailsResource REST controller.
 *
 * @see PaymentDetailsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PeriolineApp.class)
public class PaymentDetailsResourceIntTest {

    private static final String DEFAULT_ORG_ID = "AAAAAAAAAA";
    private static final String UPDATED_ORG_ID = "BBBBBBBBBB";

    private static final CardType DEFAULT_TYPE = CardType.PERSONAL;
    private static final CardType UPDATED_TYPE = CardType.BUSINESS;

    private static final String DEFAULT_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_NUMBER = "BBBBBBBBBB";

    private static final Integer DEFAULT_EXPIRATION_MONTH = 1;
    private static final Integer UPDATED_EXPIRATION_MONTH = 2;

    private static final Integer DEFAULT_EXPIRATION_YEAR = 1;
    private static final Integer UPDATED_EXPIRATION_YEAR = 2;

    private static final Integer DEFAULT_SECURITY_CODE = 1;
    private static final Integer UPDATED_SECURITY_CODE = 2;

    private static final Boolean DEFAULT_DEFAULT_CARD = false;
    private static final Boolean UPDATED_DEFAULT_CARD = true;

    @Autowired
    private PaymentDetailsRepository paymentDetailsRepository;

    

    @Autowired
    private PaymentDetailsService paymentDetailsService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPaymentDetailsMockMvc;

    private PaymentDetails paymentDetails;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PaymentDetailsResource paymentDetailsResource = new PaymentDetailsResource(paymentDetailsService);
        this.restPaymentDetailsMockMvc = MockMvcBuilders.standaloneSetup(paymentDetailsResource)
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
    public static PaymentDetails createEntity(EntityManager em) {
        PaymentDetails paymentDetails = new PaymentDetails()
            .orgId(DEFAULT_ORG_ID)
            .type(DEFAULT_TYPE)
            .number(DEFAULT_NUMBER)
            .expirationMonth(DEFAULT_EXPIRATION_MONTH)
            .expirationYear(DEFAULT_EXPIRATION_YEAR)
            .securityCode(DEFAULT_SECURITY_CODE)
            .defaultCard(DEFAULT_DEFAULT_CARD);
        return paymentDetails;
    }

    @Before
    public void initTest() {
        paymentDetails = createEntity(em);
    }

    @Test
    @Transactional
    public void createPaymentDetails() throws Exception {
        int databaseSizeBeforeCreate = paymentDetailsRepository.findAll().size();

        // Create the PaymentDetails
        restPaymentDetailsMockMvc.perform(post("/api/payment-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(paymentDetails)))
            .andExpect(status().isCreated());

        // Validate the PaymentDetails in the database
        List<PaymentDetails> paymentDetailsList = paymentDetailsRepository.findAll();
        assertThat(paymentDetailsList).hasSize(databaseSizeBeforeCreate + 1);
        PaymentDetails testPaymentDetails = paymentDetailsList.get(paymentDetailsList.size() - 1);
        assertThat(testPaymentDetails.getOrgId()).isEqualTo(DEFAULT_ORG_ID);
        assertThat(testPaymentDetails.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testPaymentDetails.getNumber()).isEqualTo(DEFAULT_NUMBER);
        assertThat(testPaymentDetails.getExpirationMonth()).isEqualTo(DEFAULT_EXPIRATION_MONTH);
        assertThat(testPaymentDetails.getExpirationYear()).isEqualTo(DEFAULT_EXPIRATION_YEAR);
        assertThat(testPaymentDetails.getSecurityCode()).isEqualTo(DEFAULT_SECURITY_CODE);
        assertThat(testPaymentDetails.isDefaultCard()).isEqualTo(DEFAULT_DEFAULT_CARD);
    }

    @Test
    @Transactional
    public void createPaymentDetailsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = paymentDetailsRepository.findAll().size();

        // Create the PaymentDetails with an existing ID
        paymentDetails.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPaymentDetailsMockMvc.perform(post("/api/payment-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(paymentDetails)))
            .andExpect(status().isBadRequest());

        // Validate the PaymentDetails in the database
        List<PaymentDetails> paymentDetailsList = paymentDetailsRepository.findAll();
        assertThat(paymentDetailsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPaymentDetails() throws Exception {
        // Initialize the database
        paymentDetailsRepository.saveAndFlush(paymentDetails);

        // Get all the paymentDetailsList
        restPaymentDetailsMockMvc.perform(get("/api/payment-details?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(paymentDetails.getId().intValue())))
            .andExpect(jsonPath("$.[*].orgId").value(hasItem(DEFAULT_ORG_ID.toString())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].number").value(hasItem(DEFAULT_NUMBER.toString())))
            .andExpect(jsonPath("$.[*].expirationMonth").value(hasItem(DEFAULT_EXPIRATION_MONTH)))
            .andExpect(jsonPath("$.[*].expirationYear").value(hasItem(DEFAULT_EXPIRATION_YEAR)))
            .andExpect(jsonPath("$.[*].securityCode").value(hasItem(DEFAULT_SECURITY_CODE)))
            .andExpect(jsonPath("$.[*].defaultCard").value(hasItem(DEFAULT_DEFAULT_CARD.booleanValue())));
    }
    

    @Test
    @Transactional
    public void getPaymentDetails() throws Exception {
        // Initialize the database
        paymentDetailsRepository.saveAndFlush(paymentDetails);

        // Get the paymentDetails
        restPaymentDetailsMockMvc.perform(get("/api/payment-details/{id}", paymentDetails.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(paymentDetails.getId().intValue()))
            .andExpect(jsonPath("$.orgId").value(DEFAULT_ORG_ID.toString()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()))
            .andExpect(jsonPath("$.number").value(DEFAULT_NUMBER.toString()))
            .andExpect(jsonPath("$.expirationMonth").value(DEFAULT_EXPIRATION_MONTH))
            .andExpect(jsonPath("$.expirationYear").value(DEFAULT_EXPIRATION_YEAR))
            .andExpect(jsonPath("$.securityCode").value(DEFAULT_SECURITY_CODE))
            .andExpect(jsonPath("$.defaultCard").value(DEFAULT_DEFAULT_CARD.booleanValue()));
    }
    @Test
    @Transactional
    public void getNonExistingPaymentDetails() throws Exception {
        // Get the paymentDetails
        restPaymentDetailsMockMvc.perform(get("/api/payment-details/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePaymentDetails() throws Exception {
        // Initialize the database
        paymentDetailsService.save(paymentDetails);

        int databaseSizeBeforeUpdate = paymentDetailsRepository.findAll().size();

        // Update the paymentDetails
        PaymentDetails updatedPaymentDetails = paymentDetailsRepository.findById(paymentDetails.getId()).get();
        // Disconnect from session so that the updates on updatedPaymentDetails are not directly saved in db
        em.detach(updatedPaymentDetails);
        updatedPaymentDetails
            .orgId(UPDATED_ORG_ID)
            .type(UPDATED_TYPE)
            .number(UPDATED_NUMBER)
            .expirationMonth(UPDATED_EXPIRATION_MONTH)
            .expirationYear(UPDATED_EXPIRATION_YEAR)
            .securityCode(UPDATED_SECURITY_CODE)
            .defaultCard(UPDATED_DEFAULT_CARD);

        restPaymentDetailsMockMvc.perform(put("/api/payment-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPaymentDetails)))
            .andExpect(status().isOk());

        // Validate the PaymentDetails in the database
        List<PaymentDetails> paymentDetailsList = paymentDetailsRepository.findAll();
        assertThat(paymentDetailsList).hasSize(databaseSizeBeforeUpdate);
        PaymentDetails testPaymentDetails = paymentDetailsList.get(paymentDetailsList.size() - 1);
        assertThat(testPaymentDetails.getOrgId()).isEqualTo(UPDATED_ORG_ID);
        assertThat(testPaymentDetails.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testPaymentDetails.getNumber()).isEqualTo(UPDATED_NUMBER);
        assertThat(testPaymentDetails.getExpirationMonth()).isEqualTo(UPDATED_EXPIRATION_MONTH);
        assertThat(testPaymentDetails.getExpirationYear()).isEqualTo(UPDATED_EXPIRATION_YEAR);
        assertThat(testPaymentDetails.getSecurityCode()).isEqualTo(UPDATED_SECURITY_CODE);
        assertThat(testPaymentDetails.isDefaultCard()).isEqualTo(UPDATED_DEFAULT_CARD);
    }

    @Test
    @Transactional
    public void updateNonExistingPaymentDetails() throws Exception {
        int databaseSizeBeforeUpdate = paymentDetailsRepository.findAll().size();

        // Create the PaymentDetails

        // If the entity doesn't have an ID, it will throw BadRequestAlertException 
        restPaymentDetailsMockMvc.perform(put("/api/payment-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(paymentDetails)))
            .andExpect(status().isBadRequest());

        // Validate the PaymentDetails in the database
        List<PaymentDetails> paymentDetailsList = paymentDetailsRepository.findAll();
        assertThat(paymentDetailsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePaymentDetails() throws Exception {
        // Initialize the database
        paymentDetailsService.save(paymentDetails);

        int databaseSizeBeforeDelete = paymentDetailsRepository.findAll().size();

        // Get the paymentDetails
        restPaymentDetailsMockMvc.perform(delete("/api/payment-details/{id}", paymentDetails.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<PaymentDetails> paymentDetailsList = paymentDetailsRepository.findAll();
        assertThat(paymentDetailsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PaymentDetails.class);
        PaymentDetails paymentDetails1 = new PaymentDetails();
        paymentDetails1.setId(1L);
        PaymentDetails paymentDetails2 = new PaymentDetails();
        paymentDetails2.setId(paymentDetails1.getId());
        assertThat(paymentDetails1).isEqualTo(paymentDetails2);
        paymentDetails2.setId(2L);
        assertThat(paymentDetails1).isNotEqualTo(paymentDetails2);
        paymentDetails1.setId(null);
        assertThat(paymentDetails1).isNotEqualTo(paymentDetails2);
    }
}
