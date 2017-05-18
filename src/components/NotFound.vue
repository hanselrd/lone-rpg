<template>
  <div class="alert alert-danger text-center">
    <span>
      <i class="fa fa-search fa-2x"></i> Sorry, this page does not exist.
    </span>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";

  @Component({})
  export default class NotFound extends Vue {}
</script>
