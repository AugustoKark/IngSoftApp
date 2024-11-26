<template>
  <div>
    <div v-if="rentalSuccessMessage" :class="['success-message', { 'fade-out': fadeOut }]">
      {{ rentalSuccessMessage }}
    </div>
    <section id="home" class="welcome-hero">
      <!-- top-area Start -->
      <div class="top-area">
        <div class="header-area">
          <!-- Start Navigation -->
          <nav class="navbar navbar-default bootsnav navbar-sticky navbar-scrollspy" data-minus-value-desktop="70" data-minus-value-mobile="55" data-speed="1000">
            <div class="container">
              <!-- Start Header Navigation -->
              <div class="navbar-header">
                
                <a class="navbar-brand" href="index.html">RentalCAR<span></span></a>
              </div><!--/.navbar-header-->
              <!-- End Header Navigation -->
              <div>
                <nav>
                  <ul class="nav-menu">
                    <li><router-link to="/home">Home</router-link></li>
                    <li><router-link to="/my-rentals">Mis Alquileres</router-link></li>
                    <li><a @click="handleLogout">Logout</a></li>
                  </ul>
                </nav>
                <router-view></router-view>
              </div>
            </div><!--/.container-->
          </nav><!--/nav-->
          <!-- End Navigation -->
        </div><!--/.header-area-->
        <div class="clearfix"></div>
      </div><!-- /.top-area-->
      <!-- top-area End -->
      <div class="container">
        <div class="welcome-hero-txt">
          <h2>Alquila el auto de tus sueños a un buen precio</h2>
          <p>
            En RENTALCAR tenemos los mejores autos para ti. Nosotros nos encargamos de que tengas la mejor experiencia al alquilar un auto.
          </p>
        </div>
      </div>
    </section><!--/.welcome-hero-->
    <!--welcome-hero end -->
    <!--featured-cars start -->
    <section id="blog" class="blog"></section><!--/.blog-->
       
    <section id="featured-cars" class="featured-cars">
      <div class="featured-cars-content">
        <div class="row">
          <div v-for="car in cars" :key="car.id" class="col-lg-3 col-md-4 col-sm-6">
            <div class="single-featured-cars">
              <div class="featured-img-box">
                <div class="featured-cars-img">
                  <img :src="require(`@/assets/images/featured-cars/${car.img}.png`)" alt="cars">
                </div>
                <div class="featured-model-info">
                  <p>
                    model: {{ new Date().getFullYear() }}
                    <span class="featured-mi-span"> {{car.km}} Km</span>
                    <span class="featured-hp-span"> {{car.hp}}HP</span>
                    {{car.transmision}}
                  </p>
                </div>
              </div>
              <div class="featured-cars-txt">
                <h2><a href="#">{{car.modelo}}</a></h2>
                <h3>${{car.precio}} <button class="rent-button" @click="openModal(car)">Alquilar</button></h3>
                <p>{{car.descripcion}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section><!--/.featured-cars-->
    <!--featured-cars end -->
    <!--brand start -->
    <section id="brand" class="brand">
      <div class="container">
        <div class="brand-area">

          <h2 class="titulomarcas ">Algunas marcas que trabajan con nosotros:</h2>


          <div class="brand-item">
            <div class="item">
              <a href="#">
                <img src="@/assets/images/brand/br1.png" alt="brand-image" />
              </a>
            </div>
            <div class="item">
              <a href="#">
                <img src="@/assets/images/brand/br2.png" alt="brand-image" />
              </a>
            </div>
            <div class="item">
              <a href="#">
                <img src="@/assets/images/brand/br3.png" alt="brand-image" />
              </a>
            </div>
            <div class="item">
              <a href="#">
                <img src="@/assets/images/brand/br4.png" alt="brand-image" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Modal -->
    <section>
      <div v-if="showModal" class="modal">
        <div class="modal-content">
          <span class="close" @click="closeModal">&times;</span>
          <h2>Seguro que quieres alquilar {{ selectedCar.modelo }}?</h2>
          <div>
            <label for="dias">Número de días:</label>
            <input type="number" v-model="dias" min="1" required>
          </div>
          <button @click="confirmRental">Aceptar</button>
        </div>
      </div>
      <div v-if="showLogoutModal" class="modal">
        <div class="modal-content">
          <span class="close" @click="closeLogoutModal">&times;</span>
          <h2>¿Estás seguro que deseas salir?</h2>
          <button @click="confirmLogout">Sí</button>
          <button @click="closeLogoutModal">No</button>
        </div>
      </div>
    </section>
    <!--blog start -->
   
  </div>
</template>

<script>
import br1 from '@/assets/images/brand/br1.png'
import br2 from '@/assets/images/brand/br2.png'
import br3 from '@/assets/images/brand/br3.png'
import br4 from '@/assets/images/brand/br4.png'

// Featured cars imports
import fc1 from '@/assets/images/featured-cars/fc1.png'
import fc2 from '@/assets/images/featured-cars/fc2.png'
import fc3 from '@/assets/images/featured-cars/fc3.png'
import fc4 from '@/assets/images/featured-cars/fc4.png'
import fc5 from '@/assets/images/featured-cars/fc5.png'
import fc7 from '@/assets/images/featured-cars/fc7.png'
import fc8 from '@/assets/images/featured-cars/fc8.png'

export default {
  name: 'HomePage',
  data() {
    return {
      cars: [],
      fadeOut: false,
      rentalSuccessMessage:'',
      brandImages: [br1, br2, br3, br4],
      featuredImages: {
        fc1, fc2, fc3, fc4, fc5, fc7, fc8
      },
      showModal: false,
      showLogoutModal: false,
      selectedCar: null,
      dias: 1
    }
  },
  methods: {
    async fetchCars() {
      try {
        const token = localStorage.getItem('jwt');
        const response = await fetch('http://localhost:8080/api/autos', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          this.cars = await response.json();
        } else {
          console.error('Failed to fetch cars');
        }
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    },
    openModal(car) {
      this.selectedCar = car;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.selectedCar = null;
      this.dias = 1;
    },
    async confirmRental() {
      try {
    const userId = localStorage.getItem('userId');
    const response = await fetch('http://localhost:8080/api/alquilers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({
        dias: this.dias,
        autoId: this.selectedCar.id,
        userId: userId
      })
    });

    if (response.ok) {
      this.rentalSuccessMessage = 'Alquiler exitoso';
      this.fadeOut = false; // Asegurarse de que el mensaje esté completamente visible
      this.closeModal();

      // Esperar 3 segundos antes de iniciar el desvanecimiento
      setTimeout(() => {
        this.fadeOut = true;

        // Esperar a que termine la animación antes de ocultar el mensaje
        setTimeout(() => {
          this.rentalSuccessMessage = '';
          this.fadeOut = false; // Reiniciar para futuros mensajes
        }, 500); // Debe coincidir con la duración de la transición de opacidad
      }, 3000); // Tiempo que el mensaje permanece visible
    } else {
      this.rentalSuccessMessage = 'Error en el alquiler';
      this.fadeOut = false;

      setTimeout(() => {
        this.fadeOut = true;
        setTimeout(() => {
          this.rentalSuccessMessage = '';
          this.fadeOut = false;
        }, 500);
      }, 3000);
    }
  } catch (error) {
    console.error('Error en el alquiler:', error);
    this.rentalSuccessMessage = 'Error en el alquiler';
    this.fadeOut = false;

    setTimeout(() => {
      this.fadeOut = true;
      setTimeout(() => {
        this.rentalSuccessMessage = '';
        this.fadeOut = false;
      }, 500);
    }, 3000);
  }
  
    },
   handleLogout() {
      this.showLogoutModal = true;
    },
    closeLogoutModal() {
      this.showLogoutModal = false;
    },
    confirmLogout() {
      localStorage.removeItem('jwt');
      localStorage.removeItem('userId');
      this.$router.push('/');
    }
  },
  mounted() {
    this.fetchCars();
  }
};
</script>

<style scoped>
/* 
@import url('@/assets/css/font-awesome.min.css');
@import url('@/assets/css/bootstrap.min.css');
*/
@import url('https://fonts.googleapis.com/css?family=Poppins:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i');
@import url('@/assets/css/style.css');
@import url('@/assets/css/responsive.css');
@import url('https://fonts.googleapis.com/css?family=Rufina:400,700');

.nav-menu {
  display: flex;
  gap: 20px;
  list-style: none;
  padding: 0;
}

.nav-menu li {
  display: inline;
}

.nav-menu a {
  text-decoration: none;
  color: #ffffff;
}

.nav-menu a:hover {
  color: #007bff;
}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 500px;
  text-align: center;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: rgb(255, 255, 255);
  text-decoration: none;
  cursor: pointer;
}

button {
  margin: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #ddd;
}
.titulomarcas {
  color: rgb(80, 137, 202);
  margin-bottom: 45px;
}
.success-message {
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #4CAF50; /* Color verde para indicar éxito */
  color: white;
  padding: 15px 20px;
  border-radius: 4px;
  font-size: 16px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  opacity: 1;
  transition: opacity 0.5s ease-out;
  z-index: 1000;
}

.success-message.fade-out {
  opacity: 0;
}


</style>