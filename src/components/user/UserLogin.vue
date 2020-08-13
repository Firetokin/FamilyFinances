<template>
	<div class="login_container">
		<div class="login_box">
			<div class="avater_box">
				<!-- 头部logo -->
				<img src="../../assets/feimg/logo_login.png" alt="" class="avater_img"/>
			</div>
			<!-- 登录表单区 -->
			<el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="form_login">
				<!-- 用户名 -->
				<el-form-item prop="userName">
					<el-input v-model="loginForm.userName" prefix-icon="iconfont icon-yonghuguanli"></el-input>
				</el-form-item>
				
				<!-- 密码 -->
				<el-form-item prop="password">
					<el-input v-model="loginForm.password" type="password" prefix-icon="iconfont icon-suoping"></el-input>
				</el-form-item>
				
				<!-- 按钮区域 -->
				<el-form-item class="btn_lr">
					<el-button type="primary" @click="userLogin" plain style="margin-right: 50px;">登录</el-button>
					<el-button type="info" @click="resetLoginFrom" plain>重置</el-button>
				</el-form-item>
			</el-form>
			
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				//这是登录表单的数据绑定对象
				loginForm:{
					userName:'',
					password:''
				},
				//这是表单的验证规则对象
				loginFormRules:{
					userName:[
						{ required: true, message: '请输入用户名', trigger: 'blur' },
						{ min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
					],
					password:[
						{ required: true, message: '请输入密码', trigger: 'blur' },
						{ min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
					]
				}
			}	
		},
		methods:{
			//点击重置
			resetLoginFrom(){
				//console.log(this);
				this.$refs.loginFormRef.resetFields();
			},
			//点击登录，预验证
			/*userLogin(){
				 this.$router.push({path:'/userhome'})
				
				this.$refs['LoginFormRef'].validate(async (valid) => {
				    if (valid) {
				        const {data:res} = await this.$http.post('login',this.loginForm)
				        if (res.meta.status==200){
				            this.$message({
								message:'登录成功',
								type:'success'
				              })
				            window.sessionStorage.setItem('token',res.data.token)
				            this.$router.push('/userhome')
				        }else{
				            this.$message({
				                message:res.meta.msg,
				                type:'error'
				            })
				        }
				    } else {
				            return false
				        }
				})
				*/
			   
			   userLogin(){
			   	const that = this 
			   	this.$axios({
			   		method:"post",
			   		url:'/family/UserController/login',
			   		dataType:'JSONP',
			   		params:{
			   			uname:this.loginForm.userName,
			   			pwd:this.loginForm.password
			   		}
			   	}).then(function (response) {
			   		console.log(response);
			   		if(response.data.code == 0){
						//提示信息
			   			that.$message.success('登录成功');
						//存储后台传回来的用户数据
			   			localStorage.setItem('user', JSON.stringify(response.data.data));
						//localStorage.setItem('aName', that.param.aName)
						localStorage.setItem('myuserid',response.data.data.userid);
						console.log(JSON.parse(localStorage.getItem("user")));
						//跳转页面
			   			that.$router.push('/userhome');	
			   		}
			   	}).catch(function (error) {
			   		that.$message.error('请输入账号和密码');
			   		console.log('error submit!!');
			   	});
			   
			   }
			
		
		}
	}
</script>

<style>
	.login_container{
		background-color: #F4F5EE;
		background-image: url("https://www.transparenttextures.com/patterns/dust.png");
		height: 100%;
		width: 100%;
		background-size: 100% 100%;
		position: fixed;
	}
	.login_box{
		width: 400px;
		height: 300px;
		background-color: aliceblue;
		border-radius: 10px;
		position: absolute;
		left: 50%;
		top: 230px;
		transform: translate(-50%,-10%);
	}
	.avater_box{
		height: 120px;
		width: 120px;
		border: 4px solid #eee;
		border-radius: 50%;
		padding: 10px;
		box-shadow: 0 0 10px #ddd;
		position: absolute;
		left:50%;
		transform: translate(-50%,-50%);
		background-color: #fff;
	}
	/*头部logo自适应div大小*/
	.avater_img{
		max-width: 100%;
		max-height: 100%;
	} 	
	
	.btn_lr{
		display: flex;
		justify-content: center;
	}
	
	.form_login{
		position: absolute;
		bottom: 0px;
		width: 100%;
		padding: 0 50px;
		box-sizing: border-box; /*不设置是默认的，框会超出表单*/
	}
</style>
