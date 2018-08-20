package fr.perioline.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import fr.perioline.domain.enumeration.Gender;

/**
 * A Patient.
 */
@Entity
@Table(name = "patient")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Patient implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "org_id")
    private String orgId;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Enumerated(EnumType.STRING)
    @Column(name = "gender")
    private Gender gender;

    @Column(name = "birth_date")
    private LocalDate birthDate;

    @Column(name = "civility")
    private String civility;

    @Column(name = "profession")
    private String profession;

    @Column(name = "note")
    private String note;

    @OneToOne
    @JoinColumn(unique = true)
    private Contact patient;

    @OneToMany(mappedBy = "patient")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Charting> patiens = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("practitioners")
    private Practitioner practitioner;

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

    public Patient orgId(String orgId) {
        this.orgId = orgId;
        return this;
    }

    public void setOrgId(String orgId) {
        this.orgId = orgId;
    }

    public String getFirstName() {
        return firstName;
    }

    public Patient firstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public Patient lastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Gender getGender() {
        return gender;
    }

    public Patient gender(Gender gender) {
        this.gender = gender;
        return this;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public Patient birthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
        return this;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }

    public String getCivility() {
        return civility;
    }

    public Patient civility(String civility) {
        this.civility = civility;
        return this;
    }

    public void setCivility(String civility) {
        this.civility = civility;
    }

    public String getProfession() {
        return profession;
    }

    public Patient profession(String profession) {
        this.profession = profession;
        return this;
    }

    public void setProfession(String profession) {
        this.profession = profession;
    }

    public String getNote() {
        return note;
    }

    public Patient note(String note) {
        this.note = note;
        return this;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public Contact getPatient() {
        return patient;
    }

    public Patient patient(Contact contact) {
        this.patient = contact;
        return this;
    }

    public void setPatient(Contact contact) {
        this.patient = contact;
    }

    public Set<Charting> getPatiens() {
        return patiens;
    }

    public Patient patiens(Set<Charting> chartings) {
        this.patiens = chartings;
        return this;
    }

    public Patient addPatien(Charting charting) {
        this.patiens.add(charting);
        charting.setPatient(this);
        return this;
    }

    public Patient removePatien(Charting charting) {
        this.patiens.remove(charting);
        charting.setPatient(null);
        return this;
    }

    public void setPatiens(Set<Charting> chartings) {
        this.patiens = chartings;
    }

    public Practitioner getPractitioner() {
        return practitioner;
    }

    public Patient practitioner(Practitioner practitioner) {
        this.practitioner = practitioner;
        return this;
    }

    public void setPractitioner(Practitioner practitioner) {
        this.practitioner = practitioner;
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
        Patient patient = (Patient) o;
        if (patient.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), patient.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Patient{" +
            "id=" + getId() +
            ", orgId='" + getOrgId() + "'" +
            ", firstName='" + getFirstName() + "'" +
            ", lastName='" + getLastName() + "'" +
            ", gender='" + getGender() + "'" +
            ", birthDate='" + getBirthDate() + "'" +
            ", civility='" + getCivility() + "'" +
            ", profession='" + getProfession() + "'" +
            ", note='" + getNote() + "'" +
            "}";
    }
}
