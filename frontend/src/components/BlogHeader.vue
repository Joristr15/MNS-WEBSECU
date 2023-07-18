<template>
  <div id="hautNav" class="navbar bg-base-100">
  <div class="navbar-start">
    <div class="tooltip tooltip-open tooltip-right tooltip-warning" data-tip="Vous êtes connecté">
      <button class="btn">{{ username }}</button>
    </div>
  </div>
  <div class="navbar-center">
    <a class="btn btn-ghost normal-case text-xl">BLOG</a>
  </div>
  <div class="navbar-end">
    <button class="btn btn-sm btn-outline btn-error" @click="logout">Logout</button> 
  </div>
</div>
</template>

<script>
export default {
  props: {
    username: {
      type: String,
      required:true,
    },
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('posts');
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #052836;
  color: #fff;
  padding: 10px;
  width: 100%; 
  box-sizing: border-box; 
}

.navbar-brand {
  font-size: 20px;
  font-weight: bold;
}

.logout-button {
  background-color: #f44336; 
  color: #fff;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;
}

.hello {
  margin-top: -60px;
  margin-left: -5px;
  width: 100%;
  padding-bottom: 100px;
}
</style>
