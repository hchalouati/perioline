package fr.perioline.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A Invoice.
 */
@Entity
@Table(name = "invoice")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Invoice implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "org_id")
    private String orgId;

    @Column(name = "product_name")
    private String productName;

    @Column(name = "jhi_date")
    private LocalDate date;

    @Column(name = "total")
    private Integer total;

    @Column(name = "invoice_pdf")
    private String invoicePDF;

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

    public Invoice orgId(String orgId) {
        this.orgId = orgId;
        return this;
    }

    public void setOrgId(String orgId) {
        this.orgId = orgId;
    }

    public String getProductName() {
        return productName;
    }

    public Invoice productName(String productName) {
        this.productName = productName;
        return this;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public LocalDate getDate() {
        return date;
    }

    public Invoice date(LocalDate date) {
        this.date = date;
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Integer getTotal() {
        return total;
    }

    public Invoice total(Integer total) {
        this.total = total;
        return this;
    }

    public void setTotal(Integer total) {
        this.total = total;
    }

    public String getInvoicePDF() {
        return invoicePDF;
    }

    public Invoice invoicePDF(String invoicePDF) {
        this.invoicePDF = invoicePDF;
        return this;
    }

    public void setInvoicePDF(String invoicePDF) {
        this.invoicePDF = invoicePDF;
    }

    public Cabinet getCabinet() {
        return cabinet;
    }

    public Invoice cabinet(Cabinet cabinet) {
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
        Invoice invoice = (Invoice) o;
        if (invoice.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), invoice.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Invoice{" +
            "id=" + getId() +
            ", orgId='" + getOrgId() + "'" +
            ", productName='" + getProductName() + "'" +
            ", date='" + getDate() + "'" +
            ", total=" + getTotal() +
            ", invoicePDF='" + getInvoicePDF() + "'" +
            "}";
    }
}
