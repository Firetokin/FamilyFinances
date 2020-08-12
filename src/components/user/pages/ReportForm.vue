<template>
	<el-container>
		<el-header>
			<u-header></u-header>
		</el-header>
		
		
		<el-main>
			<div class="reportform_container">
				<!-- 报表模块 -->
				<div class="div_reportform">
					<!-- 选择查询日期 -->
					<div class="query_date">
						<el-form >
						 <el-form-item >
						    <div class="block">
						        <span>请选择日期</span><p></p>
						        <el-date-picker
									  v-model="dataValue"
									  type="daterange"
									  range-separator="至"
									  start-placeholder="开始日期"
									  end-placeholder="结束日期">
						        </el-date-picker>
						      </div>
						  </el-form-item>
						</el-form>
					</div>
					
					
					<!-- 选择查看收入或者支出报表 ，默认显示收入报表-->
					<div class="query_payincome">
						<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
						    <el-tab-pane label="收入报表" name="first">收入报表</el-tab-pane>
						    <el-tab-pane label="支出报表" name="second">支出报表</el-tab-pane>
						</el-tabs>
					</div>		
				</div>
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
		name:'ReportForm',
		data() {
		      return {
		        activeName: 'first',
				dataValue:'',
		      };
		    },
		components:{
			'u-header':UserHeader,
			'u-footer':UserFooter
		},
		methods: {
		      handleClick(tab, event) {
		        console.log(tab, event);
		      }
		    }
	}
</script>

<style lang="less">
	.reportform_container{
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
	.div_reportform{
		background-color: aliceblue;
		width: 700px;
		height: 800px;
		position: absolute;
		top: 20%;
		left: 50%;
		transform: translate(-50%,-10%);
	}
	.query_date{
		margin-top: 30px;
	}
</style>
