<template id="">
    <div class="leaveAMessages">
        <BreadCrumb :breadCrumb="breadCrumb"/>
        <div>
            <el-input
                    type="textarea"
                    :rows="8"
                    placeholder="请留言"
                    class="textArea"
                    v-model="textArea">
            </el-input>
            <div class="clearfix">
                <el-button
                        type="primary"
                        class="leaveAMessage "
                        @click="handelLeaveAMessage"
                >留言</el-button>
            </div>
            <div class="latest">
                <h3 class="subtitle"><i class="el-icon-position"></i>留言榜</h3>
                <div class="latest-particulars clearfix"
                     v-for="(item,index) in LeaveAMessagesData"
                     :key="index"
                >
                    <div class="latest-img">
                        <el-avatar
                                shape="square"
                                :size="60"
                                fit="fill"
                                :src="item.headPortrait"></el-avatar>
                    </div>
                    <div class="latest-content">
                        <h4>{{item.username}}</h4>
                        <p>{{item.textArea}}</p>
                        <div>
                            <p class="created">{{new Date(item.created).toLocaleString()}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <button-btn 
            :page="page" 
            :maxPage="maxPage"
            @previous = "previous"
            @next = "next"
		/>
    </div>
</template>

<script>
    import {addLeaveAMessage,getLMessage} from "../../api/homeRouter"
    import {Message} from 'element-ui';
    import {mapState} from 'vuex';
    export default {
        name: "index",
        data(){
            return{
                breadCrumb:["留言馆"],
                textArea:'',
                LeaveAMessagesData:[],
                page:1,
                maxPage:1,
            }
        },
        computed:{
            ...mapState(["user"])
        },
         activated(){
            this.getLeaveAMessage();
        },
        methods:{
            async handelLeaveAMessage(){
                //头像 名字 内容 文章_id;
                let LeaveAMessage = {};
                LeaveAMessage.textArea = this.textArea;
                LeaveAMessage.username = this.user.username;
                LeaveAMessage.headPortrait = this.user.headPortrait;
                if(!LeaveAMessage.username){
                    Message.error("你还没有登录,请先登录")
                    this.$router.push("/login");
                    return;
                }
                if(!LeaveAMessage.textArea){
                    Message.info("客官,发表不能为空哦！！！")
                    return;
                }
                let {data} = await addLeaveAMessage(LeaveAMessage);
                this.getLeaveAMessage();
                Message({
                    type: data.type,
                    message: data.particulars
                });
                this.textArea='';
            },
            async getLeaveAMessage(pages){//获取留言数据
                let {data} = await  getLMessage({pages});
                let {LeaveAMessagesData,page,maxPage} = data;
                this.LeaveAMessagesData =  LeaveAMessagesData;
                this.page = page;
                this.maxPage = maxPage;
            },
            previous(){
                let pages = this.page - 1;
                this.getLeaveAMessage(pages);
            },
            next(){
                let pages = this.page + 1;
                this.getLeaveAMessage(pages);
            }
        },
    }
</script>

<style scoped lang="scss">
    .leaveAMessages {
        position: relative;
        padding: 100px;
        background-color: #fff;
        .textArea{
            font-size: 20px;
        }
        .leaveAMessage{
            float: right;
            width: 100px;
            margin-top: 20px;
        }
        .latest{
            background-color: #fff;
            border-radius: 6px;
            .subtitle{
                border-bottom: 1px solid #ccc;
                padding: 10px;
                border-left: 3px solid blue;
            }
            .latest-particulars{
                padding:10px 10px;
                border-top:1px solid #ccc;
                .latest-img{
                    float: left;
                    width: 70px;
                    height: 70px;
                }
                .latest-content{
                    font-family: STKaiti;
                    h4{
                        font-size: 20px;
                    }
                    p{
                        font-size: 22px;
                    }
                    div{
                        text-align: right;
                        p{
                            font-size: 18px;
                        }
                        .created{
                            display: inline-block;
                            font-weight: 700;
                            border-radius: 6px;
                            padding: 7px;
                            color: #f4f4f4;
                            background-color: cornflowerblue;
                        }
                    }

                }
            }
        }
    }
</style>