package ar.edu.um.ingsoftapp.service.dto;


import ar.edu.um.ingsoftapp.domain.Alquiler;
import jakarta.validation.constraints.NotNull;

public class AlquilerDTO {

    private Long id;

    @NotNull
    private Integer dias;

    @NotNull
    private Long autoId;

    @NotNull
    private Long userId;

    private String autoNombre;
    private Double precioFinal;

    private String autoImg;
    public AlquilerDTO() {
    }



    public AlquilerDTO(Alquiler alquiler) {
        this.id = alquiler.getId();
        this.dias = alquiler.getDias();
        this.precioFinal = alquiler.getPrecioFinal();
        this.autoId = alquiler.getAuto().getId();
        this.autoNombre = alquiler.getAuto().getModelo();
        this.userId = alquiler.getUser().getId();
        this.autoImg = alquiler.getAuto().getImg();

    }

    // Getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getDias() {
        return dias;
    }

    public void setDias(Integer dias) {
        this.dias = dias;
    }

    public Long getAutoId() {
        return autoId;
    }

    public void setAutoId(Long autoId) {
        this.autoId = autoId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getAutoNombre() {
        return autoNombre;
    }

    public void setAutoNombre(String autoNombre) {
        this.autoNombre = autoNombre;
    }

    public Double getPrecioFinal() {
        return precioFinal;
    }

    public void setPrecioFinal(Double precioFinal) {
        this.precioFinal = precioFinal;
    }

    public String getAutoImg() {
        return autoImg;
    }

    public void setAutoImg(String autoImg) {
        this.autoImg = autoImg;
    }


}
