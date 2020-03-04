<template id="">
    <div id="slide-show">
        <h3>图片展示区</h3>
        <div class="slide-show-imgS">
            <el-upload class="uplod"
                       action="/api/upload/photoAlbum/addData"
                       :data = {PhotoAlbumId}
                       accept=""
                       drag
                       :on-success="handleSuccess"
                       :before-upload="beforeUpload">
                <img v-if="headPortrait" :src="headPortrait" alt="" class="uplodImg">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <div id="picture-presentation">
                <ul>
                    <li v-for="(item,index) in imgDate"
                        :key="index"
                        @click="handelClick(index)">
                        <img
                            :src="item.imgName"
                            class="uplodImg">
                    </li>
                </ul>
            </div>
        </div>
        <el-dialog title="删除" :visible.sync="dialogTableVisible">
            <img width="100%" :src="deleteDialogImg.imgName" alt="">
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogTableVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteSlideShowImg">删除</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {addPhotoList} from "../../../api/adminRouter/photo"
    import { Message } from 'element-ui';
    import {mapActions} from 'vuex'
    export default {
        name: "AddAPhotoAlbum",
        data(){
            return{
                dialogImageUrl: '',
                dialogVisible: false,
                PhotoAlbumId:'',
                imgDate:[],
                dialogTableVisible: false,
                deleteDialogImg:'',
                headPortrait:''
            }
        },
        methods: {
            ...mapActions(['photoData']),
            handelClick(index){//展示一张图片
                this.dialogTableVisible=true;
                this.deleteDialogImg = this.imgDate[index];
                // console.log()
            },
            async deleteSlideShowImg(){
                let {data} = await addPhotoList(this.deleteDialogImg);
                Message({
                    type: data.type,
                    message: data.particulars
                });
                this.dialogTableVisible = false;
                this.photoData(this.PhotoAlbumId);
            },
            beforeUpload(file) {
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isLt2M) {
                    this.$message.error('上传图片大小不能超过 2MB!');
                }
                return isLt2M;
            },
            handleSuccess(data) {
                this.imgDate.push(data);
                Message({
                    type: data.type,
                    message: data.particulars
                });
                this.photoData(this.PhotoAlbumId);
            },
        },
        computed:{
            CheckTheClassificationData(){
                return this.$store.state.photoAlbumData;
            },
        },
        watch:{
            CheckTheClassificationData(){
                this.imgDate = this.$store.state.photoAlbumData;
            }
        },
        activated(){
            this.PhotoAlbumId = this.$route.params.PhotoAlbumId;
            if(!this.PhotoAlbumId){//判断
                this.$router.push({name:'showPhotoAlbum'})
                return;
            }
            this.photoData(this.PhotoAlbumId);
        }
    }
</script>

<style scoped lang="scss">
    #slide-show{
        height: 500px;
        h3{
            padding: 10px;
            background-color: #f4f4f4;
            border-left: 5px solid skyblue;
        }
        .slide-show-img,.slide-show-imgS{
            padding: 10px;
            height: 600px;
            border: 1px solid #ccc;
            margin: 5px 0;
            border-radius: 6px;
            #picture-presentation{
                border: 1px solid #ccc;
                ul{
                    li{
                        width: 178px;
                        display: inline-block;
                        border: 1px solid #ccc;
                        padding: 10px;
                        border-radius: 6px;
                        margin: 6px;
                        cursor: pointer;
                        img{
                            width: 100%;
                            height: 100%;
                            border-radius: 6px;
                        }
                    }
                }
            }
        }
        .uplod{
            width: 360px;
            height: 180px;
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }
        .avatar-uploader-icon{
            font-size: 28px;
            color: #8c939d;
            width: 178px;
            height: 178px;
            line-height: 178px;
            text-align: center;
        }
        .editor{
            margin-bottom: 20px;
        }
    }
</style>