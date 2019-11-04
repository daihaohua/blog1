<template id="">
    <div class="content">
        <el-form
                :model="diaryData"
                status-icon
                :rules="rules"
                ref="diaryData"
                label-width="100px"
                class="demo-ruleForm">
            <!--头像上传-->
            <div class="left">
                <el-form-item label="日记头像" prop="url">
                    <el-upload class="uplod"
                               action="/api/upload/diary"
                               accept=""
                               :on-success="handleSuccess"
                               :before-upload="beforeUpload">
                        <img v-if="diaryData.headPortrait" :src="diaryData.headPortrait" alt="" class="uplodImg">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
            </div>
            <div class="right">
                <el-form-item label="日记名" prop="TheDiaryName">
                    <el-input v-model="diaryData.TheDiaryName"></el-input>
                </el-form-item>
                <el-form-item label="说说什么" prop="say">
                    <el-input
                            type="textarea"
                            :rows="2"
                            v-model="diaryData.say"
                            autocomplete="off"></el-input>
                </el-form-item>
            </div>
            <div class="bottom">
                <el-form-item>
                    <el-button type="primary"
                               @click="submitForm('diaryData')"
                    >添加</el-button>
                    <el-button
                            @click="resetForm('diaryData')"
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
        name: "diaryManagement",
        data(){
            return{
                type:'add',
                diaryData: {
                    TheDiaryName: '',
                    say: '',
                    headPortrait: '',
                },
                rules: {
                    TheDiaryName: [
                        { required: true, message: '请输入日记名', trigger: 'blur' },
                        { min: 1, max: 7, message: '长度在 1 到 7个字符', trigger: 'blur' }
                    ],
                    say: [
                        { required: true, message: '说点什么吧!', trigger: 'blur' },
                        { min: 2, max: 100, message: '长度在 5 到 25个字符', trigger: 'blur' }
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
                this.diaryData.headPortrait = data.imgName;
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
                    let {data} = await ajax("/api/backStage/addADiary", this.diaryData,"post")
                    Message({
                        type: data.type,
                        message: data.particulars
                    });
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.diaryData.headPortrait = "";
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