<template>
  <div class="base-collapse-item"
    :class="{'is-active': isActive, 'is-disabled': disabled }">
    <div
      role="tab"
      :aria-expanded="isActive"
      :aria-controls="`base-collapse-content-${id}`"
      :aria-describedby ="`base-collapse-content-${id}`"
    >
      <div
        class="base-collapse-item__header"
        @click="handleHeaderClick"
        role="button"
        :id="`base-collapse-head-${id}`"
        :tabindex="disabled ? undefined : 0"
        @keyup.space.enter.stop="handleEnterClick"
        :class="{
          'focusing': focusing,
          'is-active': isActive
        }"
        @focus="handleFocus"
        @blur="focusing = false"
      >
        <slot name="title">{{title}}</slot>
        <i
          class="base-collapse-item__arrow base-icon-caret-right"
          :class="{'is-active': isActive}">
        </i>
      </div>
    </div>
    <transition
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:after-enter="afterEnter"
      v-on:before-leave="beforeLeave"
      v-on:leave="leave"
      v-on:after-leave="afterLeave"
    >
      <div
        class="base-collapse-item__wrap"
        v-show="isActive"
        role="tabpanel"
        :aria-hidden="!isActive"
        :aria-labelledby="`base-collapse-head-${id}`"
        :id="`base-collapse-content-${id}`"
      >
        <div class="base-collapse-item__content">
          <slot></slot>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import Emitter from '../mixin/emitter'
import { generateId } from '../util/index'
import { addClass, removeClass } from '../util/dom'

export default {
  name: 'BaseCollapseItem',

  componentName: 'BaseCollapseItem',

  mixins: [Emitter],

  data() {
    return {
      contentWrapStyle: {
        height: 'auto',
        display: 'block'
      },
      contentHeight: 0,
      focusing: false,
      isClick: false,
      id: generateId()
    };
  },

  inject: ['collapse'],

  props: {
    title: String,
    name: {
      type: [String, Number],
      default() {
        return this._uid;
      }
    },
    disabled: Boolean
  },

  computed: {
    isActive() {
      return this.collapse.activeNames.indexOf(this.name) > -1;
    }
  },

  methods: {
    handleFocus() {
      setTimeout(() => {
        if (!this.isClick) {
          this.focusing = true;
        } else {
          this.isClick = false;
        }
      }, 50);
    },
    handleHeaderClick() {
      if (this.disabled) return;
      this.dispatch('BaseCollapse', 'item-click', this);
      this.focusing = false;
      this.isClick = true;
    },
    handleEnterClick() {
      this.dispatch('BaseCollapse', 'item-click', this);
    },
    beforeEnter(el) {
      addClass(el, 'collapse-transition');
      if (!el.dataset) el.dataset = {};

      el.dataset.oldPaddingTop = el.style.paddingTop;
      el.dataset.oldPaddingBottom = el.style.paddingBottom;

      el.style.height = '0';
      el.style.paddingTop = 0;
      el.style.paddingBottom = 0;
    },

    enter(el) {
      el.dataset.oldOverflow = el.style.overflow;
      if (el.scrollHeight !== 0) {
        el.style.height = el.scrollHeight + 'px';
        el.style.paddingTop = el.dataset.oldPaddingTop;
        el.style.paddingBottom = el.dataset.oldPaddingBottom;
      } else {
        el.style.height = '';
        el.style.paddingTop = el.dataset.oldPaddingTop;
        el.style.paddingBottom = el.dataset.oldPaddingBottom;
      }

      el.style.overflow = 'hidden';
    },

    afterEnter(el) {
      // for safari: remove class then reset height is necessary
      removeClass(el, 'collapse-transition');
      el.style.height = '';
      el.style.overflow = el.dataset.oldOverflow;
    },

    beforeLeave(el) {
      if (!el.dataset) el.dataset = {};
      el.dataset.oldPaddingTop = el.style.paddingTop;
      el.dataset.oldPaddingBottom = el.style.paddingBottom;
      el.dataset.oldOverflow = el.style.overflow;

      el.style.height = el.scrollHeight + 'px';
      el.style.overflow = 'hidden';
    },

    leave(el) {
      if (el.scrollHeight !== 0) {
        // for safari: add class after set height, or it will jump to zero height suddenly, weired
        addClass(el, 'collapse-transition');
        el.style.height = 0;
        el.style.paddingTop = 0;
        el.style.paddingBottom = 0;
      }
    },

    afterLeave(el) {
      removeClass(el, 'collapse-transition');
      el.style.height = '';
      el.style.overflow = el.dataset.oldOverflow;
      el.style.paddingTop = el.dataset.oldPaddingTop;
      el.style.paddingBottom = el.dataset.oldPaddingBottom;
    }
  }
}
</script>
