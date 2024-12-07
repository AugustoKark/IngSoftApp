<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Rental Car</ion-title>
        <ion-buttons slot="end">
          <router-link to="/home">
            <ion-button class="custom-button">Home</ion-button>
          </router-link>
          <router-link to="/myrentals">
            <ion-button class="custom-button" v-if="isLoggedIn">Mis alquileres</ion-button>
          </router-link>
          <ion-button class="custom-button" @click="refresh">Refresh</ion-button>
          <ion-button
            class="custom-button"
            v-if="isLoggedIn"
            @click="logout"
          >
            Logout
          </ion-button>
          <router-link to="/login" v-else>
            <ion-button class="custom-button">Login</ion-button>
          </router-link>
          <ion-button :color="isOnline ? 'success' : 'danger'">
            {{ isOnline ? 'Online' : 'Offline' }}
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
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
                  <img :src="car.img" alt="cars">
                </div>
                <div class="featured-cars-txt">
                  <h2>{{ car.modelo }}</h2>
                  <div class="featured-model-info">
                    <p>
                      Modelo: {{ car.modelo }}
                      <span class="featured-mi-span"> {{ car.km }} Km</span>
                      <span class="featured-hp-span"> {{ car.hp }} HP</span>
                      {{ car.transmision }}
                    </p>
                  </div>
                </div>
                <div class="car-description">
                  <p>{{ car.descripcion }}</p>
                </div>
                <h3 class="precioo">
                  ${{ car.precio }} 
                  <ion-button class="rent-button" v-if="car.button" @click="openModal(car)">Alquilar</ion-button>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ion-content>

    <section>
      <div v-if="showModal" class="modal">
        <div class="modal-content">
          <span class="close" @click="closeModal">&times;</span>
          <h2>¿Seguro que quieres alquilar {{ selectedCar.modelo }}?</h2>
          <div>
            <label for="dias">Número de días:</label>
            <input type="number" v-model="dias" min="1" required>
          </div>
          <button @click="confirmRental">Aceptar</button>
        </div>
      </div>
    </section>
  </ion-page> 
</template>

<script setup lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/vue';
import { ref, onMounted, onUnmounted, watchEffect } from 'vue';
import { useRouter } from 'vue-router'; 

// Importa las imágenes
import fc1 from '@/images/featured-cars/fc1.png';
import fc2 from '@/images/featured-cars/fc2.png';
import fc3 from '@/images/featured-cars/fc3.png';
import fc4 from '@/images/featured-cars/fc4.png';
import fc5 from '@/images/featured-cars/fc5.png';
import fc6 from '@/images/featured-cars/fc6.png';
import fc7 from '@/images/featured-cars/fc7.png';
import fc8 from '@/images/featured-cars/fc8.png';

// Define un mapa de imágenes
const imageMap: { [key: string]: string } = {
  'fc1': fc1,
  'fc2': fc2,
  'fc3': fc3,
  'fc4': fc4,
  'fc5': fc5,
  'fc6': fc6,
  'fc7': fc7,
  'fc8': fc8,
};

// Lista de autos predeterminados para usuarios no autenticados
const defaultCars = [
  {
    id: 1,
    modelo: 'BMW 6-series gran coupe',
    precio: 100,
    km: 3100,
    hp: 240,
    transmision: 'Automatic',
    img: fc1,
    descripcion: 'El BMW 6 Series es un automóvil deportivo de lujo producido por el fabricante alemán BMW. Es un automóvil muy popular en todo el mundo.',
    button: false
  },
  {
    id: 2,
    modelo: 'BMW 6-series gran coupe',
    precio: 100,
    km: 3100,
    hp: 240,
    transmision: 'Automatic',
    img: fc1,
    descripcion: 'El BMW 6 Series es un automóvil deportivo de lujo producido por el fabricante alemán BMW. Es un automóvil muy popular en todo el mundo.',
    button: false
  },
  {
    id: 3,
    modelo: 'BMW 6-series gran coupe',
    precio: 100,
    km: 3100,
    hp: 240,
    transmision: 'Automatic',
    img: fc1,
    descripcion: 'El BMW 6 Series es un automóvil deportivo de lujo producido por el fabricante alemán BMW. Es un automóvil muy popular en todo el mundo.',
    button: false
  },
  {
    id: 4,
    modelo: 'BMW 6-series gran coupe',
    precio: 100,
    km: 3100,
    hp: 240,
    transmision: 'Automatic',
    img: fc1,
    descripcion: 'El BMW 6 Series es un automóvil deportivo de lujo producido por el fabricante alemán BMW. Es un automóvil muy popular en todo el mundo.',
    button: false
  }];
