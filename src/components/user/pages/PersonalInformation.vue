<template>
	<el-container>
		<el-header>
			<u-header></u-header>
		</el-header>
		
		
		<el-main>
			<div class="userform_container">
				<div class="div_userform">			
					<!--1.面包屑-->
					<el-breadcrumb separator="/" class="users_bread">
						<el-breadcrumb-item style="font-size: 20px;">
							<i class="el-icon-user"></i> 个人中心
						</el-breadcrumb-item>
						<el-breadcrumb-item style="font-size: 20px;">个人信息</el-breadcrumb-item>
					</el-breadcrumb>
					
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
							<div class="user-info">
							    <div class="user-info-cont">
									<tr >
										<div class="user-info-list" >用户名:</div>
										<div class="user-info-list2" >{{userinfo.username}}</div>
									</tr>
									<tr>
										<div class="user-info-list">称呼:</div>
										<div class="user-info-list1">{{userinfo.familyname}}</div>
									</tr>
									<tr>
										<div class="user-info-list">工资:</div>
										<div class="user-info-list1">{{userinfo.wage}}</div>
									</tr>
									<tr>
										<div class="user-info-list">年龄:</div>
										<div class="user-info-list1">{{userinfo.userage}}</div>
									</tr>
									<tr>
										<div class="user-info-list">余额:</div>
										<div class="user-info-list1">{{userinfo.consumptionquota}}</div>
									</tr>
							    </div>
							</div>
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
						v-model="ruleForm.userName" 
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
				  query:{},  
				  dialogFormVisibleUpd:false,
				  formLabelWidth: '150px',
				  ruleForm:{},//修改密码的表单
		      };
		    },
			computed: {
			    userinfo() {
			        let userinfo = JSON.parse(localStorage.getItem("user"));
			        return userinfo ? userinfo:this.query;
			    }
			},
		components:{
			'u-header':UserHeader,
			'u-footer':UserFooter
			
		},
		methods: {
			updateUser(){
						this.dialogFormVisibleUpd=false
						this.$axios({
							method:"get",
							url:'family/UserInfoController/updateUserInfo',
							dataType:'JSONP',
							params:{
								userId:this.userinfo.userid,
								userName:this.ruleForm.userName,
								familyName:this.ruleForm.familyName,
								wage:this.ruleForm.wage,
								userAge:this.ruleForm.userAge,
								consumptionQuota:this.ruleForm.consumptionQuota,
							}
						}).then(res=>{
							if(res.data.code===0){
								this.getNewUserMessage();
								this.$message({ message:"修改成功",type:"success"});
							}
							else{
								this.$message({message:"修改失败",type:"error"});
							}
						});
						
			},
			
			getNewUserMessage(){
				const that = this;
				this.$axios({
					method:"get",
					url:'/family/UserInfoController/findUserInfo',
					dataType:'JSONP',
					params:{
						userId:this.userinfo.userid
					}
				}).then(res=>{
					if(res.data.code===0){
						localStorage.setItem('user', JSON.stringify(res.data.data));
						that.$router.push({path:'/personalinformation'});
					}
					else{
						this.$message({message:"数据请求失败",type:"error"});
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
		width: 500px;
		height: 500px;
		margin-left: 40px;
		margin-top: 40px;
		background-color: #ffffff;
	}
	.btn_user{
		margin-left: 460px;
		margin-bottom: 25px;
	}
	.user-info-list {
	    font-size: 20px;
	    color: #999;
	    line-height: 42px;
		margin-left: 50px;
		letter-spacing: 5px;
		float: left;
		
	}
	.user-info-list1{
		font-size: 20px;
		color: #999;
		line-height: 42px;
		margin-left: 80px;
		letter-spacing: 5px;
		float: left;
		
	}
	.user-info-list2{
		font-size: 20px;
		color: #999;
		line-height: 42px;
		margin-left: 50px;
		letter-spacing: 5px;
		float: left;
		
	}
	
	.user-info-list span {
	    margin-left: 70px;
	}
	.users_bread{
		margin-top: -30px;
		margin-left: 8px;
	}
	.user-info-cont{
		position: absolute;
		left: 50%;
		transform: translate(-50%,0);
		margin-top: 50px;
		margin-left: -35px;
	}
	.user-info-cont tr{
		height: 60px;
	}
</style>

