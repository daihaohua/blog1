<template id="">
    <div id="about">
        <BreadCrumb :breadCrumb="breadCrumb"/>
        <h2>关于我</h2>
        <div class="about-subject" v-for="(item,index) in datas" :key="index">
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
                       <a href="" target="_blank"></a>
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
                        content:`
                            我的本名：戴豪华，一个来自于湖南邵阳的白羊座一枚，平时喜欢唱，跳，rap，
                            篮球我更喜欢健和各种的旅游来开阔自己的视野,我希望通过自己的努力，成为一名优秀的
                            前端开发工程师，不辜负自己所付出的一切。
                        `
                    },
                    {
                        name:"我的爱好",
                        type:"Array1",
                        content:["打篮球","旅游","滑冰",'闲逛','等等的一些稀奇古怪的想法']
                    },
                    {
                        name:"关于博客",
                        type:"string",
                        content:`
                           我的博客前后端分离的，使用了vue+node+mongodb+nginx完成上线的一个个人博客系统,
                           前端使用了elements框架的一些插件,后台是用了node的express框架完成的。
                        `
                    },
                    {
                        name:"联系方式",
                        type:"lineFeed",
                        content:["QQ:2634793105","github:https://daihaohua.github.io/"]
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
            border-left:5px solid #4a95e3;
            background-color: #e7eaf1;
            text-indent: 10px;
        }
        .about-content{
            padding: 30px;
            p,.content{
                text-indent: 20px;
                font-family: STKaiti;
                font-size: 20px;
                font-weight: bold;
                background-color: #e7eaf1;
                border-radius: 6px;
                padding: 10px;
            }

        }
    }
</style>