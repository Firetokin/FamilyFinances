<template>
	<div class="all_incomeMsg">
		<u-incomeheader></u-incomeheader>
		<div class="top_chose">
			<div class="datechose_incomeMsg">
				<!-- 选择时间 ：年月日-->
				<div class="block">
				    <el-date-picker
				      v-model="value_income"
				      align="right"
				      type="date"
				      placeholder="选择日期"
				      :picker-options="pickerOptions">
				    </el-date-picker>
				  </div>
			</div>
			
			<!-- 选择类型 -->
			<div class="typechoser_incomeMsg">
				 <el-select v-model="ip_value" filterable placeholder="请选择">
				    <el-option
				      v-for="item in options"
				      :key="item.ip_value"
				      :label="item.label"
				      :value="item.ip_value">
				    </el-option>
				  </el-select>
				
			</div>
			
			<!-- 功能按钮：查询、添加 -->
			<div class="btn_incomeMsg">
				<el-button type="primary" plain style="margin-right: 20px;">查询</el-button>
				
				<el-button type="success" plain>添加</el-button>
			</div>
		</div>
		
		
		<!-- 内容显示区 -->
		<div class="show_incomeMsg">
			<!-- 默认显示最近消费记录 -->
			<div>
				sas
			</div>
			
			<!-- 查询显示 -->
			<div>
				
			</div>
			
			<!-- 添加显示 -->
			<div>
				
			</div>
		</div>
		
		
	</div>
	
</template>

<script>
	import UserIncomeMsgHeader from '../UserIncomeMsgHeader.vue'
	
	export default {
	    data() {
	      return {
	        pickerOptions: {
	          disabledDate(time) {
	            return time.getTime() > Date.now();
	          },
	          shortcuts: [{
	            text: '今天',
	            onClick(picker) {
	              picker.$emit('pick', new Date());
	            }
	          }, {
	            text: '昨天',
	            onClick(picker) {
	              const date = new Date();
	              date.setTime(date.getTime() - 3600 * 1000 * 24);
	              picker.$emit('pick', date);
	            }
	          }, {
	            text: '一周前',
	            onClick(picker) {
	              const date = new Date();
	              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
	              picker.$emit('pick', date);
	            }
	          }]
	        },
	        value_income: '',
			
			options: [{
			          value: '选项1',
			          label: '工资'
			        }, {
			          value: '选项2',
			          label: '股票'
			        }, {
			          value: '选项3',
			          label: '分红'
			        }, {
			          value: '选项4',
			          label: '奖金'
			        }],
			        ip_value: ''
	      };
	    },
		components:{
			'u-incomeheader':UserIncomeMsgHeader,
		}
	  }
	
</script>

<style>
	.all_incomeMsg{
		overflow:auto;
	}
	
	
	.show_incomeMsg{
		width: 500px;
		height: 1500px;
		background-color: aliceblue;
		margin-top: 140px;
		border: 3px solid #0000FF;
	}
	.datechose_incomeMsg{
		float: left;
		
	}
	.typechoser_incomeMsg{
		float: left;
		margin-left: 20px;
	}
	.btn_incomeMsg{
		float: left;
		margin-left: 50px;
	
	}
	.top_chose{
		margin-top: 30px;
		margin-bottom: 30px;
		position: absolute;
		left: 50%;
		transform: translate(-50%,0);
	}
</style>
