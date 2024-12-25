<template>
  <div @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave" class="FollowButton__container">
    <base-button :type="followed?'info':'primary'" :size="size" class="FollowButton" @click="handleFollow"><i v-if="!followed" class="base-icon-plus"></i>{{ followButtonText }}</base-button>
  </div>
</template>

<script>
import { Follow, Disfollow } from '../../../service/follow'
import BaseButton from '../../base/ui/button/Button.vue'
export default {
  name: 'FollowButton',
  components: {
    BaseButton
  },
  data () {
    return {
      text: '关注',
      followed: false,
      sex: ''
    }
  },
  props: {
    followeeId: String,
    followeeSex: {
      type: String,
      default: ''
    },
    isFollower: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'medium'
    }
  },
  computed: {
    followButtonText: {
      get: function () {
        if (this.followed) {
          return this.text
        } else {
          return this.text + this.sexText
        }
      },
      set: function (newValue) {
        this.text = newValue
      }
    },
    sexText () {
      if (this.followeeSex) {
        if (this.followeeSex === '女') {
          return '她'
        } else if (this.followeeSex === '男') {
          return '他'
        }
      }
      return ''
    }
  },
  methods: {
    handleFollow () {
      if (!this.followed) {
        Follow(this.followeeId, this.user.uid,this.applicationId || this.appid || '').then(() => {
          this.followed = true
          this.followButtonText = '已关注'
          this.$emit('follow')
        })
      } else {
        Disfollow(this.followeeId, this.user.uid,this.applicationId || this.appid || '').then(() => {
          this.followed = false
          this.followButtonText = '关注'
          this.$emit('disfollow')
        })
      }
    },
    handleMouseEnter () {
      if (this.followed) {
        this.followButtonText = '取消关注'
      }
    },
    handleMouseLeave () {
      if (this.followed) {
        this.followButtonText = '已关注'
      }
    },
    changeFollow () {
      if (this.followed) {
        this.followed = false
        this.followButtonText = '关注'
      } else {
        this.followed = true
        this.followButtonText = '已关注'
      }
    }
  },
  created () {
    if (!this.followeeSex) {
      this.followeeSex = ''
    }
    if (!this.isFollower) {
      this.followed = false
      this.followButtonText = '关注'
    } else {
      this.followed = true
      this.followButtonText = '已关注'
    }
  }
}
</script>
<style lang="scss" scoped>
  .FollowButton__container {
    min-width: 106px;
    .base-icon-plus {
      margin-right: 5px;
      font-weight: 600;
    }
  }
  .FollowButton {
    min-width: 106px;
  }
  .HoverCard__buttons .FollowButton__container {
    width: 126px;
  }
  .HoverCard__buttons .FollowButton {
    width: 126px;
  }
</style>
