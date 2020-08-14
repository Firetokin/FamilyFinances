<template>
	<div>
	 
	  <div id="chart_userincomemsg">
		  
			
	  </div>
	</div>
	
	
</template>

<script>
	import echarts from 'echarts'
		
	export default{
		data(){
			return{
				
			}
		},
		mounted(){	
			let this_ = this;
			let myChart = echarts.init(document.getElementById('chart_userincomemsg'));
			let option={
				    visualMap: {
				        show: false,
				        min: 80,
				        max: 500,
				        inRange: {
				            colorLightness: [0, 1]
				        }
				    },
				    series : [
				        {
				            name: 'user_paymsg',
				            type: 'pie',
				            radius: '55%',
				            data:[
				                {value:245, name:'工资 21%',
									itemStyle: {
											color: '#cfe2f3'
										}
								},
				                {value:274, name:'股票 23%',
									itemStyle: {
											color: '#b4a7d6'
										}
								},
				                {value:310, name:'分红 26%',
									itemStyle: {
											color: '#ead1dc'
										}
								},
				                {value:335, name:'奖金 28%',
									itemStyle: {
											color: '#e69138'
										}
								}
				            ],
				            roseType: 'angle',
				            label: {
				                normal: {
				                    textStyle: {
				                        color: 'rgba(28, 50, 217, 0.9)'
				                    }
				                }
				            },
				            labelLine: {
				                normal: {
				                    lineStyle: {
				                        color: 'rgba(12, 40, 245, 0.8)'
				                    }
				                }
				            }
				        }
				    ]
			};
			myChart.setOption(option);
			 
			//建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
			window.addEventListener('resize',function() {myChart.resize()});
		},
		
		
	}
	
</script>
	


<style>
	#chart_userincomemsg{
		width: 500px;
		height: 400px;
		margin: 0 auto;
		
	}
	
	
</style>