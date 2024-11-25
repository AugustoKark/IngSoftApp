package ar.edu.um.ingsoftapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Alquiler.
 */
@Entity
@Table(name = "alquiler")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Alquiler implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "dias", nullable = false)
    private Integer dias;

    @NotNull
    @Column(name = "precio_final", nullable = false)
    private Double precioFinal;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "alquilers" }, allowSetters = true)
    private Auto auto;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Alquiler id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getDias() {
        return this.dias;
    }

    public Alquiler dias(Integer dias) {
        this.setDias(dias);
        return this;
    }

    public void setDias(Integer dias) {
        this.dias = dias;
    }

    public Double getPrecioFinal() {
        return this.precioFinal;
    }

    public Alquiler precioFinal(Double precioFinal) {
        this.setPrecioFinal(precioFinal);
        return this;
    }

    public void setPrecioFinal(Double precioFinal) {
        this.precioFinal = precioFinal;
    }

    public Auto getAuto() {
        return this.auto;
    }

    public void setAuto(Auto auto) {
        this.auto = auto;
    }

    public Alquiler auto(Auto auto) {
        this.setAuto(auto);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Alquiler)) {
            return false;
        }
        return getId() != null && getId().equals(((Alquiler) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Alquiler{" +
            "id=" + getId() +
            ", dias=" + getDias() +
            ", precioFinal=" + getPrecioFinal() +
            "}";
    }
}
