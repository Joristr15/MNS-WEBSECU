
Dans votre code, l'alerte ne s'affiche pas correctement parce que vous avez ajouté une marge inférieure (margin-bottom: 50px;) à l'icône SVG à l'intérieur de l'alerte. Cela provoque un espace supplémentaire entre l'icône et le texte de l'alerte, ce qui pousse le texte vers le bas.

Pour résoudre ce problème, vous pouvez supprimer la marge inférieure de l'icône SVG ou ajuster la disposition de l'alerte en utilisant des classes de style spécifiques à votre framework ou en personnalisant le CSS.

Voici une version modifiée du code où j'ai enlevé la marge inférieure de l'icône SVG :

html
Copy code
<template>
  <FormsHeader/>
  <div class="card w-96 bg-neutral text-neutral-content custom-margin">
    <div class="card-body items-center text-center text-2xl">
      <h1 class="text-2xl font-bold pb-[-1%]" style="font-size: 20px;margin-top: -2%;margin-bottom: 2%;">CONNEXION</h1>
      <form>
        <div class="form-group">
          <input type="text" id="login" v-model="login" placeholder="Login" class="input input-ghost w-full max-w-xs" required/>
        </div>
        <div class="form-group">
          <input type="password" id="password" v-model="password" placeholder="Password" class="input input-ghost w-full max-w-xs" required>
        </div>
        <button type="submit" class="btn btn-sm btn-block btn btn-outline btn-success" @click.prevent="performLogin">Connexion</button>
      </form>
      <hr style="margin-top: 2%;margin-bottom: 2%;">
      <p style="font-size: 13px;margin-top: -2%;">Pas encore inscrit ?</p>
      <button type="submit" class="btn btn-sm btn-block btn btn-outline btn-info" @click.prevent="Inscription">Inscrivez-vous dès maintenant</button>
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
import FormsHeader from '../components/FormsHeader.vue';
export default {
  components: {
    FormsHeader,
  },
  data() {
    return {
      login: '',
      password: '',
      messageError: ''
    };
  },
  mounted() {
    const token = localStorage.getItem('token');
    if (token) {
      this.$router.push('/connexion-reussie');
    }
  },
  methods: {
    
    performLogin() {
  if (this.login && this.password) {
    axios.post('http://localhost:3000/signIn', {
      username: this.login,
      password: this.password
    }).then((response) => {
      const responseData = response.data
      const responseDataVerif = response.data.replace(/^"(.*)"$/, '$1');
      if (responseDataVerif !== "ERREUR LOGIN") {
        localStorage.setItem('token', responseData);
        this.$router.push('/connexion-reussie');
      } else {
        this.messageError = "La combinaison login/password n'est pas correcte";
      }
    });
  } else {
    this.messageError = "Veuillez remplir tous les champs.";
  }
},


    Inscription(){
      this.$router.push('/inscription');
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
.form-group {
  margin-bottom: 15px;
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
