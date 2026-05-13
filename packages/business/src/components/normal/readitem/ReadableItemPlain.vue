<template>
  <div class="ContentItem ContentItem--plain" :class="{'is-en':!isChineseReadable || !isThemeZh}">
    <template v-if="readable.type !== TYPE_FACILITY && readable.type !== TYPE_LITERATURE && readable.type !== TYPE_BULLETIN && readable.type !== TYPE_BOOK && readable.type !== TYPE_SOFTWARE && readable.type !==  TYPE_JOURNAL">
      <h2 class="ContentItem__title">
        <span class="ContentItem__titleText" :data-title="titlePlainText(readable.title)">
          <rich-text :text="readable.title"></rich-text>
        </span>
        <span v-if="1!==1 && isFreeDownload" class="ContentItem__titleLabel ContentItem__titleLabel--free">「可获取全文」</span>
        <span v-if="1!==1 && hasPDF" class="ContentItem__titleLabel ContentItem__titleLabel--pdf">「本地下载」</span>
        <span class="ContentItem__titleLabel ContentItem__titleLabel--oa" v-if="readable.type === TYPE_ARTICLE && readable.is_free">「Open Access」</span>
        <span class="ContentItem__titleLabel ContentItem__titleLabel--oa" v-if="readable.type === TYPE_PATENT && readable.grant_date">「授权」</span>
        <base-tag v-if="readable.article_type === '预印本'" size="mini">{{readable.status === 1 ? '已发布' : '未发布'}}</base-tag>
      </h2>
      <div class="TranslateContent" v-if="readable.title_translated">
        <rich-text :text="readable.title_translated"></rich-text>
        <div v-if="isThemeZh" class="TranslateSupport">
          机器翻译由<svg t="1685325678764" class="Icon" viewBox="0 0 1199 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1668" width="16" height="16"><path d="M599.010743 585.142857L380.342857 254.741943c6.612114-7.021714 13.253486-13.897143 19.894857-20.6848L614.4 557.8752c-4.681143 8.484571-9.801143 17.6128-15.389257 27.267657M1169.378743 189.586286c10.8544-2.925714 4.008229-1.667657 30.164114-8.016457-42.1888-8.6016-298.656914 3.8912-494.533486 257.2288l-172.587885-255.912229h-66.823315l205.2096 303.572114c-5.149257 7.811657-10.327771 15.652571-15.36 23.815315a197.514971 197.514971 0 0 0-3.364571 5.705142L430.6944 189.674057C558.226286 71.124114 673.616457 0 673.616457 0c-16.764343 9.450057-32.9728 19.017143-48.917943 28.554971-88.590629 51.024457-165.6832 102.8096-232.535771 154.331429H359.277714l11.410286 16.822857c-7.957943 6.3488-15.798857 12.6976-23.434971 19.017143l-24.3712-35.84H256.087771l48.9472 71.972571c-149.328457 132.593371-233.442743 260.154514-272.764342 364.631772-46.138514 122.411886-31.217371 201.757257-24.693029 225.865143 9.947429 36.864 27.999086 66.121143 49.5616 90.258285 109.3632 122.821486 297.749943 96.256 444.357486 47.9232 128.234057-40.842971 230.458514-103.541029 230.458514-103.541028-271.506286 137.801143-549.888 174.109257-623.586743-45.962972-0.760686-2.2528-1.609143-4.5056-2.135771-6.846171-7.811657-34.757486-9.303771-73.201371 1.082514-127.7952 29.344914-154.185143 121.329371-294.063543 222.851657-407.552l243.360914 357.814857c-74.166857 110.650514-197.719771 249.709714-382.595657 287.685486 0 0 318.142171 27.794286 506.528915-227.415772l153.365942 227.415772h66.794058l-187.333486-277.152914c3.013486-5.149257 5.997714-10.357029 8.923428-15.711086 1.960229-3.598629 4.447086-8.016457 7.168-12.873143l207.4624 305.737143h66.823315l-243.419429-358.341486c5.822171-9.508571 12.141714-19.6608 18.900114-30.3104l264.192 388.651886h66.794058L828.942629 498.980571c83.031771-121.534171 209.627429-274.139429 340.436114-309.423542" fill="#0294AD" p-id="1669"></path></svg>科大讯飞 提供技术支持
        </div>
        <div v-if="!isThemeZh" class="TranslateSupport">
          Supported by <svg t="1685325678764" class="Icon" viewBox="0 0 1199 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1668" width="16" height="16"><path d="M599.010743 585.142857L380.342857 254.741943c6.612114-7.021714 13.253486-13.897143 19.894857-20.6848L614.4 557.8752c-4.681143 8.484571-9.801143 17.6128-15.389257 27.267657M1169.378743 189.586286c10.8544-2.925714 4.008229-1.667657 30.164114-8.016457-42.1888-8.6016-298.656914 3.8912-494.533486 257.2288l-172.587885-255.912229h-66.823315l205.2096 303.572114c-5.149257 7.811657-10.327771 15.652571-15.36 23.815315a197.514971 197.514971 0 0 0-3.364571 5.705142L430.6944 189.674057C558.226286 71.124114 673.616457 0 673.616457 0c-16.764343 9.450057-32.9728 19.017143-48.917943 28.554971-88.590629 51.024457-165.6832 102.8096-232.535771 154.331429H359.277714l11.410286 16.822857c-7.957943 6.3488-15.798857 12.6976-23.434971 19.017143l-24.3712-35.84H256.087771l48.9472 71.972571c-149.328457 132.593371-233.442743 260.154514-272.764342 364.631772-46.138514 122.411886-31.217371 201.757257-24.693029 225.865143 9.947429 36.864 27.999086 66.121143 49.5616 90.258285 109.3632 122.821486 297.749943 96.256 444.357486 47.9232 128.234057-40.842971 230.458514-103.541029 230.458514-103.541028-271.506286 137.801143-549.888 174.109257-623.586743-45.962972-0.760686-2.2528-1.609143-4.5056-2.135771-6.846171-7.811657-34.757486-9.303771-73.201371 1.082514-127.7952 29.344914-154.185143 121.329371-294.063543 222.851657-407.552l243.360914 357.814857c-74.166857 110.650514-197.719771 249.709714-382.595657 287.685486 0 0 318.142171 27.794286 506.528915-227.415772l153.365942 227.415772h66.794058l-187.333486-277.152914c3.013486-5.149257 5.997714-10.357029 8.923428-15.711086 1.960229-3.598629 4.447086-8.016457 7.168-12.873143l207.4624 305.737143h66.823315l-243.419429-358.341486c5.822171-9.508571 12.141714-19.6608 18.900114-30.3104l264.192 388.651886h66.794058L828.942629 498.980571c83.031771-121.534171 209.627429-274.139429 340.436114-309.423542" fill="#0294AD" p-id="1669"></path></svg> iFLYTEK
        </div>
      </div>
      <div class="TranslateTitle" v-if="readable.type === TYPE_LITERATURE && readable.cn_title && readable.title !== readable.cn_title">{{readable.cn_title}}</div>
      <template v-if="readable.type === TYPE_ARTICLE && readable.article_type !== '学位论文' && !isArrayEmpty(readable.author)">
        <div class="ContentItem__author AuthorInfo" :class="{'is-disabled':!enableSearch}">
          <base-tooltip v-if="!isMobileClient" :content="isThemeZh?('共 ' + readable.author.length + ' 位'):(readable.author.length + ' ') + authorLabel" placement="right">
            <i class="base-icon-s-custom"></i>
          </base-tooltip>
          <div class="AuthorInfo__content">
            <template v-if="!readable.show_all_author">
              <template v-if="readable.author.length <= 6">
                <span v-for="(author, index) in readable.author" :key="readable.type+index+author" class="AuthorInfo__name">
                  <span class="AuthorInfo__nameText" v-if="index === readable.author.length - 1" v-html="author.replace(', ', ' ')"></span>
                  <template v-else>
                    <span class="AuthorInfo__nameText" v-html="author.replace(', ', ' ')"></span>
                    <span class="ContentItem__comma">,</span>
                  </template>
                </span>
              </template>
              <template v-if="readable.author.length > 6">
                <span v-for="(author, index) in readable.author" :key="readable.type+index+author" class="AuthorInfo__name" v-if="index < 5">
                  <span class="AuthorInfo__nameText" v-if="index === 4" v-html="author.replace(', ', ' ')"></span>
                  <template v-else>
                    <span class="AuthorInfo__nameText" v-html="author.replace(', ', ' ')"></span>
                    <span class="ContentItem__comma">,</span>
                  </template>
                </span>
                <base-tooltip :content="$t('explore.action19')" placement="top">
                  <span class="AuthorInfo__extra" @click="showAllAuthor">···</span>
                </base-tooltip>
                <span class="AuthorInfo__name">
                  <span class="AuthorInfo__nameText" v-html="readable.author[readable.author.length - 1]"></span>
                </span>
              </template>
            </template>
            <template v-if="readable.show_all_author">
              <span v-for="(author, index) in readable.author" :key="author" class="AuthorInfo__name">
                <span class="AuthorInfo__nameText" v-if="index === readable.author.length - 1" v-html="author.replace(', ', ' ')"></span>
                <template v-else>
                  <span class="AuthorInfo__nameText" v-html="author.replace(', ', ' ')"></span>
                  <span class="ContentItem__comma">,</span>
                </template>
              </span>
            </template>
          </div>
        </div>
      </template>
      <template v-if="(readable.type === TYPE_SCIENCE_DB || readable.type === TYPE_BOOK) && !isArrayEmpty(readable.author)">
        <div class="ContentItem__author AuthorInfo" :class="{'is-disabled':!enableSearch}">
          <base-tooltip v-if="!isMobileClient" :content="isThemeZh?('共 ' + readable.author.length + ' 位'):(readable.author.length + ' ') + authorLabel" placement="right">
            <i class="base-icon-s-custom"></i>
          </base-tooltip>
          <div class="AuthorInfo__content">
            <template v-if="!readable.show_all_author">
              <template v-if="readable.author.length <= 6">
              <span v-for="(author, index) in readable.author" :key="readable.type+index+author" class="AuthorInfo__name">
                <span class="AuthorInfo__nameText" v-if="index === readable.author.length - 1" v-html="author"></span>
                <template v-else>
                  <span class="AuthorInfo__nameText" v-html="author"></span>
                  <span class="ContentItem__comma">,</span>
                </template>
              </span>
              </template>
              <template v-if="readable.author.length > 6">
              <span v-for="(author, index) in readable.author" :key="readable.type+index+author" class="AuthorInfo__name" v-if="index < 5">
                    <span class="AuthorInfo__nameText" v-if="index === 4" v-html="author"></span>
                    <template v-else>
                      <span class="AuthorInfo__nameText" v-html="author"></span>
                      <span class="ContentItem__comma">,</span>
                    </template>
                  </span>
                <base-tooltip :content="$t('explore.action19')" placement="top">
                  <span class="AuthorInfo__extra" @click="showAllAuthor">···</span>
                </base-tooltip>
                <span class="AuthorInfo__name">
                  <span class="AuthorInfo__nameText" v-html="readable.author[readable.author.length - 1]"></span>
                </span>
              </template>
            </template>
            <template v-if="readable.show_all_author">
            <span v-for="(author, index) in readable.author" :key="author" class="AuthorInfo__name">
              <span class="AuthorInfo__nameText" v-if="index === readable.author.length - 1" v-html="author"></span>
              <template v-else>
                <span class="AuthorInfo__nameText" v-html="author"></span>
                <span class="ContentItem__comma">,</span>
              </template>
            </span>
            </template>
          </div>
        </div>
      </template>
      <template v-if="readable.type === TYPE_LITERATURE  && !isArrayEmpty(readable.author)">
        <div class="ContentItem__author AuthorInfo is-disabled">
          <div class="AuthorInfo__content">
            <template v-if="!readable.show_all_author">
              <template v-if="readable.author.length <= 6">
              <span v-for="(author, index) in readable.author" :key="readable.type+index+author" class="AuthorInfo__name">
                <span class="AuthorInfo__nameText" v-if="index === readable.author.length - 1" v-html="author"></span>
                <template v-else>
                  <span class="AuthorInfo__nameText" v-html="author"></span>
                  <span class="ContentItem__comma">,</span>
                </template>
              </span>
              </template>
              <template v-if="readable.author.length > 6">
              <span v-for="(author, index) in readable.author" :key="readable.type+index+author" class="AuthorInfo__name" v-if="index < 5">
                    <span class="AuthorInfo__nameText" v-if="index === 4" v-html="author"></span>
                    <template v-else>
                      <span class="AuthorInfo__nameText" v-html="author"></span>
                      <span class="ContentItem__comma">,</span>
                    </template>
                  </span>
                <base-tooltip :content="$t('explore.action19')" placement="top">
                  <span class="AuthorInfo__extra" @click="showAllAuthor">···</span>
                </base-tooltip>
                <span class="AuthorInfo__name">
                  <span class="AuthorInfo__nameText" v-html="readable.author[readable.author.length - 1]"></span>
                </span>
              </template>
            </template>
            <template v-if="readable.show_all_author">
            <span v-for="(author, index) in readable.author" :key="author" class="AuthorInfo__name">
              <span class="AuthorInfo__nameText" v-if="index === readable.author.length - 1" v-html="author"></span>
              <template v-else>
                <span class="AuthorInfo__nameText" v-html="author"></span>
                <span class="ContentItem__comma">,</span>
              </template>
            </span>
            </template>
          </div>
        </div>
      </template>
      <template v-if="readable.type === TYPE_ARTICLE && readable.article_type === '学位论文' && !isArrayEmpty(readable.author)">
        <div class="ContentItem__author AuthorInfo" :class="{'is-disabled':!enableSearch}">
          <base-tooltip v-if="!isMobileClient" :content="isThemeZh?('共 ' + readable.author.length + ' 位'):(readable.author.length + ' ') + authorLabel" placement="right">
            <i class="base-icon-s-custom"></i>
          </base-tooltip>
          <div class="AuthorInfo__content">
            <span v-for="(author, index) in readable.author" :key="author" class="AuthorInfo__name">
              <span class="AuthorInfo__nameText" v-if="index === readable.author.length - 1" v-html="author"></span>
              <template v-else>
                <span class="AuthorInfo__nameText" v-html="author"></span>
                <span class="ContentItem__comma">,</span>
              </template>
            </span><span class="ContentItem__comma">,</span>
            <span class="AuthorInfo__name AuthorInfo__name--light" v-if="readable.degree">
            <span class="AuthorInfo__nameText is-disabled">{{readable.degree}}</span>
          </span><span class="ContentItem__comma" v-if="readable.degree && readable.major && readable.major !== '专业'">,</span>
            <span class="AuthorInfo__name AuthorInfo__name--light" v-if="readable.major && readable.major !== '专业'">
            <span class="AuthorInfo__nameText" v-html="readable.major + '专业'"></span></span><span class="ContentItem__comma" v-if="(readable.degree || (readable.major && readable.major !== '专业')) && !isArrayEmpty(readable.tutor)">,</span>
            <span class="AuthorInfo__name AuthorInfo__name--light" v-if="!isArrayEmpty(readable.tutor)"><span class="ContentItem__label">导师:</span><span v-for="(tutor, index) in readable.tutor" :key="tutor+index"><span v-if="index === readable.tutor.length - 1" class="AuthorInfo__nameText" v-html="tutor"></span><template v-else><span class="AuthorInfo__nameText" v-html="tutor"></span><span class="ContentItem__comma">, </span></template></span></span>
          </div>
        </div>
      </template>
      <template v-if="readable.type === TYPE_PATENT && !isArrayEmpty(readable.inventors)">
        <div class="ContentItem__author AuthorInfo" :class="{'is-disabled':readable.is_inventor_disabled}">
          <div class="AuthorInfo__content">
            <template v-if="readable.patent_type === '外观设计' || readable.patent_type === '美国外观设计'">
              <span class="AuthorInfo__name ContentItem__label" v-if="isChineseReadable && isThemeZh">设计人:</span>
              <span class="AuthorInfo__name ContentItem__label" v-else>Designer:</span>
            </template>
            <template v-if="!(readable.patent_type === '外观设计' || readable.patent_type === '美国外观设计')">
              <span class="AuthorInfo__name ContentItem__label" v-if="isChineseReadable && isThemeZh">发明人:</span>
              <span class="AuthorInfo__name ContentItem__label" v-else>Inventor:</span>
            </template>
            <template v-if="!readable.show_all_author">
              <template v-if="readable.inventors.length <= 6">
              <span v-for="(inventor, index) in readable.inventors" :key="inventor" class="AuthorInfo__name">
                <span class="AuthorInfo__nameText" v-if="index === readable.inventors.length - 1" v-html="inventor"></span>
                <template v-else>
                  <span class="AuthorInfo__nameText" v-html="inventor"></span>
                  <span class="ContentItem__comma">,</span>
                </template>
              </span>
              </template>
              <template v-if="readable.inventors.length > 6">
              <span v-for="(inventor, index) in readable.inventors" :key="inventor" class="AuthorInfo__name" v-if="index < 5">
                    <span class="AuthorInfo__nameText" v-if="index === 4" v-html="inventor"></span>
                    <template v-else>
                      <span class="AuthorInfo__nameText" v-html="inventor"></span>
                      <span class="ContentItem__comma">,</span>
                    </template>
                  </span>
                <span class="AuthorInfo__extra" @click="showAllAuthor">···</span>
                <span class="AuthorInfo__name">
                  <span class="AuthorInfo__nameText" v-html="readable.inventors[readable.inventors.length - 1]"></span>
                </span>
              </template>
            </template>
            <template v-if="readable.show_all_author">
            <span v-for="(inventor, index) in readable.inventors" :key="inventor" class="AuthorInfo__name">
              <span class="AuthorInfo__nameText" v-if="index === readable.inventors.length - 1" v-html="inventor"></span>
              <template v-else>
                <span class="AuthorInfo__nameText" v-html="inventor"></span>
                <span class="ContentItem__comma">,</span>
              </template>
            </span>
            </template>
          </div>
        </div>
      </template>
      <template v-if="readable.type === TYPE_PATENT && !isArrayEmpty(readable.applicants)">
        <div class="ContentItem__author AuthorInfo" :class="{'is-disabled':readable.is_applicant_disabled}">
          <div class="AuthorInfo__content">
            <span v-if="isChineseReadable && isThemeZh" class="AuthorInfo__name ContentItem__label">申请人:</span>
            <span v-else class="AuthorInfo__name ContentItem__label">Applicant:</span>
            <span v-for="(applicant, index) in readable.applicants" :key="applicant+index" class="AuthorInfo__name">
              <span class="AuthorInfo__nameText" v-if="index === readable.applicants.length - 1" v-html="applicant"></span>
              <template v-else>
                <span class="AuthorInfo__nameText" v-html="applicant"></span>
                <span class="ContentItem__comma">,</span>
              </template>
            </span>
          </div>
        </div>
      </template>
      <div v-if="readable.type === TYPE_ARTICLE && readable.year && readable.article_type !== '学位论文' && readable.article_type !== '预发布论文'" class="ContentItem__meta">
        <span v-if="isChineseReadable && isThemeZh" class="ContentItem__source">
          <span class="ContentItem__metaSource" :class="{'is-disabled':!enableSearch}" v-if="readable.source" style="margin-left: -6px">《<span v-html="readable.source"></span>》</span>
          <span v-if="!hidden && !isArrayEmpty(readable.collections)" v-for="(item,index) in readable.collections" :key="item" class="Keyword" :class="[{'is-last':index===readable.collections.length-1},{'is-first':index===0}]">{{item}}</span>
          <span v-if="readable.year && readable.issue">{{ readable.year+' 年'}}<template v-if="readable.issue">{{ '第 '+readable.issue+' 期' }}</template></span>
          <span v-if="readable.year && !readable.issue">{{ readable.year+' 年'}}<template v-if="readable.volume">{{ '第 '+readable.volume+' 卷' }}</template></span>
          <span v-if="readable.first_page && readable.last_page">{{ readable.first_page +' - '+ readable.last_page}}</span>
          <span v-if="((readable.first_page && !readable.last_page) || (!readable.first_page && readable.last_page)) && readable.article_type !== '学位论文'">{{ '页码 ' + (readable.first_page?readable.first_page:readable.last_page)}}</span>
          <span v-if="totalPages > 0">{{ ', 共 '+totalPages+' 页' }}</span>
        </span>
        <span v-if="!isChineseReadable || !isThemeZh" class="ContentItem__source">
          <span class="ContentItem__metaSource is-en" :class="{'is-disabled':!enableSearch}" v-if="readable.source" style="margin-left: -6px">《<span v-html="readable.source"></span>》</span>
          <span v-if="!hidden && !isArrayEmpty(readable.collections)" v-for="(item,index) in readable.collections" :key="item" class="Keyword" :class="[{'is-last':index===readable.collections.length-1},{'is-first':index===0}]">{{item}}</span>
          <span v-if="readable.year && readable.volume">{{ readable.year}}<template v-if="readable.volume">{{ ' , Volume '+readable.volume}}</template></span>
          <span v-if="readable.year && !readable.volume">{{ readable.year}}<template v-if="readable.issue">{{ ' , Issue '+readable.issue}}</template></span>
          <span v-if="readable.first_page && readable.last_page">{{', Pages ' + readable.first_page +' - '+ readable.last_page}}</span>
          <span v-if="((readable.first_page && !readable.last_page) || (!readable.first_page && readable.last_page)) && readable.article_type !== '学位论文'">{{ ', Article ' + (readable.first_page?readable.first_page:readable.last_page)}}</span>
        </span>
      </div>
      <div v-if="readable.type === TYPE_LITERATURE && (readable.source || readable.source) " class="ContentItem__meta">
        <span class="ContentItem__source">
          <span v-if="readable.source">{{readable.source}}</span>
          <span v-if="readable.source && readable.issue">,</span>
          <span v-if="readable.issue">{{readable.source}}</span>
        </span>
      </div>
      <div v-if="readable.type === TYPE_ARTICLE && (readable.graduation_institution || readable.tutor || readable.school || readable.year) && readable.article_type === '学位论文'" class="ContentItem__meta">
        <span v-if="isChineseReadable && isThemeZh" class="ContentItem__source" :class="{'is-disabled':!enableSearch}">
          <span v-if="readable.year">
             <span class="ContentItem__label">学位授予时间:</span>
             {{readable.year}}
           </span>
          <span v-if="!isArrayEmpty(readable.graduation_institution) && readable.year" class="ContentItem__comma">,</span>
          <span v-if="!isArrayEmpty(readable.graduation_institution)">
             <span class="ContentItem__label">学位授予单位:</span>
             <span v-for="(graduation, index) in readable.graduation_institution" :key="graduation+index"><span v-if="index === readable.graduation_institution.length - 1" class="AuthorInfo__nameText" v-html="graduation"></span><template v-else><span class="AuthorInfo__nameText" v-html="graduation"></span><span class="ContentItem__comma">, </span></template></span>
           </span>
          <span v-if="(readable.year || !isArrayEmpty(readable.graduation_institution)) && !isArrayEmpty(readable.school)" class="ContentItem__comma">,</span>
          <span v-if="!isArrayEmpty(readable.school)">
             <span class="ContentItem__label">培养单位:</span>
             <span v-for="(school, index) in readable.school" :key="school+index"><span v-if="index === readable.school.length - 1" class="AuthorInfo__nameText" v-html="school"></span><template v-else><span class="AuthorInfo__nameText" v-html="school"></span><span class="ContentItem__comma">, </span></template></span>
           </span>
        </span>
        <span v-if="!isChineseReadable || !isThemeZh" class="ContentItem__source" :class="{'is-disabled':!enableSearch}">
          <span v-if="readable.year">
             <span class="ContentItem__label">学位授予时间:</span>
             {{readable.year}}
           </span>
          <span v-if="!isArrayEmpty(readable.graduation_institution) && readable.year" class="ContentItem__comma">,</span>
          <span v-if="!isArrayEmpty(readable.graduation_institution)">
             <span class="ContentItem__label">学位授予单位:</span>
             <span v-for="(graduation, index) in readable.graduation_institution" :key="graduation+index"><span v-if="index === readable.graduation_institution.length - 1" class="AuthorInfo__nameText" v-html="graduation"></span><template v-else><span class="AuthorInfo__nameText" v-html="graduation"></span><span class="ContentItem__comma">, </span></template></span>
           </span>
          <span v-if="(readable.year || !isArrayEmpty(readable.graduation_institution)) && !isArrayEmpty(readable.school)" class="ContentItem__comma">,</span>
          <span v-if="!isArrayEmpty(readable.school)">
             <span class="ContentItem__label">培养单位:</span>
             <span v-for="(school, index) in readable.school" :key="school+index"><span v-if="index === readable.school.length - 1" class="AuthorInfo__nameText" v-html="school"></span><template v-else><span class="AuthorInfo__nameText" v-html="school"></span><span class="ContentItem__comma">, </span></template></span>
           </span>
        </span>
      </div>
      <div v-if="readable.type === TYPE_ARTICLE && (readable.source || readable.year || readable.date) && readable.article_type === '预发布论文'" class="ContentItem__meta">
      <span class="ContentItem__source" :class="{'is-disabled':!enableSearch}">
        <span v-if="readable.source">
           <span class="ContentItem__label" v-if="isChineseReadable && isThemeZh">来源预印本平台:</span>
           <span class="ContentItem__label" v-else>Posted from:</span>
           <span class="AuthorInfo__nameText" v-html="readable.source"></span>
         </span>
        <span v-if="(readable.year || readable.date) && readable.source" class="ContentItem__comma">,</span>
        <span v-if="readable.year || readable.date">
           <span class="ContentItem__label" v-if="isChineseReadable && isThemeZh">提交时间:</span>
           <span class="ContentItem__label" v-else>Posted date:</span>
           {{readable.date ? readable.date : readable.year}}
         </span>
      </span>
      </div>
      <div v-if="readable.type === TYPE_PATENT && readable.apply_date" class="ContentItem__meta">
        <span class="ContentItem__source">
        <span v-if="readable.apply_date">
          <span v-if="isChineseReadable && isThemeZh" class="ContentItem__label">申请日:</span>
          <span v-else class="ContentItem__label">Application Date</span>
          <span>{{formatPatentDate(readable.apply_date)}}</span>
        </span>
        <span v-if="readable.apply_number && readable.apply_date" class="ContentItem__comma">,</span>
        <span v-if="readable.apply_number">
          <span v-if="isChineseReadable && isThemeZh" class="ContentItem__label">申请号:</span>
          <span v-else class="ContentItem__label">Application No.</span>
          <span v-html="readable.apply_number"></span>
        </span>
      </span>
      </div>
      <div v-if="readable.type === TYPE_PATENT && readable.issue_date" class="ContentItem__meta">
        <span class="ContentItem__source">
          <span v-if="readable.issue_date">
            <span v-if="isChineseReadable && isThemeZh" class="ContentItem__label">公开日（公开）:</span>
            <span v-else class="ContentItem__label">Publication Date (public)</span>
            <span>{{formatPatentDate(readable.issue_date)}}</span>
          </span>
          <span v-if="readable.issue_number && readable.issue_date" class="ContentItem__comma">,</span>
          <span v-if="readable.issue_number">
            <span v-if="isChineseReadable && isThemeZh" class="ContentItem__label">公开号（公开）:</span>
            <span v-else class="ContentItem__label">Publication No. (public)</span>
            <span v-html="readable.issue_number"></span>
          </span>
        </span>
      </div>
      <div v-if="readable.type === TYPE_PATENT && readable.grant_date" class="ContentItem__meta">
        <span class="ContentItem__source">
          <span v-if="readable.grant_date">
            <span v-if="isChineseReadable && isThemeZh" class="ContentItem__label">公开日（授权）:</span>
            <span v-else class="ContentItem__label">Publication Date (authorized)</span>
            <span>{{formatPatentDate(readable.grant_date)}}</span>
          </span>
          <span v-if="readable.grant_number && readable.grant_date" class="ContentItem__comma">,</span>
          <span v-if="readable.grant_number">
            <span v-if="isChineseReadable && isThemeZh" class="ContentItem__label">公开号（授权）:</span>
            <span v-else class="ContentItem__label">Publication No. (authorized)</span>
            <span v-html="readable.grant_number"></span>
          </span>
        </span>
      </div>
      <div v-if="readable.type === TYPE_ARTICLE && readable.conference && readable.conference !== '不详' && readable.article_type === '会议论文'" class="ContentItem__meta">
      <span class="ContentItem__source" :class="{'is-disabled':!enableSearch}">
        <span class="ContentItem__label" v-if="isChineseReadable && isThemeZh">会议名称:</span>
        <span class="ContentItem__label" v-else>Conference:</span>
        <span class="AuthorInfo__nameText" v-html="readable.conference"></span>
      </span>
      </div>
      <template v-if="readable.type === TYPE_REPORT">
        <div class="ContentItem__meta" v-if="!isArrayEmpty(readable.author) || !isArrayEmpty(readable.institution)">
          <div class="ContentItem__author AuthorInfo">
            <div class="AuthorInfo__content">
              <span class="AuthorInfo__name ContentItem__label">{{$t('explore.report.label1')}}:</span>
              <template v-if="!readable.show_all_author">
                <template v-if="readable.author.length <= 3">
              <span v-for="(author, index) in readable.author" :key="author" class="AuthorInfo__name">
                <span class="AuthorInfo__nameText" v-if="index === readable.author.length - 1" v-html="author"></span>
                <template v-else>
                  <span class="AuthorInfo__nameText" v-html="author"></span>
                  <span class="ContentItem__comma">,</span>
                </template>
              </span>
                </template>
                <template v-if="readable.author.length > 3">
            <span v-for="(author, index) in readable.author" :key="author" class="AuthorInfo__name" v-if="index < 2">
              <span class="AuthorInfo__nameText" v-if="index === 1" v-html="author"></span>
              <template v-else>
                <span class="AuthorInfo__nameText" v-html="author"></span>
                <span class="ContentItem__comma">,</span>
              </template>
            </span>
                  <span class="AuthorInfo__extra" @click="showAllAuthor">···</span>
                  <span class="AuthorInfo__name">
              <span class="AuthorInfo__nameText" v-html="readable.author[readable.author.length - 1]"></span>
            </span>
                </template>
              </template>
              <template v-if="readable.show_all_author">
            <span v-for="(author, index) in readable.author" :key="author" class="AuthorInfo__name">
              <span class="AuthorInfo__nameText" v-if="index === readable.author.length - 1" v-html="author"></span>
              <template v-else>
                <span class="AuthorInfo__nameText" v-html="author"></span>
                <span class="ContentItem__comma">,</span>
              </template>
            </span>
              </template>
            </div>
          </div>
        </div>
      </template>
      <div v-if="readable.type === TYPE_REPORT && readable.date" class="ContentItem__meta">
      <span class="ContentItem__source">
        <span v-if="readable.date" class="ContentItem__label">{{$t('explore.report.label2')}}:</span>
        <span v-if="readable.date">{{readable.date}}</span>
        <span v-if="readable.date && readable.serverName" class="ContentItem__comma">,</span>
        <span v-if="readable.serverName" class="ContentItem__label">{{$t('explore.report.label3')}}:</span>
        <span v-if="readable.serverName">{{readable.serverName}}</span>
        <span v-if="(readable.date || readable.serverName) && !isArrayEmpty(readable.subjects)" class="ContentItem__comma">,</span>
        <span v-if="!isArrayEmpty(readable.subjects)" class="ContentItem__label">{{$t('explore.report.label3')}}:</span>
        <span v-if="!isArrayEmpty(readable.subjects)" class="AuthorInfo__nameText" v-html="readable.subjects[0]"></span>
      </span>
      </div>
      <div v-if="readable.type === TYPE_REPORT && readable.journal" class="ContentItem__meta">
      <span class="ContentItem__source">
        <span v-if="readable.journal" class="ContentItem__label">{{$t('explore.report.label4')}}:</span>
        <span v-if="readable.journal">《<span class="AuthorInfo__nameText" v-html="readable.journal"></span>》</span>
        <template v-if="isThemeZh">
          <span v-if="readable.date && readable.date.substring(0, 4)">{{ readable.date.substring(0, 4) }} 年</span><span v-if="readable.issue">第 {{readable.issue}} 期</span>
        </template>
        <template v-if="!isThemeZh">
          <span v-if="readable.date && readable.date.substring(0, 4)">{{ readable.date.substring(0, 4) }}, </span><span v-if="readable.issue">Issue {{readable.issue}}</span>
        </template>
      </span>
      </div>
      <template v-if="readable.type === TYPE_PROJECT">
        <div class="ContentItem__meta" v-if="!isArrayEmpty(readable.author)">
          <div class="ContentItem__author AuthorInfo BookAuthor">
            <i v-if="!isMobileClient" class="base-icon-s-custom"></i>
            <div v-if="!isArrayEmpty(readable.author)" class="AuthorInfo__content">
            <span  v-for="(author, index) in readable.author" :key="readable.type+author" class="AuthorInfo__name">
                <span class="AuthorInfo__nameText" v-if="index === readable.author.length - 1" v-html="author" ></span>
                <template v-else>
                  <span class="AuthorInfo__nameText" v-html="author" ></span>
                  <span class="ContentItem__comma">,</span>
                </template>
              </span>
            </div>
          </div>
        </div>
      </template>
      <div v-if="readable.type === TYPE_SCIENCE_DB && readable.date" class="ContentItem__meta">
      <span v-if="isChineseReadable && isThemeZh" class="ContentItem__source">
         <span class="ContentItem__label">发布日期:</span>
        <span>{{readable.date}}</span>
      </span>
        <span v-else class="ContentItem__source">
        <span class="ContentItem__label">Published on:</span>
        <span>{{readable.date}}</span>
      </span>
        <span v-if="1!==1 && !isArrayEmpty(readable.institution) && readable.date" class="ContentItem__comma">,</span>
        <span v-if="1!==1 && !isArrayEmpty(readable.institution)">
          <span v-if="isChineseReadable && isThemeZh" class="ContentItem__source">{{'数据中心：'+readable.institution.join(",")}}</span>
          <span v-else class="ContentItem__source">
            <span>Data center.</span>
            <span>{{readable.institution.join(",")}}</span>
          </span>
        </span>
      </div>
      <template v-if="1!==1 && readable.type === TYPE_SCIENCE_DB">
        <div class="ContentItem__meta" v-if="!isArrayEmpty(readable.providers)">
          <div class="ContentItem__author AuthorInfo">
            <span class="AuthorInfo__name">提交机构:</span>
            <span v-for="(provider, index) in readable.providers" :key="provider+index" class="AuthorInfo__name">
            <span class="AuthorInfo__nameText" v-if="index === readable.providers.length - 1" v-html="provider"></span>
            <template v-else>
              <span class="AuthorInfo__nameText" v-html="provider"></span>
              <span class="ContentItem__comma">,</span>
            </template>
          </span>
          </div>
        </div>
      </template>
      <div v-if="readable.type === TYPE_BOOK && readable.year" class="ContentItem__meta">
        <span class="ContentItem__source">
          <span v-if="readable.year" class="ContentItem__label">{{$t('explore.book.label1')}}:</span>
          <span v-if="readable.year">{{readable.year}}</span>
          <span v-if="readable.year && readable.publisher" class="ContentItem__comma">,</span>
          <span v-if="readable.publisher" class="ContentItem__label">{{$t('explore.book.label2')}}:</span>
          <span v-if="readable.publisher" v-html="readable.publisher"></span>
          <span v-if="(readable.year || readable.publisher) && readable.isbn" class="ContentItem__comma">,</span>
          <span v-if="readable.isbn" class="ContentItem__label">ISBN:</span>
          <span v-if="readable.isbn" v-html="readable.isbn"></span>
        </span>
      </div>
      <template v-if="readable.type === TYPE_PROJECT">
        <div class="ContentItem__meta">
        <span class="ContentItem__source">
          <span v-if="readable.start_date">{{ '开始时间：'+readable.start_date}}</span>
          <span v-if="readable.start_date && readable.end_date">,</span>
          <span v-if="readable.end_date">{{ '结束时间：'+readable.end_date}}</span>
        </span>
        </div>
        <div class="ContentItem__meta">
        <span class="ContentItem__source">
          <span v-if="readable.funding_institution">{{ '资助机构：'+readable.funding_institution}}</span>
          <span v-if="readable.funding_institution && readable.undertaking_institution">,</span>
          <span v-if="readable.undertaking_institution">{{ '承担机构：'+readable.undertaking_institution}}</span>
        </span>
        </div>
      </template>
      <div class="ContentItem__abstracts" v-if="readable.abstracts">
        <div class="RichContent">
          <div class="RichContent__inner">
            <span class="RichText" v-html="abstracts"></span>
          </div>
        </div>
      </div>
      <div class="TranslateContent" v-if="readable.abstracts_translated">
        <div class="RichContent">
          <div class="RichContent__inner">
            <span class="RichText">
               <rich-text :text="readable.abstracts_translated"></rich-text>
            </span>
          </div>
        </div>
        <div v-if="isThemeZh" class="TranslateSupport">
          机器翻译由<svg t="1685325678764" class="Icon" viewBox="0 0 1199 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1668" width="16" height="16"><path d="M599.010743 585.142857L380.342857 254.741943c6.612114-7.021714 13.253486-13.897143 19.894857-20.6848L614.4 557.8752c-4.681143 8.484571-9.801143 17.6128-15.389257 27.267657M1169.378743 189.586286c10.8544-2.925714 4.008229-1.667657 30.164114-8.016457-42.1888-8.6016-298.656914 3.8912-494.533486 257.2288l-172.587885-255.912229h-66.823315l205.2096 303.572114c-5.149257 7.811657-10.327771 15.652571-15.36 23.815315a197.514971 197.514971 0 0 0-3.364571 5.705142L430.6944 189.674057C558.226286 71.124114 673.616457 0 673.616457 0c-16.764343 9.450057-32.9728 19.017143-48.917943 28.554971-88.590629 51.024457-165.6832 102.8096-232.535771 154.331429H359.277714l11.410286 16.822857c-7.957943 6.3488-15.798857 12.6976-23.434971 19.017143l-24.3712-35.84H256.087771l48.9472 71.972571c-149.328457 132.593371-233.442743 260.154514-272.764342 364.631772-46.138514 122.411886-31.217371 201.757257-24.693029 225.865143 9.947429 36.864 27.999086 66.121143 49.5616 90.258285 109.3632 122.821486 297.749943 96.256 444.357486 47.9232 128.234057-40.842971 230.458514-103.541029 230.458514-103.541028-271.506286 137.801143-549.888 174.109257-623.586743-45.962972-0.760686-2.2528-1.609143-4.5056-2.135771-6.846171-7.811657-34.757486-9.303771-73.201371 1.082514-127.7952 29.344914-154.185143 121.329371-294.063543 222.851657-407.552l243.360914 357.814857c-74.166857 110.650514-197.719771 249.709714-382.595657 287.685486 0 0 318.142171 27.794286 506.528915-227.415772l153.365942 227.415772h66.794058l-187.333486-277.152914c3.013486-5.149257 5.997714-10.357029 8.923428-15.711086 1.960229-3.598629 4.447086-8.016457 7.168-12.873143l207.4624 305.737143h66.823315l-243.419429-358.341486c5.822171-9.508571 12.141714-19.6608 18.900114-30.3104l264.192 388.651886h66.794058L828.942629 498.980571c83.031771-121.534171 209.627429-274.139429 340.436114-309.423542" fill="#0294AD" p-id="1669"></path></svg>科大讯飞 提供技术支持
        </div>
        <div v-if="!isThemeZh" class="TranslateSupport">
          Supported by <svg t="1685325678764" class="Icon" viewBox="0 0 1199 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1668" width="16" height="16"><path d="M599.010743 585.142857L380.342857 254.741943c6.612114-7.021714 13.253486-13.897143 19.894857-20.6848L614.4 557.8752c-4.681143 8.484571-9.801143 17.6128-15.389257 27.267657M1169.378743 189.586286c10.8544-2.925714 4.008229-1.667657 30.164114-8.016457-42.1888-8.6016-298.656914 3.8912-494.533486 257.2288l-172.587885-255.912229h-66.823315l205.2096 303.572114c-5.149257 7.811657-10.327771 15.652571-15.36 23.815315a197.514971 197.514971 0 0 0-3.364571 5.705142L430.6944 189.674057C558.226286 71.124114 673.616457 0 673.616457 0c-16.764343 9.450057-32.9728 19.017143-48.917943 28.554971-88.590629 51.024457-165.6832 102.8096-232.535771 154.331429H359.277714l11.410286 16.822857c-7.957943 6.3488-15.798857 12.6976-23.434971 19.017143l-24.3712-35.84H256.087771l48.9472 71.972571c-149.328457 132.593371-233.442743 260.154514-272.764342 364.631772-46.138514 122.411886-31.217371 201.757257-24.693029 225.865143 9.947429 36.864 27.999086 66.121143 49.5616 90.258285 109.3632 122.821486 297.749943 96.256 444.357486 47.9232 128.234057-40.842971 230.458514-103.541029 230.458514-103.541028-271.506286 137.801143-549.888 174.109257-623.586743-45.962972-0.760686-2.2528-1.609143-4.5056-2.135771-6.846171-7.811657-34.757486-9.303771-73.201371 1.082514-127.7952 29.344914-154.185143 121.329371-294.063543 222.851657-407.552l243.360914 357.814857c-74.166857 110.650514-197.719771 249.709714-382.595657 287.685486 0 0 318.142171 27.794286 506.528915-227.415772l153.365942 227.415772h66.794058l-187.333486-277.152914c3.013486-5.149257 5.997714-10.357029 8.923428-15.711086 1.960229-3.598629 4.447086-8.016457 7.168-12.873143l207.4624 305.737143h66.823315l-243.419429-358.341486c5.822171-9.508571 12.141714-19.6608 18.900114-30.3104l264.192 388.651886h66.794058L828.942629 498.980571c83.031771-121.534171 209.627429-274.139429 340.436114-309.423542" fill="#0294AD" p-id="1669"></path></svg> iFLYTEK
        </div>
      </div>
      <div class="RecommendationContent" v-if="readable.recommendation">
        <div class="RichContent">
          <div class="RichContent__inner">
            <span class="RichText"><strong>推荐理由：</strong>{{readable.recommendation}}</span>
          </div>
        </div>
      </div>
      <div class="ContentItem__keywords" v-if="(readable.type === TYPE_SCIENCE_DB || readable.type === TYPE_ARTICLE) && !isArrayEmpty(readable.keywords)">
        <span class="Keywords">
        <span class="MetaText" v-if="isChineseReadable && isThemeZh">关键词：</span>
        <span class="MetaText is-en" v-else>Keywords:</span>
        <template v-if="readable.show_all_keywords">
           <span class="Keyword" :class="{'is-disabled':!enableSearch}" v-for="(item, index) in keywords" :key="item + index" v-html="item"></span>
        </template>
        <template v-if="!readable.show_all_keywords">
          <span class="Keyword" :class="{'is-disabled':!enableSearch}" v-for="(item, index) in keywords" v-if="index < (isChineseReadable && isThemeZh ? 5 : 4)" :key="item + index" v-html="item"></span>
          <base-tooltip :content="$t('explore.action18')" placement="top">
            <span class="KeywordMore" v-if="keywords.length > (isChineseReadable && isThemeZh ? 5 : 4)" @click="showAllKeyword">···</span>
          </base-tooltip>
        </template>
      </span>
      </div>
      <div v-if="readable.type === 'news'" class="ContentItem__meta">
      <span class="ContentItem__source">
        <span class="ContentItem__label">发布日期:</span>
        <span>{{readable.date}}</span>
        <span class="ContentItem__comma">,</span>
        <span class="ContentItem__label">来源:</span>
        <span>{{readable.source}}</span>
      </span>
      </div>
      <template v-if="readable.type !== 'news'">
        <div v-if="false && !isArrayEmpty(links) && !editable && !enableTitleLink && readable.type === TYPE_ARTICLE">
          <div class="ContentItem__links">
            <span class="MetaText">{{$t('explore.action20')}}：</span>
            <span class="ContentItem__link" v-for="(item, index) in links" :key="index">
            <img class="ContentItem__linkLogo" v-if="1!==1 && item.logo" :src="item.logo">
            <span>{{item.name}}</span>
          </span>
          </div>
        </div>
        <div v-if="false && !isArrayEmpty(links) && !editable && readable.type !== TYPE_ARTICLE">
          <div class="ContentItem__links">
            <a class="ContentItem__link" v-for="(item, index) in links" :key="index">
              <span v-if="item.is_open_access" class="ContentItem__linkDot"></span>
              <img class="ContentItem__linkLogo" v-if="item.logo" :src="item.logo">
              <span>{{item.name}}</span>
            </a>
          </div>
        </div>
        <div v-if="false && !isArrayEmpty(readable.local_links) && !editable && readable.type === TYPE_PATENT">
          <div class="ContentItem__links">
          <span class="ContentItem__link">
            <img v-if="1!==1" class="ContentItem__linkLogo" src="/static/app-pdf.png">
            <span>本地下载</span>
          </span>
          </div>
        </div>
      </template>
    </template>
    <template v-if="readable.type === TYPE_LITERATURE">
      <div class="ContentItem__inner ContentItem__innerWithCover LiteratureContentItem">
        <div class="ContentItem__cover">
          <div class="LiteratureCover">
            <base-image v-if="readable.cover" :src="readable.cover"></base-image>
            <i v-else class="base-icon-picture"></i>
          </div>
        </div>
        <div>
          <h2 class="ContentItem__title LiteratureTitle">
            <span class="ContentItem__titleText" v-if="readable.title" :data-title="titlePlainText(readable.title)" v-html="readable.title"></span>
            <span class="ContentItem__titleText" v-if="!readable.title" :data-title="titlePlainText(readable.cn_title)" v-html="readable.cn_title"></span>
          </h2>
          <div v-if="readable.title_highlight" class="ContentItem__meta LiteratureHighlight" :class="{'LiteratureHighlight--more':readable.literature_type !== '高价值论文'}">{{readable.title_highlight}}</div>
          <div v-if="!readable.title_highlight" class="ContentItem__meta LiteratureHighlight" :class="{'LiteratureHighlight--more':readable.literature_type !== '高价值论文'}">{{readable.recommendation}}</div>
          <div class="LiteratureAuthor" v-if="!isArrayEmpty(readable.author)">
           <span v-for="(author, index) in readable.author" :key="author">
              <span v-if="index === readable.author.length - 1">{{author}}</span>
              <template v-else>
                <span>{{author}}</span>
                <span class="ContentItem__comma">,</span>
              </template>
            </span>
          </div>
          <template v-if="!readable.pub_date">
            <div class="LiteratureSource" v-if="readable.source">{{readable.source}}</div>
          </template>
          <template v-if="readable.pub_date">
            <div class="LiteratureSource" v-if="readable.source">{{readable.source}}<template v-if="readable.issue">, {{readable.issue}}</template></div>
          </template>
        </div>
      </div>
    </template>
    <template v-if="readable.type === TYPE_SOFTWARE">
      <h2 class="ContentItem__title">
        <span class="ContentItem__titleText" :data-title="titlePlainText(readable.title)">
          <rich-text :text="readable.title"></rich-text>
        </span>
        <span v-if="softwareTitleTags.length > 0" class="SoftwareTitleTags">
          <base-tag
            v-for="item in softwareTitleTags"
            :key="item.key"
            size="mini"
            round
            disable-transitions
            :class="['SoftwareTitleTag', 'SoftwareTitleTag--' + item.key]">
            {{item.label}}
          </base-tag>
        </span>
      </h2>
      <div class="TranslateContent" v-if="readable.title_translated">
        <rich-text :text="readable.title_translated"></rich-text>
        <div v-if="isThemeZh" class="TranslateSupport">
          机器翻译由<svg t="1685325678764" class="Icon" viewBox="0 0 1199 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1668" width="16" height="16"><path d="M599.010743 585.142857L380.342857 254.741943c6.612114-7.021714 13.253486-13.897143 19.894857-20.6848L614.4 557.8752c-4.681143 8.484571-9.801143 17.6128-15.389257 27.267657M1169.378743 189.586286c10.8544-2.925714 4.008229-1.667657 30.164114-8.016457-42.1888-8.6016-298.656914 3.8912-494.533486 257.2288l-172.587885-255.912229h-66.823315l205.2096 303.572114c-5.149257 7.811657-10.327771 15.652571-15.36 23.815315a197.514971 197.514971 0 0 0-3.364571 5.705142L430.6944 189.674057C558.226286 71.124114 673.616457 0 673.616457 0c-16.764343 9.450057-32.9728 19.017143-48.917943 28.554971-88.590629 51.024457-165.6832 102.8096-232.535771 154.331429H359.277714l11.410286 16.822857c-7.957943 6.3488-15.798857 12.6976-23.434971 19.017143l-24.3712-35.84H256.087771l48.9472 71.972571c-149.328457 132.593371-233.442743 260.154514-272.764342 364.631772-46.138514 122.411886-31.217371 201.757257-24.693029 225.865143 9.947429 36.864 27.999086 66.121143 49.5616 90.258285 109.3632 122.821486 297.749943 96.256 444.357486 47.9232 128.234057-40.842971 230.458514-103.541029 230.458514-103.541028-271.506286 137.801143-549.888 174.109257-623.586743-45.962972-0.760686-2.2528-1.609143-4.5056-2.135771-6.846171-7.811657-34.757486-9.303771-73.201371 1.082514-127.7952 29.344914-154.185143 121.329371-294.063543 222.851657-407.552l243.360914 357.814857c-74.166857 110.650514-197.719771 249.709714-382.595657 287.685486 0 0 318.142171 27.794286 506.528915-227.415772l153.365942 227.415772h66.794058l-187.333486-277.152914c3.013486-5.149257 5.997714-10.357029 8.923428-15.711086 1.960229-3.598629 4.447086-8.016457 7.168-12.873143l207.4624 305.737143h66.823315l-243.419429-358.341486c5.822171-9.508571 12.141714-19.6608 18.900114-30.3104l264.192 388.651886h66.794058L828.942629 498.980571c83.031771-121.534171 209.627429-274.139429 340.436114-309.423542" fill="#0294AD" p-id="1669"></path></svg>科大讯飞 提供技术支持
        </div>
        <div v-if="!isThemeZh" class="TranslateSupport">
          Supported by <svg t="1685325678764" class="Icon" viewBox="0 0 1199 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1668" width="16" height="16"><path d="M599.010743 585.142857L380.342857 254.741943c6.612114-7.021714 13.253486-13.897143 19.894857-20.6848L614.4 557.8752c-4.681143 8.484571-9.801143 17.6128-15.389257 27.267657M1169.378743 189.586286c10.8544-2.925714 4.008229-1.667657 30.164114-8.016457-42.1888-8.6016-298.656914 3.8912-494.533486 257.2288l-172.587885-255.912229h-66.823315l205.2096 303.572114c-5.149257 7.811657-10.327771 15.652571-15.36 23.815315a197.514971 197.514971 0 0 0-3.364571 5.705142L430.6944 189.674057C558.226286 71.124114 673.616457 0 673.616457 0c-16.764343 9.450057-32.9728 19.017143-48.917943 28.554971-88.590629 51.024457-165.6832 102.8096-232.535771 154.331429H359.277714l11.410286 16.822857c-7.957943 6.3488-15.798857 12.6976-23.434971 19.017143l-24.3712-35.84H256.087771l48.9472 71.972571c-149.328457 132.593371-233.442743 260.154514-272.764342 364.631772-46.138514 122.411886-31.217371 201.757257-24.693029 225.865143 9.947429 36.864 27.999086 66.121143 49.5616 90.258285 109.3632 122.821486 297.749943 96.256 444.357486 47.9232 128.234057-40.842971 230.458514-103.541029 230.458514-103.541028-271.506286 137.801143-549.888 174.109257-623.586743-45.962972-0.760686-2.2528-1.609143-4.5056-2.135771-6.846171-7.811657-34.757486-9.303771-73.201371 1.082514-127.7952 29.344914-154.185143 121.329371-294.063543 222.851657-407.552l243.360914 357.814857c-74.166857 110.650514-197.719771 249.709714-382.595657 287.685486 0 0 318.142171 27.794286 506.528915-227.415772l153.365942 227.415772h66.794058l-187.333486-277.152914c3.013486-5.149257 5.997714-10.357029 8.923428-15.711086 1.960229-3.598629 4.447086-8.016457 7.168-12.873143l207.4624 305.737143h66.823315l-243.419429-358.341486c5.822171-9.508571 12.141714-19.6608 18.900114-30.3104l264.192 388.651886h66.794058L828.942629 498.980571c83.031771-121.534171 209.627429-274.139429 340.436114-309.423542" fill="#0294AD" p-id="1669"></path></svg> iFLYTEK
        </div>
      </div>
      <div v-if="!isArrayEmpty(readable.author) || readable.date || readable.update_time || readable.version || readable.extend_entity.size" class="ContentItem__meta">
            <span class="ContentItem__source">
              <template v-if="!isArrayEmpty(readable.author)">
                <span class="ContentItem__label">Author/Maintainer:</span>
                <span>{{arrayToString(readable.author)}}</span>
              </template>
              <span v-if="!isArrayEmpty(readable.author) && readable.date" class="ContentItem__comma">,</span>
              <template v-if="readable.date">
                <span class="ContentItem__label">Publish:</span>
                <span>{{readable.date}}</span>
              </template>
              <span v-if="(readable.date || !isArrayEmpty(readable.author)) && readable.update_time" class="ContentItem__comma">,</span>
              <template v-if="readable.update_time">
                <span class="ContentItem__label">Update:</span>
                <span>{{readable.update_time}}</span>
              </template>
              <span v-if="(!isArrayEmpty(readable.author) || readable.date || readable.update_time) && readable.version" class="ContentItem__comma">,</span>
              <template v-if="readable.version">
                <span class="ContentItem__label">Version:</span>
                <span>{{readable.version}}</span>
              </template>
              <span v-if="(!isArrayEmpty(readable.author) || readable.date || readable.update_date || readable.version) && readable.extend_entity.size" class="ContentItem__comma">,</span>
              <template v-if="readable.extend_entity.size">
                <span class="ContentItem__label">Size:</span>
                <span>{{readable.extend_entity.size}}</span>
              </template>
            </span>
      </div>
      <div class="ContentItem__abstracts FacilityAbstract" v-if="readable.abstracts">
        <div class="RichContent">
          <div class="RichContent__inner">
            <span class="RichText" v-html="readable.abstracts"></span>
          </div>
        </div>
      </div>
      <div class="TranslateContent" v-if="readable.abstracts_translated">
        <div class="RichContent">
          <div class="RichContent__inner">
            <span class="RichText">
               <rich-text :text="readable.abstracts_translated"></rich-text>
            </span>
          </div>
        </div>
        <div v-if="isThemeZh" class="TranslateSupport">
          机器翻译由<svg t="1685325678764" class="Icon" viewBox="0 0 1199 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1668" width="16" height="16"><path d="M599.010743 585.142857L380.342857 254.741943c6.612114-7.021714 13.253486-13.897143 19.894857-20.6848L614.4 557.8752c-4.681143 8.484571-9.801143 17.6128-15.389257 27.267657M1169.378743 189.586286c10.8544-2.925714 4.008229-1.667657 30.164114-8.016457-42.1888-8.6016-298.656914 3.8912-494.533486 257.2288l-172.587885-255.912229h-66.823315l205.2096 303.572114c-5.149257 7.811657-10.327771 15.652571-15.36 23.815315a197.514971 197.514971 0 0 0-3.364571 5.705142L430.6944 189.674057C558.226286 71.124114 673.616457 0 673.616457 0c-16.764343 9.450057-32.9728 19.017143-48.917943 28.554971-88.590629 51.024457-165.6832 102.8096-232.535771 154.331429H359.277714l11.410286 16.822857c-7.957943 6.3488-15.798857 12.6976-23.434971 19.017143l-24.3712-35.84H256.087771l48.9472 71.972571c-149.328457 132.593371-233.442743 260.154514-272.764342 364.631772-46.138514 122.411886-31.217371 201.757257-24.693029 225.865143 9.947429 36.864 27.999086 66.121143 49.5616 90.258285 109.3632 122.821486 297.749943 96.256 444.357486 47.9232 128.234057-40.842971 230.458514-103.541029 230.458514-103.541028-271.506286 137.801143-549.888 174.109257-623.586743-45.962972-0.760686-2.2528-1.609143-4.5056-2.135771-6.846171-7.811657-34.757486-9.303771-73.201371 1.082514-127.7952 29.344914-154.185143 121.329371-294.063543 222.851657-407.552l243.360914 357.814857c-74.166857 110.650514-197.719771 249.709714-382.595657 287.685486 0 0 318.142171 27.794286 506.528915-227.415772l153.365942 227.415772h66.794058l-187.333486-277.152914c3.013486-5.149257 5.997714-10.357029 8.923428-15.711086 1.960229-3.598629 4.447086-8.016457 7.168-12.873143l207.4624 305.737143h66.823315l-243.419429-358.341486c5.822171-9.508571 12.141714-19.6608 18.900114-30.3104l264.192 388.651886h66.794058L828.942629 498.980571c83.031771-121.534171 209.627429-274.139429 340.436114-309.423542" fill="#0294AD" p-id="1669"></path></svg>科大讯飞 提供技术支持
        </div>
        <div v-if="!isThemeZh" class="TranslateSupport">
          Supported by <svg t="1685325678764" class="Icon" viewBox="0 0 1199 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1668" width="16" height="16"><path d="M599.010743 585.142857L380.342857 254.741943c6.612114-7.021714 13.253486-13.897143 19.894857-20.6848L614.4 557.8752c-4.681143 8.484571-9.801143 17.6128-15.389257 27.267657M1169.378743 189.586286c10.8544-2.925714 4.008229-1.667657 30.164114-8.016457-42.1888-8.6016-298.656914 3.8912-494.533486 257.2288l-172.587885-255.912229h-66.823315l205.2096 303.572114c-5.149257 7.811657-10.327771 15.652571-15.36 23.815315a197.514971 197.514971 0 0 0-3.364571 5.705142L430.6944 189.674057C558.226286 71.124114 673.616457 0 673.616457 0c-16.764343 9.450057-32.9728 19.017143-48.917943 28.554971-88.590629 51.024457-165.6832 102.8096-232.535771 154.331429H359.277714l11.410286 16.822857c-7.957943 6.3488-15.798857 12.6976-23.434971 19.017143l-24.3712-35.84H256.087771l48.9472 71.972571c-149.328457 132.593371-233.442743 260.154514-272.764342 364.631772-46.138514 122.411886-31.217371 201.757257-24.693029 225.865143 9.947429 36.864 27.999086 66.121143 49.5616 90.258285 109.3632 122.821486 297.749943 96.256 444.357486 47.9232 128.234057-40.842971 230.458514-103.541029 230.458514-103.541028-271.506286 137.801143-549.888 174.109257-623.586743-45.962972-0.760686-2.2528-1.609143-4.5056-2.135771-6.846171-7.811657-34.757486-9.303771-73.201371 1.082514-127.7952 29.344914-154.185143 121.329371-294.063543 222.851657-407.552l243.360914 357.814857c-74.166857 110.650514-197.719771 249.709714-382.595657 287.685486 0 0 318.142171 27.794286 506.528915-227.415772l153.365942 227.415772h66.794058l-187.333486-277.152914c3.013486-5.149257 5.997714-10.357029 8.923428-15.711086 1.960229-3.598629 4.447086-8.016457 7.168-12.873143l207.4624 305.737143h66.823315l-243.419429-358.341486c5.822171-9.508571 12.141714-19.6608 18.900114-30.3104l264.192 388.651886h66.794058L828.942629 498.980571c83.031771-121.534171 209.627429-274.139429 340.436114-309.423542" fill="#0294AD" p-id="1669"></path></svg> iFLYTEK
        </div>
      </div>
      <div class="ContentItem__keywords" v-if="!isArrayEmpty(readable.keyword)">
        <span class="Keywords">
        <span class="MetaText is-en">Keywords:</span>
        <template v-if="readable.show_all_keywords">
           <span class="Keyword is-disabled" v-for="(item, index) in keywordsV0" :key="item + index" v-html="item"></span>
        </template>
        <template v-if="!readable.show_all_keywords">
          <span class="Keyword is-disabled" v-for="(item, index) in keywordsV0" v-if="index <  4" :key="item + index" v-html="item"></span>
          <base-tooltip :content="$t('explore.action18')" placement="top">
            <span class="KeywordMore" v-if="keywordsV0.length > 4" @click="showAllKeyword">···</span>
          </base-tooltip>
        </template>
      </span>
      </div>
      <div v-if="false && (readable.link || readable.extend_entity.homepage)" class="ContentItem__meta">
        <a class="FacilityLink">SourceLink</a>
        <a class="FacilityLink">HomePage</a>
      </div>
    </template>
    <template v-if="readable.type === TYPE_BULLETIN">
      <div class="ContentItem__inner ContentItem__innerWithCover">
        <div class="ContentItem__cover">
          <div class="BulletinCover">
            <base-image v-if="readable.cover" :src="readable.cover"></base-image>
            <base-image v-else src="/static/app-cover-bulletin.png"></base-image>
          </div>
        </div>
        <div>
          <h2 class="ContentItem__title">
            <span class="ContentItem__titleText" :data-title="titlePlainText(readable.title)" v-html="readable.title"></span>
          </h2>
          <div v-if="!isArrayEmpty(readable.sponsor)" class="ContentItem__meta">
            <span class="ContentItem__source">
              <span class="ContentItem__label">{{$t('explore.bulletin.label1')}}:</span>
              <span v-for="(item, index) in readable.sponsor" :key="item+index"><span v-if="index === readable.sponsor.length - 1" v-html="item"></span><template v-else><span  v-html="item"></span><span class="ContentItem__comma">, </span></template></span>
            </span>
          </div>
          <div v-if="!isArrayEmpty(readable.subject) || readable.album" class="ContentItem__meta">
            <span class="ContentItem__source">
              <span v-if="!isArrayEmpty(readable.subject)">
                <span class="ContentItem__label">{{$t('explore.bulletin.label2')}}:</span>
                <span v-for="(item, index) in readable.subject" :key="item+index"><span v-if="index === readable.subject.length - 1" v-html="item"></span><template v-else><span  v-html="item"></span><span class="ContentItem__comma">, </span></template></span>
              </span>
              <span v-if="!isArrayEmpty(readable.subject) && readable.album" class="ContentItem__comma">,</span>
              <span v-if="readable.album" class="ContentItem__label">所属专辑:</span>
              <span v-if="readable.album">{{readable.album}}</span>
            </span>
          </div>
          <div v-if="readable.total_issue || (readable.year && readable.issue)" class="ContentItem__meta">
            <span class="ContentItem__source">
              <template v-if="readable.total_issue">
                <span class="ContentItem__label">{{$t('explore.bulletin.label3')}}:</span>
                <span v-if="isThemeZh">{{readable.total_issue}} 期</span>
                <span v-else>{{readable.total_issue}}</span>
              </template>
              <span v-if="readable.total_issue && readable.total_issue" class="ContentItem__comma">,</span>
              <span class="ContentItem__label">{{$t('explore.bulletin.label4')}}:</span>
              <span v-if="isThemeZh">{{readable.year}} 年第 {{readable.issue}} 期</span>
              <span v-else>{{readable.year}}, Issue {{readable.issue}}</span>
            </span>
          </div>
        </div>
      </div>
    </template>
    <template v-if="readable.type === TYPE_FACILITY">
      <div class="ContentItem__inner ContentItem__innerWithCover ContentItem__innerWithCover--large">
        <div class="ContentItem__cover">
          <div class="FacilityCover">
            <base-image :src="readable.image"></base-image>
          </div>
        </div>
        <div>
          <h2 class="ContentItem__title">
            <span class="ContentItem__titleText" :data-title="titlePlainText(readable.title)" v-html="readable.title"></span>
          </h2>
          <div class="TranslateContent" v-if="readable.title_translated">
            {{readable.title_translated}}
            <div v-if="isThemeZh" class="TranslateSupport">
              机器翻译由<svg t="1685325678764" class="Icon" viewBox="0 0 1199 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1668" width="16" height="16"><path d="M599.010743 585.142857L380.342857 254.741943c6.612114-7.021714 13.253486-13.897143 19.894857-20.6848L614.4 557.8752c-4.681143 8.484571-9.801143 17.6128-15.389257 27.267657M1169.378743 189.586286c10.8544-2.925714 4.008229-1.667657 30.164114-8.016457-42.1888-8.6016-298.656914 3.8912-494.533486 257.2288l-172.587885-255.912229h-66.823315l205.2096 303.572114c-5.149257 7.811657-10.327771 15.652571-15.36 23.815315a197.514971 197.514971 0 0 0-3.364571 5.705142L430.6944 189.674057C558.226286 71.124114 673.616457 0 673.616457 0c-16.764343 9.450057-32.9728 19.017143-48.917943 28.554971-88.590629 51.024457-165.6832 102.8096-232.535771 154.331429H359.277714l11.410286 16.822857c-7.957943 6.3488-15.798857 12.6976-23.434971 19.017143l-24.3712-35.84H256.087771l48.9472 71.972571c-149.328457 132.593371-233.442743 260.154514-272.764342 364.631772-46.138514 122.411886-31.217371 201.757257-24.693029 225.865143 9.947429 36.864 27.999086 66.121143 49.5616 90.258285 109.3632 122.821486 297.749943 96.256 444.357486 47.9232 128.234057-40.842971 230.458514-103.541029 230.458514-103.541028-271.506286 137.801143-549.888 174.109257-623.586743-45.962972-0.760686-2.2528-1.609143-4.5056-2.135771-6.846171-7.811657-34.757486-9.303771-73.201371 1.082514-127.7952 29.344914-154.185143 121.329371-294.063543 222.851657-407.552l243.360914 357.814857c-74.166857 110.650514-197.719771 249.709714-382.595657 287.685486 0 0 318.142171 27.794286 506.528915-227.415772l153.365942 227.415772h66.794058l-187.333486-277.152914c3.013486-5.149257 5.997714-10.357029 8.923428-15.711086 1.960229-3.598629 4.447086-8.016457 7.168-12.873143l207.4624 305.737143h66.823315l-243.419429-358.341486c5.822171-9.508571 12.141714-19.6608 18.900114-30.3104l264.192 388.651886h66.794058L828.942629 498.980571c83.031771-121.534171 209.627429-274.139429 340.436114-309.423542" fill="#0294AD" p-id="1669"></path></svg>科大讯飞 提供技术支持
            </div>
            <div v-if="!isThemeZh" class="TranslateSupport">
              Supported by <svg t="1685325678764" class="Icon" viewBox="0 0 1199 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1668" width="16" height="16"><path d="M599.010743 585.142857L380.342857 254.741943c6.612114-7.021714 13.253486-13.897143 19.894857-20.6848L614.4 557.8752c-4.681143 8.484571-9.801143 17.6128-15.389257 27.267657M1169.378743 189.586286c10.8544-2.925714 4.008229-1.667657 30.164114-8.016457-42.1888-8.6016-298.656914 3.8912-494.533486 257.2288l-172.587885-255.912229h-66.823315l205.2096 303.572114c-5.149257 7.811657-10.327771 15.652571-15.36 23.815315a197.514971 197.514971 0 0 0-3.364571 5.705142L430.6944 189.674057C558.226286 71.124114 673.616457 0 673.616457 0c-16.764343 9.450057-32.9728 19.017143-48.917943 28.554971-88.590629 51.024457-165.6832 102.8096-232.535771 154.331429H359.277714l11.410286 16.822857c-7.957943 6.3488-15.798857 12.6976-23.434971 19.017143l-24.3712-35.84H256.087771l48.9472 71.972571c-149.328457 132.593371-233.442743 260.154514-272.764342 364.631772-46.138514 122.411886-31.217371 201.757257-24.693029 225.865143 9.947429 36.864 27.999086 66.121143 49.5616 90.258285 109.3632 122.821486 297.749943 96.256 444.357486 47.9232 128.234057-40.842971 230.458514-103.541029 230.458514-103.541028-271.506286 137.801143-549.888 174.109257-623.586743-45.962972-0.760686-2.2528-1.609143-4.5056-2.135771-6.846171-7.811657-34.757486-9.303771-73.201371 1.082514-127.7952 29.344914-154.185143 121.329371-294.063543 222.851657-407.552l243.360914 357.814857c-74.166857 110.650514-197.719771 249.709714-382.595657 287.685486 0 0 318.142171 27.794286 506.528915-227.415772l153.365942 227.415772h66.794058l-187.333486-277.152914c3.013486-5.149257 5.997714-10.357029 8.923428-15.711086 1.960229-3.598629 4.447086-8.016457 7.168-12.873143l207.4624 305.737143h66.823315l-243.419429-358.341486c5.822171-9.508571 12.141714-19.6608 18.900114-30.3104l264.192 388.651886h66.794058L828.942629 498.980571c83.031771-121.534171 209.627429-274.139429 340.436114-309.423542" fill="#0294AD" p-id="1669"></path></svg> iFLYTEK
            </div>
          </div>
          <div v-if="readable.hosting_institution || readable.isbn" class="ContentItem__meta">
            <span class="ContentItem__source">
              <span v-if="readable.hosting_institution" class="ContentItem__label">Hosting Institution:</span>
              <span v-if="readable.hosting_institution">{{readable.hosting_institution}}</span>
              <span v-if="readable.year && readable.isbn" class="ContentItem__comma">,</span>
              <span v-if="readable.isbn" class="ContentItem__label">ISBN:</span>
              <span v-if="readable.isbn" v-html="readable.isbn"></span>
            </span>
          </div>
          <div class="ContentItem__abstracts FacilityAbstract" v-if="readable.abstracts">
            <div class="RichContent">
              <div class="RichContent__inner">
                <span class="RichText" v-html="readable.abstracts"></span>
              </div>
            </div>
          </div>
          <div class="TranslateContent" v-if="readable.abstracts_translated">
            <div class="RichContent">
              <div class="RichContent__inner">
            <span class="RichText">
               <rich-text :text="readable.abstracts_translated"></rich-text>
            </span>
              </div>
            </div>
            <div v-if="isThemeZh" class="TranslateSupport">
              机器翻译由<svg t="1685325678764" class="Icon" viewBox="0 0 1199 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1668" width="16" height="16"><path d="M599.010743 585.142857L380.342857 254.741943c6.612114-7.021714 13.253486-13.897143 19.894857-20.6848L614.4 557.8752c-4.681143 8.484571-9.801143 17.6128-15.389257 27.267657M1169.378743 189.586286c10.8544-2.925714 4.008229-1.667657 30.164114-8.016457-42.1888-8.6016-298.656914 3.8912-494.533486 257.2288l-172.587885-255.912229h-66.823315l205.2096 303.572114c-5.149257 7.811657-10.327771 15.652571-15.36 23.815315a197.514971 197.514971 0 0 0-3.364571 5.705142L430.6944 189.674057C558.226286 71.124114 673.616457 0 673.616457 0c-16.764343 9.450057-32.9728 19.017143-48.917943 28.554971-88.590629 51.024457-165.6832 102.8096-232.535771 154.331429H359.277714l11.410286 16.822857c-7.957943 6.3488-15.798857 12.6976-23.434971 19.017143l-24.3712-35.84H256.087771l48.9472 71.972571c-149.328457 132.593371-233.442743 260.154514-272.764342 364.631772-46.138514 122.411886-31.217371 201.757257-24.693029 225.865143 9.947429 36.864 27.999086 66.121143 49.5616 90.258285 109.3632 122.821486 297.749943 96.256 444.357486 47.9232 128.234057-40.842971 230.458514-103.541029 230.458514-103.541028-271.506286 137.801143-549.888 174.109257-623.586743-45.962972-0.760686-2.2528-1.609143-4.5056-2.135771-6.846171-7.811657-34.757486-9.303771-73.201371 1.082514-127.7952 29.344914-154.185143 121.329371-294.063543 222.851657-407.552l243.360914 357.814857c-74.166857 110.650514-197.719771 249.709714-382.595657 287.685486 0 0 318.142171 27.794286 506.528915-227.415772l153.365942 227.415772h66.794058l-187.333486-277.152914c3.013486-5.149257 5.997714-10.357029 8.923428-15.711086 1.960229-3.598629 4.447086-8.016457 7.168-12.873143l207.4624 305.737143h66.823315l-243.419429-358.341486c5.822171-9.508571 12.141714-19.6608 18.900114-30.3104l264.192 388.651886h66.794058L828.942629 498.980571c83.031771-121.534171 209.627429-274.139429 340.436114-309.423542" fill="#0294AD" p-id="1669"></path></svg>科大讯飞 提供技术支持
            </div>
            <div v-if="!isThemeZh" class="TranslateSupport">
              Supported by <svg t="1685325678764" class="Icon" viewBox="0 0 1199 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1668" width="16" height="16"><path d="M599.010743 585.142857L380.342857 254.741943c6.612114-7.021714 13.253486-13.897143 19.894857-20.6848L614.4 557.8752c-4.681143 8.484571-9.801143 17.6128-15.389257 27.267657M1169.378743 189.586286c10.8544-2.925714 4.008229-1.667657 30.164114-8.016457-42.1888-8.6016-298.656914 3.8912-494.533486 257.2288l-172.587885-255.912229h-66.823315l205.2096 303.572114c-5.149257 7.811657-10.327771 15.652571-15.36 23.815315a197.514971 197.514971 0 0 0-3.364571 5.705142L430.6944 189.674057C558.226286 71.124114 673.616457 0 673.616457 0c-16.764343 9.450057-32.9728 19.017143-48.917943 28.554971-88.590629 51.024457-165.6832 102.8096-232.535771 154.331429H359.277714l11.410286 16.822857c-7.957943 6.3488-15.798857 12.6976-23.434971 19.017143l-24.3712-35.84H256.087771l48.9472 71.972571c-149.328457 132.593371-233.442743 260.154514-272.764342 364.631772-46.138514 122.411886-31.217371 201.757257-24.693029 225.865143 9.947429 36.864 27.999086 66.121143 49.5616 90.258285 109.3632 122.821486 297.749943 96.256 444.357486 47.9232 128.234057-40.842971 230.458514-103.541029 230.458514-103.541028-271.506286 137.801143-549.888 174.109257-623.586743-45.962972-0.760686-2.2528-1.609143-4.5056-2.135771-6.846171-7.811657-34.757486-9.303771-73.201371 1.082514-127.7952 29.344914-154.185143 121.329371-294.063543 222.851657-407.552l243.360914 357.814857c-74.166857 110.650514-197.719771 249.709714-382.595657 287.685486 0 0 318.142171 27.794286 506.528915-227.415772l153.365942 227.415772h66.794058l-187.333486-277.152914c3.013486-5.149257 5.997714-10.357029 8.923428-15.711086 1.960229-3.598629 4.447086-8.016457 7.168-12.873143l207.4624 305.737143h66.823315l-243.419429-358.341486c5.822171-9.508571 12.141714-19.6608 18.900114-30.3104l264.192 388.651886h66.794058L828.942629 498.980571c83.031771-121.534171 209.627429-274.139429 340.436114-309.423542" fill="#0294AD" p-id="1669"></path></svg> iFLYTEK
            </div>
          </div>
          <div v-if="false && (readable.detail_link || readable.application_guide || readable.equipments)" class="ContentItem__meta">
            <a class="FacilityLink">SourceLink</a>
            <a class="FacilityLink">Application Guide</a>
            <a class="FacilityLink">Equipments</a>
          </div>
        </div>
      </div>
    </template>
    <template v-if="readable.type === TYPE_JOURNAL">
      <div class="ContentItem__inner ContentItem__innerWithCover">
        <div class="ContentItem__cover">
          <div class="BulletinCover">
            <base-image v-if="readable.cover" :src="readable.cover" lazy></base-image>
            <base-image v-else src="/static/app-cover-journal.png"></base-image>
          </div>
        </div>
        <div>
          <h2 class="ContentItem__title">
            <span class="ContentItem__titleText" :data-title="titlePlainText(isThemeZh?readable.title:readable.en_title)" v-html="isThemeZh?readable.title:readable.en_title"></span>
          </h2>
          <div v-if="!isMobileClient && readable.abstracts" class="ContentItem__abstracts JournalAbstracts">
            <div class="RichContent">
              <div class="RichContent__inner">{{readable.abstracts}}</div>
            </div>
          </div>
          <div v-if="!isMobileClient && readable.abstracts" class="ContentItem__meta">
            <span class="ContentItem__source">
              <span v-if="readable.issn" class="ContentItem__label">ISSN:</span>
              <span v-if="readable.issn">{{readable.issn}}</span>
              <span class="ContentItem__comma" v-if="readable.issn && readable.issue_frequency">,</span>
               <span v-if="readable.issue_frequency" class="ContentItem__label">{{$t('home.journals.frequency')}}:</span>
              <span v-if="readable.issue_frequency">{{ readable.issue_frequency }}</span>
              <span class="ContentItem__comma" v-if="(readable.issn || readable.issue_frequency) && readable.impact_factor">,</span>
              <span v-if="readable.impact_factor" class="ContentItem__label">{{$t('home.journals.impactFactor')}}:</span>
              <span v-if="readable.impact_factor">{{ readable.impact_factor }}</span>
            </span>
          </div>
          <div class="ContentItem__meta" v-if="isMobileClient || !readable.abstracts">
            <template v-if="readable.issn">
              <span>ISSN<span class="Seperator">:</span><span v-html="readable.issn"></span></span>
            </template>
            <div class="ContentItem__meta" v-if="readable.impact_factor">
              <span>影响因子<span class="Seperator">:</span>{{ readable.impact_factor }}</span>
            </div>
            <div class="ContentItem__meta" v-if="readable.issue_frequency">
              <span>出版周期<span class="Seperator">:</span>{{ readable.issue_frequency }}</span>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-if="readable.type === TYPE_BOOK">
      <div class="ContentItem__inner ContentItem__innerWithCover">
        <div v-if="!isMobileClient" class="ContentItem__cover">
          <div class="BulletinCover">
            <base-image src="/static/app-cover-book.png"></base-image>
          </div>
        </div>
        <div>
          <h2 class="ContentItem__title">
            <span class="ContentItem__titleText" :data-title="titlePlainText(readable.title)" v-html="readable.title"></span>
            <span v-if="1!==1 && isFreeDownload" class="ContentItem__titleLabel ContentItem__titleLabel--free">「可获取全文」</span>
            <span v-if="1!==1 && hasPDF" class="ContentItem__titleLabel ContentItem__titleLabel--pdf">「本地下载」</span>
            <span class="ContentItem__titleLabel ContentItem__titleLabel--oa" v-if="readable.type === TYPE_ARTICLE && readable.is_free">「Open Access」</span>
            <span class="ContentItem__titleLabel ContentItem__titleLabel--oa" v-if="readable.type === TYPE_PATENT && readable.grant_date">「授权」</span>
            <base-tag v-if="readable.article_type === '预印本'" size="mini">{{readable.status === 1 ? '已发布' : '未发布'}}</base-tag>
          </h2>
          <div class="TranslateContent" v-if="readable.title_translated">
            {{readable.title_translated}}
            <div v-if="isThemeZh" class="TranslateSupport">
              机器翻译由<svg t="1685325678764" class="Icon" viewBox="0 0 1199 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1668" width="16" height="16"><path d="M599.010743 585.142857L380.342857 254.741943c6.612114-7.021714 13.253486-13.897143 19.894857-20.6848L614.4 557.8752c-4.681143 8.484571-9.801143 17.6128-15.389257 27.267657M1169.378743 189.586286c10.8544-2.925714 4.008229-1.667657 30.164114-8.016457-42.1888-8.6016-298.656914 3.8912-494.533486 257.2288l-172.587885-255.912229h-66.823315l205.2096 303.572114c-5.149257 7.811657-10.327771 15.652571-15.36 23.815315a197.514971 197.514971 0 0 0-3.364571 5.705142L430.6944 189.674057C558.226286 71.124114 673.616457 0 673.616457 0c-16.764343 9.450057-32.9728 19.017143-48.917943 28.554971-88.590629 51.024457-165.6832 102.8096-232.535771 154.331429H359.277714l11.410286 16.822857c-7.957943 6.3488-15.798857 12.6976-23.434971 19.017143l-24.3712-35.84H256.087771l48.9472 71.972571c-149.328457 132.593371-233.442743 260.154514-272.764342 364.631772-46.138514 122.411886-31.217371 201.757257-24.693029 225.865143 9.947429 36.864 27.999086 66.121143 49.5616 90.258285 109.3632 122.821486 297.749943 96.256 444.357486 47.9232 128.234057-40.842971 230.458514-103.541029 230.458514-103.541028-271.506286 137.801143-549.888 174.109257-623.586743-45.962972-0.760686-2.2528-1.609143-4.5056-2.135771-6.846171-7.811657-34.757486-9.303771-73.201371 1.082514-127.7952 29.344914-154.185143 121.329371-294.063543 222.851657-407.552l243.360914 357.814857c-74.166857 110.650514-197.719771 249.709714-382.595657 287.685486 0 0 318.142171 27.794286 506.528915-227.415772l153.365942 227.415772h66.794058l-187.333486-277.152914c3.013486-5.149257 5.997714-10.357029 8.923428-15.711086 1.960229-3.598629 4.447086-8.016457 7.168-12.873143l207.4624 305.737143h66.823315l-243.419429-358.341486c5.822171-9.508571 12.141714-19.6608 18.900114-30.3104l264.192 388.651886h66.794058L828.942629 498.980571c83.031771-121.534171 209.627429-274.139429 340.436114-309.423542" fill="#0294AD" p-id="1669"></path></svg>科大讯飞 提供技术支持
            </div>
            <div v-if="!isThemeZh" class="TranslateSupport">
              Supported by <svg t="1685325678764" class="Icon" viewBox="0 0 1199 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1668" width="16" height="16"><path d="M599.010743 585.142857L380.342857 254.741943c6.612114-7.021714 13.253486-13.897143 19.894857-20.6848L614.4 557.8752c-4.681143 8.484571-9.801143 17.6128-15.389257 27.267657M1169.378743 189.586286c10.8544-2.925714 4.008229-1.667657 30.164114-8.016457-42.1888-8.6016-298.656914 3.8912-494.533486 257.2288l-172.587885-255.912229h-66.823315l205.2096 303.572114c-5.149257 7.811657-10.327771 15.652571-15.36 23.815315a197.514971 197.514971 0 0 0-3.364571 5.705142L430.6944 189.674057C558.226286 71.124114 673.616457 0 673.616457 0c-16.764343 9.450057-32.9728 19.017143-48.917943 28.554971-88.590629 51.024457-165.6832 102.8096-232.535771 154.331429H359.277714l11.410286 16.822857c-7.957943 6.3488-15.798857 12.6976-23.434971 19.017143l-24.3712-35.84H256.087771l48.9472 71.972571c-149.328457 132.593371-233.442743 260.154514-272.764342 364.631772-46.138514 122.411886-31.217371 201.757257-24.693029 225.865143 9.947429 36.864 27.999086 66.121143 49.5616 90.258285 109.3632 122.821486 297.749943 96.256 444.357486 47.9232 128.234057-40.842971 230.458514-103.541029 230.458514-103.541028-271.506286 137.801143-549.888 174.109257-623.586743-45.962972-0.760686-2.2528-1.609143-4.5056-2.135771-6.846171-7.811657-34.757486-9.303771-73.201371 1.082514-127.7952 29.344914-154.185143 121.329371-294.063543 222.851657-407.552l243.360914 357.814857c-74.166857 110.650514-197.719771 249.709714-382.595657 287.685486 0 0 318.142171 27.794286 506.528915-227.415772l153.365942 227.415772h66.794058l-187.333486-277.152914c3.013486-5.149257 5.997714-10.357029 8.923428-15.711086 1.960229-3.598629 4.447086-8.016457 7.168-12.873143l207.4624 305.737143h66.823315l-243.419429-358.341486c5.822171-9.508571 12.141714-19.6608 18.900114-30.3104l264.192 388.651886h66.794058L828.942629 498.980571c83.031771-121.534171 209.627429-274.139429 340.436114-309.423542" fill="#0294AD" p-id="1669"></path></svg> iFLYTEK
            </div>
          </div>
          <template v-if="!isArrayEmpty(readable.author)">
            <div class="ContentItem__author AuthorInfo">
              <base-tooltip v-if="!isMobileClient" :content="isThemeZh?('共 ' + readable.author.length + ' 位'):(readable.author.length + ' ') + authorLabel" placement="right">
                <i class="base-icon-s-custom"></i>
              </base-tooltip>
              <div class="AuthorInfo__content">
                <template v-if="!readable.show_all_author">
                  <template v-if="readable.author.length <= 6">
              <span v-for="(author, index) in readable.author" :key="readable.type+index+author" class="AuthorInfo__name">
                <span class="AuthorInfo__nameText" v-if="index === readable.author.length - 1" v-html="author"></span>
                <template v-else>
                  <span class="AuthorInfo__nameText" v-html="author"></span>
                  <span class="ContentItem__comma">,</span>
                </template>
              </span>
                  </template>
                  <template v-if="readable.author.length > 6">
              <span v-for="(author, index) in readable.author" :key="readable.type+index+author" class="AuthorInfo__name" v-if="index < 5">
                    <span class="AuthorInfo__nameText" v-if="index === 4" v-html="author"></span>
                    <template v-else>
                      <span class="AuthorInfo__nameText" v-html="author"></span>
                      <span class="ContentItem__comma">,</span>
                    </template>
                  </span>
                    <base-tooltip :content="$t('explore.action19')" placement="top">
                      <span class="AuthorInfo__extra" @click="showAllAuthor">···</span>
                    </base-tooltip>
                    <span class="AuthorInfo__name">
                  <span class="AuthorInfo__nameText" v-html="readable.author[readable.author.length - 1]"></span>
                </span>
                  </template>
                </template>
                <template v-if="readable.show_all_author">
            <span v-for="(author, index) in readable.author" :key="author" class="AuthorInfo__name">
              <span class="AuthorInfo__nameText" v-if="index === readable.author.length - 1" v-html="author"></span>
              <template v-else>
                <span class="AuthorInfo__nameText" v-html="author"></span>
                <span class="ContentItem__comma">,</span>
              </template>
            </span>
                </template>
              </div>
            </div>
          </template>
          <div v-if="readable.year || readable.isbn" class="ContentItem__meta">
            <span class="ContentItem__source">
              <span v-if="readable.year" class="ContentItem__label">{{$t('explore.book.label1')}}:</span>
              <span v-if="readable.year">{{readable.year}}</span>
              <span v-if="readable.year && readable.isbn" class="ContentItem__comma">,</span>
              <span v-if="readable.isbn" class="ContentItem__label">ISBN:</span>
              <span v-if="readable.isbn" v-html="readable.isbn"></span>
            </span>
          </div>
          <div v-if="readable.publisher" class="ContentItem__meta">
            <span class="ContentItem__source">
              <span class="ContentItem__label">{{$t('explore.book.label2')}}:</span>
              <span v-html="readable.publisher"></span>
            </span>
          </div>
        </div>
      </div>
      <div class="ContentItem__abstracts" v-if="readable.abstracts">
        <div class="RichContent">
          <div class="RichContent__inner">
            <span class="RichText" v-html="abstracts"></span>
          </div>
        </div>
      </div>
      <div class="TranslateContent" v-if="readable.abstracts_translated">
        <div class="RichContent">
          <div class="RichContent__inner">
            <span class="RichText">{{readable.abstracts_translated}}</span>
          </div>
        </div>
        <div v-if="isThemeZh" class="TranslateSupport">
          机器翻译由<svg t="1685325678764" class="Icon" viewBox="0 0 1199 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1668" width="16" height="16"><path d="M599.010743 585.142857L380.342857 254.741943c6.612114-7.021714 13.253486-13.897143 19.894857-20.6848L614.4 557.8752c-4.681143 8.484571-9.801143 17.6128-15.389257 27.267657M1169.378743 189.586286c10.8544-2.925714 4.008229-1.667657 30.164114-8.016457-42.1888-8.6016-298.656914 3.8912-494.533486 257.2288l-172.587885-255.912229h-66.823315l205.2096 303.572114c-5.149257 7.811657-10.327771 15.652571-15.36 23.815315a197.514971 197.514971 0 0 0-3.364571 5.705142L430.6944 189.674057C558.226286 71.124114 673.616457 0 673.616457 0c-16.764343 9.450057-32.9728 19.017143-48.917943 28.554971-88.590629 51.024457-165.6832 102.8096-232.535771 154.331429H359.277714l11.410286 16.822857c-7.957943 6.3488-15.798857 12.6976-23.434971 19.017143l-24.3712-35.84H256.087771l48.9472 71.972571c-149.328457 132.593371-233.442743 260.154514-272.764342 364.631772-46.138514 122.411886-31.217371 201.757257-24.693029 225.865143 9.947429 36.864 27.999086 66.121143 49.5616 90.258285 109.3632 122.821486 297.749943 96.256 444.357486 47.9232 128.234057-40.842971 230.458514-103.541029 230.458514-103.541028-271.506286 137.801143-549.888 174.109257-623.586743-45.962972-0.760686-2.2528-1.609143-4.5056-2.135771-6.846171-7.811657-34.757486-9.303771-73.201371 1.082514-127.7952 29.344914-154.185143 121.329371-294.063543 222.851657-407.552l243.360914 357.814857c-74.166857 110.650514-197.719771 249.709714-382.595657 287.685486 0 0 318.142171 27.794286 506.528915-227.415772l153.365942 227.415772h66.794058l-187.333486-277.152914c3.013486-5.149257 5.997714-10.357029 8.923428-15.711086 1.960229-3.598629 4.447086-8.016457 7.168-12.873143l207.4624 305.737143h66.823315l-243.419429-358.341486c5.822171-9.508571 12.141714-19.6608 18.900114-30.3104l264.192 388.651886h66.794058L828.942629 498.980571c83.031771-121.534171 209.627429-274.139429 340.436114-309.423542" fill="#0294AD" p-id="1669"></path></svg>科大讯飞 提供技术支持
        </div>
        <div v-if="!isThemeZh" class="TranslateSupport">
          Supported by <svg t="1685325678764" class="Icon" viewBox="0 0 1199 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1668" width="16" height="16"><path d="M599.010743 585.142857L380.342857 254.741943c6.612114-7.021714 13.253486-13.897143 19.894857-20.6848L614.4 557.8752c-4.681143 8.484571-9.801143 17.6128-15.389257 27.267657M1169.378743 189.586286c10.8544-2.925714 4.008229-1.667657 30.164114-8.016457-42.1888-8.6016-298.656914 3.8912-494.533486 257.2288l-172.587885-255.912229h-66.823315l205.2096 303.572114c-5.149257 7.811657-10.327771 15.652571-15.36 23.815315a197.514971 197.514971 0 0 0-3.364571 5.705142L430.6944 189.674057C558.226286 71.124114 673.616457 0 673.616457 0c-16.764343 9.450057-32.9728 19.017143-48.917943 28.554971-88.590629 51.024457-165.6832 102.8096-232.535771 154.331429H359.277714l11.410286 16.822857c-7.957943 6.3488-15.798857 12.6976-23.434971 19.017143l-24.3712-35.84H256.087771l48.9472 71.972571c-149.328457 132.593371-233.442743 260.154514-272.764342 364.631772-46.138514 122.411886-31.217371 201.757257-24.693029 225.865143 9.947429 36.864 27.999086 66.121143 49.5616 90.258285 109.3632 122.821486 297.749943 96.256 444.357486 47.9232 128.234057-40.842971 230.458514-103.541029 230.458514-103.541028-271.506286 137.801143-549.888 174.109257-623.586743-45.962972-0.760686-2.2528-1.609143-4.5056-2.135771-6.846171-7.811657-34.757486-9.303771-73.201371 1.082514-127.7952 29.344914-154.185143 121.329371-294.063543 222.851657-407.552l243.360914 357.814857c-74.166857 110.650514-197.719771 249.709714-382.595657 287.685486 0 0 318.142171 27.794286 506.528915-227.415772l153.365942 227.415772h66.794058l-187.333486-277.152914c3.013486-5.149257 5.997714-10.357029 8.923428-15.711086 1.960229-3.598629 4.447086-8.016457 7.168-12.873143l207.4624 305.737143h66.823315l-243.419429-358.341486c5.822171-9.508571 12.141714-19.6608 18.900114-30.3104l264.192 388.651886h66.794058L828.942629 498.980571c83.031771-121.534171 209.627429-274.139429 340.436114-309.423542" fill="#0294AD" p-id="1669"></path></svg> iFLYTEK
        </div>
      </div>
      <div v-if="false && !isArrayEmpty(links)">
        <div class="ContentItem__links">
          <span v-if="!isArrayEmpty(readable.local_links)" class="ContentItem__link">
            <img v-if="1!==1" class="ContentItem__linkLogo" src="/static/app-pdf.png">
            <span>下载链接</span>
          </span>
          <a class="ContentItem__link" v-for="(item, index) in links" :key="index">
            <span v-if="item.is_open_access" class="ContentItem__linkDot"></span>
            <img class="ContentItem__linkLogo" v-if="item.logo" :src="item.logo">
            <span>{{item.name}}</span>
          </a>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import BaseTooltip from '../../base/ui/tooltip/tooltip'
