<template>
  <v-row >
    <v-col cols="12" sm="12" align="center">
      <h1>{{product.name}}</h1>
      <h3>Price {{product.price}} $</h3>
      <v-img
        :src='`https://picsum.photos/id/${$route.params.id}/500/300`'
        aspect-ratio="1"
        class="grey lighten-2 mb-4"
        max-width="500"
        max-height="300"
      ></v-img>
    </v-col>
  </v-row >
</template>

<script>
  import { mapState, mapActions, mapMutations } from 'vuex';

  export default {
    name: "product",
    async fetch ({ store, route }) {
      await store.dispatch('common/getProduct', route.params.id)
    },
    computed: {
      ...mapState('common', {
        product: state => state.product
      })
    }
  }
</script>

<style scoped>

</style>
