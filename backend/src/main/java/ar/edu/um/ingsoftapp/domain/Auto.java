package ar.edu.um.ingsoftapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Auto.
 */
@Entity
@Table(name = "auto")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Auto implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "modelo", nullable = false)
    private String modelo;

    @NotNull
    @Column(name = "km", nullable = false)
    private Integer km;

    @NotNull
    @Column(name = "hp", nullable = false)
    private Integer hp;

    @NotNull
    @Column(name = "transmision", nullable = false)
    private String transmision;

    @NotNull
    @Column(name = "precio", nullable = false)
    private Double precio;

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "img")
    private String img;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "auto")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "auto", "user" }, allowSetters = true)
    private Set<Alquiler> alquilers = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Auto id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getModelo() {
        return this.modelo;
    }

    public Auto modelo(String modelo) {
        this.setModelo(modelo);
        return this;
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    public Integer getKm() {
        return this.km;
    }

    public Auto km(Integer km) {
        this.setKm(km);
        return this;
    }

    public void setKm(Integer km) {
        this.km = km;
    }

    public Integer getHp() {
        return this.hp;
    }

    public Auto hp(Integer hp) {
        this.setHp(hp);
        return this;
    }

    public void setHp(Integer hp) {
        this.hp = hp;
    }

    public String getTransmision() {
        return this.transmision;
    }

    public Auto transmision(String transmision) {
        this.setTransmision(transmision);
        return this;
    }

    public void setTransmision(String transmision) {
        this.transmision = transmision;
    }

    public Double getPrecio() {
        return this.precio;
    }

    public Auto precio(Double precio) {
        this.setPrecio(precio);
        return this;
    }

    public void setPrecio(Double precio) {
        this.precio = precio;
    }

    public String getDescripcion() {
        return this.descripcion;
    }

    public Auto descripcion(String descripcion) {
        this.setDescripcion(descripcion);
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getImg() {
        return this.img;
    }

    public Auto img(String img) {
        this.setImg(img);
        return this;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public Set<Alquiler> getAlquilers() {
        return this.alquilers;
    }

    public void setAlquilers(Set<Alquiler> alquilers) {
        if (this.alquilers != null) {
            this.alquilers.forEach(i -> i.setAuto(null));
        }
        if (alquilers != null) {
            alquilers.forEach(i -> i.setAuto(this));
        }
        this.alquilers = alquilers;
    }

    public Auto alquilers(Set<Alquiler> alquilers) {
        this.setAlquilers(alquilers);
        return this;
    }

    public Auto addAlquiler(Alquiler alquiler) {
        this.alquilers.add(alquiler);
        alquiler.setAuto(this);
        return this;
    }

    public Auto removeAlquiler(Alquiler alquiler) {
        this.alquilers.remove(alquiler);
        alquiler.setAuto(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Auto)) {
            return false;
        }
        return getId() != null && getId().equals(((Auto) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Auto{" +
            "id=" + getId() +
            ", modelo='" + getModelo() + "'" +
            ", km=" + getKm() +
            ", hp=" + getHp() +
            ", transmision='" + getTransmision() + "'" +
            ", precio=" + getPrecio() +
            ", descripcion='" + getDescripcion() + "'" +
            ", img='" + getImg() + "'" +
            "}";
    }
}
