<script lang="jsx"  type="text/jsx">
  export default {
    name: 'BaseTag',
    props: {
      text: String,
      closable: Boolean,
      type: String,
      hit: Boolean,
      disableTransitions: Boolean,
      color: String,
      size: String,
      round: Boolean,
      effect: {
        type: String,
        default: 'light',
        validator(val) {
          return ['dark', 'light', 'plain'].indexOf(val) !== -1
        }
      }
    },
    methods: {
      handleClose(event) {
        event.stopPropagation()
        this.$emit('close', event)
      },
      handleClick(event) {
        this.$emit('click', event)
      }
    },
    computed: {
      tagSize() {
        return this.size || (this.$ELEMENT || {}).size
      }
    },
    render(h) {
      const { type, tagSize, hit, effect, round } = this
      const classes = [
        'base-tag',
        type ? `base-tag--${type}` : '',
        tagSize ? `base-tag--${tagSize}` : '',
        effect ? `base-tag--${effect}` : '',
        hit && 'is-hit',
        round && 'is-round',
      ]
      const tagBase = (
        <span
          class={ classes }
          style={{ backgroundColor: this.color }}
          on-click={ this.handleClick }>
          { this.$slots.default }
          {
            this.closable && <i class="base-tag__close base-icon-close" on-click={ this.handleClose }></i>
          }
        </span>
      )

      return this.disableTransitions ? tagBase : <transition name="base-zoom-in-center">{ tagBase }</transition>
    }
  }
</script>
