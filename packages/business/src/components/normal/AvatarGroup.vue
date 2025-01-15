<template>
  <div class="Avatar__group" ref="AvatarGroup">
    <div class="Avatar__wrap" v-for="item,index in newAvatars" :key="'avatar' + index" @click="$emit('click',index)">
      <Avatar :url="item" :size="size" :round="round" ></Avatar>
      <div v-if="index == newAvatars.length - 1 && urls.length - max > 0" class="Avatar__mask">
        +{{urls.length - max}}
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from './Avatar.vue'
export default {
  name: 'AvatarGroup',
  components:{Avatar},
  mounted(){
    this.initCssVar();
  },
  methods:{
    initCssVar(){
      this.$refs.AvatarGroup.style.setProperty('--avatar-size',this.size + 'px')
      this.$refs.AvatarGroup.style.setProperty('--avatar-wrap-radius',this.round?(this.size + 'px'):'0px')
    }
  },
  computed:{
    newAvatars(){
      return this.urls.slice(0,this.max)
    }
  },
  props: {
    urls: {
      type: Array,
      default:() => {
        return []
      }
    },
    size:{
      type:Number,
      default:40
    },
    round:{
      type:Boolean,
      default:false
    },
    max:{
      type:Number,
      default:3
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../base/ui/style/var";
  .Avatar__group{
    display: flex;
    padding: 0px 10px;
    .Avatar__wrap{
      border:1px solid $--color-primary;
      border-radius: var(--avatar-wrap-radius);
      width: fit-content;
      height: fit-content;
      transition: all .3s ease-in-out;
      position: relative;
      z-index: 2;
      cursor: pointer;
      &:hover{
        transform: translateX(calc(-1 * var(--avatar-size) / 4));
      }
      .Avatar__mask{
        position: absolute;
        width: var(--avatar-size);
        height: var(--avatar-size);
        border-radius: var(--avatar-size);
        top: 0px;
        left: 0px;
        background: rgba(0,0,0,.6);
        z-index: 5;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 16px;
        
      }
    }
    .Avatar__wrap:not(:first-child){
      margin-left: calc(-1 * var(--avatar-size) / 2);
    }
    
  }
</style>