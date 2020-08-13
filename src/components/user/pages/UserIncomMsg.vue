<template>
	<div class="all_incomeMsg">
		<u-incomeheader></u-incomeheader>
		<div class="top_chose">
			<div class="datechose_incomeMsg">
				<!-- 选择时间 ：年月日-->
				<div class="block">
				    <el-date-picker
				      v-model="queryInfo.time"
				      align="right"
				      type="date"
				      placeholder="选择日期"
				      :picker-options="pickerOptions">
				    </el-date-picker>
				  </div>
			</div>
			
			<!-- 选择类型 -->
			<div class="typechoser_incomeMsg">
				 <el-select v-model="queryInfo.incomeTypeId" filterable placeholder="请选择">
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
				<el-button type="primary" plain style="margin-right: 20px;" @click="findIncomeByTypeAndDay">查询</el-button>
				
				<el-button type="success" plain @click="addDialogVisible = true">添加</el-button>
			</div>
		</div>
		
		
		<!-- 内容显示区 -->
		<div class="show_incomeMsg">
			<!-- 默认显示最近消费记录 -->
		<!-- .....................................................  -->
			<el-table :data = "incomeMsgList" stripe>
				<el-table-column label="编号" prop="incomeId"></el-table-column>
				<el-table-column label="金额" prop="incomeMoney"></el-table-column>
				<el-table-column label="日期" prop="time"></el-table-column>
				<el-table-column label="类型" prop="incomeResource"></el-table-column>
				<el-table-column label="备注" prop="comment"></el-table-column>
				<el-table-column label="操作" width="130px">
					<template slot-scope="scope">
						<el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
						<el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
					</template>
				</el-table-column>
			</el-table>
			
		<!-- .......................................................  -->
		</div>
		
		<!-- 添加信息弹框  -->
		<el-dialog
		  title="添加收入信息"
		  :visible.sync="addDialogVisible"
		  width="50%">
		  <!-- 内容主体区域 -->
			<el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px" >
				<el-form-item label="收入金额" prop="imoneyrule">
				  <el-input v-model="ruleForm.name"></el-input>
				</el-form-item>
			</el-form>
		  
		  <!-- 底部区域：按钮确认 取消 -->
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="addDialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="addDialogVisible = false">确 定</el-button>
		  </span>
		</el-dialog>
		
	</div>
</template>

<script>
	import UserIncomeMsgHeader from '../UserIncomeMsgHeader.vue'
	
	export default {
	    data() {
		//.....................................................
		
		//.....................................................
	      return {
			  //带快捷键日期选择
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
	        //value_income: '',
			//收入类型下拉框选择
			options: [{
			          value: '1',
			          label: '工资'
			        }, {
			          value: '2',
			          label: '股票'
			        }, {
			          value: '3',
			          label: '分红'
			        }, {
			          value: '4',
			          label: '奖金'
			        }],
			      //  ip_value: '',
	//............................................................
				//查询用户收入信息列表参数
				queryInfo:{
					userId:'',     //从哪里得来？？？？？？？？？？？？？
					incomeTypeId:'',
					time:'',
				},
				incomeMsgList:[],
				code:'',
				msg:'',
				//控制弹窗显示隐藏
				addDialogVisible :false,
				//添加用户的表单数据
				addForm:{},
				//验证规则
				addFormRules:{
					imoneyrule:[
						{required: true, message: '请输入收入金额', trigger: 'blur'},
						
					]
				}
				
	//............................................................
	      }
	   },
		components:{
			'u-incomeheader':UserIncomeMsgHeader,
		},
		
	//....................................................................
		methods:{
			async findIncomeByTypeAndDay(){
				const {data:res } = await this.$http.get("IncomeController/findIncomeByTypeAndDay",{
					params:this.queryInfo
					})
				this.incomeMsgList = res.data.list	
				this.code = res.data.code
				this.msg = res.data.msg
				console.log(res)
			},
			
			
		},
		//生命周期函发起请求
		created(){
			this.findIncomeByTypeAndDay()
		}
	//..................................................................
	}	
	
</script>

<style lang="less">
	.all_incomeMsg{
		overflow: auto;
	}
	
	
	.show_incomeMsg{
		width: 70%;
		height: 500px;
		border: 3px solid aliceblue;
		margin-top: 140px;
		margin-left: 200px;
		
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
