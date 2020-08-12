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
						        <span>个人信息</span>
						    </div>
							 <img src="../../../assets/img/img.jpg" class="user-avator" alt /> 
						  </el-form-item>
						</el-form>
					</div>
					
					
					<!-- 选择查看收入或者支出报表 ，默认显示收入报表-->
					<div class="query_payincome">
						
						<div class="btn_reports">
							<ul >
								  <el-button type="primary" plain class="btn">修改用户信息</el-button>								
							</ul>
						</div>
						
						<div class="show_reports">
							<div class="incom_reports" v-show="num==0">
								<div  >
									<u-in-echarts></u-in-echarts>
								</div>
							</div>
							
							<div class="pay_reports" v-show="num==1">
								<div >
									<u-p-echarts></u-p-echarts>
								</div>
							</div>
						</div>
						
						
					</div>	
				</div>
			</div>
		</el-main>
		<!-- 
		 <div class="tab_reportsbox">
		 	<div v-for="(l,index) in list" :key="index+l" @click="num=index" :class="{active:num==index}">{{l}}</div>
		 	<div v-for="(d,index) in listDetail" :key="index" v-show="num==index">{{d}}</div>
		 </div>
		 list:["tab1","tab2"],
		 listDetail:["box1","box2"],
		 -->
		
		<!-- 底部 -->
		<el-footer>
			<u-footer></u-footer>
		</el-footer>
			
	</el-container>
</template>

<script>
	import UserHeader from '../UserHeader.vue'
	import UserFooter from '../UserFooter.vue'
	import UserIncomeEcharts from '../echarts/UserIncomeEcharts.vue'
	import UserPayEcharts from '../echarts/UserPayEcharts.vue'
	export default{
		name:'ReportForm',
		data() {
		      return {
		        activeName: 'first',
				dataValue:'',
				num:"0"
		      };
		    },
		components:{
			'u-header':UserHeader,
			'u-footer':UserFooter,
			'u-in-echarts':UserIncomeEcharts,
			'u-p-echarts':UserPayEcharts
			
		},
		methods: {
		      handleClick(tab, event) {
		        console.log(tab, event);
		      },
			  
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
		transform: translate(-60%,-10%);
	}
	.query_date{
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
	.query_payincome{
		width: 600px;
		height: 700px;
		position: absolute;
		top: 180px;
		bottom: 10px;
		left: 50px;
	}
	.incom_reports{
		width: 600px;
		height: 500px;
		background-color: #F0F9EB;
	}
	.pay_reports{
		width: 600px;
		height: 500px;
		background-color: #F4F4F5;
	}
	.btn_reports{
		margin-left: 460px;
		margin-bottom: 25px;
	}
	
</style>
