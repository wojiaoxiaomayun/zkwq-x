<template>
  <div class="UserProfile">
    <div class="UserProfile__avatar">
      <span class="UserLink">
        <avatar :size="avatarSize" :url="profile.avatar" :pointer="false" :round="avatarRound"></avatar>
      </span>
    </div>
    <div class="UserProfile__content">
      <div class="UserProfile__name" :class="{ 'UserProfile__name--light' : themeLight}">
        <span class="UserLink">{{ profile.name }}</span>
        <base-tag style="margin-left:8px;" v-if="!disableEmail && profile.email" size="mini">{{profile.email}}</base-tag>
        <span class="Tags--plain" v-if="!disableTitle && (isNotEmpty(profile.professional_title) || isNotEmpty(profile.position) || isNotEmpty(profile.academic_title) || profile.orc_id)">
          <base-tag :title="t('custom.userProfile.职称')" type="info" size="mini" v-if="isNotEmpty(profile.professional_title)">{{ profile.professional_title[0] }}</base-tag>
          <base-tag :title="t('custom.userProfile.职位')" type="info" size="mini" v-if="isNotEmpty(profile.position)">{{ profile.position[0] }}</base-tag>
          <base-tag :title="t('custom.userProfile.荣誉称号')" type="info" size="mini" v-if="isNotEmpty(profile.academic_title)">{{ profile.academic_title[0] }}</base-tag>
          <base-tag title="orcid" type="info" size="mini" v-if="profile.orc_id">{{ profile.orc_id }}</base-tag>
        </span>
      </div>
      <div class="UserProfile__affiliation" v-if="!disableInstitution && isNotEmpty(profile.affiliation)">
        <div class="RichText ztext">{{ profile.affiliation[0] }}</div><div v-if="isNotEmpty(profile.department) && profile.department[0]">&nbsp;·&nbsp;</div><div v-if="isNotEmpty(profile.department) && profile.department[0]" class="RichText ztext">{{ profile.department[0] }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from './Avatar.vue'
import BaseTag from '../base/ui/tag/Tag.vue'
import {isEmpty} from '../../util/index'
import Locale from '../base/ui/mixin/locale'
export default {
  name: 'UserProfile',
  mixins:[Locale],
  components:{Avatar,BaseTag},
  props: {
    profile: Object,
    avatarSize:{
      type:Number,
      default:60
    },
    avatarRound: {
      type: Boolean,
      default: false
    },
    themeLight: {
      type: Boolean,
      default: false
    },
    disableTitle: {
      type: Boolean,
      default: false
    },
    disableInstitution: {
      type: Boolean,
      default: false
    },
    disableEmail:{
      type:Boolean,
      default:false
    }
  },
  methods: {
    isNotEmpty(val){
      return !isEmpty(val) && val?.[0]
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../base/ui/style/var.scss';
  .UserProfile {
    display: flex;
    align-items: center;
  }
  .UserProfile__avatar {
    margin-right: 12px;
  }
  .UserProfile__avatar .Avatar, .UserProfile__avatar .UserLink {
    display: block;
  }
  .UserProfile__content {
    flex: 1;
    overflow: hidden;
  }
  .UserProfile__affiliation, .UserProfile__name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .UserProfile__name {
    font-size: $--font-size-large;
    font-weight: 600;
    font-synthesis: style;
    line-height: 30px;
    color: $--color-primary;
    display: flex;
    width: 100%;
    align-items: center;
    // white-space: normal;
    .Tags--plain {
      margin-bottom: 0;
      display: flex;
      align-items: center;
      gap:8px;
      margin-left: 12px;
      .el-tag.el-tag--info {
        margin: 0 0 0 8px;
      }
    }
  }
  .UserProfile__affiliation {
    font-size: $--font-size-base;
    margin-top: 4px;
    display: flex;
  }
  .UserProfile__affiliation .RichText {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .UserProfile__name--light {
    font-weight: 500;
    line-height: 26px;
  }
</style>
