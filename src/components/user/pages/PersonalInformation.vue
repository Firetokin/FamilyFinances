<template>
<<<<<<< HEAD
	
</template>

<script>
	
</script>

<style>
	
</style>
=======
	<el-container>
		<el-header>
			<u-header></u-header>
		</el-header>
		
		
		<el-main>
			<div class="userform_container">
				
				<div class="div_userform">
					
					<div class="userMessage">
						<el-form >
						 <el-form-item >
						    <div class="block">
						        <span>个人信息</span>
						    </div>
							 <img src="../../../assets/img/img.jpg" class="user-avator" alt /> 
						  </el-form-item>
						</el-form>
					</div>
					
					
					<!-- 个人详细信息-->
					<div class="query_user">
						
						<div class="btn_user">
							<ul >
								  <el-button type="primary" plain @click="showUpdateUserDia()">修改用户信息</el-button>								
							</ul>
						</div>
						
						<div class="user_boxs">
							
							
						</div>
						
						
					</div>	
				</div>
			</div>
			
			<!--修改个人信息对话框-->
			<el-dialog title="修改用户信息" :visible.sync="dialogFormVisibleUpd">
			  <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
							 
				<el-form-item label="用户名" prop="userName"
					:label-width="formLabelWidth">
					<el-col :span="20">
						<el-input 
						v-model="ruleForm.newPassword" 
						id="newkey"
						type="text"
						autocomplete="off">
						</el-input>
					</el-col>
				</el-form-item>
							 
				<el-form-item label="家庭称呼" prop="familyName"
					:label-width="formLabelWidth">
					<el-col :span="20">
						<el-input 
						v-model="ruleForm.familyName" 
						id="newkey"
						type="text"
						autocomplete="off">
						</el-input>
					</el-col>
				</el-form-item>
				
				<el-form-item label="工资" prop="wage"
					:label-width="formLabelWidth">
					<el-col :span="20">
						<el-input 
						v-model="ruleForm.wage" 
						id="newkey"
						type="text"
						autocomplete="off">
						</el-input>
					</el-col>
				</el-form-item>
				
				<el-form-item label="年龄" prop="userAge"
					:label-width="formLabelWidth">
					<el-col :span="20">
						<el-input 
						v-model="ruleForm.userAge" 
						id="newkey"
						type="text"
						autocomplete="off">
						</el-input>
					</el-col>
				</el-form-item>
				
				<el-form-item label="余额" prop="consumptionQuota"
					:label-width="formLabelWidth">
					<el-col :span="20">
						<el-input 
						v-model="ruleForm.consumptionQuota" 
						id="newkey"
						type="text"
						autocomplete="off">
						</el-input>
					</el-col>
				</el-form-item>
							 
			  </el-form>
			  <div slot="footer" class="dialog-footer">
			    <el-button @click="dialogFormVisibleUpd = false">取 消</el-button>
			    <el-button type="primary" @click="updateUser()">确 定</el-button>
			  </div>
			</el-dialog>
			
		</el-main>
		
		<!-- 底部 -->
		<el-footer>
			<u-footer></u-footer>
		</el-footer>
			
	</el-container>
</template>

<script>
	import UserHeader from '../UserHeader.vue'
	import UserFooter from '../UserFooter.vue'
	export default{
		name:'ReportForm',
		data() {
		      return {
				  dialogFormVisibleUpd:false,
				  formLabelWidth: '150px',
				  ruleForm:{},//修改密码的表单
		      };
		    },
		components:{
			'u-header':UserHeader,
			'u-footer':UserFooter
			
		},
		methods: {
			updateUser(){
						this.dialogFormVisibleUpd=false
						this.$axios.get('UserInfoController/updateUserInfo',{
							params:{userId:this.userId},
							params:{userName:this.ruleForm.userName},
							params:{famliyName:this.ruleForm.famliyName},
							params:{wage:this.ruleForm.wage},
							params:{userAge:this.ruleForm.userAge},
							params:{consumptionQuota:this.ruleForm.consumptionQuota},
						}).then(res=>{
							if(res.data.code===0){
								this.$message({
									message:"保存成功",
									type:"success"
								});
							}
							else{
								this.$message({
									message:"修改失败",
									type:"error"
								});
							}
						});
						
			},
			showUpdateUserDia(){
			  			  this.dialogFormVisibleUpd=true;
			  			  //this.$router.push({path:'/updatepassword'})
			},
		    }
	}
</script>

<style lang="less">
	.userform_container{
		margin: 70px 0 0 -20px;
		background-color: #F4F5EE;
		background-image: url("https://www.transparenttextures.com/patterns/dust.png");
		height: 100%;
		width: 100%;
		background-size: 100% 100%;
		position: fixed;
		overflow-y: auto; /*纵向如果内容超出则会显示滚动条*/
		overflow-x: hidden; /*横向隐藏*/
		padding-left: 150px;
	}
	.div_userform{
		background-color: aliceblue;
		width: 700px;
		height: 800px;
		position: absolute;
		top: 20%;
		left: 50%;
		transform: translate(-60%,-10%);
	}
	.userMessage{
		margin-top: 50px;
		position: absolute;
		left: 50%;
		transform: translate(-50%,0);
	}
	.block{
		> span{
			width: 200px;
			height: 30px;
			display: inline-block;
			text-align:left;
			font-size: 25px;
			margin-left: 70px;
		}
	}
	.user-avator {
	    width: 100px;
	    height: 100px;
	    border-radius: 50%;
		margin-top: 35px;
		margin-left: -120px;
	}
	.query_user{
		width: 600px;
		height: 700px;
		position: absolute;
		top: 180px;
		bottom: 10px;
		left: 50px;
	}
	.user_boxs{
		width: 600px;
		height: 500px;
		background-color: #ffffff;
	}
	.btn_user{
		margin-left: 460px;
		margin-bottom: 25px;
	}
	
</style>
>>>>>>> a9c121d46ce810e7ed533e0a892f9d670d0f8e86
