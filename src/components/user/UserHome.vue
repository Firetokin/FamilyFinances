<template>
	<el-container>
		<el-header>
			<u-header></u-header>
		</el-header>
		<el-main>
			<div class="userhome_container">
				<!-- 显示当前用户、余额、额度 -->
				<div class="show_usermsg" >
					<div class="active_user">
						<el-form :model="ActiveUser" label-width="80px" style="height: 80px;">
						  <el-form-item  label="当前用户">
							<el-input v-model="ActiveUser.userName" disabled></el-input>
						  </el-form-item>
						
						  <el-form-item label="用户额度">
							<el-input v-model="ActiveUser.consumptionQuota" disabled></el-input>
						  </el-form-item>
						
						  <el-form-item label="用户余额">
							<el-input v-model="ActiveUser.balance" disabled></el-input>
						  </el-form-item>
						  
						</el-form>
					</div>
				</div>
				
				<div class="echarts_home">
					<div>
						<u-reyeaechart></u-reyeaechart>
					</div>
				</div>
				
				<!-- 显示当前用户近期消费	和股票收益 -->
				
				<div class="show_userpay">
					<div class="user_pay">
						<!-- 顶部按钮区 -->
						<div>
							<el-button type="info" plain @click="uhome_num=0" :class="{active:uhome_num==0}">最近收支</el-button>
							<el-button type="info" plain style="margin-left: 0;" @click="uhome_num=1" :class="{active:uhome_num==1}">最近股票</el-button>
						</div>
						<!-- 下面显示收支内容区 -->
						<div v-show="uhome_num==0">
							<el-table
							    :data="recentMoneyData"
							    stripe
							    style="width: 100%">
							    <el-table-column
							      prop="date"
							      label="日期"
							      width="180">
							    </el-table-column>
							    <el-table-column
							      prop="recent_money"
							      label="收支"
							      width="180">
							    </el-table-column>
							    <el-table-column
							      prop="recent_montype"
							      label="收支类型">
							    </el-table-column>
								<el-table-column
								  prop="recent_comment"
								  label="备注">
								</el-table-column>
							  </el-table>
						</div>
						
						<!-- 下面显示股票基金内容区 -->
						<div v-show="uhome_num==1">
							<el-table
							    :data="recentStockData"
							    stripe
							    style="width: 100%">
							    <el-table-column
							      prop="date"
							      label="日期"
							      width="180">
							    </el-table-column>
							    <el-table-column
							      prop="recent_money"
							      label="涨跌"
							      width="180">
							    </el-table-column>
							    <el-table-column
							      prop="recent_montype"
							      label="涨跌类型">
							    </el-table-column>
								<el-table-column
								  prop="recent_comment"
								  label="备注">
								</el-table-column>
							  </el-table>
						</div>
						
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
	import UserHeader from './UserHeader.vue'
	import UserFooter from './UserFooter.vue'
	import RencentYearPay from './echarts/RecentYearPay.vue'
	
	export default{
		name:'UserHome',
		data(){
			return{
				//这是当前用户名字、余额、额度显示
				ActiveUser:{
					userName:'张三',
					consumptionQuota:'3000.0',
					balance:'120.8'
				},
				
				//最近消费收入信息
				recentMoneyData: [{
					  date: '2016-05-02',
					  recent_money: '+1000',
					  recent_montype: '工资',
					  recent_comment: '无'
					}, {
					  date: '2016-05-04',
					  recent_money: '-200',
					  recent_montype: '服饰',
					  recent_comment: '无'
					}, {
					  date: '2016-05-01',
					  recent_money: '+12.02',
					  recent_montype: '咸鱼',
					  recent_comment: '无'
					}, {
					  date: '2016-05-03',
					  recent_money: '-12000',
					  recent_montype: '生活',
					  recent_comment: '无'
				}],
				//最近消费收入信息
				recentStockData: [{
					  date: '2016-05-02',
					  recent_money: '+1000',
					  recent_montype: '股票',
					  recent_comment: '青岛啤酒'
					}, {
					  date: '2016-05-04',
					  recent_money: '-200',
					  recent_montype: '股票',
					  recent_comment: '老干妈'
					}, {
					  date: '2016-05-01',
					  recent_money: '+12.02',
					  recent_montype: '利息',
					  recent_comment: '余额宝'
					}, {
					  date: '2016-05-03',
					  recent_money: '-12000',
					  recent_montype: '股票',
					  recent_comment: '无'
				}],
				uhome_num:"0",//默认选中第一个

			}
		},
		components:{
			'u-header':UserHeader,
			'u-footer':UserFooter,
			'u-reyeaechart':RencentYearPay
		},
		methods:{
			uhome_change(index){
				this.number = index;
				this.number = 1;
				//只能切换一次
			},
		}
	}
</script>

<style lang="less">	
	.userhome_container{
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
	.show_usermsg{
		margin-top: 50px;
		
		background-color: aliceblue;
		width: 400px;
		height: 280px;
		position:absolute;
		
	}
	.active_user{
		margin-top: 60px;
		margin-left: 20px;
	}
	.active_user/deep/.el-input__inner {
		-webkit-appearance: none;
		background-color: none;
		background-image: none;
		border-radius: 4px;
		border: 0px solid #DCDFE6;
		box-sizing: border-box;
		color: black;
		display: inline-block;
		height: 40px;
		line-height: 40px;
		outline: 0;
		padding: 0 25px;
		transition: border-color .2s cubic-bezier(.645,.045,.355,1);
		width: 80%;
		font-size: 17px;
	}
	.active_user/deep/.el-form-item__label {
		text-align: right;
		vertical-align: middle;
		float: left;
		font-size: 17px;
		color: #9A93AF;
		line-height: 40px;
		padding: 0 12px 0 0;
		box-sizing: border-box;
	}
	.show_userpay{
		width: 50%;
		height: 500px;
		background-color: aliceblue;
		margin-left: 500px;
		margin-right: 100px;
		margin-top: 50px;
	}
	.echarts_home{
		width: 400px;
		height: 330px;
		position: absolute;
		margin-top: 370px;
		margin-bottom: 120px;
		background-color: aliceblue;
	}

</style>
