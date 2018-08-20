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
 * A Practitioner.
 */
@Entity
@Table(name = "practitioner")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Practitioner implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "gender")
    private Gender gender;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "birth_date")
    private LocalDate birthDate;

    @Column(name = "civility")
    private String civility;

    @Column(name = "diploma")
    private String diploma;

    @Lob
    @Column(name = "photo")
    private byte[] photo;

    @Column(name = "photo_content_type")
    private String photoContentType;

    @Column(name = "signature")
    private String signature;

    @ManyToOne
    @JsonIgnoreProperties("cabinets")
    private Cabinet cabinet;

    @OneToOne
    @JoinColumn(unique = true)
    private Contact practitioner;

    @OneToMany(mappedBy = "practitioner")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Patient> practitioners = new HashSet<>();

    @ManyToMany(mappedBy = "cabinets")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Cabinet> practitioners = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Gender getGender() {
        return gender;
    }

    public Practitioner gender(Gender gender) {
        this.gender = gender;
        return this;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public String getFirstName() {
        return firstName;
    }

    public Practitioner firstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public Practitioner lastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public Practitioner birthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
        return this;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }

    public String getCivility() {
        return civility;
    }

    public Practitioner civility(String civility) {
        this.civility = civility;
        return this;
    }

    public void setCivility(String civility) {
        this.civility = civility;
    }

    public String getDiploma() {
        return diploma;
    }

    public Practitioner diploma(String diploma) {
        this.diploma = diploma;
        return this;
    }

    public void setDiploma(String diploma) {
        this.diploma = diploma;
    }

    public byte[] getPhoto() {
        return photo;
    }

    public Practitioner photo(byte[] photo) {
        this.photo = photo;
        return this;
    }

    public void setPhoto(byte[] photo) {
        this.photo = photo;
    }

    public String getPhotoContentType() {
        return photoContentType;
    }

    public Practitioner photoContentType(String photoContentType) {
        this.photoContentType = photoContentType;
        return this;
    }

    public void setPhotoContentType(String photoContentType) {
        this.photoContentType = photoContentType;
    }

    public String getSignature() {
        return signature;
    }

    public Practitioner signature(String signature) {
        this.signature = signature;
        return this;
    }

    public void setSignature(String signature) {
        this.signature = signature;
    }

    public Cabinet getCabinet() {
        return cabinet;
    }

    public Practitioner cabinet(Cabinet cabinet) {
        this.cabinet = cabinet;
        return this;
    }

    public void setCabinet(Cabinet cabinet) {
        this.cabinet = cabinet;
    }

    public Contact getPractitioner() {
        return practitioner;
    }

    public Practitioner practitioner(Contact contact) {
        this.practitioner = contact;
        return this;
    }

    public void setPractitioner(Contact contact) {
        this.practitioner = contact;
    }

    public Set<Patient> getPractitioners() {
        return practitioners;
    }

    public Practitioner practitioners(Set<Patient> patients) {
        this.practitioners = patients;
        return this;
    }

    public Practitioner addPractitioner(Patient patient) {
        this.practitioners.add(patient);
        patient.setPractitioner(this);
        return this;
    }

    public Practitioner removePractitioner(Patient patient) {
        this.practitioners.remove(patient);
        patient.setPractitioner(null);
        return this;
    }

    public void setPractitioners(Set<Patient> patients) {
        this.practitioners = patients;
    }

    public Set<Cabinet> getPractitioners() {
        return practitioners;
    }

    public Practitioner practitioners(Set<Cabinet> cabinets) {
        this.practitioners = cabinets;
        return this;
    }

    public Practitioner addPractitioner(Cabinet cabinet) {
        this.practitioners.add(cabinet);
        cabinet.getCabinets().add(this);
        return this;
    }

    public Practitioner removePractitioner(Cabinet cabinet) {
        this.practitioners.remove(cabinet);
        cabinet.getCabinets().remove(this);
        return this;
    }

    public void setPractitioners(Set<Cabinet> cabinets) {
        this.practitioners = cabinets;
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
        Practitioner practitioner = (Practitioner) o;
        if (practitioner.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), practitioner.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Practitioner{" +
            "id=" + getId() +
            ", gender='" + getGender() + "'" +
            ", firstName='" + getFirstName() + "'" +
            ", lastName='" + getLastName() + "'" +
            ", birthDate='" + getBirthDate() + "'" +
            ", civility='" + getCivility() + "'" +
            ", diploma='" + getDiploma() + "'" +
            ", photo='" + getPhoto() + "'" +
            ", photoContentType='" + getPhotoContentType() + "'" +
            ", signature='" + getSignature() + "'" +
            "}";
    }
}
