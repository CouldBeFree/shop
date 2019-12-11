<template>
  <list :items="listItems">
    <template #item="{ item, key2 }" class="list-item">
      <input type="checkbox" v-model="item.completed" class="list-item__checkbox" />
      <div class="list-item__title">{{item.name}} {{key2}}</div>
    </template>
  </list>
</template>

<script>
  import list from '../components/list.vue';

  export default {
    name: "slots",
    data(){
      return{
        listItems: [
          {id: 1, name: "item 1", completed: false},
          {id: 2, name: "item 2", completed: false},
          {id: 3, name: "item 3", completed: false}
        ]
      }
    },
    components: {
      list
    }
  }
</script>

<style scoped>

</style>
