<template>
	<div>
	 
	  <div id="chart_userpaymsg">
		  
			
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
			let myChart = echarts.init(document.getElementById('chart_userpaymsg'));
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
				                {value:235, name:'税收 20%',
									itemStyle: {
											color: '#ffff00'
										}
								},
				                {value:274, name:'衣食住行 24%',
									itemStyle: {
											color: '#51da15'
										}
								},
				                {value:310, name:'医疗 27%',
									itemStyle: {
											color: '#4a86e8'
										}
								},
				                {value:335, name:'其他 29%',
									itemStyle: {
											color: '#00ffff'
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
	#chart_userpaymsg{
		width: 500px;
		height: 400px;
		margin: 0 auto;
		
	}
	
	
</style>