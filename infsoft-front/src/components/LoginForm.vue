<template>
  <div class="container">
    <div class="wrapper">
      <div class="title-text">
        <div class="title login">Login</div>
        <div class="title signup">Register</div>
      </div>
      <div class="form-container">
        <div class="slide-controls">
          <input type="radio" name="slide" id="login" checked>
          <input type="radio" name="slide" id="signup">
          <label for="login" class="slide login">Login</label>
          <label for="signup" class="slide signup">Register</label>
          <div class="slider-tab"></div>
        </div>
        <div class="form-inner">
          <form @submit.prevent="login" class="login">
            <div class="field">
              <input type="text" v-model="username" placeholder="Username" required>
            </div>
            <div class="field">
              <input type="password" v-model="password" placeholder="Password" required>
            </div>
            <div class="pass-link">
              <a href="#">Forgot password?</a>
            </div>
            <div class="field btn">
              <div class="btn-layer"></div>
              <input type="submit" value="Login">
            </div>
            <div class="signup-link">
              Not a member? <a href="">Register now</a>
            </div>
          </form>
          <form @submit.prevent="register" class="signup">
            <div class="field">
              <input type="text" v-model="registerUsername" placeholder="Username" required>
            </div>
            <div class="field">
              <input type="text" v-model="registerEmail" placeholder="Email Address" required>
            </div>
            <div class="field">
              <input type="password" v-model="registerPassword" placeholder="Password" required>
            </div>
            <div class="field">
              <input type="password" v-model="registerConfirmPassword" placeholder="Confirm password" required>
            </div>
            <div class="field btn">
              <div class="btn-layer"></div>
              <input type="submit" value="Signup">
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      username: '',
      password: '',
      registerUsername: '',
      registerEmail: '',
      registerPassword: '',
      registerConfirmPassword: ''
    };
  },
  methods: {
    switchToLogin() {
    const loginForm = document.querySelector("form.login");
    const loginText = document.querySelector(".title-text .login");
    const loginBtn = document.querySelector("label.login");
    
    loginForm.style.marginLeft = "0%";
    loginText.style.marginLeft = "0%";
    loginBtn.click();
  },
    async login() {
      try {
        const response = await fetch('http://localhost:8080/api/authenticate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password
          })
        });

        const data = await response.json();
        console.log(data);

        if (response.ok) {
          alert('Login successful');
          // Guarda el token en el almacenamiento local o en una cookie
          localStorage.setItem('jwt', data.jwt);
          localStorage.setItem('userId', data.userId);
          // redirige a la página de inicio
          this.$router.push('/home');
        } else {
          alert('Login failed');
        }
      } catch (error) {
        console.error('Network error:', error);
        alert('Network error');
      }
    },
    async register() {
      if (this.registerPassword !== this.registerConfirmPassword) {
        alert('Passwords do not match');
        return;
      }

      try {
        const response = await fetch('http://localhost:8080/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            login: this.registerUsername,
            email: this.registerEmail,
            password: this.registerPassword,
            langKey: 'es'
          })
        });

        const data = await response.json();
        console.log(data);

        if (response.ok) {
          alert('Registration successful');
          this.registerUsername = '';
        this.registerEmail = '';
        this.registerPassword = '';
        this.registerConfirmPassword = '';
        // Switch to login form
        this.switchToLogin();
        } else {
          alert('Registration failed');
        }
      } catch (error) {
        console.error('Network error:', error);
        alert('Network error');
      }
    }
  },
  mounted() {
    const loginText = document.querySelector(".title-text .login");
    const loginForm = document.querySelector("form.login");
    const loginBtn = document.querySelector("label.login");
    const signupBtn = document.querySelector("label.signup");
    const signupLink = document.querySelector("form .signup-link a");

    signupBtn.onclick = () => {
      loginForm.style.marginLeft = "-50%";
      loginText.style.marginLeft = "-50%";
    };

    loginBtn.onclick = () => {
      loginForm.style.marginLeft = "0%";
      loginText.style.marginLeft = "0%";
    };

    signupLink.onclick = () => {
      signupBtn.click();
      return false;
    };
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Poppins:400,500,600,700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

html, body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background: -webkit-linear-gradient(left, #455eb2, #4298fa);
}

::selection {
  background: #427cfa;
  color: #fff;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

.wrapper {
  overflow: hidden;
  max-width: 390px;
  background: #fff;
  padding: 30px;
  border-radius: 5px;
  box-shadow: 0px 15px 20px rgba(0,0,0,0.1);
}

.wrapper .title-text {
  display: flex;
  width: 200%;
}

.wrapper .title {
  width: 50%;
  font-size: 35px;
  font-weight: 600;
  text-align: center;
  transition: all 0.6s cubic-bezier(0.68,-0.55,0.265,1.55);
}

.wrapper .slide-controls {
  position: relative;
  display: flex;
  height: 50px;
  width: 100%;
  overflow: hidden;
  margin: 30px 0 10px 0;
  justify-content: space-between;
  border: 1px solid lightgrey;
  border-radius: 5px;
}

.slide-controls .slide {
  height: 100%;
  width: 100%;
  color: #fff;
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  line-height: 48px;
  cursor: pointer;
  z-index: 1;
  transition: all 0.6s ease;
}

.slide-controls label.signup {
  color: #000;
}

.slide-controls .slider-tab {
  position: absolute;
  height: 100%;
  width: 50%;
  left: 0;
  z-index: 0;
  border-radius: 5px;
  background: -webkit-linear-gradient(left, #456bb2, #4282fa);
  transition: all 0.6s cubic-bezier(0.68,-0.55,0.265,1.55);
}

input[type="radio"] {
  display: none;
}

#signup:checked ~ .slider-tab {
  left: 50%;
}

#signup:checked ~ label.signup {
  color: #fff;
  cursor: default;
  user-select: none;
}

#signup:checked ~ label.login {
  color: #000;
}

