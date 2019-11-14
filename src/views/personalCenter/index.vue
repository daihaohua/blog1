<template id="">
    <div class="personalCenter">
        <el-tabs type="border-card">
            <el-tab-pane label="账号管理">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span><i>{{users.username}}</i>个人名片</span>
                    </div>
                    <div class="text item">
                        <div>
                            {{users.username}}
                        </div>
                        <el-avatar :src="users.headPortrait" :size=80></el-avatar>
                    </div>
                </el-card>
            </el-tab-pane>
            <el-tab-pane label="修改昵称">
                <el-form ref="form" :model="users" label-width="100px">
                    <el-form-item label="之前的名字">
                        <el-input v-model="users.username" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="修改后的名字">
                        <el-input v-model="newName"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="nicknameChange">立即修改</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="修改密码">
                <el-form ref="form" :model="users" label-width="110px">
                    <el-form-item label="输入之前的密码">
                        <el-input v-model="oldPassword"></el-input>
                    </el-form-item>
                    <el-form-item label="修改后的密码">
                        <el-input v-model="NewPassword"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="changePassword">立即修改</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="修改头像">
                <el-form label-width="110px">
                    <el-form-item label="头像修改" prop="url">
                        <el-upload class="uplod"
                                   action="/api/upload/userAccountPictures"
                                   accept=""
                                   :on-success="handleSuccess"
                                   :before-upload="beforeUpload">
                            <img v-if="headPortrait" :src="headPortrait" alt="" class="uplodImg">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="headToModify">立即修改</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import { Message} from 'element-ui';
    import {ajax} from "../../api";
    export default {
        name: "index",
        data(){
            return{
                users:{},
                newName:'',
                oldPassword:'',
                NewPassword:'',
                headPortrait:'',
            }
        },
        methods:{
            async nicknameChange(){//
                let _id = this.users._id;
                let newName = this.newName;
                let {data} = await ajax("/api/home/headToModify",{_id,newName},"post");
                Message({
                    type: data.type,
                    message: data.particulars
                });
                window.location.reload();
            },
            async changePassword(){
                let _id = this.users._id;
                let NewPassword = this.NewPassword
                let {data} = await ajax("/api/home/changePassword",{_id,NewPassword},"post");
                Message({
                    type: data.type,
                    message: data.particulars
                });
            },
            async headToModify(){
                let _id = this.users._id;
                let headPortrait = this.headPortrait
                let {data} = await ajax("/api/home/nicknameChange",{_id,headPortrait},"post");
                Message({
                    type: data.type,
                    message: data.particulars
                });
                window.location.reload();
            },
            beforeUpload(file){
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isLt2M) {
                    this.$message.error('上传图片大小不能超过 2MB!');
                }
                return isLt2M;
            },
            handleSuccess(data){
                this.headPortrait = data.imgName;
                Message({
                    type: data.type,
                    message: data.particulars
                });
            }
        },
        computed:{
            a(){
                return this.$store.state.user
            }
        },
        watch:{
            a(){
                this.users = this.$store.state.user;
                this.oldName = this.$store.state.user.username;
                this.headPortrait = this.$store.state.user.headPortrait;
            }
        },
        activated(){
            this.users = this.$store.state.user;
            this.oldName = this.$store.state.user.username;
            this.headPortrait = this.$store.state.user.headPortrait;
            console.log(this.users)
        }
    }
</script>

<style scoped lang="scss">
    .personalCenter{
        padding: 100px;
        background-color: #fff;
        .text {
            font-size: 14px;
            div{
                text-indent: 10px;
                font-size: 25px;
            }
        }

        .item {
            margin-bottom: 18px;
        }
        .clearfix{
            span{
                i{
                    font-size: 20px;
                }
            }
        }
        .clearfix:before,
        .clearfix:after {
            display: table;
            content: "";
        }
        .clearfix:after {
            clear: both
        }
        .box-card {
            width: 480px;
        }
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
    }
</style>