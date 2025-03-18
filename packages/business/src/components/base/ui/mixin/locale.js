import { t,i18n } from '../locale/index'

export default {
  methods: {
    t(...args) {
      // console.log(args)
      return t.apply(this, args)
    }
  }
}
