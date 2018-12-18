export default {
    async init({commit,state}){
        var id = state.picshowState.id; //获取state中的车辆id
        //异步请求用户id车辆的信息（8080跨3000）
        var {info} = await fetch("/api/cars/" + id).then(data=>data.json());
        var carlike = await fetch("/api/carlike/" + id).then(data=>data.json());

        //拿到数据后，去改变state中的数据
        commit("changeInfo", {info})
        commit("changeCarlike", {carlike})
    },

    goNext({commit,state}){
        var _state = state.picshowState;
        if(_state.idx < _state.info.images[_state.album].length - 1){
            commit("changeIdx", {"idx":_state.idx + 1});
        }else{
            commit("changeIdx", {"idx":0});
            if(_state.album == 'view'){
                commit("changeAlbum", {album:'inner'})
            }else if(_state.album == 'inner'){
                commit("changeAlbum", {album:'engine'})
            }else if(_state.album == 'engine'){
                commit("changeAlbum", {album:'more'})
            }else if(_state.album == 'more'){
                commit("changeAlbum", {album:'view'});
            }
        }
    },
    goPrev({commit,state}){
        var _state = state.picshowState;
        if(_state.idx > 0){
            commit("changeIdx", {"idx":_state.idx - 1});
        }else{
            var arr = ['view','inner','engine','more']
            var type = arr.indexOf(_state.album); //检查数组中是否存在
            type = type <= 0 ? 3 : type - 1;
            var nowAlbum = arr[type];//选择数组中的类型

            commit("changeIdx", {"idx":_state.info.images[nowAlbum].length - 1});
            commit("changeAlbum", {album:nowAlbum})
            console.log(type)
            console.log(nowAlbum)

                }
    },
    async changeId({commit,state}, {id}){
        var {info} = await fetch("/api/cars/" + id).then(data=>data.json());
        var carlike = await fetch("/api/carlike/" + id).then(data=>data.json());

        //拿到数据后，去改变state中的数据
        commit("changeInfo", {info});
        commit("changeCarlike", {carlike});

        //修改id
        commit("changeId", {id});
        //视图回到外观，页码归一
        commit("changeIdx", {idx:0});
        commit("changeAlbum", {album:'view'});
    },
    async changeShowPic({commit,state}, {v}){

        var {info} = await fetch("/api/cars/" + v).then(data=>data.json());
        var carlike = await fetch("/api/carlike/" + v).then(data=>data.json());

        commit("changeInfo", {info});
        commit("changeCarlike", {carlike});

        commit("changeShowPic", {isShowPic:true});
        commit("changeId",{id:v});
        commit("changeAlbum",{album:'view'});
        commit("changeIdx", {idx:0});

    }
}