package ar.edu.um.ingsoftapp.web.rest;

import static org.mockito.Mockito.*;
import static org.assertj.core.api.Assertions.assertThat;

import ar.edu.um.ingsoftapp.domain.Alquiler;
import ar.edu.um.ingsoftapp.domain.Auto;
import ar.edu.um.ingsoftapp.domain.User;
import ar.edu.um.ingsoftapp.repository.AlquilerRepository;
import ar.edu.um.ingsoftapp.repository.AutoRepository;
import ar.edu.um.ingsoftapp.repository.UserRepository;
import ar.edu.um.ingsoftapp.service.dto.AlquilerDTO;
import ar.edu.um.ingsoftapp.web.rest.AlquilerResource;
import ar.edu.um.ingsoftapp.web.rest.errors.BadRequestAlertException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.net.URISyntaxException;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

class AlquilerResourceTest {

    @Mock
    private AlquilerRepository alquilerRepository;

    @Mock
    private AutoRepository autoRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private AlquilerResource alquilerResource;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void createAlquiler() throws URISyntaxException {
        // Arrange
        AlquilerDTO alquilerDTO = new AlquilerDTO();
        alquilerDTO.setDias(5);
        alquilerDTO.setAutoId(2L);
        alquilerDTO.setUserId(1050L);

        Auto auto = new Auto();
        auto.setId(2L);
        auto.setPrecio(100.0);

        User user = new User();
        user.setId(1050L);

        Alquiler alquiler = new Alquiler();
        alquiler.setDias(5);
        alquiler.setPrecioFinal(500.0);
        alquiler.setAuto(auto);
        alquiler.setUser(user);
        alquiler.setId(1L); // Simulamos la generación del ID

        when(autoRepository.findById(2L)).thenReturn(Optional.of(auto));
        when(userRepository.findById(1050L)).thenReturn(Optional.of(user));
        when(alquilerRepository.save(any(Alquiler.class))).thenReturn(alquiler);

        // Act
        ResponseEntity<Alquiler> response = alquilerResource.createAlquiler(alquilerDTO);

        // Assert
        assertThat(response.getStatusCodeValue()).isEqualTo(201);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody().getDias()).isEqualTo(5);
        assertThat(response.getBody().getPrecioFinal()).isEqualTo(500.0);
    }

    @Test
    void createAlquilerWithInvalidAutoId() {
        // Arrange
        AlquilerDTO alquilerDTO = new AlquilerDTO();
        alquilerDTO.setDias(5);
        alquilerDTO.setAutoId(1L);
        alquilerDTO.setUserId(1L);

        when(autoRepository.findById(1L)).thenReturn(Optional.empty());

        // Act & Assert
        try {
            alquilerResource.createAlquiler(alquilerDTO);


        } catch (BadRequestAlertException e) {
            assertThat(e.getMessage()).contains("Invalid auto or user ID");
            assertThat(e.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
        } catch (URISyntaxException e) {
            throw new RuntimeException(e);
        }

    }

    @Test
    void getAlquileresByUserId() {
        // Arrange
        Long userId = 1L;
        User user = new User();
        user.setId(userId);

        Auto auto = new Auto();
        auto.setId(1L);
        auto.setPrecio(100.0);

        Alquiler alquiler1 = new Alquiler();
        alquiler1.setId(1L);
        alquiler1.setDias(5);
        alquiler1.setPrecioFinal(500.0);
        alquiler1.setAuto(auto);
        alquiler1.setUser(user);

        Alquiler alquiler2 = new Alquiler();
        alquiler2.setId(2L);
        alquiler2.setDias(3);
        alquiler2.setPrecioFinal(300.0);
        alquiler2.setAuto(auto);
        alquiler2.setUser(user);

        List<Alquiler> alquileres = Arrays.asList(alquiler1, alquiler2);
        when(alquilerRepository.findByUserId(userId)).thenReturn(alquileres);

        // Act
        ResponseEntity<List<AlquilerDTO>> response = alquilerResource.getAlquileresByUserId(userId);

        // Assert
        assertThat(response.getStatusCodeValue()).isEqualTo(200);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody().size()).isEqualTo(2);
        assertThat(response.getBody().get(0).getId()).isEqualTo(1L);
        assertThat(response.getBody().get(0).getDias()).isEqualTo(5);
        assertThat(response.getBody().get(0).getPrecioFinal()).isEqualTo(500.0);
        assertThat(response.getBody().get(1).getId()).isEqualTo(2L);
        assertThat(response.getBody().get(1).getDias()).isEqualTo(3);
        assertThat(response.getBody().get(1).getPrecioFinal()).isEqualTo(300.0);
    }
}

