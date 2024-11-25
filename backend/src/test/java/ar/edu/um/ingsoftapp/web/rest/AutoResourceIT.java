package ar.edu.um.ingsoftapp.web.rest;

import static ar.edu.um.ingsoftapp.domain.AutoAsserts.*;
import static ar.edu.um.ingsoftapp.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import ar.edu.um.ingsoftapp.IntegrationTest;
import ar.edu.um.ingsoftapp.domain.Auto;
import ar.edu.um.ingsoftapp.repository.AutoRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.EntityManager;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link AutoResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class AutoResourceIT {

    private static final String DEFAULT_MODELO = "AAAAAAAAAA";
    private static final String UPDATED_MODELO = "BBBBBBBBBB";

    private static final Integer DEFAULT_KM = 1;
    private static final Integer UPDATED_KM = 2;

    private static final Integer DEFAULT_HP = 1;
    private static final Integer UPDATED_HP = 2;

    private static final String DEFAULT_TRANSMISION = "AAAAAAAAAA";
    private static final String UPDATED_TRANSMISION = "BBBBBBBBBB";

    private static final Double DEFAULT_PRECIO = 1D;
    private static final Double UPDATED_PRECIO = 2D;

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    private static final String DEFAULT_IMG = "AAAAAAAAAA";
    private static final String UPDATED_IMG = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/autos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private AutoRepository autoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAutoMockMvc;

    private Auto auto;

    private Auto insertedAuto;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Auto createEntity() {
        return new Auto()
            .modelo(DEFAULT_MODELO)
            .km(DEFAULT_KM)
            .hp(DEFAULT_HP)
            .transmision(DEFAULT_TRANSMISION)
            .precio(DEFAULT_PRECIO)
            .descripcion(DEFAULT_DESCRIPCION)
            .img(DEFAULT_IMG);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Auto createUpdatedEntity() {
        return new Auto()
            .modelo(UPDATED_MODELO)
            .km(UPDATED_KM)
            .hp(UPDATED_HP)
            .transmision(UPDATED_TRANSMISION)
            .precio(UPDATED_PRECIO)
            .descripcion(UPDATED_DESCRIPCION)
            .img(UPDATED_IMG);
    }

    @BeforeEach
    public void initTest() {
        auto = createEntity();
    }

    @AfterEach
    public void cleanup() {
        if (insertedAuto != null) {
            autoRepository.delete(insertedAuto);
            insertedAuto = null;
        }
    }

    @Test
    @Transactional
    void createAuto() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the Auto
        var returnedAuto = om.readValue(
            restAutoMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(auto)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            Auto.class
        );

        // Validate the Auto in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        assertAutoUpdatableFieldsEquals(returnedAuto, getPersistedAuto(returnedAuto));

        insertedAuto = returnedAuto;
    }

    @Test
    @Transactional
    void createAutoWithExistingId() throws Exception {
        // Create the Auto with an existing ID
        auto.setId(1L);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restAutoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(auto)))
            .andExpect(status().isBadRequest());

        // Validate the Auto in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkModeloIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        auto.setModelo(null);

        // Create the Auto, which fails.

        restAutoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(auto)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkKmIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        auto.setKm(null);

        // Create the Auto, which fails.

        restAutoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(auto)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkHpIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        auto.setHp(null);

        // Create the Auto, which fails.

        restAutoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(auto)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkTransmisionIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        auto.setTransmision(null);

        // Create the Auto, which fails.

        restAutoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(auto)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkPrecioIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        auto.setPrecio(null);

        // Create the Auto, which fails.

        restAutoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(auto)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllAutos() throws Exception {
        // Initialize the database
        insertedAuto = autoRepository.saveAndFlush(auto);

        // Get all the autoList
        restAutoMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(auto.getId().intValue())))
            .andExpect(jsonPath("$.[*].modelo").value(hasItem(DEFAULT_MODELO)))
            .andExpect(jsonPath("$.[*].km").value(hasItem(DEFAULT_KM)))
            .andExpect(jsonPath("$.[*].hp").value(hasItem(DEFAULT_HP)))
            .andExpect(jsonPath("$.[*].transmision").value(hasItem(DEFAULT_TRANSMISION)))
            .andExpect(jsonPath("$.[*].precio").value(hasItem(DEFAULT_PRECIO.doubleValue())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION)))
            .andExpect(jsonPath("$.[*].img").value(hasItem(DEFAULT_IMG)));
    }

    @Test
    @Transactional
    void getAuto() throws Exception {
        // Initialize the database
        insertedAuto = autoRepository.saveAndFlush(auto);

        // Get the auto
        restAutoMockMvc
            .perform(get(ENTITY_API_URL_ID, auto.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(auto.getId().intValue()))
            .andExpect(jsonPath("$.modelo").value(DEFAULT_MODELO))
            .andExpect(jsonPath("$.km").value(DEFAULT_KM))
            .andExpect(jsonPath("$.hp").value(DEFAULT_HP))
            .andExpect(jsonPath("$.transmision").value(DEFAULT_TRANSMISION))
            .andExpect(jsonPath("$.precio").value(DEFAULT_PRECIO.doubleValue()))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION))
            .andExpect(jsonPath("$.img").value(DEFAULT_IMG));
    }

    @Test
    @Transactional
    void getNonExistingAuto() throws Exception {
        // Get the auto
        restAutoMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingAuto() throws Exception {
        // Initialize the database
        insertedAuto = autoRepository.saveAndFlush(auto);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the auto
        Auto updatedAuto = autoRepository.findById(auto.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedAuto are not directly saved in db
        em.detach(updatedAuto);
        updatedAuto
            .modelo(UPDATED_MODELO)
            .km(UPDATED_KM)
            .hp(UPDATED_HP)
            .transmision(UPDATED_TRANSMISION)
            .precio(UPDATED_PRECIO)
            .descripcion(UPDATED_DESCRIPCION)
            .img(UPDATED_IMG);

        restAutoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedAuto.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(updatedAuto))
            )
            .andExpect(status().isOk());

        // Validate the Auto in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedAutoToMatchAllProperties(updatedAuto);
    }

    @Test
    @Transactional
    void putNonExistingAuto() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        auto.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAutoMockMvc
            .perform(put(ENTITY_API_URL_ID, auto.getId()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(auto)))
            .andExpect(status().isBadRequest());

        // Validate the Auto in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchAuto() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        auto.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAutoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(auto))
            )
            .andExpect(status().isBadRequest());

        // Validate the Auto in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamAuto() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        auto.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAutoMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(auto)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Auto in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateAutoWithPatch() throws Exception {
        // Initialize the database
        insertedAuto = autoRepository.saveAndFlush(auto);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the auto using partial update
        Auto partialUpdatedAuto = new Auto();
        partialUpdatedAuto.setId(auto.getId());

        partialUpdatedAuto.km(UPDATED_KM).hp(UPDATED_HP).transmision(UPDATED_TRANSMISION).precio(UPDATED_PRECIO);

        restAutoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedAuto.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedAuto))
            )
            .andExpect(status().isOk());

        // Validate the Auto in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertAutoUpdatableFieldsEquals(createUpdateProxyForBean(partialUpdatedAuto, auto), getPersistedAuto(auto));
    }

    @Test
    @Transactional
    void fullUpdateAutoWithPatch() throws Exception {
        // Initialize the database
        insertedAuto = autoRepository.saveAndFlush(auto);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the auto using partial update
        Auto partialUpdatedAuto = new Auto();
        partialUpdatedAuto.setId(auto.getId());

        partialUpdatedAuto
            .modelo(UPDATED_MODELO)
            .km(UPDATED_KM)
            .hp(UPDATED_HP)
            .transmision(UPDATED_TRANSMISION)
            .precio(UPDATED_PRECIO)
            .descripcion(UPDATED_DESCRIPCION)
            .img(UPDATED_IMG);

        restAutoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedAuto.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedAuto))
            )
            .andExpect(status().isOk());

        // Validate the Auto in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertAutoUpdatableFieldsEquals(partialUpdatedAuto, getPersistedAuto(partialUpdatedAuto));
    }

    @Test
    @Transactional
    void patchNonExistingAuto() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        auto.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAutoMockMvc
            .perform(patch(ENTITY_API_URL_ID, auto.getId()).contentType("application/merge-patch+json").content(om.writeValueAsBytes(auto)))
            .andExpect(status().isBadRequest());

        // Validate the Auto in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchAuto() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        auto.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAutoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(auto))
            )
            .andExpect(status().isBadRequest());

        // Validate the Auto in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamAuto() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        auto.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAutoMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(auto)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Auto in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteAuto() throws Exception {
        // Initialize the database
        insertedAuto = autoRepository.saveAndFlush(auto);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the auto
        restAutoMockMvc
            .perform(delete(ENTITY_API_URL_ID, auto.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return autoRepository.count();
    }

    protected void assertIncrementedRepositoryCount(long countBefore) {
        assertThat(countBefore + 1).isEqualTo(getRepositoryCount());
    }

    protected void assertDecrementedRepositoryCount(long countBefore) {
        assertThat(countBefore - 1).isEqualTo(getRepositoryCount());
    }

    protected void assertSameRepositoryCount(long countBefore) {
        assertThat(countBefore).isEqualTo(getRepositoryCount());
    }

    protected Auto getPersistedAuto(Auto auto) {
        return autoRepository.findById(auto.getId()).orElseThrow();
    }

    protected void assertPersistedAutoToMatchAllProperties(Auto expectedAuto) {
        assertAutoAllPropertiesEquals(expectedAuto, getPersistedAuto(expectedAuto));
    }

    protected void assertPersistedAutoToMatchUpdatableProperties(Auto expectedAuto) {
        assertAutoAllUpdatablePropertiesEquals(expectedAuto, getPersistedAuto(expectedAuto));
    }
}
