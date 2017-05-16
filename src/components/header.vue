<template>
  <header>
    <b-alert variant="success" show>
      <h4>{{msg}}</h4>
      <p>Paragraph test 1</p>
      <p class="mb-0">Paragraph test 2</p>
    </b-alert>
    <ul class="nav nav-pills nav-fill">
      <li class="nav-item">
        <router-link class="nav-link" :class="{ active: $route.path === '/' }" to="/">Home</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" :class="{ active: $route.path === '/game' }" to="/game">Game</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link disabled" to="#">Login</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link disabled" to="#">Register</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link disabled" to="#">Settings</router-link>
      </li>
    </ul>
  </header>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";

  @Component({})
  export default class Header extends Vue {
    public msg: string = "Header message";
  }
</script>
