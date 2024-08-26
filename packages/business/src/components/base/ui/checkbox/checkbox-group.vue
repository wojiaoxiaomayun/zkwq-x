<script>
  import Emitter from '../mixin/emitter';

  export default {
    name: 'BaseCheckboxGroup',

    componentName: 'BaseCheckboxGroup',

    mixins: [Emitter],

    inject: {
      baseFormItem: {
        default: ''
      }
    },

    props: {
      value: {},
      disabled: Boolean,
      min: Number,
      max: Number,
      size: String,
      fill: String,
      textColor: String
    },

    computed: {
      _baseFormItemSize() {
        return (this.baseFormItem || {}).baseFormItemSize;
      },
      checkboxGroupSize() {
        return this.size || this._baseFormItemSize || (this.$ELEMENT || {}).size;
      }
    },

    watch: {
      value(value) {
        this.dispatch('BaseFormItem', 'base.form.change', [value]);
      }
    }
  };
</script>

<template>
  <div class="base-checkbox-group" role="group" aria-label="checkbox-group">
    <slot></slot>
  </div>
</template>
