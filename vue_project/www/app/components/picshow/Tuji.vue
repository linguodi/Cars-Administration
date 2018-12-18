<template>
    <div>
        <!-- {{$store.state.picshowState.info.brand}} -->
        <h2>{{info.brand}} {{info.series}} <small>[{{info.id}}]</small></h2>
        <ul class="tuji">
            <li @click="changeAlbum('view')" :class="{cur:album == 'view'}">
                外观（{{info.images.view.length}}）
            </li>
            <li @click="changeAlbum('inner')" :class="{cur:album == 'inner'}">
                内饰（{{info.images.inner.length}}）
            </li>
            <li @click="changeAlbum('engine')" :class="{cur:album == 'engine'}">
                结构（{{info.images.engine.length}}）
            </li>
            <li @click="changeAlbum('more')" :class="{cur:album == 'more'}">
                更多（{{info.images.more.length}}）
            </li>
        </ul>
    </div>
</template>
<script>
     export default {
        computed:{
            info(){
                return this.$store.state.picshowState.info;
            },
            album(){
                return this.$store.state.picshowState.album;
            }
        },
        methods:{
            changeAlbum(album){
                this.$store.commit("changeAlbum", {album})
                this.$store.commit("changeIdx", {idx:0})
            }
        }
     }
</script>
<style>
    .tuji{overflow: hidden;margin:10px 0;}
    .tuji li{
        float: left;width: 45%;height: 50px;
        background:gold;margin:0 5px 5px 0;
        text-align:center;line-height: 50px;
    }
    .tuji li.cur{background: red;}
</style>