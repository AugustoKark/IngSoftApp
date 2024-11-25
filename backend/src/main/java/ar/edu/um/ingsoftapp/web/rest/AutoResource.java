package ar.edu.um.ingsoftapp.web.rest;

import ar.edu.um.ingsoftapp.domain.Auto;
import ar.edu.um.ingsoftapp.repository.AutoRepository;
import ar.edu.um.ingsoftapp.web.rest.errors.BadRequestAlertException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link ar.edu.um.ingsoftapp.domain.Auto}.
 */
@RestController
@RequestMapping("/api/autos")
@Transactional
public class AutoResource {

    private static final Logger LOG = LoggerFactory.getLogger(AutoResource.class);

    private static final String ENTITY_NAME = "auto";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AutoRepository autoRepository;

    public AutoResource(AutoRepository autoRepository) {
        this.autoRepository = autoRepository;
    }

    /**
     * {@code POST  /autos} : Create a new auto.
     *
     * @param auto the auto to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new auto, or with status {@code 400 (Bad Request)} if the auto has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<Auto> createAuto(@Valid @RequestBody Auto auto) throws URISyntaxException {
        LOG.debug("REST request to save Auto : {}", auto);
        if (auto.getId() != null) {
            throw new BadRequestAlertException("A new auto cannot already have an ID", ENTITY_NAME, "idexists");
        }
        auto = autoRepository.save(auto);
        return ResponseEntity.created(new URI("/api/autos/" + auto.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, auto.getId().toString()))
            .body(auto);
    }

    /**
     * {@code PUT  /autos/:id} : Updates an existing auto.
     *
     * @param id the id of the auto to save.
     * @param auto the auto to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated auto,
     * or with status {@code 400 (Bad Request)} if the auto is not valid,
     * or with status {@code 500 (Internal Server Error)} if the auto couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Auto> updateAuto(@PathVariable(value = "id", required = false) final Long id, @Valid @RequestBody Auto auto)
        throws URISyntaxException {
        LOG.debug("REST request to update Auto : {}, {}", id, auto);
        if (auto.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, auto.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!autoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        auto = autoRepository.save(auto);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, auto.getId().toString()))
            .body(auto);
    }

    /**
     * {@code PATCH  /autos/:id} : Partial updates given fields of an existing auto, field will ignore if it is null
     *
     * @param id the id of the auto to save.
     * @param auto the auto to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated auto,
     * or with status {@code 400 (Bad Request)} if the auto is not valid,
     * or with status {@code 404 (Not Found)} if the auto is not found,
     * or with status {@code 500 (Internal Server Error)} if the auto couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Auto> partialUpdateAuto(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Auto auto
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update Auto partially : {}, {}", id, auto);
        if (auto.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, auto.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!autoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Auto> result = autoRepository
            .findById(auto.getId())
            .map(existingAuto -> {
                if (auto.getModelo() != null) {
                    existingAuto.setModelo(auto.getModelo());
                }
                if (auto.getKm() != null) {
                    existingAuto.setKm(auto.getKm());
                }
                if (auto.getHp() != null) {
                    existingAuto.setHp(auto.getHp());
                }
                if (auto.getTransmision() != null) {
                    existingAuto.setTransmision(auto.getTransmision());
                }
                if (auto.getPrecio() != null) {
                    existingAuto.setPrecio(auto.getPrecio());
                }
                if (auto.getDescripcion() != null) {
                    existingAuto.setDescripcion(auto.getDescripcion());
                }
                if (auto.getImg() != null) {
                    existingAuto.setImg(auto.getImg());
                }

                return existingAuto;
            })
            .map(autoRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, auto.getId().toString())
        );
    }

    /**
     * {@code GET  /autos} : get all the autos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of autos in body.
     */
    @GetMapping("")
    public List<Auto> getAllAutos() {
        LOG.debug("REST request to get all Autos");
        return autoRepository.findAll();
    }

    /**
     * {@code GET  /autos/:id} : get the "id" auto.
     *
     * @param id the id of the auto to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the auto, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Auto> getAuto(@PathVariable("id") Long id) {
        LOG.debug("REST request to get Auto : {}", id);
        Optional<Auto> auto = autoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(auto);
    }

    /**
     * {@code DELETE  /autos/:id} : delete the "id" auto.
     *
     * @param id the id of the auto to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAuto(@PathVariable("id") Long id) {
        LOG.debug("REST request to delete Auto : {}", id);
        autoRepository.deleteById(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
