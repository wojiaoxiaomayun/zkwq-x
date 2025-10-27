<template>
  <div>
    <div class="FruitUploaderContainer">
      <div
        v-if="newFiles.length > 0"
        v-for="(item, index) in newFiles"
        class="FileMask"
        :class="{ 'is-active': item.file_percentage > 0 }"
        :key="item.id"
      >
        <base-progress
          v-if="item.file_percentage > 0"
          type="circle"
          :percentage="item.file_percentage"
          :width="120"
        ></base-progress>
        <div
          v-else
          class="FileMask__content"
          :class="{ 'is-hover': item.is_hover }"
          @mouseenter="handleFileMouseEnter(item)"
          @mouseleave="handleFileMouseOut(item)"
        >
          <div class="FileMask__title">{{ item.name }}</div>
          <div class="FileMask__meta">
            <div>{{t('custom.annex.上传时间')}}</div>
            <div>{{ handleTime(item.create_time || item.last_modified) }}</div>
          </div>
          <div class="FileMask__actions">
            <base-tooltip v-if="edit" :content="t('custom.annex.编辑')" placement="top">
              <i @click="handleFileEdit(item)" class="base-icon-edit"> </i>
            </base-tooltip>
            <base-tooltip :content="t('custom.annex.删除')" placement="top">
              <i @click="handleFileRemove(item)" class="base-icon-delete"> </i>
            </base-tooltip>
          </div>
        </div>
      </div>
      <base-upload
        v-if="newFiles.length < max"
        class="annex-uploader"
        :data="{ uid: uploadData.uploader,isCheck:checkPDF?1:0}"
        name="file"
        :show-file-list="false"
        :headers="annexObj.uploadHeaders"
        :with-credentials="true"
        :action="annexObj.uploadAction"
        :file-list="newFiles"
        :before-upload="handleBeforeFileUpload"
        :auto-upload="true"
        :on-success="handleFileUploadSuccess"
        :on-remove="handleFileRemove"
        :on-error="handleFileUploadError"
        :on-exceed="handleFileExceed"
        :on-progress="handleOnFileProgress"
        :accept="fileTypes.map(e => '.' + e).join(',')"
      >
        <i class="annex-uploader-icon base-icon-plus"></i>
      </base-upload>
    </div>
    <div class="FruitUploader__tipItems" v-if="annexObj.fileErrorMsg">
      <div class="FruitUploader__tipItem FruitUploader__tipItem--error">
        {{ annexObj.fileErrorMsg }}
      </div>
    </div>
    <AppDialog v-if="edit" ref="appDialog"  originTitle :dialogTitle="t('custom.annex.附件内容')" staticDialog @hide="editFile = {}">
      <base-form>
        <base-form-item>
          <base-input v-model="editFile.title" :placeholder="t('custom.annex.请输入附件标题')"></base-input>
        </base-form-item>
        <base-form-item>
          <base-input :rows="3" v-model="editFile.desc" :placeholder="t('custom.annex.请输入附件描述')"></base-input>
        </base-form-item>
        <!-- <base-form-item>
          <base-button type="primary" style="width:80%;margin-left:10%;">确定</base-button>
        </base-form-item> -->
      </base-form>
    </AppDialog>
  </div>
</template>

