<template>
	<el-container>
		<el-header>
			<u-header></u-header>
		</el-header>
		
		
		<el-main>
			<div style="width: 300px;height: 300px;background-color: #00D1B2;">
				<span style="color: red;">这是查询收入</span>
			</div>
		</el-main>
		
		
		<el-footer>
			<u-footer></u-footer>
		</el-footer>
			
	</el-container>
</template>

<script>
	import UserHeader from '../UserHeader.vue'
	import UserFooter from '../UserFooter.vue'
	export default{
		name:'QueryIncome',
		components:{
			'u-header':UserHeader,
			'u-footer':UserFooter
		}
	}
</script>

<style lang="less">
</style>
