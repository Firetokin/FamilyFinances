<template>
	<div>
		<el-card class="box-card">
			<!--1.面包屑-->
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>
					<i class="el-icon-money"></i> 收入支出管理
					</el-breadcrumb-item>
					
				<el-breadcrumb-item>支出列表</el-breadcrumb-item>
			</el-breadcrumb>
			<div>
				<!--2.添加-->
				<el-row class="addRow">
					<el-col>
						  <el-button type="primary" plain @click="showAddPayTypeDia()">添加类型</el-button>
					</el-col>
				</el-row>
				
				<!--3.表格-->
				<el-table
					:data="payTypeList"
					stripe
					border
					height="250"
					class="payTypeTable">
					<el-table-column prop="paytypeid" label="支出类型ID" align="center">
					</el-table-column>
					<el-table-column prop="paytypename" label="支出类型" align="center">
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
		      <el-input v-model="form.payTypeName" autocomplete="off"></el-input>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
		    <el-button type="primary" @click="addPayType()">确 定</el-button>
		  </div>
		</el-dialog>
	</div>	
	
</template>

<script>
export default{
	data(){
		return{
			query:'',
			payTypeList:[],
			total:-1,
			pagenume:1,
			pagesize:2,
			pagecount:1,
			//添加支出类型对话框的属性
			dialogFormVisibleAdd:false,
			formLabelWidth: '120px',
			//添加支出类型的表单数据
			form:{
				payTypeName:''
			}
		}
	},
	created(){
		this.getPayTypeList()
	},
	methods:{
		
		/*this.$axios.get('http://139.199.27.251:8080/elm/BusinessController/listBusinessByOrderTypeId',{
			params:{orderTypeId:this.orderTypeId}
		}).then(response=>{
			this.businessArr = response.data;
		}).catch(error=>{
			console.log("请稍后重试。");
		});*/
		
		async addPayType(){
			//关闭对话框
			this.dialogFormVisibleAdd = false
			
			const res = await this.$http.post("payTypeController/addPayType",this.form);
			console.log(res);
			const{meta:{code,msg},data} = res.data;
			if(code==0){
				//提示成功
				this.$message.success(msg);
				//更新视图
				this.getIPayTypeList();
				//清空文本框
				this.form = {};
			}
			else{
				//提示
				this.$message.warning(msg);
			}
		},
		
		//添加支出类型
		showAddPayTypeDia(){
			this.dialogFormVisibleAdd=true;
		},
		
		addPayType(){
			this.addDialogVisible = false;
			this.$axios({
				method:"get",
				url:"/family/PayTypeController/addPayType",
				dataType:'JSONP',
				params:{
					payTypeName:this.form.payTypeName
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
		removeMsg(index, row){
				this.$axios({
					method:"get",
					url:"/family/PayTypeController/deletePayType",
					dataType:'JSONP',
					params:{
						payTypeId:row.paytypeid,
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
			this.getPayTypeList();
		},
		
		handleCurrentChange(val){
			console.log('当前页:${val}');
			this.pagenume = val;
			this.getPayTypeList();
		},
		
		//获取支出列表的请求
		async getPayTypeList(){
			this.$axios({
				method :"get",
				url:"/family/PayTypeController/showlist",
				dataType:"JSONP",
				params:{
					pageNum: this.pagenume,
					pageSize:this.pagesize
				}
			}).then(res=>{
				console.log(res);
				if(res.data.code ===0){
					this.payTypeList = res.data.data;
					this.total = res.data.total;
					this.pagecount = res.data.pagecount
				}
			})
		}
		/*
		async getPayTypeList(){
			
			const AUTH_TOKEN = localStorage.getItem('token');
			this.$http.default.headers.common['Authorization'] = AUTH_TOKEN;
		
			const res = await this.$http.get(
			'payTypeController/showlist',{
				params:{query:this.query},
				params:{pagenum:this.pagenum},
				params:{pagesize:this.pagesize}
			});
			console.log(res);
			const{meta:{code,msg},data:{payTypes,total}}=res.data;
			if(code===0){
				this.payTypeList = payTypes
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
.payTypeTable{
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
