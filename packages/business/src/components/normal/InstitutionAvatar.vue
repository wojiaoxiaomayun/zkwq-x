<template>
  <span :style="{ width: size + 'px', 'min-width': size + 'px', height: size + 'px', 'border-radius': size > 34 ? '4px' : '2px' }" style="overflow: hidden;display: block;">
    <img v-if="url" class="Avatar" :class="{'Avatar--round' : round, 'Avatar--large': size > 34, 'Avatar--pointer' : pointer}" :width="size" :height="size" :src="url">
    <img v-else-if="size <= 34" class="Avatar" :class="{'Avatar--pointer' : pointer}" :width="size" :height="size" src="../../static/institution_avatar_placeholder.png">
    <img v-else class="Avatar Avatar--large" :class="{'Avatar--pointer' : pointer}" :width="size" :height="size" src="../../static/institution_avatar_placeholder.png">
  </span>
</template>

<script>
export default {
  name: 'InstitutionAvatar',
  props: {
    url: null,
    size: 0,
    round: {
      type: Boolean,
      default: false
    },
    pointer: {
      type: Boolean,
      default: true
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "../base/ui/style/var";
  .Avatar {
    background: $--color-white;
    border-radius: 2px;
    object-fit: cover;
  }
  .Avatar--pointer {
    cursor: pointer;
  }
  .Avatar--large {
    border-radius: $--border-radius-base;
  }
  .Avatar--round {
    border-radius: 50%;
  }
</style>
