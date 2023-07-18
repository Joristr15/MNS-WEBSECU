<template>
  <div>
    <div class="cards-container">
      <div class="card lg:card-side shadow-xl" v-for="post in posts" :key="post.id">
        <div class="card-body">
          <div class="empty-space"></div>
          <div class="collapse-title text-xl font-medium post-item">
            {{ post.textpost }}
          </div>
          <div class="date">
            {{ post.dateFormatted }}
          </div>

          <div class="like-button" v-if="post.idcreator !== idCreator">
          <span class="icon" @click="toggleLike(post)">
            <i class="fa-heart fa-solid" v-if="post.isLiked" style="color: #920211;"></i>
            <i class="fa-heart fa-regular" v-else></i>
          </span>
        </div>
          <div class="delete-button" v-if="role === 'admin' || post.idcreator === idCreator">
            <i class="fa-solid fa-trash-can" style="color: #a80022;" @click="deletePost(post)"></i>
          </div>
          <div class="edit-button" v-if="role === 'admin' || post.idcreator === idCreator">
            <i class="fa-solid fa-pen-to-square" style="color: #b67b16;" @click="modifyPost(post)"></i>
          </div>
        </div>
      </div>
    </div>

    <div class="popup" v-if="showPopup">
      <div class="popup-content">
        <textarea class="textarea textarea-warning" v-model="modifiedPostText"></textarea>
        <div class="popup-buttons">
          <button class="btn btn-outline btn-success" @click="validateModifyPost(selectedPostId)">Valider</button>
          <button class="btn btn-outline btn-error" @click="cancelModifyPost">Annuler</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { format } from 'date-fns';
export default {
  props: {
    idCreator: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
  },
  mounted() {
    axios.get('http://localhost:3000/postAll')
      .then((response) => {
        const responseData = response.data;
        localStorage.removeItem('likedPostIds');
        this.posts = responseData.map((post) => {
          const isLiked = post.arraylike.some((userId) => userId === this.$props.idCreator);
          if (isLiked) {
            const likedPostIds = JSON.parse(localStorage.getItem('likedPostIds')) || [];
            likedPostIds.push(post._id);
            localStorage.setItem('likedPostIds', JSON.stringify(likedPostIds));
          }
          return {
            ...post,
            isLiked: isLiked,
            dateFormatted: format(new Date(post.datepost), 'dd-MM-yyyy HH:mm'),
          };
        });
      })
      .catch((error) => {
        console.error('Erreur', error);
      });
  },
  data() {
    return {
      posts: [],
      showPopup: false,
      modifiedPostText: '',
      selectedPostId: null,
    };
  },
  methods: {
    toggleLike(post) {
      post.isLiked = !post.isLiked;
      axios
        .put('http://localhost:3000/like', {
          postId: post._id,
          userId: this.idCreator,
          like: this.isLiked
        })
        .then(() => {
          if (this.isLiked) {
            const likedPostIds = JSON.parse(localStorage.getItem('likedPostIds')) || [];
            likedPostIds.push(post._id);
            localStorage.setItem('likedPostIds', JSON.stringify(likedPostIds));
          } else {
            const likedPostIds = JSON.parse(localStorage.getItem('likedPostIds')) || [];
            const updatedLikedPostIds = likedPostIds.filter(id => id !== post._id);
            localStorage.setItem('likedPostIds', JSON.stringify(updatedLikedPostIds));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deletePost(post) {
      axios
        .delete(`http://localhost:3000/post/${post._id}`)
        .then(() => {
          this.posts = this.posts.filter((p) => p._id !== post._id);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    modifyPost(post) {
      this.showPopup = true;
      this.modifiedPostText = post.textpost;
      this.selectedPostId = post._id;
    },
    cancelModifyPost() {
      this.showPopup = false;
      this.selectedPostId = null;
    },
    validateModifyPost(postId) {
  axios
    .put(`http://localhost:3000/modifypost`, { textpost: this.modifiedPostText, postId: postId })
    .then(() => {
      // Mettre à jour le post avec this.modifiedPostText
      // ...
    })
    .catch((error) => {
      console.log(error);
    });

  this.showPopup = false;
  this.selectedPostId = null;
},
  },
};
</script>

<style scoped>
.cards-container {
  height: 81vh;
  width: 190%;
  overflow-y: auto;
}

.card {
  margin-bottom: 5px;
  background-color: #052836;
  color: white;
  padding: 10px;
  box-sizing: border-box;
}

.card-body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  height: 100%;
  position: relative;
}

.like-button {
  position: absolute;
  left: 1%;
  top: 78%;
  cursor: pointer;
  font-size: 1.5rem;
}

.delete-button {
  position: absolute;
  left: 97%;
  top: 78%;
  cursor: pointer;
  font-size: 1.5rem;
}

.edit-button {
  position: absolute;
  left: 91%;
  top: 78%;
  cursor: pointer;
  font-size: 1.5rem;
}

.date {
  position: absolute;
  left: 1%;
  top: 1%;
  font-size: 1rem;
  color: gray;
}

.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.popup-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
}

.popup textarea {
  width: 100%;
  height: 200px;
  resize: none;
  margin-bottom: 10px;
}

.popup-buttons {
  display: flex;
  justify-content: center;
  margin-top: 5px;
}

.popup-buttons button {
  margin-left: 5px;
}
</style>
