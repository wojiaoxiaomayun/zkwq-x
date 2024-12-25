<template>
  <div class="ContentItem" :class="{'is-en':!isChineseReadable}">
    <span class="ContentItem__linkDotMeta" v-if="1!==1 && readable.type === TYPE_ARTICLE && readable.is_free">
        <span class="ContentItem__linkDot"></span>
        <span>Open access</span>
    </span>
    <h2 class="ContentItem__title" @click="goToDetail">
      <span class="ContentItem__titleText" v-html="readable.title"></span>
      <span class="ContentItem__status" v-if="readable.type === TYPE_PATENT && readable.grant_date">[{{t('custom.readableItem.已授权')}}]</span>
      <span v-if="!isArrayEmpty(readable.local_links) || readable.download_url" class="ContentItem__pdf">
        <svg class="Icon" viewBox="0 0 1024 1024" p-id="4805" width="20" height="20"><path d="M192 0h448.1536L960 320v576c0 70.6944-57.3056 128-128 128H192C121.3056 1024 64 966.6944 64 896V128C64 57.3056 121.3056 0 192 0z" fill="#E9494A" p-id="4806"></path><path d="M323.1104 647.8592v72.1408h-42.1888V515.2512h79.872c12.096 0 22.912 1.6896 32.4224 5.056 9.5104 3.3792 17.5744 8.0896 24.192 14.144 6.6048 6.0416 11.648 13.2096 15.104 21.504 3.4688 8.3072 5.2096 17.3312 5.2096 27.072 0 9.9456-1.7408 18.8928-5.2096 26.8672a55.552 55.552 0 0 1-15.104 20.3904c-6.6176 5.632-14.6816 9.9584-24.192 13.0048-9.5232 3.0464-20.3264 4.5696-32.4224 4.5696h-37.6832z m0-34.176h37.6832c6.0032 0 11.1872-0.7424 15.5392-2.24 4.352-1.5104 7.936-3.584 10.688-6.272 2.7648-2.6624 4.8128-5.8752 6.1184-9.6256 1.3184-3.7504 1.9712-7.8208 1.9712-12.2368 0-4.4032-0.6528-8.64-1.9712-12.7232a30.1824 30.1824 0 0 0-6.1184-10.8288 29.504 29.504 0 0 0-10.688-7.5264c-4.352-1.8688-9.536-2.816-15.5392-2.816h-37.6832v64.2688zM466.688 720V515.2512h63.0016c13.7856 0 26.4064 2.368 37.888 7.104 11.4944 4.736 21.3376 11.392 29.5424 19.968a91.264 91.264 0 0 1 19.2 30.8608c4.5824 12.0064 6.8864 25.3184 6.8864 39.936v9.28c0 14.6304-2.2784 27.9168-6.8224 39.872a89.4208 89.4208 0 0 1-19.264 30.7968 85.76 85.76 0 0 1-29.7472 19.904c-11.52 4.6848-24.2304 7.0272-38.1056 7.0272H466.688z m42.1888-170.5728v136.6784h20.3904c16.6912 0 29.3888-5.504 38.1056-16.512 8.7168-11.0208 13.0816-26.752 13.0816-47.1936v-9.5616c0-20.8128-4.3136-36.5824-12.928-47.3088-8.64-10.752-21.248-16.1024-37.8368-16.1024h-20.8128z m268.16 86.912H696.064v83.6608h-42.1888V515.2512h133.312v34.176h-91.136v52.864h81.0112v34.048z" fill="#FFFFFF" opacity=".9" p-id="4807"></path><path d="M640 0l320 320H768c-70.6944 0-128-57.3056-128-128V0z" fill="#FF7171" p-id="4808"></path></svg>
      </span>
      <span class="ContentItem__linkDotMeta" v-if="readable.type === TYPE_ARTICLE && (readable.is_free || !isArrayEmpty(readable.local_links))">
        <span class="ContentItem__linkDot"></span>
        <span>Open access</span>
      </span>
      <base-tag v-if="readable.type === TYPE_CHINAXIV" size="mini">{{readable.status === 1 ? t('custom.readableItem.已发布') : t('custom.readableItem.未发布')}}</base-tag>
      <base-tag style="margin-left:8px;" v-if="readable.type === TYPE_CHINAXIV && readable.copyright == '1'" size="mini" type="info">{{t('custom.readableItem.作为本文作者的授权代理人提交')}}</base-tag>
    </h2>
    <div class="TranslateContent" v-if="readable.title_translated">
      {{readable.title_translated}}
      <div class="TranslateSupport">
        {{t('custom.readableItem.机器翻译由')}} <svg t="1685325678764" class="Icon" viewBox="0 0 1199 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1668" width="16" height="16"><path d="M599.010743 585.142857L380.342857 254.741943c6.612114-7.021714 13.253486-13.897143 19.894857-20.6848L614.4 557.8752c-4.681143 8.484571-9.801143 17.6128-15.389257 27.267657M1169.378743 189.586286c10.8544-2.925714 4.008229-1.667657 30.164114-8.016457-42.1888-8.6016-298.656914 3.8912-494.533486 257.2288l-172.587885-255.912229h-66.823315l205.2096 303.572114c-5.149257 7.811657-10.327771 15.652571-15.36 23.815315a197.514971 197.514971 0 0 0-3.364571 5.705142L430.6944 189.674057C558.226286 71.124114 673.616457 0 673.616457 0c-16.764343 9.450057-32.9728 19.017143-48.917943 28.554971-88.590629 51.024457-165.6832 102.8096-232.535771 154.331429H359.277714l11.410286 16.822857c-7.957943 6.3488-15.798857 12.6976-23.434971 19.017143l-24.3712-35.84H256.087771l48.9472 71.972571c-149.328457 132.593371-233.442743 260.154514-272.764342 364.631772-46.138514 122.411886-31.217371 201.757257-24.693029 225.865143 9.947429 36.864 27.999086 66.121143 49.5616 90.258285 109.3632 122.821486 297.749943 96.256 444.357486 47.9232 128.234057-40.842971 230.458514-103.541029 230.458514-103.541028-271.506286 137.801143-549.888 174.109257-623.586743-45.962972-0.760686-2.2528-1.609143-4.5056-2.135771-6.846171-7.811657-34.757486-9.303771-73.201371 1.082514-127.7952 29.344914-154.185143 121.329371-294.063543 222.851657-407.552l243.360914 357.814857c-74.166857 110.650514-197.719771 249.709714-382.595657 287.685486 0 0 318.142171 27.794286 506.528915-227.415772l153.365942 227.415772h66.794058l-187.333486-277.152914c3.013486-5.149257 5.997714-10.357029 8.923428-15.711086 1.960229-3.598629 4.447086-8.016457 7.168-12.873143l207.4624 305.737143h66.823315l-243.419429-358.341486c5.822171-9.508571 12.141714-19.6608 18.900114-30.3104l264.192 388.651886h66.794058L828.942629 498.980571c83.031771-121.534171 209.627429-274.139429 340.436114-309.423542" fill="#0294AD" p-id="1669"></path></svg> iFLYTEK
      </div>
    </div>
    <template v-if="readable.type === TYPE_ARTICLE && readable.article_type !== '学位论文' && !isArrayEmpty(readable.author)">
      <div class="ContentItem__author AuthorInfo">
        <base-tooltip :content="'共 ' + readable.author.length + ' 位' + authorLabel" placement="right">
          <i class="base-icon-s-custom"></i>
        </base-tooltip>
        <div class="AuthorInfo__content">
          <template v-if="!readable.show_all_author">
            <template v-if="readable.author.length <= 6">
              <span v-for="(author, index) in readable.author" :key="readable.type+index+author" class="AuthorInfo__name">
                <hover-card v-if="index === readable.author.length - 1" :uid="authorHover && readable.author_id[index]" @skip="handleSkip" @follow="handleFollow" @disfollow="handleDisfollow">
                  <span class="AuthorInfo__nameText" :class="{'is-disabled':!openSearch && !(authorHover && readable.author_id[index])}"  v-html="author" @click="searchAuthor(clearHighlight(author))"></span>
                </hover-card>
                <template v-else>
                  <hover-card :uid="authorHover && readable.author_id[index]" @skip="handleSkip" @follow="handleFollow" @disfollow="handleDisfollow">
                    <span class="AuthorInfo__nameText" :class="{'is-disabled':!openSearch && !(authorHover && readable.author_id[index])}" v-html="author" @click="searchAuthor(clearHighlight(author))"></span>
                  </hover-card>
                  <span class="ContentItem__comma">,</span>
                </template>
              </span>
            </template>
            <template v-if="readable.author.length > 6">
              <span v-for="(author, index) in readable.author" :key="readable.type+index+author" class="AuthorInfo__name" v-if="index < 5">
                    <hover-card v-if="index === 4" :uid="authorHover && readable.author_id[index]" @skip="handleSkip" @follow="handleFollow" @disfollow="handleDisfollow">
                      <span class="AuthorInfo__nameText" :class="{'is-disabled':!openSearch && !(authorHover && readable.author_id[index])}"  v-html="author" @click="searchAuthor(clearHighlight(author))"></span>
                    </hover-card>
                    <template v-else>
                      <hover-card :uid="authorHover && readable.author_id[index]" @skip="handleSkip" @follow="handleFollow" @disfollow="handleDisfollow">
                        <span class="AuthorInfo__nameText" :class="{'is-disabled':!openSearch && !(authorHover && readable.author_id[index])}" v-html="author" @click="searchAuthor(clearHighlight(author))"></span>
                      </hover-card>
                      <span class="ContentItem__comma">,</span>
                    </template>
                  </span>
              <base-tooltip :content="t('custom.readableItem.展开更多作者')" placement="top">
                <span class="AuthorInfo__extra" @click="showAllAuthor">···</span>
              </base-tooltip>
              <span class="AuthorInfo__name">
                <hover-card :uid="authorHover && readable.author_id[readable.author.length - 1]" @skip="handleSkip" @follow="handleFollow" @disfollow="handleDisfollow">
                  <span class="AuthorInfo__nameText" :class="{'is-disabled':!openSearch && !(authorHover && readable.author_id[readable.author.length - 1])}" v-html="readable.author[readable.author.length - 1]" @click="searchAuthor(clearHighlight(readable.author[readable.author.length - 1]))"></span>
                </hover-card>
              </span>
            </template>
          </template>
          <template v-if="readable.show_all_author">
            <span v-for="(author, index) in readable.author" :key="author" class="AuthorInfo__name">
              <hover-card v-if="index === readable.author.length - 1" :uid="authorHover && readable.author_id[index]" @skip="handleSkip" @follow="handleFollow" @disfollow="handleDisfollow">
                <span class="AuthorInfo__nameText" :class="{'is-disabled':!openSearch && !(authorHover && readable.author_id[index])}"  v-html="author" @click="searchAuthor(clearHighlight(author))"></span>
              </hover-card>
              <template v-else>
                <hover-card :uid="authorHover && readable.author_id[index]" @skip="handleSkip" @follow="handleFollow" @disfollow="handleDisfollow">
                  <span class="AuthorInfo__nameText" :class="{'is-disabled':!openSearch && !(authorHover && readable.author_id[index])}" v-html="author" @click="searchAuthor(clearHighlight(author))"></span>
                </hover-card>
                <span>,</span>
              </template>
            </span>
          </template>
        </div>
      </div>
    </template>
    
    <template v-else-if="readable.type === TYPE_ARTICLE && readable.article_type === '学位论文' && !isArrayEmpty(readable.author)">
      <div class="ContentItem__author AuthorInfo">
        <base-tooltip :content="'共 ' + readable.author.length + ' 位' + authorLabel" placement="right">
          <i class="base-icon-s-custom"></i>
        </base-tooltip>
        <div class="AuthorInfo__content">
          <span v-for="(author, index) in readable.author" :key="author" class="AuthorInfo__name">
            <hover-card v-if="index === readable.author.length - 1" :uid="readable.author_id[index]" @skip="handleSkip" @follow="handleFollow" @disfollow="handleDisfollow">
              <span class="AuthorInfo__nameText" :class="{'is-disabled':!openSearch && !(authorHover && readable.author_id[index])}" v-html="author" @click="searchAuthor(clearHighlight(author))"></span>
            </hover-card>
            <template v-else>
              <hover-card :uid="readable.author_id[index]" @skip="handleSkip" @follow="handleFollow" @disfollow="handleDisfollow">
                <span class="AuthorInfo__nameText" :class="{'is-disabled':!openSearch && !(authorHover && readable.author_id[index])}" v-html="author" @click="searchAuthor(clearHighlight(author))"></span>
              </hover-card>
              <span class="ContentItem__comma">,</span>
            </template>
            </span>
            <span class="ContentItem__comma">,</span>
          <span class="AuthorInfo__name AuthorInfo__name--light" v-if="readable.degree">
            <span class="AuthorInfo__nameText is-disabled">{{readable.degree}}</span>
          </span><span class="ContentItem__comma" v-if="readable.degree && readable.major && readable.major !== '专业'">,</span>
          <span class="AuthorInfo__name AuthorInfo__name--light" v-if="readable.major && readable.major !== '专业'">
            <span class="AuthorInfo__nameText" :class="{'is-disabled':!openSearch}" @click="searchMajor(clearHighlight(readable.major))" v-html="readable.major + '专业'"></span></span><span class="ContentItem__comma" v-if="(readable.degree || (readable.major && readable.major !== '专业')) && readable.tutor">,</span>
          <span class="AuthorInfo__name AuthorInfo__name--light" v-if="readable.tutor"><span class="ContentItem__label">{{t('custom.readableItem.导师')}}:</span><span v-for="(tutor, index) in readable.tutor" :key="tutor+index"><span v-if="index === readable.tutor.length - 1" class="AuthorInfo__nameText" :class="{'is-disabled':!openSearch}" @click="searchTutor(clearHighlight(tutor))" v-html="tutor && tutor.title?tutor.title:tutor"></span><template v-else><span class="AuthorInfo__nameText" :class="{'is-disabled':!openSearch}" @click="searchTutor(clearHighlight(tutor))" v-html="tutor && tutor.title?tutor.title:tutor"></span><span class="ContentItem__comma">, </span></template></span></span>
        </div>
      </div>
    </template>
    <template v-else-if="readable.type === TYPE_PATENT && !isArrayEmpty(readable.inventor)">
      <div class="ContentItem__author AuthorInfo" :class="{'is-disabled':readable.is_inventor_disabled}">
        <div class="AuthorInfo__content">
          <template v-if="readable.patent_type === '外观设计' || readable.patent_type === '美国外观设计'">
            <span class="AuthorInfo__name ContentItem__label">{{t('custom.readableItem.设计人')}}:</span>
          </template>
          <template v-if="!(readable.patent_type === '外观设计' || readable.patent_type === '美国外观设计')">
            <span class="AuthorInfo__name ContentItem__label">{{t('custom.readableItem.发明人')}}:</span>
          </template>
          <template v-if="!readable.show_all_author">
            <template v-if="readable.inventor.length <= 6">
              <span v-for="(inventor, index) in readable.inventor" :key="inventor" class="AuthorInfo__name">
                <span class="AuthorInfo__nameText" :class="{'is-disabled':!openSearch}" v-if="index === readable.inventor.length - 1" v-html="inventor" @click="searchInventor(clearHighlight(inventor))"></span>
                <template v-else>
                  <span class="AuthorInfo__nameText" :class="{'is-disabled':!openSearch}" v-html="inventor" @click="searchInventor(clearHighlight(inventor))"></span>
                  <span class="ContentItem__comma">,</span>
                </template>
              </span>
            </template>
            <template v-if="readable.inventor.length > 6">
              <span v-for="(inventor, index) in readable.inventor" :key="inventor" class="AuthorInfo__name" v-if="index < 5">
                    <span class="AuthorInfo__nameText" :class="{'is-disabled':!openSearch}" v-if="index === 4" v-html="inventor" @click="searchInventor(clearHighlight(inventor))"></span>
                    <template v-else>
                      <span class="AuthorInfo__nameText" :class="{'is-disabled':!openSearch}" v-html="inventor" @click="searchInventor(clearHighlight(inventor))"></span>
                      <span class="ContentItem__comma">,</span>
                    </template>
                  </span>
              <span class="AuthorInfo__extra" @click="showAllAuthor">···</span>
              <span class="AuthorInfo__name">
                  <span class="AuthorInfo__nameText" v-html="readable.inventor[readable.inventor.length - 1]" @click="searchInventor(clearHighlight(readable.inventor[readable.inventor.length - 1]))"></span>
                </span>
            </template>
          </template>
          <template v-if="readable.show_all_author">
            <span v-for="(inventor, index) in readable.inventor" :key="inventor" class="AuthorInfo__name">
              <span class="AuthorInfo__nameText" :class="{'is-disabled':!openSearch}" v-if="index === readable.inventor.length - 1" v-html="inventor" @click="searchInventor(clearHighlight(inventor))"></span>
              <template v-else>
                <span class="AuthorInfo__nameText" :class="{'is-disabled':!openSearch}" v-html="inventor" @click="searchInventor(clearHighlight(inventor))"></span>
                <span class="ContentItem__comma">,</span>
              </template>
            </span>
          </template>
        </div>
      </div>
    </template>
    <template v-else-if="readable.type === TYPE_PATENT && !isArrayEmpty(readable.applicant)">
      <div class="ContentItem__meta">
        <div class="ContentItem__author AuthorInfo" :class="{'is-disabled':readable.is_applicant_disabled}">
          <div class="AuthorInfo__content">
            <span class="AuthorInfo__name ContentItem__label">{{t('custom.readableItem.申请人')}}:</span>
            <span v-for="(applicant, index) in readable.applicant" :key="applicant+index" class="AuthorInfo__name">
              <span class="AuthorInfo__nameText" :class="{'is-disabled':!openSearch}" v-if="index === readable.applicant.length - 1" v-html="applicant" @click="searchApplicant(clearHighlight(applicant))"></span>
              <template v-else>
                <span class="AuthorInfo__nameText" :class="{'is-disabled':!openSearch}" v-html="applicant" @click="searchApplicant(clearHighlight(applicant))"></span>
                <span class="ContentItem__comma">,</span>
              </template>
            </span>
          </div>
        </div>
      </div>
    </template>
    <template v-else-if="!isArrayEmpty(readable.author)">
      <div class="ContentItem__author AuthorInfo">
        <base-tooltip :content="'共 ' + readable.author.length + ' 位' + authorLabel" placement="right">
          <i class="base-icon-s-custom"></i>
        </base-tooltip>
        <div class="AuthorInfo__content">
          <template v-if="!readable.show_all_author">
            <template v-if="readable.author.length <= 6">
              <span v-for="(author, index) in readable.author" :key="readable.type+index+author" class="AuthorInfo__name">
                <hover-card v-if="index === readable.author.length - 1" :uid="authorHover && readable.author_id[index]" @skip="handleSkip" @follow="handleFollow" @disfollow="handleDisfollow">
                  <span class="AuthorInfo__nameText" :class="{'is-disabled':!openSearch && !(authorHover && readable.author_id[index])}" v-html="author" @click="searchAuthor(clearHighlight(author))"></span>
                </hover-card>
                <template v-else>
                  <hover-card :uid="authorHover && readable.author_id[index]" @skip="handleSkip" @follow="handleFollow" @disfollow="handleDisfollow">
                    <span class="AuthorInfo__nameText" :class="{'is-disabled':!openSearch && !(authorHover && readable.author_id[index])}" v-html="author" @click="searchAuthor(clearHighlight(author))"></span>
                  </hover-card>
                  <span class="ContentItem__comma">,</span>
                </template>
              </span>
            </template>
            <template v-if="readable.author.length > 6">
              <span v-for="(author, index) in readable.author" :key="readable.type+index+author" class="AuthorInfo__name" v-if="index < 5">
                    <hover-card v-if="index === 4" :uid="authorHover && readable.author_id[index]" @skip="handleSkip" @follow="handleFollow" @disfollow="handleDisfollow">
                      <span class="AuthorInfo__nameText" :class="{'is-disabled':!openSearch && !(authorHover && readable.author_id[index])}" v-if="index === 4" v-html="author" @click="searchAuthor(clearHighlight(author))"></span>
                    </hover-card>
                    <template v-else>
                      <hover-card :uid="authorHover && readable.author_id[index]" @skip="handleSkip" @follow="handleFollow" @disfollow="handleDisfollow">
                        <span class="AuthorInfo__nameText" :class="{'is-disabled':!openSearch && !(authorHover && readable.author_id[index])}" v-html="author" @click="searchAuthor(clearHighlight(author))"></span>
                      </hover-card>
                      <span class="ContentItem__comma">,</span>
                    </template>
                  </span>
              <base-tooltip :content="t('custom.readableItem.展开更多作者')" placement="top">
                <span class="AuthorInfo__extra" @click="showAllAuthor">···</span>
              </base-tooltip>
              <span class="AuthorInfo__name">
                <hover-card :uid="authorHover && readable.author_id[readable.author.length - 1]" @skip="handleSkip" @follow="handleFollow" @disfollow="handleDisfollow">
                  <span class="AuthorInfo__nameText" :class="{'is-disabled':!openSearch && !(authorHover && readable.author_id[readable.author.length - 1])}" v-html="readable.author[readable.author.length - 1]" @click="searchAuthor(clearHighlight(readable.author[readable.author.length - 1]))"></span>
                </hover-card>
                </span>
            </template>
          </template>
          <template v-if="readable.show_all_author">
            <span v-for="(author, index) in readable.author" :key="author" class="AuthorInfo__name">
              <hover-card v-if="index === readable.author.length - 1" :uid="authorHover && readable.author_id[index]" @skip="handleSkip" @follow="handleFollow" @disfollow="handleDisfollow">
                <span class="AuthorInfo__nameText" :class="{'is-disabled':!openSearch && !(authorHover && readable.author_id[index])}" v-html="author" @click="searchAuthor(clearHighlight(author))"></span>
              </hover-card>
              <template v-else>
                <hover-card :uid="authorHover && readable.author_id[index]" @skip="handleSkip" @follow="handleFollow" @disfollow="handleDisfollow">
                  <span class="AuthorInfo__nameText" :class="{'is-disabled':!openSearch && !(authorHover && readable.author_id[index])}" v-html="author" @click="searchAuthor(clearHighlight(author))"></span>
                </hover-card>
                <span>,</span>
              </template>
            </span>
          </template>
        </div>
      </div>
    </template>
    <div v-if="readable.type === TYPE_ARTICLE && (readable.year || readable.publish_year) && readable.article_type !== '学位论文' && readable.article_type !== '预发布论文'" class="ContentItem__meta">
      <span v-if="isChineseReadable" class="ContentItem__source">
        <span class="ContentItem__metaSource" :class="{'is-disabled':!openSearch}" v-if="readable.source" style="margin-left: -6px" @click="searchSource(clearHighlight(readable.source))">《<span v-html="readable.source"></span>》</span>
        <span v-if="!hidden && !isArrayEmpty(readable.collections)" v-for="(item,index) in readable.collections" :key="item" class="Keyword" :class="[{'is-last':index===readable.collections.length-1},{'is-first':index===0}]">{{item}}</span>
        <span v-if="(readable.year || readable.publish_year) && readable.issue">{{ (readable.year || readable.publish_year)+' 年'}}<template v-if="readable.issue">{{ '第 '+readable.issue+' 期' }}</template></span>
        <span v-if="(readable.year || readable.publish_year) && !readable.issue">{{ (readable.year || readable.publish_year)+' 年'}}<template v-if="readable.volume">{{ '第 '+readable.volume+' 卷' }}</template></span>
        <span v-if="readable.first_page && readable.last_page">{{ readable.first_page +' - '+ readable.last_page}}</span>
        <span v-if="((readable.first_page && !readable.last_page) || (!readable.first_page && readable.last_page)) && readable.article_type !== '学位论文'">{{ '页码 ' + (readable.first_page?readable.first_page:readable.last_page)}}</span>
        <span v-if="totalPages > 0">{{ ', 共 '+totalPages+' 页' }}</span>
      </span>
      <span v-if="!isChineseReadable" class="ContentItem__source">
        <span class="ContentItem__metaSource" :class="{'is-disabled':!openSearch}" v-if="readable.source" style="margin-left: -6px" @click="searchSource(clearHighlight(readable.source))">《<span v-html="readable.source"></span>》</span>
        <span v-if="!hidden && !isArrayEmpty(readable.collections)" v-for="(item,index) in readable.collections" :key="item" class="Keyword" :class="[{'is-last':index===readable.collections.length-1},{'is-first':index===0}]">{{item}}</span>
        <span v-if="(readable.year || readable.publish_year) && readable.volume">{{ (readable.year || readable.publish_year)}}<template v-if="readable.volume">{{ ' , Volume '+readable.volume}}</template></span>
        <span v-if="(readable.year || readable.publish_year) && !readable.volume">{{ (readable.year || readable.publish_year)}}<template v-if="readable.issue">{{ ' , Issue '+readable.issue}}</template></span>
        <span v-if="readable.first_page && readable.last_page">{{', Pages ' + readable.first_page +' - '+ readable.last_page}}</span>
        <span v-if="((readable.first_page && !readable.last_page) || (!readable.first_page && readable.last_page)) && readable.article_type !== '学位论文'">{{ ', Article ' + (readable.first_page?readable.first_page:readable.last_page)}}</span>
      </span>
    </div>
    <div v-if="readable.type === TYPE_ARTICLE && (readable.graduation_institution || readable.tutor || readable.school || readable.year) && readable.article_type === '学位论文'" class="ContentItem__meta">
      <span class="ContentItem__source">
        <span v-if="(readable.year || readable.publish_year)">
           <span class="ContentItem__label">{{t('custom.readableItem.学位授予时间')}}:</span>
           {{((readable.year || readable.publish_year) + '').trim()}}
         </span>
        <span v-if="(!isArrayEmpty(readable.graduation_institution) || !isArrayEmpty(readable.training_institution)) && (readable.year || readable.publish_year)" class="ContentItem__comma">,</span>
        <span v-if="!isArrayEmpty(readable.graduation_institution)  || !isArrayEmpty(readable.training_institution)">
           <span class="ContentItem__label">{{t('custom.readableItem.学位授予单位')}}:</span>
           <span v-if="!isArrayEmpty(readable.graduation_institution)" v-for="(graduation, index) in readable.graduation_institution" :key="graduation+index"><span v-if="index === readable.graduation_institution.length - 1" class="AuthorInfo__nameText" :class="{'is-disabled':!openSearch}" @click="searchGraduation(clearHighlight(graduation))" v-html="graduation"></span><template v-else><span class="AuthorInfo__nameText" @click="searchGraduation(clearHighlight(graduation))" v-html="graduation"></span><span class="ContentItem__comma">, </span></template></span>
           <span v-if="!isArrayEmpty(readable.training_institution)"  v-for="(graduation, index) in readable.training_institution" :key="graduation+index"><span v-if="index === readable.training_institution.length - 1" class="AuthorInfo__nameText" :class="{'is-disabled':!openSearch}" @click="searchGraduation(clearHighlight(graduation))" v-html="graduation.title"></span><template v-else><span class="AuthorInfo__nameText" @click="searchGraduation(clearHighlight(graduation))" v-html="graduation.title"></span><span class="ContentItem__comma">, </span></template></span>
         </span>
        <span v-if="((readable.year || readable.publish_year) || (!isArrayEmpty(readable.graduation_institution)  || !isArrayEmpty(readable.training_institution))) && !isArrayEmpty(readable.school)" class="ContentItem__comma">,</span>
        <span v-if="!isArrayEmpty(readable.school)">
           <span class="ContentItem__label">{{t('custom.readableItem.培养单位')}}:</span>
           <span v-for="(school, index) in readable.school" :key="school+index"><span v-if="index === readable.school.length - 1" class="AuthorInfo__nameText" :class="{'is-disabled':!openSearch}" @click="searchSchool(clearHighlight(school))" v-html="school && school.title?school.title:school"></span><template v-else><span class="AuthorInfo__nameText" @click="searchSchool(clearHighlight(school))" v-html="school && school.title?school.title:school"></span><span class="ContentItem__comma">, </span></template></span>
         </span>
      </span>
    </div>
    <div v-if="readable.type === TYPE_ARTICLE && (readable.source || (readable.year || readable.publish_year)) && readable.article_type === '预发布论文'" class="ContentItem__meta">
      <span class="ContentItem__source">
        <span v-if="readable.source">
          <span class="ContentItem__label">{{t('custom.readableItem.来源预印本平台')}}:</span>
          <span class="AuthorInfo__nameText" :class="{'is-disabled':!openSearch}" @click="searchSource(clearHighlight(readable.source))" v-html="readable.source"></span>
        </span>
        <span v-if="(readable.year || readable.publish_year) && readable.source" class="ContentItem__comma">,</span>
        <span v-if="(readable.year || readable.publish_year)">
          <span class="ContentItem__label">{{t('custom.readableItem.提交时间')}}:</span>
          {{(readable.year || readable.publish_year)}}
        </span>
      </span>
    </div>
    <div v-if="readable.type === TYPE_PATENT && readable.apply_date" class="ContentItem__meta">
      <span class="ContentItem__source">
        <span v-if="readable.apply_date">
          <span class="ContentItem__label">{{t('custom.readableItem.申请日')}}:</span>
          <span>{{formatPatentDate(readable.apply_date)}}</span>
        </span>
        <span v-if="readable.apply_number && readable.apply_date" class="ContentItem__comma">,</span>
        <span v-if="readable.apply_number">
          <span class="ContentItem__label">{{t('custom.readableItem.申请号')}}:</span>
          <span v-html="readable.apply_number"></span>
        </span>
      </span>
    </div>
    <div v-if="readable.type === TYPE_ARTICLE && readable.conference && readable.conference !== '不详' && readable.article_type === '会议论文'" class="ContentItem__meta">
      <span class="ContentItem__source">
        <span class="ContentItem__label">{{t('custom.readableItem.会议名称')}}:</span>
        <span class="AuthorInfo__nameText" :class="{'is-disabled':!openSearch}" @click="searchConference(clearHighlight(readable.conference))" v-html="readable.conference"></span>
      </span>
    </div>
    <template v-if="readable.type === TYPE_REPORT">
      <div class="ContentItem__meta" v-if="!isArrayEmpty(readable.author) || !isArrayEmpty(readable.institution)">
        <div class="ContentItem__author AuthorInfo">
          <div class="AuthorInfo__content">
            <span class="AuthorInfo__name ContentItem__label">{{t('custom.readableItem.编译者')}}:</span>
            <template v-if="!readable.show_all_author">
              <template v-if="readable.author.length <= 3">
              <span v-for="(author, index) in readable.author" :key="author" class="AuthorInfo__name">
                <span class="AuthorInfo__nameText" :class="{'is-disabled':!openSearch}" v-if="index === readable.author.length - 1" v-html="author" @click="searchAuthor(clearHighlight(author))"></span>
                <template v-else>
                  <span class="AuthorInfo__nameText" :class="{'is-disabled':!openSearch}" v-html="author" @click="searchAuthor(clearHighlight(author))"></span>
                  <span>,</span>
                </template>
              </span>
              </template>
              <template v-if="readable.author.length > 3">
            <span v-for="(author, index) in readable.author" :key="author" class="AuthorInfo__name" v-if="index < 2">
              <span class="AuthorInfo__nameText" :class="{'is-disabled':!openSearch}" v-if="index === 1" v-html="author" @click="searchAuthor(clearHighlight(author))"></span>
              <template v-else>
                <span class="AuthorInfo__nameText" :class="{'is-disabled':!openSearch}" v-html="author" @click="searchAuthor(clearHighlight(author))"></span>
                <span>,</span>
              </template>
            </span>
                <span class="AuthorInfo__extra" @click="showAllAuthor">···</span>
                <span class="AuthorInfo__name">
              <span class="AuthorInfo__nameText" :class="{'is-disabled':!openSearch}" v-html="readable.author[readable.author.length - 1]" @click="searchAuthor(clearHighlight(author))"></span>
            </span>
              </template>
            </template>
            <template v-if="readable.show_all_author">
            <span v-for="(author, index) in readable.author" :key="author" class="AuthorInfo__name">
              <span class="AuthorInfo__nameText" :class="{'is-disabled':!openSearch}" v-if="index === readable.author.length - 1" v-html="author" @click="searchAuthor(clearHighlight(author))"></span>
              <template v-else>
                <span class="AuthorInfo__nameText" :class="{'is-disabled':!openSearch}" v-html="author" @click="searchAuthor(clearHighlight(author))"></span>
                <span>,</span>
              </template>
            </span>
            </template>
          </div>
        </div>
      </div>
    </template>
    <div v-if="readable.type === TYPE_REPORT && readable.date" class="ContentItem__meta">
      <span class="ContentItem__source">
        <span v-if="readable.date" class="ContentItem__label">{{t('custom.readableItem.发布时间')}}:</span>
        <span v-if="readable.date">{{readable.date}}</span>
        <span v-if="readable.date && readable.serverName" class="ContentItem__comma">,</span>
        <span v-if="readable.serverName" class="ContentItem__label">{{t('custom.readableItem.所属服务')}}:</span>
        <span v-if="readable.serverName">{{readable.serverName}}</span>
        <span v-if="(readable.date || readable.serverName) && !isArrayEmpty(readable.subjects)" class="ContentItem__comma">,</span>
        <span v-if="!isArrayEmpty(readable.subjects)" class="ContentItem__label">{{t('custom.readableItem.服务领域')}}:</span>
        <span v-if="!isArrayEmpty(readable.subjects)" class="AuthorInfo__nameText" :class="{'is-disabled':!openSearch}" @click="searchSubject(clearHighlight(readable.subjects[0]))" v-html="readable.subjects[0]"></span>
      </span>
    </div>
    <div v-if="readable.type === TYPE_SOFTWARE && readable.date" class="ContentItem__meta">
      <span class="ContentItem__source">
        <span v-if="readable.date" class="ContentItem__label">{{t('custom.readableItem.发证时间')}}:</span>
        <span v-if="readable.date">{{readable.date}}</span>
        <span v-if="readable.date && readable.publish_date" class="ContentItem__comma">,</span>
        <span v-if="readable.publish_date" class="ContentItem__label">{{t('custom.readableItem.首次发表时间')}}:</span>
        <span v-if="readable.publish_date">{{readable.publish_date}}</span>
        <span v-if="(readable.date || readable.serverName) && !isArrayEmpty(readable.subjects)" class="ContentItem__comma">,</span>
        <span v-if="!isArrayEmpty(readable.subjects)" class="ContentItem__label">{{t('custom.readableItem.服务领域')}}:</span>
        <span v-if="!isArrayEmpty(readable.subjects)" class="AuthorInfo__nameText" :class="{'is-disabled':!openSearch}" @click="searchSubject(clearHighlight(readable.subjects[0]))" v-html="readable.subjects[0]"></span>
      </span>
    </div>
    <div v-if="readable.type === TYPE_REPORT && readable.journal" class="ContentItem__meta">
      <span class="ContentItem__source">
        <span v-if="readable.journal" class="ContentItem__label">{{t('custom.readableItem.所属快报产品')}}:</span>
        <span v-if="readable.journal">《<span :class="{'is-disabled':!openSearch}" @click="searchSource(clearHighlight(readable.journal))" class="AuthorInfo__nameText" v-html="readable.journal"></span>》</span>
        <span v-if="readable.date && readable.date.substring(0, 4)">{{ readable.date.substring(0, 4) }} 年</span><span v-if="readable.issue">第 {{readable.issue}} 期</span>
      </span>
    </div>
    <!-- <template v-if="readable.type === TYPE_PROJECT">
      <div class="ContentItem__meta" v-if="!isArrayEmpty(readable.author)">
        <div class="ContentItem__author AuthorInfo BookAuthor">
          <i class="base-icon-s-custom"></i>
          <div v-if="!isArrayEmpty(readable.author)" class="AuthorInfo__content">
            <span  v-for="(author, index) in readable.author" :key="readable.type+author" class="AuthorInfo__name">
                <span class="AuthorInfo__nameText" :class="{'is-disabled':!openSearch}" v-if="index === readable.author.length - 1" v-html="author"  @click="searchAuthor(clearHighlight(author))"></span>
                <template v-else>
                  <span class="AuthorInfo__nameText" :class="{'is-disabled':!openSearch}" v-html="author"  @click="searchAuthor(clearHighlight(author))"></span>
                  <span>,</span>
                </template>
              </span>
          </div>
        </div>
      </div>
    </template> -->
    <div v-if="readable.type === TYPE_SCIENCE_DB && readable.date" class="ContentItem__meta">
      <span class="ContentItem__source">
         <span class="ContentItem__label">{{t('custom.readableItem.发布日期')}}:</span>
        <span>{{readable.date}}</span>
      </span>
      <span v-if="1!==1 && !isArrayEmpty(readable.institution) && readable.date" class="ContentItem__comma">,</span>
      <span v-if="1!==1 && !isArrayEmpty(readable.institution)">
          <span class="ContentItem__source">{{t('custom.readableItem.数据中心') + '：'+readable.institution.join(",")}}</span>
        </span>
    </div>
    <template v-if="1!==1 && readable.type === TYPE_SCIENCE_DB">
      <div class="ContentItem__meta" v-if="!isArrayEmpty(readable.providers)">
        <div class="ContentItem__author AuthorInfo">
          <span class="AuthorInfo__name">{{t('custom.readableItem.提交机构')}}:</span>
          <span v-for="(provider, index) in readable.providers" :key="provider+index" class="AuthorInfo__name">
            <span class="AuthorInfo__nameText" :class="{'is-disabled':!openSearch}" v-if="index === readable.providers.length - 1" v-html="provider" @click="searchProvider(clearHighlight(provider))"></span>
            <template v-else>
              <span class="AuthorInfo__nameText" :class="{'is-disabled':!openSearch}" v-html="provider" @click="searchProvider(clearHighlight(provider))"></span>
              <span>,</span>
            </template>
          </span>
        </div>
      </div>
    </template>
    <div v-if="readable.type === TYPE_BOOK && readable.year" class="ContentItem__meta">
      <span class="ContentItem__source">
        <span v-if="readable.year" class="ContentItem__label">{{t('custom.readableItem.出版年')}}:</span>
        <span v-if="readable.year">{{readable.year}}</span>
        <span v-if="readable.year && readable.publisher" class="ContentItem__comma">,</span>
        <span v-if="readable.publisher" class="ContentItem__label">{{t('custom.readableItem.出版社')}}:</span>
        <span v-if="readable.publisher" v-html="readable.publisher"></span>
        <span v-if="(readable.year || readable.publisher) && readable.isbn" class="ContentItem__comma">,</span>
        <span v-if="readable.isbn" class="ContentItem__label">ISBN:</span>
        <span v-if="readable.isbn" v-html="readable.isbn"></span>
      </span>
    </div>
    <template v-if="readable.type === TYPE_PROJECT">
      <div class="ContentItem__meta">
        <span class="ContentItem__source">
          <span v-if="readable.start_date">{{ t('custom.readableItem.开始时间') + '：'+readable.start_date}}</span>
          <span v-if="readable.start_date && readable.end_date">,</span>
          <span v-if="readable.end_date">{{ t('custom.readableItem.结束时间') + '：'+readable.end_date}}</span>
        </span>
      </div>
      <div class="ContentItem__meta">
        <span class="ContentItem__source">
          <span v-if="readable.funding_institution">{{ t('custom.readableItem.资助机构') + '：'+readable.funding_institution}}</span>
          <span v-if="readable.funding_institution && readable.undertaking_institution">,</span>
          <span v-if="readable.undertaking_institution">{{ t('custom.readableItem.承担机构') + '：'+readable.undertaking_institution}}</span>
        </span>
      </div>
    </template>
    <div v-if="readable.type === TYPE_SCIENCE_DB && readable.license" class="ContentItem__meta">
      <span class="ContentItem__source">
        <span v-if="readable.license" class="ContentItem__label">{{t('custom.readableItem.使用许可协议')}}:</span>
        <span v-if="readable.license">{{readable.license}}</span>
        <span v-if="(readable.license) && !isArrayEmpty(readable.subject)" class="ContentItem__comma">,</span>
        <span v-if="!isArrayEmpty(readable.subject)" class="ContentItem__label">{{t('custom.readableItem.学科领域')}}:</span>
        <span v-if="!isArrayEmpty(readable.subject)" class="AuthorInfo__nameText" :class="{'is-disabled':!openSearch}" @click="searchSubject(clearHighlight(readable.subject))" v-html="readable.subject.join(';')"></span>
      </span>
    </div>
    <div v-if="readable.type === TYPE_AWARD && readable.date" class="ContentItem__meta">
      <span class="ContentItem__source">
        <span v-if="readable.date" class="ContentItem__label">{{t('custom.readableItem.获奖时间')}}:</span>
        <span v-if="readable.date">{{readable.date}}</span>
        <span v-if="(readable.date) && !isArrayEmpty(readable.award_level)" class="ContentItem__comma">,</span>
        <span v-if="!isArrayEmpty(readable.award_level)" class="ContentItem__label">{{t('custom.readableItem.获奖级别')}}:</span>
        <span v-if="!isArrayEmpty(readable.award_level)" class="AuthorInfo__nameText" v-html="readable.award_level"></span>
        <span v-if="(readable.date || readable.award_level) && !isArrayEmpty(readable.award_rank)" class="ContentItem__comma">,</span>
        <span v-if="!isArrayEmpty(readable.award_rank)" class="ContentItem__label">{{t('custom.readableItem.获奖等级')}}:</span>
        <span v-if="!isArrayEmpty(readable.award_rank)" class="AuthorInfo__nameText" v-html="readable.award_rank"></span>
      </span>
    </div>

    <div class="ContentItem__abstracts" v-if="readable.abstracts">
      <div class="RichContent" :class="{ 'is-collapsed': isCollapsed }">
        <div class="RichContent__inner" @click.stop="handleMore">
          <span class="RichText" v-html="abstracts"></span>
          <template v-if="isCollapsed">
            <base-button v-if="showAbstractsAbbreviation" type="text" class="ContentItem__more">{{t('custom.readableItem.阅读全部')}} <i class="base-icon-arrow-down"></i></base-button>
            <base-button v-else type="text" class="ContentItem__less" @click.stop="handLess">{{t('custom.readableItem.收起')}} <i class="base-icon-arrow-up"></i></base-button>
          </template>
        </div>
      </div>
    </div>
    <div class="TranslateContent" v-if="readable.abstracts_translated">
        <div class="RichContent">
          <div class="RichContent__inner">
            <span class="RichText">{{readable.abstracts_translated}}</span>
          </div>
        </div>
        <div class="TranslateSupport">
          {{t('custom.readableItem.机器翻译由')}}<svg t="1685325678764" class="Icon" viewBox="0 0 1199 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1668" width="16" height="16"><path d="M599.010743 585.142857L380.342857 254.741943c6.612114-7.021714 13.253486-13.897143 19.894857-20.6848L614.4 557.8752c-4.681143 8.484571-9.801143 17.6128-15.389257 27.267657M1169.378743 189.586286c10.8544-2.925714 4.008229-1.667657 30.164114-8.016457-42.1888-8.6016-298.656914 3.8912-494.533486 257.2288l-172.587885-255.912229h-66.823315l205.2096 303.572114c-5.149257 7.811657-10.327771 15.652571-15.36 23.815315a197.514971 197.514971 0 0 0-3.364571 5.705142L430.6944 189.674057C558.226286 71.124114 673.616457 0 673.616457 0c-16.764343 9.450057-32.9728 19.017143-48.917943 28.554971-88.590629 51.024457-165.6832 102.8096-232.535771 154.331429H359.277714l11.410286 16.822857c-7.957943 6.3488-15.798857 12.6976-23.434971 19.017143l-24.3712-35.84H256.087771l48.9472 71.972571c-149.328457 132.593371-233.442743 260.154514-272.764342 364.631772-46.138514 122.411886-31.217371 201.757257-24.693029 225.865143 9.947429 36.864 27.999086 66.121143 49.5616 90.258285 109.3632 122.821486 297.749943 96.256 444.357486 47.9232 128.234057-40.842971 230.458514-103.541029 230.458514-103.541028-271.506286 137.801143-549.888 174.109257-623.586743-45.962972-0.760686-2.2528-1.609143-4.5056-2.135771-6.846171-7.811657-34.757486-9.303771-73.201371 1.082514-127.7952 29.344914-154.185143 121.329371-294.063543 222.851657-407.552l243.360914 357.814857c-74.166857 110.650514-197.719771 249.709714-382.595657 287.685486 0 0 318.142171 27.794286 506.528915-227.415772l153.365942 227.415772h66.794058l-187.333486-277.152914c3.013486-5.149257 5.997714-10.357029 8.923428-15.711086 1.960229-3.598629 4.447086-8.016457 7.168-12.873143l207.4624 305.737143h66.823315l-243.419429-358.341486c5.822171-9.508571 12.141714-19.6608 18.900114-30.3104l264.192 388.651886h66.794058L828.942629 498.980571c83.031771-121.534171 209.627429-274.139429 340.436114-309.423542" fill="#0294AD" p-id="1669"></path></svg>科大讯飞 提供技术支持
        </div>
      </div>
    <div class="ContentItem__keywords" v-if="!isArrayEmpty(keywords)">
      <span class="Keywords">
        <span class="MetaText">{{t('custom.readableItem.关键词')}}：</span>
        <template v-if="readable.show_all_keywords">
           <span class="Keyword" :class="{'is-disabled':!openSearch}" v-for="(item, index) in keywords" :key="item + index" v-html="item" @click="searchKeyword(clearHighlight(item))"></span>
        </template>
        <template v-if="!readable.show_all_keywords">
          <span class="Keyword" :class="{'is-disabled':!openSearch}" v-for="(item, index) in keywords" v-if="index < (isChineseReadable ? 5 : 4)" :key="item + index" v-html="item" @click="searchKeyword(clearHighlight(item))"></span>
          <base-tooltip :content="t('custom.readableItem.展开更多关键词')" placement="top">
            <span class="KeywordMore" v-if="keywords.length > (isChineseReadable ? 5 : 4)" @click="showAllKeyword">···</span>
          </base-tooltip>
        </template>
      </span>
    </div>
    <div v-if="!isArrayEmpty(links) && !editable && readable.type === TYPE_ARTICLE">
      <div class="ContentItem__links">
        <span class="MetaText"><i v-if="1!==1" class="base-icon-s-promotion"></i>{{t('custom.readableItem.原文链接')}}：</span>
        <a :href="item.url" target="_blank" @click="goToDownload(item)" class="ContentItem__link" v-for="(item, index) in links" :key="index">
          <span v-if="item.is_open_access" class="ContentItem__linkDot"></span>
          <img class="ContentItem__linkLogo" v-if="item.logo" :src="item.logo">
          <span>{{item.name}}</span>
        </a>
      </div>
    </div>
    <div v-if="!isArrayEmpty(links) && !editable && readable.type !== TYPE_ARTICLE">
      <div class="ContentItem__links">
        <a :href="item.url" target="_blank" @click="goToDownload(item)" class="ContentItem__link" v-for="(item, index) in links" :key="index">
          <span v-if="item.is_open_access" class="ContentItem__linkDot"></span>
          <img class="ContentItem__linkLogo" v-if="item.logo" :src="item.logo">
          <span>{{item.name}}</span>
        </a>
      </div>
    </div>
    <div v-if="!isArrayEmpty(readable.local_links) && !editable && readable.type === TYPE_PATENT">
      <div class="ContentItem__links">
        <a :href="readable.local_links[0]" @click="saveDownloadLog" target="_blank" class="ContentItem__link">
          <img class="ContentItem__linkLogo" src="../../../static/app-pdf.png">
          <span>{{t('custom.readableItem.原文下载')}}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import BaseTooltip from '../../base/ui/tooltip/tooltip'
