<template>
  <transition name="base-slide-y" @after-leave="doDestroy">
    <ul class="base-dropdown-menu base-popper" :class="[size && `base-dropdown-menu--${size}`]" v-show="showPopper">
      <slot></slot>
    </ul>
  </transition>
</template>
<script>
  import Popper from '../util/vue-popper'

  export default {
    name: 'BaseDropdownMenu',

    componentName: 'BaseDropdownMenu',

    mixins: [Popper],

    props: {
      visibleArrow: {
        type: Boolean,
        default: true
      },
      arrowOffset: {
        type: Number,
        default: 0
      }
    },

    data() {
      return {
        size: this.dropdown.dropdownSize
      }
    },

    inject: ['dropdown'],

    created() {
      this.$on('updatePopper', () => {
        if (this.showPopper) this.updatePopper()
      })
      this.$on('visible', val => {
        this.showPopper = val
      })
    },

    mounted() {
      this.dropdown.popperElm = this.popperElm = this.$el
      this.referenceElm = this.dropdown.$el
      // compatible with 2.6 new v-slot syntax
      // issue link https://github.com/ElemeFE/element/issues/14345
      this.dropdown.initDomOperation()
    },

    watch: {
      'dropdown.placement': {
        immediate: true,
        handler(val) {
          this.currentPlacement = val
        }
      }
    }
  }
</script>
