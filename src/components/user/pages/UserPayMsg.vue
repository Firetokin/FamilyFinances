<template>
	<div class="all_payMsg">
		<u-paymsgheader></u-paymsgheader>
		<div class="top_chose">
			<div class="datechose_payMsg">
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
			<div class="typechoser_payMsg">
				 <el-select v-model="queryInfo.payTypeId" filterable placeholder="请选择">
				    <el-option
				      v-for="item in options"
				      :key="item.ip_value"
				      :label="item.label"
				      :value="item.ip_value">
				    </el-option>
				  </el-select>
				
			</div>
			
			<!-- 功能按钮：查询、添加 -->
			<div class="btn_payMsg">
				<el-button type="primary" plain style="margin-right: 20px;" @click="findPayByTypeAndDay">查询</el-button>
				
				<el-button type="success" plain @click="addDialogVisible = true">添加</el-button>
			</div>
		</div>
		
		
		<!-- 内容显示区 -->
		<div class="show_payMsg">
			<!-- 默认显示最近消费记录 -->
		<!-- .....................................................  -->
			<el-table :data = "payMsgList" stripe>
				<el-table-column label="编号" prop="incomeId"></el-table-column>
				<el-table-column label="金额" prop="payMoney"></el-table-column>
				<el-table-column label="日期" prop="time"></el-table-column>
				<el-table-column label="用途" prop="payPurpose"></el-table-column>
				<el-table-column label="备注" prop="comment"></el-table-column>
				<el-table-column label="操作" width="130px">
					<template slot-scope="scope">
						<el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
						<el-button type="danger" icon="el-icon-delete" size="mini" @click="removePayMsg(scope.row.id)"></el-button>
					</template>
				</el-table-column>
			</el-table>
			
		<!-- .......................................................  -->
		</div>
		
		<!-- 添加信息弹框  -->
		<el-dialog
		  title="添加支出信息"
		  :visible.sync="addDialogVisible"
		  width="50%"
		  @close="addDialogClosed">
		  <!-- 内容主体区域 -->
			<el-form :model="addForm" :rules="addFormRules" ref="ruleFormRef" label-width="100px" >
				<el-form-item label="选择日期" required>
					<el-form-item prop="time">
						<el-date-picker type="date" placeholder="选择日期" v-model="addForm.time" style="width: 100%;"></el-date-picker>
					</el-form-item>
				</el-form-item>
				
				<el-form-item label="支出金额" prop="payMoney">
					<el-input type="number" v-model.number="addForm.payMoney"></el-input>
				</el-form-item>
				
				<el-form-item label="选择类型" prop="payPurpose">
					<el-select placeholder="请选择支出类型" v-model="addForm.payPurpose">
					      <el-option label="税收" value="1"></el-option>
					      <el-option label="衣食住行" value="2"></el-option>
						  <el-option label="医疗" value="3"></el-option>
						  <el-option label="其他" value="4"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="备注" prop="comment">
					<el-input type="textarea" placeholder="请输入备注信息" v-model="addForm.comment" maxlength="255" show-word-limit></el-input>
				</el-form-item>
				
			</el-form>
		  
		  <!-- 底部区域：按钮确认 取消 -->
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="addDialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="addIncomePre">确 定</el-button>
		  </span>
		</el-dialog>
		
		
		<!-- 编辑信息弹框 -->
		<!-- 编辑信息弹框 -->
		<el-dialog
		  title="编辑信息"
		  :visible.sync="editDialogVisible"
		  width="50%">
		  <!-- 主体区域 -->
			<el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="100px" >
				
				<el-form-item label="选择日期" required>
					<el-form-item prop="time">
						<el-date-picker type="date" placeholder="选择日期" v-model="editForm.time" style="width: 100%;"></el-date-picker>
					</el-form-item>
				</el-form-item>
				
				<el-form-item label="收入金额" prop="payMoney">
					<el-input type="number" v-model.number="editForm.payMoney"></el-input>
				</el-form-item>
				
				<el-form-item label="选择类型" prop="payPurpose">
					<el-select placeholder="请选择收入类型" v-model="editForm.payPurpose">
					      <el-option label="工资" value="1"></el-option>
					      <el-option label="股票" value="2"></el-option>
						  <el-option label="分红" value="3"></el-option>
						  <el-option label="奖金" value="4"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="备注" prop="comment">
					<el-input type="textarea" placeholder="请输入备注信息" v-model="editForm.comment" maxlength="255" show-word-limit></el-input>
				</el-form-item>	
			</el-form>
		  <!-- 底部按钮 -->
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="editDialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="editDialogVisible = false">确 定</el-button>
		  </span>
		</el-dialog>
		
	</div>
