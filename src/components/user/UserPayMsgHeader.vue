<template>
	<div class="all_Msgtop">
		<!-- 图标、名称 -->
		<div class="msg_top">
			<img src="../../assets/feimg/logo_login.png" style="width: 98px; height: 98px;" @click="ptoHome"/>
			<span>支出信息管理</span>
		</div>
	</div>
	
</template>

<script>
	export default{
		data(){
			
		},
		methods:{
			ptoHome(){
				 this.$router.push({path:'/userhome'})
			}
		}
	}
</script>

<style lang="less">
	.all_Msgtop{
		margin-bottom: 20px;
		color: #000000;
		font-size: 25px;
		top: 0px;
		> div{
			display: flex;
			align-items: center;
			span {
					margin-left: 30px;
				}
		}
		
	}
	
</style>
