<template>
  <span v-if="data && data.length > 0">
    <template v-for="(value, index) in data">
      <span :key="value" v-if="index === data.length - 1">{{ value }}</span>
      <template v-else>
        <span :key="value">{{ value }}</span>
        <span :key="index" :class="gutter === 'large' ? 'Seperator--large' : 'Seperator'">,</span>
      </template>
    </template>
  </span>
</template>

<script>
export default {
  name: 'MultipleSpan',
  props: {
    data: Array,
    gutter: {
      type: String,
      default: 'medium'
    }
  }
}
</script>
