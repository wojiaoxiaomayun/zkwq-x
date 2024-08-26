import * as CONSTANT from '../constant'
import { ExportResource,ExportResourceTxt } from '../service'
import {AESEncode, ConvertArrayToString,clearHighlight} from './index'
/*
applicationId：应用ID,
fileName:导出文件名称，无需加后缀，
sheetName:sheet名
models：返回的详情数据
resourcePrefix：例如：https://ir.scholarin.cn/microapp/profile/article/
*/
export const exportExcel = (applicationId,fileName,sheetName,models,resourcePrefix) => {
  return ExportResource(buildExcelParams(applicationId,fileName,sheetName,models,resourcePrefix)).then(response => {
    let fileName1 = `${fileName}.xlsx`
    let blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' })
    let a = document.createElement('a')
    a.href = window.URL.createObjectURL(blob)
    a.setAttribute('download', fileName1)
    a.target = 'downloadIframe'
    a.click()
    if (window.navigator.msSaveBlob) {
      window.navigator.msSaveBlob(blob, fileName1)
    }
  })
}
/*
applicationId：应用ID,
fileName:导出文件名称，无需加后缀，
sheetName:sheet名
models：返回的详情数据
resourcePrefix：例如：https://ir.scholarin.cn/microapp/profile/article/
*/
export const buildExcelParams = (applicationId,fileName,sheetName,models,resourcePrefix) => {
  let params = {
    appid: applicationId,
    fileName: fileName,
    sheetName: sheetName,
    head: [],
    data: []
  }
  models.forEach(model => {
    let readable = model
    let rowData = []
    switch (readable.type) {
      case CONSTANT.TYPE_ARTICLE:
        params.head = [
          ['类型'],
          ['标题'],
          ['作者'],
          ['出版物'],
          ['卷'],
          ['期'],
          ['出版年'],
          ['关键词'],
          ['摘要'],
          ['会议名称'],
          ['专业'],
          ['学位类型'],
          ['学位授予时间'],
          ['学位授予机构'],
          ['DOI'],
          ['CSTR'],
          ['URL']
        ]
        rowData = [
          readable.article_type,
          clearHighlight(readable.title),
          clearHighlight(ConvertArrayToString(readable.author)),
          readable.source ? clearHighlight(readable.source) : '',
          readable.volume ? readable.volume : '',
          readable.issue ? readable.issue : '',
          readable.year ? readable.year : '',
          clearHighlight(ConvertArrayToString(readable.keywords || readable.keyword)),
          readable.abstracts ? clearHighlight(readable.abstracts) : '',
          readable.article_type === '会议论文' ? clearHighlight(readable.source) : '',
          clearHighlight(readable.major),
          clearHighlight(readable.degree),
          readable.year,
          clearHighlight(ConvertArrayToString(readable.graduation_institution)),
          readable.doi,
          '',
          resourcePrefix + AESEncode(readable.id)
        ]
        break
      case CONSTANT.TYPE_PATENT:
        params.head = [
          [
            '标题'
          ],
          [
            '专利类型'
          ],
          [
            '发明人'
          ],
          [
            '申请（专利权）人'
          ],
          [
            '申请号'
          ],
          [
            '申请日期'
          ],
          [
            'IPC分类'
          ],
          [
            'CPC分类'
          ],
          [
            '摘要'
          ],
          [
            'URL'
          ]
        ]
        rowData = [
          clearHighlight(readable.title),
          clearHighlight(readable.patent_type),
          clearHighlight(ConvertArrayToString(readable.inventors || readable.inventor)),
          clearHighlight(ConvertArrayToString(readable.applicants || readable.applicant)),
          clearHighlight(readable.apply_number),
          clearHighlight(readable.apply_date),
          clearHighlight(ConvertArrayToString(readable.ipc_number)),
          clearHighlight(ConvertArrayToString(readable.cpc_number)),
          readable.abstracts ? clearHighlight(readable.abstracts) : '',
          resourcePrefix + AESEncode(readable.id)
        ];
        break
      case CONSTANT.TYPE_SCIENCE_DB:
        params.head = [
          [
            '标题'
          ],
          [
            '发布时间'
          ],
          [
            '提交者'
          ],
          [
            '关键词'
          ],
          [
            '摘要'
          ],
          [
            'CSTR'
          ],
          [
            'URL'
          ]
        ]
        rowData = [
          clearHighlight(readable.title),
          clearHighlight(readable.date),
          clearHighlight(ConvertArrayToString(readable.author)),
          clearHighlight(ConvertArrayToString(readable.keywords || readable.keyword)),
          readable.abstracts ? clearHighlight(readable.abstracts) : '',
          readable.cstr || '',
          resourcePrefix + AESEncode(readable.id)
        ];
        break;
      case CONSTANT.TYPE_REPORT:
        params.head = [
          [
            '标题'
          ],
          [
            '编译者'
          ],
          [
            '编译时间'
          ],
          [
            '所属服务领域'
          ],
          [
            '摘要'
          ],
          [
            'URL'
          ]
        ]
        rowData = [
          clearHighlight(readable.title),
          clearHighlight(ConvertArrayToString(readable.author)),
          clearHighlight(readable.date),
          clearHighlight(readable.journal),
          readable.abstracts ? clearHighlight(readable.abstracts) : '',
          resourcePrefix + AESEncode(readable.id)
        ];
        break;
      case CONSTANT.TYPE_BOOK:
        params.head = [
          [
            '标题'
          ],
          [
            '作者'
          ],
          [
            '出版日期'
          ],
          [
            '出版社'
          ],
          [
            'ISBN'
          ],
          [
            '学科分类'
          ],
          [
            '简介'
          ],
          [
            'URL'
          ]
        ]
        rowData = [
          clearHighlight(readable.title),
          clearHighlight(ConvertArrayToString(readable.author)),
          clearHighlight(readable.year),
          clearHighlight(readable.publisher),
          clearHighlight(readable.isbn),
          clearHighlight(readable.subject),
          readable.abstracts ? clearHighlight(readable.abstracts) : '',
          resourcePrefix + AESEncode(readable.id)
        ];
        break;
      default:
        params.head = [['标题'], ['作者'], ['摘要']]
        rowData = [
          clearHighlight(readable.title),
          clearHighlight(ConvertArrayToString(readable.author)),
          readable.abstracts ? clearHighlight(readable.abstracts) : ''
        ];
    }
    params.data.push(rowData)
  })
  return params;
}
/*
applicationId：应用ID,
fileName:导出文件名称，无需加后缀，
models：返回的详情数据
resourcePrefix：例如：https://ir.scholarin.cn/microapp/profile/article/
*/
export const exportRIS = (applicationId,fileName,models,resourcePrefix) => {
  return ExportResourceTxt(buildRISParams(applicationId,fileName,models,resourcePrefix)).then(response => {
    let fileName1 = `${fileName}.ris`
    let blob = new Blob([response], { type: 'application/octet-stream;charset=utf-8' })
    let a = document.createElement('a')
    a.href = window.URL.createObjectURL(blob)
    a.setAttribute('download', fileName1)
    a.target = 'downloadIframe'
    a.click()
    if (window.navigator.msSaveBlob) {
      window.navigator.msSaveBlob(blob, fileName1)
    }
  })
}
/*
applicationId：应用ID,
fileName:导出文件名称，无需加后缀，
models：返回的详情数据
resourcePrefix：例如：https://ir.scholarin.cn/microapp/profile/article/
*/
export const buildRISParams = (applicationId,fileName,models,resourcePrefix) => {
  let params = {
    appid: applicationId,
    fileName: fileName,
    text: [
    ]
  }
  models?.forEach(model => {
    if (model.type === CONSTANT.TYPE_PATENT) {
      params.text.push(...[
        `RT  - PATENT`,
        `SR  - 1`,
        `A1  - ${clearHighlight(ConvertArrayToString(model.inventors || model.inventor))}`,
        `A2  - ${clearHighlight(ConvertArrayToString(model.applicants || model.applicant))}`,
        `T1  - ${clearHighlight(model.title)}`,
        `FD  - ${model.apply_date}`,
        `ID  - ${model.issue_number}`,
        `CL  - ${model.patent_type}`,
        `AB  - ${model.abstracts ? clearHighlight(model.abstracts) : ''}`,
        `UR  - ${resourcePrefix + AESEncode(model.id)}`,
        `ER  -`
      ])
    } else if (model.type === CONSTANT.TYPE_BOOK) {
      params.text.push(...[
        `RT  - BOOK`,
        `SR  - 1`,
        `T1  - ${clearHighlight(model.title)}`,
        `A1  - ${clearHighlight(ConvertArrayToString(model.author))}`,
        // `A2  - ${clearHighlight(ConvertArrayToString(readable.applicants))}`,
        `PB  - ${model.publisher}`,
        `FD  - ${model.year}`,
        `ED  - 1`,
        `AB  - ${model.abstracts ? clearHighlight(model.abstracts) : ''}`,
        `SN  - ${model.isbn}`,
        `UR  - ${resourcePrefix + AESEncode(model.id)}`,
        `ER  -`
      ])
    } else {
      params.text.push(...[
        `TY  - ${model.type === CONSTANT.TYPE_ARTICLE ? (model.article_type === '期刊论文' ? 'JOUR' : model.article_type === '学位论文' ? 'THES' : model.article_type === '会议论文' ? 'CPAPER' : 'JOUR') : model.type === CONSTANT.TYPE_PATENT ? 'PAT' : model.type === CONSTANT.TYPE_SCIENCE_DB ? 'DATA' : model.type === CONSTANT.TYPE_BOOK ? 'BOOK' : model.type === CONSTANT.TYPE_REPORT ? 'RPRT' : 'JOUR'}`,
        `T1  - ${clearHighlight(model.title)}`
      ])
      let authors = model.author || [];
      authors.forEach(item => {
        params.text.push(`AU  - ${clearHighlight(item)}`)
      })
      let metaArray = [
        `JO  - ${model.source ? clearHighlight(model.source) : ''}`,
        `VL  - ${model.volume ? model.volume : ''}`,
        `IS  - ${model.issue ? model.issue : ''}`,
        `SP  - ${model.first_page ? model.first_page : ''}`,
        `EP  - ${model.last_page ? model.last_page : ''}`,
        `PY  - ${model.year ? model.year : ''}`,
        `KW  - ${clearHighlight(ConvertArrayToString(model.keywords || model.keyword))}`,
        `AB  - ${model.abstracts ? clearHighlight(model.abstracts) : ''}`,
        `DO  - ${model.doi || ''}`,
        `UR  - ${resourcePrefix + AESEncode(model.id)}`,
        `ER  -`
      ]
      metaArray.forEach(item => {
        params.text.push(item)
      })
    }
  });
  return params;
}