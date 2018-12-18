var express = require("express");
var fs = require("fs");
var url = require("url");
var app = express();
var mongoose = require("mongoose");

//引入Car数据库表结构
var Car = require("./models/Car.js");

//连接数据库
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/ershouche", {useMongoClient:true})

//【根据id查询相似车，相似车的意思：品牌一样，车系一样】
app.get("/carlike/:id",function(req,res){
    var id = req.params.id;

    //先从数据库查询当前id的品牌和车系
    Car.find({id}).exec(function(err,data){
        var brand = data[0].brand;
        var series = data[0].series;

        //再次查询，寻找id不是这辆车，并且品牌是这个车的品牌，车系也是这个车的车系
        Car.find({"id":{"$not":{"$eq":id}},brand, series}).exec(function(err,data){
            res.json({"results":data})
        })
    })
})

//【显示当前id的车的信息】
app.get("/cars/:id", function(req,res){
    var id = req.params.id;
    Car.find({id}).exec(function(err,data){
        res.json({"info":data[0]}); //因为data是数组，这个id的车只有一辆
    })
});

//【排序和筛选车辆接口】
app.get("/cars",function(req,res){
    var obj = url.parse(req.url, true).query;
    var page = obj.page;  //页码
    var pagesize = obj.pagesize;  //每页数量
    var sortby = obj.sortby;   //排序条件
    var sortdirection = obj.sortdirection; //排序条件 1正序 -1倒序


    var dbObj = {}

    if(obj.color){
        dbObj.color = JSON.parse(obj.color);
    }

    if(obj.environmental){
        dbObj.environmental = JSON.parse(obj.environmental);
    }

    if(obj.displacement){
        dbObj.displacement = JSON.parse(obj.displacement);
    }

    if(obj.type){
        dbObj.type = JSON.parse(obj.type);
    }
    if(obj.gearbox){
        dbObj.gearbox = JSON.parse(obj.gearbox);
    }
    if(obj.brand){
        dbObj.brand = JSON.parse(obj.brand);
    }
    if(obj.fuel){
        dbObj.fuel = JSON.parse(obj.fuel);
    }

    if(obj.price) {
        var priceArr = JSON.parse(obj.price);
        dbObj.price = {"$gte": priceArr[0], "$lte": priceArr[1] }
    }

    if(obj.km) {
        var kmArr = JSON.parse(obj.km);
        dbObj.km = {"$gte": kmArr[0], "$lte": kmArr[1] }
    }

    Car.count(dbObj).exec(function(err,count){
        //skip()  跳转指定数量的数据，接受一个数字参数作为跳过的记录条数
        //limit(2) 读取指定数量
        //sort()   排序
        //skip和limit方法顺序每页要求，不管怎么防止，执行顺序都是先sort 后skip 最后limit
        Car.find(dbObj).sort({[sortby]:sortdirection}).skip(pagesize * (page-1)).limit(pagesize).exec(function(err,data){
            res.json({
                count:count,
                results:data
            })
        })
    })
})

app.listen(3000,function(){
    console.log(3000)
});
