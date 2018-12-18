<template>
    <div>
        <h3>更多{{info.brand}} {{info.series}}供你选择</h3>
        <div class="moreCar">
            <ul class="moreList" ref="moreList">
                <li v-for="i in carlike" @click="changeId(i.id)">
                    {{i.series}}{{i.color}}
                    {{new Date(i.buydate).getFullYear()}}年
                    {{i.km}}公里 {{i.displacement}} {{i.price}}万
                </li>
            </ul>
            <div class="bar"><b></b></div>
        </div>
    </div>
</template>
<script>
     export default {
        computed:{
            info(){
                return this.$store.state.picshowState.info;
            },
            carlike(){
                return this.$store.state.picshowState.carlike.results;
            }
        },
        methods:{
            changeId(id){
                this.$store.dispatch("changeId", {id})
            }
        },
        mounted(){
            $(this.$refs.moreList).on('click','li',function(){
                $(this).addClass('cur').siblings().removeClass('cur');
            })
        }
     }
</script>
<style>
    .moreCar{
        position: relative;width: 92%;
        background:rgba(255,255,255,0.2);
    }
    .bar{
        position: absolute;right:0;top:0;
        width: 10px;height: 100%;
        background: #fff;
    }
    .bar b{
        position: absolute;
        width: 10px;height: 40px;
        background: orange;cursor: pointer;
    }
    .moreList li{line-height: 30px;cursor: pointer;}
    .moreList li.cur{background: yellowgreen;}
</style>