<template>
  <div class="Author__warp">
    <div class="add_author">
      <base-button type="primary" plain  @click="_toggleAddIns(true)" :disabled="newInss.length >= size"
        ><i class="base-icon-plus"></i>&nbsp;{{t('custom.institutionx.新增')}}{{ text }}{{t('custom.institutionx.信息')}}</base-button
      >
    </div>
    <div class="Form__item" style="margin-bottom: 20px" v-if="isAddIns">
      <div class="Form__author">
        <base-autocomplete
          popper-class="SupplementForm--autocomplete Width--auto ScholarSuggestionPopper"
          :show-label="false"
          :fetch-suggestions="_getInstitutionName"
          clearable
          :trigger-on-focus="false"
          :placeholder="t('custom.institutionx.请输入') + text"
          v-model="insInfo.name"
          :hide-loading="false"
          @select="_institutionSelectChange"
        >
          <template slot-scope="{ item }">
            <div class="title">{{ item.name }}</div>
          </template>
        </base-autocomplete>
        <div class="FormItem__tip">{{t('custom.institutionx.搜索')}}{{ text }}，{{t('custom.institutionx.如：清华大学')}}</div>
      </div>
      <base-button
        type="primary"
        size="small"
        style="margin-left: 16px;margin-top: 4px;"
        @click="_saveIns"
        >{{t('custom.institutionx.保存')}}</base-button
      >
      <base-button
        size="small"
        style="margin-left: 8px;margin-top: 4px;"
        @click="_toggleAddIns(false)"
        >{{t('custom.institutionx.取消')}}</base-button
      >
    </div>
    <div
      class="Author__list"
      v-for="(item, index) in newInss"
      :key="'ins' + index"
    >
      <div class="Author__list--item">{{ item.name }}</div>
      <div class="Author__list--contro">
        <base-tooltip
          class="box-item"
          effect="dark"
          :content="t('custom.institutionx.上移')"
          placement="top"
          v-if="index > 0"
        >
          <i class="base-icon-top" style="margin-right:12px;cursor:pointer;" @click="_upIndex(item, index)"></i>
        </base-tooltip>
        <base-tooltip
          class="box-item"
          effect="dark"
          :content="t('custom.institutionx.下移')"
          placement="top"
          v-if="index < newInss.length - 1"
        >
          <i class="base-icon-bottom" style="margin-right:12px;cursor:pointer;" @click="_downIndex(item, index)"></i>
        </base-tooltip>
        <base-tooltip
          class="box-item"
          effect="dark"
          :content="t('custom.institutionx.编辑')"
          placement="top"
        >
          <i class="base-icon-edit" style="margin-right:12px;cursor:pointer;" @click="_editIns(item, index)"></i>
        </base-tooltip>
        <base-tooltip
          class="box-item"
          effect="dark"
          :content="t('custom.institutionx.删除')"
          placement="top"
        >
          <i class="base-icon-delete" style="margin-right:12px;cursor:pointer;" @click="removeIns(index)"></i>
        </base-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
