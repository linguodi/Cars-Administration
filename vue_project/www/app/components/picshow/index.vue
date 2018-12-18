<template>
    <div class="picshow">
        <div class="close" @click="changeShowPic">
            <Icon type="ios-close-circle" />
        </div>

        <div class="leftPart">
            <Datu></Datu>
        </div>
        <div class="rightPart">
            <Tuji></Tuji>
            <MoreCar></MoreCar>
            <smallPic></smallPic>
        </div>
    </div>
</template>
<script>
    import Datu from "./Datu.vue";
    import Tuji from "./Tuji.vue";
    import MoreCar from "./MoreCar.vue";
    import smallPic from "./smallPic.vue";
    export default {
        created(){
            //从生命周期钩子函数中发出异步请求，请求服务器中数据，存储到Vuex的state中
            this.$store.dispatch("init");
        },
        components:{
            Datu,
            Tuji,
            MoreCar,
            smallPic
        },
        methods:{
            changeShowPic(){
                this.$store.commit("changeShowPic",{isShowPic:false})
            }
        }
    }
</script>
<style>
    .picshow{
        width: 100%;height: 100%;position: fixed;top:50%;left:50%;
        background:#000;color:#fff;transform:translate(-50%,-50%);
        z-index:999;
    }
    .rightPart{
        position: absolute;right:0;top:0;
        width: 350px;height: 100%;
    }
    .close{
        font-size:30px;
        position: fixed;
        right:10px;
        top:0;
        cursor: pointer;
        z-index:9999;
    }
</style>