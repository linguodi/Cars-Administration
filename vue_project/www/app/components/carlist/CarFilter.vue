<template>
    <div class="carlist">
        <Row>
            <Col span="3">品牌：</Col>
            <Col span="21">
                <CheckboxGroup v-model="brand">
                    <Checkbox label="大众"></Checkbox>
                    <Checkbox label="丰田"></Checkbox>
                    <Checkbox label="奥迪"></Checkbox>
                    <Checkbox label="奔驰"></Checkbox>
                    <Checkbox label="宝马"></Checkbox>
                    <Checkbox label="捷豹"></Checkbox>
                    <Checkbox label="日产"></Checkbox>
                    <Checkbox label="雪佛兰"></Checkbox>
                    <Checkbox label="特斯拉"></Checkbox>
                    <Checkbox label="路虎"></Checkbox>
                    <Checkbox label="标致"></Checkbox>
                    <Checkbox label="MINI"></Checkbox>
                    <Checkbox label="五菱"></Checkbox>
                </CheckboxGroup>
            </Col>
        </Row>

        <Row>
            <Col span="3">级别：</Col>
            <Col span="21">
                <CheckboxGroup v-model="type">
                    <Checkbox label="跑车"></Checkbox>
                    <Checkbox label="经济轿车"></Checkbox>
                    <Checkbox label="中档轿车"></Checkbox>
                    <Checkbox label="高档轿车"></Checkbox>
                    <Checkbox label="中型SUV"></Checkbox>
                    <Checkbox label="大型SUV"></Checkbox>
                </CheckboxGroup>
            </Col>
        </Row>

        <Row>
            <Col span="3">颜色：</Col>
            <Col span="21">
                <CheckboxGroup v-model="color">
                    <Checkbox label="红"></Checkbox>
                    <Checkbox label="黄"></Checkbox>
                    <Checkbox label="灰"></Checkbox>
                    <Checkbox label="绿"></Checkbox>
                    <Checkbox label="蓝"></Checkbox>
                    <Checkbox label="黑"></Checkbox>
                    <Checkbox label="白"></Checkbox>
                    <Checkbox label="橙"></Checkbox>
                    <Checkbox label="紫"></Checkbox>
                    <Checkbox label="银"></Checkbox>
                    <Checkbox label="咖啡"></Checkbox>
                    <Checkbox label="香槟"></Checkbox>
                    <Checkbox label="银灰"></Checkbox>
                </CheckboxGroup>
            </Col>
        </Row>

        <Row>
            <Col span="3">变速箱：</Col>
            <Col span="21">
                <CheckboxGroup v-model="gearbox">
                    <Checkbox label="自动挡"></Checkbox>
                    <Checkbox label="手动挡"></Checkbox>
                    <Checkbox label="手自一体"></Checkbox>
                </CheckboxGroup>
            </Col>
        </Row>

        <Row>
            <Col span="3">环保等级：</Col>
            <Col span="21">
                <CheckboxGroup v-model="environmental">
                    <Checkbox label="国一"></Checkbox>
                    <Checkbox label="国二"></Checkbox>
                    <Checkbox label="国三"></Checkbox>
                    <Checkbox label="国四"></Checkbox>
                    <Checkbox label="国五"></Checkbox>
                </CheckboxGroup>
            </Col>
        </Row>

        <Row>
            <Col span="3">燃料：</Col>
            <Col span="21">
                <CheckboxGroup v-model="fuel">
                    <Checkbox label="柴油车"></Checkbox>
                    <Checkbox label="汽油车"></Checkbox>
                    <Checkbox label="纯电动"></Checkbox>
                    <Checkbox label="油电混合"></Checkbox>
                </CheckboxGroup>
            </Col>
        </Row>

        <Row>
            <Col span="3">排量：</Col>
            <Col span="21">
                <CheckboxGroup v-model="displacement">
                    <Checkbox label="1.0L"></Checkbox>
                    <Checkbox label="1.2L"></Checkbox>
                    <Checkbox label="1.6L"></Checkbox>
                    <Checkbox label="1.6T"></Checkbox>
                    <Checkbox label="2.0L"></Checkbox>
                    <Checkbox label="2.0T"></Checkbox>
                    <Checkbox label="5.0L"></Checkbox>
                </CheckboxGroup>
            </Col>
        </Row>

        <Row>
            <Col span="3">价格：</Col>
            <Col span="10">
                <Slider v-model="price" :max="100" range @on-change="changePrice"></Slider>
            </Col>
            <Col span="11">
                <Button @click="changePrice([0,5])">5万以内</Button>
                <Button @click="changePrice([5,10])">5万~10万</Button>
                <Button @click="changePrice([10,15])">10万~15万</Button>
                <Button @click="changePrice([15,20])">15万~20万</Button>
                <Button @click="changePrice([20,100])">20万以上</Button>
            </Col>
        </Row>

        <Row>
            <Col span="3">公里数：</Col>
            <Col span="10">
                <Slider v-model="km" range @on-change="changeKm"></Slider>
            </Col>
            <Col span="11">
                <Button @click="changeKm([0,5])">5万以内</Button>
                <Button @click="changeKm([5,10])">5万~10万</Button>
                <Button @click="changeKm([10,15])">10万~15万</Button>
                <Button @click="changeKm([15,20])">15万~20万</Button>
                <Button @click="changeKm([20,100])">20万以上</Button>
            </Col>
        </Row>

        <h2>
            <p>根据条件共筛选出{{$store.state.carlistState.count}} 条信息</p>
            <p>当前在第{{$store.state.carlistState.page}} 页</p>
        </h2>
    </div>
</template>
<script>
    export default {
        methods:{
            changePrice(v){
                this.$store.dispatch("changeFilters", {"k":"price", v})
            },
            changeKm(v){
                this.$store.dispatch("changeFilters", {"k":"km", v:v.map(item=>item * 10000)})
            },
            // changeShowPic(v){
            //     this.$store.dispatch("changeShowPic", {v:v.id})
            // }
        },
        watch:{
            //监听data的值变化，然后发出请求，传递参数
            color(v){
                this.$store.dispatch("changeFilters", {"k":"color", v})
            },
            environmental(v){
                this.$store.dispatch("changeFilters", {"k":"environmental", v})
            },
            displacement(v){
                this.$store.dispatch("changeFilters", {"k":"displacement", v})
            },
            fuel(v){
                this.$store.dispatch("changeFilters", {"k":"fuel", v})
            },
            gearbox(v){
                this.$store.dispatch("changeFilters", {"k":"gearbox", v})
            },
            brand(v){
                this.$store.dispatch("changeFilters", {"k":"brand", v})
            },
            type(v){
                this.$store.dispatch("changeFilters", {"k":"type", v})
            }
        },
        data(){
            return {
                color:[],
                environmental:[],
                displacement:[],
                fuel:[],
                gearbox:[],
                brand:[],
                type:[],
                price:[0,100],
                km:[0,100]
            }
        }
    }
</script>