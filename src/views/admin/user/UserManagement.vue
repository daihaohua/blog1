<template id="">
    <div id="mian">
		 <el-main>
        <el-table
          :data="BackStageData"
          border>
          <el-table-column
            prop="_id"
            label="_id">
          </el-table-column>
          <el-table-column
            prop="username"
            label="用户名">
          </el-table-column>
          <el-table-column
            label="是否管理员">
            <template slot-scope="scope">
              <el-button 
					type="primary" 
					icon="el-icon-check" 
					circle
					v-if="BackStageData[scope.$index].isAdmin"
					></el-button>
              <el-button 
					type="danger" 
					icon="el-icon-close" 
					circle
					v-if="!BackStageData[scope.$index].isAdmin"
					></el-button>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作">
            <template slot-scope="scope">
              <el-button
                type="danger"
                icon="el-icon-delete"
                circle
                @click="userDelete(scope.$index)"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <button-btn 
	  		:page="page" 
			:maxPage="maxPage"
			@previous = "previous"
			@next = "next"
		/>
      </el-main>
	</div>
</template>

<script>
	import { MessageBox,Message} from 'element-ui';
	import {userPages} from '../../../api/adminRouter/user';
	import {mapState} from 'vuex';
    export default {
        name: "UserManagement",
		data(){
			return{
				BackStageData:[],
				page:1,
				maxPage:1,
			}
		},
		methods:{
          //分页上一页
          async previous(){
            let pagee = this.page - 1;
            let {data} = await userPages({pages:pagee});
            await this.$store.commit("BackStageData",data);
		  },
		  
          //分页下一页
          async next(){
            let pagee = this.page + 1;
            let {data} = await userPages({pages:pagee});
			await this.$store.commit("BackStageData",data);
		  },
		  
          // 删除操作
          async userDelete(index){
			let _id = this.BackStageData[index]._id
			  MessageBox.confirm('是否删除该用户', '操作',{
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				  type: 'warning'
				}).then(async () => {
					// //拿到删除后的数据
					let {data} = await userPages({pages:this.page,_id});
					await this.$store.commit("BackStageData",data);
					Message({
						type: 'success',
						message: '删除成功!'
					});
				}).catch(()=>{})
		  },
		  //获取vuex中数据函数
		  getData(){
			let {userData,page,maxPage} = this.BackStageDatas;
				this.BackStageData =  userData;
				this.page = page;
				this.maxPage = maxPage;
		 	}
        },
		computed:{
			...mapState(["BackStageDatas"]),
			userDatas(){
				return this.BackStageDatas;
			}
		},
		watch:{
			userDatas(){
				this.getData();
			}
		},
		activated(){
			this.getData();
		},
    }
</script>

<style scoped lang="scss">
	#mian{
		height: 100%;
	}
</style>