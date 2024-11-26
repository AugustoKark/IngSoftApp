<template>
  <div class="rentals-container">
    <h1 class="title">Mis Alquileres</h1>
    <button @click="$router.push('/home')" class="back-button">Volver al Home</button>
    <div v-if="rentals.length" class="rentals-grid">
      <div v-for="rental in rentals" :key="rental.id" class="rental-item">
        <img :src="require(`@/assets/images/featured-cars/${rental.autoImg}.png`)" alt="auto" class="rental-img">
        <h2>{{ rental.autoNombre }}</h2>
        <p>Días: {{ rental.dias }}</p>
        <p>Precio Final: ${{ rental.precioFinal }}</p>
      </div>
    </div>
    <div v-else>
      <p>No tienes alquileres.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyRentals',
  data() {
    return {
      rentals: []
    }
  },
  methods: {
    async fetchRentals() {
      try {
        const userId = localStorage.getItem('userId');
        const response = await fetch(`http://localhost:8080/api/alquilers/usuario/${userId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
          }
        });

        if (response.ok) {
          this.rentals = await response.json();
        } else {
          console.error('Failed to fetch rentals');
        }
      } catch (error) {
        console.error('Error fetching rentals:', error);
      }
    }
  },
  mounted() {
    this.fetchRentals();
  }
};
</script>

<style scoped>
.rentals-container {
  text-align: center;
  padding: 20px;
}

.title {
  color: rgb(80, 127, 216);
  font-size: 2em;
  margin-bottom: 20px;
}

.back-button {
  background-color: #4e93dd;
  color: white;
  border: none;
  padding: 10px 20px;
  margin-bottom: 20px;
  cursor: pointer;
  border-radius: 5px;
}

.back-button:hover {
  background-color: #226ebe;
}

.rentals-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.rental-item {
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
  width: calc(33.333% - 20px); /* Ajusta el ancho para tres elementos por fila */
  box-sizing: border-box;
  text-align: center;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.rental-img {
  max-width: 100%;
  height: auto;
  margin-bottom: 10px;
  border-radius: 5px;
}
</style>