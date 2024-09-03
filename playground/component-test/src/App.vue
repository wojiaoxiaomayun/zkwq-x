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
  WangEditor,Base64Util,Author,Institution,Annex,AuthorOrIns,DatePickerX,XTab,Keywords,AggsItemV,Cover,AuthorX,InstitutionX,XHeader,UserProfile,ReadableItem
} from "@zkwq/business";
import wangPlugin from './wangPlugin'

export default {
  name: "App",
  components: {WangEditor,Author,Institution,Annex,AuthorOrIns,DatePickerX,XTab,Keywords,AggsItemV,Cover,AuthorX,InstitutionX,XHeader,UserProfile,ReadableItem },
  data() {
    return {
      readable:{
    "abstracts": "This solid state NMR study of histone H2B provides insight into its structure and dynamics within the context of the nucleosome core particle.",
    "article_type": "期刊论文",
    "attachment_id": [],
    "author": [
        "Shi, Xiangyan",
        "Kannaian, Bhuvaneswari",
        "Prasanna, Chinmayi",
        "Soman, Aghil",
        "Nordenskioeld, Lars"
    ],
    "author_name": [
        [
            "Shi, Xiangyan",
            "Shi, XY"
        ],
        [
            "Kannaian, Bhuvaneswari",
            "Kannaian, B"
        ],
        [
            "Prasanna, Chinmayi",
            "Prasanna, C"
        ],
        [
            "Soman, Aghil",
            "Soman, A"
        ],
        [
            "Nordenskioeld, Lars",
            "Nordenskioeld, L"
        ]
    ],
    "author_v2": [
        {
            "author_index": 1,
            "institutions": [
                {
                    "name": "Shenzhen MSU-BIT University"
                }
            ],
            "is_corresponding_author": true,
            "name": "Shi, Xiangyan"
        },
        {
            "author_index": 2,
            "institutions": [
                {
                    "name": "Nanyang Technological University & National Institute of Education (NIE) Singapore"
                }
            ],
            "is_corresponding_author": false,
            "name": "Kannaian, Bhuvaneswari"
        },
        {
            "author_index": 3,
            "institutions": [
                {
                    "name": "Nanyang Technological University & National Institute of Education (NIE) Singapore"
                },
                {
                    "name": "Case Western Reserve University"
                }
            ],
            "is_corresponding_author": false,
            "name": "Prasanna, Chinmayi"
        },
        {
            "author_index": 4,
            "institutions": [
                {
                    "name": "Nanyang Technological University & National Institute of Education (NIE) Singapore"
                }
            ],
            "is_corresponding_author": false,
            "name": "Soman, Aghil"
        },
        {
            "author_index": 5,
            "institutions": [
                {
                    "name": "Nanyang Technological University & National Institute of Education (NIE) Singapore"
                },
                {
                    "name": "Nanyang Technological University & National Institute of Education (NIE) Singapore"
                }
            ],
            "is_corresponding_author": true,
            "name": "Nordenskioeld, Lars"
        }
    ],
    "authors": [
        {
            "author_index": 1,
            "institutions": [
                {
                    "name": "Shenzhen MSU BIT Univ, Dept Biol, Shenzhen, Guangdong, Peoples R China"
                }
            ],
            "is_corresponding_author": true,
            "name": "Shi, Xiangyan"
        },
        {
            "author_index": 2,
            "institutions": [
                {
                    "name": "Nanyang Technol Univ, Sch Biol Sci, Singapore, Singapore"
                }
            ],
            "is_corresponding_author": false,
            "name": "Kannaian, Bhuvaneswari"
        },
        {
            "author_index": 3,
            "institutions": [
                {
                    "name": "Nanyang Technol Univ, Sch Biol Sci, Singapore, Singapore"
                },
                {
                    "name": "Case Western Reserve Univ, Dept Physiol & Biophys, Cleveland, OH USA"
                }
            ],
            "is_corresponding_author": false,
            "name": "Prasanna, Chinmayi"
        },
        {
            "author_index": 4,
            "institutions": [
                {
                    "name": "Nanyang Technol Univ, Sch Biol Sci, Singapore, Singapore"
                }
            ],
            "is_corresponding_author": false,
            "name": "Soman, Aghil"
        },
        {
            "author_index": 5,
            "institutions": [
                {
                    "name": "Nanyang Technol Univ, Sch Biol Sci, Singapore, Singapore"
                },
                {
                    "name": "Nanyang Technol Univ, NTU Inst Struct Biol, Singapore, Singapore"
                }
            ],
            "is_corresponding_author": true,
            "name": "Nordenskioeld, Lars"
        }
    ],
    "browse_count": 1,
    "cn_type": "论文",
    "collections": [
        "SCI"
    ],
    "corresponding_author": [
        true,
        false,
        false,
        false,
        true
    ],
    "date": "2023-06-24",
    "equal_first_author": [
        false,
        false,
        false,
        false,
        false
    ],
    "free": true,
    "id": "88755ed57b3b6aa745e587d740919de0",
    "institution": [
        "Shenzhen MSU BIT Univ, Dept Biol, Shenzhen, Guangdong, Peoples R China",
        "Nanyang Technol Univ, Sch Biol Sci, Singapore, Singapore",
        "Nanyang Technol Univ, NTU Inst Struct Biol, Singapore, Singapore",
        "Case Western Reserve Univ, Dept Physiol & Biophys, Cleveland, OH USA"
    ],
    "is_representativeWork": false,
    "issn": "2399-3642",
    "issue": 1,
    "journal_title": "COMMUNICATIONS BIOLOGY",
    "lang": "EN",
    "links": [
        {
            "is_authorized": true,
            "login_url": "DOAJ_Article",
            "name": "DOAJ",
            "url": "https://doaj.org/article/2c0d52c91dce458b9f5087b16313bfa2"
        }
    ],
    "local_links": [
        "https://file.scholarin.cn/files?fastdfspath=group2/M00/6F/9A/CgMLEWToZ12AcJxpACXl2WIBNvg4550746"
    ],
    "permission": 4,
    "project": {
        "cn_type": "项目",
        "title": "This work was financially supported by the National Natural Science Foundation of China (to X.S., grant number: 32201006), the Department of Science and Technology of Guangdong Province (to X.S., grant number:& nbsp;2021QN02Y103, 2022A0505030002), the Department of Education of Guangdong Province (to X.S., grant number: 2022ZDZX061). A Singapore Ministry of Education Academic Research Fund (AcRF) Tier 2 (MOE2018-T2-1-112) grant supported work in the L.N. laboratory. All SSNMR experiments were performed at the Nanyang Technological University (NTU) Center of High-Field NMR Spectroscopy and Imaging. We also acknowledge the NTU Institute of Structural Biology (NISB) for supporting this research.",
        "type": "project"
    },
    "publish_year": "2023",
    "publisher": "NATURE PORTFOLIO",
    "ref_articles": [
        {
            "author": [
                "Shi, XY"
            ],
            "cn_type": "论文",
            "doi": "10.1021/jacs.5b12974",
            "first_page": "4105",
            "is_representativeWork": false,
            "journal_title": "JOURNAL OF THE AMERICAN CHEMICAL SOCIETY",
            "publish_year": "2016",
            "title": "Site-Specific Internal Motions in GB1 Protein Microcrystals Revealed by 3D H-2-C-13-C-13 Solid-State NMR Spectroscopy",
            "type": "article",
            "volume": "138"
        },
        {
            "author": [
                "Shi, XY"
            ],
            "cn_type": "论文",
            "doi": "10.1038/s42003-020-01369-3",
            "first_page": "ARTN 639",
            "is_representativeWork": false,
            "journal_title": "COMMUNICATIONS BIOLOGY",
            "publish_year": "2020",
            "title": "Dynamic networks observed in the nucleosome core particles couple the histone globular domains with DNA",
            "type": "article",
            "volume": "3"
        },
        {
            "author": [
                "Henikoff, S"
            ],
            "cn_type": "论文",
            "doi": "10.1101/cshperspect.a019364",
            "first_page": "ARTN a019364",
            "is_representativeWork": false,
            "journal_title": "COLD SPRING HARBOR PERSPECTIVES IN BIOLOGY",
            "publish_year": "2015",
            "title": "Histone Variants and Epigenetics",
            "type": "article",
            "volume": "7"
        },
        {
            "author": [
                "VANGEET, AL"
            ],
            "cn_type": "论文",
            "first_page": "2227",
            "is_representativeWork": false,
            "journal_title": "ANALYTICAL CHEMISTRY",
            "publish_year": "1968",
            "title": "CALIBRATION OF METHANOL AND GLYCOL NUCLEAR MAGNETIC RESONANCE THERMOMETERS WITH A STATIC THERMISTOR PROBE",
            "type": "article",
            "volume": "40"
        },
        {
            "author": [
                "Hou, GJ"
            ],
            "cn_type": "论文",
            "doi": "10.1021/ja203771a",
            "first_page": "18646",
            "is_representativeWork": false,
            "journal_title": "JOURNAL OF THE AMERICAN CHEMICAL SOCIETY",
            "publish_year": "2011",
            "title": "H-1-C-13/H-1-N-15 Heteronuclear Dipolar Recoupling by R-Symmetry Sequences Under Fast Magic Angle Spinning for Dynamics Analysis of Biological and Organic Solids",
            "type": "article",
            "volume": "133"
        },
        {
            "author": [
                "BOHRMANN, B"
            ],
            "cn_type": "论文",
            "first_page": "235",
            "is_representativeWork": false,
            "journal_title": "ULTRAMICROSCOPY",
            "publish_year": "1993",
            "title": "CONCENTRATION EVALUATION OF CHROMATIN IN UNSTAINED RESIN-EMBEDDED SECTIONS BY MEANS OF LOW-DOSE RATIO-CONTRAST IMAGING IN STEM",
            "type": "article",
            "volume": "49"
        },
        {
            "author": [
                "Dorigo, B"
            ],
            "cn_type": "论文",
            "first_page": "1571",
            "is_representativeWork": false,
            "journal_title": "SCIENCE",
            "publish_year": "2004",
            "title": "Nucleosome arrays reveal the two-start organization of the chromatin fiber",
            "type": "article",
            "volume": "306"
        },
        {
            "author": [
                "Shi, XY"
            ],
            "cn_type": "论文",
            "doi": "10.3389/fgene.2022.870640",
            "first_page": "ARTN 870640",
            "is_representativeWork": false,
            "journal_title": "FRONTIERS IN GENETICS",
            "publish_year": "2022",
            "title": "Recent Advances in Investigating Functional Dynamics of Chromatin",
            "type": "article",
            "volume": "13"
        },
        {
            "author": [
                "Chen, QM"
            ],
            "cn_type": "论文",
            "doi": "10.3390/cells11193145",
            "first_page": "ARTN 3145",
            "is_representativeWork": false,
            "journal_title": "CELLS",
            "publish_year": "2022",
            "title": "Chromatin Liquid-Liquid Phase Separation (LLPS) Is Regulated by Ionic Conditions and Fiber Length",
            "type": "article",
            "volume": "11"
        },
        {
            "author": [
                "Chen, P"
            ],
            "cn_type": "论文",
            "doi": "10.1146/annurev-biophys-062920-063639",
            "first_page": "95",
            "is_representativeWork": false,
            "journal_title": "ANNUAL REVIEW OF BIOPHYSICS, VOL 50, 2021",
            "publish_year": "2021",
            "title": "Structures and Functions of Chromatin Fibers",
            "type": "article",
            "volume": "50"
        },
        {
            "author": [
                "Takegoshi, K"
            ],
            "cn_type": "论文",
            "first_page": "631",
            "is_representativeWork": false,
            "journal_title": "CHEMICAL PHYSICS LETTERS",
            "publish_year": "2001",
            "title": "C-13-H-1 dipolar-assisted rotational resonance in magic-angle spinning NMR",
            "type": "article",
            "volume": "344"
        },
        {
            "author": [
                "Zhang, YJ"
            ],
            "cn_type": "论文",
            "doi": "10.1007/978-981-15-8104-5_1",
            "first_page": "1",
            "is_representativeWork": false,
            "journal_title": "HISTONE MUTATIONS AND CANCER",
            "publish_year": "2021",
            "title": "Overview of Histone Modification",
            "type": "article",
            "volume": "1283"
        },
        {
            "author": [
                "Zhang, PY"
            ],
            "cn_type": "论文",
            "doi": "10.2174/1389203717666160122120310",
            "first_page": "401",
            "is_representativeWork": false,
            "journal_title": "CURRENT PROTEIN & PEPTIDE SCIENCE",
            "publish_year": "2016",
            "title": "An Overview of Chromatin-Regulating Proteins in Cells",
            "type": "article",
            "volume": "17"
        },
        {
            "author": [
                "Hansen, JC"
            ],
            "cn_type": "论文",
            "doi": "10.1186/s13072-021-00424-5",
            "first_page": "ARTN 50",
            "is_representativeWork": false,
            "journal_title": "EPIGENETICS & CHROMATIN",
            "publish_year": "2021",
            "title": "The solid and liquid states of chromatin",
            "type": "article",
            "volume": "14"
        },
        {
            "author": [
                "Smrt, ST"
            ],
            "cn_type": "论文",
            "doi": "10.3389/fmolb.2022.1106588",
            "first_page": "ARTN 1106588",
            "is_representativeWork": false,
            "journal_title": "FRONTIERS IN MOLECULAR BIOSCIENCES",
            "publish_year": "2023",
            "title": "Histone H3 core domain in chromatin with different DNA linker lengths studied by H-1-Detected solid-state NMR spectroscopy",
            "type": "article",
            "volume": "9"
        },
        {
            "author": [
                "Bertin, A"
            ],
            "cn_type": "论文",
            "doi": "10.1529/biophysj.107.108365",
            "first_page": "3652",
            "is_representativeWork": false,
            "journal_title": "BIOPHYSICAL JOURNAL",
            "publish_year": "2007",
            "title": "Structure and phase diagram of nucleosome core particles aggregated by multivalent cations",
            "type": "article",
            "volume": "93"
        },
        {
            "author": [
                "Bannister, AJ"
            ],
            "cn_type": "论文",
            "doi": "10.1038/cr.2011.22",
            "first_page": "381",
            "is_representativeWork": false,
            "journal_title": "CELL RESEARCH",
            "publish_year": "2011",
            "title": "Regulation of chromatin by histone modifications",
            "type": "article",
            "volume": "21"
        },
        {
            "author": [
                "Schanda, P"
            ],
            "cn_type": "论文",
            "doi": "10.1016/j.pnmrs.2016.02.001",
            "first_page": "1",
            "is_representativeWork": false,
            "journal_title": "PROGRESS IN NUCLEAR MAGNETIC RESONANCE SPECTROSCOPY",
            "publish_year": "2016",
            "title": "Studying dynamics by magic-angle spinning solid-state NMR spectroscopy: Principles and applications to biomolecules",
            "type": "article",
            "volume": "96"
        },
        {
            "author": [
                "Zhou, KD"
            ],
            "cn_type": "论文",
            "doi": "10.1038/s41594-018-0166-x",
            "first_page": "3",
            "is_representativeWork": false,
            "journal_title": "NATURE STRUCTURAL & MOLECULAR BIOLOGY",
            "publish_year": "2019",
            "title": "Nucleosome structure and dynamics are coming of age",
            "type": "article",
            "volume": "26"
        },
        {
            "author": [
                "Xiang, SQ"
            ],
            "cn_type": "论文",
            "doi": "10.1002/anie.201713158",
            "first_page": "4571",
            "is_representativeWork": false,
            "journal_title": "ANGEWANDTE CHEMIE-INTERNATIONAL EDITION",
            "publish_year": "2018",
            "title": "Site-Specific Studies of Nucleosome Interactions by Solid-State NMR Spectroscopy",
            "type": "article",
            "volume": "57"
        },
        {
            "author": [
                "Ackermann, BE"
            ],
            "cn_type": "论文",
            "doi": "10.3389/fmolb.2021.741581",
            "first_page": "ARTN 741581",
            "is_representativeWork": false,
            "journal_title": "FRONTIERS IN MOLECULAR BIOSCIENCES",
            "publish_year": "2021",
            "title": "Emerging Contributions of Solid-State NMR Spectroscopy to Chromatin Structural Biology",
            "type": "article",
            "volume": "8"
        },
        {
            "author": [
                "Furukawa, A"
            ],
            "cn_type": "论文",
            "doi": "10.1073/pnas.2010506117",
            "first_page": "19661",
            "is_representativeWork": false,
            "journal_title": "PROCEEDINGS OF THE NATIONAL ACADEMY OF SCIENCES OF THE UNITED STATES OF AMERICA",
            "publish_year": "2020",
            "title": "Acetylated histone H4 tail enhances histone H3 tail acetylation by altering their mutual dynamics in the nucleosome",
            "type": "article",
            "volume": "117"
        },
        {
            "author": [
                "Kiteyski-LeBlanc, JL"
            ],
            "cn_type": "论文",
            "doi": "10.1021/jacs.8b00931",
            "first_page": "4774",
            "is_representativeWork": false,
            "journal_title": "JOURNAL OF THE AMERICAN CHEMICAL SOCIETY",
            "publish_year": "2018",
            "title": "Investigating the Dynamics of Destabilized Nucleosomes Using Methyl-TROSY NMR",
            "type": "article",
            "volume": "140"
        },
        {
            "author": [
                "Strickfaden, H"
            ],
            "cn_type": "论文",
            "doi": "10.1016/j.cell.2020.11.027",
            "first_page": "1772",
            "is_representativeWork": false,
            "journal_title": "CELL",
            "publish_year": "2020",
            "title": "Condensed Chromatin Behaves like a Solid on the Mesoscale In Vitro and in Living Cells",
            "type": "article",
            "volume": "183"
        },
        {
            "author": [
                "Rippe, K"
            ],
            "cn_type": "论文",
            "doi": "10.1101/cshperspect.a040683",
            "first_page": "ARTN a040683",
            "is_representativeWork": false,
            "journal_title": "COLD SPRING HARBOR PERSPECTIVES IN BIOLOGY",
            "publish_year": "2022",
            "title": "Liquid-Liquid Phase Separation in Chromatin",
            "type": "article",
            "volume": "14"
        },
        {
            "author": [
                "Takizawa, Y"
            ],
            "cn_type": "论文",
            "doi": "10.1016/j.bbagrm.2022.194851",
            "first_page": "ARTN 194851",
            "is_representativeWork": false,
            "journal_title": "BIOCHIMICA ET BIOPHYSICA ACTA-GENE REGULATORY MECHANISMS",
            "publish_year": "2022",
            "title": "Chromatin structure meets cryo-EM: Dynamic building blocks of the functional architecture",
            "type": "article",
            "volume": "1865"
        },
        {
            "author": [
                "Meier, K"
            ],
            "cn_type": "论文",
            "doi": "10.4161/15592294.2014.971580",
            "first_page": "1485",
            "is_representativeWork": false,
            "journal_title": "EPIGENETICS",
            "publish_year": "2014",
            "title": "Chromatin regulation: How complex does it get?",
            "type": "article",
            "volume": "9"
        },
        {
            "author": [
                "Berezhnoy, NV"
            ],
            "cn_type": "论文",
            "doi": "10.1016/j.bpj.2016.03.016",
            "first_page": "1720",
            "is_representativeWork": false,
            "journal_title": "BIOPHYSICAL JOURNAL",
            "publish_year": "2016",
            "title": "The Influence of Ionic Environment and Histone Tails on Columnar Order of Nucleosome Core Particles",
            "type": "article",
            "volume": "110"
        },
        {
            "author": [
                "Morrison, EA"
            ],
            "cn_type": "论文",
            "doi": "10.1093/nar/gkab246",
            "first_page": "4750",
            "is_representativeWork": false,
            "journal_title": "NUCLEIC ACIDS RESEARCH",
            "publish_year": "2021",
            "title": "Nucleosome composition regulates the histone H3 tail conformational ensemble and accessibility",
            "type": "article",
            "volume": "49"
        },
        {
            "author": [
                "Narlikar, GJ"
            ],
            "cn_type": "论文",
            "doi": "10.1007/s12038-019-9978-z",
            "is_representativeWork": false,
            "journal_title": "JOURNAL OF BIOSCIENCES",
            "publish_year": "2020",
            "title": "Phase-separation in chromatin organization",
            "type": "article",
            "volume": "45"
        },
        {
            "author": [
                "Martire, S"
            ],
            "cn_type": "论文",
            "doi": "10.1038/s41580-020-0262-8",
            "first_page": "522",
            "is_representativeWork": false,
            "journal_title": "NATURE REVIEWS MOLECULAR CELL BIOLOGY",
            "publish_year": "2020",
            "title": "The roles of histone variants in fine-tuning chromatin organization and function",
            "type": "article",
            "volume": "21"
        },
        {
            "author": [
                "Shoaib, M"
            ],
            "cn_type": "论文",
            "doi": "10.1038/s41467-021-25051-2",
            "first_page": "ARTN 4800",
            "is_representativeWork": false,
            "journal_title": "NATURE COMMUNICATIONS",
            "publish_year": "2021",
            "title": "Histone H4 lysine 20 mono-methylation directly facilitates chromatin openness and promotes transcription of housekeeping genes",
            "type": "article",
            "volume": "12"
        },
        {
            "author": [
                "Lowary, PT"
            ],
            "cn_type": "论文",
            "first_page": "19",
            "is_representativeWork": false,
            "journal_title": "JOURNAL OF MOLECULAR BIOLOGY",
            "publish_year": "1998",
            "title": "New DNA sequence rules for high affinity binding to histone octamer and sequence-directed nucleosome positioning",
            "type": "article",
            "volume": "276"
        },
        {
            "author": [
                "Shen, Y"
            ],
            "cn_type": "论文",
            "doi": "10.1007/s10858-013-9741-y",
            "first_page": "227",
            "is_representativeWork": false,
            "journal_title": "JOURNAL OF BIOMOLECULAR NMR",
            "publish_year": "2013",
            "title": "Protein backbone and sidechain torsion angles predicted from NMR chemical shifts using artificial neural networks",
            "type": "article",
            "volume": "56"
        },
        {
            "author": [
                "Cosgrove, MS"
            ],
            "cn_type": "论文",
            "doi": "10.1038/nsmb851",
            "first_page": "1037",
            "is_representativeWork": false,
            "journal_title": "NATURE STRUCTURAL & MOLECULAR BIOLOGY",
            "publish_year": "2004",
            "title": "Regulated nucleosome mobility and the histone code",
            "type": "article",
            "volume": "11"
        },
        {
            "author": [
                "Shi, XY"
            ],
            "cn_type": "论文",
            "doi": "10.1002/anie.201804707",
            "first_page": "9734",
            "is_representativeWork": false,
            "journal_title": "ANGEWANDTE CHEMIE-INTERNATIONAL EDITION",
            "publish_year": "2018",
            "title": "Structure and Dynamics in the Nucleosome Revealed by Solid-State NMR",
            "type": "article",
            "volume": "57"
        },
        {
            "author": [
                "DELAGLIO, F"
            ],
            "cn_type": "论文",
            "first_page": "277",
            "is_representativeWork": false,
            "journal_title": "JOURNAL OF BIOMOLECULAR NMR",
            "publish_year": "1995",
            "title": "NMRPIPE - A MULTIDIMENSIONAL SPECTRAL PROCESSING SYSTEM BASED ON UNIX PIPES",
            "type": "article",
            "volume": "6"
        },
        {
            "author": [
                "Soman, A"
            ],
            "cn_type": "论文",
            "doi": "10.1093/nar/gkaa289",
            "first_page": "5383",
            "is_representativeWork": false,
            "journal_title": "NUCLEIC ACIDS RESEARCH",
            "publish_year": "2020",
            "title": "The human telomeric nucleosome displays distinct structural and dynamic properties",
            "type": "article",
            "volume": "48"
        },
        {
            "author": [
                "Kelbauskas, L"
            ],
            "cn_type": "论文",
            "doi": "10.1021/bi061289l",
            "first_page": "2239",
            "is_representativeWork": false,
            "journal_title": "BIOCHEMISTRY",
            "publish_year": "2007",
            "title": "Sequence-dependent nucleosome structure and stability variations detected by Forster resonance energy transfer",
            "type": "article",
            "volume": "46"
        },
        {
            "author": [
                "Bak, M"
            ],
            "cn_type": "论文",
            "doi": "10.1006/jmre.2000.2179",
            "first_page": "296",
            "is_representativeWork": false,
            "journal_title": "JOURNAL OF MAGNETIC RESONANCE",
            "publish_year": "2000",
            "title": "SIMPSON: A general simulation program for solid-state NMR spectroscopy",
            "type": "article",
            "volume": "147"
        },
        {
            "author": [
                "Luger, K"
            ],
            "cn_type": "论文",
            "first_page": "1",
            "is_representativeWork": false,
            "journal_title": "CHROMATIN PROTOCOLS",
            "publish_year": "1999",
            "title": "Expression and purification of recombinant histones and nucleosome reconstitution",
            "type": "article",
            "volume": "119"
        },
        {
            "author": [
                "Wilson, MD"
            ],
            "cn_type": "论文",
            "doi": "10.1107/S2059798317004430",
            "first_page": "541",
            "is_representativeWork": false,
            "journal_title": "ACTA CRYSTALLOGRAPHICA SECTION D-STRUCTURAL BIOLOGY",
            "publish_year": "2017",
            "title": "Cryo-electron microscopy of chromatin biology",
            "type": "article",
            "volume": "73"
        },
        {
            "author": [
                "Hood, L"
            ],
            "cn_type": "论文",
            "doi": "10.1038/nature01410",
            "first_page": "444",
            "is_representativeWork": false,
            "journal_title": "NATURE",
            "publish_year": "2003",
            "title": "The digital code of DNA",
            "type": "article",
            "volume": "421"
        },
        {
            "author": [
                "Morcombe, CR"
            ],
            "cn_type": "论文",
            "doi": "10.1016/S1090-7807(03)00082-X",
            "first_page": "479",
            "is_representativeWork": false,
            "journal_title": "JOURNAL OF MAGNETIC RESONANCE",
            "publish_year": "2003",
            "title": "Chemical shift referencing in MAS solid state NMR",
            "type": "article",
            "volume": "162"
        },
        {
            "author": [
                "Gansen, A"
            ],
            "cn_type": "论文",
            "doi": "10.1038/s41467-018-06758-1",
            "first_page": "ARTN 4628",
            "is_representativeWork": false,
            "journal_title": "NATURE COMMUNICATIONS",
            "publish_year": "2018",
            "title": "High precision FRET studies reveal reversible transitions in nucleosomes between microseconds and minutes",
            "type": "article",
            "volume": "9"
        },
        {
            "author": [
                "Soman, A"
            ],
            "cn_type": "论文",
            "doi": "10.1038/s41586-022-05236-5",
            "first_page": "1048",
            "is_representativeWork": false,
            "journal_title": "NATURE",
            "publish_year": "2022",
            "title": "Columnar structure of human telomeric chromatin",
            "type": "article",
            "volume": "609"
        },
        {
            "author": [
                "Nozawa, K"
            ],
            "cn_type": "论文",
            "doi": "10.1073/pnas.2206542119",
            "first_page": "ARTN e2206542119",
            "is_representativeWork": false,
            "journal_title": "PROCEEDINGS OF THE NATIONAL ACADEMY OF SCIENCES OF THE UNITED STATES OF AMERICA",
            "publish_year": "2022",
            "title": "Cryo-electron microscopy structure of the H3-H4 octasome: A nucleosome-like particle without histones H2A and H2B",
            "type": "article",
            "volume": "119"
        },
        {
            "author": [
                "MUNOWITZ, M"
            ],
            "cn_type": "论文",
            "first_page": "1686",
            "is_representativeWork": false,
            "journal_title": "JOURNAL OF CHEMICAL PHYSICS",
            "publish_year": "1982",
            "title": "TWO-DIMENSIONAL SEPARATION OF DIPOLAR AND SCALED ISOTROPIC CHEMICAL-SHIFT INTERACTIONS IN MAGIC ANGLE NMR-SPECTRA",
            "type": "article",
            "volume": "77"
        },
        {
            "author": [
                "Lehmann, K"
            ],
            "cn_type": "论文",
            "doi": "10.1093/nar/gkz1186",
            "first_page": "1551",
            "is_representativeWork": false,
            "journal_title": "NUCLEIC ACIDS RESEARCH",
            "publish_year": "2020",
            "title": "Dynamics of the nucleosomal histone H3 N-terminal tail revealed by high precision single-molecule FRET",
            "type": "article",
            "volume": "48"
        },
        {
            "author": [
                "Verel, R"
            ],
            "cn_type": "论文",
            "doi": "10.1006/jmre.2001.2310",
            "first_page": "81",
            "is_representativeWork": false,
            "journal_title": "JOURNAL OF MAGNETIC RESONANCE",
            "publish_year": "2001",
            "title": "Adiabatic dipolar recoupling in solid-state NMR: The DREAM scheme",
            "type": "article",
            "volume": "150"
        },
        {
            "author": [
                "Gibson, BA"
            ],
            "cn_type": "论文",
            "doi": "10.1016/j.cell.2019.08.037",
            "first_page": "470",
            "is_representativeWork": false,
            "journal_title": "CELL",
            "publish_year": "2019",
            "title": "Organization of Chromatin by Intrinsic and Regulated Phase Separation",
            "type": "article",
            "volume": "179"
        },
        {
            "author": [
                "le Paige, Ulric B"
            ],
            "cn_type": "论文",
            "doi": "10.5194/mr-2-187-2021",
            "first_page": "187",
            "is_representativeWork": false,
            "journal_title": "Magnetic resonance (Gottingen, Germany)",
            "publish_year": "2021",
            "title": "Characterization of nucleosome sediments for protein interaction studies by solid-state NMR spectroscopy.",
            "type": "article",
            "volume": "2"
        },
        {
            "author": [
                "Armeev, GA"
            ],
            "cn_type": "论文",
            "doi": "10.1038/s41467-021-22636-9",
            "first_page": "ARTN 2387",
            "is_representativeWork": false,
            "journal_title": "NATURE COMMUNICATIONS",
            "publish_year": "2021",
            "title": "Histone dynamics mediate DNA unwrapping and sliding in nucleosomes",
            "type": "article",
            "volume": "12"
        },
        {
            "author": [
                "Gao, M"
            ],
            "cn_type": "论文",
            "doi": "10.1021/ja407526s",
            "first_page": "15278",
            "is_representativeWork": false,
            "journal_title": "JOURNAL OF THE AMERICAN CHEMICAL SOCIETY",
            "publish_year": "2013",
            "title": "Histone H3 and H4 N-Terminal Tails in Nucleosome Arrays at Cellular Concentrations Probed by Magic Angle Spinning NMR Spectroscopy",
            "type": "article",
            "volume": "135"
        },
        {
            "author": [
                "Vasudevan, D"
            ],
            "cn_type": "论文",
            "doi": "10.1016/j.jmb.2010.08.039",
            "first_page": "1",
            "is_representativeWork": false,
            "journal_title": "JOURNAL OF MOLECULAR BIOLOGY",
            "publish_year": "2010",
            "title": "Crystal Structures of Nucleosome Core Particles Containing the '601' Strong Positioning Sequence",
            "type": "article",
            "volume": "403"
        },
        {
            "author": [
                "Shi, XY"
            ],
            "cn_type": "论文",
            "doi": "10.1007/s12104-020-09927-w",
            "first_page": "99",
            "is_representativeWork": false,
            "journal_title": "BIOMOLECULAR NMR ASSIGNMENTS",
            "publish_year": "2020",
            "title": "Solid-state NMR C-13, N-15 assignments of human histone H3 in the nucleosome core particle",
            "type": "article",
            "volume": "14"
        },
        {
            "author": [
                "Luger, K"
            ],
            "cn_type": "论文",
            "first_page": "251",
            "is_representativeWork": false,
            "journal_title": "NATURE",
            "publish_year": "1997",
            "title": "Crystal structure of the nucleosome core particle at 2.8 angstrom resolution",
            "type": "article",
            "volume": "389"
        }
    ],
    "relation": [
        [
            "Shenzhen MSU BIT Univ, Dept Biol, Shenzhen, Guangdong, Peoples R China"
        ],
        [
            "Nanyang Technol Univ, Sch Biol Sci, Singapore, Singapore"
        ],
        [
            "Nanyang Technol Univ, Sch Biol Sci, Singapore, Singapore",
            "Case Western Reserve Univ, Dept Physiol & Biophys, Cleveland, OH USA"
        ],
        [
            "Nanyang Technol Univ, Sch Biol Sci, Singapore, Singapore"
        ],
        [
            "Nanyang Technol Univ, Sch Biol Sci, Singapore, Singapore",
            "Nanyang Technol Univ, NTU Inst Struct Biol, Singapore, Singapore"
        ]
    ],
    "relation_index": [
        [
            "0"
        ],
        [
            "1"
        ],
        [
            "1",
            "3"
        ],
        [
            "1"
        ],
        [
            "1",
            "2"
        ]
    ],
    "research_field": [],
    "source": "COMMUNICATIONS BIOLOGY",
    "source_list": [
        "DOAJ_Article",
        "WOSBP_JournalArticle",
        "Springer_JournalArticle",
        "pub-scholar-recommend"
    ],
    "title": "Structural and dynamical investigation of histone H2B in well-hydrated nucleosome core particles by solid-state NMR",
    "type": "article",
    "volume": 6
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