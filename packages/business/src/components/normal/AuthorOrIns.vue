<template>
  <div class="Author__warp">
    <base-radio-group v-model="showStatus" style="margin-bottom: 15px" size="mini">
      <base-radio-button label="author">{{personText}}</base-radio-button>
      <base-radio-button label="ins">{{insText}}</base-radio-button>
    </base-radio-group>
    <author-x v-show="showStatus == 'author'" v-model="newData.authors" :text="personText" v-bind="$attrs"></author-x>
    <institution v-show="showStatus == 'ins'" v-model="newData.inss" :text="insText" v-bind="$attrs"></institution>
  </div>
</template>

<script>
import BaseRadioButton from "../base/ui/radio/radio-button";
import BaseRadioGroup from "../base/ui/radio/radio-group";
import AuthorX from './AuthorX.vue'
import Institution from './InstitutionX.vue'
export default {
  name:'AuthorOrIns',
  components: { AuthorX, Institution,BaseRadioButton,BaseRadioGroup },
  data(){
    return {
      newData:{
        authors:[],
        inss:[]
      },
      showStatus:'author',
      isMeUpdate:false,
      isPropUpdate:false,
    }
  },
  props:{
    data:{
      type:Object,
      default:() => {
        return {
          authors:[],
          inss:[]
        }
      }
    },
    personText:{
      type:String,
      default:'作者'
    },
    insText:{
      type:String,
      default:'机构'
    }
  },
  model:{
    prop:'data',
    event:'update:data'
  },
  watch:{
      data:{
          handler:function(newVal){
            if(!this.isMeUpdate){
              this.isPropUpdate = true
              this.newData = newVal
            }else{
                this.isMeUpdate = false
            }
            if((newVal.authors && newVal.authors.length>0) && (!newVal.inss || newVal.inss.length==0)){
              this.showStatus = 'author'
            }else if ((!newVal.authors || newVal.authors.length==0) && (newVal.inss && newVal.inss.length>0)){
              this.showStatus = 'ins'
            }else{
              this.showStatus = 'author'
            }
          },
          deep:true,
          immediate:true
      },
      newData:{
        handler:function(newVal){
          if(!this.isPropUpdate){
            this.isMeUpdate = true
            this.$emit('update:data',newVal)
          }else{
            this.isPropUpdate = false;
          }
        },
        deep:true,
        immediate:true
      }
  }
}
</script>

<style lang="scss" scoped>
  // .Author__warp{
  //   width: ;
  // }
</style>