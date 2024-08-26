<template>
    <div :id="id"></div>
</template>

<script>
    import E from 'wangeditor'
    import { UPLOAD_ACTION,BASE_FILE_URL} from '../../constant/index'
    import {generateId} from '../../util/index'
    export default {
        name:'WangEditor',
        model:{
            prop: "value",
            event: "update:value"
        },
        props:{
            userId:{
                required:true,
                type:String
            },
            value:{
                type:String,
                default:''
            },
            placeholder :{
                type:String,
                default:''
            },
            plugins:{
                type:Array,
                default:() => []
            }
        },
        data(){
            return {
                id:'',
                editor:null,
                valueBak:''
            }
        },
        watch:{
            value:{
                immediate:true,
                handler(newVal){
                    if(newVal != this.valueBak){
                        if(this.editor){
                            this.editor.txt.html(newVal || '')
                        }
                    }
                }
            }
        },
        mounted(){
           this.id = generateId();
           this.$nextTick(() => {
                 this.editor = new E(document.getElementById(this.id))
                // 或者 const editor = new E( document.getElementById('div1') )
                // 配置 server 接口地址
                this.editor.config.height = 300
                this.editor.config.zIndex = 500
                this.editor.config.focus = false
                this.editor.config.uploadImgServer = UPLOAD_ACTION
                this.editor.config.uploadFileName = 'file1000'
                this.editor.config.uploadImgMaxLength = 1
                if(this.placeholder){
                    this.editor.config.placeholder = this.placeholder
                }
                this.editor.config.uploadImgParams = {
                    uploader:this.userId
                }
                this.editor.config.uploadImgHooks = {
                    // 图片上传并返回了结果，想要自己把图片插入到编辑器中
                    // 例如服务器端返回的不是 { errno: 0, data: [...] } 这种格式，可使用 customInsert
                    customInsert: function(insertImgFn, result) {
                        // result 即服务端返回的接口
                        if(result.errno == 0){
                            insertImgFn(BASE_FILE_URL + result.fastdfspath)
                        }else{
                            this.$message.error('图片上传失败')
                        }
                        // insertImgFn 可把图片插入到编辑器，传入图片 src ，执行函数即可
                    }
                }
                // 配置 server 接口地址
                this.editor.config.uploadVideoServer = UPLOAD_ACTION
                this.editor.config.uploadVideoMaxSize = 100 * 1024 * 1024 // 1024m
                this.editor.config.uploadVideoName = 'file1000'
                this.editor.config.uploadVideoParams  = {
                    uploader:this.userId
                }
                this.editor.config.uploadVideoHooks = {
                    // 视频上传并返回了结果，想要自己把视频插入到编辑器中
                    // 例如服务器端返回的不是 { errno: 0, data: { url : '.....'} } 这种格式，可使用 customInsert
                    customInsert: function(insertVideoFn, result) {
                        if(result.errno == 0){
                            insertVideoFn(BASE_FILE_URL + result.fastdfspath)
                        }else{
                            this.$message.error('视频上传失败')
                        }
                    }
                }
                let _this = this;
                this.editor.config.onchange = function (newHtml) {
                    _this.valueBak = newHtml;
                    _this.$emit('update:value',newHtml);
                };
                this.plugins.forEach(plugin => {
                    plugin.install(this.editor)
                })
                this.editor.create()
                _this.valueBak = this.value
                this.editor.txt.html(_this.valueBak)
            })   
        }
    }
</script>

<style>

</style>