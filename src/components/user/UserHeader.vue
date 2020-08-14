<template>
	<!-- 头部区域 -->
	  <el-header style="height: 120px;">
		  <!-- 图标、名称 -->
		  <div style="margin-bottom: 20px;">
			  <img src="../../assets/feimg/logo_login.png" style="width: 98px; height: 98px;"/>
			  <span>家庭理财系统</span>
		  </div>
		  <!-- 导航选项 -->
		  <div class="nav_header">
			  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
				<el-menu-item index="1" @click="userToHome">首页</el-menu-item>
				<el-submenu index="2">
				  <template slot="title">收支信息管理</template>
				  <el-menu-item index="2-1" @click="userIncomeMsg">收入信息管理</el-menu-item>
				  <el-menu-item index="2-2" @click="userPayMsg">支出信息管理</el-menu-item>
				  
				</el-submenu>
				<el-menu-item index="3" @click="userToReportForm">查看报表</el-menu-item>
				
				<!--
				<el-dropdown-menu slot="dropdown">
				    <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
				</el-dropdown-menu>
				-->
				<el-submenu index="4">
				  <template slot="title">个人中心</template>
				  <el-menu-item index="4-1" @click="personalMsg">个人信息</el-menu-item>
				  <el-menu-item index="4-2" @click="showUpdatePwdDia">修改密码</el-menu-item>
				  <el-menu-item index="4-3" @click="loginout" >退出登录</el-menu-item>
				  <el-menu-item index="4-4" @click="logout">注销账号</el-menu-item>
				</el-submenu>
			  </el-menu>
			</div> 
			 
			 <!--修改密码对话框对话框-->
			 <el-dialog title="修改密码" :visible.sync="dialogFormVisibleUpd">
			   <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
				 
				 <el-form-item label="新密码" prop="newPassword"
				 :label-width="formLabelWidth">
					<el-col :span="20">
					   <el-input 
						   v-model="ruleForm.newPassword" 
						   placeholder="请输入新密码"
						   id="newkey"
						   type="password"
						   autocomplete="off">
					   </el-input>
					</el-col>
				 </el-form-item>
				 
				 <el-form-item label="重复新密码" prop="checkNewPassword"
				 :label-width="formLabelWidth">
					<el-col :span="20">
						<el-input 
						   v-model="ruleForm.checkNewPassword" 
						   placeholder="请再次输入新密码"
						   id="newkey"
						   type="password"
						   autocomplete="off">
					   </el-input>
					</el-col>
				 </el-form-item>
				 
			   </el-form>
			   <div slot="footer" class="dialog-footer">
			     <el-button @click="dialogFormVisibleUpd = false">取 消</el-button>
			     <el-button type="primary" @click="updateUserPwd()">确 定</el-button>
			   </div>
			 </el-dialog>
	  </el-header>
	  
	  
</template>

<script>
	export default {
		name:'UserHeader',
	    data() {
			//验证两次密码是否一致
		  var validatePass2 = (rule,value,callback)=>{
			  if(value===""){
				  callback(new Error("请再次输入密码"));
			  }
			  else if(value !== this.ruleForm.newPassword){
				  callback(new Error("两次输入密码不一致"));
			  }
			  else{
				  callback();
			  }
		  };
	      return {
			userid:'',  
	        activeIndex: '1',
	        activeIndex2: '1',
			dialogFormVisibleUpd:false,
			formLabelWidth: '150px',
			ruleForm:{},//修改密码的表单
			rules:{
				newPassword:[
					{
						trigger:"blur",
						message:"请输入密码"
					}
				],
				chechNewPassword:[
					{
						validator:validatePass2,
						trigger:"blur"
					}
				]
			}
	      };
	    },
		computed: {
			userId() {
			    let userId = localStorage.getItem('myuserid');
			    return userId ? userId : this.userid;
			}
		},
	    methods: {
	      handleSelect(key, keyPath) {
	        console.log(key, keyPath);
	      },
		  userToHome(){
			  this.$router.push({path:'/userhome'})
		  },
		  userToReportForm(){
			  this.$router.push({path:'/reportform'})
		  },
		  userIncomeMsg(){
			  this.$router.push({path:'/userincomemsg'})
		  },
		  userPayMsg(){
			  this.$router.push({path:'/userpaymsg'})
		  },
		  
		  personalMsg(){
			  this.$router.push({path:'/personalinformation'})
		  },
		  updateUserPwd(){
			this.dialogFormVisibleUpd=false
			this.$axios({
				method:"get",
				url:'family/UserInfoController/updateUserPassword',
				dataType:'JSONP',
				params:{
					userId:this.userId,
					password:this.ruleForm.newPassword,
				}
			}).then(res=>{
				if(res.data.code===0){
					this.$message({
						message:"修改成功",
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
		  showUpdatePwdDia(){
			  this.dialogFormVisibleUpd=true;
			  //this.$router.push({path:'/updatepassword'})
		  },
		  loginout(){
			  localStorage.removeItem('myuserid');
			  localStorage.removeItem("user");
			  this.$router.push('/index');
		  },
		  logout(){
				const that = this;
				this.$axios({
				method:"get",
				url:'family/UserInfoController/deleteUser',
				dataType:'JSONP',
				params:{
					userId:this.userId,
				}
				}).then(res=>{
					if(res.data.code===0){
						that.$router.push('/');	
						localStorage.removeItem('myuserid');
						localStorage.removeItem("user");
						that.$message({ message:"注销成功",type:"success"});
					}
					else{
						that.$message({message:"注销失败",type:"error"});
					}
					});
			},	
		
		  
	    }
	  }

</script>

<style lang="less">
	.el-header{
		width: 100%;
		padding: 0 80px 0 50px;
		background-color: white;
		display: flex;
		justify-content: space-between;
		
		align-items: center;
		color: #EC7541;
		font-size: 25px;
		position: absolute;
		top: 0px;
		
		> div {
			display: flex;
			align-items: center;
			span {
				margin-left: 20px;
			}
		}
	} 
	.el-footer {
	    background-color: #EC7541;
		display: flex;
		justify-content: center;
		line-height: 60px;
		position: absolute;
		bottom: 0px;
		left: 0px;
		width: 100%;
	   
	}
	
	.nav_header/deep/.el-menu-item{
		font-size: 20px;
		color: #303133;
		padding: 0 30px;
		cursor: pointer;
		transition: border-color .3s,background-color .3s,color .3s;
		box-sizing: border-box;
		
	}  
	
	.nav_header/deep/.el-submenu__title {
		font-size: 20px;
		color: #303133;
		padding: 0 30px;
		cursor: pointer;
		transition: border-color .3s,background-color .3s,color .3s;
		box-sizing: border-box;
	}
	
	.nav_header{
		margin-left: 500px;
	}
		
</style>
