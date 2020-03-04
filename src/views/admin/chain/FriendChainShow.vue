<template id="">
    <div id="mian">
        <el-main>
            <el-table
                    :data="forALinkData"
                    border>
                <el-table-column
                        prop="_id"
                        label="_id">
                </el-table-column>
                <el-table-column
                        prop="linksName"
                        label="友链名">
                </el-table-column>
                <el-table-column
                        prop="created"
                        label="时间">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作">
                    <template slot-scope="scope">
                        <el-button
                                type="danger"
                                icon="el-icon-delete"
                                circle
                                @click="ClassificationDelete (scope.$index)"></el-button>
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
    import {chainDelete} from "../../../api/adminRouter/chain";
    import {mapActions} from 'vuex'
    export default {
        name: "FriendChainShow",
        data(){
            return{
                forALinkData:[],
                classify:"",
                page:1,
                maxPage:1,
            }
        },
        async activated(){
            this.forALink();
        },
        methods:{
            ...mapActions(['forALink']),
            //分页上一页
            async previous(){
                let pages = this.page - 1;
                this.forALink(pages);
            },
            //分页下一页
            async next(){
                let pages = this.page + 1;
                this.forALink(pages);
            },
            // 删除操作
            async ClassificationDelete(index){
                let _id = this.forALinkData[index]._id;
                let pages = this.page;
                MessageBox.confirm('是否删除该用户', '操作',{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    // //拿到删除后的数据
                    let {data} = await chainDelete({_id});
                    Message({
                        type: data.type,
                        message: data.particulars
                    });
                    if(!data.code){//删除成功
                        this.forALink(pages);
                    }
                }).catch(() => {});
            },
        },
        computed:{
            CheckTheClassificationData(){
                return this.$store.state.forALinkData;
            },
        },
        watch:{
            CheckTheClassificationData(){
                let {forALinkData,page,maxPage} = this.$store.state.forALinkData;
                this.forALinkData =  forALinkData;
                this.page = page;
                this.maxPage = maxPage;
            }
        },
    }
</script>

<style scoped lang="scss">
    #mian{
        height: 100%;
    }
</style>