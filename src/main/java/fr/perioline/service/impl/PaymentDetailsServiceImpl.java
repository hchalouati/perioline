package fr.perioline.service.impl;

import fr.perioline.service.PaymentDetailsService;
import fr.perioline.domain.PaymentDetails;
import fr.perioline.repository.PaymentDetailsRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.Optional;
/**
 * Service Implementation for managing PaymentDetails.
 */
@Service
@Transactional
public class PaymentDetailsServiceImpl implements PaymentDetailsService {

    private final Logger log = LoggerFactory.getLogger(PaymentDetailsServiceImpl.class);

    private final PaymentDetailsRepository paymentDetailsRepository;

    public PaymentDetailsServiceImpl(PaymentDetailsRepository paymentDetailsRepository) {
        this.paymentDetailsRepository = paymentDetailsRepository;
    }

    /**
     * Save a paymentDetails.
     *
     * @param paymentDetails the entity to save
     * @return the persisted entity
     */
    @Override
    public PaymentDetails save(PaymentDetails paymentDetails) {
        log.debug("Request to save PaymentDetails : {}", paymentDetails);        return paymentDetailsRepository.save(paymentDetails);
    }

    /**
     * Get all the paymentDetails.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<PaymentDetails> findAll() {
        log.debug("Request to get all PaymentDetails");
        return paymentDetailsRepository.findAll();
    }


    /**
     * Get one paymentDetails by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<PaymentDetails> findOne(Long id) {
        log.debug("Request to get PaymentDetails : {}", id);
        return paymentDetailsRepository.findById(id);
    }

    /**
     * Delete the paymentDetails by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete PaymentDetails : {}", id);
        paymentDetailsRepository.deleteById(id);
    }
}
