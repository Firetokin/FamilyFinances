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
						  <el-button type="primary" plain>添加类型</el-button>
					</el-col>
				</el-row>
				
				<!--2.表格-->
				<el-table
					:data="incomeList"
					stripe
					border
					height="250"
					class="incomeTypeTable">
					<el-table-column prop="incomeTypeId" label="收入类型ID" align="center">
					</el-table-column>
					<el-table-column prop="incomeTypeName" label="收入类型" align="center">
					</el-table-column>
					<el-table-column
						fixed="right"
						label="操作"
						width="200"
						align="center">
						<template slot-scope="scope">
							<template slot-scope="scope">
								<el-button type="text" icon="el-icon-delete" class="red"
									@click="showDeleIncomeTypeMsgBox(scope.row.incomeTypeId)">
									删除
								</el-button>
							</template>
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
		
	</div>	
	
</template>

<script>
export default{
	data(){
		return{
			query:'',
			incomeList:[],
			total:-1,
			pagenume:1,
			pagesize:2,
			
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
		
		showDeleIncomeTypeMsgBox(incomeTypeId){
			this.$confirm('删除用户?', '提示', {
			    confirmButtonText: '确定',
			    cancelButtonText: '取消',
			    type: 'warning'
			}).then(async()=> {
				const res = await this.$http.get('incomeTypeController/deleteIncomeType',{
					params:{incomeTypeId:this.incomeTypeId}
				})
				console.log(res)
				if(res.data.code==0){
					this.pagenume=1
					this.getIncomeTypeList()
					this.$message({
					type: 'success',
					message: res.data.msg,
					});
				}
			}).catch(() => {
			    this.$message({
			    type: 'info',
			    message: '已取消删除'
			    });          
			});
		},
		//添加收入类型
		LoadUserList(){
			this.getIncomeTypeList()
		},
		
		handleSearch(){
			this.getIncomeTypeList()
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
		
		//获取用户列表的请求
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
