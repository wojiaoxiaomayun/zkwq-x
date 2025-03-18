<template>
  <div class="DatePicker__warp">
    <base-date-picker
      :value-format="selectedFormat.format"
      :format="selectedFormat.format"
      v-model="innerDate"
      :type="selectedFormat.key"
      @change="pickerChange"
      :placeholder="placeholder"
    ></base-date-picker>
    <base-dropdown @command="typeSelected">
      <span class="base-dropdown-link">
        <i class="base-icon-date"></i>
      </span>
      <base-dropdown-menu slot="dropdown">
        <base-dropdown-item
          :command="item"
          v-for="(item, index) in formats"
          :key="'format' + index"
          >{{ item.name }}</base-dropdown-item
        >
      </base-dropdown-menu>
    </base-dropdown>
  </div>
</template>

<script>
import BaseDatePicker from '../base/ui/date-picker/picker/date-picker'
import BaseDropdown from '../base/ui/dropdown/dropdown.vue'
import BaseDropdownMenu from '../base/ui/dropdown/dropdown-menu.vue'
import BaseDropdownItem from '../base/ui/dropdown/dropdown-item.vue'
export default {
  name: "DatePicker",
  model: {
    prop: "date",
    event: "update:date",
  },
  components: {
    BaseDatePicker,BaseDropdown,BaseDropdownMenu,BaseDropdownItem
  },
  props: {
    date: String,
    placeholder: String,
    type:{
      type:String,
      default:'year'
    },
    formats: {
      type: Array,
      default: function () {
        return [
          {
            key: "year",
            name: "yyyy",
            format: "yyyy",
          },
          {
            key: "month",
            name: "yyyy-MM",
            format: "yyyy-MM",
          },
          {
            key: "date",
            name: "yyyy-MM-dd",
            format: "yyyy-MM-dd",
          },
        ];
      },
    },
  },
  watch: {
    date: {
      handler(newVal) {
        if (!this.isMeUpdate) {
          if (newVal) {
            this.selectedFormat = this.formats.find(format => {
              return newVal.length == format.format.length
            }) || {}
          }
          this.innerDate = newVal || '';
        }else{
          this.isMeUpdate = false;
        }
      },
      immediate: true,
    },
  },
  inject: {
    baseForm: {
      default: ''
    },
    baseFormItem: {
      default: ''
    }
  },
  data() {
    let format = this.formats?.find(item => item.key == this.type) || this.formats?.[0] || {};
    return {
      innerDate: "",
      selectedFormat: format,
      isMeUpdate: false,
    };
  },
  methods: {
    pickerChange(val) {
      this.clearFormValidate()
      this.isMeUpdate = true;
      this.$emit("update:date", this.innerDate);
    },
    typeSelected(item) {
      this.clearFormValidate()
      this.selectedFormat = item;
      this.innerDate = "";
      this.$nextTick(() => {
        this.isMeUpdate = true;
        this.$emit("update:date", this.innerDate);
      });
    },
    clearFormValidate(){
      if(this.baseFormItem){
        this.baseFormItem.clearValidate()
      }
    }
  },
};
</script>

<style scoped lang="scss">
@import '../base/ui/style/var.scss';
.DatePicker__warp {
  width: 100%;
  display: flex;
  align-items: center;
  gap:12px;
}
.setting__icon {
  display: inline-block;
  margin-left: 8px;
  cursor: pointer;
}
.format__warp {
  width: 100%;
}
.format__warp li {
  width: calc(100% - 16px);
  padding: 8px;
  cursor: pointer;
  &:hover {
    background: $--color-primary;
    color: white;
  }
}
.format__warp .selected {
  color: $--color-primary;
}
</style>