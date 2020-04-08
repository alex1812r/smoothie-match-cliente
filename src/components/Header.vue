<template>
  <h1 class="header my-12 white--text">
    <img src="../assets/smoothie-logo.png" class="mr-2 mb-2"> 
    Smoothie-Match
  </h1>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style scoped>
  .header {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 960px) {
    .header {
      flex-direction: column;
    }
  }

  .header img {
    width: 50px;
  }
</style>