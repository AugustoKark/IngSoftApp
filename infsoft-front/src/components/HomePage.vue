<template>
  <div>
    <section id="home" class="welcome-hero">
      <!-- top-area Start -->
      <div class="top-area">
        <div class="header-area">
          <!-- Start Navigation -->
          <nav class="navbar navbar-default bootsnav navbar-sticky navbar-scrollspy" data-minus-value-desktop="70" data-minus-value-mobile="55" data-speed="1000">
            <div class="container">
              <!-- Start Header Navigation -->
              <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar-menu">
                  <i class="fa fa-bars"></i>
                </button>
                <a class="navbar-brand" href="index.html">RentalCAR<span></span></a>
              </div><!--/.navbar-header-->
              <!-- End Header Navigation -->
              <!-- Collect the nav links, forms, and other content for toggling -->
              
            </div><!--/.container-->
          </nav><!--/nav-->
          <!-- End Navigation -->
        </div><!--/.header-area-->
        <div class="clearfix"></div>
      </div><!-- /.top-area-->
      <!-- top-area End -->
      <div class="container">
        <div class="welcome-hero-txt">
          <h2>get your desired car in resonable price</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <button class="welcome-btn" onclick="window.location.href='#'">contact us</button>
        </div>
      </div>
    </section><!--/.welcome-hero-->
    <!--welcome-hero end -->
    <!--featured-cars start -->
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
                <span class="featured-mi-span"> {{car.km}} mi</span>
                <span class="featured-hp-span"> {{car.hp}}HP</span>
                {{car.transmision}}
              </p>
            </div>
          </div>
          <div class="featured-cars-txt">
            <h2><a href="#">{{car.modelo}}</a></h2>
            <h3>${{car.precio}} <button class="rent-button">Alquilar</button></h3>
            <p>{{car.descripcion}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
     
    </section><!--/.featured-cars-->
    <!--featured-cars end -->
    <!--brand strat -->
    <!--brand start -->
    <section id="brand" class="brand">
  <div class="container">
    <div class="brand-area">
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
    <!--brand end -->
    <!--blog start -->
    <section id="blog" class="blog"></section><!--/.blog-->
    <!--blog end -->
    <!--contact start-->
    
    <!--contact end-->
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
      brandImages: [br1, br2, br3, br4],
      featuredImages: {
        fc1, fc2, fc3, fc4, fc5, fc7, fc8
      }
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

</style>