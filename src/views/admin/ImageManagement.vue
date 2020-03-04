<template id="">
    <div>
        <div id="slide-show">
            <h3>轮播图上传区
                <el-button type="primary" @click="uploadImg">上传图片</el-button>
            </h3>
            <div class="slide-show-img">
                <el-upload
                        action="/api/upload/slideShow"
                        list-type="picture-card"
                        :limit= "7"
                        :on-success="handleSuccess"
                        :on-exceed="exceed"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </div>
            <h3>图片展示区</h3>
            <div class="slide-show-imgS">
                    <img
                            v-for="(item,index) in img"
                            :src="item.imgName"
                            :key="index"
                            @click="handelClick(index)"
                            alt=""
                            class="uplodImg">
            </div>
            <el-dialog title="删除" :visible.sync="dialogTableVisible">
                <img width="100%" :src="deleteDialogImg.imgName" alt="">
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogTableVisible = false">取 消</el-button>
                    <el-button type="primary" @click="deleteSlideShowImg">删除</el-button>
                </div>
            </el-dialog>
        </div>

    </div>
</template>

<script>
    import {Message} from "element-ui"
    import {deleteSlideShowImg,uploadImg} from "../../api/adminRouter/leaveMessage"
    import {mapActions,mapState} from 'vuex'
    export default {
        name: "ImageManagement",
        data() {
            return {
                dialogImageUrl: '',
                dialogVisible: false,
                img:[],
                imgDate:[],
                dialogTableVisible: false,
                deleteDialogImg:''
            };
        },
        methods: {
            ...mapActions(['getPhoto']),
            handleRemove(file, fileList) {
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            exceed(){
                Message.error("上传的图片最多为7张")
            },
            handleSuccess(data){
                this.imgDate.push(data)
            },
            handelClick(index){
                this.dialogTableVisible =true;
                this.deleteDialogImg = this.img[index];
            },
            async deleteSlideShowImg(){
                
                let {data} = await deleteSlideShowImg(this.deleteDialogImg);
                Message({
                    type: data.type,
                    message: data.particulars
                });
                this.dialogTableVisible = false;
                this.getPhoto();
            },
            async uploadImg(){
                if(this.imgDate.length !== 0){
                    let {data} = await uploadImg(this.imgDate);
                    Message({
                        type: data.type,
                        message: data.particulars
                    });
                    this.getPhoto();
                }
            }
        },
        computed:{
            ...mapState(["getPhotoData"]),
            CheckTheClassificationData(){
                return this.getPhotoData;
            },
        },
        watch:{
            CheckTheClassificationData(){
                this.img = this.getPhotoData;
            }
        },
        activated(){
            this.getPhoto();
        },
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
            height: 200px;
            border: 1px solid #ccc;
            margin: 5px 0;
            border-radius: 6px;
        }
        .uplodImg{
            width: 178px;
            height: 178px;
            display: inline-block;
            margin-left: 10px;
        }
    }
</style>