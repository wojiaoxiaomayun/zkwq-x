<template>
  <div class="UserProfile">
    <div class="UserProfile__avatar">
      <span class="UserLink">
        <institution-avatar :size="avatarSize" :url="profile.logo" :round="avatarRound"></institution-avatar>
      </span>
    </div>
    <div class="UserProfile__content">
      <div class="UserProfile__name" :class="{ 'UserProfile__name--light' : themeLight}">
        <span class="UserLink">{{ profile.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import InstitutionAvatar from './InstitutionAvatar'
import SmoothNumber from '../base/widget/SmoothNumber'
export default {
  name: 'InstitutionProfile',
  components: {SmoothNumber, InstitutionAvatar},
  props: {
    profile: Object,
    avatarSize:{
      type:Number,
      default:56
    },
    avatarRound: {
      type: Boolean,
      default: false
    },
    themeLight: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../base/ui/style/var";
.UserProfile {
  display: flex;
  align-items: center;
  .SmoothNumber {
    color: $--color-primary;
  }
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
  color: $--color-text-primary;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  white-space: normal;
}
.UserProfile__affiliation {
  color: $--color-text-secondary;
  line-height: 1.5;
  max-height: 42px;
  overflow: hidden;
  margin-top: 4px;
}
.UserProfile__name--light {
  font-weight: 500;
  line-height: 26px;
}
</style>
