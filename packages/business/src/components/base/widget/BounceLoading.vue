<template>
  <div class="BounceLoading" style="width: 60px; height: 18px;">
    <span class="BounceLoading__child" style="top: 6px; left: 0px; width: 6px; height: 6px; animation-duration: 0.8s; animation-delay: 0s;"></span>
    <span class="BounceLoading__child" style="top: 6px; left: 18px; width: 6px; height: 6px; animation-duration: 0.8s; animation-delay: -0.1s;"></span>
    <span class="BounceLoading__child" style="top: 6px; left: 36px; width: 6px; height: 6px; animation-duration: 0.8s; animation-delay: -0.2s;"></span>
    <span class="BounceLoading__child" style="top: 6px; left: 54px; width: 6px; height: 6px; animation-duration: 0.8s; animation-delay: -0.3s;"></span>
  </div>
</template>

<script>
export default {
  name: 'BounceLoading'
}
</script>
<style lang="scss" scoped>
  @import '../ui/style/var';
  .BounceLoading {
    position: relative
  }
  .BounceLoading .BounceLoading__child {
    position: absolute;
    background-color: $--color-primary;
    border-radius: 50%;
    -webkit-transform-origin: center;
    transform-origin: center;
    -webkit-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
    -webkit-animation-name: Bounce;
    animation-name: Bounce;
    -webkit-animation-timing-function: ease-in-out;
    animation-timing-function: ease-in-out;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both
  }
</style>
