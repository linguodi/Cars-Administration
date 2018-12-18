var path = require("path");
var fs = require("fs");
var Mock = require("mockjs");
var Random = Mock.Random;

//基数据地址
var jishuju = path.resolve(__dirname, "基数据.json");
//存储生成文件的地址
var monishuju = path.resolve(__dirname, "模拟数据.txt");


//先删除旧数据
fs.writeFileSync(monishuju, "")
console.log("模拟数据.txt已清空，下面为你生成新的")
//读取基数据
fs.readFile(jishuju, function(err,data){
    var data = JSON.parse(data.toString());

    //遍历100项，添加一些新的属性值
    for(var i = 0;i < data.length;i++){
        data[i].price = Random.integer(0,100); //售价
        data[i].km = Random.integer(0,100); //公里数
        data[i].owner = Random.cname();   //卖家姓名
        //模拟车辆购买时间
        data[i].buydate = new Date(new Date() - Random.integer(86400000 ,86400000 * 365 * 10)); //公里数
        //排量
        data[i].engine = Random.pick(['1.4L','1.6L','1.5T','1.6T','1.8L','2.0L'])
        data[i].local = Random.boolean(); //是否本地车
        data[i].pai = Random.boolean(); //是否上牌

        fs.appendFileSync(monishuju, JSON.stringify(data[i]) + "\n\r")
    }
    console.log("模拟数据写入成功，快打开txt看看吧！")
})


