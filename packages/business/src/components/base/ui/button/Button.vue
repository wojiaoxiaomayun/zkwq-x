<template>
  <button
    v-ripple="enableRipple"
    class="base-button"
    @click="handleClick"
    :disabled="buttonDisabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
    :class="[
      type ? 'base-button--' + type : '',
      buttonSize ? 'base-button--' + buttonSize : '',
      {
        'is-disabled': buttonDisabled,
        'is-loading': loading,
        'is-plain': plain,
        'is-round': round,
        'is-circle': circle,
        'is-light': light
      }
    ]"
  >
    <span v-if="loading"><i class="base-icon-loading" ></i></span>
    <span v-if="icon && !loading"><i :class="icon"></i></span>
    <span v-if="$slots.default"><slot></slot></span>
  </button>
</template>
<script>
import Ripple from '../directive/ripple'
export default {
  name: 'BaseButton',
  directives: {
    Ripple
  },
  inject: {
    baseForm: {
      default: ''
    },
    baseFormItem: {
      default: ''
    }
  },
  props: {
    type: {
      type: String,
      default: 'default'
    },
    size: String,
    icon: {
      type: String,
      default: ''
    },
    nativeType: {
      type: String,
      default: 'button'
    },
    loading: Boolean,
    disabled: Boolean,
    plain: Boolean,
    autofocus: Boolean,
    round: Boolean,
    circle: Boolean,
    light: Boolean
  },
  computed: {
    _baseFormItemSize () {
      return (this.baseFormItem || {}).baseFormItemSize
    },
    buttonSize () {
      return this.size || this._baseFormItemSize || (this.$ELEMENT || {}).size
    },
    buttonDisabled () {
      return this.disabled || (this.baseForm || {}).disabled
    },
    enableRipple () {
      return !this.disabled && this.type !== 'text'
    }
  },
  methods: {
    handleClick (evt) {
      this.$emit('click', evt)
    }
  }
}
</script>
