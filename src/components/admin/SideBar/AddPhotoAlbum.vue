<template id="">
    <!-- Dialog对话框 -->
    <div class="dialog">
        <el-dialog
                :visible="dialog"
                width="800"
                :title="title==='add'?'添加':'修改'" center @close="close">
            <el-form
                    :model="forms"
                    ref="form"
                    label-width="80px"
                    :rules="rules"
                    label-position="left">
                <div>
                    <el-form-item label="相册名" prop="TheAlbumName">
                        <el-input v-model="forms.TheAlbumName" type="text" placeholder="请输入..." size="samll" clearable></el-input>
                    </el-form-item>
                </div>
                <div class="left">
                    <el-form-item label="相册封页" prop="headPortrait">
                        <el-upload class="uplod"
                                   action="/api/upload/photoAlbum"
                                   accept=""
                                   :on-success="handleSuccess"
                                   :before-upload="beforeUpload">
                            <img v-if="forms.headPortrait" :src="forms.headPortrait" alt="" class="uplodImg">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                </div>
            </el-form>
            <div slot="footer">
                <el-button type="warning" @click="reset('form')">取 消</el-button>
                <el-button type="primary" @click="addPhotoAlbum ('form')" style="margin-left: 486px;">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {ajax} from "../../../api"
    import { Message } from 'element-ui';
    import {mapActions} from 'vuex'
    export default {
        name: "AddPhotoAlbum",
        data () {
            return {
                pages: 0,
                dialog: false,
                title:'添加',
                forms: {
                    TheAlbumName: '',
                    headPortrait:'',
                    deleteImgName:''
                },
                rules: {
                    TheAlbumName: [
                        { required: true, message: '请输入相册名', trigger: 'blur' },
                        { min: 1, max: 15, message: '长度在 1 到 15个字符', trigger: 'blur' }
                    ],
                }
            }
        },
        methods: {
            ...mapActions(['getPhotoAlbum']),
            beforeUpload(file) {
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isLt2M) {
                    this.$message.error('上传图片大小不能超过 2MB!');
                }
                return isLt2M;
            },
            handleSuccess(data) {
                this.forms.headPortrait = data.imgName;
                this.forms.deleteImgName = data.deleteImgName;
                Message({
                    type: data.type,
                    message: data.particulars
                });
            },
            handleRemove(){

            },
            close () {
                this.reset('form');
            },
            reset(form) {
                this.$refs[form].resetFields();
                this.dialog = false;
            },
            handelTrigger(parameter){
                this.dialog = true;
                this.title = parameter.title;
                if(parameter.data){
                    this.forms = parameter.data
                }

            },
            async addPhotoAlbum(form) {
                this.$refs[form].validate(async valid => {
                    if (valid) {
                        if(this.title==='add'){
                            let {data} = await ajax('/api/backStage/addPhotoAlbum', this.forms,"post")
                            Message({
                                type: data.type,
                                message: data.particulars
                            });
                            this.reset('form');
                            this.getPhotoAlbum(this.pages)
                        }else{
                            let {data} = await ajax('/api/backStage/modifyThePhotoAlbum', this.forms,"post")
                            Message({
                                type: data.type,
                                message: data.particulars
                            });
                            this.reset('form');
                            this.getPhotoAlbum(this.pages)
                        }
                    }
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .uplod{
        width: 178px;
        height: 178px;
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .uplodImg{
        width: 178px;
        height: 178px;
        display: block;
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
</style>