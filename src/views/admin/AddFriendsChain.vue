<template id="">
        <div class="content clearfix">
    <el-form
            :model="friendshipData" status-icon
            :rules="rules" ref="friendshipData"
            label-width="100px"
            class="demo-ruleForm">
        <!--头像上传-->
        <div class="left">
            <el-form-item label="上传头像" prop="url">
                <el-upload class="uplod"
                           action="/api/upload/friendLink"
                           accept=""
                           :on-success="handleSuccess"
                           :before-upload="beforeUpload">
                    <img v-if="friendshipData.headPortrait" :src="friendshipData.headPortrait" alt="" class="uplodImg">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
        </div>
        <div class="right">
            <el-form-item label="友链名" prop="linksName">
                <el-input v-model="friendshipData.linksName"></el-input>
            </el-form-item>
            <el-form-item label="友链接" prop="say">
                <el-input
                        v-model="friendshipData.AFriendLink"
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="友链描述" prop="describe">
                <el-input  v-model="friendshipData.describe" autocomplete="off"></el-input>
            </el-form-item>
        </div>
        <div class="bottom">
            <el-form-item>
                <el-button type="primary"
                           @click="submitForm('friendshipData')"
                >添加</el-button>
                <el-button
                        @click="resetForm('friendshipData')"
                >重置</el-button>
            </el-form-item>
        </div>
    </el-form>
</div>
</template>

<script>
    import {ajax} from "../../api"
    import { Message } from 'element-ui';
    export default {
        name: "addFriendsChain",
        data(){
            return{
                type:'add',
                friendshipData: {
                    linksName: '',
                    describe: '',
                    headPortrait: '',
                    AFriendLink:''
                },
                rules: {
                    linksName: [
                        { required: true, message: '请输入友链名', trigger: 'blur' },
                        { min: 1, max: 7, message: '长度在 1 到 7个字符', trigger: 'blur' }
                    ],
                    describe: [
                        { required: true, message: '请输入友链描述', trigger: 'blur' },
                        { min: 5, max: 25, message: '长度在 5 到 25个字符', trigger: 'blur' }
                    ],
                }
            }
        },
        methods: {
            beforeUpload(file) {
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isLt2M) {
                    this.$message.error('上传图片大小不能超过 2MB!');
                }
                return isLt2M;
            },
            handleSuccess(data) {
                this.friendshipData.headPortrait = data.imgName;
                Message({
                    type: data.type,
                    message: data.particulars
                });
            },
            saveThePaper(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (!valid) {//验证不成功直接return出去
                        return;
                    }

                });
            },
            submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (!valid) {//验证不成功直接return出去
                        return;
                    }
                    let {data} = await ajax("/api/backStage/friendsOfTheChain", this.friendshipData,"post")
                        Message({
                            type: data.type,
                            message: data.particulars
                        });
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.friendshipData.headPortrait = "";
            },
        },
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