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
					<el-table-column prop="userid" label="用户ID" align="center">
					</el-table-column>
					<el-table-column prop="username" label="姓名" align="center">
					</el-table-column>
					<el-table-column prop="familyname" label="家庭称呼" align="center">
					</el-table-column>
					<el-table-column prop="wage"label="工资" align="center">
					</el-table-column>
					<el-table-column prop="userage" label="年龄" align="center">
					</el-table-column>
					<el-table-column prop="consumptionquota" label="余额" align="center">
					</el-table-column>
					<el-table-column label="操作" width="130px" align="center">
						<template slot-scope="scope">
							<el-button type="danger" icon="el-icon-delete" size="mini" @click="removeUserMsg(scope.$index, scope.row)"></el-button>
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
					:page-size="8"
					:total="total"
					:page-count="pagecount"
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
			total:0,
			pagenume:1,
			pagesize:8,
			pagecount:0,
			aName: 'admin'
		}
	},
	computed: {
	    adminName() {
	        let adminName = localStorage.getItem('aName');
	        return adminName ? adminName : this.aName;
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
		
		//删除
		removeUserMsg(index, row){
				this.$axios({
					method:"get",
					url:"/family/AdministerController/deleteUserById",
					dataType:'JSONP',
					params:{
						id:row.userid,
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
		//搜索用户
		
		handleSearch(){
			this.$axios({
				method:"get",
				url:"/family/AdministerController/findUserByUserName",
				dataType:'JSONP',
				params:{
					userName:this.query
				}
			}).then(res=>{
				console.log(res);
				if(res.data.code==0){
					 this.userList = res.data.data;
					 console.log(res.data.data);
					 console.log(this.userList);
					 this.$message.success(`查询成功`);
					 	
				}else{
					 this.$message.error(res.data.msg);
				}
			})	
			//this.getUserList()
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
		getUserList(){
					this.$axios({
						method :"get",
						url:"/family/AdministerController/getUserList",
						dataType:"JSONP",
						params:{
							pageNum: this.pagenume,
							pageSize:this.pagesize
						}
					}).then(res=>{
						console.log(res);
						if(res.data.code ===0){
							this.userList = res.data.data;
							this.total = res.data.total;
							this.pagecount = res.data.pagecount
						}
					})
				}
		/*
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
		}*/
		
		
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
