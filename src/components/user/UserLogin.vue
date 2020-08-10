<template>
	<div class="login_container">
		<div class="login_box">
			<div class="avater_box">
				<!-- 头部logo -->
				<img src="../../assets/feimg/logo_login.png" alt="" class="avater_img"/>
			</div>
			
			
		</div>
		
	</div>
</template>

<script>
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
		width: 450px;
		height: 400px;
		background-color: aliceblue;
		border-radius: 10px;
		position: absolute;
		left: 50%;
		top: 150px;
		transform: translate(-50%,-10%);
	}
	.avater_box{
		height: 130px;
		width: 130px;
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
</style>
