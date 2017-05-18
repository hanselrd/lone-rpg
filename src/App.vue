<template>
  <div>
    <app-header></app-header>
    <div class="container">
      <router-view v-show="true"></router-view>
    </div>
    <app-footer></app-footer>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import Header from "@/components/Header";
  import Footer from "@/components/Footer";

  @Component({
    components: {
      "app-header": Header,
      "app-footer": Footer,
    },
  })
  export default class App extends Vue {}
</script>

<style scoped>
  .container {
    padding: 3rem 1.5rem;
  }
</style>
