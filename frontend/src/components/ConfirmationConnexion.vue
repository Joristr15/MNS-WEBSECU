<template>
  <BlogHeader class="espace" :username="username" />
  <div class="grid-container">
      <div class="card-body items-center text-center textarea-container msg" >
        <textarea class="textarea custom-textarea position" style="color: black;height: 150px;" placeholder="Ecrivez votre poste ici.." v-model="posteText"></textarea>
        <button type="submit" class="btn btn-success hover-btn-succes" style="height: 5px;" @click.prevent="filterSpecialCharacters">Add Poste</button>
      </div>
      <PostCard class="poste" style="margin-top: 12%;" :idCreator="idCreator" :role="role" ref="postCard" />


  </div>
</template>

<script>
import axios from 'axios';
import PostCard from '../components/PostCard.vue'
import BlogHeader from '../components/BlogHeader.vue'
import { format } from 'date-fns';

export default {
  components: {
    BlogHeader,
    PostCard,
  },
  data() {
    return {
      username: '',
      idCreator: '',
      role: '',
      showPopup: false,
      posteText: '',
      idPost: '',
      posts: [],
      messageError: '',
    };
  },
  mounted() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.$router.push('/login');
      return;
    }
    axios.get('http://localhost:3000/verifToken', {
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        const responseData = response.data;
        this.username = responseData.data.username;
        this.idCreator = responseData.data._id;
        const roles = responseData.data.roles;
      if (Array.isArray(roles) && roles.length > 0) {
        this.role = roles[0].toString();
      }

      })
      .catch(() => {
        localStorage.removeItem('token');
        this.$router.push('/');
        return;
      });
  },
  methods: {
    formatDate(date) {
      const formattedDate = format(new Date(date), 'dd/MM/yyyy à HH:mm');
      return formattedDate;
    },
    SendPoste() {
      const today = new Date();
      const datecreated = today;
      axios.post('http://localhost:3000/savePost', {
        idcreator: this.idCreator,
        datepost: datecreated,
        textpost: this.posteText,
        idPost: this.idPost,
      })
      .then((response) => {
        console.log(response);
        this.$refs.postCard.$forceUpdate();
      })
      .catch((error) => {
        console.error(error);
      });
    },
    filterSpecialCharacters() {
      const specialCharPattern = /[^a-zA-Z0-9\s!À-ÿ]/g;
      const isValid = !specialCharPattern.test(this.posteText);
      if (isValid) {
        this.SendPoste();
      } else {
        this.messageError = "Le texte contient des caractères spéciaux non autorisés !";
        this.openModal();
      }
    },
  },
};
</script>

<style scoped>
:hover.hover-btn-succes {
  background-color: transparent;
  color: rgb(59, 197, 110);
}
.grid-container {
  margin-top:px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 1%;
}
.position{
  margin-top:8%
}
.textarea-container {
  grid-column: 1;
}
.poste {
  grid-column: 2;
}
</style>