// Lista de autos predeterminados para usuarios autenticados sin conexión
const defaultCarsLogInNoConnection = [
  {
    id: 1,
    modelo: 'BMW 6-series gran coupe',
    precio: 89395.0,
    km: 3100,
    hp: 240,
    transmision: 'automatic',
    descripcion: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non.',
    img: 'fc1',
    button: true
  },
  {
    id: 2,
    modelo: 'Chevrolet Camaro wmv20',
    precio: 66575.0,
    km: 3100,
    hp: 240,
    transmision: 'automatic',
    descripcion: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non.',
    img: 'fc2',
    button: true
  },
  {
    id: 3,
    modelo: 'Lamborghini v520',
    precio: 125250.0,
    km: 3100,
    hp: 240,
    transmision: 'automatic',
    descripcion: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non.',
    img: 'fc3',
    button: true
  },
  {
    id: 4,
    modelo: 'Audi A3 sedan',
    precio: 95500.0,
    km: 3100,
    hp: 240,
    transmision: 'manual',
    descripcion: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non.',
    img: 'fc4',
    button: true
  },
  {
    id: 5,
    modelo: 'Infiniti Z5',
    precio: 36850.0,
    km: 3100,
    hp: 240,
    transmision: 'manual',
    descripcion: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non.',
    img: 'fc4',
    button: true
  },
  {
    id: 6,
    modelo: 'Porsche 718 Cayman',
    precio: 48500.0,
    km: 3100,
    hp: 240,
    transmision: 'automatic',
    descripcion: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non.',
    img: 'fc5',
    button: true
  },
  {
    id: 7,
    modelo: 'BMW 8-series coupe',
    precio: 56000.0,
    km: 3100,
    hp: 240,
    transmision: 'automatic',
    descripcion: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non.',
    img: 'fc7',
    button: true
  },
  {
    id: 8,
    modelo: 'BMW X-series-6',
    precio: 75800.0,
    km: 3100,
    hp: 240,
    transmision: 'automatic',
    descripcion: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non.',
    img: 'fc8',
    button: true
  },
];

const isLoggedIn = ref(false);
const router = useRouter();

const showModal = ref(false);
const selectedCar = ref(null);
const dias = ref(1);

// Variable reactiva para el estado de conexión
const isOnline = ref(navigator.onLine);

// Lista de autos a mostrar
const cars = ref([]);

// Funciones para manejar el estado de conexión
const updateOnlineStatus = () => {
  isOnline.value = navigator.onLine;
  console.log('Estado de conexión:', navigator.onLine ? 'Online' : 'Offline');
  if (isOnline.value && isLoggedIn.value) {
    syncPendingRentals();
    fetchCars();
  }
};

// Funciones para manejar el modal
const openModal = (car: any) => {
  selectedCar.value = car;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  selectedCar.value = null;
  dias.value = 1;
};

// Función para obtener los autos
const fetchCars = async () => {
  const token = localStorage.getItem('jwt');

  const postPendiente = JSON.parse(localStorage.getItem('pendingRentals') || '[]');
  if (postPendiente.length > 0) {
    console.log('Alquileres pendientes:', postPendiente);
    syncPendingRentals();

  }
  if (token) {
    isLoggedIn.value = true;

    if (isOnline.value) {
      try {
        const response = await fetch('http://localhost:8080/api/autos', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          
          data.forEach((car: any) => {
            if (imageMap[car.img]) {
              car.img = imageMap[car.img];
              car.button = true;
            } else {
              car.img = fc1;
              car.button = true;
            }
          });
          
          console.log('Autos obtenidos:', data);
          cars.value = data;
        } else {
          console.error('Error al obtener los autos:', response.statusText);
          // Usar autos predeterminados para usuarios autenticados sin conexión
          cars.value = [...defaultCarsLogInNoConnection];
        }
      } catch (error) {
        console.error('Error de red al obtener los autos:', error);
        // Usar autos predeterminados para usuarios autenticados sin conexión
        cars.value = [...defaultCarsLogInNoConnection];
      }
    } else {
      console.log('Usuario autenticado pero sin conexión, cargando autos predeterminados.');
      cars.value = [...defaultCarsLogInNoConnection];
    }
  } else {
    console.log('No se encontró token, usando datos por defecto.');
    cars.value = [...defaultCars];
  }
};

