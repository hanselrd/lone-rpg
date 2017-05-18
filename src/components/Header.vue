<template>
  <header>
    <nav class="navbar navbar-toggleable-md navbar-inverse">
      <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <router-link class="navbar-brand" :to="{ name: 'home' }">
        <span><i class="fa fa-leaf"></i> Lone RPG</span>
      </router-link>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item" :class="{ active: $route.name === 'home' }">
            <router-link class="nav-link" :to="{ name: 'home' }">Home</router-link>
          </li>
          <li class="nav-item" :class="{ active: $route.name === 'login' }">
            <router-link  class="nav-link" :to="{ name: 'login' }">Login</router-link>
          </li>
          <li class="nav-item" :class="{ active: $route.name === 'register' }">
            <router-link  class="nav-link" :to="{ name: 'register' }">Register</router-link>
          </li>
        </ul>
        <ul class="navbar-nav ml-auto">
          <li class="nav-item dropdown">
            <router-link class="nav-link dropdown-toggle" :to="$route.path" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              User
            </router-link>
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
              <router-link class="dropdown-item" to="#">Profile</router-link>
              <router-link class="dropdown-item" to="#">Settings</router-link>
              <router-link class="dropdown-item" to="#">Logout</router-link>
            </div>
          </li>
        </ul>
      </div>
    </nav>
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

<style scoped>
  .navbar {
    background-color: maroon;
  }

  .dropdown-menu a:hover {
    background-color: maroon;
    color: white;
  }
</style>
