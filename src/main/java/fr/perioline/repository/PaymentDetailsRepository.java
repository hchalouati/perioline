package fr.perioline.repository;

import fr.perioline.domain.PaymentDetails;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the PaymentDetails entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PaymentDetailsRepository extends JpaRepository<PaymentDetails, Long> {

}