// Función para cerrar sesión
const logout = () => {
  localStorage.removeItem('jwt');
  isLoggedIn.value = false;
  console.log('Sesión cerrada');
  cars.value = [...defaultCars];
  router.push('/home');
};

// Función para refrescar los autos manualmente
const refresh = () => {
  fetchCars();
};

// Función para guardar alquileres en localStorage
function saveRentalToLocalStorage(rental: any) {
  const rentals = JSON.parse(localStorage.getItem('pendingRentals') || '[]');
  rentals.push(rental);
  localStorage.setItem('pendingRentals', JSON.stringify(rentals));
  console.log('Alquiler guardado en localStorage:', rental);
}

// Función para sincronizar alquileres pendientes
async function syncPendingRentals() {
  const pendingRentals = JSON.parse(localStorage.getItem('pendingRentals') || '[]');
  
  if (pendingRentals.length > 0) {
    console.log('Sincronizando alquileres pendientes...', pendingRentals);
    
    const token = localStorage.getItem('jwt');
    if (!token) {
      console.error('No hay token disponible. No se pueden sincronizar los alquileres.');
      return;
    }

    for (const rental of pendingRentals) {
      try {
        const response = await fetch('http://localhost:8080/api/alquilers', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(rental),
        });

        if (response.ok) {
          console.log(`Alquiler sincronizado exitosamente:`, rental);
        } else {
          console.error(`Error al sincronizar alquiler: ${response.statusText}`, rental);
          throw new Error('Falló la sincronización');
        }
      } catch (error) {
        console.error('Error al sincronizar alquiler:', error, rental);
        // Detener la sincronización en caso de error para evitar bucles
        return;
      }
    }

    // Si todos los alquileres se sincronizaron correctamente, limpiar el localStorage
    localStorage.removeItem('pendingRentals');
    alert('Todos los alquileres pendientes se han sincronizado.');
  } else {
    console.log('No hay alquileres pendientes para sincronizar.');
  }
}

// Función para confirmar el alquiler
async function confirmRental() {
  const rental = {
    dias: dias.value,
    autoId: selectedCar.value.id,
    userId: localStorage.getItem('userId'),
  };

  if (isOnline.value) {
    try {
      await fetch('http://localhost:8080/api/alquilers', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        },
        body: JSON.stringify(rental),
      });
      alert('Alquiler confirmado!');
    } catch (error) {
      console.error('Error al enviar el alquiler:', error);
      saveRentalToLocalStorage(rental);
      alert('Sin conexión o error de red. Alquiler guardado localmente.');
    }
  } else {
    saveRentalToLocalStorage(rental);
    alert('Sin conexión. Alquiler guardado localmente.');
  }

  closeModal();
}

// Manejo de eventos de conexión
onMounted(() => {
  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);
  fetchCars();
});

onUnmounted(() => {
  window.removeEventListener('online', updateOnlineStatus);
  window.removeEventListener('offline', updateOnlineStatus);
});

// Watcher para actualizar los autos cuando cambia el estado de inicio de sesión
watchEffect(() => {
  if (isLoggedIn.value) {
    fetchCars();
  } else {
    cars.value = [...defaultCars];
  }
});
</script>

<style scoped>
.welcome-hero-txt {
  position: relative;
  background-image: url('@/images/welcome-hero/welcome-banner.jpg');
  text-align: center;
  background-size: cover;
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
  background-color: white;
}

.featured-cars-img img {
  width: 50%;
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
  --color: white;
}

.car-description p {
  color: black;
  margin: 0;
}

.precioo {
  color: black;
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  background-color: black;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.modal-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  color: white;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}

ion-button[color="success"] {
  --background: green;
}

ion-button[color="danger"] {
  --background: red;
}
</style>