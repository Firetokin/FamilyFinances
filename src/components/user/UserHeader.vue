<template>
	<!-- 头部区域 -->
	  <el-header style="height: 120px;">
		  <!-- 图标、名称 -->
		  <div style="margin-bottom: 20px;">
			  <img src="../../assets/feimg/logo_login.png" style="width: 98px; height: 98px;"/>
			  <span>家庭理财系统</span>
		  </div>
		  <!-- 导航选项 -->
		  <div class="nav_header">
			  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
				<el-menu-item index="1">首页</el-menu-item>
				<el-submenu index="2">
				  <template slot="title">收支信息管理</template>
				  <el-menu-item index="2-1">查询收入信息</el-menu-item>
				  <el-menu-item index="2-2">添加收入信息</el-menu-item>
				  <el-menu-item index="2-3">查询支出信息</el-menu-item>
				  <el-menu-item index="2-4">添加支出信息</el-menu-item>
				</el-submenu>
				<el-menu-item index="3">查看报表</el-menu-item>
				<el-submenu index="4">
				  <template slot="title">个人中心</template>
				  <el-menu-item index="4-1">个人信息</el-menu-item>
				  <el-menu-item index="4-2">修改密码</el-menu-item>
				  <el-menu-item index="4-3">退出登录</el-menu-item>
				  <el-menu-item index="4-4">注销账号</el-menu-item>
				</el-submenu>
			  </el-menu>
			</div>  
	  </el-header>
</template>

<script>
	export default {
		name:'UserHeader',
	    data() {
	      return {
	        activeIndex: '1',
	        activeIndex2: '1'
	      };
	    },
	    methods: {
	      handleSelect(key, keyPath) {
	        console.log(key, keyPath);
	      }
	    }
	  }

</script>

<style lang="less">
	.el-header{
		width: 100%;
		padding: 0 80px 0 50px;
		background-color: white;
		display: flex;
		justify-content: space-between;
		
		align-items: center;
		color: #EC7541;
		font-size: 25px;
		position: absolute;
		top: 0px;
		
		> div {
			display: flex;
			align-items: center;
			span {
				margin-left: 20px;
			}
		}
	} 
	.el-footer {
	    background-color: #EC7541;
		display: flex;
		justify-content: center;
		line-height: 60px;
		position: absolute;
		bottom: 0px;
		left: 0px;
		width: 100%;
	   
	}
	
	.nav_header/deep/.el-menu-item{
		font-size: 20px;
		color: #303133;
		padding: 0 30px;
		cursor: pointer;
		transition: border-color .3s,background-color .3s,color .3s;
		box-sizing: border-box;
		
	}  
	
	.nav_header/deep/.el-submenu__title {
		font-size: 20px;
		color: #303133;
		padding: 0 30px;
		cursor: pointer;
		transition: border-color .3s,background-color .3s,color .3s;
		box-sizing: border-box;
	}
	
	.nav_header{
		margin-left: 500px;
	}
		
</style>
