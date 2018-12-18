async function load(commit,state){
    var page = state.carlistState.page;
    var pagesize = state.carlistState.pagesize;
    var sortby = state.carlistState.sortby;
    var sortdirection = state.carlistState.sortdirection;

    var filters = state.carlistState.filters;
    //将{"k":"color", "v":["红"] }, 变为&color=["红"]形式
    var str = "";
    for(var i = 0;i < filters.length; i++){
        if(filters[i].v.length != 0){
            str += "&" + filters[i].k + "=" + JSON.stringify(filters[i].v);
        }
    }
    console.log(str)
    //请求
    var {count,results} = await fetch(`/api/cars?page=${page}&pagesize=${pagesize}&sortby=${sortby}&sortdirection=${sortdirection}${str}`).then(data=>data.json());

    //存储
    commit("changeResults", {results});
    commit("changeCount", {count});
}

export default {
    async carlist_init({commit,state}){
        await load(commit,state)
    },
    async changePage({commit,state},{page}){
        commit("changePage",{page}); //改变page
        await load(commit,state);
    },
    async changePageSize({commit,state},{pagesize}){
        commit("changePageSize",{pagesize}); //改变page
        commit("changePage",{page:1});  //页码归一
        await load(commit,state);
    },
    async changeSort({commit,state},{sortby,sortdirection}){
        commit("changeSort",{sortby,sortdirection});
        await load(commit,state);
    },
    async changeFilters({commit,state},{k,v}){
        commit("changeFilters", {k,v});
        commit("changePage",{page:1});  //页码归一
        await load(commit,state);
    }
}