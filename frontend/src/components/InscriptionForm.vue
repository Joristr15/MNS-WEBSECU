<template>
  <FormsHeader/>
  <div class="card w-96 bg-neutral text-neutral-content custom-margin">
  <div class="card-body items-center text-center text-2xl">
    <h1 class="text-2xl font-bold pb-[-1%]" style="font-size: 20px;margin-top: -2%;margin-bottom: 2%;">INSCRIPTION</h1>
    <form>
      <div class="form-group">
        <input type="text" id="login" v-model="login" placeholder="Login" class="input input-ghost w-full max-w-xs" required/>
      </div>
      <div class="form-group">
        <input type="password" id="password" v-model="password" placeholder="Password" class="input input-ghost w-full max-w-xs" required>
      </div>
      <div class="form-group">
        <input type="password" id="password" v-model="passwordConfirmation" placeholder="Check the password" class="input input-ghost w-full max-w-xs" required>
      </div>
        <button type="submit" class="btn btn-sm btn-block btn btn-outline btn-success " @click.prevent="performRegistration">Inscription</button>
    </form>
    <hr style="margin-top: 2%;margin-bottom: 2%;">
    <p style="font-size: 13px;margin-top: -2%;"> Déjà un compte ?</p>
    <button type="submit" class="btn btn-sm btn-block btn btn-outline btn-info " @click.prevent="Connexion">Connectez-vous dès maintenant</button>
    <div v-if="messageError !== ''" class="alert alert-error flex items-center justify-center" style="margin-top: 20px;">
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-2 w-3" fill="none" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span id="alerte" style="font-size: 15px;" class="text-center">
          <i class="fa-solid fa-triangle-exclamation" style="color: #000000;"></i>
          {{ messageError }}
        </span>
      </div>
  </div>
  </div>
</template>

<script>
import axios from 'axios';
import FormsHeader from '../components/FormsHeader.vue'
export default {
  components: {
    FormsHeader,
  },
  data() {
    return {
      login: '',
      password: '',
      passwordConfirmation: '',
      messageError: ''
    };
  },
  mounted() {
  },
  methods: {
    performRegistration() {
      if (this.login && this.password && this.passwordConfirmation) {
        if (this.password == this.passwordConfirmation) {
          axios.post('http://localhost:3000/signUp', {
          username: this.login,
          password: this.password
      }).then((response) => {
          const responseData = response.data
        const responseDataVerif = response.data.replace(/^"(.*)"$/, '$1');
        if (responseDataVerif !== "ERREUR LOGIN") {
          localStorage.setItem('token', responseData);
          this.$router.push('/connexion-reussie');
        } else {
          this.messageError = "Ce nom d'utilisateur n'est pas disponible";
        }
      });
        }else{
          this.messageError = 'Vos mots de passe ne sont pas identiques'
        }
      }else {
        this.messageError= 'Veuillez remplir tous les champs.'
      }
    },
    Connexion(){
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
.login {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f2f2f2;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  height: 35px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.custom-margin {
  margin-left: 20%;
  margin-right: 20%;
  margin-top: 10%;
}
</style>
