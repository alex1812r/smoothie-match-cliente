<template>
  <div class="create-smoothie overlay">
    <v-container class="main">
      
      <Header />
      <GoBackLink />

      <v-row justify="center">
        <v-col cols="12" md="8" lg="5">
          <v-card :loading="loading">
            <v-card-title>
              Make Smoothie
            </v-card-title>
            <div class="px-4">
              <!-- FORM -->
              <v-form  @submit.prevent="submitSmoothie" 
                ref="form" v-model="valid" lazy-validation>

                <!-- NAME FIELD -->
                <v-text-field
                  outlined
                  v-model="smoothie.name"
                  label="Smoothie Name"
                  :rules="rules.name"
                  required
                ></v-text-field>
                
                <!-- FRUITS FIELDS -->
                <!-- FIRST FRUIT -->
                <v-row>
                  <v-col cols="8" class="py-0">
                    <v-select
                      outlined
                      :items="fruits"
                      label="Fruits"
                      item-text="name"
                      item-value="_id"
                      :rules="rules.fruit"
                      v-model="smoothie.fruits[0]"
                    ></v-select>
                  </v-col>

                  <!--  FRUIT ADD BUTTON -->
                  <v-col cols="4" class="text-center py-0">
                    <v-btn outlined :disabled="disabledAddFruit"
                      color="success" @click="addFruit">
                      <v-icon >fas fa-plus</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>

                <!-- OTHER FRUITS -->
                <div v-for="(item, i) in smoothie.fruits" :key="`smoothie-fruit-${i}`">
                  <v-row v-if="i > 0">
                    <v-col cols="8 py-0">
                      <v-select
                        outlined
                        :items="fruits"
                        label="Fruits"
                        item-text="name"
                        item-value="_id"
                        :rules="rules.fruit"
                        v-model="smoothie.fruits[i]"
                      ></v-select>
                    </v-col>

                    <!-- FRUIT REMOVE BUTTON -->
                    <v-col cols="4" class="text-center py-0">
                      <v-btn @click="removeFruit(i)" outlined color="red">
                        <v-icon>fas fa-trash-alt</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </div>
                
                <!-- FIELD LIQUID -->
                <v-select
                  outlined
                  :items="liquids"
                  item-value="_id"
                  item-text="name"
                  v-model="smoothie.liquid"
                  label="Liquid"
                  :rules="rules.liquid"
                ></v-select>

                <!-- FIELD PROTEIN -->
                <v-select
                  outlined
                  :items="proteins"
                  item-value="_id"
                  item-text="name"
                  v-model="smoothie.protein"
                  :rules="rules.protein"
                  label="Protein"
                ></v-select>

                <!-- FIELD TASTE -->
                <v-col cols="4 p-0">
                  <v-text-field
                    class="col-md-4"
                    outlined
                    label="Taste"
                    type="number"
                    :rules="rules.taste"
                    v-model="smoothie.taste"
                  ></v-text-field>
                </v-col>

                <!-- SUBMIT BUTTON -->
                <div class="row justify-center py-0">
                  <v-btn type="submit" large :disabled="disabledSubmitButton"
                    color="primary" class="mb-4" outlined>
                    Save it!
                  </v-btn>
                </div>
              </v-form>
            </div>
          </v-card>

        </v-col>
      </v-row>

    </v-container>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Header from '@/components/Header';
import GoBackLink from '@/components/GoBackLink';

class Smoothie {
  name = '';
  fruits = [''];
  liquid = '';
  protein = '';
  taste = 0;
}

export default {
  name: 'CreateSmoothie',
  components: { Header, GoBackLink },
  
  data(){
    return {
      smoothie: new Smoothie(),
      valid: false,
      rules: {
        name: [
          v => !!v || 'Name is required',
        ],
        fruit: [
          v =>  !!v || 'Select Fruit'
        ],
        liquid: [
          v =>  !!v || 'Select Liquid'
        ],
        protein: [
          v =>  !!v || 'Select Protein'
        ],
        taste: [
          v => (v !== "" ) || 'Taste Required',
          v =>  (parseInt(v) >= 0) || 'Minimum 0',
          v => (parseInt(v) <= 100) || 'Maximun 100'
        ],
      }
    }
  },

  computed: {
    ...mapState(['fruits', 'liquids', 'proteins', 'loading']),
    
    disabledAddFruit() {
      let index = 0;
      
      const countFruits = this.smoothie.fruits.length;
      if(countFruits > 0)
        index = countFruits - 1;

      if(!this.smoothie.fruits[index])
        return true;

      return false;
    },

    disabledSubmitButton() {
      let valid = false;
      if(!this.valid || this.loading)
        valid = true;        
      return valid;
    }
  },

  methods: {
    ...mapActions([
      'getAllFruits', 'getAllLiquids', 
      'getAllProteins', 'createSmoothie'
    ]),
    
    addFruit() {
      this.smoothie.fruits.push('');
    },

    removeFruit(indexToDelete) {
      const fruitFiltered = this.smoothie.fruits.filter((item, index) => index !== indexToDelete);
      this.smoothie.fruits = fruitFiltered;
    },
    
    submitSmoothie() {
      if(this.$refs.form.validate()) {
        this.createSmoothie(this.smoothie).then(() => {
          this.$refs.form.reset();
          this.$router.push('/');
        });
      }
    }

  },

  mounted() {
    this.getAllFruits();
    this.getAllLiquids();
    this.getAllProteins();
  },
  
}
</script>

<style scoped>
  .create-smoothie {
    background-image: url('../assets/prepare-smoothie.jpg');
    height: 100%;
  }

  .p-0 {
    padding: 0px !important;
  }

</style>