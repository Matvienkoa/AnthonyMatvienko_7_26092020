<template>
  <div class="loginCard">
    <div class="logoCard">
      <img src="../assets/icon-above-font.svg" alt="" id="logoLogin"/>
    </div>
    <div id="loginForm">
      <h2 v-if="mode == 'login'">Se connecter</h2>
      <h2 v-else>S'inscrire</h2>
      <p v-if="mode == 'login'">Tu n'as pas encore de compte? <span @click="switchToCreateAccount()" id="create">Créer un compte</span></p>
      <p v-else>Tu as déjà un compte? <span @click="switchToLogin()" id="login">Se connecter</span></p>
      <div class="form"> 
        <input v-model="email" type="email" class="form-control" placeholder="Adresse mail" required>
        <input v-model="username" type="text" class="form-control" placeholder="Username" v-if="mode == 'create'" required>
        <input v-model="poste" type="text" class="form-control" placeholder="Poste occupé" v-if="mode == 'create'" required>
        <input v-model="password" type="password" class="form-control" placeholder="Mot de passe" required>
        <button @click="login()" class="btn btn-primary" v-if="mode == 'login'">Connexion</button>
        <button @click="createAccount()" class="btn btn-primary" v-if="mode == 'create'">Inscription</button>
        <div id="error" v-if="error"> {{ error.message }} </div>
      </div>
    </div>
  </div>
  <Footer/>
</template>

<script>
import Footer from '@/components/Footer.vue'

  export default {
    name: 'Login',
    components: {
      Footer,
    },
    data() {
      return {
        mode: 'login',
        error: "",
      }
    },
    methods: {
      switchToCreateAccount() {
        this.mode = 'create';
      },
       switchToLogin() {
        this.mode = 'login';
      },
      login() {
        this.$store.dispatch('login', {
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.$store.dispatch('getUserInfos');
          this.$router.push('home');
        })
        .catch((error) => {
          this.error = error.response.data
          console.log(error.response.data);
        })
      },
      createAccount() {
        this.$store.dispatch('createAccount', {
          email: this.email,
          username: this.username,
          poste: this.poste,
          password: this.password
        })
        .then((response) => {
          console.log(response);
          this.login();
        })
        .catch((error) => {
          this.error = error.response.data
          console.log(error);
        })
      },
    }
  }
</script>

<style scoped>
  #logoLogin {
    width: 25%;
    min-width: 200px;
    max-width: 400px;
  }
  .form {
    width: 80%;
    max-width: 400px;
    margin: auto;
    margin-top: 5px;
  }
  h2, p{
    width: 80%;
    margin: auto;
    margin-bottom: 10px;
  }
  input {
    margin-bottom: 20px;
  }
  #create, #login{
    text-decoration: underline;
    cursor: pointer;
    color: rgb(51, 134, 243);
    margin-left: 10px;
  }
  .loginCard{
    height: 100vh;
    margin-bottom: -90px;
  }
  #error{
    margin-top: 30px;
    color: red;
    font-weight: bold;
  }
</style>

