<template>
  <div class="SignFlow__captcha" :class="{'is-focused':focused, 'is-error':error}">
    <base-form-item :prop="prop" :custom-item="true" ref="CaptchaFormItem">
      <base-input type="number" placeholder="图形验证码（输入算式结果）" :value="captcha" :ripple="false" @focus="focused = true" @blur="focused = false" @input="handleInput" :show-label="showLabel"></base-input>
    </base-form-item>
    <base-tooltip effect="dark" content="看不清楚？换一张" placement="top">
      <img :src="captchaImg" class="CaptchaImg" @click="refreshCaptcha">
    </base-tooltip>
  </div>
</template>

<script>
import { GetCaptcha } from '@/service/captcha'
import BaseTooltip from '../../base/ui/tooltip/tooltip'
import BaseFormItem from '../../base/ui/form/FormItem'
import BaseInput from '../../base/ui/input/Input'
export default {
  name: 'CaptchaFormItem',
  components: {BaseInput, BaseFormItem, BaseTooltip},
  componentName: 'CaptchaFormItem',
  model: {
    prop: 'captcha',
    event: 'input'
  },
  data() {
    return {
      captchaImg: null,
      focused: false,
      error: false
    }
  },
  mounted() {
    this.renderCaptcha()
    this.$on('is-error', (value) => {
      this.error = value
    })
    this.$on('setErrorMsg', (value) => {
      this.error = !!value
      this.$refs.CaptchaFormItem.setErrorMsg(value)
    })
  },
  props: {
    prop: String,
    captcha: String,
    captchaKey: String,
    showLabel: Boolean
  },
  methods: {
    handleInput(val) {
      this.$emit('input', val)
    },
    renderCaptcha () {
      GetCaptcha(this.captchaKey).then(response => {
        this.captchaImg = response.value
      })
    },
    handleRefreshCaptcha() {
      this.renderCaptcha()
    },
    refreshCaptcha () {
      this.renderCaptcha()
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/components/base/ui/style/var.scss';
  .SignFlow__captcha {
    display: flex;
    align-items: center;
    position: relative;
    margin-bottom: 22px;
    &:after, &:before {
      bottom: -1px;
      content: "";
      left: 0;
      position: absolute;
      transition: .3s cubic-bezier(.25,.8,.5,1);
      width: 100%;
    }
    &:before {
      border-color: $--input-border-color;
      border-style: solid;
      border-width: thin 0 0;
    }
    &:after {
      background-color: transparent;
      border-color: $--color-primary;
      border-style: solid;
      border-width: thin 0;
      transform: scaleX(0);
    }
    &:hover {
      &:before {
        border-color: $--input-hover-border;
      }
    }
    &.is-focused {
      &:before {
        border-color: $--color-primary;
      }
      &:after {
        transform: scaleX(1);
      }
    }
    &.is-error {
      &:before {
        border-color: $--color-danger;
      }
    }
    .base-form-item {
      margin-bottom: 0;
      flex: 1;
    }
  }
  .CaptchaImg {
    height: 28px;
    cursor: pointer;
    margin-left: 16px;
  }
</style>