import BaseButton from '../../base/ui/button/Button'
import BaseTag from '../../base/ui/tag/Tag'
import {IsNumber,isArrayEmpty,HasChinese,clearHighlight} from '../../../util'
// import {SaveCount, UpDownload, Log} from '../../service/explore'
import appPdf from '../../../static/app-pdf.png?assets'
import {TYPE_ARTICLE,TYPE_PATENT,TYPE_REPORT,TYPE_SCIENCE_DB,TYPE_BOOK,TYPE_SOFTWARE,TYPE_AWARD,TYPE_PROJECT,TYPE_CHINAXIV} from '../../../constant/index'
import Locale from '../../base/ui/mixin/locale'
import HoverCard from '../hovercard/HoverCard.vue'
export default {
  name: 'ReadableItem',
  components: {BaseTag, BaseButton, BaseTooltip, HoverCard },
  mixins:[Locale],
  data () {
    return {
      TYPE_ARTICLE,TYPE_PATENT,TYPE_REPORT,TYPE_SCIENCE_DB,TYPE_BOOK,TYPE_SOFTWARE,TYPE_AWARD,TYPE_PROJECT,TYPE_CHINAXIV,
      showAbstractsAbbreviation: true,
      hidden: true
    }
  },
  props: {
    readable: Object,
    editable: Boolean,
    showCPC: Boolean,
    authorHover: Boolean,
    openSearch:Boolean
  },
  computed: {
    authorLabel () {
      switch (this.readable.type) {
        case TYPE_PATENT:
          return '发明人'
        case TYPE_REPORT:
          return '编译者'
        default:
          return '作者'
      }
    },
    isChineseReadable () {
      return HasChinese(this.readable.title)
    },
    isCollapsed () {
      return this.readable.abstracts_abbreviation
    },
    abstracts () {
      if (this.isCollapsed) {
        if (this.showAbstractsAbbreviation) {
          return this.readable.abstracts_abbreviation_highlight ? this.readable.abstracts_abbreviation_highlight : this.readable.abstracts_abbreviation
        } else {
          return this.readable.abstracts_highlight ? this.readable.abstracts_highlight : this.readable.abstracts
        }
      } else {
        return this.readable.abstracts_highlight ? this.readable.abstracts_highlight : this.readable.abstracts
      }
    },
    keywords () {
      let keywords = this.readable.keyword || this.readable.keywords || []
      if (!isArrayEmpty(keywords)) {
       return keywords.filter(keyword => {
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
      if (!isArrayEmpty(this.readable.links)) {
        if (this.readable.article_type === '学位论文') {
          return this.readable.links.filter(link => {
            return link.name === '中国科学院学位论文数据库'
          })
        }
        if (!isArrayEmpty(this.readable.local_links) && this.readable.type === TYPE_ARTICLE)  {
          this.readable.links.unshift({
            name: '原文下载',
            url: this.readable.local_links[0],
            logo: appPdf
          })
        }
        return this.readable.links
      } else {
        if (this.readable.link) {
          if (this.readable.type === TYPE_SCIENCE_DB) {
            return [{
              name: '原文链接',
              url: this.readable.link
          }]
          } if (this.readable.type === TYPE_BOOK) {
            return [{
              name: '原文链接',
              url: this.readable.link
            }]
          } if (this.readable.type === TYPE_REPORT) {
            let links = [{
              name: '原文链接',
              url: this.readable.link
            }]
            if (this.readable.download_url) {
              links.unshift({
                name: '原文下载',
                logo: appPdf,
                url: this.readable.download_url
              })
            }
            return links
          } else {
            return [{
              name: '全文获取',
              url: this.readable.link
            }]
          }
        }
      }
      return []
    },
    isOpenAccess () {
      for (let i = 0; i < this.links.length; i++) {
        let link = this.links[i]
        let isOpenUrl = link.name === 'DOAJ'
          || link.name === 'Springer-BMC'
          || link.name === 'GoOA'
        if (isOpenUrl) {
          return true
        }
      }
      return false
    }
  },
  methods: {
    handleSkip(type,scholar){
      this.$emit('skip',type,scholar)
    },
    handleFollow(scholar){
      this.$emit('follow',scholar)
    },
    handleDisFollow(scholar){
      this.$emit('disfollow',scholar)
    },
    isArrayEmpty,
    clearHighlight,
    handleMore () {
      this.showAbstractsAbbreviation = false
    },
    handLess () {
      this.showAbstractsAbbreviation = true
    },
    showAllAuthor () {
      this.readable.show_all_author = true
      this.$forceUpdate()
    },
    showAllKeyword () {
      this.readable.show_all_keywords = true
      this.$forceUpdate()
    },
    searchAuthor (author) {
      this.$emit('search-author', author, this.readable.type)
    },
    searchTutor (tutor) {
      this.$emit('search-tutor', tutor, this.readable.type)
    },
    searchMajor (major) {
      this.$emit('search-major', major, this.readable.type)
    },
    searchSchool (school) {
      this.$emit('search-school', school, this.readable.type)
    },
    searchGraduation (graduation) {
      this.$emit('search-graduation', graduation, this.readable.type)
    },
    searchInventor (inventor) {
      if (this.readable.is_inventor_disabled) {
        return
      }
      this.$emit('search-inventor', inventor)
    },
    searchProvider (provider) {
      this.$emit('search-provider', provider)
    },
    searchConference (conference) {
      this.$emit('search-conference', conference)
    },
    searchApplicant (applicant) {
      if (this.readable.is_applicant_disabled) {
        return
      }
      this.$emit('search-applicant', applicant)
    },
    searchInstitution (institution) {
      this.$emit('search-institution', institution, this.readable.type)
    },
    searchSource (source) {
      this.$emit('search-source', source, this.readable.type)
    },
    searchSubject (subject) {
      this.$emit('search-subject', subject, this.readable.type)
    },
    searchKeyword (keyword) {
      this.$emit('search-keyword', keyword, this.readable.type)
    },
    goToDetail () {
      this.$emit('title-click')
    },
    formatPatentDate (date) {
      if (!date) {
        return '--'
      }
      if (date.length === 8) {
        return date.substring(0, 4) + '-' + date.substring(4, 6) + '-' + date.substring(6)
      }
      return date
    },
    goToDownload(item){
      if (item.name === '原文下载') {
        this.saveDownloadLog()
      } else {
        let logParams = {
          event_key: 'operation',
          url: location.href,
          user: this.user,
          application: {
            id: this.applicationId,
            name: this.applicationName,
            topic: this.topic,
            topic_id: this.topicId,
            module: this.MODULE_EXPLORE,
          }
        }
        logParams.event_desc = '访问原文链接「' +this.readable.cn_type +'」「' + this.clearHighlight(this.readable.title) + '」「0000105」'
        logParams.event_params = {url: item.url}
        Log(logParams)
      }
    },
    saveDownloadLog(){
      UpDownload(this.readable.id).then(response => {
        this.saveCount(0,response)
      })
      this.saveLog({
        event_desc: '下载全文「' +this.readable.cn_type +'」「' + this.clearHighlight(this.readable.title) + '」「0000111」',
        event_params: {resourceId:this.readable.id, title: this.clearHighlight(this.readable.title)},
        result:null
      },'检索发现')
    },
    saveCount(browse_count, download_count){
      SaveCount(this.readable.type, this.readable.id, this.readable.article_type, browse_count, download_count)
    }
  },
  created(){
    if(isArrayEmpty(this.readable.author_id)){
      this.readable.author_id = []
    }
  },
  mounted () {
    this.readable.show_all_author = false
    this.readable.show_all_keyword = false
    if (!isArrayEmpty(this.readable.keyword)) {
      for (let i = 0; i < this.readable.keyword.length; i++) {
        if (i > 3 && this.readable.keyword[i].indexOf('<span class="Highlight">') !== -1) {
          this.showAllKeyword()
          break
        }
      }
    }
    if (!isArrayEmpty(this.readable.author)) {
      for (let j = 0; j < this.readable.author.length; j++) {
        if (j > 3 && this.readable.author[j].indexOf('<span class="Highlight">') !== -1) {
          this.showAllAuthor()
          break
        }
      }
    }
    if (!isArrayEmpty(this.readable.inventor)) {
      for (let j = 0; j < this.readable.inventor.length; j++) {
        if (j > 3 && this.readable.inventor[j].indexOf('<span class="Highlight">') !== -1) {
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
  .ContentItem__author {
    margin-top: 6px;
    //font-style: italic;
    &.is-disabled {
      .AuthorInfo__nameText {
        cursor: auto;
        &:hover {
          border: none;
          color: $--color-text-regular;
        }
      }
    }
  }
  .MetaText {
    color: $--color-text-secondary;
    font-size: $--font-size-base;
    &.is-en {
      margin-right: 10px;
    }
  }
  .ContentItem__meta {
    margin-top: 8px;
  }
  .ContentItem__titleText {
    margin-right: 10px;
  }
  .ContentItem__status {
    font-size: 14px;
    margin: 0 4px 0 -4px;
    vertical-align: 1px;
  }
  .ContentItem__abstracts {
    margin-top: 10px;
    color: $--color-text-secondary;
  }
  .Keywords {
    display: flex;
    flex-wrap: wrap;
    line-height: 1.7;
  }
  .Keyword {
    font-size: $--font-size-base;
    color: $--color-text-regular;
    cursor: pointer;
    margin-right: 10px;
    transition: all .3s;
    word-break: break-word;
    height: 24px;
    &:hover {
      border-bottom: 1px dotted #444;
      color: $--color-primary;
    }
  }
  .KeywordMore {
    font-size: $--font-size-base;
    color: $--color-text-secondary;
    cursor: pointer;
    &:hover {
      opacity: .8;
    }
  }
  .AuthorInfo {
    display: flex;
    .base-icon-s-custom {
      color: $--color-text-secondary;
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
    color: $--color-text-secondary;
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
    color: $--color-text-secondary;
    margin-right: 6px;
  }
  .ContentItem__comma {
    color: $--color-text-secondary;
    margin-right: 6px;
  }
  .ContentItem__source {
    .ContentItem__comma {
      margin-left: 6px;
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
    color: $--color-text-regular;
    &:hover {
      border-bottom: 1px dotted $--color-text-regular;
      color: $--color-primary;
    }
    &.is-disabled {
      cursor: auto;
      &:hover {
        border: none;
        color: $--color-text-regular;
      }
    }
  }
  .ContentItem__source {
    //font-style: italic;
    font-weight: 500;
    color: $--color-text-regular;
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
    &:hover {
      color: $--color-primary;
      border-bottom: 1px dotted $--color-text-regular;
    }
    cursor: pointer;
    &.is-disabled {
      cursor: auto;
      &:hover {
        border: none;
        color: $--color-text-regular;
      }
    }
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
    color: $--color-text-regular;
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
    .Keyword{
      &.is-disabled {
        cursor: auto;
        &:hover {
          border: none;
          color: $--color-text-regular;
        }
      }
    }
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
    margin-top: 10px;
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
  .ContentItem__linkDotMeta {
    margin-left: auto;
    display: inline-block;
    font-weight: 600;
    // font-style: italic;
    font-size: 12px;
    color: $--color-text-primary;
    margin-bottom: 6px;
    padding-top: 4px;
  }
  .ContentItem__pdf {
    vertical-align: -2px;
    display: inline-block;
    margin-right: 10px;
  }
</style>

