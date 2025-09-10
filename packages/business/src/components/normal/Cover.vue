<template>
	<base-upload
		class="avatar-uploader"
		:style="{width:width + 'px',height:height + 'px'}"
		:show-file-list="false"
        name="file1000"
		:action="uploadAction"
		:headers="uploadHeaders"
		:data="{uploader:uploadData.uploader}"
		:on-success="_handleAvatarSuccess"
		:before-upload="_beforeAvatarUpload">
		<img v-if="newImg" :src="newImg" class="avatar" :style="{width:width + 'px',height:height + 'px'}">
		<i v-else class="base-icon-plus avatar-uploader-icon"></i>
		<div v-if="newImg" class="FileMask__actions" @click.stop="">
			<base-tooltip :content="t('custom.cover.删除')" placement="top">
				<i @click.stop="_handleFileRemove" class="base-icon-delete">
				</i>
			</base-tooltip>
		</div>
	</base-upload>
</template>

<script>
    import BaseUpload from '../base/ui/upload/Index.vue'
    import BaseTooltip from '../base/ui/tooltip/tooltip'
    import { BASE_FILE_URL,UPLOAD_ACTION } from '../../constant'
    import Locale from '../base/ui/mixin/locale'
    export default {
        name:'Cover',
        components:{BaseUpload,BaseTooltip},
        mixins:[Locale],
        model:{
            prop:'img',
            event:'update:img'
        },
        data(){
            return {
                uploadAction: UPLOAD_ACTION,
                maxUploadFileSize: 104857600,
                uploadHeaders: {},
                uploadData:{
                    uploader:''
                },
                isMeUpdate:false,
                coverImg:''
            }
        },
        computed:{
            newImg(){
                if(this.coverImg){
                    if(this.coverImg.includes("http")){
                        return this.coverImg
                    }else{
                        return BASE_FILE_URL + this.coverImg;
                    }
                }
                return "";
            }
        },
        props:{
            userId:{
                required:true,
                type:String
            },
            img:{
                type:String,
                default:''
            },
            width:{
                type:Number,
                default:314
            },
            height:{
                type:Number,
                default:130
            },
            fullUrl:{
                type:Boolean,
                default:false
            },
            suffixs:{
                type:Array,
                default:() => ['jpg','jpeg','png','webp']
            }
        },
        watch:{
            img:{
                handler:function(newVal){
                    if(!this.isMeUpdate){
                        this.coverImg = newVal
                    }else{
                        this.isMeUpdate = false
                    }
                },
                immediate:true
            }
        },
        created(){
            this.uploadData.uploader = this.userId
        },
        mounted(){
            // let CSRF_TOKEN = document.cookie.match(new RegExp(`XSRF-TOKEN=([^;]+)`))[1]
            // this.uploadHeaders = {
            //     'X-XSRF-TOKEN': CSRF_TOKEN
            // }
        },
        methods:{
            _handleAvatarSuccess(response, file) {
                if(response.errno != 0){
                    this.$message.error('文件上传失败')
                    return;
                }
                this.coverImg = response.fastdfspath
                this.isMeUpdate = true;
                this.$emit('update:img', (this.fullUrl?BASE_FILE_URL:'') + response.fastdfspath)
            },
            _beforeAvatarUpload(file) {
                try {
                	const isJPG = this.suffixs.includes(file.name.split('.').at(-1).toLowerCase())
                    if (!isJPG) {
                        this.$message.error('请上传图片')
                    }
                    return isJPG	
                }catch(e){
                    console.error(e)
                    return false
                }
            },
            _handleFileRemove(){
                this.coverImg=''
                this.isMeUpdate = true;
                this.$emit('update:img','')
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../base/ui/style/var.scss';
    .avatar-uploader{
        width: 314px;
        height: 130px;
        border:1px dashed $--border-color-base;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        .FileMask__actions {
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            opacity: 0;
            border-radius: $--border-radius-base;
            transition: all .2s;
            background-color: rgba(0,0,0,.5);
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: $--font-size-large;
            i {
                cursor: pointer;
            }
            i+i {
                margin-left: 16px;
            }
        }
        &:hover{
            .FileMask__actions {
                opacity: 1;
            }
        }
    }
    .avatar-uploader-icon{font-size: 30px;}
    .avatar{
        width: 314px;
        height: 130px;
    }
</style>
<style>
	.avatar-uploader .base-upload{width: 100%;height: 100%;display: flex;align-items: center;justify-content: center;}
</style>