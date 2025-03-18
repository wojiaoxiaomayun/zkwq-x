<template>
  <i :class="'base-icon-' + name"></i>
</template>

<script>
  export default {
    name: 'BaseIcon',

    props: {
      name: String
    }
  };
</script>
