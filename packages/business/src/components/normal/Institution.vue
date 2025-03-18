<template>
  <div class="Author__wrap">
    <div class="Form__author">
        <base-autocomplete
          popper-class="SupplementForm--autocomplete Width--auto ScholarSuggestionPopper"
          :fetch-suggestions="_getInstitutionName"
          clearable
          :trigger-on-focus="false"
          :placeholder="placeholder"
          v-model="insInfo.name"
          :hide-loading="false"
          @input="_institutionInput"
          @select="_institutionSelectChange"
          @clear="_institutionClear"
          v-bind="$attrs"
        >
          <template slot-scope="{ item }">
            <institution-profile-item style="margin-bottom:4px;" :profile="item"></institution-profile-item>
          </template>
        </base-autocomplete>
        <div v-if="tip" class="FormItem__tip">{{t('custom.institutionx.搜索')}}{{ text }}，{{t('custom.institutionx.如：清华大学')}}</div>
      </div>
  </div>
</template>

<script>
import BaseAutocomplete from "../base/ui/autocomplete/autocomplete.vue";
import InstitutionProfileItem from "./InstitutionProfile.vue";
import { SuggestInstitutions } from "../../service";
import Locale from '../base/ui/mixin/locale'
export default {
  name:'Author',
  mixins:[Locale],
  components: {
    BaseAutocomplete,InstitutionProfileItem
  },
  model: {
    prop: "ins",
    event: "update:ins",
  },
  props:{
    ins:Object,
    placeholder:{
      type:String,
      default:() => {
        return Locale.methods.t('custom.institutionx.请输入机构')
      }
    },
    tip:Boolean
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
      insInfo:{
        id:'',
        name:'',
        logo:''
      },
      isMeUpdate:false
    }
  },
  watch:{
    ins:{
      immediate:true,
      handler:function(newVal){
        if(this.isMeUpdate){
          this.isMeUpdate = false;
        }else{
          if(newVal){
            this.insInfo.id = newVal.id;
            this.insInfo.name = newVal.name;
            this.insInfo.logo = newVal.logo;
          }
        }
      }
    }
  },
  methods: {
    _institutionInput(val){
      this.insInfo.id = '';
        this.insInfo.name = val;
        this.insInfo.logo = '';
        this.updateIns();
    },
    _institutionSelectChange(val){
      if (typeof val == "string") {
        this.insInfo.id = '';
        this.insInfo.name = val;
        this.insInfo.logo = '';
      } else {
        this.insInfo.id = val.id;
        this.insInfo.name = val.name;
        this.insInfo.logo = val.logo;
        Object.entries(val).forEach(([key,value]) => {
          if(!this.insInfo[key]){
            this.insInfo[key] = value
          }
        })
      }
      this.updateIns();
    },
    _getInstitutionName(query,cb) {
      SuggestInstitutions(query).then((response) => {
        let items = [];
        if (response.length > 0) {
          for (let index in response) {
            items.push({
              logo:response[index].logo,
              name: response[index].name,
              id: response[index].id,
              ...response[index]
            });
          }
        }
        cb(items)
      })
    },
    _institutionClear(){
      this.insInfo.id = ''
      this.insInfo.name = ''
      this.insInfo.logo = ''
      this.updateIns();
    },
    updateIns(){
      this.isMeUpdate = true
      this.$emit('update:ins', {...this.insInfo});
      this.$emit('change',{...this.insInfo})
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