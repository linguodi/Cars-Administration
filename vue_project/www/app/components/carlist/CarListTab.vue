<template>
    <div class="carlist">
        <Table :columns="col" :data="$store.state.carlistState.results" @on-sort-change="changeSort">
        </Table>

        <Page
            :total="$store.state.carlistState.count" show-elevator show-sizer
            :current="$store.state.carlistState.page"
            :page-size="$store.state.carlistState.pagesize"
            :page-size-opts="[5,10,20,50,100]"
            @on-change="changePage"
            @on-page-size-change="changePageSize"
        />

    </div>
</template>
<script>
    export default {
        methods:{
            //页码跳转
            changePage(page){
                this.$store.dispatch("changePage", {page})
            },
            //每页显示数量
            changePageSize(pagesize){
                this.$store.dispatch("changePageSize", {pagesize})
            },
            //排序
            changeSort(a){
                var sortdirection = a.order == "desc" ? -1 : 1;
                this.$store.dispatch("changeSort", {sortby:a.key, sortdirection})
            }
        },
        data(){
            return {
                //key要和读取回来的JSON对象的key一致，将数据显示在表格中
                col: [
                    {title: '编号', key: 'id', sortable: 'custom'},
                    {
                        title: '图片',
                        key: 'images',
                        render(h,{row}){
                            return h({
                                data(){
                                    return {row}
                                },
                                template:"<img width='100' :src='`carimages_small/${row.id}/view/${row.images.view[0]}`' @click='changeShowPic(row)'/>",
                                methods:{
                                    changeShowPic(v){
                                        this.$store.dispatch("changeShowPic", {v:v.id})
                                    }
                                }
                            });
                        }
                    },
                    {title: '品牌', key: 'brand'},
                    {title: '车型', key: 'series'},
                    {title: '价格', key: 'price', sortable: 'custom'},
                    {title: '公里', key: 'km'},
                    {title: '颜色', key: 'color',width:60},
                    {title: '变速箱', key: 'gearbox'},
                    {title: '排放', key: 'environmental'},
                    {title: '排量', key: 'displacement'},
                    {title: '能源', key: 'fuel'},
                    {title: '级别', key: 'type'},
                    {
                        title: '是否上牌', key: 'licence',
                        render(h,{row}){
                            return h({
                                template:`
                                    <div>
                                        <span v-if="${row.licence}">是</span>
                                        <span v-if="${!row.licence}">否</span>
                                    </div>
                                `
                            });
                        }
                    },
                    {
                        title: '是否本地车', key: 'locality',
                        render(h,{row}){
                            return h({
                                template:`
                                    <div>
                                        <span v-if="${row.licence}">是</span>
                                        <span v-if="${!row.licence}">否</span>
                                    </div>
                                `
                            });
                        }
                    },
                ]
            }
        }
    }
</script>