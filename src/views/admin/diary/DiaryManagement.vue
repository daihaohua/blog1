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
                <el-form-item label="日记头像" prop="headPortrait">
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
                    >{{type ==="add"?"添加":"修改"}}</el-button>
                    <el-button
                            @click="resetForm('diaryData')"
                    >重置</el-button>
                </el-form-item>
            </div>
        </el-form>
    </div>
</template>

<script>
    import {addDiary,updateDiary} from "../../../api/adminRouter/diary"
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
                    _id:''
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
        activated(){
             const {say,TheDiaryName,headPortrait,_id} = this.$route.params;
             if(say){//有就是修改
                this.type = "update"
                this.diaryData.say = say;
                this.diaryData.TheDiaryName = TheDiaryName;
                this.diaryData.headPortrait = headPortrait;
                this.diaryData._id = _id;
             }else{//没有就是删除
                this.type = "add"
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
            submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (!valid) return;
                    let result = null;
                    if(this.type === "add"){ //添加
                        result = await addDiary(this.diaryData);
                    }else{//修改
                        result = await updateDiary(this.diaryData);
                    }
                    let {data} = result;
                    Message({
                        type: data.type,
                        message: data.particulars
                    });
                    if(!data.code){
                        this.$refs[formName].resetFields();
                        this.diaryData.headPortrait = "";
                        this.$router.push("/backStage/checkTheDiary");
                    }
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