<script>
import BaseUpload from "../base/ui/upload/Index.vue";
import BaseTooltip from "../base/ui/tooltip/tooltip";
import BaseProgress from "../base/ui/progress/Progress.vue";
import AppDialog from '../base/widget/AppDialog.vue'
import BaseForm from '../base/ui/form/Form.vue'
import FormItem from '../base/ui/form/FormItem.vue'
import BaseInput from '../base/ui/input/Input.vue'
// import BaseButton from '../base/ui/button/Button.vue'
import { BASE_FILE_URL,UPLOAD_ACTION_HKY } from '../../constant'
import Locale from '../base/ui/mixin/locale'
import { isPDF } from '../../util';
export default {
  name: "Annex",
  components: { BaseUpload, BaseTooltip, BaseProgress,AppDialog,BaseForm,FormItem,BaseInput },
  mixins:[Locale],
  model: {
    prop: "files",
    event: "update:files",
  },
  data() {
    return {
      annexObj: {
        FILE_URL_PREFIX: BASE_FILE_URL,
        uploadAction: UPLOAD_ACTION_HKY,
        // maxUploadFileSize: 104857600,
        // maxUploadFileSize: 157286400,
        uploadHeaders: {},
        fileErrorMsg: null,
        fileIds: [],
        coverPercentage: 0,
        coverUrl: null,
        coverMaskHover: false,
        coverErrorMsg: null,
      },
      newFiles: [],
      uploadData: {
        uploader: "",
      },
      editFile:{},
      isMeControl: false,
    };
  },
  props: {
    userId:{
      required:true,
      type:String
    },
    files: {
      type: Array,
      default: function () {
        return [];
      },
    },
    max: {
      type: Number,
      default: 5,
    },
    fileTypes: {
      type: Array,
      default: function () {
        return [];
      },
    },
    edit:Boolean,
    maxUploadFileSize:{
      type:Number,
      default:157286400
    },
    checkPDF:{
      type:Boolean,
      default:false
    }
  },
  watch: {
    files: {
      immediate: true,
      handler(newVal) {
        if (newVal && !this.isMeControl) {
          this.newFiles.splice(0, this.newFiles.length);
          newVal.forEach((e) => {
            this.newFiles.push({ ...e });
          });
          this.newFiles.forEach((e) => {
            e.uid = e.uid || e.id
            this.annexObj.fileIds.push(e.uid);
          });
        } else {
          this.isMeControl = false;
        }
      },
    },
  },
  created() {
    this.uploadData.uploader = this.userId;
  },
  mounted() {
    let CSRF_TOKEN = document.cookie.match(new RegExp(`XSRF-TOKEN=([^;]+)`))[1];
    this.annexObj.uploadHeaders = {
      "X-XSRF-TOKEN": CSRF_TOKEN,
    };
  },
  methods: {
    now() {
      let now = [];
      let dateTime = new Date();
      let year = dateTime.getFullYear();
      now += year + "-";
      let month = dateTime.getMonth() + 1;
      if (month < 10) {
        now += "0" + month + "-";
      } else {
        now += month + "-";
      }
      let date = dateTime.getDate();
      if (date < 10) {
        now += "0" + date + " ";
      } else {
        now += date + " ";
      }
      let hours = dateTime.getHours();
      if (hours < 10) {
        now += "0" + hours + ":";
      } else {
        now += hours + ":";
      }
      let minutes = dateTime.getMinutes();
      if (minutes < 10) {
        now += "0" + minutes;
      } else {
        now += minutes;
      }
      return now;
    },
    handleTime(time){
      if(/\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}/.test(time)){
        return time.substring(0,time.lastIndexOf(':'))
      }
      return time;
    },
    handleFileEdit(file){
      let index = this.annexObj.fileIds.indexOf(file.uid);
      this.editFile = this.newFiles[index]
      this.$refs.appDialog.show()
    },
    handleFileRemove(file) {
      if (this.annexObj.fileErrorMsg) {
        this.clearFile(file);
        return;
      }
      this.$confirm("确定删除附件？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "点错了",
        type: "warning",
        center: true,
      }).then(() => {
        this.clearFile(file);
      });
    },
    clearFile(file) {
      let index = this.annexObj.fileIds.indexOf(file.uid);
      this.newFiles.splice(index, 1);
      this.isMeControl = true;
      this.$emit(
        "update:files",
        this.newFiles.map((e) => {
          return {
            id: e.id,
            name: e.name,
            title:e.title,
            desc:e.desc,
            link: e.link,
            url: e.url,
            size: e.size,
            create_time: e.create_time,
            last_modified:e.last_modified
          };
        })
      );
      this.annexObj.fileIds.splice(index, 1);
    },
    handleBeforeFileUpload(file) {
      return new Promise(async (resolve,reject) => {
        this.annexObj.fileErrorMsg = null;
        if (file.size === 0) {
          this.annexObj.fileErrorMsg = "请选择有内容的文件";
          reject()
          return false;
        }
        if (file.size > this.maxUploadFileSize) {
          this.annexObj.fileErrorMsg = `请选择不大于 ${(this.maxUploadFileSize / 1024 / 1024).toFixed(2)}M 的文件`;
          reject()
          return false;
        }
        let type = file.name.substring(
          file.name.lastIndexOf(".") + 1,
          file.name.length
        );
        if (this.fileTypes.length > 0 && !this.fileTypes.includes(type)) {
          this.annexObj.fileErrorMsg = "文件格式不支持";
          reject()
          return false;
        }
        if(type == 'pdf'){
          let pdfStatus = await isPDF(file)
          if(!pdfStatus){
            this.annexObj.fileErrorMsg = "请上传正确的PDF文件";
            reject()
            return false;
          }
        }
        this.annexObj.fileIds.push(file.uid);
        this.newFiles.push({
          uid: file.uid,
          size: file.size,
          type: file.type,
          name: file.name,
          title:file.name,
          desc:'',
          file_percentage: 0,
          is_hover: false,
          last_modified: this.now(),
        });
        resolve()
      })
    },
    handleFileUploadSuccess(response, file) {
      let index = this.annexObj.fileIds.indexOf(file.uid);
      let target = this.newFiles[index];
      if(!response){
          this.$message.error('文件上传失败')
          this.clearFile(index);
          return;
      }
      if(response == 'not_pdf'){
          this.$message.error('当前文件不是PDF文件')
          this.clearFile(index);
          return;
      }
      if(response == 'more_than_10M'){
          this.$message.error('当前文件大于10M')
          this.clearFile(index);
          return;
      }
      target = {
        link: response,
        url: this.annexObj.FILE_URL_PREFIX + response,
        size: file.size,
        name: file.name,
        title:file.name.substring(0,file.name.lastIndexOf('.')),
        file_percentage: 0,
        last_modified: this.now(),
        create_time: this.now(),
        is_hover: false,
      };
      this.$set(this.newFiles, index, target);
      this.isMeControl = true;
      this.$emit(
        "update:files",
        this.newFiles.map((e) => {
          return {
            id: e.id,
            name: e.name,
            link: e.link,
            title: e.title,
            desc:e.desc,
            url: e.url,
            size: e.size,
            create_time: e.create_time,
            last_modified:e.last_modified
          };
        })
      );
      this.$emit(
        "change",
        this.newFiles.map((e) => {
          return {
            id: e.id,
            name: e.name,
            link: e.link,
            title: e.title,
            desc:e.desc,
            url: e.url,
            size: e.size,
            create_time: e.create_time,
            last_modified:e.last_modified
          };
        }),
        index,
        file
      );
    },
    handleFileUploadError(err, file) {
      this.annexObj.fileErrorMsg = "文件上传失败，请稍后再试";
      let index = this.annexObj.fileIds.indexOf(file.uid);
      this.clearFile(index);
    },
    handleFileExceed() {
      this.annexObj.fileErrorMsg = `最多上传 ${this.max} 个附件`;
    },
    handleOnFileProgress(event, file) {
      if (file) {
        let percentage = Math.floor(event.percent);
        if (percentage > 99) {
          percentage = 99;
        }
        let index = this.annexObj.fileIds.indexOf(file.uid);
        let target = this.newFiles[index];
        target.file_percentage = percentage;
        this.$set(this.newFiles, index, target);
      }
    },
    handleFileMouseEnter(item) {
      if (!item.file_percentage || item.file_percentage === 0) {
        let index = this.annexObj.fileIds.indexOf(item.uid);
        item.is_hover = true;
        this.$set(this.newFiles, index, item);
        this.$forceUpdate();
      }
    },
    handleFileMouseOut(item) {
      if (!item.file_percentage || item.file_percentage === 0) {
        let index = this.annexObj.fileIds.indexOf(item.uid);
        item.is_hover = false;
        this.$set(this.newFiles, index, item);
        this.$forceUpdate();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../base/ui/style/var.scss";
.FruitUploaderContainer {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-top: 6px;
  .FruitUploader {
    margin-bottom: 10px;
    &:first-child {
      margin-right: 10px;
    }
  }
  .CoverMask {
    width: 120px;
    height: 120px;
    position: absolute;
    background: $--color-white;
    img {
      border-radius: $--border-radius-base;
      cursor: pointer;
    }
    .CoverMask__actions {
      width: 120px;
      height: 120px;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      border-radius: $--border-radius-base;
      transition: all 0.3s;
      background-color: rgba(0, 0, 0, 0.5);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: $--font-size-large;
      i {
        cursor: pointer;
      }
      i + i {
        margin-left: 16px;
      }
    }
    &.is-hover {
      .CoverMask__actions {
        opacity: 1;
      }
    }
  }
  .FileMask {
    width: 120px;
    height: 120px;
    background: $--background-color-base;
    border-radius: $--border-radius-base;
    margin-right: 10px;
    margin-bottom: 10px;
    &.is-active {
      background-color: transparent;
    }
  }
  .FileMask__content {
    width: 100%;
    height: 100%;
    padding: 10px;
    position: relative;
    .FileMask__actions {
      width: 120px;
      height: 120px;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      border-radius: $--border-radius-base;
      transition: all 0.2s;
      background-color: rgba(0, 0, 0, 0.5);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: $--font-size-large;
      i {
        cursor: pointer;
      }
      i + i {
        margin-left: 16px;
      }
    }
    &.is-hover {
      .FileMask__actions {
        opacity: 1;
      }
    }
  }
  .FileMask__title {
    font-size: $--font-size-small;
    line-height: 1.2;
    max-height: 64px;
    padding: 2px 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }
  .FileMask__meta {
    position: absolute;
    bottom: 26px;
    line-height: 1.2;
    font-size: $--font-size-extra-small;
    color: $--color-text-secondary;
  }
}

.FruitUploader__tipItems {
  margin-top: 10px;
  line-height: 1.2;
}
.FruitUploader__tipItem {
  font-size: $--font-size-small;
  color: $--color-text-secondary;
}
.FruitUploader__tipItem + .FruitUploader__tipItem {
  margin-top: 4px;
}
.FruitUploader__tipItem--error {
  color: $--color-danger;
}
</style>
<style>
.annex-uploader .base-upload {
  width: 120px;
  height: 120px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.annex-uploader .base-upload:hover {
  border-color: #409eff;
}
.annex-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  display: flex !important;
  align-items: center;
  justify-content: center;
}
</style>