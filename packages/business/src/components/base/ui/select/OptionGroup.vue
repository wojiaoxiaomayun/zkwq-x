<template>
  <ul class="base-select-group__wrap" v-show="visible">
    <li class="base-select-group__title">{{ label }}</li>
    <li>
      <ul class="base-select-group">
        <slot></slot>
      </ul>
    </li>
  </ul>
</template>

<script type="text/babel">
  import Emitter from '../mixin/emitter'

  export default {
    mixins: [Emitter],

    name: 'BaseOptionGroup',

    componentName: 'BaseOptionGroup',

    props: {
      label: String,
      disabled: {
        type: Boolean,
        default: false
      }
    },

    data() {
      return {
        visible: true
      }
    },

    watch: {
      disabled(val) {
        this.broadcast('BaseOption', 'handleGroupDisabled', val)
      }
    },

    methods: {
      queryChange() {
        this.visible = this.$children &&
          Array.isArray(this.$children) &&
          this.$children.some(option => option.visible === true)
      }
    },

    created() {
      this.$on('queryChange', this.queryChange)
    },

    mounted() {
      if (this.disabled) {
        this.broadcast('BaseOption', 'handleGroupDisabled', this.disabled)
      }
    }
  }
</script>
