<template>
  <base-dialog :visible.sync="dialogVisible" :width="isMobileClient ? '100%' : width" :top="top" class="AppDialog__wrapper" :show-close="false" :modal-class="modalClass" :custom-class="_customClass" :append-to-body="appendToBody" :close-on-click-modal="!staticDialog" :close-on-press-escape="!staticDialog" :destroy-on-close="destroyOnClose">
    <base-scrollbar ref="dialogScrollbar" class="App__scroll" @on-scroll="handleOnScroll">
      <div class="AppDialog__inner">
        <h3 class="AppDialog__title" v-if="!originTitle && dialogTitle">{{ dialogTitle }}</h3>
        <h3 class="AppDialog__title--left" v-if="originTitle && dialogTitle">{{ dialogTitle }}</h3>
        <div class="AppDialog__subtitle" v-if="!originTitle && dialogSubtitle" v-html="dialogSubtitle"></div>
        <div class="AppDialog__subtitle--left" v-if="originTitle && dialogSubtitle" v-html="dialogSubtitle"></div>
        <div class="AppDialog__content">
          <slot></slot>
        </div>
      </div>
    </base-scrollbar>
    <button type="button" class="Button Button--plain Modal__closeButton" @click="hideDialogAuto" v-if="!hideCloseButton"><svg class="Zi Zi--Close Modal__closeIcon" fill="currentColor" viewBox="0 0 24 24" width="24" height="24"><path d="M13.486 12l5.208-5.207a1.048 1.048 0 0 0-.006-1.483 1.046 1.046 0 0 0-1.482-.005L12 10.514 6.793 5.305a1.048 1.048 0 0 0-1.483.005 1.046 1.046 0 0 0-.005 1.483L10.514 12l-5.208 5.207a1.048 1.048 0 0 0 .006 1.483 1.046 1.046 0 0 0 1.482.005L12 13.486l5.207 5.208a1.048 1.048 0 0 0 1.483-.006 1.046 1.046 0 0 0 .005-1.482L13.486 12z" fill-rule="evenodd"></path></svg></button>
  </base-dialog>
</template>

<script>
import BaseDialog from '../ui/dialog/Index'
import BaseScrollbar from "../ui/scrollbar";
export default {
  name: 'AppDialog',
  components: {BaseScrollbar, BaseDialog },
  data () {
    return {
      dialogVisible: false
    }
  },
  props: {
    originTitle: {
      type: Boolean,
      default: false
    },
    dialogTitle: {
      type: String,
      default: null
    },
    dialogSubtitle: {
      type: String,
      default: null
    },
    staticDialog: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '536px'
    },
    top: {
      type: String,
      default: '15vh'
    },
    appendToBody: {
      type: Boolean,
      default: true
    },
    autoHide: {
      type: Boolean,
      default: true
    },
    hideCloseButton: {
      type: Boolean,
      default: false
    },
    fullPage: {
      type: Boolean,
      default: false
    },
    customClass: String,
    dialogClass: String,
    modalClass: String,
    destroyOnClose: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    _customClass () {
      let clazz = this.fullPage ? 'AppDialog--fullPage ' : ''
      if (this.customClass) {
        return clazz + 'AppDialog MobileDialog--fullPage ' + this.customClass
      } else {
        return clazz + 'AppDialog MobileDialog--fullPage'
      }
    }
  },
  methods: {
    hide () {
      this.dialogVisible = false
    },
    hideDialogAuto () {
      this.$emit('hide')
      if (this.autoHide) {
        this.dialogVisible = false
      }
    },
    show () {
      this.dialogVisible = true
    },
    scrollTop () {
      this.$refs.dialogScrollbar.scrollTop()
    },
    scrollBottom () {
      this.$refs.dialogScrollbar.scrollBottom()
    },
    handleOnScroll (moveY, isToBottom) {
      this.$emit('on-scroll', moveY)
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../ui/style/var";
  .AppDialog__inner {
    max-height: 100vh;
    transition: max-height .8s ease, height .8s ease;
  }
  .AppDialog__content {
    padding: 10px 20px 20px;
  }
  .AppDialog__title {
    margin-top: 40px;
    font-size: 24px;
    font-weight: 500;
    color: $--color-primary;
    text-align: center;
  }
  .AppDialog__subtitle {
    padding: 0 38px;
    margin-top: 4px;
    font-size: $--font-size-base;
    line-height: 1.5;
    color: $--color-text-secondary;
    text-align: center;
  }
  .AppDialog__title--left {
    padding: 0 20px;
    font-size: 15px;
    color: $--color-primary;
    font-weight: 600;
    height: 60px;
    line-height: 60px;
  }
  .AppDialog__subtitle--left {
    padding: 0 20px;
    font-size: $--font-size-base;
    line-height: 1;
    color: $--color-text-secondary;
    text-align: left;
  }
  @media (max-width: 576px) {
    .AppDialog__title--left {
      padding: 20px 16px 10px;
    }
    .AppDialog__subtitle--left {
      padding: 0 16px;
    }
  }
</style>
<style lang="scss">
  .AppDialog__wrapper {
    &.base-dialog__wrapper {
      display: flex;
      flex-direction: column;
      justify-content: center;
      overflow-x: hidden;
      overflow-y: auto;
    }
  }
  .AppDialog {
    max-height: 100vh;
    transition: max-height .8s ease, height .8s ease;
    &.base-dialog {
      margin-top: 0!important;
      margin-bottom: 0!important;
      .base-dialog__body {
        height: 100%;
      }
    }
    .base-dialog__header {
      padding: 0;
    }
    .base-dialog__body {
      padding: 0;
    }
  }
  .AppDialog--fullPage {
    height: 100vh;
    &.AppDialog {
      .base-dialog__body {
        height: 100%;
      }
      .AppDialog__inner {
        height: 100vh;
        overflow: visible;
      }
      .AppDialog__content {
        height: 100%;
      }
    }
  }
  .Modal__closeButton {
    position: absolute;
    top: 8px;
    right: -60px;
    padding: 12px;
  }
  .Modal__closeIcon {
    vertical-align: top;
    fill: #FFF;
  }
</style>
