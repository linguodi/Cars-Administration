export default {
    page:1,
    pagesize:5,
    sortby:"id",
    sortdirection:1,
    count:0,
    results:[], //存放请求回来的数据
    filters:[
        {"k":"color", "v":[] },
        {"k":"environmental", "v":[]},
        {"k":"displacement", "v": []},
        {"k":"price", "v":[]},
        {"k":"km", "v":[]},
        {"k":"type", "v":[]},
        {"k":"gearbox", "v":[]},
        {"k":"brand", "v":[]},
        {"k":"fuel", "v":[]}
    ]
}