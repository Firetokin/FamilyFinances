<template>
	<el-card class="box-card">
		<!--1.面包屑-->
	    <el-breadcrumb separator="/">
	        <el-breadcrumb-item>
	            <i class="el-icon-money"></i> 收入支出管理
	            </el-breadcrumb-item>
	            
			<el-breadcrumb-item>支出列表</el-breadcrumb-item>
		</el-breadcrumb>
		
		<!--2.表格-->
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
			    width="250"
				align="center">
			    <template slot-scope="scope">
			        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
			        <el-button type="text" size="small">编辑</el-button>
			    </template>
			</el-table-column>
		</el-table>
		
		
	</el-card>
	
	
	
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
.searchRow{
	margin-top: 20px;
	text-align: center;
}
.payTypeTable{
	width: 100%;
	font-size: 14px;
	margin-top: 20px;
}
</style>
