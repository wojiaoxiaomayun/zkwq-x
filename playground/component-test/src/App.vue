<template>
  <div style="width:100%;height:100%;overflow: auto;padding:30px;">
    <div style="width:300px;">
      <XTab vertical></XTab>
      <Cover :userId="'test-user-id'" v-model="coverImg" fullUrl></Cover>
      <readable-item-plain :readable="readable"></readable-item-plain>
      <!-- <AggsItemV :title="'aa'" :datas="[{key:'a',value:10},{key:'b',value:11}]"></AggsItemV> -->
    </div>
    <!-- <base-input v-model="year" placeholder="牛逼"></base-input>
    <XTab :actived.sync="text"></XTab>
    <annex :fileTypes="['pdf']" :maxUploadFileSize="1024 * 1024" checkPDF></annex>
    <base-input-number></base-input-number> -->
<!-- <annex :fileTypes="['pdf']" :maxUploadFileSize="1024 * 1024" checkPDF @change="handleChange"></annex>
<base-select multiple v-model="selectedOptions" placeholder="请选择" showLabel="false">
  <base-option value="1">选项1</base-option>
  <base-option value="2">选项2</base-option>
</base-select>
<app-dialog ref="dialog" width="900px" staticDialog dialogTitle="认领学者身份" originTitle :zIndex="3000"  custom-class="claim-same-name-wrapper">

</app-dialog> -->
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
    

    <circle-translate-button :model="model" horizontal></circle-translate-button>
    <div id="cifDom" style="width:800px;height:600px;"></div> -->
    <!-- <author-x CorrespondingAuthor cstr orcid></author-x> -->
    <!-- <AvatarGroup :urls="['https://pubscholar.cn/files?fastdfspath=group2/M00/82/4A/CgMLEGVUuK-Aa7L1AABn8KVnX9s6549777','https://pubscholar.cn/files?fastdfspath=group2/M00/82/4A/CgMLEGVUuK-Aa7L1AABn8KVnX9s6549777']"></AvatarGroup> -->
    <!-- <base-date-picker
        v-model="dateRange"
        @change="changeDateRange"
        type="daterange"
        value-format="yyyy-MM-dd"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"> 
      </base-date-picker> -->
      <!-- <CaptchaDialog ref="captcha"></CaptchaDialog> -->
  </div>
