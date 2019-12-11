<template>
  <v-app>
    <v-content>
      <v-container>
        <nuxt-link :to="'/'">Home</nuxt-link>
        <nuxt-link :to="'/api-test'">Api test</nuxt-link>
        <nuxt-link :to="'/drag'">Drag</nuxt-link>
        <nuxt-link :to="'/slots'">Slots</nuxt-link>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer
      app
    >
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {

    }
  }
}
</script>
