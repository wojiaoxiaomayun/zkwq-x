<template>
  <div class="warp" v-if="datas && datas.length > 0">
    <slot name="head"></slot>
    <div v-if="!$slots.head" class="title__warp">
      <div class="title__content">
        <div class="title">{{ title }}</div>
        <i v-if="search" class="base-icon-search" @click="isShowInput = !isShowInput"></i>
      </div>
      <i
        class="base-icon-caret-bottom icon"
        :class="fold ? 'icon-active' : ''"
        @click="fold = !fold"
      ></i>
    </div>
    <div class="Search__wrap" v-if="search && isShowInput">
      <base-input
        v-model="searchValue"
        class="Search__input"
        placeholder="搜索"
        clearable
        :showLabel="false"
      ></base-input>
    </div>
    <base-checkbox-group v-model="checkedList" @change="checkboxChange">
      <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter"
        @before-leave="beforeLeave"
        @leave="leave"
        @after-leave="afterLeave"
      >
        <ul class="item_warp" ref="itemWarp" v-show="!fold">
          <li
            v-for="(item, index) in filterDatas"
            :key="'checkitem' + index"
            v-show="index < showNumX"
          >
            <div class="item text-overflow">
              <base-checkbox :label="item.key">
                <div class="Checkbox__label">
                  <!-- {{item.name}} -->
                </div>
              </base-checkbox>
            </div>
            <div class="text" @click="labelClick(item.key)">
              {{ item.name || item.key }}
            </div>
            <div class="num text-overflow" :title="item.value">
              {{ item.value }}
            </div>
          </li>
        </ul>
      </transition>
    </base-checkbox-group>
    <div
      class="readmore"
      v-if="showNumX < filterDatas.length && !fold"
      @click="showNumX = step?(showNumX + showNum):filterDatas.length"
    >
      <i class="base-icon-caret-bottom"></i><span>{{t('custom.aggsItemV.查看更多')}}</span>
    </div>
    <div
      class="readmore"
      v-if="showNumX >= filterDatas.length && filterDatas.length > showNum && !fold"
      @click="showNumX = showNum"
    >
      <i class="base-icon-caret-top"></i><span>{{t('custom.aggsItemV.折叠隐藏')}}</span>
    </div>
  </div>
</template>
<script>
import BaseCheckbox from "../base/ui/checkbox/checkbox.vue";
import BaseCheckboxGroup from "../base/ui/checkbox/checkbox-group.vue";
import Locale from '../base/ui/mixin/locale'
import BaseInput from '../base/ui/input/Input';
export default {
  name: "AggItemV",
  mixins:[Locale],
  components:{BaseCheckbox,BaseCheckboxGroup,BaseInput},
  data() {
    return {
      fold: false,
      readMore: false,
      checkedList: [],
      showNumX:5,
      searchValue: "",
      isShowInput:false
    };
  },
  props: {
    title: String,
    datas: Array,
    search: {
      type: Boolean,
      default: false,
    },
    showNum: {
      type: Number,
      default: 5,
    },
    step:{
      type:Boolean,
      default:false
    },
    checkList: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  computed: {
    filterDatas() {
      if (this.searchValue) {
        return this.datas.filter((e) => {
          return (e.name || e.key).toLowerCase().includes(this.searchValue.toLowerCase());
        });
      }
      return this.datas;
    },
  },
  created() {
    this.checkedList = this.checkList;
    this.showNumX = this.showNum;
  },
  methods: {
    checkboxChange(e) {
      let data = this.checkedList.map((e) => e);
      this.$emit('update:checkList',data)
      this.$emit("change", data);
    },
    labelClick(e) {
      if (this.checkedList.includes(e)) {
        this.checkedList.splice(this.checkedList.indexOf(e), 1);
      } else {
        this.checkedList.push(e);
      }
      let data = this.checkedList.map((e) => e);
      this.$emit('update:checkList',data)
      this.$emit(
        "change",
        data
      );
    },
    beforeEnter(el) {
      el.style.maxHeight = 0;
    },
    enter(el) {
      if (el.scrollHeight !== 0) el.style.maxHeight = `${el.scrollHeight}px`;
      else el.style.maxHeight = 0;
    },
    afterEnter(el) {
      el.style.maxHeight = "";
    },
    beforeLeave(el) {
      el.style.maxHeight = `${el.scrollHeight}px`;
    },
    leave(el) {
      if (el.scrollHeight !== 0) el.style.maxHeight = 0;
    },
    afterLeave(el) {
      el.style.maxHeight = "";
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../base/ui/style/var.scss";
.v-leave-active,
.v-enter-active {
  transition: 300ms max-height ease-in-out,
    300ms padding-top ease-in-out,
    300ms padding-bottom ease-in-out;
}

.text-overflow {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.warp {
  width: 100%;
  height: auto;
  overflow: hidden;
  // border: 1px solid $--border-color-base;
}

.warp {
  .title__warp {
    width: 100%;
    padding: 12px 16px;
    font-weight: 600;
    font-size: 14px;
    letter-spacing: 2px;
    border-top: 1px solid $--border-color-base;
    border-bottom: 1px solid $--border-color-base;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title__content{
      display: flex;
      align-items: center;
      flex: 1;
      gap: 8px;
      i{
        cursor: pointer;
      }
    }
    .icon {
      padding: 2px;
      background: #f0f1f7;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 16px;
      transition: transform 0.3s;
    }
    .icon-active {
      transform: rotate(-90deg);
    }
  }
  .Search__wrap{
    width: 100%;
    padding: 8px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }

  .item_warp {
    width: 100%;
    font-size: 14px;
    overflow: hidden;
    li {
      width: 100%;
      height: auto;
      overflow: hidden;
      padding: 5px 16px;
      display: flex;

      .item {
        width: 18px;
        margin-right: 8px;
        height: auto;
        overflow: hidden;
        cursor: pointer;
        display: flex;
        align-items: center;

        &:hover {
          opacity: 0.9;
        }
      }

      .text {
        flex: 1;
        // margin-top: 6px;
        margin-right: 8px;
        height: auto;
        overflow: hidden;
        cursor: pointer;
        line-height: normal !important;
        color: #121212;
        font-size: 15px;
        font-weight: 400;

        &:hover {
          opacity: 0.9;
        }
      }

      .num {
        color: #8590a6;
        font-size: 15px;
        font-weight: 400;
        max-width: calc(40% - 8px);
        text-align: right;
        // color: $--color-text-secondary;
        display: flex;
        align-items: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    li:first-of-type {
      margin-top: 8px;
    }
    li:last-of-type {
      margin-bottom: 8px;
    }
  }
  .readmore {
    text-align: center;
    padding: 5px 0px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #999;
  }

  .readmore:hover {
    color: $--color-primary;
  }

  .readmore span {
    font-size: 12px;
    display: none;
  }

  .readmore:hover span {
    display: block !important;
    transition: 0.5s;
  }

  .Checkbox__label {
    width: 180px;
    height: auto;
    overflow: hidden;
    white-space: normal;
    word-break: break-all;
    word-wrap: break-word;
    line-height: 20px;
  }
}
</style>