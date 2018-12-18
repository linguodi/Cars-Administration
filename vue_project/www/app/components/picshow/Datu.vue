<template>
    <div class="bigPic">
        <img width="900" :src="`carimages/${picshowState.id}/${picshowState.album}/${pic}`">
        <button class="lBtn" @click="goPrev">上一张</button>
        <button class="rBtn" @click="goNext">下一张</button>
    </div>
</template>
<script>
     export default {
        computed:{
            picshowState(){
                //获取车辆的信息
                return this.$store.state.picshowState;
            },
            pic(){
                var _state = this.$store.state.picshowState;
                return this.$store.state.picshowState.info.images[_state.album][_state.idx];
            }
        },
        methods:{
            goNext(){
                
                this.$store.dispatch("goNext")
            },
            goPrev(){
                this.$store.dispatch("goPrev")
            }
        }
     }
</script>
<style>
    .bigPic{
        width: 900px;position: relative;
    }
    .leftPart button{
        position: absolute;
        top:0;
        width: 200px;height: 100%;opacity:0;
    }
    .lBtn{
        left:0;
        cursor: url(http://icon.zol-img.com.cn/products/v3/picture-cursor-left.cur),auto;
    }
    .rBtn{
        right:0;
        cursor: url(http://icon.zol-img.com.cn/products/v3/picture-cursor-right.cur),auto;
    }
</style>