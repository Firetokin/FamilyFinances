<template>
	<div class="index_all">
		<img src="../assets/logo.png" class="logo_img"/>
		<div class="btn_index">
			<el-button @click="jump_user" type="primary" round>我是用户</el-button>
			<el-button @click="jump_admin" type="primary" round>我是管理员</el-button>
			<el-button @click="jump_register" type="primary" round>我要注册</el-button>
		</div>
	</div>

</template>

<script>
	export default{
		methods:{
			jump_user(){
				this.$router.push({path:'/userlogin'})
			},
				
			jump_admin(){
<<<<<<< HEAD
				this.$router.push({path:'/login'})
=======
				this.$router.push({path:'/admin/login'})
>>>>>>> b731eb348724ebb10bf092f54ca8dbeb7cb84029
			},
			jump_register(){
				this.$router.push({path:'/userregister'})
			}
		}
	}
</script>

<style lang="less" scoped>
	.index_all{
		background-color: #F4F5EE;
		background-image: url("https://www.transparenttextures.com/patterns/dust.png");
		height: 100%;
		width: 100%;
		background-size: 100% 100%;
		position: fixed;
	}
	.logo_img{
		width: 600px;
		height: 650px;
		position: absolute;
		left: 50%;
		top: 10px;
		transform: translate(-50%,-10%);
	}
	.btn_index{
		position: absolute;
		left: 50%;
		top: 450px;
		transform: translate(-50%,-10%);
		
	}
	.btn_index/deep/.el-button:hover{
		background-color: #409EFF;
		color: white;
		
	}
	.btn_index/deep/.el-button--primary{
		color: #3A8EE6;
		background-color: #F0F8FF;
		border-color: #F0F8FF;
		size: 10px;
		font-size: 20px;
	}
</style>
