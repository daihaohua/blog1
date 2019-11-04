<template id="">
    <div id="about">
        <BreadCrumb :breadCrumb="breadCrumb"/>
        <h2>关于我</h2>
        <div class="about-subject" v-for="(item,index) in datas">
            <h3 class="about-description">
                <strong>{{item.name}}</strong>
            </h3>
            <div class="about-content">
                <!--字符串-->
                <p v-if="item.type === 'string'">{{item.content}}</p>
                <!--数组1-->
                <div class="content" v-else-if="item.type === 'Array1'">
                    <ul>
                        <li v-for="(item,index) in item.content" :key="index">
                            * {{item}}
                        </li>
                    </ul>
                </div>
                <!--数组2-->
                <div class="content" v-else-if="item.type === 'Array2'">
                    <ul>
                        <li v-for="(item,index) in item.content" :key="index">
                            {{index+1}}. {{item}}
                        </li>
                    </ul>
                </div>
                <!--换行-->
                <div class="content" v-else-if="item.type === 'lineFeed'">
                   <P v-for="(item,index) in item.content" :key="index">
                       {{item}}
                   </P>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "index",
        data(){
            return{
                datas:[
                    {
                        name:"关于本人",
                        type:"string",
                        content:"我的本名：戴豪华，一个来自于湖南邵阳的白羊座一枚，平时喜欢唱，跳，rap，篮球我更喜欢健和各种的旅游来开阔自己的视野"
                    },
                    {
                        name:"关于数组",
                        type:"Array1",
                        content:["我是谁","我在哪","我要去哪"]
                    },
                    {
                        name:"关于换行",
                        type:"lineFeed",
                        content:["我是谁","我在哪","我要去哪"]
                    }
                ],
                breadCrumb:["关于我"]
            }
        }
    }
</script>

<style scoped lang="scss">
    h1{
        font-family: STKaiti;
        font-size: 35px;
        color:#ccc;
    }
    #about{
        padding:100px;
        background-color: #fff;
        strong{
            font-family: STKaiti;
            font-size: 25px;
        }
        h2{
            font-family: STKaiti;
            width: 200px;
            margin: auto;
        }
        .about-description{
            line-height: 60px;
            border-left:5px solid green;
            background-color: #ccc;
            text-indent: 10px;
        }
        .about-content{
            padding: 30px;
            p,.content{
                text-indent: 20px;
                font-family: STKaiti;
                font-size: 20px;
                background-color: #96a1ac;
                border-radius: 6px;
            }

        }
    }
</style>