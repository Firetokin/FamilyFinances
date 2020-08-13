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
				 <el-select v-model="queryInfo.incomeresource" filterable placeholder="请选择">
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
				<el-button type="primary" plain style="margin-right: 20px;" @click="findIncomeByTypeAndDay()">查询</el-button>
				
				<el-button type="success" plain @click="addDialogClosed()">添加</el-button>
			</div>
		</div>
		
		
		<!-- 内容显示区 -->
		<div class="show_incomeMsg">
			<!-- 默认显示最近消费记录 -->
		<!-- .....................................................  -->
			<el-table :data = "incomeMsgList" stripe>
				<el-table-column label="编号" prop="incomeid"></el-table-column>
				<el-table-column label="金额" prop="incomemoney"></el-table-column>
				<el-table-column label="日期" prop="time"></el-table-column>
				<el-table-column label="类型" prop="incomeresource"></el-table-column>
				<el-table-column label="备注" prop="comment"></el-table-column>
				<el-table-column label="操作" width="130px">
					<template slot-scope="scope">
						<el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.$index, scope.row)"></el-button>
						<el-button type="danger" icon="el-icon-delete" size="mini" @click="removeIncomeMsg(scope.$index, scope.row)"></el-button>
					</template>
				</el-table-column>
			</el-table>
			
					
		<!-- .......................................................  -->
		</div>
		
		<!-- 添加信息弹框  -->
		<el-dialog
		  title="添加收入信息"
		  :visible.sync="addDialogVisible"
		  width="50%"
		  @close="addDialogClosed">
		  <!-- 内容主体区域 -->
			<el-form :model="addForm" :rules="addFormRules" ref="ruleFormRef" label-width="100px" >
				
				<el-form-item label="收入金额" prop="incomemoney">
					<el-input type="number" v-model.number="addForm.incomemoney"></el-input>
				</el-form-item>
				
				<el-form-item label="选择类型" prop="incomeresource">
					<el-select placeholder="请选择收入类型" v-model="addForm.incomeresource" >
					      <el-option label="工资" value="工资" value-key="1"></el-option>
					      <el-option label="股票" value="股票" value-key="2"></el-option>
						  <el-option label="分红" value="分红" value-key="3"></el-option>
						  <el-option label="奖金" value="奖金" value-key="4"></el-option>
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
		<el-dialog
		  title="编辑信息"
		  :visible.sync="editDialogVisible"
		  width="50%">
		  <!-- 主体区域 -->
			<el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="100px" >
				
				<el-form-item label="收入金额" prop="incomemoney">
					<el-input type="number" v-model.number="editForm.incomemoney"></el-input>
				</el-form-item>
				
				<el-form-item label="选择类型" prop="incomeresource">
					<el-select placeholder="请选择收入类型" v-model="editForm.incomeresource">
					      <el-option label="工资" value="工资"></el-option>
					      <el-option label="股票" value="股票"></el-option>
						  <el-option label="分红" value="分红"></el-option>
						  <el-option label="奖金" value="奖金"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="备注" prop="comment">
					<el-input type="textarea" placeholder="请输入备注信息" v-model="editForm.comment" maxlength="255" show-word-limit></el-input>
				</el-form-item>
				
			</el-form>
		 
		  
		  <!-- 底部按钮 -->
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="editDialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="saveEdit">确 定</el-button>
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
					incomeresource:'',
					time:'',
				},
				userid:'',
				incomeMsgList:[],
				code:'',
				msg:'',
				//控制弹窗显示隐藏
				addDialogVisible :false,
				//添加用户的表单数据
				addForm:{
					time:'',
					incomeMoney:',',
					incomeResource:'',
					comment:'',
				},
				//验证规则
				addFormRules:{
					time:[ { type: 'date', required: true, message: '请选择日期', trigger: 'change' }],
					incomeMoney:[{required: true, message: '收入金额不能为空'},{type: 'number', message: '收入金额必须为数字值'}],
					incomeResource:[{required: true, message: '请选择收入类型', trigger: 'change'}],
					comment:[{required: true, message: '请填写收入备注信息', trigger: 'blur'}],
				},
				//控制编辑信息弹框
				editDialogVisible:false,
				//查询到的用户信息
				editForm:{},
				form: {},
				idx: -1,
				incomeTypeId:1,
				editFormRules:{
					time:[ { type: 'date', required: true, message: '请选择日期', trigger: 'change' }],
					incomeMoney:[{required: true, message: '收入金额不能为空'},{type: 'number', message: '收入金额必须为数字值'}],
					incomeResource:[{required: true, message: '请选择收入类型', trigger: 'change'}],
					comment:[{required: true, message: '请填写收入备注信息', trigger: 'blur'}],
				}
				
	//............................................................
	      }
	   },
	   computed: {
	   	userId() {
	   	    let userId = localStorage.getItem('myuserid');
	   	    return userId ? userId : this.userid;
	   	}
	   },
		components:{
			'u-incomeheader':UserIncomeMsgHeader
		},
		//生命周期函发起请求
		created(){
			this.getIncomeList()
		},
	//....................................................................
		methods:{
			
			//获取收入信息列表
			getIncomeList(){
				this.$axios({
					method:"get",
					url:"/family/IncomeController/getIncomeList",
					dataType:'JSONP',
					params:{
						userId:this.userId
					}
				}).then(res=>{
					console.log(res);
					if(res.data.code==0){
						this.incomeMsgList = res.data.data;	
					}
				})
			},
			
			/*
			findIncomeByTypeAndDay(){
				this.$axios({
					method:"get",
					url:"/family/IncomeController/findIncomeByTypeAndDay",
					dataType:'JSONP',
					params:{
						userId:this.userId,
						time:this.queryInfo.time,
						
					}
				}).then(res=>{
					console.log(res);
					if(res.data.code==0){
						this.incomeMsgList = res.data.data;	
					}
				})
			},
			*/
			
			//监听添加用户对话框关闭事件
			addDialogClosed(){
				this.addDialogVisible = true;
			},
			
			//添加收入信息
			addIncomePre(){
				this.addDialogVisible = false;
				this.$axios({
					method:"get",
					url:"/family/IncomeController/addIncome",
					dataType:'JSONP',
					params:{
						userId:this.userId,
						incomeMoney:this.addForm.incomemoney,
						incomeResource:this.addForm.incomeresource,
						comment:this.addForm.comment,
						incomeTypeId:this.incomeTypeId
					}
				}).then(res=>{
					console.log(res);
					if(res.data.code==0){
						 this.$message.success(res.data.msg);
					}else{
						this.$message.error(res.data.msg);
					}
				})
			},
			
			//删除
			removeIncomeMsg(index, row){
				this.$axios({
					method:"get",
					url:"/family/IncomeController/deleteIncome",
					dataType:'JSONP',
					params:{
						incomeid:row.incomeid,
					}
				}).then(res=>{
					console.log(res);
					if(res.data.code==0){
						 this.$message.success(`删除第 ${index + 1} 行成功`);
						//this.incomeMsgList = res.data.data;	
					}else{
						this.$message.error(res.data.mag);
					}
				})
			},
			
			
			//编辑信息操作	
			showEditDialog(index, row){
				this.editDialogVisible = true;
				this.idx = index;
				this.editForm = row;
				
			},
			
			// 保存编辑
			saveEdit() {
			    this.editDialogVisible = false;
				this.$axios({
					method:"get",
					url:"/family/IncomeController/updateIncome",
					dataType:'JSONP',
					params:{
						userId:this.userId,
						incomeId:this.editForm.incomeid,
						incomeMoney:this.editForm.incomemoney,
						incomeResource:this.editForm.incomeresource,
						comment:this.editForm.comment,
						incomeTypeId:this.editForm.incomeTypeId
					}
				}).then(res=>{
					console.log(res);
					if(res.data.code==0){
						 this.$message.success(`修改第 ${this.idx + 1} 行成功`);
						//this.incomeMsgList = res.data.data;	
					}
				})
			   
			   // this.$set(this.incomeMsgList, this.idx, this.form);
			},
			

		},
		//生命周期函发起请求

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
