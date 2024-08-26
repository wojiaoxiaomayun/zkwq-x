<template>
  <div class="AppTip" :class="type ? 'AppTip--'+ type : ''">
    <div class="AppTip__wrapper">
      <i v-if="icon" class="base-icon-info"></i>
      <div class="AppTip__content">
        <slot name="content">{{ content }}</slot>
      </div>
      <div class="AppTip__border"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppTip",
  props:{
    content: String,
    icon: {
      type: Boolean,
      default: false
    },
    type: String
  }
}
</script>

<style scoped lang="scss">
  @import "../base/ui/style/var";
  .AppTip {
    display: block;
    padding: 10px 16px;
    position: relative;
    border-radius: 4px;
    background-color: #fff;
    border-color: #fff;
    color: $--color-text-regular;
    box-shadow: 0 4px 12px rgba(40, 120, 255, 0.11), 0 3px 14px rgba(0, 0, 0, 0.11);
  }
  .AppTip+.AppTip {
    margin-top: 16px;
  }
  .AppTip__wrapper {
    align-items: center;
    border-radius: inherit;
    display: flex;
    .base-icon-info {
      color: $--color-primary;
      align-self: flex-start;
      align-items: center;
      display: inline-flex;
      font-feature-settings: "liga";
      font-size: 24px;
      justify-content: center;
      letter-spacing: normal;
      line-height: 1;
      position: relative;
      text-indent: 0;
      vertical-align: middle;
      user-select: none;
      margin-right: 12px;
    }
  }
  .AppTip__content {
    flex: 1 1 auto;
    line-height: 1.5;
  }
  .AppTip__border {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    border-top-left-radius: inherit;
    border-bottom-left-radius: inherit;
    background-color: $--color-primary;
    border: 4px solid $--color-primary;
  }
  .AppTip--warning {
    .AppTip__wrapper {
      .base-icon-info {
        color: $--color-warning;
      }
    }
    .AppTip__border {
      background-color: $--color-warning;
      border-color: $--color-warning;
    }
  }
  .AppTip--danger {
    .AppTip__wrapper {
      .base-icon-info {
        color: $--color-danger;
      }
    }
    .AppTip__border {
      background-color: $--color-danger;
      border-color: $--color-danger;
    }
  }
</style>
