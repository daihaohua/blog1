<template>
	<div style="margin-right: 20px;">
		<div class="content">
			<el-form :model="forms" ref="form" label-width="60px" label-position="left">
				<div>
					<el-form-item label="时间" prop="time">
						<el-date-picker type="date" v-model="forms.time" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
					</el-form-item>
				</div>
				<div>
					<el-form-item label="所属">
						<el-select v-model="forms.classId" placeholder="请选择所属分类">
							<el-option
									v-for="(item,index) in theArticleClassifications"
									:key="index"
									:label="item.classify"
									:value="item._id"
							></el-option>
						</el-select>
					</el-form-item>
				</div>
				<div>
					<el-form-item label="文章名" prop="title">
						<el-input v-model="forms.title" type="text" placeholder="请输入..." size="samll" clearable></el-input>
					</el-form-item>
				</div>
				<div>
					<el-form-item label="描述" prop="content">
						<el-input v-model="forms.describe" type="textarea" placeholder="请输入..." size="samll" clearable></el-input>
					</el-form-item>
				</div>
				<!--图片上传-->
				<div>
					<el-form-item label="封页图" prop="url">
						<el-upload class="uplod"
								   action="/api/upload/activityUpload"
								   accept=""
								   :on-success="handleSuccess"
								   :before-upload="beforeUpload">
							<img v-if="forms.paging" :src="forms.paging" alt="" class="uplodImg">
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</el-form-item>
				</div>
			</el-form>
			<!--富文本编辑器-->
			<div id="wangeditor">
				<div ref="editorElem" style="text-align:left;"></div>
			</div>
			<div slot="footer">
				<el-button
						type="primary"
						@click="saveThePaper('form', type)"
						style="margin-left: 486px;"
						v-text="type==='add'?'添加':'修改'"
				 />
			</div>
		</div>
	</div>
</template>

<script>
    import {ajax} from "../../../api";
    import {addArticle,updateArticle} from "../../../api/adminRouter/article";
    import { Message} from 'element-ui';
    import {mapActions} from 'vuex';
    import E from "wangeditor";
    export default {
        data () {
            return {
                type: 'add',
                editorOption: {},
                forms: {
                    time: '',
                    classId:'',
                    paging: '',
                    title: '',
                    describe: '',
                    content:'',
                },
                theArticleData: [],
                theArticleClassifications:[],
                editor: null,
                editorContent: ''
            }
        },
        methods: {
            ...mapActions(['theArticleClassification']),
            beforeUpload(file) {
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isLt2M) {
                    this.$message.error('上传图片大小不能超过 2MB!');
                }
                return isLt2M;
            },
            handleSuccess(data) {
                this.forms.paging = data.imgName;
                Message({
                    type: data.type,
                    message: data.particulars
                });
            },
            saveThePaper(form) {
                this.$refs[form].validate(async  valid => {
                    if (valid) {
                        //获取富文本的html结构
                        this.forms.content = this.editor.txt.html();
                        let reslut = null;
                        if(this.type === "add"){
                            reslut = await addArticle(this.forms);
						}else{//文章修改
                            reslut= await updateArticle(this.forms);
                        }
                        let {data} = reslut;
                        Message({
                            type: data.type,
                            message: data.particulars
                        });
                        if(!data.code){//添加修改成功调回首页
                            this.$router.push({name:"toViewTheArticle"});
                        }
                        
                    }
                })
            },
            eliminate(){
                this.forms =  {
                    time: '',
                    classId:'',
                    paging: '',
                    title: '',
                    describe: '',
                    content:'',
                }
			},
        },
        computed:{
            CheckTheClassificationData(){
                return this.$store.state.theArticleClassification;
            },
        },
        watch:{
            CheckTheClassificationData(){
                let data = this.$store.state.theArticleClassification;
                this.theArticleClassifications =  data;
            }
        },
		activated(){
            this.eliminate();
            this.editor.txt.clear();
            let index = this.$route.params.index;
            this.type = "add";
			if(index===0 ||index){
			    this.type = "update";
			    let  data = this.$store.state.articleData.articleDate[index];
				this.forms = data;
                this.editor.txt.html(data.content);
                this.forms.classId = data.classId._id;
			}
            this.theArticleClassification();
		},
        mounted() {
            this.editor = new E(this.$refs.editorElem);
            this.editor.customConfig.uploadImgMaxSize = 2 * 1024 * 1024 //上传图片大小；
            this.editor.customConfig.uploadImgMaxLength = 10 //限制上传图片的数量；
            this.editor.customConfig.uploadFileName = 'file'
            this.editor.customConfig.uploadImgParams = {//上传参数；
                token: 'articleContent'
            }
            this.editor.customConfig.withCredentials = true;  //跨域
            this.editor.customConfig.uploadImgServer = '/api/upload/activityContent';
            this.editor.customConfig.uploadImgHooks = {
                customInsert: function (insertImg, result, editor) {
                    let url = result.imgName
                    insertImg(url)
                }
            }
            this.editor.customConfig.menus = [
                // 菜单配置
                'head', // 标题
                'bold', // 粗体
                'fontSize', // 字号
                'fontName', // 字体
                'italic', // 斜体
                'underline', // 下划线
                'strikeThrough', // 删除线
                'foreColor', // 文字颜色
                'backColor', // 背景颜色
                'link', // 插入链接
                'list', // 列表
                'justify', // 对齐方式
                'quote', // 引用
                'emoticon', // 表情
                'image', // 插入图片
                'table', // 表格
                'code', // 插入代码
                'undo', // 撤销
                'redo' // 重复
            ];
            this.editor.create(); // 创建富文本实例
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
