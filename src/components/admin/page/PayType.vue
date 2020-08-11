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
						  <el-button type="primary" plain>添加类型</el-button>
					</el-col>
				</el-row>
				
				<!--3.表格-->
				<el-table
					:data="tableData"
					stripe
					border
					height="250"
					class="payTypeTable">
					<el-table-column prop="payTypeId" label="支出类型ID" align="center">
					</el-table-column>
					<el-table-column prop="payTypeName" label="支出类型" align="center">
					</el-table-column>
					<el-table-column
						fixed="right"
						label="操作"
						width="200"
						align="center">
						<template slot-scope="scope">
							<template slot-scope="scope">
								<el-button type="text" icon="el-icon-delete" class="red"
									@click="handleDelete(scope.$index, scope.row)">
									删除
								</el-button>
							</template>
						</template>
					</el-table-column>
				</el-table>
			</div>	
			<!--4.分页-->
			<div class="pagination">
				<el-pagination
					background layout="total, prev, pager, next"
					:current-page="query.pageIndex"
					:page-size="query.pageSize"
					:total="pageTotal"
					@current-change="handlePageChange">
				</el-pagination>
			</div>
		</el-card>	
	</div>	
	
</template>

<script>
export default{
	data(){
		return{
			query:''
		}
	},
	created(){
		this.getpayTypeList()
	},
	methods:{
		//获取用户列表的请求
		getpayTypeList(){
			this.$http.get()
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
</style>
