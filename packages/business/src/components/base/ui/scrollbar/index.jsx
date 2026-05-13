import { addResizeListener, removeResizeListener } from '../util/resize-events'
import scrollbarWidth from '../util/scrollbar-width'
import { toObject } from '../util'
import Bar from './bar'

export default {
  name: 'BaseScrollbar',

  components: { Bar },

  props: {
    native: Boolean,
    wrapStyle: {},
    wrapClass: {},
    viewClass: {},
    viewStyle: {},
    noresize: Boolean,
    tag: {
      type: String,
      default: 'div'
    },
    duration: {
      type: Number,
      default: 1000
    },
    enableCalc: {
      type: Boolean,
      default: true
    },
    alone: {
      type: Boolean,
      default: false
    },
    offsetBottom: {
      type: Number,
      default: 0
    }
  },

  data() {
    return {
      sizeWidth: '0',
      sizeHeight: '0',
      moveX: 0,
      moveY: 0
    }
  },

  computed: {
    wrap() {
      return this.$refs.wrap
    }
  },

  render(h) {
    let gutter = scrollbarWidth()
    let style = this.wrapStyle

    if (gutter) {
      const gutterWith = `-${gutter}px`
      const gutterStyle = `margin-bottom: 0; margin-right: ${gutterWith};`

      if (Array.isArray(this.wrapStyle)) {
        style = toObject(this.wrapStyle)
        style.marginRight = style.marginBottom = gutterWith
      } else if (typeof this.wrapStyle === 'string') {
        style += gutterStyle
      } else {
        style = gutterStyle
      }
    }
    const view = h(this.tag, {
      class: ['base-scrollbar__view', this.viewClass],
      style: this.viewStyle,
      ref: 'resize'
    }, this.$slots.default)
    const wrap = (
      <div
        ref="wrap"
        style={ style }
        onScroll={ this.handleScroll }
        class={ [this.wrapClass, 'base-scrollbar__wrap', gutter ? '' : 'base-scrollbar__wrap--hidden-default'] }>
        { [view] }
      </div>
    )
    let nodes

    if (!this.native) {
      nodes = ([
        wrap,
        <Bar
          move={ this.moveX }
          size={ this.sizeWidth }></Bar>,
        <Bar
          vertical
          move={ this.moveY }
          size={ this.sizeHeight }></Bar>
      ])
    } else {
      nodes = ([
        <div
          ref="wrap"
          class={ [this.wrapClass, 'base-scrollbar__wrap'] }
          style={ style }>
          { [view] }
        </div>
      ])
    }
    return h('div', { class: 'base-scrollbar' }, nodes)
  },

  methods: {
    handleScroll () {
      const wrap = this.wrap

      this.moveY = ((wrap.scrollTop * 100) / wrap.clientHeight)
      this.moveX = ((wrap.scrollLeft * 100) / wrap.clientWidth)

      if (this.enableCalc) {
        let isMovedToBottom = wrap.scrollTop + wrap.clientHeight >= wrap.scrollHeight - 10 - this.offsetBottom
        this.$emit('on-scroll', wrap.scrollTop, isMovedToBottom)
      }

    },

    easing(t, b, c, d) {
      return c * (-Math.pow(2, -10 * t / d) + 1) * 1024 / 1023 + b
    },
    scrollTo(offsetTop, smooth, duration) {
      if (smooth) {
        let startTop = this.wrap.scrollTop
        let startTimestamp
        let scroll = (timestamp) => {
          if (!startTimestamp) startTimestamp = timestamp
          let progress = timestamp - startTimestamp
          let step
          if (offsetTop > startTop) {
            step = this.easing(progress, startTop, offsetTop, duration ? duration : this.duration)
            this.wrap.scrollTop = step >= offsetTop ? offsetTop : step.toFixed(0)
          } else {
            step = this.easing(progress, offsetTop, startTop, duration ? duration : this.duration)
            this.wrap.scrollTop = (startTop - step).toFixed(0) <= offsetTop ? offsetTop : (startTop - step).toFixed(0)
          }
          if (progress < (duration ? duration : this.duration)) {
            timer = requestAnimationFrame(scroll)
          } else {
            cancelAnimationFrame(timer)
          }
        }
        let timer
        if (timer) {
          cancelAnimationFrame(timer)
        }
        timer = requestAnimationFrame(scroll)
      } else {
        this.wrap.scrollTop = offsetTop
      }
    },
    scrollTop(duration) {
      this.scrollTo(0, true, duration)
    },
    scrollBottom() {
      this.scrollTo(this.wrap.scrollHeight, true)
    },
    scrollBottomStrict() {
      this.scrollTo(this.wrap.scrollHeight, false)
    },
    update() {
      let heightPercentage, widthPercentage
      const wrap = this.wrap
      if (!wrap) return

      heightPercentage = (wrap.clientHeight * 100 / wrap.scrollHeight)
      widthPercentage = (wrap.clientWidth * 100 / wrap.scrollWidth)

      this.sizeHeight = (heightPercentage < 100) ? (heightPercentage + '%') : ''
      this.sizeWidth = (widthPercentage < 100) ? (widthPercentage + '%') : ''
    }
  },

  mounted() {
    if (this.native) return
    this.$nextTick(this.update)
    !this.noresize && addResizeListener(this.$refs.resize, this.update)
  },

  beforeDestroy() {
    if (this.native) return
    !this.noresize && removeResizeListener(this.$refs.resize, this.update)
  }
}
