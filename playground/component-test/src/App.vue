<template>
  <div style="width:100%;height:100%;overflow: auto;padding:30px;">
    <!-- <base-input v-model="year" placeholder="牛逼"></base-input>
    <XTab :actived.sync="text"></XTab>
    <annex :fileTypes="['pdf']" :maxUploadFileSize="1024 * 1024" checkPDF></annex>
    <base-input-number></base-input-number> -->
    <hover-card @skip="handleSkip" :uid="'1a2321207218482ba227da042dcfa60c'" :user='{"birthday":"","city":"","research_field":[],"academic_experiences_v2":[],"follower_count":0,"is_super_manager":false,"honors":[],"scholar_id":"6ce4756c71ac423496b28e61e7c01fc3","social_experiences":[],"home_page":"","institution":"机构_plinnmgdxg","uid":"6ce4756c71ac423496b28e61e7c01fc3","followee_count":0,"province":"","academic_experiences":[],"affiliation":["机构_plinnmgdxg"],"partisan":"","browse_count":0,"tag":[],"classification_cnnace_number":[],"department":[null],"headline":"","address":"","education_experiences":[],"is_authorized":0,"is_academician":false,"sex":"","fruit_count":0,"mobile":"19291096364","orcid":"","avatar":"","biography":"","academic_title":[],"classification":[],"sync":1,"collect_count":0,"classification_cnnace":[],"external_link":["6ce4756c71ac423496b28e61e7c01fc3"],"token":"yong-hu-_ahdwhjyz3l","employment_experiences":[{"institution":["机构_plinnmgdxg"],"uid":"6ce4756c71ac423496b28e61e7c01fc3","employ_start_date":[""],"employ_end_date":[""],"position":[""],"department":[null],"professional_title":[""]}],"question_count":0,"share_count":0,"country_code":"86","wosReasearcherId":"","awards":[],"name":"用户_ahdwhjyz3l","classification_number":[],"id":"6ce4756c71ac423496b28e61e7c01fc3"}'>
        <base-button>这是一个hover-card</base-button>
    </hover-card>
    <readable-item :readable="readable" authorHover @skip="handleSkip"></readable-item>
    <!-- <base-table
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
    <div style="background:white;padding: 16px;">
      <ReadableItem :readable="readable"></ReadableItem>
    </div>
    <author-x cstr orcid></author-x>

    <circle-translate-button :model="model" horizontal></circle-translate-button>
    <div id="cifDom" style="width:800px;height:600px;"></div> -->
  </div>
</template>
<script>
import {
  WangEditor,Base64Util,AuthorX,Institution,Annex,AuthorOrIns,CircleTranslateButton,ImageViewer
} from "@zkwq/business";
import wangPlugin from './wangPlugin'
import CrystVis from 'crystvis-js';
import HoverCard from '../../../packages/business/src/components/normal/hovercard/HoverCard.vue';
import ReadableItem from '../../../packages/business/src/components/normal/readitem/ReadableItem.vue';


export default {
  name: "App",
  components: {WangEditor,AuthorX,Institution,Annex,AuthorOrIns,CircleTranslateButton,ReadableItem,ImageViewer,HoverCard },
  data() {
    return {
      readable:{
        title_translated:"aa",
        abstracts_translated:"aa",
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
    "cn_type": "期刊论文",
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
    "type": "article",
    "keywords":['人生']
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
      model:{
        title:"Magnificent tensile strength and ductility synergy in a NiCoCrAlTi high-entropy alloy at elevated temperature",
        abstracts:"The study reported a novel L1 2 -strengthening NiCoCrAlTi high-entropy alloy (HEA) with an outstanding synergy of tensile strength and ductility at both ambient and high temperatures. The HEA was prepared by arc melting and cold-rolling, followed by isothermal aging at designed precipitation temperatures to achieve coexistence of recrystallized and non-recrystallized grains. Transmission electron microscopy (TEM) characterization revealed a high density of rod-like and spheroidal L1 2 precipitates distributing in the micro 2 precipitates, including the shearing and blocking effects, was frequently observed, contributing to the high tensile strength. Thus, the extremely high tensile strength and sustained ductility at 600°C mainly originate from the cooperation among interaction between L1 2 precipitation and dislocations and extensive SFs, DTs, immobile Lomer-Cottrell (L-C) locks formed from interactions between SFs and SFs",
      },
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
    // this.$notify({
    //       title: '提示',
    //       message: '这是一条不会自动关闭的消息',
    //       duration: 0
    //     });
    // console.log(Base64Util.isValid('中国'))
    // console.log(Base64Util.isValid('c2VsZWN0ICogZnJvbSB0X29kc19sYXNfbnN0bF92YWx1ZV9zdXBwbGVtZW50X3Y1IHdoZXJlIHN1cHBsZW1lbnRfdXBsb2FkZXItaWQgPSAnMWEyMzIxMjA3MjE4NDgyYmEyMjdkYTA0MmRjZmE2MGMnICBhbmQgc3VwcGxlbWVudF9maWxlLXR5cGUgPSAnb3RoZXInICBhbmQgc3RhdHVzID0gJ05PUk1BTCcgYW5kIHNvdXJjZSA9ICdtaWNyb2RhdGEnIG9yZGVyIGJ5IHRpbWVfY3JlYXRlIGRlc2MgbGltaXQgMCw5'))
    // setTimeout(() => {
    //   this.text = '菜单1'
    // },5000)
    // this.initCif()
  },
  methods: {
    handleSkip(type,scholar){
      console.log('skip',type,scholar)
    },
    handleImgLoad(e){
      console.log(e,index)
    },
    wangPlugin,
    aggChange(value){
      console.log(value)
    },
    insChange(info){
      console.log(info)
    },
    initCif(){
      const visualizer = new CrystVis('#cifDom', 800, 600)
      var loaded = visualizer.loadModels(`# generated using pymatgen
data_Be2TcPt
_symmetry_space_group_name_H-M   'P 1'
_cell_length_a   9.30950095
_cell_length_b   9.30950095
_cell_length_c   9.30950095
_cell_angle_alpha   124.42408402
_cell_angle_beta   118.66288828
_cell_angle_gamma   87.42259484
_symmetry_Int_Tables_number   1
_chemical_formula_structural   Be2TcPt
_chemical_formula_sum   'Be2 Tc1 Pt1'
_cell_volume   554.72716257
_cell_formula_units_Z   1
loop_
 _symmetry_equiv_pos_site_id
 _symmetry_equiv_pos_as_xyz
  1  'x, y, z'
loop_
 _atom_site_type_symbol
 _atom_site_label
 _atom_site_symmetry_multiplicity
 _atom_site_fract_x
 _atom_site_fract_y
 _atom_site_fract_z
 _atom_site_occupancy
  Be  Be0  1  0.00000000  0.26132300  0.26132300  1
  Be  Be1  1  0.00000000  0.73867700  0.73867700  1
  Tc  Tc2  1  0.00000000  0.00000000  0.00000000  1
  Pt  Pt3  1  0.00000000  0.50000000  0.50000000  1`);
console.log('Models loaded: ', loaded);
visualizer.displayModel(loaded[0])
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