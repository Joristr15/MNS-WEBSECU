<template>
  <div id="hautNav" class="navbar bg-base-100">
  <div>
    <a class="btn btn-ghost normal-case text-xl text-center">BLOG</a>
  </div>
</div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
  text-align: center;
}
</style>
