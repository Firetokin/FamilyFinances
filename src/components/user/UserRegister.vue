<template>
	<div class="register_container">
		<div class="register_box">
			
			<el-form label-width="80px" label-position="top" class="from_register">
				
				<el-form-item label="用户名" >
					<el-input ></el-input>
				</el-form-item>

			
				<el-form-item label="密码">
					<el-input >密码</el-input>
				</el-form-item>
			

				<el-form-item label="工资">
					<el-input >工资</el-input>
				</el-form-item>
						
			
				<el-form-item label="年龄">
					<el-input >年龄</el-input>
				</el-form-item>
			
					
				<el-form-item label="消费额度">
					<el-input >消费额度</el-input>
				</el-form-item>
			
			
				<el-form-item label="家庭角色">
					<el-select placeholder="请选择家庭角色">
						<el-option label="父亲" value="father"></el-option>
						<el-option label="母亲" value="mother"></el-option>
						<el-option label="儿子" value="son"></el-option>
						<el-option label="女儿" value="daughter"></el-option>
						<el-option label="祖父" value="grandfather"></el-option>
						<el-option label="祖母" value="grandmother"></el-option>
					</el-select>
				</el-form-item>
				
				<!-- 按钮区域 -->
				<el-form-item class="btn_lr" style="margin-top: 40px;">
					<el-button type="primary" plain style="margin-right: 50px;">确认注册</el-button>
					<el-button type="info" plain>重置</el-button>
				</el-form-item>
			</el-form>
			
		</div>
		
	</div>
	
</template>

<script>
</script>

<style>
	.register_container{
		background-color: #F4F5EE;
		background-image: url("https://www.transparenttextures.com/patterns/dust.png");
		height: 100%;
		width: 100%;
		background-size: 100% 100%;
		position: fixed;
	}
	
	.register_box{
		width: 500px;
		height: 700px;
		background-color: aliceblue;
		border-radius: 10px;
		position: absolute;
		left: 50%;
		top: 230px;
		transform: translate(-50%,-20%);
	}
	.from_register{
		position: absolute;
		bottom: 0px;
		width: 100%;
		padding: 100px 50px;
		box-sizing: border-box; /*不设置是默认的，框会超出表单*/
	}
	.el-form--label-top .el-form-item__label {
	    float: none;
	    display: inline-block;
	    text-align: left;
	    padding: 0 0 1px;
	}
	.el-form-item {
	    margin-bottom: 2px;
	}
		
	.el-input .el-input__inner{
		background-color: #FFFFFF;
		padding: 0px 210px 0px 15px;
	}
</style>
