<template id="">
    <div id="mian">
        <div style="text-align: center;padding: 8px 0;">
            <span style="font-size: 16px;color: #67C23A;padding: 0 8px;">添加~</span>
            <el-button icon="el-icon-plus" type="success" class="add" @click="add()" plain circle></el-button>
        </div>
        <el-main>
            <el-table
                    :data="data"
                    border>
                <el-table-column
                        prop="_id"
                        label="_id">
                </el-table-column>
                <el-table-column
                        prop="TheAlbumName"
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
                        <el-button
                                type="primary"
                                icon="el-icon-upload"
                                circle
                                @click="uploadPictures (scope.$index)"></el-button>

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
        <add-photo-album ref="xxx"/>
    </div>
</template>

<script>
    import { MessageBox,Message} from 'element-ui';
    import {deletePhoto} from "../../../api/adminRouter/photo";
    import {mapActions,mapState} from 'vuex';
    import AddPhotoAlbum from '@/components/admin/SideBar/AddPhotoAlbum';
    export default {
        name: "ShowPhotoAlbum",
        data(){
            return{
                data:[],
                page:1,
                maxPage:1,
            }
        },
        methods:{
            ...mapActions(['getPhotoAlbum']),
            //分页上一页
            async previous(){
                let pages = this.page - 1;
                this.getPhotoAlbum(pages);
            },
            //分页下一页
            async next(){
                let pages = this.page + 1;
                this.getPhotoAlbum(pages);
            },
            // 删除操作
            async ClassificationDelete(index){
                let _id = this.data[index]._id;
                let pages = this.page;
                MessageBox.confirm('是否删除该用户', '操作',{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    // //拿到删除后的数据
                    let {data} = await deletePhoto({_id});
                    Message({
                        type: data.type,
                        message: data.particulars
                    });
                    if(!data.code){//删除成功
                        this.getPhotoAlbum(pages);
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
                let parameter = {};
                parameter.title = "update"
                parameter.data = this.data[index];
                this.$refs.xxx.handelTrigger(parameter)
            },
            add(){//添加
                let parameter = {};
                parameter.title = "add"
                this.$refs.xxx.handelTrigger(parameter)
            },
            uploadPictures(index){ //相册添加照片
                let PhotoAlbumId = this.data[index]._id;
                this.$router.push({name:'addAPhotoAlbum',params:{PhotoAlbumId}});
            }
        },
        computed:{
            ...mapState(["getPhotoAlbumData"]),
            CheckTheClassificationData(){
                return this.getPhotoAlbumData;
            },
        },
        watch:{
            CheckTheClassificationData(){
                let {getPhotoAlbumData,page,maxPage} = this.getPhotoAlbumData;
                this.data =  getPhotoAlbumData;
                this.page = page;
                this.maxPage = maxPage;
            }
        },
        activated(){
            this.getPhotoAlbum();
        },
        components:{
            AddPhotoAlbum,
        }
    }
</script>

<style scoped lang="scss">
    #mian{
        height: 100%;
    }
</style>