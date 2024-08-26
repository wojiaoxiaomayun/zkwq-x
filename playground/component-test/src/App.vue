<template>
  <div style="width:100%;height:100%;overflow: auto;padding:30px;">
    <base-input v-model="year" placeholder="牛逼"></base-input>
    <XTab :actived.sync="text"></XTab>
    <annex :fileTypes="['pdf']" :maxUploadFileSize="1024 * 1024" checkPDF></annex>
  </div>
</template>
<script>
import {
  WangEditor,Base64Util,Author,Institution,Annex,AuthorOrIns,DatePickerX,XTab,Keywords,AggsItemV,Cover,AuthorX,InstitutionX,XHeader,UserProfile
} from "@zkwq/business";
import wangPlugin from './wangPlugin'

export default {
  name: "App",
  components: {WangEditor,Author,Institution,Annex,AuthorOrIns,DatePickerX,XTab,Keywords,AggsItemV,Cover,AuthorX,InstitutionX,XHeader,UserProfile },
  data() {
    return {
      tags:[],
      text:'菜单2',
      year:0,
      info:{"authors":[],"inss":[{"id":"26756bd7d530ff97374ae09ae8a0317a","name":"中国科学院文献情报中心"}]},
      author:{
        id:'',
        name:'',
        institution:'',
        email:'',
        avatar:''
      },
      ins:{
        id:'',
        name:'',
        logo:''
      },
      rules:{
        name: [
          { required: true, message: '请输入活动名称', trigger: ['blur'] }
        ]
      }
    };
  },
  watch:{
    tags:function(newVal){
      console.log(newVal)
    }
  },
  mounted() {
    this.$notify({
          title: '提示',
          message: '这是一条不会自动关闭的消息',
          duration: 0
        });
    console.log(Base64Util.isValid('中国'))
    console.log(Base64Util.isValid('c2VsZWN0ICogZnJvbSB0X29kc19sYXNfbnN0bF92YWx1ZV9zdXBwbGVtZW50X3Y1IHdoZXJlIHN1cHBsZW1lbnRfdXBsb2FkZXItaWQgPSAnMWEyMzIxMjA3MjE4NDgyYmEyMjdkYTA0MmRjZmE2MGMnICBhbmQgc3VwcGxlbWVudF9maWxlLXR5cGUgPSAnb3RoZXInICBhbmQgc3RhdHVzID0gJ05PUk1BTCcgYW5kIHNvdXJjZSA9ICdtaWNyb2RhdGEnIG9yZGVyIGJ5IHRpbWVfY3JlYXRlIGRlc2MgbGltaXQgMCw5'))
    setTimeout(() => {
      this.text = '菜单1'
    },5000)
  },
  methods: {
    wangPlugin,
    aggChange(value){
      console.log(value)
    },
    insChange(info){
      console.log(info)
    }
  },
};
</script>
<style scoped lang="scss">
@import "@zkwq/business/dist/var.scss";

.text {
  color: $--color-primary-light-2;
  background: $--color-primary;
}
</style>