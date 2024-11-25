package ar.edu.um.ingsoftapp.web.rest;

import static ar.edu.um.ingsoftapp.domain.AlquilerAsserts.*;
import static ar.edu.um.ingsoftapp.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import ar.edu.um.ingsoftapp.IntegrationTest;
import ar.edu.um.ingsoftapp.domain.Alquiler;
import ar.edu.um.ingsoftapp.repository.AlquilerRepository;
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
 * Integration tests for the {@link AlquilerResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class AlquilerResourceIT {

    private static final Integer DEFAULT_DIAS = 1;
    private static final Integer UPDATED_DIAS = 2;

    private static final Double DEFAULT_PRECIO_FINAL = 1D;
    private static final Double UPDATED_PRECIO_FINAL = 2D;

    private static final String ENTITY_API_URL = "/api/alquilers";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private AlquilerRepository alquilerRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAlquilerMockMvc;

    private Alquiler alquiler;

    private Alquiler insertedAlquiler;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Alquiler createEntity() {
        return new Alquiler().dias(DEFAULT_DIAS).precioFinal(DEFAULT_PRECIO_FINAL);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Alquiler createUpdatedEntity() {
        return new Alquiler().dias(UPDATED_DIAS).precioFinal(UPDATED_PRECIO_FINAL);
    }

    @BeforeEach
    public void initTest() {
        alquiler = createEntity();
    }

    @AfterEach
    public void cleanup() {
        if (insertedAlquiler != null) {
            alquilerRepository.delete(insertedAlquiler);
            insertedAlquiler = null;
        }
    }

    @Test
    @Transactional
    void createAlquiler() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the Alquiler
        var returnedAlquiler = om.readValue(
            restAlquilerMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(alquiler)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            Alquiler.class
        );

        // Validate the Alquiler in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        assertAlquilerUpdatableFieldsEquals(returnedAlquiler, getPersistedAlquiler(returnedAlquiler));

        insertedAlquiler = returnedAlquiler;
    }

    @Test
    @Transactional
    void createAlquilerWithExistingId() throws Exception {
        // Create the Alquiler with an existing ID
        alquiler.setId(1L);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restAlquilerMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(alquiler)))
            .andExpect(status().isBadRequest());

        // Validate the Alquiler in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkDiasIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        alquiler.setDias(null);

        // Create the Alquiler, which fails.

        restAlquilerMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(alquiler)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkPrecioFinalIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        alquiler.setPrecioFinal(null);

        // Create the Alquiler, which fails.

        restAlquilerMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(alquiler)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllAlquilers() throws Exception {
        // Initialize the database
        insertedAlquiler = alquilerRepository.saveAndFlush(alquiler);

        // Get all the alquilerList
        restAlquilerMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(alquiler.getId().intValue())))
            .andExpect(jsonPath("$.[*].dias").value(hasItem(DEFAULT_DIAS)))
            .andExpect(jsonPath("$.[*].precioFinal").value(hasItem(DEFAULT_PRECIO_FINAL.doubleValue())));
    }

    @Test
    @Transactional
    void getAlquiler() throws Exception {
        // Initialize the database
        insertedAlquiler = alquilerRepository.saveAndFlush(alquiler);

        // Get the alquiler
        restAlquilerMockMvc
            .perform(get(ENTITY_API_URL_ID, alquiler.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(alquiler.getId().intValue()))
            .andExpect(jsonPath("$.dias").value(DEFAULT_DIAS))
            .andExpect(jsonPath("$.precioFinal").value(DEFAULT_PRECIO_FINAL.doubleValue()));
    }

    @Test
    @Transactional
    void getNonExistingAlquiler() throws Exception {
        // Get the alquiler
        restAlquilerMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingAlquiler() throws Exception {
        // Initialize the database
        insertedAlquiler = alquilerRepository.saveAndFlush(alquiler);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the alquiler
        Alquiler updatedAlquiler = alquilerRepository.findById(alquiler.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedAlquiler are not directly saved in db
        em.detach(updatedAlquiler);
        updatedAlquiler.dias(UPDATED_DIAS).precioFinal(UPDATED_PRECIO_FINAL);

        restAlquilerMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedAlquiler.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(updatedAlquiler))
            )
            .andExpect(status().isOk());

        // Validate the Alquiler in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedAlquilerToMatchAllProperties(updatedAlquiler);
    }

    @Test
    @Transactional
    void putNonExistingAlquiler() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        alquiler.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAlquilerMockMvc
            .perform(
                put(ENTITY_API_URL_ID, alquiler.getId()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(alquiler))
            )
            .andExpect(status().isBadRequest());

        // Validate the Alquiler in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchAlquiler() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        alquiler.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAlquilerMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(alquiler))
            )
            .andExpect(status().isBadRequest());

        // Validate the Alquiler in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamAlquiler() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        alquiler.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAlquilerMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(alquiler)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Alquiler in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateAlquilerWithPatch() throws Exception {
        // Initialize the database
        insertedAlquiler = alquilerRepository.saveAndFlush(alquiler);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the alquiler using partial update
        Alquiler partialUpdatedAlquiler = new Alquiler();
        partialUpdatedAlquiler.setId(alquiler.getId());

        restAlquilerMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedAlquiler.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedAlquiler))
            )
            .andExpect(status().isOk());

        // Validate the Alquiler in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertAlquilerUpdatableFieldsEquals(createUpdateProxyForBean(partialUpdatedAlquiler, alquiler), getPersistedAlquiler(alquiler));
    }

    @Test
    @Transactional
    void fullUpdateAlquilerWithPatch() throws Exception {
        // Initialize the database
        insertedAlquiler = alquilerRepository.saveAndFlush(alquiler);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the alquiler using partial update
        Alquiler partialUpdatedAlquiler = new Alquiler();
        partialUpdatedAlquiler.setId(alquiler.getId());

        partialUpdatedAlquiler.dias(UPDATED_DIAS).precioFinal(UPDATED_PRECIO_FINAL);

        restAlquilerMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedAlquiler.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedAlquiler))
            )
            .andExpect(status().isOk());

        // Validate the Alquiler in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertAlquilerUpdatableFieldsEquals(partialUpdatedAlquiler, getPersistedAlquiler(partialUpdatedAlquiler));
    }

    @Test
    @Transactional
    void patchNonExistingAlquiler() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        alquiler.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAlquilerMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, alquiler.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(alquiler))
            )
            .andExpect(status().isBadRequest());

        // Validate the Alquiler in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchAlquiler() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        alquiler.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAlquilerMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(alquiler))
            )
            .andExpect(status().isBadRequest());

        // Validate the Alquiler in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamAlquiler() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        alquiler.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAlquilerMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(alquiler)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Alquiler in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteAlquiler() throws Exception {
        // Initialize the database
        insertedAlquiler = alquilerRepository.saveAndFlush(alquiler);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the alquiler
        restAlquilerMockMvc
            .perform(delete(ENTITY_API_URL_ID, alquiler.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return alquilerRepository.count();
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

    protected Alquiler getPersistedAlquiler(Alquiler alquiler) {
        return alquilerRepository.findById(alquiler.getId()).orElseThrow();
    }

    protected void assertPersistedAlquilerToMatchAllProperties(Alquiler expectedAlquiler) {
        assertAlquilerAllPropertiesEquals(expectedAlquiler, getPersistedAlquiler(expectedAlquiler));
    }

    protected void assertPersistedAlquilerToMatchUpdatableProperties(Alquiler expectedAlquiler) {
        assertAlquilerAllUpdatablePropertiesEquals(expectedAlquiler, getPersistedAlquiler(expectedAlquiler));
    }
}
