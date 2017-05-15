<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <router-link to="/">Home</router-link>
    <router-link to="/game">Game</router-link>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";

  @Component({})
  export default class Header extends Vue {
    public msg: string = "Header message";
  }
</script>

<style lang="scss" scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
