<template>
    <div class="smallpics" ref="smallpics">
        <div class="huoche" ref="huoche" :style="{'left':nowPage * -320+'px'}">
            <ul v-for="i in allPage">
                <li
                    v-for="(pic,index) in nowPicsArr.slice((i-1) * 4, i * 4)"
                    :class="{cur:i-1 == nowPage && picshowState.idx % 4 == index}"
                    @click="changeIdx((i-1) * 4 + index)"
                >
                    <img :src="`carimages_small/${picshowState.id}/${picshowState.album}/${pic}`">
                </li>
            </ul>
        </div>
        <ol class="navs" ref="navs">
            <li
                v-for="i in allPage"
                :class="{'cur':nowPage == (i-1)}"
                :style="{'width': 100 / allPage-3 +'%'}"
            >
            </li>
        </ol>
    </div>
</template>
<script>
     export default {
        computed:{
            nowPicsArr(){
                //获取当前album组所有的图片
                var obj = this.$store.state.picshowState
                return obj.info.images[obj.album];
            },
            allPage(){
                //计算当前小图的总页数(向上取整)
                return Math.ceil(this.nowPicsArr.length / 4);
            },
            nowPage(){
                //计算当前每组小图的所在页（idx / 4）
                return ~~(this.$store.state.picshowState.idx / 4);
            },
            picshowState(){
                //获取车辆的信息
                return this.$store.state.picshowState;
            }
        },
        methods:{
            changeIdx(idx){
                this.$store.commit("changeIdx", {idx})
            }
        },
        //DOM上树之后
        mounted(){
            //用事件委托给li，动画切换小图导航
            var self = this;
            $(this.$refs.navs).on('click','li',function(){
                $(self.$refs.huoche).css('left', $(this).index() * -320);
                $(this).addClass('cur').siblings().removeClass('cur');
            });

            //离开大盒子回到初始位置
            $(this.$refs.smallpics).mouseleave(function(){
                $(self.$refs.huoche).css('left', self.nowPage * -320);
                $(self.$refs.navs).find('li').eq(self.nowPage).addClass('cur').siblings().removeClass('cur')
            })
        }
     }
</script>
<style>
    .smallpics{overflow: hidden;width: 330px;margin:20px 0;}
    .smallpics ul{float: left;width: 330px;}
    .smallpics ul li{float: left;margin:0 6px 6px 0;width: 48%;position: relative;}
    .smallpics ul li:before{
        content:"";
        position: absolute;
        width: 100%;height: 100%;
        background: rgba(0,0,0,0.6);
    }
    .smallpics ul li.cur:before{opacity:0;}
    .huoche{
        width: 888888px;
        position: relative;
        left:0;
        transition: all 0.5s;
    }
    .navs{width: 320px;}
    .navs li{
        float: left;
        margin-right:4px;
        width:32%;height: 6px;
        background: orange;
    }
    .navs li.cur{background: red;}
</style>