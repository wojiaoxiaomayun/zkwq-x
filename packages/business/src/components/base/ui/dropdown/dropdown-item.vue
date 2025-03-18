<template>
  <li
    class="base-dropdown-menu__item"
    :class="{
      'is-disabled': disabled,
      'base-dropdown-menu__item--divided': divided
    }"
    @click="handleClick"
    :aria-disabled="disabled"
    :tabindex="disabled ? null : -1"
    v-ripple
  >
    <i :class="icon" v-if="icon"></i>
    <slot></slot>
  </li>
</template>
<script>
import Emitter from '../mixin/emitter'
import Ripple from '../directive/ripple'
export default {
  name: 'BaseDropdownItem',
  mixins: [Emitter],
  directives: {
    Ripple
  },
  props: {
  command: {},
  disabled: Boolean,
  divided: Boolean,
  icon: String
},

  methods: {
  handleClick(e) {
    this.dispatch('BaseDropdown', 'menu-item-click', [this.command, this])
  }
}
}
</script>
