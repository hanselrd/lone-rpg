<template>
  <div class="container">
    <app-header></app-header>
    <router-view></router-view>
    <app-footer></app-footer>
  </div>
</template>

<script lang="ts">
  import "bootstrap/dist/css/bootstrap.css";
  import "bootstrap-vue/dist/bootstrap-vue.css";

  import Vue from "vue";
  import Component from "vue-class-component";
  import Header from "@/components/header";
  import Footer from "@/components/footer";

  @Component({
    components: {
      "app-header": Header,
      "app-footer": Footer,
    },
  })
  export default class App extends Vue {}
</script>
