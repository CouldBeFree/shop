<template>
  <div class="list">
    <div v-for="item in items" :key="item.id" class="list-item">
      <slot name="item" :item="item" :key2="item.id"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "list",
    props: {
      items: {
        type: Array,
        default: []
      }
    }
  }
</script>

<style scoped>

</style>
