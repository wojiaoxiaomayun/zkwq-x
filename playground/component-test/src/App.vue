<template>
  <div style="width:100%;height:100%;overflow: auto;padding:30px;">
    <div style="width:300px;">
      <XTab vertical></XTab>
      <Cover :userId="'test-user-id'" v-model="coverImg" fullUrl></Cover>
      <readable-item-plain :readable="readable"></readable-item-plain>
      <base-tabs v-model="activeName" @tab-click="handleClick">
    <base-tab-pane label="用户管理" name="first">用户管理</base-tab-pane>
    <base-tab-pane label="配置管理" name="second">配置管理</base-tab-pane>
    <base-tab-pane label="角色管理" name="third">角色管理</base-tab-pane>
    <base-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</base-tab-pane>
  </base-tabs>
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
   <!--  <div style="background:white;padding: 16px;">
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
            "abstracts": "Compression garments are used by athletes for post-exercise recovery and injury prevention, yet their effectiveness depends on the interaction between textile properties, garment construction, and user-specific biomechanics. Despite growing participation of women in collegiate sports, few studies have examined recovery-focused compression engineered specifically for female athletes. This pilot investigation combined user-centered design methodology with textile performance testing to develop and evaluate a hamstring compression sleeve for female NCAA athletes. Survey data from competitive athletes (N = 34) identified durability, stretch, and thermal comfort as primary design priorities. Five candidate fabrics were evaluated for thickness, mass, elongation, and air permeability, leading to selection of a spacer knit fabric that provided high extensibility with sufficient stability for localized compression. A prototype sleeve incorporating elastomeric striping aligned with hamstring musculature was produced and evaluated during four repeated sprint testing sessions with NCAA athletes (N = 8). Functional performance measures included isometric strength, jump performance, and power output, alongside perceived soreness and wearability assessments. No statistically significant differences were detected between the compression and control limbs across biomechanical performance variables. However, participants consistently reported positive perceptions related to comfort, usability, and recovery support. These findings suggest that perceived benefits of compression garments may not always be reflected into short-term performance metrics, but remain relevant to athlete experience. The study demonstrates the feasibility of integrating textile engineering, garment design, and athlete feedback within a single development process and provides a framework for future optimization of compression systems tailored to female athletic populations.",
            "abstracts_abbreviation": "Compression garments are used by athletes for post-exercise recovery and injury prevention, yet their effectiveness depends on the interaction between textile properties, garment constructio...",
            "article_type": "期刊论文",
            "attachment_id": [],
            "author": [
                "Megivern, Sarah",
                "Gorea, Adriana"
            ],
            "author_name": [
                [
                    "Megivern, Sarah"
                ],
                [
                    "Gorea, Adriana"
                ]
            ],
            "author_v2": [
                {
                    "author_index": 1,
                    "institutions": [
                        {
                            "name": "特拉华大学"
                        }
                    ],
                    "is_corresponding_author": false,
                    "name": "Megivern, Sarah"
                },
                {
                    "author_index": 2,
                    "institutions": [
                        {
                            "name": "特拉华大学"
                        }
                    ],
                    "is_corresponding_author": false,
                    "name": "Gorea, Adriana"
                }
            ],
            "authors": [
                {
                    "author_index": 1,
                    "institutions": [
                        {
                            "name": "Fashion and Apparel Studies Department, University of Delaware, Newark, USA"
                        }
                    ],
                    "is_corresponding_author": false,
                    "name": "Megivern, Sarah"
                },
                {
                    "author_index": 2,
                    "institutions": [
                        {
                            "name": "Fashion and Apparel Studies Department, University of Delaware, Newark, USA"
                        }
                    ],
                    "is_corresponding_author": false,
                    "name": "Gorea, Adriana"
                }
            ],
            "cn_type": "论文",
            "collections": [],
            "corresponding_author": [
                false,
                false
            ],
            "create_time": "2026-05-13 10:01:35",
            "date": "2026-05-12",
            "doi": "10.1186/s40691-026-00471-0",
            "equal_first_author": [
                false,
                false
            ],
            "extend_entity": {
                "article-id": [
                    "4e513f85e161914139055ed40912b5fb"
                ],
                "project_name": [],
                "wos-category-cn": [
                    {
                        "category": [
                            "材料科学☋材料科学（纺织品）"
                        ],
                        "group": "材料科学"
                    }
                ],
                "is_use_headline": [],
                "ai_news": {
                    "comprehensive_score": [
                        68
                    ],
                    "importance": [
                        41
                    ],
                    "relevance": [
                        80
                    ]
                },
                "base_subject": [],
                "datasource-link": [
                    "KJTT_JournalArticle:https://fashionandtextiles.springeropen.com/article/10.1186/s40691-026-00471-0"
                ],
                "title-repeated": "addressinghamstringmusclesorenessinfemalencaaathletesdesignandevaluationofausercenteredcompressionsleeveforrecovery",
                "wos-category-llm": [],
                "journal-repeated": "fashionandtextiles",
                "base_project": [],
                "classification_bg": [],
                "article-id-type": [
                    "kjtt_journalarticleID"
                ],
                "contrib_institution": [
                    [
                        "特拉华大学"
                    ]
                ],
                "wos-category": [
                    {
                        "category": [
                            "Materials Science☋MATERIALS SCIENCE, TEXTILES"
                        ],
                        "group": "Materials Science"
                    }
                ]
            },
            "first_page": "21",
            "free": false,
            "id": "79f733854fe6327b8488de18db44750d",
            "impact_factor": "2.3",
            "institution": [
                "Fashion and Apparel Studies Department, University of Delaware, Newark, USA"
            ],
            "is_representativeWork": false,
            "issn": "2198-0802",
            "issue": 1,
            "journal_title": "Fashion and Textiles",
            "lang": "E",
            "link": "https://fashionandtextiles.springeropen.com/article/10.1186/s40691-026-00471-0",
            "links": [
                {
                    "is_authorized": false,
                    "login_url": "KJTT_JournalArticle",
                    "name": "其他来源",
                    "url": "https://fashionandtextiles.springeropen.com/article/10.1186/s40691-026-00471-0"
                }
            ],
            "local_links": [
                "https://file.scholarin.cn/preview2?file=editor_cj_d7e98e506c4bf76602a6f71382c9bd42.pdf"
            ],
            "permission": 4,
            "publish_year": "2026",
            "publisher": "Springer Nature Singapore",
            "relation": [
                [
                    "Fashion and Apparel Studies Department, University of Delaware, Newark, USA"
                ],
                [
                    "Fashion and Apparel Studies Department, University of Delaware, Newark, USA"
                ]
            ],
            "relation_index": [
                [
                    "0"
                ],
                [
                    "0"
                ]
            ],
            "research_field": [],
            "source": "Fashion and Textiles",
            "source_list": [
                "KJTT_JournalArticle",
                "pubscholar_running"
            ],
            "title": "Addressing hamstring muscle soreness in female NCAA athletes: design and evaluation of a user-centered compression sleeve for recovery",
            "type": "article",
            "volume": 13
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