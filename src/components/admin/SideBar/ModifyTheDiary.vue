<template id="">
    <!-- Dialog对话框 -->
    <div class="dialog">
        <el-dialog :visible="dialog" width="800" title="修改" center @close="close">
            <el-form
                    :model="forms"
                    ref="form"
                    label-width="80px"
                    :rules="rules"
                    label-position="left">
                <div>
                    <el-form-item label="日记名" prop="TheDiaryName">
                        <el-input v-model="forms.TheDiaryName" type="text" placeholder="请输入..." size="samll" clearable></el-input>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="修改说说" prop="say">
                        <el-input v-model="forms.say" type="textarea" placeholder="请输入..." size="samll" clearable></el-input>
                    </el-form-item>
                </div>
                <div class="left">
                    <el-form-item label="修改头像" prop="url">
                        <el-upload class="uplod"
                                   action="/api/upload/diary"
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
                <el-button type="primary" @click="updateById('form')" style="margin-left: 486px;">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {ajax} from "../../../api"
    import { Message } from 'element-ui';
    import {mapActions} from 'vuex'
    export default {
        name: "ModifyTheDiary",
        data () {
            return {
                pages: 0,
                dialog: false,
                forms: {
                    TheDiaryName: '',
                    say: '',
                    headPortrait:''
                },
                rules: {
                    TheDiaryName: [
                        { required: true, message: '请输入日记名', trigger: 'blur' },
                        { min: 1, max: 15, message: '长度在 1 到 7个字符', trigger: 'blur' }
                    ],
                    say: [
                        { required: true, message: '说点什么吧!', trigger: 'blur' },
                        { min: 2, max: 100, message: '长度在 5 到 25个字符', trigger: 'blur' }
                    ],
                }
            }
        },
        methods: {
            ...mapActions(['diary']),
            beforeUpload(file) {
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isLt2M) {
                    this.$message.error('上传图片大小不能超过 2MB!');
                }
                return isLt2M;
            },
            handleSuccess(data) {
                this.forms.headPortrait = data.imgName;
                Message({
                    type: data.type,
                    message: data.particulars
                });
            },
            close () {
                this.reset('form');
            },
            reset(form) {
                this.$refs[form].resetFields();
                this.dialog = false;
            },
            handelTrigger(data){
                this.dialog = true;
                this.forms = this.$store.state.diaryData.diaryOfAData[data.index];
                this.pages = data.pages;
            },
            updateById(form) {
                    this.$refs[form].validate(async valid => {
                        if (valid) {
                           let {data} = await ajax('/api/backStage/modifyTheDiary', this.forms,"post")
                                    console.log(data)
                                    Message({
                                        type: data.type,
                                        message: data.particulars
                                    });
                                    this.reset('form');
                                    this.diary(this.pages)
                        }
                    })
            }
        }
    }
</script>
