<template>
  <div style="width:100%;height:100%;overflow: auto;padding:30px;">
    <base-input v-model="year" placeholder="牛逼"></base-input>
    <XTab :actived.sync="text"></XTab>
    <annex :fileTypes="['pdf']" :maxUploadFileSize="1024 * 1024" checkPDF></annex>
    <base-input-number></base-input-number>
    <base-table
      :data="tableData"
      height="100"
      style="width: 100%">
      <base-table-column
        prop="date"
        label="日期"
        width="180">
      </base-table-column>
      <base-table-column
        prop="name"
        label="姓名"
        width="180">
      </base-table-column>
      <base-table-column
        prop="address"
        label="地址">
      </base-table-column>
    </base-table>
    <ReadableItem :readable="readable"></ReadableItem>
  </div>
</template>
<script>
import {
  WangEditor,Base64Util,Author,Institution,Annex,AuthorOrIns,DatePickerX,XTab,Keywords,AggsItemV,Cover,AuthorX,InstitutionX,XHeader,UserProfile
} from "@zkwq/business";
import wangPlugin from './wangPlugin'
import ReadableItem from '../../../packages/business/src/components/normal/readitem/ReadableItem.vue'
export default {
  name: "App",
  components: {WangEditor,Author,Institution,Annex,AuthorOrIns,DatePickerX,XTab,Keywords,AggsItemV,Cover,AuthorX,InstitutionX,XHeader,UserProfile,ReadableItem },
  data() {
    return {
      readable:{
    "attachment_id": [],
    "author": [
        "曹冬"
    ],
    "author_id": [
        "7935ebf083104433aaa939f35170bf23"
    ],
    "claim_range": [
        "全部权利"
    ],
    "claim_way": "原始取得",
    "cn_type": "软件著作权",
    "date": "2023-06-13",
    "id": "6d610cae0f14838d19fe7a0c4e1f85fe",
    "institution": [
        "中国科学院生态环境研究中心"
    ],
    "institution_id": [
        "f186913eb04e34bc24ce23f8400fdc28"
    ],
    "permission": 4,
    "registration_number": "2023SR0637425",
    "relation": [
        [
            "中国科学院生态环境研究中心"
        ]
    ],
    "source_list": [
        "neweditsoftware",
        "ins-knowledge-base—data",
        "pub-scholar-data",
        "ins-knowledge-f186913eb04e34bc24ce23f8400fdc28"
    ],
    "title": "白酒有机组分高分辨质谱分子式分析软件[简称BJMSFA]",
    "type": "software"
},
      tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }],
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