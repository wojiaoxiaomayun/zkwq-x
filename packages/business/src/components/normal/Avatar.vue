<template>
  <span :style="{ width: size + 'px', 'min-width': size + 'px', height: size + 'px', 'border-radius': size > 34 ? '4px' : '2px' }" style="overflow: hidden;display: block;">
    <img v-if="url" class="Avatar" :class="{'Avatar--round' : round, 'Avatar--large': size > 34, 'Avatar--pointer' : pointer}" :width="size" :height="size" :src="url">
    <template v-if="!url && size <= 34">
      <svg v-if="round"  class="Avatar" :class="{'Avatar--pointer' : pointer}" viewBox="0 0 1035 1024" :width="size" :height="size"><path class="Avatar__outer" d="M517.12 1019.904c-280.576 0-507.904-227.328-507.904-507.904C9.216 231.424 236.544 4.096 517.12 4.096c280.576 0 507.904 227.328 507.904 507.904 0 280.576-227.328 507.904-507.904 507.904z"></path><path d="M287.232 429.056c0 126.464 102.912 229.376 229.376 229.376 126.464 0 229.376-102.912 229.376-229.376 0-126.464-102.912-229.376-229.376-229.376-126.464-0.512-229.376 102.4-229.376 229.376zM891.904 854.528c-32.768-67.584-90.112-140.288-190.464-190.976-51.2 40.448-115.2 64.512-184.832 64.512-69.632 0-133.12-24.064-184.32-64-99.328 51.2-156.672 123.904-190.464 191.488 92.672 101.376 226.304 164.352 374.272 164.352 148.992 0 283.136-64 375.808-165.376z" class="Avatar__inner"></path></svg>
      <svg v-else class="Avatar" :class="{'Avatar--pointer' : pointer}" viewBox="0 0 1035 1024" :width="size" :height="size"><path d="M8.704 2.048h1015.808v1015.808H8.704z" class="Avatar__outer"></path><path d="M287.232 427.008c0-126.464 102.912-229.376 229.376-229.376 126.464 0 229.376 102.912 229.376 229.376 0 126.464-102.912 229.376-229.376 229.376-126.464 0-229.376-102.912-229.376-229.376zM96.256 1019.392c5.12-55.296 31.744-252.416 236.544-357.376 50.688 39.936 114.688 64 184.32 64 69.632 0 134.144-24.064 184.832-64.512 205.824 104.96 230.4 300.032 235.52 358.4-1.536 1.024-840.192-0.512-841.216-0.512z" class="Avatar__inner"></path></svg>
    </template>
    <template v-if="!url && size > 34">
      <svg v-if="round"  class="Avatar Avatar--large" :class="{'Avatar--pointer' : pointer}" viewBox="0 0 1035 1024" :width="size" :height="size"><path class="Avatar__outer" d="M517.12 1019.904c-280.576 0-507.904-227.328-507.904-507.904C9.216 231.424 236.544 4.096 517.12 4.096c280.576 0 507.904 227.328 507.904 507.904 0 280.576-227.328 507.904-507.904 507.904z"></path><path d="M287.232 429.056c0 126.464 102.912 229.376 229.376 229.376 126.464 0 229.376-102.912 229.376-229.376 0-126.464-102.912-229.376-229.376-229.376-126.464-0.512-229.376 102.4-229.376 229.376zM891.904 854.528c-32.768-67.584-90.112-140.288-190.464-190.976-51.2 40.448-115.2 64.512-184.832 64.512-69.632 0-133.12-24.064-184.32-64-99.328 51.2-156.672 123.904-190.464 191.488 92.672 101.376 226.304 164.352 374.272 164.352 148.992 0 283.136-64 375.808-165.376z" class="Avatar__inner"></path></svg>
      <svg v-else class="Avatar Avatar--large" :class="{'Avatar--pointer' : pointer}" viewBox="0 0 1035 1024" :width="size" :height="size"><path d="M8.704 2.048h1015.808v1015.808H8.704z" class="Avatar__outer"></path><path d="M287.232 427.008c0-126.464 102.912-229.376 229.376-229.376 126.464 0 229.376 102.912 229.376 229.376 0 126.464-102.912 229.376-229.376 229.376-126.464 0-229.376-102.912-229.376-229.376zM96.256 1019.392c5.12-55.296 31.744-252.416 236.544-357.376 50.688 39.936 114.688 64 184.32 64 69.632 0 134.144-24.064 184.832-64.512 205.824 104.96 230.4 300.032 235.52 358.4-1.536 1.024-840.192-0.512-841.216-0.512z" class="Avatar__inner"></path></svg>
    </template>
  </span>
</template>

<script>
export default {
  name: 'Avatar',
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
    background: transparent;
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
  .Avatar__outer {
    fill: $--color-primary-light-9;
  }
  .Avatar__inner {
    fill: $--color-primary;
  }
</style>
