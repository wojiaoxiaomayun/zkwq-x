<template>
  <div class="NumberBoard__container">
    <div class="NumberBoard" :class="{'NumberBoard--divider':divider}">
      <div class="NumberBoard__item" :class="{ 'HoverBoard__item' : item.is_hover_item && item.value > 0 }" v-for="item in data" :key="item.key" @click="handleClickItem(item)">
        <div class="NumberBoard__itemInner" v-if="rever">
          <strong class="NumberBoard__itemValue" :title="formatDisplayNumber(item.value)">{{ formatDisplayNumber(item.value) }}</strong>
          <div class="NumberBoard__itemName">{{ item.key }}</div>
        </div>
        <div class="NumberBoard__itemInner" v-else>
          <div class="NumberBoard__itemName">{{ item.key }}</div>
          <strong class="NumberBoard__itemValue" :title="formatDisplayNumber(item.value)">{{ formatDisplayNumber(item.value) }}</strong>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatNumber } from '../../util/index'
export default {
  name: 'AppNumberBoard',
  props: {
    data: Array,
    divider: {
      type: Boolean,
      default: true
    },
    rever: Boolean
  },
  methods: {
    handleClickItem (item) {
      if (item.is_hover_item && item.value > 0) {
        this.$emit('click', item)
      }
    },
    formatDisplayNumber (value) {
      return formatNumber(value)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../base/ui/style/var.scss';
  .NumberBoard__container {
    font-size: $--font-size-base;
    text-align: center;
  }
  .NumberBoard {
    display: flex
  }
  .NumberBoard--divider .NumberBoard__item+.NumberBoard__item .NumberBoard__itemInner {
    border-left: 1px solid $--border-color-base;
  }
  .NumberBoard__item {
    flex: 1
  }
  .NumberBoard__item.Button {
    border: 0;
    line-height: unset;
    font-size: unset
  }
  .NumberBoard__itemInner {
    text-align: center;
    line-height: 1.6
  }
  .NumberBoard__itemName {
    font-size: $--font-size-base;
    color: $--color-text-secondary;
  }
  .NumberBoard__itemValue {
    color: $--color-primary;
    display: inline-block;
    font-size: $--font-size-large;
    font-weight: 600;
    font-synthesis: style;
  }
  html[data-ios] .NumberBoard__itemValue {
    font-weight: 500
  }
  html[data-android] .NumberBoard__itemValue {
    font-weight: 700
  }
  .HoverBoard__item {
    cursor: pointer;
  }
  .HoverBoard__item:hover .NumberBoard__itemName{
    color: $--color-primary;
  }
  .HoverBoard__item:hover .NumberBoard__itemValue {
    color: $--color-primary;
  }
</style>
