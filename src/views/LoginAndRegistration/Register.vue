<template id="">
    <div id="login">
        <div class="login">
            <el-button
                    type="info"
                    icon="el-icon-arrow-left"
                    circle
                    @click="retreat"></el-button>
            <el-form
                    :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="ruleForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="confirmPassword">
                    <el-input type="password" v-model="ruleForm.confirmPassword" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"
                               @click="submitForm('ruleForm')"
                    >注册</el-button>
                    <el-button
                            @click="resetForm('ruleForm')"
                    >重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {register} from "../../api/homeRouter"
    import { Message } from 'element-ui';
    export default {
        name: "Register",
        data() {
            return {
                ruleForm: {
                    username: '',
                    password: '',
                    confirmPassword: '',
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 1, max: 7, message: '长度在 1 到 7个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 5, max: 25, message: '长度在 5 到 25个字符', trigger: 'blur' }
                    ],
                    confirmPassword:[
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 5, max: 25, message: '长度在 5 到 25个字符', trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (!valid) {//验证不成功直接return出去
                        return false;
                    }
                    //前台验证成功之后到后台验证
                    let {data} = await register(this.ruleForm);
                    Message({
                        message: data.particulars,
                        type: data.type
                    })
                    this.deleteData("ruleForm");
                    if(!data.errer){//是0保存成功 是1保存失败
                         this.$router.push({name:"login"})
                    }
                });
            },
            resetForm(formName) {
                this.deleteData("ruleForm");
            },
            retreat(){
                this.deleteData("ruleForm");
                this.$router.go(-1)
            },
            deleteData(formName){
                this.$refs[formName].resetFields();
            }
        },
        activated(){
            let isUsername = this.$store.state.user;
            if(isUsername.username){//用户没有登录;
                this.$router.replace("/");
                return;
            }
        }
    }
</script>

<style scoped>
    #login{
        height: 100vh;
        background-image: url("../../assets/images/rags.jpg");
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
