<template>
  <div class="smoothies overlay">
    <v-container class="main">

      <Header />      
      <GoBackLink />

      <div v-if="loading">
        <v-row>
          <v-col cols="12" md="6" lg="4" v-for="item in 6" :key="item">
            <v-skeleton-loader
              :loading="loading"
              type="list-item-two-line"
            ></v-skeleton-loader>
          </v-col>
        </v-row>
      </div>


      <v-expansion-panels
        v-else
        v-model="panels"
        multiple 
        focusable>

        <v-row>
          <v-col v-for="(smoothie, i) in smoothies" :key="smoothie._id"
            cols="12" md="6" lg="4" >

            <SmoothiePanel
              :number="i + 1"
              :smoothie="smoothie"
            />

          </v-col>
        </v-row>

      </v-expansion-panels>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Header from '@/components/Header';
import GoBackLink from '@/components/GoBackLink'
import SmoothiePanel from '@/components/SmoothiePanel';

export default {
  name: 'Smoothies',
  components: { Header, GoBackLink, SmoothiePanel },
  data(){
    return {
      panels: [],
    }
  },
  computed: {
    ...mapState(['smoothies', 'loading']),
  },
  methods: {
    ...mapActions(['getAllSmoothies']),
  },
  mounted() {
    this.getAllSmoothies();
  }
}
</script>

<style scoped>
  .smoothies {
    background-image: url('../assets/smoothies.jpg');
    height: 100%;
  }
</style>