<template>
  <div>
    <h1>Drag</h1>
    <tree-view
      v-model="elements"
    ></tree-view>
  </div>
</template>

<script>
  import TreeView from "../components/TreeView";

  import { mapState, mapMutations } from 'vuex';
  export default {
    name: "drag",
    components: {
      TreeView
    },
    methods: {
      ...mapMutations('common', ['setMenu']),
      onDataChange(val){
        this.setMenu(val);
      },
      handleClick (val) {
        this.$emit('input', val);
      }
    },
    computed: {
      ...mapState({
        menu: state => state.common.menu
      }),
      elements: {
        get() {
          return this.$store.state.common.menu;
        },
        set(value) {
          this.setMenu(value);
        }
      }
    }
  }
</script>

<style scoped>

</style>
