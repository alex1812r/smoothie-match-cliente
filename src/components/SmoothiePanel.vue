<template>
  <div class="smoothie-panel">
    <v-expansion-panel>
      <v-expansion-panel-header expand-icon> 
        <v-row align="center" class="font-weight-bold">
          <v-col cols="7">
            <span class="mr-2 primary--text"># {{ number }}</span>
            {{ smoothie.name }}
          </v-col>
          <v-col cols="5" class="text-end">
            <span class="mr-3">
              <v-icon size="15px" class="mr-1 success--text">fas fa-heart</v-icon>
              <small>{{ calcHealthy(smoothie) }}</small>
            </span>
            <span>
              <v-icon size="15px" class="mr-1 purple--text">fas fa-blender</v-icon>
              <small>{{ smoothie.taste }}%</small>
            </span>
          </v-col>
        </v-row>
      </v-expansion-panel-header>
  
      <v-expansion-panel-content class="py-5 font-weight-bold">
        <span class="d-block mb-3" v-if="smoothie.fruits.length">
          {{ listToString(smoothie.fruits) }}
        </span>
        <span class="d-block mb-3">
          {{ smoothie.liquid.name }}
        </span>
        <span class="d-block">
          {{ smoothie.protein.name }}
        </span>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </div>
</template>

<script>
export default {
  name: 'SmoothiePanel',
  props: {
    smoothie: {
      type: Object,
      required: true
    }, 
    number: {
      type: Number,
      default: 0
    }
  },
  methods: {
    calcHealthy(smoothie) {
      let healthy = 0;
      smoothie.fruits.forEach(fruit => healthy += fruit.value);
      healthy += smoothie.liquid.value;
      return healthy;
    },
    
    listToString(list) {
      let listString = '';
      list.forEach((item, i) => {
        if(i + 1 < list.length)
          listString += `${item.name}, `;
        else
          listString += item.name;
      })
      return listString;
    }
  },
}
</script>