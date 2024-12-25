<template>
  <base-popover placement="bottom-start" :visible-arrow="false" trigger="hover" @show="handleShowScholar" popper-class="HoverCard__popoverTarget" :open-delay="300" :disabled="!uid">
    <div class="HoverCard__container">
      <div v-if="isLoading" class="HoverCard__loading">
        <bounce-loading></bounce-loading>
      </div>
      <div v-else class="HoverCard" :class="{ 'HoverCard--isLoading' : isLoading }">
        <div>
          <div v-if="scholar.cover" class="HoverCard__coverContainer">
            <img class="HoverCard__cover" :src="scholar.cover" alt="cover">
          </div>
          <div class="HoverCard__titleContainer">
            <span style="width: 72px;height: 72px;overflow: hidden;display: block;position: absolute;top: -20px">
              <img v-if="scholar.avatar" class="Avatar Avatar--large HoverCard__avatar" width="72" :src="scholar.avatar">
              <img v-else class="Avatar Avatar--large HoverCard__avatar" width="72" src="../../../assets/avatar_placeholder_large.png">
            </span>
            <div class="HoverCard__titleText">
              <div class="HoverCard__title">
                <span>
                  <a @click="handleDirectToHomePage" target="_blank">{{ scholar.name }}</a>
                </span>
              </div>
              <div v-if="isNotEmpty(scholar.affiliation)" class="HoverCard__subtitle"><span class="ztext">{{ scholar.affiliation[0] }}</span></div>
            </div>
          </div>
        </div>
        <div class="HoverCard__item" v-if="isNotEmpty(scholar.professional_title) || isNotEmpty(scholar.academic_title)">
          <div class="UserHoverCard__infoItem" v-if="isNotEmpty(scholar.professional_title)">
            <svg class="Icon Icon--BadgeGlorious" fill="currentColor" viewBox="0 0 24 24" width="18" height="18"><g fill="none" fill-rule="evenodd"><path fill="#FF9500" d="M2.64 13.39c1.068.895 1.808 2.733 1.66 4.113l.022-.196c-.147 1.384.856 2.4 2.24 2.278l-.198.016c1.387-.122 3.21.655 4.083 1.734l-.125-.154c.876 1.084 2.304 1.092 3.195.027l-.127.152c.895-1.068 2.733-1.808 4.113-1.66l-.198-.022c1.386.147 2.402-.856 2.279-2.238l.017.197c-.122-1.388.655-3.212 1.734-4.084l-.154.125c1.083-.876 1.092-2.304.027-3.195l.152.127c-1.068-.895-1.808-2.732-1.66-4.113l-.022.198c.147-1.386-.856-2.4-2.24-2.279l.198-.017c-1.387.123-3.21-.654-4.083-1.733l.125.153c-.876-1.083-2.304-1.092-3.195-.027l.127-.152c-.895 1.068-2.733 1.808-4.113 1.662l.198.02c-1.386-.147-2.4.857-2.279 2.24L4.4 6.363c.122 1.387-.655 3.21-1.734 4.084l.154-.126c-1.083.878-1.092 2.304-.027 3.195l-.152-.127z"></path><path fill="#FFF" d="M12.034 14.959L9.379 16.58c-.468.286-.746.09-.617-.449l.721-3.025-2.362-2.024c-.417-.357-.317-.681.236-.725l3.1-.249 1.195-2.872c.21-.507.55-.512.763 0l1.195 2.872 3.1.249c.547.043.657.365.236.725l-2.362 2.024.721 3.025c.128.534-.144.738-.617.449l-2.654-1.621z"></path></g></svg>
            <span>{{ scholar.professional_title[0]  }}</span>
          </div>
          <div class="UserHoverCard__infoItem" v-if="isNotEmpty(scholar.academic_title)">
            <svg viewBox="0 0 20 20" class="Icon Icon--badgeCert Icon--grey" width="16" height="16" style="height: 16px; width: 16px;"><title></title><g><g fill="none" fill-rule="evenodd"><path d="M.64 11.39c1.068.895 1.808 2.733 1.66 4.113l.022-.196c-.147 1.384.856 2.4 2.24 2.278l-.198.016c1.387-.12 3.21.656 4.083 1.735l-.125-.154c.876 1.085 2.304 1.093 3.195.028l-.127.152c.895-1.068 2.733-1.808 4.113-1.66l-.198-.022c1.386.147 2.402-.856 2.28-2.238l.016.197c-.12-1.388.656-3.212 1.735-4.084l-.154.125c1.084-.876 1.093-2.304.028-3.195l.152.127c-1.068-.895-1.808-2.732-1.66-4.113l-.022.198c.147-1.386-.856-2.4-2.24-2.28l.198-.016c-1.387.122-3.21-.655-4.083-1.734l.125.153C10.802-.265 9.374-.274 8.483.79L8.61.64c-.895 1.068-2.733 1.808-4.113 1.662l.198.02c-1.386-.147-2.4.857-2.28 2.24L2.4 4.363c.12 1.387-.656 3.21-1.735 4.084l.154-.126C-.265 9.2-.274 10.626.79 11.517L.64 11.39z" fill="#0F88EB"></path>     <path d="M7.78 13.728l-2.633-3s-.458-.704.242-1.36c.7-.658 1.327-.22 1.327-.22L8.67 11.28l4.696-4.93s.663-.35 1.3.197c.635.545.27 1.382.27 1.382s-3.467 3.857-5.377 5.78c-.98.93-1.78.018-1.78.018z" fill="#FFF"></path></g></g></svg>
            <multiple-span :data="scholar.academic_title"></multiple-span>
          </div>
        </div>
        <div class="HoverCard__item">
          <app-number-board :divider="false" :data="[{key: '成果数', name: PROFILE_NAV_TAB_FRUITS, value: scholar.fruit_count, is_hover_item: true},{key: '关注者', name: TYPE_FOLLOWER, value: scholar.follower_count, is_hover_item: true},{key: '被浏览', value: scholar.browse_count}]" @click="handleClickNumberBoard"></app-number-board>
          <div v-if="user && user.uid !== scholar.uid " class="MemberButtonGroup ProfileButtonGroup HoverCard__buttons">
            <follow-button :followee-id="scholar.uid" :is-follower="scholar.is_followed" :followee-sex="scholar.sex" @follow="handleFollow" @disfollow="handleDisfollow"></follow-button>
            <button class="Button Button--grey" @click="handleDirectToHomePage"><i class="base-icon-s-home"></i>个人主页</button>
          </div>
        </div>
      </div>
    </div>
    <span slot="reference">
      <slot></slot>
    </span>
  </base-popover>
