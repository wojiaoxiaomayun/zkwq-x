<template>
  <div>
    <draggable draggable=".zkwq-tag-draggable" v-model="newTags"  @end="updateNewTags" style="display:inline;" v-if="newTags.length">
      <base-tag
        class="zkwq-tag-draggable"
        :key="'tag' + index"
        v-for="(tag,index) in newTags"
        closable
        :disable-transitions="false"
        @close="handleClose1(index)"
        style="margin-right:8px;margin-bottom:8px;"
      >
        {{ tag }}
      </base-tag>
    </draggable>
    <base-input
      clearable=""
      class="input-new-tag focusStyle"
      v-if="inputVisible1"
      v-model="inputValue1"
      ref="saveTagInput"
      size="small"
      style="width: 20%;margin-bottom:8px;"
      :placeholder="placeholder || t('custom.keyword.请输入') + text"
      @keyup.enter.native="handleInputConfirm1"
      @blur="handleInputConfirm1"
    />
    <base-button
      type="primary"
      plain
      v-else
      class="button-new-tag addkey"
      style="margin-bottom:8px;"
      size="small"
      :disabled="newTags.length >= size"
      @click="showInput1"
      ><i class="base-icon-plus"></i>&nbsp; {{t('custom.keyword.添加')}}{{text}}</base-button
    >
  </div>
</template>

<script>
import BaseButton from "../base/ui/button/Button.vue";
import BaseInput from "../base/ui/input/Input.vue";
import BaseTag from '../base/ui/tag/Tag.vue'
import draggable from 'vuedraggable'
import Locale from '../base/ui/mixin/locale'
export default {
  name:'Keywords',
  mixins:[Locale],
  data(){
    return {
      newTags:[],
      isMeUpdate:false,
      inputVisible1: false,
      inputValue1: ""
    }
  },
  components: {
    BaseButton,BaseInput,BaseTag,draggable
  },
  inject: {
    baseForm: {
      default: ''
    },
    baseFormItem: {
      default: ''
    }
  },
  model:{
    prop:'tags',
    event:'update:tags'
  },
  watch:{
      tags:{
          handler:function(newVal){
              if(!this.isMeUpdate){
                  this.newTags = newVal
              }else{
                  this.isMeUpdate = false
              }
          },
          immediate:true
      }
  },
  props:{
    tags:{
      type:Array,
      default:() => []
    },
    text:{
      type:String,
      default:() => {
        return Locale.methods.t('custom.keyword.关键词')
      }
    },
    size:{
      type:Number,
      default:10000
    },
    placeholder:String
  },
  methods:{
    showInput1() {
      this.inputVisible1 = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm1() {
      this.clearFormValidate()
      let inputValue1 = this.inputValue1;
      if (inputValue1) {
        this.newTags.push(inputValue1);
        this.isMeUpdate = true;
        this.$emit('update:tags',this.newTags)
      }
      this.inputVisible1 = false;
      this.inputValue1 = "";
    },
    handleClose1(index) {
      this.clearFormValidate()
      this.newTags.splice(
        index,
        1
      );
      this.isMeUpdate = true;
      this.$emit('update:tags',this.newTags)
    },
    updateNewTags(){
      this.isMeUpdate = true;
      this.$emit('update:tags',this.newTags)
    },
    clearFormValidate(){
      if(this.baseFormItem){
        this.baseFormItem.clearValidate()
      }
    }
  }
}
</script>

<style>

</style>