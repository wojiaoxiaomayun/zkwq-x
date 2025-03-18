<template>
  <span class="SmoothNumber">{{ formatZero ? (number === 0 ? formatZero : formatDisplayNumber(number)) : formatDisplayNumber(number) }}</span>
</template>
<script>
import { formatNumber } from '../../../util/index'
export default {
  name: 'SmoothNumber',
  data () {
    return {
      number: 0
    }
  },
  props: {
    value: 0,
    duration: {
      type: Number,
      default: 1000
    },
    formatZero: {
      type: String,
      default: null
    }
  },
  computed: {
    smoothNumber: function () {
      return this.value
    }
  },
  watch: {
    smoothNumber: {
      handler: function (newValue) {
        this.countSmooth(newValue)
      }
    }
  },
  methods: {
    countSmooth (number) {
      let start = null
      let count = (timestamp) => {
        if (!start) start = timestamp
        let progress = timestamp - start
        let step = this.easing(progress, 0, number, this.duration)
        this.number = step >= number ? number : step.toFixed(0)
        if (progress < this.duration) {
          timer = requestAnimationFrame(count)
        } else {
          cancelAnimationFrame(timer)
        }
      }
      let timer
      if (timer) {
        cancelAnimationFrame(timer)
      }
      timer = requestAnimationFrame(count)
    },
    easing (t, b, c, d) {
      return c * (-Math.pow(2, -10 * t / d) + 1) * 1024 / 1023 + b
    },
    formatDisplayNumber (value) {
      return formatNumber(value)
    }
  },
  created () {
    if (this.value > 0) {
      this.countSmooth(this.value)
    }
  }
}
</script>
