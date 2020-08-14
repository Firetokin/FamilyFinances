<template>
	<div>
		<el-card class="box-card">
			<!--1.面包屑-->
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>
					<i class="el-icon-money"></i> 收入支出管理
					</el-breadcrumb-item>
					
				<el-breadcrumb-item>收入列表</el-breadcrumb-item>
			</el-breadcrumb>
			<div>
				<!--2.添加-->
				<el-row class="addRow">
					<el-col>
						  <el-button type="primary" plain @click="showAddIncomeTypeDia()">添加类型</el-button>
					</el-col>
				</el-row>
				
				<!--2.表格-->
				<el-table
					:data="incomeList"
					stripe
					border
					height="250"
					class="incomeTypeTable">
					<el-table-column prop="incometypeid" label="收入类型ID" align="center">
					</el-table-column>
					<el-table-column prop="incometypename" label="收入类型" align="center">
					</el-table-column>
					<el-table-column label="操作" width="130px" align="center">
						<template slot-scope="scope">
							<el-button type="danger" icon="el-icon-delete" size="mini" @click="removeMsg(scope.$index, scope.row)"></el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>	
			<!--4.分页-->
			<div class="page">
				<el-pagination
					background 
					layout="total, sizes,prev, pager, next,jumper"
					:current-page="pagenume"
					:page-sizes="[2,4,6,8]"
					:page-size="2"
					:page-count="pagecount"
					:total="total"
					@current-change="handleCurrentChange"
					@size-change="handleSizeChange">
				</el-pagination>
			</div>
		</el-card>
		
		<!--添加类型对话框-->
		<el-dialog title="添加收入类型" :visible.sync="dialogFormVisibleAdd">
		  <el-form :model="form">
		    <el-form-item label="收入类型" :label-width="formLabelWidth">
		      <el-input v-model="form.incomeTypeName" autocomplete="off"></el-input>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
		    <el-button type="primary" @click="addIncomeType()">确 定</el-button>
		  </div>
		</el-dialog>
	</div>	
	
</template>

<script>
export default{
	data(){
		return{
			query:'',
			incomeList:[],
			total:0,
			pagenume:1,
			pagesize:2,
			pagecount:1,
			//添加收入类型对话框的属性
			dialogFormVisibleAdd:false,
			formLabelWidth: '120px',
			//添加收入类型的表单数据
			form:{
				incomeTypeName:''
			}
		}
	},
	created(){
		this.getIncomeTypeList()
	},
	methods:{
		
		/*this.$axios.get('http://139.199.27.251:8080/elm/BusinessController/listBusinessByOrderTypeId',{
			params:{orderTypeId:this.orderTypeId}
		}).then(response=>{
			this.businessArr = response.data;
		}).catch(error=>{
			console.log("请稍后重试。");
		});*/
		
		//添加收入类型
		showAddIncomeTypeDia(){
			this.dialogFormVisibleAdd=true;
		},
		
		addIncomeType(){
			this.addDialogVisible = false;
			this.$axios({
				method:"get",
				url:"/family/incomeTypeController/addIncomeType",
				dataType:'JSONP',
				params:{
					incomeTypeName:this.form.incomeTypeName
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
		
		//删除收入类型
		//删除
		removeMsg(index, row){
				this.$axios({
					method:"get",
					url:"/family/incomeTypeController/deleteIncomeTypeId",
					dataType:'JSONP',
					params:{
						incomeTypeId:row.incometypeid,
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
		
		//处理分页
		handleSizeChange(val){
			console.log('每页${val}条');
			this.pagesize = val;
			this.pagenume = 1;
			this.getIncomeTypeList();
		},
		
		handleCurrentChange(val){
			console.log('当前页:${val}');
			this.pagenume = val;
			this.getIncomeTypeList();
		},
		
		//获取收入列表的请求
		async getIncomeTypeList(){
			this.$axios({
				method :"get",
				url:"/family/incomeTypeController/showlist",
				dataType:"JSONP",
				params:{
					pageNum: this.pagenume,
					pageSize:this.pagesize
				}
			}).then(res=>{
				console.log(res);
				if(res.data.code ===0){
					this.incomeList = res.data.data;
					this.total = res.data.total;
					this.pagecount = res.data.pagecount
				}
			})
			
		}
		/*
		async getIncomeTypeList(){
			
			const AUTH_TOKEN = localStorage.getItem('token');
			this.$http.default.headers.common['Authorization'] = AUTH_TOKEN;
		
			const res = await this.$http.get(
			'incomeTypeController/showlist',{
				params:{query:this.query},
				params:{pagenum:this.pagenum},
				params:{pagesize:this.pagesize}
			});
			console.log(res);
			const{meta:{code,msg},data:{incomeTypes,total}}=res.data;
			if(code===0){
				this.incomeList = incomeTypes
				this.total=total
				this.$message.success(msg)
				//this.pagenume = 1;
			}
			else{
				this.$message.error(msg)
			}
		}
		*/
		
	}
}
</script>


<style>
.box-card{
	height: 100%;
}
.addRow{
	margin-top: 20px;
}
.incomeTypeTable{
	width: 100%;
	font-size: 14px;
	margin-top: 20px;
}

.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.page{
	margin-top: 20px;
}
</style>
