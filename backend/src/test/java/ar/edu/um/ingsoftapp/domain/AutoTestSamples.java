package ar.edu.um.ingsoftapp.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;

public class AutoTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));
    private static final AtomicInteger intCount = new AtomicInteger(random.nextInt() + (2 * Short.MAX_VALUE));

    public static Auto getAutoSample1() {
        return new Auto().id(1L).modelo("modelo1").km(1).hp(1).transmision("transmision1").descripcion("descripcion1").img("img1");
    }

    public static Auto getAutoSample2() {
        return new Auto().id(2L).modelo("modelo2").km(2).hp(2).transmision("transmision2").descripcion("descripcion2").img("img2");
    }

    public static Auto getAutoRandomSampleGenerator() {
        return new Auto()
            .id(longCount.incrementAndGet())
            .modelo(UUID.randomUUID().toString())
            .km(intCount.incrementAndGet())
            .hp(intCount.incrementAndGet())
            .transmision(UUID.randomUUID().toString())
            .descripcion(UUID.randomUUID().toString())
            .img(UUID.randomUUID().toString());
    }
}
