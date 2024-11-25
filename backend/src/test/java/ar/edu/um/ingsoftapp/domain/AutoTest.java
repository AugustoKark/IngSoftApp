package ar.edu.um.ingsoftapp.domain;

import static ar.edu.um.ingsoftapp.domain.AlquilerTestSamples.*;
import static ar.edu.um.ingsoftapp.domain.AutoTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import ar.edu.um.ingsoftapp.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class AutoTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Auto.class);
        Auto auto1 = getAutoSample1();
        Auto auto2 = new Auto();
        assertThat(auto1).isNotEqualTo(auto2);

        auto2.setId(auto1.getId());
        assertThat(auto1).isEqualTo(auto2);

        auto2 = getAutoSample2();
        assertThat(auto1).isNotEqualTo(auto2);
    }

    @Test
    void alquilerTest() {
        Auto auto = getAutoRandomSampleGenerator();
        Alquiler alquilerBack = getAlquilerRandomSampleGenerator();

        auto.addAlquiler(alquilerBack);
        assertThat(auto.getAlquilers()).containsOnly(alquilerBack);
        assertThat(alquilerBack.getAuto()).isEqualTo(auto);

        auto.removeAlquiler(alquilerBack);
        assertThat(auto.getAlquilers()).doesNotContain(alquilerBack);
        assertThat(alquilerBack.getAuto()).isNull();

        auto.alquilers(new HashSet<>(Set.of(alquilerBack)));
        assertThat(auto.getAlquilers()).containsOnly(alquilerBack);
        assertThat(alquilerBack.getAuto()).isEqualTo(auto);

        auto.setAlquilers(new HashSet<>());
        assertThat(auto.getAlquilers()).doesNotContain(alquilerBack);
        assertThat(alquilerBack.getAuto()).isNull();
    }
}
