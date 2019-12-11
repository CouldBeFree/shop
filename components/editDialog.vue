<template>
  <v-row justify="center">
    <v-dialog :value="value" scrollable max-width="300px">
      <v-card>
        <v-card-title>Edit</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 100px;">
          <v-text-field
            :value="title"
            @input="onChange"
            required
          ></v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="$emit('input', false)">Close</v-btn>
          <v-btn color="blue darken-1" text @click="onSave">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  export default {
    name: "editDialog",
    props: ['value', 'title'],
    data(){
      return{
        text: ''
      }
    },
    methods: {
      onSave(){
        this.$emit('data', this.text);
        this.$emit('input', false);
      },
      onChange(val){
        this.text = val;
      }
    },
    mounted() {

    }
  }
</script>

<style scoped>

</style>
