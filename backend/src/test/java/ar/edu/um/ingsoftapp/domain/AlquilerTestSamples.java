package ar.edu.um.ingsoftapp.domain;

import java.util.Random;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;

public class AlquilerTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));
    private static final AtomicInteger intCount = new AtomicInteger(random.nextInt() + (2 * Short.MAX_VALUE));

    public static Alquiler getAlquilerSample1() {
        return new Alquiler().id(1L).dias(1);
    }

    public static Alquiler getAlquilerSample2() {
        return new Alquiler().id(2L).dias(2);
    }

    public static Alquiler getAlquilerRandomSampleGenerator() {
        return new Alquiler().id(longCount.incrementAndGet()).dias(intCount.incrementAndGet());
    }
}
