<template>
  <div class="CircleTranslateButtonWrapper">
    <button type="button" class="Button Button--plain CircleTranslateButton" :disabled="loading"  @click.prevent.stop="handleTranslate">
      <svg class="Icon Icon--Translate" fill="currentColor" viewBox="0 0 1024 1024" width="1.6em" height="1.6em"><path d="M885.76 426.666667a42.666667 42.666667 0 0 1-42.666667-42.666667A204.373333 204.373333 0 0 0 640 181.76a42.666667 42.666667 0 0 1 0-85.333333A289.706667 289.706667 0 0 1 928.426667 384a42.666667 42.666667 0 0 1-42.666667 42.666667zM407.893333 896a289.706667 289.706667 0 0 1-289.28-289.28 42.666667 42.666667 0 0 1 85.333334 0A203.946667 203.946667 0 0 0 407.893333 810.666667a42.666667 42.666667 0 1 1 0 85.333333zM424.106667 516.266667H177.92A92.586667 92.586667 0 0 1 85.333333 423.68V177.493333A92.586667 92.586667 0 0 1 177.92 85.333333h246.186667a92.586667 92.586667 0 0 1 92.586666 92.586667v245.76a92.586667 92.586667 0 0 1-92.586666 92.586667zM177.92 146.773333a31.146667 31.146667 0 0 0-31.146667 30.72v246.186667a31.146667 31.146667 0 0 0 31.146667 31.146667h246.186667a31.146667 31.146667 0 0 0 30.72-31.146667V177.493333a30.72 30.72 0 0 0-30.72-30.72z" p-id="3086"></path><path d="M354.986667 363.093333H247.04a70.4 70.4 0 0 1-70.826667-70.4v-14.08a70.826667 70.826667 0 0 1 70.826667-70.826666h107.946667A70.4 70.4 0 0 1 426.666667 278.613333v14.08a70.4 70.4 0 0 1-71.68 70.4z m-107.946667-93.866666a9.386667 9.386667 0 0 0-9.386667 9.386666v14.08a9.386667 9.386667 0 0 0 9.386667 8.96h107.946667a8.96 8.96 0 0 0 8.96-8.96v-14.08a8.96 8.96 0 0 0-8.96-9.386666z" p-id="3087"></path><path d="M300.8 441.6a31.146667 31.146667 0 0 1-30.72-31.146667V190.72a30.72 30.72 0 0 1 30.72-30.72 31.146667 31.146667 0 0 1 31.146667 30.72v219.733333a31.146667 31.146667 0 0 1-31.146667 31.146667zM846.08 938.666667h-246.186667a92.586667 92.586667 0 0 1-92.586666-92.586667v-246.186667a92.586667 92.586667 0 0 1 92.586666-92.586666h246.186667A92.586667 92.586667 0 0 1 938.666667 599.893333v246.186667A92.586667 92.586667 0 0 1 846.08 938.666667z m-246.186667-369.493334a30.72 30.72 0 0 0-30.72 30.72v246.186667a31.146667 31.146667 0 0 0 30.72 31.146667h246.186667a31.146667 31.146667 0 0 0 31.146667-31.146667v-246.186667a31.146667 31.146667 0 0 0-31.146667-30.72z" p-id="3088"></path><path d="M832.853333 849.066667a30.72 30.72 0 0 1-26.453333-15.36l-110.08-190.293334a30.72 30.72 0 0 1 53.333333-31.146666l110.08 190.72a30.72 30.72 0 0 1-11.093333 42.666666 30.293333 30.293333 0 0 1-15.786667 3.413334z" p-id="3089"></path><path d="M613.12 849.066667a29.013333 29.013333 0 0 1-15.36-4.266667 30.293333 30.293333 0 0 1-11.52-42.666667l110.08-190.72a30.72 30.72 0 0 1 53.333333 31.146667L640 833.706667a30.293333 30.293333 0 0 1-26.88 15.36z" p-id="3090"></path><path d="M796.586667 783.36h-145.493334a31.146667 31.146667 0 0 1 0-61.866667h145.493334a31.146667 31.146667 0 0 1 0 61.866667z" p-id="3091"></path></svg>
    </button>
    <div class="CircleTranslateButton__label">{{buttonText}}</div>
  </div>
</template>

<script>
import {TranslateV2, GetLang, SaveLog} from '../../service'
import {IsNumber,isArrayEmpty,HasChinese,clearHighlight} from '../../util'
import Locale from '../base/ui/mixin/locale'

export default {
  name: 'CircleTranslateButton',
  mixins:[Locale],
  data () {
    return {
      buttonText: this.t('custom.translate.translate'),
      loading:false
    }
  },
  props: {
    model: Object,
    quotePlacement: String
  },
  create(){
  },
  methods: {
    clearHighlight,
    handleTranslate () {
      if (this.loading) {
        return
      }
      this.loading = true;
      this.$emit('translate-title', this.t('custom.translate.translateProgressWait'))
      GetLang({
        text: this.clearHighlight(this.model.abstracts ? this.model.abstracts : this.model.title),
        id: this.model.id
      }).then(lang => {
        if (lang) {
          lang = lang === 'zh' ? 'cn' : lang
          TranslateV2({
            text: this.clearHighlight(this.model.title),
            from: lang,
            to: (this.$i18n.locale=="zh" && lang =='cn')?'en':lang==this.$i18n.locale?'cn':(this.$i18n.locale=="zh"?'cn':this.$i18n.locale),
            field: 'title',
            id: this.model.id
          }).then(response => {
            if (response?.trans_result?.dst) {
              this.$emit('translate-title', response.trans_result.dst)
            } else {
              this.$emit('translate-title', '翻译功能升级中...')
            }
            this.isLoading = false
          })
          if (this.model.abstracts) {
            this.$emit('translate-abstracts', this.t('custom.translate.translateProgressWait'))
            TranslateV2({
              text: this.clearHighlight(this.model.abstracts),
              from: lang,
              to: (this.$i18n.locale=="zh" && lang =='cn')?'en':lang==this.$i18n.locale?'cn':(this.$i18n.locale=="zh"?'cn':this.$i18n.locale),
              field: 'abstracts',
              id: this.model.id
            }).then(response => {
              this.isLoading = false
              if (response?.trans_result?.dst) {
                this.$emit('translate-abstracts', response.trans_result.dst)
              } else {
                this.$emit('translate-abstracts', '翻译功能升级中...')
              }
            })
          }
        } else {
          this.$emit('translate-title', '翻译功能升级中...')
          this.$emit('translate-abstracts', '翻译功能升级中...')
          this.isLoading = false
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
@import '../base/ui/style/var.scss';
  .CircleTranslateButtonWrapper {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    cursor: pointer;
    &:hover {
      .CircleTranslateButton {
        opacity: .8;
      }
      .CircleTranslateButton__label {
        opacity: .8;
      }
    }
  }
  .CircleTranslateButton {
    width: 32px;
    height: 32px;
    transition: opacity .3s;
  }
  .CircleTranslateButton__label {
    color: $--color-text-secondary;
    font-size: 12px;
    transition: opacity .3s;
  }
</style>
