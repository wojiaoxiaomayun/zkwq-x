<template>
  <div class="Author__wrap">
    <div class="Form__author">
      <base-autocomplete
        popper-class="SupplementForm--autocomplete Width--auto ScholarSuggestionPopper Author__custom--popper"
        :fetch-suggestions="_getAuthorName"
        clearable
        :trigger-on-focus="false"
        :placeholder="placeholder"
        v-model="authorInfo.name"
        :hide-loading="false"
        @select="_authorSelectChange"
        @input="_authorInput"
        @clear="_authorClear"
        v-bind="$attrs"
      >
        <template slot-scope="{ item }">
          <user-profile-item :profile="item" v-bind="$attrs"></user-profile-item>
        </template>
      </base-autocomplete>
      <div v-if="tip" class="FormItem__tip">{{t('custom.author.搜索')}}{{ text }}{{t('custom.author.姓名，如：张三 清华大学')}}</div>
    </div>
  </div>
</template>

<script>
import BaseAutocomplete from "../base/ui/autocomplete/autocomplete.vue";
import UserProfileItem from "./UserProfile.vue";
import { SuggestScholarsV2 } from "../../service";
import Locale from '../base/ui/mixin/locale'
let defaultAuthorInfo = {
  id:'',
  name:'',
  institution:''
}
export default {
  name:'Author',
  mixins:[Locale],
  components: {
    BaseAutocomplete,UserProfileItem
  },
  model: {
    prop: "author",
    event: "update:author",
  },
  props:{
    author:Object,
    placeholder:{
      type:String,
      default:() => {
        return Locale.methods.t('custom.author.请输入姓名')
      }
    },
    tip:Boolean,
    text:String
  },
  inject: {
    baseForm: {
      default: ''
    },
    baseFormItem: {
      default: ''
    }
  },
  data(){
    return {
      authorInfo:{
        id:'',
        name:'',
        institution:''
      },
      isMeUpdate:false
    }
  },
  watch:{
    author:{
      immediate:true,
      handler:function(newVal){
        if(this.isMeUpdate){
          this.isMeUpdate = false;
        }else{
          if(newVal){
            this.authorInfo.id = newVal.id;
            this.authorInfo.name = newVal.name;
            this.authorInfo.institution = newVal.institution;
          }
        }
      }
    }
  },
  methods: {
    _authorInput(val){
      this.authorInfo.id = ''
      this.authorInfo.name = val;
      this.authorInfo.institution = ''
      this.updateAuthor();
    },
    _getAuthorName(query, cb) {
      SuggestScholarsV2(query).then((response) => {
        let items = [];
        if (response.length > 0) {
          for (let index in response) {
            items.push({
              value: response[index].title,
              id: response[index].id,
              affiliation: response[index].institution,
              avatar: response[index].avatar,
              name: response[index].title,
              department: response[index].department,
              email: response[index].email,
              orc_id:response[index].orc_id,
              ...response[index]
            });
          }
        }
        cb(items);
      });
    },
    _authorSelectChange(val) {
      if (typeof val == "string") {
        this.authorInfo.id = ''
        this.authorInfo.name = val;
        this.authorInfo.institution = ''
      } else {
        this.authorInfo.id = val.id;
        this.authorInfo.name = val.name;
        this.authorInfo.institution = val.affiliation?.length > 0?[val.affiliation?.[0]]:[];
        Object.entries(val).forEach(([key,value]) => {
          if(!this.authorInfo[key]){
            this.authorInfo[key] = value
          }
        })
      }
      
      this.updateAuthor();
    },
    _authorClear(){
      this.authorInfo = {...this.defaultAuthorInfo}
      this.updateAuthor();
    },
    updateAuthor(){
      this.isMeUpdate = true
      this.$emit('update:author', {...this.authorInfo});
      this.$emit('change', {...this.authorInfo});
      if(this.baseFormItem){
        this.baseFormItem.clearValidate()
      }
    }
  },
}
</script>

<style lang="scss" scoped>
  @import '../base/ui/style/var.scss';
  .Author__wrap{
    width: 100%;
  }
  .Form__author {
    position: relative;
    margin-right: 16px;
    width: 100%;
  }
  .FormItem__tip {
    margin-top: 12px;
    color: $--color-text-placeholder;
  }
</style>
<style lang="scss">
  .Author__custom--popper{
    min-width: 600px;
  }
</style>