export default {
    changeInfo(state,payload){
        //将请求回来的车辆信息赋值给全局仓库
        state.picshowState.info = payload.info;
    },
    changeAlbum(state,payload){
        state.picshowState.album = payload.album;
    },
    changeIdx(state,payload){
        state.picshowState.idx = payload.idx;
    },
    changeCarlike(state,payload){
        state.picshowState.carlike = payload.carlike;
    },
    changeId(state,payload){
        state.picshowState.id = payload.id;
    },
    changeShowPic(state,payload){
         state.picshowState.isShowPic = payload.isShowPic;
    }
}