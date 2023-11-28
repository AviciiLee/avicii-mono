<template>
  <div class="el-row">
    <avicii-button>按钮1</avicii-button>
    <avicii-button type="primary">按钮2</avicii-button>
    <avicii-button type="success">按钮1</avicii-button>
    <avicii-button type="warning">按钮2</avicii-button>
    <avicii-button type="danger">按钮3</avicii-button>
  </div>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from './components/HelloWorld.vue';

@Options({
  components: {
    HelloWorld,
  },
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
