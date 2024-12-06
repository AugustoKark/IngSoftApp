<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Mis Alquileres</ion-title>
        <ion-buttons slot="start">
          <ion-button @click="$router.push('/home')">Volver al Home</ion-button>
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-button  @click="refresh">refresh</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="rentals-container">
        <ion-grid>
          <ion-row>
            <ion-col size="12">
              <ion-text>
                <h1>Mis Alquileres</h1>
              </ion-text>
            </ion-col>
          </ion-row>
          <ion-row v-if="rentals.length">
            <ion-col
              v-for="rental in rentals"
              :key="rental.id"
              size="12"
              size-md="6"
              size-lg="4"
            >
              <ion-card>
                <img
                  :src="rental.img"
                  alt="auto"
                  class="rental-img"
                />
                <ion-card-header>
                  <ion-card-title>{{ rental.autoNombre }}</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                  <p>Días: {{ rental.dias }}</p>
                  <p>Precio Final: ${{ rental.precioFinal }}</p>
                </ion-card-content>
              </ion-card>
            </ion-col>
          </ion-row>
          <ion-row v-else>
            <ion-col size="12">
              <ion-text>
                <p>No tienes alquileres.</p>
              </ion-text>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonText
} from '@ionic/vue';

// Import images
import fc1 from '@/images/featured-cars/fc1.png';
import fc2 from '@/images/featured-cars/fc2.png';
import fc3 from '@/images/featured-cars/fc3.png';
import fc4 from '@/images/featured-cars/fc4.png';
import fc5 from '@/images/featured-cars/fc5.png';
import fc6 from '@/images/featured-cars/fc6.png';
import fc7 from '@/images/featured-cars/fc7.png';
import fc8 from '@/images/featured-cars/fc8.png';

// Define image map
const imageMap = {
  'fc1': fc1,
  'fc2': fc2,
  'fc3': fc3,
  'fc4': fc4,
  'fc5': fc5,
  'fc6': fc6,
  'fc7': fc7,
  'fc8': fc8,
};

export default {
  name: 'MyRentals',
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonText,
  },
  data() {
    return {
      rentals: []
    };
  },
  methods: {
    async fetchRentals() {
      const token = localStorage.getItem('jwt');
      if (token) {
        try {
          const userId = localStorage.getItem('userId');
          const response = await fetch(`http://localhost:8080/api/alquilers/usuario/${userId}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (response.ok) {
            const data = await response.json();

            // Mapear imágenes usando imageMap
            data.forEach(rental => {
              if (imageMap[rental.autoImg]) {
                rental.img = imageMap[rental.autoImg];
              } else {
                // Asignar imagen por defecto si no se encuentra
                rental.img = fc1;
              }
            });

            this.rentals = data;
            console.log('Rentals:', this.rentals);
          } else {
            console.error('Error al obtener los alquileres');
            this.rentals = [];
          }
        } catch (error) {
          console.error('Error al obtener los alquileres:', error);
          this.rentals = [];
        }
      } else {
        // No hay token, asignar rentals como array vacío
        this.rentals = [];
        console.log('No se encontró token, rentals está vacío.');
      }
    },
    refresh() {
      this.fetchRentals();
    }
  },
  mounted() {
    console.log('MyRentals mounted');
    this.fetchRentals();
  }
};
const refresh = () => {
  this.fetchRentals();
};
</script>

<style scoped>
.rentals-container {
  text-align: center;
  padding: 20px;
}

.rental-img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}
</style>