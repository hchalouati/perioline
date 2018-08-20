package fr.perioline.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Cabinet.
 */
@Entity
@Table(name = "cabinet")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Cabinet implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "org_id")
    private String orgId;

    @Column(name = "name")
    private String name;

    @Column(name = "activity")
    private String activity;

    @Column(name = "website")
    private String website;

    @Lob
    @Column(name = "logo")
    private byte[] logo;

    @Column(name = "logo_content_type")
    private String logoContentType;

    @OneToOne
    @JoinColumn(unique = true)
    private Contact cabinet;

    @OneToMany(mappedBy = "cabinet")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Invoice> cabinets = new HashSet<>();

    @OneToMany(mappedBy = "cabinet")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Practitioner> cabinets = new HashSet<>();

    @OneToMany(mappedBy = "cabinet")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<PaymentDetails> cabinets = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "cabinet_cabinet",
               joinColumns = @JoinColumn(name = "cabinets_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "cabinets_id", referencedColumnName = "id"))
    private Set<Practitioner> cabinets = new HashSet<>();

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

    public Cabinet orgId(String orgId) {
        this.orgId = orgId;
        return this;
    }

    public void setOrgId(String orgId) {
        this.orgId = orgId;
    }

    public String getName() {
        return name;
    }

    public Cabinet name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getActivity() {
        return activity;
    }

    public Cabinet activity(String activity) {
        this.activity = activity;
        return this;
    }

    public void setActivity(String activity) {
        this.activity = activity;
    }

    public String getWebsite() {
        return website;
    }

    public Cabinet website(String website) {
        this.website = website;
        return this;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public byte[] getLogo() {
        return logo;
    }

    public Cabinet logo(byte[] logo) {
        this.logo = logo;
        return this;
    }

    public void setLogo(byte[] logo) {
        this.logo = logo;
    }

    public String getLogoContentType() {
        return logoContentType;
    }

    public Cabinet logoContentType(String logoContentType) {
        this.logoContentType = logoContentType;
        return this;
    }

    public void setLogoContentType(String logoContentType) {
        this.logoContentType = logoContentType;
    }

    public Contact getCabinet() {
        return cabinet;
    }

    public Cabinet cabinet(Contact contact) {
        this.cabinet = contact;
        return this;
    }

    public void setCabinet(Contact contact) {
        this.cabinet = contact;
    }

    public Set<Invoice> getCabinets() {
        return cabinets;
    }

    public Cabinet cabinets(Set<Invoice> invoices) {
        this.cabinets = invoices;
        return this;
    }

    public Cabinet addCabinet(Invoice invoice) {
        this.cabinets.add(invoice);
        invoice.setCabinet(this);
        return this;
    }

    public Cabinet removeCabinet(Invoice invoice) {
        this.cabinets.remove(invoice);
        invoice.setCabinet(null);
        return this;
    }

    public void setCabinets(Set<Invoice> invoices) {
        this.cabinets = invoices;
    }

    public Set<Practitioner> getCabinets() {
        return cabinets;
    }

    public Cabinet cabinets(Set<Practitioner> practitioners) {
        this.cabinets = practitioners;
        return this;
    }

    public Cabinet addCabinet(Practitioner practitioner) {
        this.cabinets.add(practitioner);
        practitioner.setCabinet(this);
        return this;
    }

    public Cabinet removeCabinet(Practitioner practitioner) {
        this.cabinets.remove(practitioner);
        practitioner.setCabinet(null);
        return this;
    }

    public void setCabinets(Set<Practitioner> practitioners) {
        this.cabinets = practitioners;
    }

    public Set<PaymentDetails> getCabinets() {
        return cabinets;
    }

    public Cabinet cabinets(Set<PaymentDetails> paymentDetails) {
        this.cabinets = paymentDetails;
        return this;
    }

    public Cabinet addCabinet(PaymentDetails paymentDetails) {
        this.cabinets.add(paymentDetails);
        paymentDetails.setCabinet(this);
        return this;
    }

    public Cabinet removeCabinet(PaymentDetails paymentDetails) {
        this.cabinets.remove(paymentDetails);
        paymentDetails.setCabinet(null);
        return this;
    }

    public void setCabinets(Set<PaymentDetails> paymentDetails) {
        this.cabinets = paymentDetails;
    }

    public Set<Practitioner> getCabinets() {
        return cabinets;
    }

    public Cabinet cabinets(Set<Practitioner> practitioners) {
        this.cabinets = practitioners;
        return this;
    }

    public Cabinet addCabinet(Practitioner practitioner) {
        this.cabinets.add(practitioner);
        practitioner.getPractitioners().add(this);
        return this;
    }

    public Cabinet removeCabinet(Practitioner practitioner) {
        this.cabinets.remove(practitioner);
        practitioner.getPractitioners().remove(this);
        return this;
    }

    public void setCabinets(Set<Practitioner> practitioners) {
        this.cabinets = practitioners;
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
        Cabinet cabinet = (Cabinet) o;
        if (cabinet.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cabinet.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Cabinet{" +
            "id=" + getId() +
            ", orgId='" + getOrgId() + "'" +
            ", name='" + getName() + "'" +
            ", activity='" + getActivity() + "'" +
            ", website='" + getWebsite() + "'" +
            ", logo='" + getLogo() + "'" +
            ", logoContentType='" + getLogoContentType() + "'" +
            "}";
    }
}
