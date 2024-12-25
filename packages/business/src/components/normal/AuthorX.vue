<template>
  <div class="Author__warp">
    <div class="add_author">
      <base-button type="primary" plain  @click="_toggleAddAuthor(true)" :disabled="newAuthors.length >= size || disabled"
        ><i class="base-icon-plus"></i>&nbsp;{{t('custom.authorx.新增')}}{{ text }}{{t('custom.authorx.信息')}}</base-button
      >
    </div>
    <div class="Form__item" style="margin-bottom: 20px" v-if="isAddAuthor">
      <div class="Form__author">
        <base-autocomplete
          popper-class="SupplementForm--autocomplete Width--auto ScholarSuggestionPopper Author__custom--popper"
          :show-label="false"
          :fetch-suggestions="_getAuthorName"
          clearable
          :trigger-on-focus="false"
          :placeholder="t('custom.authorx.请输入姓名')"
          v-model="authorInfo.name"
          :hide-loading="false"
          @select="_authorSelectChange"
        >
          <template slot-scope="{ item }">
            <user-profile-item :profile="item" v-bind="$attrs"></user-profile-item>
          </template>
        </base-autocomplete>
        <div class="FormItem__tip">{{t('custom.authorx.搜索')}}{{ text }}{{t('custom.authorx.姓名，如：张三 清华大学')}}</div>
      </div>
      <base-select
          v-model="authorInfo.institution"
          multiple
          filterable
          remote
          reserve-keyword
          allow-create
          :placeholder="t('custom.authorx.请输入机构')"
          :remote-method="_getInstitutionName"
          :loading="getInsLoading">
          <base-option
            v-for="item in searchInss"
            :key="item.id"
            :label="item.name"
            :value="item.name">
          </base-option>
        </base-select>
        <!-- <div class="FormItem__tip">搜索{{ text }}机构，如：清华大学</div> -->
      <base-button
        type="primary"
        size="small"
        style="margin-left: 16px;margin-top: 4px;"
        @click="_saveAuthor"
        >{{t('custom.authorx.保存')}}</base-button
      >
      <base-button
        size="small"
        style="margin-left: 8px;margin-top: 4px;"
        @click="_toggleAddAuthor(false)"
        >{{t('custom.authorx.取消')}}</base-button
      >
    </div>
    <div
      class="Author__list"
      v-for="(item, index) in newAuthors"
      :key="'author' + index"
    >
      <div class="Author__list--item">{{ item.name }}</div>
      <div class="Author__list--space">·</div>
      <div class="Author__list--item">{{ item.institution.join('·') }}</div>
      <!-- <div class="Author__list--space">·</div>
      <div class="Author__list--item">{{ item.email }}</div> -->
      <div class="Author__list--space" v-if="CorrespondingAuthor && index == 0">·</div>
      <div style="color:red" v-if="CorrespondingAuthor && index == 0">【{{t('custom.authorx.第一作者')}}】</div>
      <div v-if="CorrespondingAuthor" class="Author__list--space">·</div>
      <div v-if="CorrespondingAuthor" class="Author__list--item"><base-checkbox v-model="item.contributor_equal_first" >{{t('custom.authorx.共同第一作者')}}</base-checkbox></div>
      <div v-if="CorrespondingAuthor" class="Author__list--space">·</div>
      <div v-if="CorrespondingAuthor" class="Author__list--item"><base-checkbox v-model="item.contrib_corresponding">{{t('custom.authorx.通讯作者')}}</base-checkbox></div>
      <div v-if="orcid" class="Author__list--space">·</div>
      <div v-if="orcid" class="Author__list--item"><base-input v-model="item.orcid" placeholder="请输入orcid" :showLabel="false"></base-input></div>
      <div v-if="cstr" class="Author__list--space">·</div>
      <div v-if="cstr" class="Author__list--item"><base-input v-model="item.cstr" placeholder="请输入cstr" :showLabel="false"></base-input></div>
      <div class="Author__list--contro" v-if="!disabled">
        <base-tooltip
          class="box-item"
          effect="dark"
          :content="t('custom.authorx.上移')"
          placement="top"
          v-if="index > 0"
        >
          <i class="base-icon-top" style="margin-right:12px;cursor:pointer;" @click="_upIndex(item, index)"></i>
        </base-tooltip>
        <base-tooltip
          class="box-item"
          effect="dark"
          :content="t('custom.authorx.下移')"
          placement="top"
          v-if="index < newAuthors.length - 1"
        >
          <i class="base-icon-bottom" style="margin-right:12px;cursor:pointer;" @click="_downIndex(item, index)"></i>
        </base-tooltip>
        <base-tooltip
          class="box-item"
          effect="dark"
          :content="t('custom.authorx.编辑')"
          placement="top"
        >
          <i class="base-icon-edit" style="margin-right:12px;cursor:pointer;" @click="_editAuthor(item, index)"></i>
        </base-tooltip>
        <base-tooltip
          class="box-item"
          effect="dark"
          :content="t('custom.authorx.删除')"
          placement="top"
        >
          <i class="base-icon-delete" style="margin-right:12px;cursor:pointer;" @click="removeAuthor(index)"></i>
        </base-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
