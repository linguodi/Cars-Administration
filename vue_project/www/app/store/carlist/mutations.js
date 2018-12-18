export default {
    changeResults(state,payload){
        state.carlistState.results = payload.results;
    },
    changeCount(state,payload){
        state.carlistState.count = payload.count;
    },
    //改变页码
    changePage(state,payload){
        state.carlistState.page = payload.page;
    },
    //改变每页数量
    changePageSize(state,payload){
        state.carlistState.pagesize = payload.pagesize;
    },
    //排序
    changeSort(state,payload){
        state.carlistState.sortby = payload.sortby;
        state.carlistState.sortdirection = payload.sortdirection;
    },
    changeFilters(state,payload){
        //如果相等，k不改，只改v
        state.carlistState.filters = state.carlistState.filters.map(item=>item.k == payload.k ? {...item ,v:payload.v}: item);
    },
}