import BaseTag from '../../base/ui/tag/Tag'
import BaseImage from '../../base/ui/image/main.vue'
import { IsNumber, isArrayEmpty, HasChinese, clearHighlight, isArrayContains } from '../../../util'
import {
  MOBILE_CLIENT_WIDTH,
  TYPE_ARTICLE,
  TYPE_PATENT,
  TYPE_REPORT,
  TYPE_PROJECT,
  TYPE_BOOK,
  TYPE_SOFTWARE,
  TYPE_SCIENCE_DB,
  TYPE_LITERATURE,
  TYPE_NEWS,
  TYPE_JOURNAL,
  TYPE_BULLETIN,
  TYPE_BULLETIN_REPORT
} from '../../../constant'
import RichText from './RichText.vue'

const TYPE_FACILITY = 'facility'

export default {
  name: 'ReadableItemPlain',
  components: {RichText, BaseImage, BaseTag, BaseTooltip},
  data () {
    return {
      hidden: true,
      showTitleLabel: false,
      user: {},
      isMobileClient: typeof document !== 'undefined' ? document.body.clientWidth <= MOBILE_CLIENT_WIDTH : false,
      TYPE_ARTICLE,
      TYPE_PATENT,
      TYPE_REPORT,
      TYPE_PROJECT,
      TYPE_BOOK,
      TYPE_SOFTWARE,
      TYPE_SCIENCE_DB,
      TYPE_LITERATURE,
      TYPE_NEWS,
      TYPE_JOURNAL,
      TYPE_BULLETIN,
      TYPE_BULLETIN_REPORT,
      TYPE_FACILITY
    }
  },
  props: {
    readable: Object,
    editable: Boolean,
    showCPC: Boolean,
    enableSearch: {
      type: Boolean,
      default: true
    },
    enableTitleLink: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isThemeZh () {
      const locale = this.$i18n && this.$i18n.locale ? this.$i18n.locale : 'zh'
      return !String(locale).toLowerCase().startsWith('en')
    },
    authorLabel () {
      switch (this.readable.type) {
        case this.TYPE_PATENT:
          return this.isThemeZh ? '发明人' : 'Inventors'
        case this.TYPE_REPORT:
          return this.isThemeZh ? '编译者' : 'Editors'
        default:
          return this.isThemeZh ? '作者' : 'Authors'
      }
    },
    isChineseReadable () {
      return this.isChineseText(this.readable.title)
    },
    abstracts () {
      return this.readable.abstracts_highlight || this.readable.abstracts || this.readable.abstracts_abbreviation_highlight || this.readable.abstracts_abbreviation
    },
    keywords () {
      if (!this.isArrayEmpty(this.readable.keywords)) {
       return this.readable.keywords.filter(keyword => {
          return !!keyword
        })
      }
      return []
    },
    keywordsV0 () {
      if (!this.isArrayEmpty(this.readable.keyword)) {
       return this.readable.keyword.filter(keyword => {
          return !!keyword
        })
      }
      return []
    },
    totalPages () {
      if (this.readable.first_page && this.readable.last_page) {
        if (IsNumber(this.readable.first_page - 0) && IsNumber(this.readable.last_page - 0)) {
          return this.readable.last_page - this.readable.first_page + 1
        }
      } else if (this.readable.article_type === '学位论文') {
        if (this.readable.first_page && !this.readable.last_page) {
          if (IsNumber(this.readable.first_page - 0)) {
            return this.readable.first_page
          }
        } else if (!this.readable.first_page && this.readable.last_page) {
          if (IsNumber(this.readable.last_page - 0)) {
            return this.readable.last_page
          }
        }
      }
      return 0
    },
    links () {
      if (!this.isArrayEmpty(this.readable.links)) {
        this.readable.links.forEach(item => {
          item.type = 2
          if (item.name === '期刊官网') {
            item.name = this.$t('explore.journalWebsite')
          }
        })
        /*if (this.readable.article_type === '学位论文') {
          return this.readable.links.filter(link => {
            return link.name === '中国科学院学位论文数据库'
          })
        }*/
        if (!this.isArrayEmpty(this.readable.local_links) && this.readable.type === this.TYPE_ARTICLE)  {
          this.readable.links = this.readable.links.filter(link => {
            return link.name !== '本地下载'
          })
          this.readable.links.unshift({
            name: '本地下载',
            url: this.readable.local_links[0].replace('file.scholarin.cn', 'pubscholar.cn'),
            logo: '/static/app-pdf.png',
            type: 0
          })
        }
        if (this.hasSharePermission && this.readable.type === this.TYPE_ARTICLE)  {
          this.readable.links.unshift({
            name: '作者共享',
            url: this.readable.attachments[0].file_link,
            logo: '/static/app-pdf.png',
            type: 1
          })
        }
        return this.readable.links
      } else {
        if (this.readable.type === this.TYPE_ARTICLE) {
          if (!this.readable.links) {
            this.readable.links = []
          }
          if (!this.isArrayEmpty(this.readable.local_links))  {
            this.readable.links = this.readable.links.filter(link => {
              return link.name !== '本地下载'
            })
            this.readable.links.unshift({
              name: '本地下载',
              url: this.readable.local_links[0].replace('file.scholarin.cn', 'pubscholar.cn'),
              logo: '/static/app-pdf.png',
              type: 0
            })
          }
          if (this.hasSharePermission)  {
            this.readable.links.unshift({
              name: '作者共享',
              url: this.readable.attachments[0].file_link,
              logo: '/static/app-pdf.png',
              type: 1
            })
          }
          return this.readable.links
        }
        if (this.readable.link) {
          if (this.readable.type === this.TYPE_SCIENCE_DB) {
            return [{
              name: this.$t('explore.action20'),
              url: this.readable.link
          }]
          } else if (this.readable.type === this.TYPE_BOOK) {
            return [{
              name: this.$t('explore.action20'),
              url: this.readable.link
            }]
          } else if (this.readable.type === this.TYPE_REPORT) {
            let links = [{
              name: this.$t('explore.action20'),
              url: this.readable.link
            }]
            if (this.readable.download_url) {
              /**
              links.unshift({
                name: '本地下载',
                logo: '/static/app-pdf.png',
                url: this.readable.download_url
              })
               */
            }
            return links
          } else if (this.readable.type === this.TYPE_LITERATURE) {
            return [{
              name: this.$t('explore.action20'),
              url: this.readable.link
            }]
          } else {
            return [{
              name: this.$t('explore.action20'),
              url: this.readable.link
            }]
          }
        }
      }
      return []
    },
    isFreeDownload () {
      for (let i = 0; i < this.links.length; i++) {
        let link = this.links[i]
        if (link.is_open_access) {
          return true
        }
      }
      return false
    },
    hasPDF () {
      return !this.isArrayEmpty(this.readable.local_links) || this.hasSharePermission
    },
    softwareTitleTags () {
      if (this.readable.type !== this.TYPE_SOFTWARE) {
        return []
      }
      const normalize = (value) => {
        if (Array.isArray(value)) {
          for (let i = 0; i < value.length; i++) {
            let normalized = normalize(value[i])
            if (normalized) {
              return normalized
            }
          }
          return ''
        }
        if (value && typeof value === 'object') {
          return normalize(value.label || value.name || value.title || value.value || value.resource_type || value.text || '')
        }
        if (value === 0) {
          return '0'
        }
        if (!value) {
          return ''
        }
        return this.clearHighlight(String(value).trim())
      }
      let extendEntity = this.readable.extend_entit || this.readable.extend_entity || {}
      return [
        {
          key: 'resourceType',
          label: normalize(extendEntity.resource_type || this.readable.resource_type)
        },
        {
          key: 'source',
          label: normalize(this.readable.source_list)
        },
        {
          key: 'license',
          label: normalize(this.readable.license || this.readable.license_name)
        }
      ].filter(item => item.label)
    },
    hasSharePermission () {
      let attachments = this.readable.attachments
      if (!this.isArrayEmpty(attachments)) {
        let permission
        attachments.forEach(item => {
          permission = item.file_permission
        })
        if (permission === 0) {
          if (!this.isArrayEmpty(this.readable.author)) {
            return this.arrayContains(this.readable.author, this.user.name)
          } else {
            return false
          }
        } else return permission === 4
      } else {
        return false
      }
    }
  },
  methods: {
    isArrayEmpty,
    clearHighlight,
    arrayContains: isArrayContains,
    isChineseText: HasChinese,
    showAllAuthor () {
      this.readable.show_all_author = true
      this.$forceUpdate()
    },
    showAllKeyword () {
      this.readable.show_all_keyword = true
      this.readable.show_all_keywords = true
      this.$forceUpdate()
    },
    refresh () {
      this.$forceUpdate()
    },
    titlePlainText (value) {
      if (Array.isArray(value)) {
        return value.map(item => this.titlePlainText(item)).join(' ').trim()
      }
      if (value === 0) {
        return '0'
      }
      if (!value) {
        return ''
      }
      return String(value)
        .replace(/<[^>]*>/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/\s+/g, ' ')
        .trim()
    },
    formatPatentDate (date) {
      if (!date) {
        return '--'
      }
      if (date.length === 8) {
        return date.substring(0, 4) + '-' + date.substring(4, 6) + '-' + date.substring(6)
      }
      return date
    }
  },
  mounted () {
    this.readable.show_all_author = false
    this.readable.show_all_keyword = false
    this.readable.show_all_keywords = false
    const showKeywordLimit = this.isChineseReadable && this.isThemeZh ? 5 : 4
    const keywordList = !this.isArrayEmpty(this.readable.keywords) ? this.readable.keywords : this.readable.keyword
    if (!this.isArrayEmpty(keywordList)) {
      for (let i = 0; i < keywordList.length; i++) {
        if (i >= showKeywordLimit && String(keywordList[i]).indexOf('<span class="Highlight">') !== -1) {
          this.showAllKeyword()
          break
        }
      }
    }
    const authorList = !this.isArrayEmpty(this.readable.author) ? this.readable.author : this.readable.inventors
    if (!this.isArrayEmpty(authorList)) {
      for (let j = 0; j < authorList.length; j++) {
        if (j >= 5 && j < authorList.length - 1 && String(authorList[j]).indexOf('<span class="Highlight">') !== -1) {
          this.showAllAuthor()
          break
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import '../../base/ui/style/var';
  .ContentItem {
    &.is-en {
      font-family: Inter,Roboto,pingfang SC,hiragino sans gb,Apple SD Gothic Neo,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,sans-serif,helvetica neue,arial,microsoft yahei ui,microsoft yahei,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;
    }
  }
  .TranslateContent, .RecommendationContent {
    background-color: $--background-color-base;
    border-radius: 2px;
    color: $--color-text-regular-2;
    font-size: 15px;
    padding: 10px;
  }
  .TranslateSupport {
    color: $--color-text-secondary-2;
    display: flex;
    align-items: center;
    margin-top: 10px;
    text-align: right;
    font-size: 13px;
    .Icon {
      margin: 0 4px;
    }
  }
  .RecommendationContent {
    margin-top: 10px;
    .RichContent__inner {
      font-size: 14px;
    }
  }
  .TranslateTitle {
    background-color: #F3F5F8;
    padding: 0 10px;
    font-size: 15px;
    display: inline-block;
    color: #444;
    margin-top: 0;
    font-weight: 600;
    border-radius: 4px;
  }
  .ContentItem__title {
    font-size: $--font-size-large;
    color: $--color-primary;
    font-weight: 600;
    font-synthesis: style;
    line-height: 1.6;
    word-break: break-word;
    cursor: pointer;
    transition: color .3s;
    a {
      display: inline-block;
    }
    &:hover {
      color: rgba(47,58,145, .75);
    }
  }
  .JournalAbstracts {
    color: $--color-text-regular-2!important;
    .RichContent__inner {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
  }
  .ContentItem__author {
    margin-top: 6px;
    //font-style: italic;
    &.is-disabled {
      .AuthorInfo__nameText {
        cursor: auto;
        &:hover {
          border: none;
          color: $--color-text-regular-2;
        }
      }
    }
  }
  .MetaText {
    //color:  #6d7280;
    color:  #999;
    font-size: $--font-size-base;
    &.is-en {
      margin-right: 10px;
    }
  }
  .ContentItem__innerWithCover {
    display: flex;
  }
  .BulletinCover {
    width: 90px;
    height: 120px;
    border-radius: 4px;
    background-color: $--background-color-base;
    margin-right: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 4px 0 rgba(54,58,80,.32);
    i {
      font-size: 20px;
      color: $--color-text-secondary;
    }
    ::v-deep .base-image__inner {
      width: 90px;
      height: 120px;
      border-radius: 4px;
      object-fit: cover;
      cursor: pointer;
    }
  }
  .FacilityCover {
    width: 230px;
    height: 100%;
    border-radius: 4px;
    background-color: $--background-color-base;
    margin-right: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 4px 0 rgba(54,58,80,.32);
    .base-image {
      height: 100%;
    }
    i {
      font-size: 20px;
      color: $--color-text-secondary;
    }
    ::v-deep .base-image__inner {
      width: 230px;
      height: 100%;
      border-radius: 4px;
      object-fit: cover;
      cursor: pointer;
    }
  }
  .FacilityCover__empty {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .FacilityCover__emptyText {
    color: rgba(18, 22, 26, .45);
    font-size: 16px;
    letter-spacing: .18em;
    text-transform: uppercase;
  }
  .LiteratureCover {
    width: 200px;
    height: 120px;
    border-radius: 4px;
    background-color: $--background-color-base;
    margin-right: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 4px 0 rgba(54,58,80,.32);
    i {
      font-size: 20px;
      color: $--color-text-secondary;
    }
    ::v-deep .base-image__inner {
      width: 200px;
      height: 120px;
      border-radius: 4px;
      object-fit: cover;
      cursor: pointer;
    }
  }

  .ContentItem__meta {
    margin-top: 10px;
  }
  .ContentItem__titleText {
    margin-right: 6px;
  }
  .ContentItem__status {
    font-size: 14px;
    margin: 0 4px 0 -4px;
    vertical-align: 1px;
  }
  .ContentItem__abstracts {
    margin-top: 10px;
    color: $--color-text-secondary-2;
  }
  .FacilityAbstract {
    .RichText {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      color: $--color-text-regular-3;
    }
  }
  .Keywords {
    display: flex;
    flex-wrap: wrap;
    line-height: 1.7;
  }
  .Keyword {
    font-size: $--font-size-base;
    //color:  #6d7280;
    color:  #999;
    cursor: pointer;
    margin-right: 12px;
    transition: all .3s;
    word-break: break-word;
    height: 24px;
    &.is-disabled {
      cursor: default;
    }
    &:not(.is-disabled):hover {
      border-bottom: 1px dotted #444;
      color: $--color-primary;
    }
  }
  .KeywordMore {
    font-size: $--font-size-base;
    color: #6d7280;
    cursor: pointer;
    &:hover {
      opacity: .8;
    }
  }
  .AuthorInfo {
    display: flex;
    .base-icon-s-custom {
      color: $--color-text-secondary-2;
      padding-top: 5px;
      margin-right: 10px;
      font-size: 15px;
      transition: color .3s;
      &:hover {
        color: $--color-primary;
      }
    }
  }
  .AuthorInfo__content {
    flex: 1;
    overflow: hidden;
    display: inline-block;
    line-height: 1.7;
    .Button--more {
      margin-left: 6px;
    }
    .Dot {
      font-weight: 600;
      margin: 0 4px 0 0!important;
    }
  }
  .AuthorInfo__extra {
    font-size: $--font-size-extra-small;
    padding: 0 6px 0 0;
    color: $--color-text-secondary-2;
    cursor: pointer;
    font-weight: 600;
    &:hover {
      opacity: .8;
    }
  }
  .AuthorInfo__avatar {
    vertical-align: top;
  }
  .AuthorInfo__name {
    font-weight: 600;
    margin-right: 6px;
    font-size: 15px;
    &.AuthorInfo__name--light {
      font-weight: 500;
    }
  }
  .ContentItem__label {
    color: $--color-text-secondary-2;
    margin-right: 4px;
  }
  .ContentItem__comma {
    color: $--color-text-secondary-2;
    font-weight: 500;
  }
  .ContentItem__source {
    &.is-disabled {
      .AuthorInfo__nameText {
        cursor: default;
      }
    }
    .ContentItem__comma {
      margin-right: 2px;
    }
  }
  .BookAuthor {
    .AuthorInfo__nameText {
      cursor: default;
    }
  }
  .AuthorInfo__nameText {
    cursor: pointer;
    transition: all .3s;
    color: $--color-text-regular-2;
    &:hover {
      border-bottom: 1px dotted $--color-text-regular-2;
      color: $--color-primary;
    }
    &.is-disabled {
      cursor: auto;
      &:hover {
        border: none;
        color: $--color-text-regular-2;
      }
    }
  }
  .ContentItem__source {
    //font-style: italic;
    font-weight: 500;
    color: $--color-text-regular-2;
    font-size: 15px;
    .Keyword {
      background-color: #fff2e8!important;
      color: #ff791a!important;
      &.is-last {
        margin-right: 3px!important;
      }
      &.is-first {
        // margin-left: -6px!important;
      }
    }
  }
  .ContentItem__metaSource {
    transition: all .3s;
    &.is-en {
      font-size: 14px;
    }
    &.is-disabled {
      cursor: default;
    }
    &:not(.is-disabled):hover {
      color: $--color-primary;
      border-bottom: 1px dotted $--color-text-regular;
    }
    cursor: pointer;
  }
  .RichContent {
    line-height: 1.6;
    &::after {
      display: block;
      content: "";
      clear: both;
    }
    .RichText {
      margin-right: 4px;
    }
  }
  .RichContent.is-collapsed {
    cursor: pointer;
    transition: color .14s ease-out;
  }
  .RichContent__inner {
    font-size: 15px;
    overflow: hidden;
  }
  .RichText {
    word-break: break-word;
    line-height: 1.6;
  }
  .RichContent.is-collapsed .RichText {
    pointer-events: none;
  }
  .RichContent.is-collapsed:not(.RichContent--unescapable) .RichText {
    white-space: normal;
  }
  .RichContent.is-collapsed .RichContent__inner:hover {
    color: #6d7280;
  }
  .ContentItem__more {
    height: auto;
    padding: 0;
    color: $--color-primary;
    &:hover, &:focus {
      color: rgba(47,58,145, .75);
      background-color: transparent!important;
      border-color: transparent!important;
    }
    .Icon {
      fill: currentColor;
    }
  }
  .ContentItem__less {
    height: auto;
    padding: 0;
    margin-left: 0;
    color: $--color-primary;
    &:hover, &:focus {
      color: rgba(47,58,145, .75);
      background-color: transparent!important;
      border-color: transparent!important;
    }
  }
  .ContentItem__keywords {
    margin-top: 8px;
  }
  .PatentMetaList {
    display: flex;
    width: 100%;
    border: 1px solid #EBEBEB;
    padding: 10px;
  }
  .PatentMetaListItem {
    flex: 1;
    color: $--color-text-secondary;
    line-height: 1.5;
    font-size: 15px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    &>div {
      text-align: left;
    }
  }
  .PatentMetaListItem+.PatentMetaListItem {
    border-left: 1px solid $--color-primary-light-9;
  }
  .ContentItem__links {
    display: flex;
    flex-wrap: wrap;
    margin-top: 14px;
    .MetaText {
      line-height: 36px;
    }
    .base-icon-s-promotion {
      margin-right: 10px;
      color: $--color-primary;
    }
    margin-bottom:-10px;
  }
  .ContentItem__link {
    padding: 6px 14px;
    margin-bottom: 10px;
    box-sizing: border-box;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    -webkit-font-smoothing: antialiased;
    cursor: pointer;
    color: $--color-text-primary;
    background-image: linear-gradient(0deg,#fff,#f3f5f8);
    border: 2px solid #fff;
    box-shadow: 8px 8px 20px 0 rgba(55,99,170,.1), -8px -8px 20px 0 #fff, inset 0 4px 20px 0 hsla(0deg,0%,100%,.5);
    transition: all .3s;
    margin-right: 16px;
    font-size: $--font-size-base;
    &:hover {
      color: $--color-primary;
      background: #f3f5f8;
      box-shadow: inset 8px 8px 20px 0 rgba(55,99,170,.11), inset -8px -8px 20px 0 #fff;
    }
  }
  .ContentItem__linkDot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: $--color-success;
    margin-right: 6px;
    // vertical-align: -1px;
    display: inline-block;
  }
  .ContentItem__linkLogo {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin-right: 6px;
  }
  .ContentItem__titleLabel {
    display: inline-block;
    font-weight: 600;
    font-size: 12px;
    color: $--color-text-secondary;
    padding: 0;
    margin: 0;
    vertical-align: 1px;
  }
  .ContentItem__titleLabel+.ContentItem__titleLabel {
    margin-left: -6px;
  }
  .ContentItem__titleLabel--oa {
    color: $--color-warning;
  }
  .ContentItem__titleLabel--pdf {
    color: $--color-danger;
  }
  .ContentItem__titleLabel--free {
    color: rgb(19, 206, 102);
  }
  .SoftwareTitleTags {
    display: inline-flex;
    flex-wrap: wrap;
    gap: 8px;
    vertical-align: middle;
  }
  .SoftwareTitleTag.base-tag {
    border: none;
    font-weight: 500;
    vertical-align: middle;
  }
  .SoftwareTitleTag--resourceType.base-tag {
    background-color: #e7f5e8 !important;
    color: #3b8b4b !important;
  }
  .SoftwareTitleTag--source.base-tag {
    background-color: #f1e7fb !important;
    color: #8b56c2 !important;
  }
  .SoftwareTitleTag--license.base-tag {
    background-color: #fff1dc !important;
    color: #f07d20 !important;
  }
  .ContentItem__pdf {
    vertical-align: -2px;
    display: inline-block;
    margin-right: 10px;
  }
  .LiteratureTitle {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    max-height: 28px;
    line-height: 1.5;
  }
  .LiteratureHighlight {
    margin-top: 8px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    max-height: 23px;
    min-height: 23px;
    line-height: 1.5;
    font-size: 15px;
    color: #4b5b76;
  }
  .LiteratureHighlight--more {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    max-height: 68px;
    min-height: 68px;
  }
  .LiteratureAuthor {
    margin-top: 8px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    max-height: 23px;
    min-height: 23px;
    line-height: 1.5;
    font-size: 14px;
    color: #6d7280;
  }
  .LiteratureSource {
    color: $--color-text-secondary-2;
    font-size: 14px;
    margin-top: 8px;
  }
  .LiteratureContentItem {
    cursor: pointer;
    &:hover {
      .LiteratureTitle {
        color: $--color-primary;
      }
    }
  }
  @media (max-width: 576px) {

    .LiteratureContentItem {
      flex-direction: column;
    }
    .LiteratureCover {
      width: 100%;
      margin-bottom: 14px;
      margin-right: 0;
    }
    .LiteratureTitle {
      display: block;
      max-height: initial;
    }
    .LiteratureAuthor {
      display: block;
      max-height: initial;
    }
    .LiteratureHighlight {
      display: block;
      max-height: initial;
    }
    .ContentItem__innerWithCover--large {
      flex-direction: column;
      .FacilityCover {
        width: 100%;
        margin: 0 0 16px;
        height: 150px;
        ::v-deep .base-image {
          width: 100%;
          height: 150px;
        }
        ::v-deep .base-image__inner {
          width: 100%;
          height: 150px;
        }
      }
    }
  }
  .FacilityLink {
    position: relative;
    margin: 0 12px;
    &:first-child {
      margin-left: 0;
    }
  }
  .FacilityLink+.FacilityLink {
    &:before {
      content: '';
      position: absolute;
      left: -14px;
      top: 50%;
      transform: translateY(-50%);
      width: 1px;
      height: 14px;
      background-color: #e0e0e0;
    }
  }
  @media (min-width: 1440px) {
    .FacilityCover {
      width: 200px;
      ::v-deep .base-image__inner {
        width: 200px;
      }
    }
  }

  .ContentItem--plain {
    .ContentItem__title,
    .AuthorInfo__nameText,
    .Keyword,
    .ContentItem__metaSource,
    .LiteratureContentItem {
      cursor: default;
    }
    .ContentItem__title:hover {
      color: $--color-primary;
    }
    .AuthorInfo__nameText:hover {
      border-bottom: none;
      color: $--color-text-regular-2;
    }
    .Keyword:not(.is-disabled):hover {
      border-bottom: none;
      color: #999;
    }
    .ContentItem__metaSource:not(.is-disabled):hover {
      border-bottom: none;
      color: inherit;
    }
    .ContentItem__abstracts .RichContent__inner {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      max-height: 72px;
      overflow: hidden;
    }
    .FacilityAbstract .RichText {
      display: inline;
      -webkit-line-clamp: initial;
      overflow: visible;
    }
    .LiteratureContentItem:hover {
      .LiteratureTitle {
        color: inherit;
      }
    }
    .RichContent.is-collapsed {
      cursor: default;
    }
    .RichContent.is-collapsed .RichContent__inner:hover {
      color: inherit;
    }
    ::v-deep .base-image__inner {
      cursor: default;
    }
  }
</style>
<style lang="scss">
  @media (max-width: 576px) {
    .LiteratureCover {
      .base-image, .base-image__inner {
        width: 100% !important;
      }
    }
  }
</style>


