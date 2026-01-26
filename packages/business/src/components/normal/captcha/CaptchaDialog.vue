<template>
  <app-dialog-global ref="appDialog" width="420px" dialog-title="机器人验证" dialog-subtitle="输入图形算式结果，证明您不是机器人" @hide="hide" :auto-hide="false" :static-dialog="true" hide-close-button>
    <div>
      <base-form :model="formData" :rules="formRules" ref="CaptchaForm" class="CaptchaForm">
        <captcha-form-item prop="captcha" v-model.trim="formData.captcha" :captcha-key="clientId" ref="CaptchaFormItem"></captcha-form-item>
        <div class="FormActions">
          <base-button native-type="submit" class="FormButton" type="primary" size="medium" :disabled="isLoading || !formData.captcha" :loading="isLoading" @click.prevent="handleSubmit">
            <span v-if="!isLoading">确定</span>
          </base-button>
        </div>
      </base-form>
    </div>
  </app-dialog-global>
</template>

<script>
import BaseInput from '../../base/ui/input/Input'
import BaseButton from '../../base/ui/button/Button'
import AppDialogGlobal from '../../base/widget/AppDialog'
import BaseForm from '../../base/ui/form/Form'
import CaptchaFormItem from './CaptchaFormItem'
import { CheckCaptcha } from '@/service/captcha'
import emitter from '../../base/ui/mixin/emitter'

/**
 * 验证码验证
 * @param rule
 * @param value
 * @param callback
 */
export const ValidateCaptcha = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入验证码'))
  } else if (!Number.isInteger(value - 0)) {
    callback(new Error('验证码填写错误'))
  } else {
    callback()
  }
}

const GenerateClientId = () => {
  let d = Date.now()
  if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
    d += performance.now()
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    let r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
  })
}

export default {
  name: 'CaptchaDialog',
  components: {CaptchaFormItem, BaseForm, AppDialogGlobal, BaseButton, BaseInput},
  mixins: [ emitter],
  data () {
    return {
      clientId: null,
      formData: {
        captcha: null
      },
      formRules: {
        captcha: [
          { validator: ValidateCaptcha, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    hide () {
      this.formData.captcha = null
      this.clientId = null
      this.$refs.appDialog.hide()
    },
    show () {
      this.$refs.appDialog.show()
    },
    clearErrorMsg () {
      this.setErrorMsg('CaptchaFormItem', null)
    },
    setErrorMsg(name, msg) {
      this.broadcast(name, 'setErrorMsg', msg)
    },
    handleSubmit () {
      this.$refs.CaptchaForm.validate((valid) => {
        if (valid) {
          this.isLoading = true
          CheckCaptcha(this.clientId, this.formData.captcha).then(response => {
            if (response.failure) {
              this.isLoading = false
              this.setErrorMsg('CaptchaFormItem', response.cause)
              this.$refs.CaptchaFormItem.handleRefreshCaptcha()
              return false
            }
            if (response.success) {
              this.isLoading = false
              this.clearErrorMsg()
              this.hide()
              this.$emit('on-success')
            }
          }).finally(() => {
            this.isLoading = false
          })
        }
      })
    },
  },
  created () {
    this.clientId = GenerateClientId()
  }
}
</script>
<style lang="scss" scoped>
  .CaptchaForm {
    padding: 20px 4px;
  }
</style>
<style lang="scss">
</style>
