<template>
	<div>
		<el-card class="box-card">
			
			<!--1.面包屑-->
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>
					<i class="el-icon-user"></i> 用户管理
				</el-breadcrumb-item>
				<el-breadcrumb-item>用户列表</el-breadcrumb-item>
			</el-breadcrumb>
			<div>
				<!--2.搜索-->
				<el-row class="searchRow">
					<el-col>
						<el-input 
						@clear="LoadUserList()"
						clearable 
						v-model="query" 
						placeholder="用户名" 
						class="handle-input mr10"></el-input>
						<el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
					</el-col>
				</el-row>
				
				<!--3.表格-->
				<el-table
					:data="userList"
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
							<template slot-scope="scope">
								<el-button type="text" icon="el-icon-delete" class="red"
									@click="showDeleUserMsgBox(scope.row.userId)">
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
			userList:[],
			total:-1,
			pagenume:1,
			pagesize:2,
			
		}
	},
	created(){
		this.getUserList()
	},
	methods:{
		
		/*this.$axios.get('http://139.199.27.251:8080/elm/BusinessController/listBusinessByOrderTypeId',{
			params:{orderTypeId:this.orderTypeId}
		}).then(response=>{
			this.businessArr = response.data;
		}).catch(error=>{
			console.log("请稍后重试。");
		});*/
		
		showDeleUserMsgBox(userId){
			this.$confirm('删除用户?', '提示', {
			    confirmButtonText: '确定',
			    cancelButtonText: '取消',
			    type: 'warning'
			}).then(async()=> {
				const res = await this.$http.get('AdministerController/deleteUserById',{
					params:{userId:this.userId}
				})
				console.log(res)
				if(res.data.code==0){
					this.pagenume=1
					this.getUserList()
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
		//搜索用户
		LoadUserList(){
			this.getUserList()
		},
		
		handleSearch(){
			this.getUserList()
		},
		
		//处理分页
		handleSizeChange(val){
			console.log('每页${val}条');
			this.pagesize = val;
			this.pagenume = 1;
			this.getUserList();
		},
		
		handleCurrentChange(val){
			console.log('当前页:${val}');
			this.pagenume = val;
			this.getUserList();
		},
		
		//获取用户列表的请求
		async getUserList(){
			
			const AUTH_TOKEN = localStorage.getItem('token');
			this.$http.default.headers.common['Authorization'] = AUTH_TOKEN;
		
			const res = await this.$http.get(
			'AdministerController/getUserList',{
				params:{query:this.query},
				params:{pagenum:this.pagenum},
				params:{pagesize:this.pagesize}
			});
			console.log(res);
			const{meta:{code,msg},data:{users,total}}=res.data;
			if(code===0){
				this.userList = users
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

.handle-input {
    width: 300px;
    display: inline-block;
}
.inputSearch{
	width: 300px;
}
.searchRow{
	margin-top: 20px;
	margin-bottom: 20px;
	text-align: center;
}
.userTable{
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
