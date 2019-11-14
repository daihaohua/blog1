<template id="">
    <div id="login">
        <div class="login">
            <el-button
                    type="info"
                    icon="el-icon-arrow-left"
                    circle
                    @click="retreat"></el-button>
            <h2>欢迎来到登录界面</h2>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="姓名" prop="username">
                    <el-input v-model="ruleForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"
                               @click="submitForm('ruleForm')"
                    >提交</el-button>
                    <el-button
                            @click="resetForm('ruleForm')"
                    >注册</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {ajax} from "../../api"
    import { Message } from 'element-ui';
    export default {
        name: "Login",
        data() {
            return {
                ruleForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 5, max: 25, message: '长度在 7 到 25个字符', trigger: 'blur' }
                    ],
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 1, max: 15, message: '长度在 1 到 15个字符', trigger: 'blur' }
                    ],
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (!valid) {
                        return false;
                    }
                    let {data} = await  ajax("/api/LogAndReg/login",this.ruleForm,"post")
                    Message({
                        message: data.particulars,
                        type: data.type
                    })
                    if(!data.errer){//为0登录成功 为1登录失败
                        setTimeout(()=>{
                            this.$router.push("/")
                        },1000)
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                    this.$router.push({
                        name:"register"
                    })
            },
            retreat(){
                this.$router.push("/home")
            }
        }
    }

</script>

<style scoped>
    h2{
        text-align: center;
        margin-top: 0;
    }
    #login{
        height: 100vh;
        background-image: url("../../assets/images/login.jpg");
        background-size: cover;
        background-attachment: fixed;
    }
    .login{
        position:absolute;
        left:0;
        top:0;
        right:0;
        bottom: 0;
        margin:auto;
        border-radius: 7px;
        border: 1px solid #ccc;
        box-shadow: 0 0 80px #ccc;
        padding:20px;
        width:600px;
        height:270px;

    }
</style>