import BaseTooltip from "../base/ui/tooltip/tooltip";
import BaseButton from "../base/ui/button/Button.vue";
import BaseAutocomplete from "../base/ui/autocomplete/autocomplete.vue";
import { SuggestInstitutions } from "../../service";
import Locale from '../base/ui/mixin/locale'
const defaultinsInfo = {
  id:"",
  name: ""
}
export default {
  name: "Author",
  mixins:[Locale],
  inject: {
    baseForm: {
      default: ''
    },
    baseFormItem: {
      default: ''
    }
  },
  components: {
    BaseTooltip,BaseButton,BaseAutocomplete
  },
  model: {
    prop: "inss",
    event: "update:inss",
  },
  data() {
    return {
      insInfo: {
        id:"",
        name: "",
        logo:""
      },
      isAddIns: false,
      isEditIns: false,
      newInss: [],
      isMeUpdate: false,
      getInsLoading:false
    };
  },
  props: {
    inss: {
      type: Array,
      default: function () {
        return [];
      },
    },
    text: {
      type: String,
      default: () => {
        return Locale.methods.t('custom.institutionx.机构')
      },
    },
    size:{
      type:Number,
      default:10000
    }
  },
  watch: {
    inss: {
      handler: function (newVal) {
        if (!this.isMeUpdate) {
          this.newInss = newVal;
        } else {
          this.isMeUpdate = false;
        }
      },
      immediate: true,
    },
  },
  methods: {
    _institutionSelectChange(val){
      if (typeof val == "string") {
        this.insInfo.name = val;
      } else {
        this.insInfo.id = val.id;
        this.insInfo.name = val.name;
        this.insInfo.logo = val.logo;
      }
    },
    _getInstitutionName(query,cb) {
      this.getInsLoading = true;
      SuggestInstitutions(query).then((response) => {
        let items = [];
        if (response.length > 0) {
          for (let index in response) {
            items.push({
              logo:response[index].logo,
              name: response[index].name,
              id: response[index].id
            });
          }
        }
        cb(items)
      }).finally(() => {
        this.getInsLoading = false
      });
    },
    _editIns(item, index) {
      this.isEditIns = true;
      this.editInsIndex = index;
      this.insInfo.name = item.name;
      this.insInfo.id = item.id;
      this._toggleAddIns(true);
    },
    _upIndex(item,index){  
      let temp = this.newInss[index - 1];
      this.newInss.splice(index - 1,1,this.newInss[index])
      this.newInss.splice(index,1,temp)
    },
    _downIndex(item,index){
      let temp = this.newInss[index + 1];
      this.newInss.splice(index + 1,1,this.newInss[index])
      this.newInss.splice(index,1,temp)
    },
    _toggleAddIns(status) {
      this.isAddIns = status;
      if (!status) {
        this.insInfo = JSON.parse(JSON.stringify(defaultinsInfo))
      }
    },
    _saveIns() {
      if(this.baseFormItem){
        this.baseFormItem.clearValidate()
      }
      if(!this.insInfo.name){
        this.$message.error('请选择机构')
        return;
      }
      let ins = {
        id:this.insInfo.id,
        name: this.insInfo.name,
        logo: this.insInfo.logo
      };
      if (this.isEditIns) {
        this.newInss.splice(this.editInsIndex, 1, ins);
      } else {
        this.newInss.push(ins);
      }
      this.updateinss();
      this._toggleAddIns(false);
      this.isEditIns = false;
    },
    removeIns(index) {
      this.newInss.splice(index, 1);
      this.updateinss();
    },
    updateinss() {
      this.isMeUpdate = true;
      this.$emit("update:inss", [...this.newInss]);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../base/ui/style/var.scss';
.Author__warp + ::v-deep .base-form-item__error.is-required{
  top: 16px;
  right:0px;
  width:auto;
  left:auto;
  text-align:right;
}
.Author__warp {
  width: 100%;
  height: auto;
  overflow: hidden;
}
.Form__item {
  width: 100%;
  height: 80px;
  display: flex;
  align-items: flex-start;
  margin-top: 16px;
}
.Form__author {
  position: relative;
  margin-right: 16px;
  width: 100%;
}
.FormItem__tip {
  position: absolute;
  top: 40px;
  color: $--color-text-placeholder;
}
.Author__list {
  width: auto;
  overflow: hidden;
  margin: 8px;
  padding: 8px;
  height: 30px;
  display: flex;
  align-items: center;
  &:hover {
    background-color: #f6f6f6;
    border-radius: 4px;
  }
  &--item {
    margin: 0px 8px;
  }
  &--contro {
    margin-left: 16px;
    width: 40px;
    display: flex;
    justify-content: space-between;
    span {
      cursor: pointer;
    }
  }
}
.add_author {
  cursor: pointer;
  &:hover {
    color: $--color-primary;
  }
}
</style>