package fr.perioline.service;

import fr.perioline.domain.PaymentDetails;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing PaymentDetails.
 */
public interface PaymentDetailsService {

    /**
     * Save a paymentDetails.
     *
     * @param paymentDetails the entity to save
     * @return the persisted entity
     */
    PaymentDetails save(PaymentDetails paymentDetails);

    /**
     * Get all the paymentDetails.
     *
     * @return the list of entities
     */
    List<PaymentDetails> findAll();


    /**
     * Get the "id" paymentDetails.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<PaymentDetails> findOne(Long id);

    /**
     * Delete the "id" paymentDetails.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
