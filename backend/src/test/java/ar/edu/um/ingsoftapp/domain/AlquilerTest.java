package ar.edu.um.ingsoftapp.domain;

import static ar.edu.um.ingsoftapp.domain.AlquilerTestSamples.*;
import static ar.edu.um.ingsoftapp.domain.AutoTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import ar.edu.um.ingsoftapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class AlquilerTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Alquiler.class);
        Alquiler alquiler1 = getAlquilerSample1();
        Alquiler alquiler2 = new Alquiler();
        assertThat(alquiler1).isNotEqualTo(alquiler2);

        alquiler2.setId(alquiler1.getId());
        assertThat(alquiler1).isEqualTo(alquiler2);

        alquiler2 = getAlquilerSample2();
        assertThat(alquiler1).isNotEqualTo(alquiler2);
    }

    @Test
    void autoTest() {
        Alquiler alquiler = getAlquilerRandomSampleGenerator();
        Auto autoBack = getAutoRandomSampleGenerator();

        alquiler.setAuto(autoBack);
        assertThat(alquiler.getAuto()).isEqualTo(autoBack);

        alquiler.auto(null);
        assertThat(alquiler.getAuto()).isNull();
    }
}