#login:checked ~ label.signup {
  color: #000;
}

#login:checked ~ label.login {
  cursor: default;
  user-select: none;
}

.wrapper .form-container {
  width: 100%;
  overflow: hidden;
}

.form-container .form-inner {
  display: flex;
  width: 200%;
}

.form-container .form-inner form {
  width: 50%;
  transition: all 0.6s cubic-bezier(0.68,-0.55,0.265,1.55);
}

.form-inner form .field {
  height: 50px;
  width: 100%;
  margin-top: 20px;
}

.form-inner form .field input {
  height: 100%;
  width: 100%;
  outline: none;
  padding-left: 15px;
  border-radius: 5px;
  border: 1px solid lightgrey;
  border-bottom-width: 2px;
  font-size: 17px;
  transition: all 0.3s ease;
}

.form-inner form .field input:focus {
  border-color: #8b83fc;
}

.form-inner form .field input::placeholder {
  color: #999;
  transition: all 0.3s ease;
}

form .field input:focus::placeholder {
  color: #b3b3b3;
}

.form-inner form .pass-link {
  margin-top: 5px;
}

.form-inner form .signup-link {
  text-align: center;
  margin-top: 30px;
}

.form-inner form .pass-link a,
.form-inner form .signup-link a {
  color: #4282fa;
  text-decoration: none;
}

.form-inner form .pass-link a:hover,
.form-inner form .signup-link a:hover {
  text-decoration: underline;
}

form .btn {
  height: 50px;
  width: 100%;
  border-radius: 5px;
  position: relative;
  overflow: hidden;
}

form .btn .btn-layer {
  height: 100%;
  width: 300%;
  position: absolute;
  left: -100%;
  background: -webkit-linear-gradient(right, #456bb2, #427cfa, #455eb2, #42a1fa);
  border-radius: 5px;
  transition: all 0.4s ease;
}

form .btn:hover .btn-layer {
  left: 0;
}

form .btn input[type="submit"] {
  height: 100%;
  width: 100%;
  z-index: 1;
  position: relative;
  background: none;
  border: none;
  color: #fff;
  padding-left: 0;
  border-radius: 5px;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
}
</style>