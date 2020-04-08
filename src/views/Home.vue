<template>
  <div class="home overlay">
    <v-container class="main">

      <Header />
      
      <v-row justify="space-between" class="pt-10">
        <v-col cols="12" md="6" class="row align-center">
          <h3 class="text-center text-lg-start white--text">
          Smoothie Match was designed by smoothie 
          specialists to find the perfect flavor to match 
          your mood and...</h3>
        </v-col>

        <v-col cols="12" md="6">
          <div class="text-center">
            <router-link to="/create-smoothie">
              <v-btn
                outlined
                x-large
                color="success"
                class="my-10 font-weight-bold">
                Create your own smoothie
              </v-btn>
            </router-link>
          </div>
          
          <div class="text-center">
            <router-link to="/smoothies">
              <v-btn
                outlined
                x-large
                color="primary"
                class="font-weight-bold">
                  Take me to the smoothies!
              </v-btn>
            </router-link>      
          </div>
        </v-col>
      </v-row>
          
      
    </v-container>
  </div>
</template>

<script>
import Header from '@/components/Header';

export default {
  name: 'Home',
  components: { Header }
}
</script>

<style scoped>
  .home {
    background-image: url('../assets/smoothies-walpapper.jpg');
    height: 100%;
  }
</style>