</template>

<script>
	import UserPayMsgHeader from '../UserPayMsgHeader.vue'
	
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
					payTypeId:'',
					time:'',
				},
				payMsgList:[],
				code:'',
				msg:'',
				//控制弹窗显示隐藏
				addDialogVisible :false,
				//添加用户的表单数据
				addForm:{
					time:'',
					payMoney:',',
					payPurpose:'',
					comment:'',
				},
				//验证规则
				addFormRules:{
					time:[ { type: 'date', required: true, message: '请选择日期', trigger: 'change' }],
					payMoney:[{required: true, message: '收入金额不能为空'},{type: 'number', message: '收入金额必须为数字值'}],
					payPurpose:[{required: true, message: '请选择收入类型', trigger: 'change'}],
					comment:[{required: true, message: '请填写收入备注信息', trigger: 'blur'}],
				},
				
				//控制编辑信息弹框
				editDialogVisible:false,
				//查询到的用户信息
				editForm:{},
				editFormRules:{
					time:[ { type: 'date', required: true, message: '请选择日期', trigger: 'change' }],
					payMoney:[{required: true, message: '收入金额不能为空'},{type: 'number', message: '收入金额必须为数字值'}],
					payPurpose:[{required: true, message: '请选择收入类型', trigger: 'change'}],
					comment:[{required: true, message: '请填写收入备注信息', trigger: 'blur'}],
				}
				
	//............................................................
	      }
	   },
		components:{
			'u-paymsgheader':UserPayMsgHeader
		},
		
	//....................................................................
		methods:{
			async findPayByTypeAndDay(){
				const {data:res } = await this.$http.get("IncomeController/findPayByTypeAndDay",{
					params:this.queryInfo
					})
				this.payMsgList = res.data.list	
				this.code = res.data.code
				this.msg = res.data.msg
				console.log(res)
			},
			//监听添加用户对话框关闭事件
			addDialogClosed(){
				this.$refs.ruleFormRef.resetFields()
			},
			addIncomePre(){
				this.$refs.ruleFormRef.validate(async valid =>{
					if(!valid) return
					//可以发起添加用户请求
					const {data : res} = await this.$http.post('IncomeController/addIncome',this.addForm)
					if(res.meta.code !== 0){
						this.$message.error('添加失败')
					}
					this.$message.success('添加成功')
					this.addDialogVisible = false
				})
			},
			//删除
			async removePayMsg(id){
				//弹框询问
				const confirmResult = await this.$confirm('此操作将永久删除该条信息, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
					}).catch(err =>{
						return err
					})
					//确认删除为confirm，取消为cancel
					//console.log(confirmResult)
					if(confirmResult !== 'confirm'){
						return this.$message.info('已取消')
					}
					const {data: res} = await this.$http.delete('payController/deletePay' + id)
					if(res.meta.code !== 0){
						return this.$message.error('删除信息失败')
					}
					this.$message.success('删除成功')	
			},
			//编辑信息操作
			async showEditDialog(id){
				const {data:res} = await this.$http.get('PayController/getPayList' + id)
				if(res.meta.code !== 0){
					return this.$message.error('查询用户信息失败')
				}
				this.editForm = res.data
				this.editDialogVisible = true
			}
			
			
		},
		//生命周期函发起请求
		created(){
			this.findPayByTypeAndDay()
		}
	//..................................................................
	}	
	
</script>

<style lang="less">
	.all_payMsg{
		overflow: auto;
	}
	
	
	.show_payMsg{
		width: 70%;
		height: 500px;
		border: 3px solid aliceblue;
		margin-top: 140px;
		margin-left: 200px;
		
	}
	.datechose_payMsg{
		float: left;
		
	}
	.typechoser_payMsg{
		float: left;
		margin-left: 20px;
	}
	.btn_payMsg{
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
