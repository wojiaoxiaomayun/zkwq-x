<template>
  <div class="aggs_item">
    <div class="name">{{ title }}：</div>
    <ul class="item" ref="agg_item" :style="{ height: more ? 'auto' : '27px' }">
      <li
        :class="checkdKeys.includes(item.key) ? 'selected' : ''"
        v-for="(item, index) in itemDatas"
        :key="title + index"
        @click="selectChange(item)"
      >
        {{ item.name || item.key }}{{ item.value ? `（${item.value}）` : "" }}
      </li>
    </ul>
    <div v-if="isShowMore && more" class="more" @click="more = !more">
      {{t('custom.aggsItemH.收起')}}&nbsp;<span class="base-icon-arrow-up"></span>
    </div>
    <div v-if="isShowMore && !more" class="more" @click="more = !more">
      {{t('custom.aggsItemH.展开')}}&nbsp;<span class="base-icon-arrow-down"></span>
    </div>
  </div>
</template>
<script>
import Locale from '../base/ui/mixin/locale'
export default {
  name: "AggsItemH",
  mixins:[Locale],
  data() {
    return {
      itemDatas: [],
      checkdKeys:[],
      isShowMore: false,
      more: false,
      allKey:'agg_item_all'
    };
  },
  props: {
    title: String,
    datas: Array,
    single: {
      type:Boolean,
      default:false
    },
    notAll: {
      type:Boolean,
      default:false
    },
    checkList: {
      type: Array,
      default: () => {
        return [];
      },
    }
  },
  watch: {
    datas: {
      handler(newValue) {
        this.itemDatas = newValue || [];
        this.more = true;
        if(!this.notAll && !this.itemDatas.map(e => e.key).includes('agg_item_all')){
          this.itemDatas.unshift({
            key:'agg_item_all',
            name:this.t('custom.aggsItemH.全部')
          })
        }
        this.$nextTick(() => {
          if (this.$refs["agg_item"].clientHeight > 28) {
            this.isShowMore = true;
          }
          this.more = false;
        });
      },
      immediate: true,
    },
    checkList:{
      handler(newValue) {
        this.checkdKeys = [...(newValue || [])]
        if(!this.notAll && this.checkdKeys.length == 0){
          this.checkdKeys.push(this.allKey)
        }
      },
      immediate: true,
    }
  },
  methods: {
    selectChange(item) {
      if (item.key == this.allKey) {
        this.checkdKeys = [this.allKey]
        this.$emit('update:checkList',[])
        this.$emit(
          "change",
          []
        );
      } else {
        if (this.single) {
          this.checkdKeys = []
        }
        if(this.checkdKeys.includes(item.key)){
          this.checkdKeys.splice(this.checkdKeys.indexOf(item.key),1)
          if (!this.notAll && this.checkdKeys.length == 0) {
            this.checkdKeys = [this.allKey]
          }
        }else{
          if(this.checkdKeys.includes(this.allKey)){
            this.checkdKeys.splice(this.checkdKeys.indexOf(this.allKey),1)
          }
          this.checkdKeys.push(item.key)
        }
        let data = this.itemDatas
            .filter((e) => this.checkdKeys.includes(e.key))
            .filter((e) => e.key != this.allKey)
            .map(e => e.key)
        this.$emit('update:checkList',data)
        this.$emit(
          "change",
          data
        );
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../base/ui/style/var.scss";
.aggs_item {
  width: 100%;
  height: auto;
  overflow: hidden;
  display: flex;
  padding-top: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid $--border-color-base;
  .name {
    width: 100px;
    color: $--color-text-secondary;
    padding: 2px 8px;
  }
  .item {
    flex: 1;
    height: auto;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    li {
      padding: 2px 8px;
      cursor: pointer;
      margin: 0px 8px;
      margin-bottom: 4px;
    }
    li:hover {
      background: $--color-primary-light-3;
      color: white;
      border-radius: 4px;
    }
    .selected {
      background: $--color-primary-light-3;
      color: white;
      border-radius: 4px;
    }
  }
  .more {
    width: 50px;
    height: auto;
    overflow: hidden;
    text-align: center;
    color: $--color-primary;
    cursor: pointer;
    padding-top: 4px;
  }
}
</style>