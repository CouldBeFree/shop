<template>
  <div
    :style="{'margin-left': `${depth * 20}px`}"
  >
    <no-ssr>
      <draggable
        v-bind="dragOptions"
        :list="list"
        :value="value"
        @input="emitter"
        :ghostClass="'ghost'"
      >
        <transition-group type="transition" name="flip-list">
          <div
            v-for="el in realValue"
            :key="el.Id"
            class="node"
          >
          <span @mouseover="onHover(el.Id)" @mouseleave="onHover()">
            <v-icon>mdi-drag</v-icon>
            <span>{{el.Title}}</span>
            <span class="ml-2" v-if="currentId(el.Id) === hoveredId">
              <v-icon small @click="onEdit(el.Title, el.Id)">mdi-pencil</v-icon>
            </span>
            <span class="ml-2" v-if="currentId(el.Id) === hoveredId">
              <v-icon @click.prevent="onDeleteClick(el)" small>mdi-delete</v-icon>
            </span>
          </span>
            <tree-view
              :list="el.children"
              :key="el.Id"
              :depth="depth + 1"
              @input="testHandler"
            >
            </tree-view>
          </div>
        </transition-group>
      </draggable>
    </no-ssr>
    <edit-dialog
      v-model="isOpen"
      :title="title"
      @data="onTextChanged"
    >
    </edit-dialog>
  </div>
</template>

<script>
  import EditDialog from './editDialog.vue';

  export default {
    name: "tree-view",
    data(){
      return {
        hoveredId: '',
        isOpen: false,
        title: '',
        titleId: ''
      }
    },
    components: {
      EditDialog
    },
    props: {
      value: {
        required: false,
        type: Array,
        default: null
      },
      depth: {
        type: Number,
        default: 0
      },
      list: {
        required: false,
        type: Array,
        default: null
      }
    },
    computed: {
      dragOptions() {
        return {
          animation: 0,
          group: "description",
          disabled: false,
          ghostClass: "ghost"
        };
      },
      realValue() {
        if(this.value){
          return JSON.parse(JSON.stringify(this.value))
        } else {
          return JSON.parse(JSON.stringify(this.list))
        }
      }
    },
    methods: {
      testHandler(val){
        console.log(arguments);
        //console.log(val);
        // const list = [...this.list];

        // this.$emit('input', list);
      },
      emitter(value){
        console.log(arguments);
        this.$emit("input", value);
      },
      onEdit(title, id){
        this.title = title;
        this.titleId = id;
        this.isOpen = true;
      },
      onHover(id){
        this.hoveredId = id;
      },
      currentId(id){
        return id
      },
      onDeleteClick(item){
        const index = this.realValue.indexOf(item);
        this.realValue.splice(index, 1);
      },
      onTextChanged(val){
        this.title = val;
        const arr = this.realValue;
        for (let i in arr) {
          if (arr[i].Id === this.titleId) {
            arr[i].Title = val;
            break;
          }
        }
      }
    }
  }
</script>

<style scoped>
  i{
    vertical-align:middle
  }

  .node{
    font-size: 18px;
    cursor: pointer;
  }

  .flip-list-move {
    transition: transform 0.5s;
  }

  .no-move {
    transition: transform 0s;
  }

  .ghost {
    opacity: 0.5;
    background: transparent;
  }
</style>
