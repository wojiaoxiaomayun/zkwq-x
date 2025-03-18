<template>
  <transition
    name="base-drawer-fade"
    @after-enter="afterEnter"
    @after-leave="afterLeave">
      <div
      class="base-drawer__wrapper"
      tabindex="-1"
      v-show="visible">
        <div
          class="base-drawer__container"
          :class="visible && 'base-drawer__open'"
          @click.self="handleWrapperClick"
          role="document"
          tabindex="-1">
            <div
              aria-modal="true"
              aria-labelledby="base-drawer__title"
              :aria-label="title"
              class="base-drawer"
              :class="[direction, customClass]"
              :style="isHorizontal ? `width: ${size}` : `height: ${size}`"
              ref="drawer"
              role="dialog"
              tabindex="-1"
            >
              <header class="base-drawer__header" id="base-drawer__title" v-if="withHeader">
                <slot name="title">
                  <span role="heading" tabindex="0">{{ title }}</span>
                </slot>
                <slot name="actions"></slot>
                <button
                  :aria-label="`close ${title || 'drawer'}`"
                  class="base-drawer__close-btn"
                  type="button"
                  v-if="showClose"
                  @click="closeDrawer">
                  <i class="base-dialog__close base-icon base-icon-close"></i>
                </button>
              </header>
              <base-scrollbar class="App__scroll">
                  <section class="base-drawer__body" v-if="rendered">
                    <slot></slot>
                  </section>
                </base-scrollbar>
            </div>
        </div>
     </div>
  </transition>
</template>

<script>
import Popup from '../util/popup'
import emitter from '../mixin/emitter'
import Utils from '../util/aria-utils'
import BaseScrollbar from '../scrollbar'
export default {
  name: 'BaseDrawer',
  components: {BaseScrollbar},
  mixins: [Popup, emitter],
  props: {
    appendToBody: {
      type: Boolean,
      default: false
    },
    beforeClose: {
      type: Function
    },
    customClass: {
      type: String,
      default: ''
    },
    closeOnPressEscape: {
      type: Boolean,
      default: true
    },
    destroyOnClose: {
      type: Boolean,
      default: false
    },
    modal: {
      type: Boolean,
      default: true
    },
    direction: {
      type: String,
      default: 'rtl',
      validator(val) {
        return ['ltr', 'rtl', 'ttb', 'btt'].indexOf(val) !== -1
      }
    },
    modalAppendToBody: {
      type: Boolean,
      default: true
    },
    showClose: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: '30%'
    },
    title: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean
    },
    wrapperClosable: {
      type: Boolean,
      default: true
    },
    withHeader: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    isHorizontal () {
      return this.direction === 'rtl' || this.direction === 'ltr'
    }
  },
  data () {
    return {
      closed: false,
      prevActiveElement: null
    }
  },
  watch: {
    visible (val) {
      if (val) {
        this.closed = false
        this.$emit('open')
        if (this.appendToBody) {
          document.body.appendChild(this.$el)
        }
        this.prevActiveElement = document.activeElement
        this.$nextTick(() => {
          Utils.focusFirstDescendant(this.$refs.drawer)
        })
      } else {
        if (!this.closed) this.$emit('close')
        this.$nextTick(() => {
          if (this.prevActiveElement) {
            this.prevActiveElement.focus()
          }
        })
      }
    }
  },
  methods: {
    afterEnter () {
      this.$emit('opened')
    },
    afterLeave () {
      this.$emit('closed')
    },
    hide (cancel) {
      if (cancel !== false) {
        this.$emit('update:visible', false)
        this.$emit('close')
        if (this.destroyOnClose === true) {
          this.rendered = false
        }
        this.closed = true
      }
    },
    handleWrapperClick () {
      if (this.wrapperClosable) {
        this.closeDrawer()
      }
    },
    closeDrawer () {
      if (typeof this.beforeClose === 'function') {
        this.beforeClose(this.hide)
      } else {
        this.hide()
      }
    },
    handleClose () {
      // This method here will be called by PopupManger, when the `closeOnPressEscape` was set to true
      // pressing `ESC` will call this method, and also close the drawer.
      // This method also calls `beforeClose` if there was one.
      this.closeDrawer()
    }
  },
  mounted () {
    if (this.visible) {
      this.rendered = true
      this.open()
    }
  },
  destroyed () {
    // if appendToBody is true, remove DOM node after destroy
    if (this.appendToBody && this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
  }
}
</script>
