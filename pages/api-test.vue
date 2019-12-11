<template>
  <div>
    <h1>Api test</h1>
    <v-form>
      <v-text-field
        label="Enter url"
        v-model="url"
      >
      </v-text-field>
      <div>{{url}}</div>
      <v-btn @click="getData" :loading="loading" color="warning">Run test</v-btn>
    </v-form>
    <span v-if="models.length">Model count {{models.length}}</span>
    <v-card class="mt-5" v-if="models.length" v-for="model in models">
      {{model}}
    </v-card>
  </div>
</template>

<script>
  export default {
    name: "api-test",
    data(){
      return{
        url: '',
        loading: false,
        models: []
      }
    },
    methods: {
      async getData(){
        this.loading = true;
        const { data } = await this.$axios.get(this.url);
        this.models = data;
        console.log(data);
        this.loading = false;
      }
    }
  }
</script>

<style scoped>

</style>
