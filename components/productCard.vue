<template>
  <v-card>
    <v-card-title :class="{ blur: loading }">{{title}}</v-card-title>
    <nuxt-link :to="`product/${productId}`" exact>
      <v-img
        height="250"
        :src="`https://picsum.photos/200/300?random=${index}`"
      ></v-img>
    </nuxt-link>
  </v-card>
</template>

<script>
  export default {
    name: "productCard",
    props: ['url', 'title', 'index', 'loading'],
    computed: {
      productId(){
        return this.url.match(/\d+$/)
      }
    }
  }

</script>

<style scoped>
  .blur{
    color: transparent;
    text-shadow: 0 0 5px rgba(0,0,0,0.5);
  }
</style>