</template>

<script>
import { GetUserV2 } from '../../../service/index'
import { PROFILE_NAV_TAB_FRUITS, TYPE_FOLLOWER } from '../../../constant'
import AppNumberBoard from '../AppNumberBoard'
import FollowButton from './FollowButton'
import MultipleSpan from './MultipleSpan'
import BounceLoading from '../../base/widget/BounceLoading'
import BasePopover from '../../base/ui/popover/main.vue'
export default {
  name: 'HoverCard',
  components: {
    AppNumberBoard,
    FollowButton,
    MultipleSpan,
    BounceLoading,
    BasePopover
  },
  data () {
    return {
      isLoading:false,
      scholar: {},
      PROFILE_NAV_TAB_FRUITS:PROFILE_NAV_TAB_FRUITS,
      TYPE_FOLLOWER:TYPE_FOLLOWER
    }
  },
  props: {
    uid: String
  },
  methods: {
    isNotEmpty (array) {
      return array && ((array.length > 0 && array.length !== 1) || (array.length === 1 && array[0]))
    },
    handleShowScholar () {
      if(this.user){
        this.isLoading = true
        let uid = this.uid === this.user.scholar_id ? this.user.uid : this.uid
        GetUserV2(uid, this.user.uid).then(response => {
          this.isLoading = false
          this.scholar = response
        })
      }else{
        this.isLoading = true
        GetUserV2(this.uid, this.uid).then(response => {
          this.isLoading = false
          this.scholar = response
        })
      }
    },
    handleDisfollow () {
      this.scholar.follower_count--
      this.$emit('disfollow',this.scholar)
    },
    handleFollow () {
      this.scholar.follower_count++
      this.$emit('follow',this.scholar)
    },
    handleDirectToHomePage () {
      this.$emit('skip','home',this.scholar)
    },
    handleClickNumberBoard  (item) {
      this.$emit('skip',item.name,this.scholar)
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '../../base/ui/style/var';
  @import '../../base/ui/style/mixins';
  .HoverCard__coverContainer {
    height: 100px;
    margin: 0 -12px;
    overflow: hidden;
    border-radius: $--border-radius-small $--border-radius-small 0 0
  }
  .HoverCard__cover {
    width: 100%;
    height: 100%;
    -o-object-fit: cover;
    object-fit: cover
  }
  .HoverCard__subtitle, .HoverCard__title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap
  }
  .HoverCard__title {
    font-size: $--font-size-medium;
    font-weight: 500;
  }
  .HoverCard__subtitle {
    margin-top: 4px;
    font-weight: 400
  }
  .HoverCard__titleContainer {
    position: relative;
    display: flex;
    padding: 8px 0;
    border-bottom: 1px solid $--background-color-base;
    align-items: center
  }
  .HoverCard__titleContainer--noAvatar {
    margin-top: 20px
  }
  .HoverCard__avatar {
    border: 2px solid $--color-white
  }
  .HoverCard__titleText {
    display: flex;
    min-height: 42px;
    padding-bottom: 2px;
    margin-left: 84px;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
    flex: 1;
    color: $--color-primary;
  }
  .HoverCard__attrInfo {
    margin-left: 10px;
    color: $--color-secondary;
    white-space: nowrap;
  }
  .HoverCard__attrInfo .Icon {
    margin-right: 8px;
  }
  .HoverCard {
    padding: 0 12px 16px;
    font-size: $--font-size-base;
    opacity: 1;
    @include transition-base(opacity);
  }
  .HoverCard--isLoading {
    opacity: 0;
  }
  .HoverCard, .HoverCard__loading {
    box-shadow: 0 5px 20px rgba(26,26,26,.1);
    background: $--color-white;
    border-radius: $--border-radius-small;
  }
  .HoverCard__container {
    width: 320px;
    max-height: 600px;
  }
  .HoverCard__loading {
    position: absolute;
    width: 120px;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
  }
  .HoverCard__loading--reversed {
    -webkit-transform: translateY(-100%);
    transform: translateY(-100%);
  }
  .HoverCard__container--large {
    width: 400px;
  }
  .HoverCard__numberBoard {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .HoverCard__buttons {
    margin-top: 16px;
    display: flex;
    justify-content: space-between;
    button {
      width: 126px;
    }
    .base-icon-s-home {
      margin-right: 5px;
    }
  }
  .HoverCard__numberGroup {
    flex: 1;
  }
  .HoverCard__boardKey {
    line-height: 1.7;
    color: $--color-secondary;
  }
  .HoverCard__boardNumber {
    margin-top: 4px;
    font-size: $--font-size-large;
    font-weight: 500;
    line-height: 1.4;
    color: $--color-primary
  }
  .HoverCard__item {
    padding: 8px 0;
    line-height: 1.75;
    border-bottom: 1px solid $--background-color-base;
  }
  .HoverCard__item:last-child {
    padding: 8px 16px;
    text-align: center;
    border: 0;
  }
  .HoverCard__item .Icon {
    margin-right: 8px;
  }
  .UserHoverCard__infoItem {
    display: flex;
    align-items: center;
  }
  .UserHoverCard__infoItem:not(:last-child) {
    margin-bottom: 8px;
  }
  .HoverCard__description {
    display: block;
    display: -webkit-box;
    max-height: 73.5px;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  .HoverCard__separate {
    color: $--border-color;
  }
</style>
<style>
  .HoverCard__popoverTarget{
    background: transparent !important;
    border:none !important;
    box-shadow: none !important;
  }
</style>