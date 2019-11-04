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
            <!--<div id="pages">-->
                <!--<el-button-->
                        <!--type="primary"-->
                        <!--icon="el-icon-arrow-left"-->
                        <!--id="button-left"-->
                        <!--@click="previous"-->
                        <!--:disabled="page===1?true:false"-->
                <!--&gt;上一页</el-button>-->
                <!--<span>{{page}}/{{maxPage}}</span>-->
                <!--<el-button-->
                        <!--type="primary"-->
                        <!--id="button-right"-->
                        <!--@click="next"-->
                        <!--:disabled="page===maxPage?true:false"-->
                <!--&gt;下一页<i class="el-icon-arrow-right el-icon&#45;&#45;right"></i></el-button>-->
            <!--</div>-->
        </el-main>
        <modify-the-diary ref="xxx"/>
    </div>
</template>

<script>
    import { MessageBox,Message} from 'element-ui';
    import {ajax} from "../../api"
    import {mapActions} from 'vuex'
    import ModifyTheDiary from '@/components/admin/SideBar/ModifyTheDiary'
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
                    let {data} = await ajax("/api/backStage/deleteTheDiary",{_id},"post");
                    Message({
                        type: data.type,
                        message: data.particulars
                    });
                    if(!data.code){//删除成功
                        this.diary(pages);
                    }
                }).catch(() => {
                    Message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //修改
            ClassificationModification(index){
                let data = {};
                data.index = index;
                data.pages = this.page
                this.$refs.xxx.handelTrigger(data)
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
        components:{
            ModifyTheDiary
        }

    }
</script>

<style scoped lang="scss">
    #mian{
        position:relative;
        height: 100%;
    }
    #button-left,#button-right{
        float:left;
        margin-top:20px;
    }
    #button-right{
        float:right;
    }
    #pages{
        position: absolute;
        left:0;
        bottom:0;
        right: 0;
        margin:auto;
        line-height:70px;
        text-align:center;
        font-size: 20px;
    }
</style>