import BaseTooltip from "../base/ui/tooltip/tooltip";
import BaseButton from "../base/ui/button/Button.vue";
import BaseSelect from "../base/ui/select/Select";
import BaseOption from "../base/ui/select/Option";
import BaseAutocomplete from "../base/ui/autocomplete/autocomplete.vue";
import BaseCheckbox from '../base/ui/checkbox/checkbox.vue'
import BaseInput from "../base/ui/input/Input.vue";
import UserProfileItem from "./UserProfile.vue";
import { SuggestScholarsV2,SuggestInstitutions } from "../../service";
import Locale from '../base/ui/mixin/locale'
const defaultAuthorInfo = {
  id:"",
  name: "",
  institution: [],
  institutionId:[],
  contributor_equal_first:false,
  contrib_corresponding:false
}
export default {
  name: "Author",
  model: {
    prop: "authors",
    event: "update:authors",
  },
  mixins:[Locale],
  components: {
    BaseTooltip,
    BaseButton,
    BaseSelect,
    BaseOption,
    BaseAutocomplete,
    BaseInput,
    UserProfileItem,
    BaseCheckbox
  },
  data() {
    return {
      authorInfo: {
        id:"",
        name: "",
        institution: [],
        institutionId:[],
        orcid:'',
        cstr:'',
        contributor_equal_first:false,
        contrib_corresponding:false
      },
      isAddAuthor: false,
      isEditAuthor: false,
      newAuthors: [],
      isMeUpdate: false,
      searchInss:[],
      getInsLoading:false,
      insMap:{}
    };
  },
  inject: {
    baseForm: {
      default: ''
    },
    baseFormItem: {
      default: ''
    }
  },
  props: {
    authors: {
      type: Array,
      default: function () {
        return [];
      },
    },
    text: {
      type: String,
      default: () => {
        return Locale.methods.t("custom.authorx.作者")
      },
    },
    CorrespondingAuthor:{
      type:Boolean,
      default:false
    },
    size:{
      type:Number,
      default:10000
    },
    disabled:{
      type:Boolean,
      default:false
    },
    cstr:{
      type:Boolean,
      default:false
    },
    orcid:{
      type:Boolean,
      default:false
    }
  },
  watch: {
    authors: {
      handler: function (newVal) {
        if (!this.isMeUpdate) {
          this.newAuthors = newVal;
        } else {
          this.isMeUpdate = false;
        }
      },
      immediate: true,
    },
    'authorInfo.institution':{
      handler:function(newVal){
        this.authorInfo.institutionId = this.authorInfo.institution?.map(e => this.insMap[e] || '') || []
      },
      immediate: true,
    }
  },
  methods: {
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
              orcid:response[index].orc_id,
              cstr:response[index].extend_entity?.cstr,
              ...response[index]
            });
          }
        }
        cb(items);
      });
    },
    _getInstitutionName(query) {
      this.getInsLoading = true;
      SuggestInstitutions(query).then((response) => {
        let items = [];
        if (response.length > 0) {
          for (let index in response) {
            this.insMap[response[index].name] = response[index].id;
            items.push({
              logo: response[index].logo,
              name: response[index].name,
              id: response[index].id
            });
          }
        }
        this.searchInss = items;
      }).finally(() => {
        this.getInsLoading = false
      });
    },
    _editAuthor(item, index) {
      this.isEditAuthor = true;
      this.editAuthorIndex = index;
      this.authorInfo.name = item.name;
      this.authorInfo.institution = item.institution;
      this.authorInfo.institutionId = item.institutionId;
      this.authorInfo.orcid = item.orcid;
      this.authorInfo.cstr = item.cstr;
      this._toggleAddAuthor(true);
    },
    _upIndex(item,index){  
      let temp = this.newAuthors[index - 1];
      this.newAuthors.splice(index - 1,1,this.newAuthors[index])
      this.newAuthors.splice(index,1,temp)
      this.updateAuthors();
    },
    _downIndex(item,index){
      let temp = this.newAuthors[index + 1];
      this.newAuthors.splice(index + 1,1,this.newAuthors[index])
      this.newAuthors.splice(index,1,temp)
      this.updateAuthors();
    },
    _toggleAddAuthor(status) {
      this.isAddAuthor = status;
      if (!status) {
        this.authorInfo = JSON.parse(JSON.stringify(defaultAuthorInfo))
      }
    },
    _saveAuthor() {
      if(this.baseFormItem){
        this.baseFormItem.clearValidate()
      }
      if(!this.authorInfo.name || !this.authorInfo.institution){
        this.$message.error('请输入姓名或机构')
        return;
      }
      let author = {
        id:this.authorInfo.id,
        name: this.authorInfo.name,
        institution: this.authorInfo.institution,
        institutionId: this.authorInfo.institutionId,
        orcid:this.authorInfo.orcid,
        cstr:this.authorInfo.cstr,
        contributor_equal_first: false,
        contrib_corresponding: false
      };
      if (this.isEditAuthor) {
        this.newAuthors.splice(this.editAuthorIndex, 1, author);
      } else {
        this.newAuthors.push(author);
      }
      this.updateAuthors();
      this._toggleAddAuthor(false);
      this.isEditAuthor = false;
    },
    _authorSelectChange(val) {
      if (typeof val == "string") {
        this.authorInfo.name = val;
      } else {
        this.authorInfo.id = val.id;
        this.authorInfo.name = val.name;
        this.authorInfo.institution = val.affiliation?.length > 0?[val.affiliation?.[0]]:[];
        this.authorInfo.orcid = val.orcid;
        this.authorInfo.cstr = val.cstr;
      }
    },
    removeAuthor(index) {
      this.newAuthors.splice(index, 1);
      this.updateAuthors();
    },
    updateAuthors() {
      this.isMeUpdate = true;
      this.$emit("update:authors", [...this.newAuthors]);
      this.$emit('change',[...this.newAuthors])
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
  height: auto;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  & *{
    line-height: 30px;
  }
  &:hover {
    background-color: #f6f6f6;
    border-radius: 4px;
  }
  &--contro {
    width: auto;
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
<style lang="scss">
  .Author__custom--popper{
    min-width: 600px;
  }
</style>