<template>
    <FormsHeader class="espace"/>
    <div class="card bg-neutral text-neutral-content custom-margin">
        <div class="card-body items-center text-center">
          <div class="flex buttons">
        <router-link to="/login" class="btn button-spacing btn-outline btn-success">Se connecter</router-link>
        <router-link to="/inscription" class="btn button-spacing btn-outline btn-info w-1/4">S'inscrire</router-link>
      </div>
        </div>
      </div>
  </template>
  <script>
    import FormsHeader from '../components/FormsHeader.vue'
    export default {
      mounted() {
          const token = localStorage.getItem('token');
          console.log(token);
        },
        components: {
            FormsHeader,
        },
    };
  </script>
  <style>
  .espace{
    margin-bottom: 30px;
  }
  .custom-margin {
  margin-left: 20%;
  margin-right: 20%;
  }
  .button-spacing {
  margin-left: 1%;
  margin-right: 1%;
  width:300px;
  margin-bottom: 1%;
  }
  </style>
  