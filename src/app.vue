<template>
  <div id="app" class="container">
    <app-header></app-header>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
  import "bootstrap/dist/css/bootstrap.css";
  import "bootstrap-vue/dist/bootstrap-vue.css";

  import Vue from "vue";
  import Component from "vue-class-component";
  import Header from "@/components/header";

  @Component({
    components: {
      "app-header": Header,
    },
  })
  export default class App extends Vue {}
</script>
