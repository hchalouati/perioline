package fr.perioline.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

import fr.perioline.domain.enumeration.CardType;

/**
 * A PaymentDetails.
 */
@Entity
@Table(name = "payment_details")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class PaymentDetails implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "org_id")
    private String orgId;

    @Enumerated(EnumType.STRING)
    @Column(name = "jhi_type")
    private CardType type;

    @Column(name = "jhi_number")
    private String number;

    @Column(name = "expiration_month")
    private Integer expirationMonth;

    @Column(name = "expiration_year")
    private Integer expirationYear;

    @Column(name = "security_code")
    private Integer securityCode;

    @Column(name = "default_card")
    private Boolean defaultCard;

    @ManyToOne
    @JsonIgnoreProperties("cabinets")
    private Cabinet cabinet;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOrgId() {
        return orgId;
    }

    public PaymentDetails orgId(String orgId) {
        this.orgId = orgId;
        return this;
    }

    public void setOrgId(String orgId) {
        this.orgId = orgId;
    }

    public CardType getType() {
        return type;
    }

    public PaymentDetails type(CardType type) {
        this.type = type;
        return this;
    }

    public void setType(CardType type) {
        this.type = type;
    }

    public String getNumber() {
        return number;
    }

    public PaymentDetails number(String number) {
        this.number = number;
        return this;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public Integer getExpirationMonth() {
        return expirationMonth;
    }

    public PaymentDetails expirationMonth(Integer expirationMonth) {
        this.expirationMonth = expirationMonth;
        return this;
    }

    public void setExpirationMonth(Integer expirationMonth) {
        this.expirationMonth = expirationMonth;
    }

    public Integer getExpirationYear() {
        return expirationYear;
    }

    public PaymentDetails expirationYear(Integer expirationYear) {
        this.expirationYear = expirationYear;
        return this;
    }

    public void setExpirationYear(Integer expirationYear) {
        this.expirationYear = expirationYear;
    }

    public Integer getSecurityCode() {
        return securityCode;
    }

    public PaymentDetails securityCode(Integer securityCode) {
        this.securityCode = securityCode;
        return this;
    }

    public void setSecurityCode(Integer securityCode) {
        this.securityCode = securityCode;
    }

    public Boolean isDefaultCard() {
        return defaultCard;
    }

    public PaymentDetails defaultCard(Boolean defaultCard) {
        this.defaultCard = defaultCard;
        return this;
    }

    public void setDefaultCard(Boolean defaultCard) {
        this.defaultCard = defaultCard;
    }

    public Cabinet getCabinet() {
        return cabinet;
    }

    public PaymentDetails cabinet(Cabinet cabinet) {
        this.cabinet = cabinet;
        return this;
    }

    public void setCabinet(Cabinet cabinet) {
        this.cabinet = cabinet;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        PaymentDetails paymentDetails = (PaymentDetails) o;
        if (paymentDetails.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), paymentDetails.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PaymentDetails{" +
            "id=" + getId() +
            ", orgId='" + getOrgId() + "'" +
            ", type='" + getType() + "'" +
            ", number='" + getNumber() + "'" +
            ", expirationMonth=" + getExpirationMonth() +
            ", expirationYear=" + getExpirationYear() +
            ", securityCode=" + getSecurityCode() +
            ", defaultCard='" + isDefaultCard() + "'" +
            "}";
    }
}
