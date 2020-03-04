<template id="">
    <div id="mian">
        <el-main>
            <el-table
                    :data="diaryOfADatas"
                    border>
                <el-table-column
                        prop="_id"
                        label="_id">
                </el-table-column>
                <el-table-column
                        prop="TheDiaryName"
                        label="日记名">
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
                                type="primary"
                                icon="el-icon-edit"
                                circle
                                @click="ClassificationModification(scope.$index)"></el-button>
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
    import {mapActions} from 'vuex';
    import {diaryPages} from "../../../api/adminRouter/diary"
    export default {
        name: "AddADiary",
        data(){
            return{
                diaryOfADatas:[],
                page:1,
                maxPage:1,
            }
        },
        methods:{
            ...mapActions(['diary']),
            //分页上一页
            async previous(){
                let pages = this.page - 1;
                this.diary(pages);
            },
            //分页下一页
            async next(){
                let pages = this.page + 1;
                this.diary(pages);
            },
            // 删除操作
            async ClassificationDelete(index){
                let _id = this.diaryOfADatas[index]._id;
                let pages = this.page;
                MessageBox.confirm('是否删除该用户', '操作',{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    // //拿到删除后的数据
                    let {data} = await diaryPages({_id});
                    Message({
                        type: data.type,
                        message: data.particulars
                    });
                    if(!data.code){//删除成功
                        this.diary(pages);
                    }
                }).catch(() => {});
            },
            //修改
            ClassificationModification(index){
                let params = this.diaryOfADatas[index];
                this.$router.push({ name:"diaryManagement", params})//只有name才能传递params数据
            }
        },
        computed:{
            CheckTheClassificationData(){
                return this.$store.state.diaryData;
            },
        },
        watch:{
            CheckTheClassificationData(){
                let {diaryOfAData,page,maxPage} = this.$store.state.diaryData;
                this.diaryOfADatas =  diaryOfAData;
                this.page = page;
                this.maxPage = maxPage;
            }
        },
        activated(){
            this.diary();
        },
    }
</script>

<style scoped lang="scss">
    #mian{
        height: 100%;
    }
</style>