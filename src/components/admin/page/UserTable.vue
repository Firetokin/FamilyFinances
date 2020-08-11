<template>
	<el-card class="box-card">
		<!--1.面包屑-->
	    <el-breadcrumb separator="/">
	        <el-breadcrumb-item>
	            <i class="el-icon-user"></i> 用户管理
	            </el-breadcrumb-item>
	            
			<el-breadcrumb-item>用户列表</el-breadcrumb-item>
		</el-breadcrumb>
			
		<!--2.搜索-->
		<el-row class="searchRow">
			<el-col>
				<el-input placeholder="用户名" 
					v-model="query" 
					class="inputSearch">
					<el-button slot="append" icon="el-icon-search"></el-button>
				</el-input>
			</el-col>
		</el-row>
		
		<!--3.表格-->
		<el-table
		    :data="tableData"
			stripe
			border
			height="250"
			class="userTable">
		    <el-table-column prop="userId" label="用户ID" align="center">
		    </el-table-column>
		    <el-table-column prop="userName" label="姓名" align="center">
		    </el-table-column>
		    <el-table-column prop="password" label="密码" align="center">
		    </el-table-column>
			<el-table-column prop="familyName" label="家庭称呼" align="center">
			</el-table-column>
			<el-table-column prop="wage"label="工资" align="center">
			</el-table-column>
			<el-table-column prop="userAge" label="年龄" align="center">
			</el-table-column>
			<el-table-column prop="comsumption" label="余额" align="center">
			</el-table-column>
			<el-table-column
			    fixed="right"
			    label="操作"
			    width="200"
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
		this.getUserList()
	},
	methods:{
		//获取用户列表的请求
		getUserList(){
			this.$http.get()
		}
	}
}
</script>

<style>
.box-card{
	height: 100%;
}
.inputSearch{
	width: 300px;
}
.searchRow{
	margin-top: 20px;
	text-align: center;
}
.userTable{
	width: 100%;
	font-size: 14px;
	margin-top: 20px;
}
</style>
