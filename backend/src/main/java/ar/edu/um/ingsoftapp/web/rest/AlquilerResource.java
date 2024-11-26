package ar.edu.um.ingsoftapp.web.rest;

import ar.edu.um.ingsoftapp.domain.Alquiler;
import ar.edu.um.ingsoftapp.domain.Auto;
import ar.edu.um.ingsoftapp.domain.User;
import ar.edu.um.ingsoftapp.repository.AlquilerRepository;
import ar.edu.um.ingsoftapp.repository.AutoRepository;
import ar.edu.um.ingsoftapp.repository.UserRepository;
import ar.edu.um.ingsoftapp.service.dto.AlquilerDTO;
import ar.edu.um.ingsoftapp.web.rest.errors.BadRequestAlertException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link ar.edu.um.ingsoftapp.domain.Alquiler}.
 */
@RestController
@RequestMapping("/api/alquilers")
@Transactional
public class AlquilerResource {

    private static final Logger LOG = LoggerFactory.getLogger(AlquilerResource.class);

    private static final String ENTITY_NAME = "alquiler";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AlquilerRepository alquilerRepository;

    private final AutoRepository autoRepository;

    private final UserRepository userRepository;

    public AlquilerResource(AlquilerRepository alquilerRepository, AutoRepository autoRepository, UserRepository userRepository) {
        this.alquilerRepository = alquilerRepository;
        this.autoRepository = autoRepository;
        this.userRepository = userRepository;

    }

    /**
     * {@code POST  /alquilers} : Create a new alquiler.
     *
     * @param alquilerDTO the alquiler to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new alquiler, or with status {@code 400 (Bad Request)} if the alquiler has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<Alquiler> createAlquiler(@Valid @RequestBody AlquilerDTO alquilerDTO) throws URISyntaxException {
        LOG.debug("REST request to save Alquiler : {}", alquilerDTO);
        if (alquilerDTO.getId() != null) {
            throw new BadRequestAlertException("A new alquiler cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Optional<Auto> auto = autoRepository.findById(alquilerDTO.getAutoId());
        Optional<User> user = userRepository.findById(alquilerDTO.getUserId());

        if (auto.isPresent() && user.isPresent()) {
            Alquiler alquiler = new Alquiler();
            alquiler.setDias(alquilerDTO.getDias());
            alquiler.setAuto(auto.get());
            alquiler.setUser(user.get());
            double precioFinal = auto.get().getPrecio() * alquiler.getDias();
            alquiler.setPrecioFinal(precioFinal);
            Alquiler result = alquilerRepository.save(alquiler);
            return ResponseEntity.created(new URI("/api/alquilers/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
                .body(result);
        } else {
            throw new BadRequestAlertException("Invalid auto or user ID", ENTITY_NAME, "idinvalid");
        }
    }


    /**
     * {@code PUT  /alquilers/:id} : Updates an existing alquiler.
     *
     * @param id the id of the alquiler to save.
     * @param alquiler the alquiler to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated alquiler,
     * or with status {@code 400 (Bad Request)} if the alquiler is not valid,
     * or with status {@code 500 (Internal Server Error)} if the alquiler couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Alquiler> updateAlquiler(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Alquiler alquiler
    ) throws URISyntaxException {
        LOG.debug("REST request to update Alquiler : {}, {}", id, alquiler);
        if (alquiler.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, alquiler.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!alquilerRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        alquiler = alquilerRepository.save(alquiler);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, alquiler.getId().toString()))
            .body(alquiler);
    }

    /**
     * {@code PATCH  /alquilers/:id} : Partial updates given fields of an existing alquiler, field will ignore if it is null
     *
     * @param id the id of the alquiler to save.
     * @param alquiler the alquiler to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated alquiler,
     * or with status {@code 400 (Bad Request)} if the alquiler is not valid,
     * or with status {@code 404 (Not Found)} if the alquiler is not found,
     * or with status {@code 500 (Internal Server Error)} if the alquiler couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Alquiler> partialUpdateAlquiler(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Alquiler alquiler
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update Alquiler partially : {}, {}", id, alquiler);
        if (alquiler.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, alquiler.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!alquilerRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Alquiler> result = alquilerRepository
            .findById(alquiler.getId())
            .map(existingAlquiler -> {
                if (alquiler.getDias() != null) {
                    existingAlquiler.setDias(alquiler.getDias());
                }
                if (alquiler.getPrecioFinal() != null) {
                    existingAlquiler.setPrecioFinal(alquiler.getPrecioFinal());
                }

                return existingAlquiler;
            })
            .map(alquilerRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, alquiler.getId().toString())
        );
    }

    /**
     * {@code GET  /alquilers} : get all the alquilers.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of alquilers in body.
     */
    @GetMapping("")
    public List<Alquiler> getAllAlquilers() {
        LOG.debug("REST request to get all Alquilers");
        return alquilerRepository.findAll();
    }

    /**
     * {@code GET  /alquilers/:id} : get the "id" alquiler.
     *
     * @param id the id of the alquiler to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the alquiler, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Alquiler> getAlquiler(@PathVariable("id") Long id) {
        LOG.debug("REST request to get Alquiler : {}", id);
        Optional<Alquiler> alquiler = alquilerRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(alquiler);
    }

    /**
     * {@code DELETE  /alquilers/:id} : delete the "id" alquiler.
     *
     * @param id the id of the alquiler to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAlquiler(@PathVariable("id") Long id) {
        LOG.debug("REST request to delete Alquiler : {}", id);
        alquilerRepository.deleteById(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }

    @GetMapping("/usuario/{id}")
    public ResponseEntity<List<AlquilerDTO>> getAlquileresByUserId(@PathVariable Long id) {
        LOG.debug("REST request to get Alquileres by User ID : {}", id);
        List<Alquiler> alquileres = alquilerRepository.findByUserId(id);
        List<AlquilerDTO> alquileresDTO = alquileres.stream().map(AlquilerDTO::new).collect(Collectors.toList());
        return ResponseEntity.ok().body(alquileresDTO);
    }
}
