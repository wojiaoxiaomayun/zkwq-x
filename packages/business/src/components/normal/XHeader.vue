<template>
    <div class="ApplicationHeader">
        <div class="back_warp" @click="backClick" v-if="back">
            <slot name="back">
                <base-icon :name="backIcon" class="_icon" ></base-icon>
                <div class="back_text">{{backText}}</div>
                <div class="back-subline"></div>
            </slot>
        </div>
        <slot></slot>
    </div>
</template>
<script>
    import BaseIcon from '../base/ui/icon/icon.vue'
    import Locale from '../base/ui/mixin/locale'
    export default {
        name:'XHeader',
        components:{BaseIcon},
        props:{
            back:Boolean,
            backText:{
                type:String,
                default:() => {
                    return Locale.methods.t('custom.xHeader.返回')
                }
            },
            backIcon:{
                type:String,
                default:'back'
            },
            backHome:Function
        },
        methods:{
            backClick(){
                if(this.backHome){
                    this.backHome()
                }else{
                    this.$router.go(-1)
                }
            }
        }
    }
</script>
<style scoped lang="scss">
    @import '../base/ui/style/var.scss';
    .ApplicationHeader{width: 100%;height: 50px;font-weight: 600;padding: 10px 20px;background: white;box-sizing: border-box;display: flex;align-items: center;}
    .ApplicationHeader .back_warp{width: auto;height: 50px;display: flex;align-items: center;overflow: hidden;margin-right:16px;font-weight: normal;font-size: 13px;color: $--color-text-secondary;}
    .ApplicationHeader .back_warp ._icon{cursor: pointer;}
    .ApplicationHeader .back_warp .back_text{margin-left: 8px;cursor: pointer;}
    .ApplicationHeader .back_warp .back-subline{height: 16px;width: 1px;background: #dcdfe6;margin-left: 16px;}
</style>