</template>
<script>
import {
  WangEditor,Base64Util,Institution,Annex,AuthorOrIns,CircleTranslateButton,ImageViewer,AvatarGroup,XTab,AppDialog,Cover
} from "@zkwq/business";
import wangPlugin from './wangPlugin'
import CrystVis from 'crystvis-js';
import HoverCard from '../../../packages/business/src/components/normal/hovercard/HoverCard.vue';
import ReadableItem from '../../../packages/business/src/components/normal/readitem/ReadableItem.vue';
import AuthorX from '../../../packages/business/src/components/normal/AuthorX.vue'
import AggsItemV from '../../../packages/business/src/components/normal/AggsItemV.vue';
import ReadableItemPlain from "@zkwq/business/src/components/normal/readitem/ReadableItemPlain.vue";
export default {
  name: "App",
  components: {
    ReadableItemPlain,
    WangEditor,AuthorX,Institution,Annex,AuthorOrIns,CircleTranslateButton,ReadableItem,ImageViewer,HoverCard,AvatarGroup,AggsItemV,XTab,AppDialog,Cover},
  data() {
    return {
      selectedOptions: [],
      coverImg: '',
      dateRange:[],
      fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
      readable: {
        "abstracts": "N-methyl-d-aspartate receptors (NMDARs) are glutamate-gated ion channels that mediate excitatory neurotransmission throughout the brain1. As obligate heterotetramers, their activation requires the binding of both glycine and glutamate2. Although recent structural studies have provided insights into endogenous receptors from select brain regions3, most previous work has relied on recombinant receptors and engineered constructs, which limits our understanding of native NMDARs across the whole brain. Here we identify and resolve ten distinct native NMDAR assemblies from the whole-brain tissue of female C57BL/6 mice using immunoaffinity purification, single-molecule total internal reflection fluorescence microscopy and cryo-electron microscopy. Analyses of the GluN1–GluN2A(S1), GluN1–GluN2A(S2), GluN1–GluN2A(S3), GluN1–GluN2B, GluN1–GluN2A–GluN2B(S1), GluN1–GluN2A–GluN2B(S2), GluN1–GluN2A–GluNX(S1), GluN1–GluN2A–GluNX(S2), GluN1–GluN2B–GluNX and GluN1–GluNX structures reveal that GluN2A is the most prevalent subunit across assemblies. Moreover, the substantial conformational flexibility observed in the GluN2A amino-terminal domain may explain its fast kinetics and dominant role in gating. Dynamic movements ofS-ketamine were also captured at the channel vestibule, as was pore dilation in both the GluN1 and GluN2B subunits of a native GluN1–GluN2B receptor. The latter observation represents a previously unknown fully open state of NMDAR. Our large collection of heterogeneous NMDAR structures from whole brain reveals previously unrecognized properties of conformational diversity and channel dilation.",
          "abstracts_abbreviation": "N-methyl-d-aspartate receptors (NMDARs) are glutamate-gated ion channels that mediate excitatory neurotransmission throughout the brain1. As obligate heterotetramers, their activation requir...",
          "article_type": "期刊论文",
          "attachments": [],
          "author": [
        "Xu, Ruisheng",
        "Jiang, Qiqi",
        "Xu, Hongwei",
        "Zhang, Lu",
        "Hu, Xiangzi",
        "Lu, Zizhuo",
        "Deng, Huaqin",
        "Xiong, Haolin",
        "Zhang, Sensen",
        "Chen, Zhongwen",
        "Ge, Yifan",
        "Zhu, Zhengjiang",
        "Zhang, Yaoyang",
        "Chen, Yelin",
        "Ge, Jingpeng",
        "Yu, Jie"
      ],
          "author_id": [
        "65baab6a0d431498c58ad7057da637e6",
        "793777fc49fd667901abc745d32f297a",
        "c60709a5cfbf9c99a40806c007261890",
        "85d15d7c693648a1ab805b45c2fbca88",
        "34581f09a483216992eb53106ef61740",
        "4b3f4cc6cbd9bd86d4a3df21880d10e5",
        "bac39a8c668c98ea109f1c84296897c5",
        "9c5a101df033a210bb7c10dcabfdf985",
        "a9d90af4c19e41e211328e4d019bb1b3",
        "4b160766f76ad8b0f13d5e7dda2ddcbd",
        "69578a5e7d6a1c626bd96b8ed72887d4",
        "ac7d8e7bd954092bd177909ef7f9fca6",
        "6b893bc5a8220a630152bfe6175a8249",
        "76c097ad2e1539f51efc47184e9f2b85",
        "c47f2e5785459757f009a12bac0c58f5",
        "3338910a940a278b7148e221d4dd5cb3"
      ],
          "authors": [
        {
          "institution": [
            "未知"
          ],
          "is_corresponding_author": false,
          "name": "Xu, Ruisheng"
        },
        {
          "institution": [
            "未知"
          ],
          "is_corresponding_author": false,
          "name": "Jiang, Qiqi"
        },
        {
          "institution": [
            "未知"
          ],
          "is_corresponding_author": false,
          "name": "Xu, Hongwei"
        },
        {
          "institution": [
            "未知"
          ],
          "is_corresponding_author": false,
          "name": "Zhang, Lu"
        },
        {
          "institution": [
            "未知"
          ],
          "is_corresponding_author": false,
          "name": "Hu, Xiangzi"
        },
        {
          "institution": [
            "未知"
          ],
          "is_corresponding_author": false,
          "name": "Lu, Zizhuo"
        },
        {
          "institution": [
            "未知"
          ],
          "is_corresponding_author": false,
          "name": "Deng, Huaqin"
        },
        {
          "institution": [
            "未知"
          ],
          "is_corresponding_author": false,
          "name": "Xiong, Haolin"
        },
        {
          "institution": [
            "未知"
          ],
          "is_corresponding_author": false,
          "name": "Zhang, Sensen"
        },
        {
          "institution": [
            "未知"
          ],
          "is_corresponding_author": false,
          "name": "Chen, Zhongwen"
        },
        {
          "institution": [
            "未知"
          ],
          "is_corresponding_author": false,
          "name": "Ge, Yifan"
        },
        {
          "institution": [
            "未知"
          ],
          "is_corresponding_author": false,
          "name": "Zhu, Zhengjiang"
        },
        {
          "institution": [
            "未知"
          ],
          "is_corresponding_author": false,
          "name": "Zhang, Yaoyang"
        },
        {
          "institution": [
            "未知"
          ],
          "is_corresponding_author": false,
          "name": "Chen, Yelin"
        },
        {
          "institution": [
            "未知"
          ],
          "is_corresponding_author": false,
          "name": "Ge, Jingpeng"
        },
        {
          "institution": [
            "未知"
          ],
          "is_corresponding_author": false,
          "name": "Yu, Jie"
        }
      ],
          "browse_count": 467,
          "cn_type": "论文",
          "cstr": "",
          "date": "2026-02-11",
          "degree": "",
          "doi": "10.1038/s41586-026-10139-w",
          "extendEntity": {
        "title-repeated": "conformationaldiversityandfullyopeningmechanismofnativenmdareceptor",
            "wos-category-llm": [
          "NEUROSCIENCES",
          "BIOCHEMISTRY & MOLECULAR BIOLOGY",
          "BIOTECHNOLOGY & APPLIED MICROBIOLOGY"
        ],
            "journal-repeated": "nature",
            "article-id": [
          "2c35ecec05d7f7f49b1ae5b147d08573",
          "10.1038/s41586-026-10139-w"
        ],
            "project_name": [],
            "base_project": [],
            "classification_bg": [],
            "article-id-type": [
          "kjtt_journalarticleID",
          "doi"
        ],
            "is_high_level": "",
            "contrib_institution": [
          [
            "未知"
          ]
        ],
            "article_legal_status": "",
            "is_use_headline": [],
            "is_financial_support_project": "",
            "is_cas_representative": "",
            "base_subject": [],
            "datasource-link": [
          "KJTT_JournalArticle:https://www.nature.com/articles/s41586-026-10139-w"
        ]
      },
        "first_page": "1",
          "graduation_institution": [],
          "id": "466024a9f12af22c3d38c0920b260137",
          "is_free": false,
          "issue": "",
          "keywords": [
        "Calcium channels",
        "Cryoelectron microscopy",
        "Ion channels in the nervous system"
      ],
          "last_page": "10",
          "license": "",
          "links": [
        {
          "is_open_access": false,
          "name": "其他来源",
          "url": "https://www.nature.com/articles/s41586-026-10139-w"
        }
      ],
          "local_links": [],
          "major": "",
          "school": [],
          "semantic_entities": {},
        "source": "Nature",
          "source_list": [
        "KJTT_JournalArticle",
        "pubscholar_running",
        "chuNeng_journal_article",
        "neweditarticle"
      ],
          "title": "Conformational diversity and fully opening mechanism of native NMDA receptor",
          "tutor": [],
          "type": "article",
          "volume": "",
          "year": 2026
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
  },
  methods: {
    handleChange(files,index,file){
      console.log(files,index,file)
      window.myFile = file
    },
    changeDateRange(){
      console.log(this.dateRange)
    },
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