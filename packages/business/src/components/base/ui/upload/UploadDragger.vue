<template>
  <div
    id="FileUploader"
    class="base-upload-dragger"
    :class="{
      'is-dragover': dragover
    }"
    @drop.prevent="onDrop"
    @dragover.prevent="onDragover"
    @dragleave.prevent="dragover = false"
  >
    <slot></slot>
  </div>
</template>
<script>
  import XMessage from '../message/xmessage'

  export default {
    name: 'BaseUploadDragger',
    props: {
      disabled: Boolean
    },
    inject: {
      uploader: {
        default: ''
      }
    },
    data() {
      return {
        dragover: false
      };
    },
    methods: {
      onDragover() {
        if (!this.disabled) {
          this.dragover = true;
        }
      },
      onDrop(e) {
        if (this.disabled || !this.uploader) return;
        const accept = this.uploader.accept;
        this.dragover = false;
        if (!accept) {
          this.$emit('file', e.dataTransfer.files);
          return;
        }
        this.$emit('file', [].slice.call(e.dataTransfer.files).filter(file => {
          const { type, name } = file;
          const extension = name.indexOf('.') > -1
            ? `.${ name.split('.').pop() }`
            : '';
          const baseType = type.replace(/\/.*$/, '');
          const files = accept.split(',')
            .map(type => type.trim())
            .filter(type => type)
            .some(acceptedType => {
              if (/\..+$/.test(acceptedType)) {
                return extension === acceptedType;
              }
              if (/\/\*$/.test(acceptedType)) {
                return baseType === acceptedType.replace(/\/\*$/, '');
              }
              if (/^[^\/]+\/[^\/]+$/.test(acceptedType)) {
                return type === acceptedType;
              }
              return false;
            });
          if (!files) {
            XMessage({
              message: '上传文件类型不匹配，仅支持PDF文件',
              type: 'error',
              center: true,
              duration: 5000
            })
          }
          return files
        }));
      }
    }
  };
</script>

