import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios';
import Swal from 'sweetalert2';


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    smoothies: [],
    fruits: [],
    liquids: [],
    proteins: [],
    loading: false,
  },
  
  mutations: {
    addAllSmoothies(state, smoothies = []) {
      state.smoothies = smoothies;
    },
    addSmoothie(state, smoothie) {
      state.smoothies.push(smoothie);
    },
    addAllFruits(state, fruits = []) {
      state.fruits = fruits;
    },
    addAllLiquids(state, liquids = []) {
      state.liquids = liquids;
    },
    addAllProteins(state, proteins = []) {
      state.proteins = proteins;
    },
    loading(state, value = true) {
      state.loading = value;
    }
  },

  actions: {
    async getAllSmoothies({ commit }) {
      commit('loading');
      try  {
        const { data } = await axios.get('/smoothies');
        commit('addAllSmoothies', data.smoothies);
        
      }catch(error) {
        console.log(error);

      }finally {
        commit('loading', false);
      }
    },

    createSmoothie() {

    },

    async getAllFruits({ commit }) {
      commit('loading');
      try {
        const { data } = await axios.get('/fruits');
        commit('addAllFruits', data.fruits);
      }catch(error) {
        console.log(error);
      }finally {
        commit('loading', false);
      }
    },

    async getAllLiquids({ commit }) {
      commit('loading')
      try {
        const { data } = await axios.get('/liquids');
        commit('addAllLiquids', data.liquids);
      }catch(error) {
        console.log(error);
      }finally {
        commit('loading', false);
      }
    },

    async getAllProteins({ commit }) {
      commit('loading')
      try {
        const { data } = await axios.get('/proteins');
        commit('addAllProteins', data.proteins);
      }catch(error) {
        console.log(error);
      }finally {
        commit('loading', false);
      }
    },

    async createSmoothie({ commit }, smoothie) { 
      commit('loading')
      let saved = false;
      try {
        await axios.post('/smoothies', smoothie);
        Swal.fire(
          'Great!',
          'The Smoothie has been created!',
          'success'
        );
        saved = true;
      }catch(error) {
        const { response } = error;
        let message = 'There was an error to create smoothie';

        if(response.data) {
          if(response.data.errors)
            message = response.data.errors.toString();
          else
            message = response.data;
        }

        Swal.fire(
          'Oops!',
          message,
          'error'
        );

      }finally {
        commit('loading', false);

        return new Promise((resolve, reject) => {
          if(saved)
            resolve();
          else
            reject();
        })
      }
      
    }
  },
  modules: {
  }
})
