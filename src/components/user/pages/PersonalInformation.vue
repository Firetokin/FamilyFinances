<template>
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
								  <el-button type="primary" plain >修改用户信息</el-button>								
							</ul>
						</div>
						
						<div class="user_boxs">
							
							
						</div>
						
						
					</div>	
				</div>
			</div>
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
		      };
		    },
		components:{
			'u-header':UserHeader,
			'u-footer':UserFooter
			
		},
		methods: {
			  
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
