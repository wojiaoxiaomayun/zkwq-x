<template>
  <div class="Menu__warp">
    <div ref="Menu__item" class="Menu__item" :class="{'Menu__item--actived':item.value == newActived,'Menu__item--disabled':item.disabled}" v-for="item,index in data" :key="'xmenu' + index" @click="item.disabled?'':changeTab(item.value,true)">
      <slot :item="item">
        {{item.name}}
      </slot>
    </div>
    <div ref="actived" class="actived"></div>
  </div>
</template>

<script>
export default {
  name:'XTab',
  data(){
    return {
      newActived:''
    }
  },
  props:{
    data:{
      type:Array,
      default:() => [{name:'菜单1',value:'菜单1'},{name:'菜单2',value:'菜单2'}]
    },
    actived:String
  },
  watch:{
    actived:function(newVal){
      this.changeTab(newVal || this.data[0].value)
    }
  },
  mounted(){
    this.changeTab(this.actived || this.data[0].value)
    // 创建一个Intersection Observer实例
    let _this = this;
    let observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // 当元素进入视图时触发的代码
          if(_this.$refs.actived.style.width == 0 || _this.$refs.actived.style.width == '0px'){
            _this.changeTab(_this.actived || _this.data[0].value)
          }
        }
      });
    });
    // 选择你想要观察的元素
    let target = this.$refs.actived;
    // 使用observer观察目标元素
    observer.observe(target);
  },
  methods:{
    changeTab(value,isUpdate = false){
      let index = this.data.findIndex(e => e.value == value)
      let dom = this.$refs['Menu__item'][index];
      let width = dom.scrollWidth;
      let left = dom.offsetLeft;
      this.$refs.actived.style.width = width + 'px';
      this.$refs.actived.style.left = left + 'px';
      this.newActived = value;
      if(isUpdate){
        this.$emit('update:actived',value)
        this.$emit('change',value)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../base/ui/style/var.scss';
  .Menu__warp{
    width: auto;
    height: auto;
    overflow: hidden;
    background: #e4edf6;
    display: flex;
    font-size: 13px;
    border-radius: 4px;
    //gap: 12px;
    position: relative;
    .Menu__item{
      width: auto;
      height: 100%;
      padding: 8px 16px;
      z-index: 2;
      cursor: pointer;
      transition: all .5s;
      &:hover{
        opacity: .7;
      }
    }
    .Menu__item--actived{
      color: white;
    }
    .Menu__item--disabled{
      cursor: not-allowed;
    }
    .actived{
      position: absolute;
      height: 100%;
      background: $--color-primary;
      top: 0px;
      transition: all .5s;
      border-radius: 4px;
    }
  }
</style>