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
				this.$router.push({path:'/admin/login'})
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
</style>
