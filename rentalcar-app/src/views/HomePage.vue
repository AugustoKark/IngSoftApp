<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Rental Car</ion-title>
        <ion-buttons slot="end">
        <router-link to="/home">
          <ion-button class="custom-button">Home</ion-button>
        </router-link >
          <ion-button class="custom-button">Mis alquileres</ion-button>
          <router-link to="/login">
            <ion-button class="custom-button">Login</ion-button>
          </router-link>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <div class="welcome-hero-txt">
        <h2>Alquila el auto de tus sueños a un buen precio</h2>
        <p>
          En RENTALCAR tenemos los mejores autos para ti. Nosotros nos encargamos de que tengas la mejor experiencia al alquilar un auto.
        </p>
      </div>

      <div class="featured-cars-content">
        <div class="row">
          <div v-for="car in cars" :key="car.id" class="col-lg-3 col-md-4 col-sm-6">
            <div class="single-featured-cars">
              <div class="featured-img-box">
                <div class="featured-cars-img">
                  <!-- <img :src="require(`@/assets/images/featured-cars/${car.img}.png`)" alt="cars"> -->
                </div>
                <div class="featured-model-info">
                  <p color="black">
                    model: {{car.modelo}}
                    <span class="featured-mi-span"> {{car.km}} Km</span>
                    <span class="featured-hp-span"> {{car.hp}}HP</span>
                    {{car.transmision}}
                  </p>
                </div>
              </div>
              <div class="featured-cars-txt">
                <h2><a href="#">{{car.modelo}}</a></h2>
                <h3>${{car.precio}} <ion-button class="rent-button">Alquilar</ion-button></h3>
                <div class="car-description">
                  <p>{{car.descripcion}}</p>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page> 
</template>

<script setup lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/vue';
import { ref, onMounted } from 'vue';

const isLoggedIn = ref(false);
const cars = ref([
  {
    id: 1,
    modelo: 'Toyota Corolla',
    precio: 100,
    km: 10000,
    hp: 200,
    transmision: 'Automatico',
    img: 'car1',
    descripcion: 'El Toyota Corolla es un automóvil del segmento C producido por el fabricante japonés Toyota. Se trata de uno de los automóviles más vendidos de la historia.'
  },
  {
    id: 2,
    modelo: 'Honda Civic',
    precio: 120,
    km: 8000,
    hp: 180,
    transmision: 'Automatico',
    img: 'car2',
    descripcion: 'El Honda Civic es un automóvil del segmento C producido por el fabricante japonés Honda. Es un automóvil muy popular en todo el mundo.'
  },
  {
    id: 3,
    modelo: 'Nissan Sentra',
    precio: 90,
    km: 12000,
    hp: 150,
    transmision: 'Automatico',
    img: 'car3',
    descripcion: 'El Nissan Sentra es un automóvil del segmento C producido por el fabricante japonés Nissan. Es un automóvil muy popular en todo el mundo.'
  },
  {
    id: 4,
    modelo: 'Chevrolet Cruze',
    precio: 110,
    km: 9000,
    hp: 170,
    transmision: 'Automatico',
    img: 'car4',
    descripcion: 'El Chevrolet Cruze es un automóvil del segmento C producido por el fabricante estadounidense Chevrolet. Es un automóvil muy popular en todo el mundo.'
  }
]);




</script>

<style scoped>
.welcome-hero-txt {
  position: relative;
  background-image: url('@/assets/images/welcome-hero.jpg');
  text-align: center;
  /* background-size: cover; */
  background-position: center;
  z-index: 1;
  width: 100%;
  height: 40vh; 
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white; 
}

.featured-cars-content {
  padding: 20px;
  background-color: white; /* Asegúrate de que el fondo sea visible */
}

.featured-cars-img img {
  width: 100%;
  height: auto;
}

.single-featured-cars {
  margin-bottom: 20px;
}

.featured-model-info p {
  margin: 0;
  color: black;
}

.featured-cars-txt h2 {
  color: black;

  margin: 0;
}

.featured-cars-txt h3 {
  color: black;

  margin: 0;
}

.rent-button {
  margin-left: 10px;
}

.custom-button {
  /* --background: #ffffff;  */
  --color: white; /* Cambia el color del texto del botón */
}
.car-description p {
  color: black;
  margin: 0;
}
</style>