<template>
	<div class="register_container">
		<div class="register_box">
			<div class="welcome_title">欢迎注册家庭财务管理系统 </div>
			<div class="title_mes"> 
				已有账号，去
				<button @click="registertologin" class="btn_retologin">登录</button>
			</div>
			
			<!-- 注册表单区域 -->
			<el-form ref="registerFormRef" :model="registerForm" label-width="80px" label-position="top" class="from_register">
				
				<el-form-item label="用户名">
					<el-input v-model="registerForm.userName">工资</el-input>
				</el-form-item>						
							
				<el-form-item label="密码">
					<el-input v-model="registerForm.password">年龄</el-input>
				</el-form-item>

				<el-form-item label="工资">
					<el-input v-model="registerForm.wage">工资</el-input>
				</el-form-item>						
			
				<el-form-item label="年龄">
					<el-input v-model="registerForm.userAge">年龄</el-input>
				</el-form-item>			
					
				<el-form-item label="消费额度">
					<el-input v-model="registerForm.consumptionQuota">消费额度</el-input>
				</el-form-item>			
			
				<el-form-item label="家庭角色">
					<el-select placeholder="请选择家庭角色" v-model="registerForm.familyName">
						<el-option label="父亲" value="父亲"></el-option>
						<el-option label="母亲" value="母亲"></el-option>
						<el-option label="儿子" value="儿子"></el-option>
						<el-option label="女儿" value="女儿"></el-option>
						<el-option label="祖父" value="祖父"></el-option>
						<el-option label="祖母" value="祖母"></el-option>
					</el-select>
				</el-form-item>
				
				<!-- 按钮区域 -->
				<el-form-item class="btn_lr" style="margin-top: 40px;">
					<el-button type="primary" plain style="margin-right: 30px;" @click="registertologin">确认注册</el-button>
					<!-- <el-button type="info" plain @click="resetForm('registerForm')">重置</el-button> -->
				</el-form-item>
			</el-form>	
			<div class="check_regRules">
				<!-- `checked` 为 true 或 false -->
				<el-checkbox v-model="checked">阅读并接受《家庭理财系统用户协议及隐私权保护声明》</el-checkbox>
			</div>		
		</div>		
	</div>
	
</template>

<script>
		
	export default{
		data() {
		      return {
				  registerForm:{
						userName:'',
						password:'',
						wage:'',
						userAge:'',
						consumptionQuota:'',
						familyName:'',
				  },
				
				checked: true
		      };
		    },
		methods:{
		/*
			resetForm(formName){ 
				if (this.$refs[formName]!==undefined) {
			     	this.$refs[formName].resetFields(); 
				}
				
			},*/
			registertologin(){
				const that = this
				this.$axios({
					method:"post",
					url:'/family/UserController/register',
					dataType:'JSONP',
					params:{
						username:this.registerForm.userName,
						password:this.registerForm.password,
						wage:this.registerForm.wage,
						userage:this.registerForm.userAge,
						consumptionquota:this.registerForm.consumptionQuota,
						familyname:this.registerForm.familyName
					}
				}).then(function(response){
					console.log(response);
					if(response.data.code == 0){
						that.$message.success('注册成功');
						that.$router.push({path:'/userlogin'});
					}
				}).catch(function(error){
					that.$message.error('请输入内容');
					console.log('error submit!!');
				})
			}
			
		}
	}
</script>

<style scoped>
	.register_container{
		background-color: #F4F5EE;
		background-image: url("https://www.transparenttextures.com/patterns/dust.png");
		height: 100%;
		width: 100%;
		background-size: 100% 100%;
		position: fixed;
		overflow-y: auto; /*纵向如果内容超出则会显示滚动条*/
		overflow-x: hidden; /*横向隐藏*/
	}
	
	.register_box{
		width: 500px;
		height: 900px;
		background-color: aliceblue;
		border-radius: 10px;
		position: absolute;
		left: 50%;
		top: 350px;
		transform: translate(-50%,-30%);
		margin-bottom: 100px;
	}
	.from_register{
		/*position: absolute;*/
		bottom: 0px;
		width: 100%;
		padding: 10px 50px;
		box-sizing: border-box; /*不设置是默认的，框会超出表单*/
	}
	.from_register >>> .el-form--label-top.el-form-item__label {
	    float: none;
	    display: inline-block;
	    text-align: left;
	    padding: 0 0 1px;
	}
	.from_register >>>.el-form-item {
	
	    margin-bottom: 2px;
	}
		
	.from_register >>>.el-input .el-input__inner{
		background-color: #FFFFFF;
		padding: 0px 210px 0px 15px;
	}
	.welcome_title{
		width: 500px;
		height: 80px;
		margin: 50px 0 -25px 0;
		color: #000000;
		font-size: 30px;
		text-align: center;
		
	}
	.title_mes{
		margin-left: 70px;
	}
	.btn_retologin{
		color: blue;
		border: none;
		background-color: transparent;
	}
	.check_regRules{
		margin-top: 30px;
		margin-left: 70px;
	}

</style>
