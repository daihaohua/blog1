<template id="">
    <el-dialog title="分类修改" :visible.sync="dialogFormVisible">
        <el-form>
            <el-form-item label="修改类名" :label-width="formLabelWidth">
                <el-input v-model="modified" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="handelClick">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import { MessageBox,Message} from 'element-ui';
    import {classUpdate} from "../../../api/adminRouter/classify";
    import {mapActions} from 'vuex'
    export default {
        name: "ModifyTheClassification",
        data() {
            return {
                dialogFormVisible: false,//弹框
                modified:"",//新数据
                old:"", //旧数据
                formLabelWidth: '120px',
                pages:1 //页码
            };
        },
        methods: {
            ...mapActions(['getCategoricalData']),
            headelClose(classData){
                this.old =this.modified= classData.classify;
                this.pages = classData.pages;
                this.dialogFormVisible =true;
            },
            async handelClick(){
                if(this.old === this.modified){
                    Message({
                        type: "error",
                        message: "类名不能相同"
                    });
                    return;
                }
                let old = this.old;
                let modified = this.modified;
                let {data} = await classUpdate({old,modified});
                if(!data.code){//修改成功
                    this.getCategoricalData(this.pages);
                    this.dialogFormVisible =false;
                }
                Message({
                    type: data.type,
                    message: data.particulars
                });
            }
        },
    }
</script>