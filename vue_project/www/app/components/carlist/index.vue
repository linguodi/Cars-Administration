<template>
    <div class="carlist">
        <CarFilter></CarFilter>
        <CarListTab></CarListTab>
    </div>
</template>
<script>
    import CarFilter from "./CarFilter.vue";
    import CarListTab from "./CarListTab.vue";
    export default {
        created(){
            //请求数据
            this.$store.dispatch("carlist_init");
        },
        components:{
            CarFilter,
            CarListTab
        }
    }
</script>
<style>

</style>