<template id="">
    <div id="mian">
        <el-main>
            <el-table
                    :data="LeaveAMessagesData"
                    border>
                <el-table-column
                        prop="_id"
                        width="230"
                        label="_id">
                </el-table-column>
                <el-table-column
                        prop="username"
                        width="160"
                        label="用户名">
                </el-table-column>
                <el-table-column
                        prop="textArea"
                        label="留言">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        width="80"
                        label="操作">
                    <template slot-scope="scope">
                        <el-button
                                type="danger"
                                icon="el-icon-delete"
                                circle
                                @click="userDelete(scope.$index)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <button-btn 
                :page="page" 
                :maxPage="maxPage"
                @previous = "previous"
                @next = "next"
		    />
        </el-main>
    </div>
</template>

<script>
    import { MessageBox,Message} from 'element-ui';
    import {deleteMassage,getMassage} from "../../api/adminRouter/leaveMessage"
    export default {
        name: "MessageManagement",
        data(){
            return{
                LeaveAMessagesData:[],
                page:1,
                maxPage:1,
            }
        },
         activated(){
           this.getLeaveAMessage()
        },
        methods:{
            //分页上一页
            async previous(){
                let pages = this.page - 1;
                this.getLeaveAMessage(pages);
            },
            //分页下一页
            async next(){
                let pages = this.page + 1;
                this.getLeaveAMessage(pages);
            },
            // 删除操作
            async userDelete(index){
                let _id = this.LeaveAMessagesData[index]._id
                MessageBox.confirm('是否删除该用户', '操作',{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    let {data} = await deleteMassage({_id});
                    Message({
                        type: data.type,
                        message: data.particulars
                    });
                    this.getLeaveAMessage();
                }).catch(() => {});
            },
            async getLeaveAMessage(pages){
                let {data} = await getMassage({pages,limit:6});
                let {LeaveAMessagesData,page,maxPage} = data;
                this.LeaveAMessagesData =  LeaveAMessagesData;
                this.page = page;
                this.maxPage = maxPage;
            },
        },
    }
</script>

<style scoped lang="scss">
    #mian{
        height: 100%;
    }
</style>