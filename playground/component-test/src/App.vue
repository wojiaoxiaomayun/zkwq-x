<template>
  <div style="width:100%;height:100%;overflow: auto;padding:30px;">
    <div style="width:300px;">
      <XTab vertical></XTab>
      <!-- <AggsItemV :title="'aa'" :datas="[{key:'a',value:10},{key:'b',value:11}]"></AggsItemV> -->
    </div>
    <!-- <base-input v-model="year" placeholder="牛逼"></base-input>
    <XTab :actived.sync="text"></XTab>
    <annex :fileTypes="['pdf']" :maxUploadFileSize="1024 * 1024" checkPDF></annex>
    <base-input-number></base-input-number> -->
<annex :fileTypes="['pdf']" :maxUploadFileSize="1024 * 1024" checkPDF @change="handleChange"></annex>
<base-select multiple v-model="selectedOptions" placeholder="请选择" showLabel="false">
  <base-option value="1">选项1</base-option>
  <base-option value="2">选项2</base-option>
</base-select>
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
  </div>
</template>
<script>
import {
  WangEditor,Base64Util,Institution,Annex,AuthorOrIns,CircleTranslateButton,ImageViewer,AvatarGroup,XTab
} from "@zkwq/business";
import wangPlugin from './wangPlugin'
import CrystVis from 'crystvis-js';
import HoverCard from '../../../packages/business/src/components/normal/hovercard/HoverCard.vue';
import ReadableItem from '../../../packages/business/src/components/normal/readitem/ReadableItem.vue';
import AuthorX from '../../../packages/business/src/components/normal/AuthorX.vue'
import AggsItemV from '../../../packages/business/src/components/normal/AggsItemV.vue';
export default {
  name: "App",
  components: {WangEditor,AuthorX,Institution,Annex,AuthorOrIns,CircleTranslateButton,ReadableItem,ImageViewer,HoverCard,AvatarGroup,AggsItemV,XTab},
  data() {
    return {
      selectedOptions: [],
      dateRange:[],
      fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
      readable:{
  "abstracts": "论坛背景近年来，单细胞与空间组学技术的发展日新月异，在肿瘤微环境与免疫治疗、神经疾病与机制、生殖健康与诊断、药物筛选和疫苗研制等领域用着广泛的应用，是当前生命科学领域的前沿和研究热点。为了加强国内外单细胞和空间组学技术学术交流，促进单细胞空间组学基础研究、转化与临床研究深入发展，转化医学网联合中国医药生物技术协会基因检测技术分会、中国遗传学会遗传诊断分会等多家单位发起了中国单细胞与空间...",
  "abstracts_abbreviation": "论坛背景近年来，单细胞与空间组学技术的发展日新月异，在肿瘤微环境与免疫治疗、神经疾病与机制、生殖健康与诊断、药物筛选和疫苗研制等领域用着广泛的应用，是当前生命科学领域的前沿和研究热点。为了加强国内外单细胞和空间...",
  "article_date": "2025-02-10",
  "attachment_id": [],
  "cn_type": "资讯",
  "competitors": [],
  "create_time": "2025-02-10 18:04:22",
  "date": "2025-02-10",
  "full_text": "论坛背景 \r\n近年来，单细胞与空间组学技术的发展日新月异，在肿瘤微环境与免疫治疗、神经疾病与机制、生殖健康与诊断、药物筛选和疫苗研制等领域用着广泛的应用，是当前生命科学领域的前沿和研究热点。为了加强国内外单细胞和空间组学技术学术交流，促进单细胞&amp;空间组学基础研究、转化与临床研究深入发展，转化医学网联合中国医药生物技术协会基因检测技术分会、中国遗传学会遗传诊断分会等多家单位发起了中国单细胞与空间组学系列论坛：长三角、西南和北京论坛，意在搭建单细胞与空间组学产学研医用交流协作的平台，进一步推动相关产业发展。作为2025开年之作，“第四届长三角单细胞组学技术应用论坛暨空间组学前沿论坛”将于2025年2月28日-3月1日在中国·上海召开。 \r\n开年首秀，四年之约，数十位国内外一线专家齐聚，围绕单细胞与空间组学研究前沿、技术进展、应用场景、临床需求、市场反馈、瓶颈分析及机遇与挑战等话题，进行深入的交流与探讨。涉及单细胞组学前沿与转化、空间生物学技术创新与应用、蛋白质组和代谢组研究与临床应用、交叉融合创新发展、生信分析、药物研发、肿瘤免疫治疗、基础与临床的关键对话、单细胞表观遗传学、微生物单细胞组学等主题。 \r\n在此，我们诚挚的邀请您共赴盛会！ \r\n时间地点 \r\n时间：2025年2月28日-3月1日 \r\n地点：上海中油阳光大酒店（上海浦东东方路969号） \r\n主办单位 \r\n中国医药生物技术协会基因检测技术分会 \r\n中国遗传学会遗传诊断分会 \r\n世界华人医师协会前沿科技与临床转化专委会 \r\n长三角一体化基因检测联盟\r\n新源转化医学中心 \r\n上海市遗传学会 \r\n转化医学网 \r\n协办单位 \r\n上海现代服务业联合会大健康服务专委会 \r\n上海市医学会生物医药转化分会 \r\n上海市浦东新区生物产业行业协会 \r\n论坛日程 \r\n02月28日 09:00-17:55 \r\n开幕式&amp;嘉宾致辞 板块 \r\n学术主席致辞、主办方代表致辞&nbsp; &nbsp; \r\n单细胞生物医学联盟成立仪式 \r\n转化医学大咖讲坛一 \r\n主席：卢大儒教授、苏冰教授 \r\n09:20-09:45 \r\n王向东&nbsp;教授 \r\n中国医药生物技术协会基因检测技术分会主任委员\\复旦大学附属中山医院特聘教授 \r\n题目：循环免疫单细胞检测临床转化：机遇与挑战 \r\n09:45-10:10 \r\n卢大儒&nbsp;教授 \r\n中国遗传协会遗传诊断分会主任委员\\复旦大学特聘教授 \r\n题目：基因技术与出生缺陷及遗传病的防诊治 \r\n10:10-10:35 \r\n郜恒骏&nbsp;教授 \r\n生物芯片上海国家工程研究中心主任 \r\n题目：转化医学重心前移：从“样本”到“组学数据“到“数据产品” \r\n10:35-10:45 \r\n茶&nbsp; &nbsp; 歇 \r\n茶&nbsp; &nbsp;歇&nbsp; &nbsp;10min \r\n转化医学大咖讲坛二 \r\n主席：王向东教授、郜恒骏教授 \r\n10:45-11:10 \r\n苏冰&nbsp;教授 \r\n上海市免疫学研究所所长 \r\n题目：TBD \r\n11:10-11:35 \r\n房静远&nbsp;教授 \r\n上海交通大学医学院附属仁济医院副院长 \r\n题目：肠微生态研究的基础和应用：我们团队的研究经历 \r\n11:35-12:00 \r\n高强&nbsp;教授 \r\n复旦大学附属中山医院肝胆肿瘤和肝移植外科主任医师 \r\n题目：TBD \r\n12:00-13:30 \r\n午&nbsp; &nbsp; 餐 \r\n午&nbsp; 餐&nbsp; &nbsp;90min \r\n开幕式&amp;嘉宾致辞 板块 \r\n学术主席致辞、主办方代表致辞&nbsp; &nbsp; \r\n基础与临床关键对话一 \r\n主席：唐惠儒教授、吴立刚研究员 \r\n13:40-14:05 \r\n韩泽广&nbsp;教授 \r\n上海交通大学系统生物医学研究院院长 \r\n题目：表观遗传调控因子变异与肝癌研究 \r\n14:05-14:30 \r\n付丽&nbsp;教授 \r\n上海临床研究中心病理科主任 \r\n题目：高转移乳腺癌单细胞组学研究 \r\n14:30-14:55 \r\n任善成&nbsp;教授 \r\n上海长征医院泌尿外科主任 \r\n题目：单细胞在前列腺癌精准诊疗中的应用 \r\n14:55-15:20 \r\nGeorge Emanuel 博士 \r\nVizgen科学联合创始人兼高级技术总监 \r\n题目：TBD \r\n15:20-15:45 \r\n唐惠儒 教授 \r\n复旦大学特聘教授 \r\n题目：同分异构分辨的定量代谢组学与宿主-菌群共代谢 \r\n15:45-15:55 \r\n茶&nbsp; &nbsp; 歇 \r\n茶&nbsp; &nbsp;歇&nbsp; &nbsp;10min \r\n基础与临床关键对话二 \r\n主席：韩泽广教授、付丽教授 \r\n15:55-16:20 \r\n刘占举&nbsp;教授 \r\n同济大学上海市第十人民医院消化科主任 \r\n题目：基于单细胞测序对炎症性肠病中性粒细胞功能的研究 \r\n16:20-16:45 \r\n唐天娇&nbsp;女士 \r\n三亚智数生物高级技术支持 \r\n题目：空间多组学技术在免疫微环境研究中的应用 \r\n16:45-17:10 \r\n吴立刚&nbsp;研究员 \r\n中国科学院生物化学与细胞生物学研究所研究员 \r\n题目：单细胞小RNA测序探索卵细胞和胚胎发育中基因调控 \r\n17:10-17:55 \r\n圆桌讨论 \r\n单细胞与空间组学基础与临床关键对话 \r\n03月01日 09:00-17:35 \r\n技术创新与应用论坛一 \r\n主席：郭国骥教授、杨欣荣教授 \r\n09:00-09:25 \r\n陈洛南&nbsp;研究员 \r\n中国科学院分子细胞科学卓越创新中心研究员 \r\n题目：系统生物学的AI赋能 \r\n09:25-09:50 \r\n刘铁民&nbsp;教授 \r\n复旦大学生命科学学院生理学与神经生物学系主任 \r\n题目：Region-specific transcriptomic responses to obesity and diabetes in macaque hypothalamus&nbsp; \r\n09:50-10:15 \r\n江一舟&nbsp;研究员 \r\n复旦大学附属肿瘤医院副院长 \r\n题目：多组学分型推动乳腺癌精准诊疗 \r\n10:15-10:40 \r\n李彦欣&nbsp;研究员 \r\n上海交通大学医学院附属上海儿童医学中心转化所研究员 \r\n题目：体外造血分化及应用研究 \r\n10:40-10:50 \r\n茶&nbsp; &nbsp; 歇 \r\n茶&nbsp; &nbsp;歇&nbsp; &nbsp;10min \r\n技术创新与应用论坛二 \r\n主席：陈洛南研究员、刘铁民教授 \r\n10:50-11:15 \r\n郭国骥&nbsp;教授 \r\n浙江大学教授 \r\n题目：数字细胞蓝图的构建与应用 \r\n11:15-11:40 \r\n吴璇&nbsp; 女士 \r\n解码DNA 技术支持负责人 \r\n题目：类器官：单细胞研究驶向蓝海的 “升级引擎” \r\n11:40-12:05 \r\n杨欣荣&nbsp;教授 \r\n复旦大学附属中山医院肝外科主任医师 \r\n题目：液体活检技术在肝癌精准诊疗中的应用 \r\n12:10-13:30 \r\n午&nbsp; &nbsp; 餐 \r\n午&nbsp; 餐&nbsp; &nbsp;80min \r\n前沿与转化论坛一 \r\n主席：陈豪燕研究员、侯金超研究员 \r\n13:30-13:55 \r\n武多娇&nbsp;&nbsp;研究员 \r\n复旦大学附属中山医院研究员\\复旦大学附属金山医院副院长 \r\n题目：RNA修饰与T细胞免疫应答 \r\n13:55-14:20 \r\n印彤&nbsp;研究员 \r\n上海交通大学医学院附属瑞金医院研究员 \r\n题目：空间代谢组在急性髓细胞白血病代谢重编程研究中的应用 \r\n14:20-14:45 \r\n曹振&nbsp;博士 \r\n翌圣生物研发总监 \r\n题目：酶进化以及新酶快速开发能力促进单细胞新技术的前沿发展 \r\n14:45-15:10 \r\n刘宁宁&nbsp;研究员 \r\n上海交通大学医学院单细胞组学与疾病研究中心副主任 \r\n题目：真菌与癌症 \r\n15:10-15:35 \r\n叶幼琼&nbsp;研究员 \r\n上海交通大学医学院研究员 \r\n题目：单细胞空间组学解码肿瘤微环境 \r\n15:35-15:45 \r\n茶&nbsp; &nbsp; 歇 \r\n茶&nbsp; &nbsp;歇&nbsp; &nbsp;10min \r\n前沿与转化论坛二 \r\n主席：武多娇 研究员、叶幼琼研究员 \r\n15:45-16:10 \r\n杨静华&nbsp;教授 \r\n郑州大学第一附属医院临床系统生物学中心主任 \r\n题目：泛蛋白修饰组学与人类重大疾病 \r\n16:10-16:35 \r\n陈豪燕&nbsp;研究员 \r\n上海交通大学医学院附属仁济医院研究员 \r\n题目：肠菌肠型与肿瘤代谢 \r\n16:35-17:00 \r\n黄河&nbsp;研究员 \r\n复旦大学代谢与整合生物学研究所研究员 \r\n题目：代谢研究中的脂质组学分析 \r\n17:00-17:25 \r\n侯金超&nbsp;研究员 \r\n浙江大学研究员 \r\n题目：Transcriptomic Atlas and Interaction Networks of Brain Cells in Mouse CNS Demyelination and Remyelination: Investigating the Role of TREM2 \r\n17:25-17:35 \r\n闭幕总结 \r\n注册报名 \r\n本次会议免费，名额有限，报满即止！扫描二维码或点击文末阅读原文提交报名申请，经审核通过后，您会收到报名成功确认短信！ \r\n专家简介（按首字母排序，持续更新中） \r\n陈豪燕 \r\n上海交通大学医学院附属仁济医院 \r\n上海交通大学医学院附属仁济医院研究员。中华医学会消化病分会流行病协作组副组长、上海微生物学会委员、中国抗癌协会肠病分会委员。主要研究方向为肠道菌群与肿瘤免疫治疗。以第一作者或通讯作者在Cell，Cell Metabolism, Cell Host &amp; Microbe(2023；2024), Cancer Discovery， Gut，Gastroenterology, 等著名杂志发表高影响力论文数十余篇,累积影响因子超500，总引用次数&gt;2000次。主持多项国家自然科学基金项目和上海市自然科学基金课题、以主要完成人获国家科技进步奖二等奖和上海市科技进步一等奖。 \r\n陈洛南 \r\n中国科学院分子细胞科学卓越创新中心 \r\n华中科技大学电气工程学士；日本东北大学系统科学硕士；日本东北大学系统科学博士。1997年起日本大阪产业大学副教授；2000年起美国加州大学洛杉矶分校(UCLA)访问教授；2002年起日本大阪产业大学教授；2009年10月至今中科院生化细胞研究所研究员，中国科学院系统生物学重点实验室执行主任，国科大杭高院首席教授。中国生物信息学学会(筹)《网络生物学专委会》主任委员，中国运筹学会《计算系统生物学分会》名誉理事长，IEEE SMC学会《系统生物学技术委员会》主席，中国生化细胞学会《分子系统生物学专业分会》主任委员。主要从事计算系统生物学、大数据分析和人工智能的研究工作。近年来发表400余篇期刊论文(包括 Nature, Nature Genetics, Nature Communications, Nature Cancer, PNAS, PRL, National Science Review, Cancer Cell, Cell Research等)和四部专著。 \r\n曹振 \r\n翌圣生物 \r\n博士毕业于华东师范大学，生物物理研究方向。目前任翌圣生物研发总监，自2016年以来，一直致力于体外诊断技术和试剂的开发，在分子酶的结构与功能和生物试剂开发与优化领域有非常丰富的工作经验。目前主要负责二代测序、三代测序文库构建、单细胞建库技术与试剂的开发，组织完成酶切法DNA建库、快速RNA建库、甲基化样本单链建库、多重PCR建库等试剂盒的研发工作。 \r\n乔治-伊曼纽尔（George Emanuel) \r\nVizgen \r\nVizgen科学联合创始人兼高级技术总监，George在过去十年中一直致力于开发高通量空间分析技术，包括拓展MERFISH技术以分析同一样本中的10,000个基因。George获得了科罗拉多大学的双学士学位和哈佛大学生物物理学博士学位。 \r\n房静远 \r\n上海交通大学医学院附属仁济医院 \r\n博士,上海交通大学讲席教授，交大医学院二级教授和博导、附属仁济医院主任医师；上海交通大学医学院附属仁济医院副院长、消化病中心主任；上海市消化疾病研究所长；上海交通大学医学院消化科学院院长、上海市消化内科临床医学中心主任、上海市消化内科临床质控中心主任, 国家卫健委内科消化重点实验室主任，肿瘤系统医学全国重点实验室副主任。中华医学会消化病学分会候任主任委员、中国医师协会消化医师分会副会长、亚太胃肠病学会理事。曾任国务院学位委员会学科评议组成员、国家自然科学基金委医学部咨询委员。国家杰出青年基金获得者、教育部“长江学者”特聘教授、国家自然科学基金委创新研究群体带头人、科技部重点研发专项首席。 \r\n付丽 \r\n上海临床研究中心 \r\n上海临床研究中心主任医师、病理科主任，同时任上海科技大学生命科学与技术学院教授，博士生导师。目前担任中国女医师协会副会长，英国皇家病理学院Fellow，中国科协全国病理学科首席科学家，卫生部有突出贡献中青年专家，教育部乳腺癌防治研究创新团队学术带头人，国家肿瘤质控中心乳腺癌专家委员会副主任委员，并获得首届全国争先创新奖，何梁何利科学与技术进步奖。课题组致力于高转移乳腺癌的研究，其系列研究成果在国际上明确提出了高转移乳腺癌的病理诊断标准及临床治疗原则，临床应用显著地提高了乳腺癌患者的生存及生活质量，研究结果被国际标准采用。 \r\n郜恒骏 \r\n生物芯片上海国家工程研究中心 \r\n医学博士，主任医师、博士生导师。全国生物样本标准化技术委员会主任委员，中国医药生物技术协会副会长组织生物样本库分会主任委员，中国抗癌协会肿瘤样本整合研究分会前任主任委员，生物芯片上海国家工程研究中心主任，上海分子医学工程技术研究中心主任,中国幽门螺杆菌分子医学中心主任，同济大学医学院消化疾病研究所所长，上海交通大学医学院附属第一人民医院临床研究院执行院长。 \r\n高强 \r\n复旦大学附属中山医院 \r\n复旦大学附属中山医院肝脏外科主任医师、教授、博导，院长助理、肝脏外科副主任、肝癌研究所办公室主任。长江学者 “特聘教授” 、万人计划、国家优青。中国医师协会外科分会肝胆青年工作组组长，中国病理生理学会免疫分会青委会主任委员，中国人体健康促进会细胞免疫治疗专委会副主任委员，中国老年学和老年医学会肿瘤康复分会副主任委员，国家癌症中心肝癌质控专委会委员兼秘书，中国抗癌协会青年理事会理事，上海市抗癌协会青年理事会副理事长，上海市医学会整合医学青年联盟理事长，上海市抗癌协会转化医学分会副主任委员。主持国自然重大研究计划、重点项目、国合重点等多项课题。以第一或通讯在Cell、Science、Cancer Cell、Cancer Discov、Nat Metab、J Clin Oncol、Ann Oncol等发表多篇论文。 \r\n郭国骥 \r\n浙江大学医学院 \r\n浙江大学医学院教授，博士生导师，浙江大学血液学研究所副所长，浙江大学干细胞联盟副主席。2005年本科毕业于武汉大学生命科学学院生物技术专业。2010年博士毕业于新加坡国立大学及新加坡基因研究所。之后赴美国哈佛大学医学院，任达纳法伯癌症中心及波士顿儿童医院Research Fellow。2014年入职浙江大学医学院干细胞与再生医学中心。2017年获“国家优秀青年基金”，2019年入选“万人计划”科技创新领军人才。现任中国生理学会血液生理学专业委员会委员，中国细胞学会衰老细胞生物学分会委员，中国医药生物技术协会基因检测分会委员。曾获“谈家桢生命科学创新奖”，“树兰医学青年奖”，“霍英东青年教师奖”，“中源协和生命医学创新突破奖”，“细胞生物学会青年科学家奖”等荣誉。郭国骥一直致力于单细胞分析技术的开发与应用，并在细胞图谱的绘制上有突出贡献；其在Nature、Cell、Nature Genetics等著名期刊发表多篇学术论文。 \r\n韩泽广 \r\n上海交通大学系统生物医学研究院 \r\n上海交通大学讲席教授、上海交通大学系统生物医学研究院院长,系统生物医学教育部重点实验室主任,组学与疾病全国重点实验室副主任，中国生物工程系统生物医学专业委员会主任委员。曾获得国家“万人计划”百千万工程领军人才、教育部长江学者奖励计划特聘教授、国家杰出青年基金获得者、“新世纪百千万人才工程”国家级人选、“973”项目首席科学家。主要科研方向:肿瘤(肝癌等)遗传学和基因组学;重要基因功能研究;单细胞分析和应用等。在国际杂志发表论文150余篇,包括以通讯作者在Nature、Nature Genetics、JCl、GUT、Journaof Hepatology、Hepatology、PNAS、Annu Rev Genomics Hum Genet等发表论文、综述、社评等，论文被他人引用11000余次,获2020-2023年度爱思唯尔“中国高被引学者”。在血吸虫系统生物学研究、肝癌功能基因组及新病因和新机制发现等方面,以第一完成人获国家自然科学二等奖、教育部和上海市自然科学一等奖，以及谈家桢生命科学奖等。 \r\n侯金超 \r\n浙江大学 \r\n浙江大学临床百人计划研究员，附属儿童医院麻醉科，博士生导师。美国圣路易斯华盛顿大学博士后。主要从事神经免疫性疾病及脓毒症的发病机制及转化治疗研究，包括基于单细胞转录组等技术解析Multiple Sclerosis及 Alzheimer's disease疾病中小胶质细胞的转录特征及关键调控因子，并设计靶向小胶质细胞关键免疫分子的Fc突变型单克隆抗体，用于神经免疫性疾病的转化治疗研究。研究成果以第一（含共一）作者发表于Science Translational Medicine, The Journal of clinical investigation, Cell Reports, Am J Respir Crit Care Med, Anesthesiology等，文章他引2100余次，h-index为23。作为主要完成人获批中国、美国及国际PCT发明专利共5项。主持浙江省杰出青年科学基金、国家自然科学基金面上及青年项目、浙江大学医学院临床拔尖人才项目。作为主要完成人获国家教育部科学技术进步一等奖、浙江省医药卫生科技进步特等奖等。为Molecular Neurodegeneration、Clinical and Translational Medicine等国际期刊特邀审稿人。 \r\n黄河 \r\n复旦大学代谢与整合生物学研究所 \r\n2012年获武汉大学化学学士学位，2017年获美国Akron大学分析化学博士学位，2017年起在美国哈佛大学医学院进行博士后研究并兼任BIDMC质谱中心助理研究员，2019年7月全职回国任复旦大学代谢与整合生物学研究所青年研究员，并担任代谢院代谢与脂质组学平台技术指导专家。2020年获得上海市特聘专家荣誉称号。回国后主持或参与多项国家自然基金委、科技部重点研发项目等。研究领域和方向：主要研究基于高分辨质谱技术的代谢组学和脂质组学方法学研究。包括靶向/非靶向的代谢组学和脂质组学技术，以及组学数据相关的生物统计学、生物信息学分析。&nbsp; \r\n江一舟 \r\n复旦大学附属肿瘤医院 \r\n主任医师，研究员，博士生导师。复旦大学附属肿瘤医院副院长，临床研究中心主任。 \r\n国家优秀青年科学基金获得者。主持国家重点研发计划课题、上海市优秀学术带头人计划。通讯作者发表Cancer Cell、Science Translational Medicine、Cell Research、Nature Cancer、Nature Genetics、Lancet Oncology、Cell Metabolism、Nature Chemistry等期刊论著，他引6000余次。获得上海市科技进步奖一等奖、全国青年岗位能手、达摩院青橙奖、上海青年科技英才、上海市卫生健康系统 “银蛇奖”一等奖。 \r\n李彦欣 \r\n上海交通大学医学院附属上海儿童医学中心 \r\n研究员、博导。上海交通大学医学院附属上海儿童医学中心转化所PI，浦江人才。主要研究方向为细胞治疗在血液肿瘤中的应用研究以及儿童血液以及实体肿瘤增殖和干性维持的分子机制。建立并完善了无插入的体细胞重编程平台和向神经，心肌，血液细胞等的分化平台，以及造血转分化平台，获得国家发明专利6项。近年以通讯或一作在J Hematol Oncol（2024）、Mol Cancer（2024）、J Exp Clin Cancer Res （2024）、Adv Sci（2021，2024）、blood（2021）、STTT（2021）、Nat Commun（2013，2017，2019）等国际著名生物医学杂志发表SCI论文40余篇。曾获天津市自然科学一等奖（2015）、高等学校科学研究优秀成果奖（2015）以及上海医学科技奖三等奖（2022）。 \r\n刘宁宁 \r\n上海交通大学医学院单细胞组学与疾病研究中心 \r\n研究员/博士生导师，上海交通大学医学院单细胞组学与疾病研究中心副主任。入选国家优青、上海市优秀学术带头人、上海市青年拔尖人才等。担任中国抗癌协会整合肿瘤学分会专委会委员、中国医药教育协会微生态与健康专委会委员、中国菌物学会遗传与分子生物学专委会委员、中国药理学会抗炎免疫专委会委员、上海市微生物学会临床微生物学专委会副主任委员、上海市预防医学会卫生检验专委会副主任委员、上海市医学会分子诊断专科分会青委会副主任委员等。兼任hLife、iMeta、Fungal Genetics and Biology等期刊编委和Cell Host &amp; Microbe等期刊审稿人。研究方向聚焦真菌感染与癌症发展，通过整合微生物组、单细胞组学等技术，解析癌症发展过程中的真菌与宿主相互作用的分子机制，提供抗真菌抗癌的新策略和新靶标。以通讯/第一作者在Cancer Cell, Nat Microbiol, Nat Protoc, Nat Commun (3篇), Cell Res, PNAS等杂志发表论文30余篇；获授权发明专利4项；主持国自然优青、国家重点研发计划课题、国自然面上和青年等17个项目。研究成果入选“ESI高被引论文”和上海交通大学“十大科技进展”，被同期Cancer Cell杂志前瞻评述和F1000prime高度评价，被Cell、Nat Rev Microbiol、Nat Rev Cancer、Nat Rev Clin Oncol、Nat Rev Gastro Hepat等杂志多次引用和正面评价。 \r\n刘铁民 \r\n复旦大学生命科学学院 \r\n教授，复旦大学生命科学学院生理学与神经生物学系主任，内蒙古大学生物医学研究院副院长。研究方向：主要研究大脑和周边器官包括脂肪，肌肉和肝脏等在调节能量，代谢/糖脂代谢中的重要作用。多伦多大学博士，哈佛大学医学院贝斯以色列女执事医学中心（美国）和德克萨斯大学西南医学中心（美国）博士后，美国德克萨斯大学西南医学中心讲师。复旦大学生命科学学院教授，生理学和神经生物学系主任，遗传工程国家重点实验室课题组长，复旦大学附属中山医院特聘教授，内蒙古大学生物医学研究院副院长。国家重点研发计划“发育编程及其代谢调节”重点专项项目首席科学家，国家自然科学基金外国优秀青年学者，中国科协海智计划特聘专家，亚洲生物物理协会(ABA)委员会委员。荣获中国康复医学会科学技术一等奖，中国体育科学学会科学技术二等奖。在Cell, Cell Metabolism, Neuron (封面和推荐文章), Nature Neuroscience, 等杂志发表90多篇文章。 \r\n刘占举 \r\n同济大学上海市第十人民医院 \r\n同济大学上海市第十人民医院消化科主任，同济大学医学院IBD研究中心主任。医学博士，主任医师，二级教授，博士生导师。比利时-鲁汶大学医学博士;&nbsp; 美国哈佛大学、康涅狄格州立大学博士后。享受国务院特殊津贴、新世纪百千万人才工程国家级人选，第12届亚洲克罗恩病和结肠炎组织（AOCC）主席，中华消化病学会生物样本库与转化协作组-副组长，中国医师学会肛肠医师分会IBD学组-副组长，中国中西医结合学会消化系统疾病专业委员会-常委，中华炎性肠病杂志、J Dig Dis副主编；Postgrad Med J编委。研究方向：炎症性肠病临床诊治和发病机制，在国际期刊Nature Genetics, Cell Rep Med, Gastroenterology, Gut等发表SCI论文210余篇。 \r\n卢大儒 \r\n复旦大学 \r\n遗传学博士，复旦大学特聘教授、医学遗传研究院副院长、感染与健康研究院常务副院长、基因技术教育部工程研究中心主任、上海市实验医学研究院副院长; 中国遗传学会副理事长/遗传诊断分会主任委员、中国环境诱变剂学会常务理事/致畸专业委员会主任委员、全国生育健康遗传关怀联盟副理事长; 目前主要从事遗传病基因筛查鉴定与分子机制、基因编辑与基因治疗研究等。 曾获得国家级技术发明二等奖、国家自然科学二等奖等国家级奖励2项以及国家教学成果奖2项，省部级科技成果一等奖6项，获得中国青年科技奖、国家百千万人才工程国家级人选、国务院政府特殊津贴、全国优秀教师、全国师德先进个人、上海市优秀学科带头人、上海市高等教学名师等荣誉。 \r\n潘刘阳 \r\n转化医学网 \r\n长期研究生物医药产业，目前担任转化医学网董事长、新源转化医学中心主任职务。转化医学网是转化医学的核心门户，旨在推动前沿技术的传播与应用；新源转化医学中心是相关部门指导下成立的民非组织，聚焦在医疗成果转化。长三角生物医药产业特聘专家，担任全国医药卫生产业行业协会基因技术研究与应用专业委员会副会长，中国医药生物技术协会基因检测技术分会常务委员，世界华人医师协会前沿科技与临床转化专委会委员，中国抗癌协会产学研转化专委会委员，上海市浦东新区生物产业行业协会理事，长三角一体化基因检测联盟秘书长，《生命精准系列读物—肿瘤与基因》副主编，同济大学生命科学与技术学院校外导师。 \r\n任善成 \r\n上海长征医院 \r\n主任医师,博士生导师,上海长征医院泌尿外科主任机器人手术中心主任、党支部书记、国家重点学科带头人、全军泌尿外科中心主任、国家杰出青年科学基金获得者、教育部青年长江学者、国家自然科学基金委医学部专家咨询委员会委员(2023-)、AsianJo-urnal of Urology(IF=2.6)执行主编、亚洲泌尿外科机器人学会学术委员会主席、中华医学会泌尿外科分会青年委员会秘书长、上海市“一带一路”泌尿系统肿瘤国际联合重点实验室主任、擅长泌尿系统肿瘤特别是前列腺癌的微创手术和综合治疗,主刀完成泌尿系统微创手术逾4000例,其中机器人手术3000余例,完成亚洲首例单孔机器人前列腺癌根治术和经会阴机器人前列腺癌根治术,荣获达芬奇机器人手术中国十万例杰出贡献奖。以通讯/第一作者在Nat Med、Nat Genet、Nat Cell Biol、Mol Cell, Nat Commun、Eur Urol等国际权威期刊发表SCI论文70余篇,总影响因子700余分。主持国家自然科学基金重点项目、国家重大研发计划等国家和省部级课题20余项,申请国家发明专利18项,获批14项。入选树兰医学青年奖、上海市卫生系统青年人才最高奖“银蛇奖”一等奖、“国之名医·青年新锐”等10余项人才计划，以第一完成人获得教育部科技进步一等奖(2022)。 \r\n苏冰 \r\n上海市免疫学研究所 \r\n1984年毕业于北京大学生物系获理学学士学位，同年考取CUSBEA项目于1985年入学耶鲁大学，1987、1991年分别获美国耶鲁大学硕士、博士学位；1991-1995年在美国加州大学圣地亚哥分校从事博士后工作。2012年回国前获美国德州大学MD安德森癌症中心终身教授和耶鲁大学终身副教授教职。目前是上海交通大学王宽诚讲席教授、上海市免疫学研究所所长，上海交通大学医学院特聘教授、免疫与微生物学系主任，瑞金医院免疫相关疾病研究中心主任和首席科学家，上海交通大学医学院-耶鲁大学免疫代谢研究院主任，国家高层次人才计划专家，长江学者讲座教授，上海交通大学致远荣誉博士生导师，国家科技部重点研发计划首席科学家，美国耶鲁大学、上海中医药大学、和中南大学湘雅医院客座教授。研究主要聚焦于MAPK和mTOR信号通路在肠道间质细胞、巨噬细胞、T、B细胞和固有样淋巴细胞以及血管细胞的调控机制及其在肠道炎症、肿瘤、纤维化、心脑血管等疾病中的生理病理作用，在Nature、Cell、Immunity、Nature Genetics、Nature Immunology、EMBO J、Blood、Cell Metabolism、Cancer Cell、Molecular Cell、Cell Reports Medicine等国际知名杂志上发表SCI论文150余篇,他引超过21000次。主持多项科研项目，包括美国NIH、ACS、DOD、AHA、LLS、Irvington Fellowship和国家科技部、国家自然科学基金重大研究计划、重点项目、国际合作项目以及上海市科委、卫计委等项目。曾担任美国华人生物学家协会秘书长和理事会委员，现任《现代免疫学》杂志主编，Journal of Molecular Cell Biology和Current Research in Immunology杂志副主编，《中国科学SCLS》，Cellular Immunology, STTT等杂志编委，是国家自然基金委杰青、优青、重点/面上项目、CJ及美国NIH、AHA等多个学科组的专业委员和项目评审专家。 \r\n唐惠儒 \r\n复旦大学 \r\n复旦大学特聘教授、国家杰青、“精准医学,及“前沿生物技术”国家重点研发计划项目首席、英国皇家化学会会士、伦敦大学博士。曾任英国帝国理工学院生物医学部SeniorScientist、“中科院生物磁共振分析重点实验室”创建主任、科技部973与蛋白质科学重大计划等项目评审专家。研究代谢物功能及代谢组学30余年,发表Nature、Nat Microbiol、Nat Aging、Cell Rep.Cell Rep Med、lmmunity、PNAS、EMBO J、J Hepatol、JACS及Anal chem等SCI论文230余篇,被引1.5万余次(H指数~69)。获批发明专利多项。现任中国生物物理学会代谢组学分会会长;中国营养学会基础营养分会、中国抗癌协会肿瘤代谢分会、中国生物物理学会自由基生物学及医学分会、中国生物化学与分子生物学会脂质与脂蛋白委员会等常务理事,国际实验磁共振大会(ENC)执委:Metabolomics、《基础医学与临床》等编委,Nutrition Metabolism及Phe-nomics等副主编。 \r\n唐天娇 \r\n三亚智数生物 \r\n华中农业大学硕士，三亚智数生物高级技术支持。研究生期间专注于玉米发育生物学研究，曾参与发表一篇《Nature Plants》学术论文。毕业后加入华大智造，积累了丰富的测序仪技术支持经验。现就职于智数生物，负责单细胞转录组和空间多组学产品的技术支持工作，致力于推动前沿生物技术的应用与发展。 \r\n王向东 \r\n复旦大学附属中山医院 \r\n医学博士，复旦大学特聘教授，复旦大学附属中山医院呼吸首席科学家，复旦大学附属中山医院临床医学研究院学科带头人，上海临床生物信息学研究所所长，复旦大学临床生物信息学中心主任，上海呼吸疾病研究所副所长。中国生物医药技术协会基因检测技术分会主任委员、中国医师协会临床精准医学委员会副主任委员、世界华人医师协会副会长。主要研究包括单细胞测序、临床生物信息学、疾病特异性生物标志物、慢性肺疾病、癌症免疫学和分子与细胞治疗。共发表科学论文约400篇，其中SCI论文350，总影响因子2113，引用次数约12701，h-因子为58，i10-因子为303。 \r\n吴立刚 \r\n中科院生化与细胞研究所 \r\n中科院生化与细胞研究所，分子生物学国家重点实验室，研究员，博士生导师，中科院“百人”,国家科技创新领军人才。长期从事RNA研究，主要研究方向包括：细胞内mRNA的稳定性和翻译调控、小RNA介导的基因沉默，以及mRNA和siRNA药物的设计开发。在Nature Cell Biology、Science Advances、PNAS等期刊发表论文40余篇，发明专利5项，研究成果获得Nature Reviews Molecular Biology、Nature Cell Biology、PNAS、Elife 等国际期刊专评。承担多项国家重大科学研究计划、国家自然基金委项目、中科院战略性先导专项。 \r\n武多娇 \r\n复旦大学附属中山医院 \r\n医学博士，复旦大学附属中山医院研究员,复旦大学附属金山医院副院长，上海心肺疾病人工智能工程技术研究中心副主任。获“上海市青年科技启明星”“上海市浦江人才”计划资助。聚焦免疫代谢调控机制及干预靶点的研究;近五年作为第一作者或者通信作者在lmmunity,Semin Cancer Biol.,Journal forImmunoTherapy of Cancer等SCl期刊上共发表论文40余篇,主编或参编免疫代谢、系统免疫学等领域英文专著5本。担任中国医药生物技术协会基因检测技术分会秘书长，中国临床肿瘤学会转化医学专委会委员等。 \r\n吴璇 \r\n解码DNA&nbsp; \r\n解码DNA 技术支持负责人。曾参与研究鸟类线粒体基因组系统发育、内源性逆转录病毒、比较基因组学等相关课题，相关工作发表在Int J Biol Macromol和Genes等期刊。从事多组学数据分析工作5年以上，精通全基因组测序、转录组和单细胞转录组测序技术，具有丰富的单细胞多组学课题设计经验；已协助上百位科研人员完成组学课题设计，部分工作已发表在 Molecular Plant、Cell Stem Cell、Nature Communications 等期刊。目前主要负责单细胞测序在类器官研究应用及临床转化的方案设计与推广。 \r\n杨静华 \r\n郑州大学第一附属医院&nbsp; \r\n郑州大学第一附属医院特聘教授、国家杰青、中原学者、泰山学者，师从于著名分子生物学家 TomManiatis 和诺贝尔奖得主 Richard Axel。最早发现 RNA 编辑和双链 RNA 信号转导过程，在双链 RNA 生物功能、疾病表观蛋白组学、广谱抗病毒机理及药物研发方面做了大量开创性工作，成果以第一/通讯作者发表在《Nature》、《Science》、《PNAS》、《Immunology》、《J. Biol. Chem》、《Circ Res》、《J. Virol.》、《FASEBJ》等杂志上。主持美国NIH 的 RO1 独立研究基金、NIH 的 KO2 青年职业发展等多项基金。06 年被聘任为波士顿大学副教授，肿瘤外科研究室主任，创办了临床蛋白质质谱研究中心，负责波士顿大学 VA 医学中心的临床蛋白组研究。现任郑州大学第一附属医院临床系统生物学中心主任，开创了泛蛋白修饰研究领域，近五年在泛蛋白修饰领域主持包括国自然科学基金重大研发计划、国自然科学基金中俄联合项目及面上项目在内的多项基金。以通讯作者在《Science》（2023）、《Cell reports》及《Aging cell》等杂志发表论文多篇。 \r\n杨欣荣 \r\n复旦大学附属中山医院 \r\nMD, PhD。复旦大学附属中山医院肝外科主任医师、教授、博士生导师。入选国家高层次人才特殊支持计划（万人计划）科技创新领军人才、上海市领军人才、上海市卫生健康领军人才等。Hepatoma Research、Clinical Cancer Bulletin编委。国际肝癌协会(ILCA), 美国临床肿瘤协会(ASCO), 美国癌症研究协会(AACR), 国际肝移植协会(ILTS)等会员。中国医师协会外科医师分会手术质量控制与评价工作组副组长、中国医师协会外科医师分会加速康复外科工作组副组长、中国医药生物技术协会组织生物样本库分会类器官学组副组长等。获国家科技进步二等奖、教育部自然科学一等奖、上海市科技进步奖一等奖、华夏医学科技奖一等奖、上海市优秀发明金奖、首届”人民好医生”杰出贡献奖等。主持科研项目20余项，包括国家自然科学基金、科技部重大专项、上海市科委基金等；获授权专利20余项（完成转化14项)；第一及通讯作者（含共同）发表SCI论文80余篇，包括Cell，Nature，Lancet Oncology，Journal of Hepatology，GUT等。 \r\n叶幼琼 \r\n上海交通大学医学院 \r\n上海交通大学医学院研究员，博士生导师，现担任上海交通大学医学院-上海市免疫学研究所课题组组长（2020年-）。获得国家优秀青年科学基金，上海市海外高层次青年人才，“浦江（A类）人才”计划。主要研究方向为肿瘤微环境和免疫治疗(http://www.yelab.site/)，以单细胞、空间组学为驱动，结合生物信息学创新方法、基础实验、临床队列等，开发肿瘤空间微环境解析工具，揭示TME中癌和癌旁交互区的互作组分参免疫逃逸机制。相关成果以（共同)第一、最后通讯在Immunity (2024a, 2024b）、Cell Metab、Cancer Cell、Nat Metab、Nat Immunol、Nat Commun (2020, 2022, 2023a, 2023b) 、Cancer Res (2022, 2023, 2024a, 2024b)等学术期刊发表，授权软著专利4项。现任上海市生物信息学会理事、副秘书长，中国抗癌协会肿瘤微环境专业委员会委员，上海市免疫学会委员（青年工作委员会）委员等。 \r\n印彤 \r\n上海交通大学医学院附属瑞金医院 \r\n研究员，博导,上海交通大学医学院附属瑞金医院，国家转化医学中心(上海)质谱平台负责人。主要研究方向为1.微环境对白血病发生发展的影响;2.肿瘤发生、诊断和治疗相关的 多组学研究。2003年6月上海交通大学医学院博士毕业。2005年赴美,曾获美国血液病与淋巴瘤协会的Special Fellow Award奖。2015年底作为平台负责人和课题组长引进上海交通大学医学院附属瑞金医院，是国家教育部学位评审专家,国家自然基金通讯评审专家,国家科技部等专家库成员，以及中国分析测试协会医学质谱分会委员。先后主持国家自然科学基金面上项目、上海市科委浦江人才计划、上海市教委高峰高原交医“双百人”计划等项目。授权美国和中国专利各一项，2023年以来申请专利4项。在Nature、Nature Medicine、Science、cell等刊物发表第1/通讯作者SC论文22篇(IF 302.515),共同作者16篇(IF 264.336),引用超过3300次。 \r\n同期活动 \r\n1、中国转化医学产业大会之转化医学大咖讲坛； \r\n2、单细胞生物医学联盟成立仪式。 \r\n注册报名 \r\n本次会议免费，名额有限，报满即止！扫描二维码或点击文末阅读原文提交报名申请，经审核通过后，您会收到报名成功确认短信！ \r\n往届盛况 \r\n第三届实况记录 \r\n第二届实况记录 \r\n首届实况记录 \r\n系列论坛鸣谢 \r\n注册报名 \r\n本次会议免费，名额有限，报满即止！扫描二维码或点击文末阅读原文提交报名申请，经审核通过后，您会收到报名成功确认短信！ \r\n联系我们 \r\n参会咨询 \r\n联系人：李老师 \r\n手机：180 1971 3070（微信同号）&nbsp; \r\n邮箱：liminji@360zhyx.com \r\n申请演讲 \r\n联系人：张老师 \r\n手机：&nbsp;177 2132 5659（微信同号）&nbsp; \r\n邮箱：zhangqin@360zhyx.com \r\n赞助合作 \r\n联系人：黄老师 \r\n手机：&nbsp;133 7192 8010（微信同号）&nbsp; \r\n邮箱：huangxuqiong@360zhyx.com \r\n往届报道",
  "id": "ca6065d022d82f0585203e11e710c36b",
  "industry_tags": [],
  "link": "https://mp.weixin.qq.com/s?__biz=MjM5MzQ4NTk4MA==&mid=2656494178&idx=1&sn=a78e7883fd785cfd04fb8917e6889ee8",
  "source": "微信",
  "title": "【日程发布】2025第四届长三角单细胞组学技术应用论坛暨空间组学前沿论坛新春重磅呈现，大咖云集，免费注册中！",
  "type": "news"
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