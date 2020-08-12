
<template>
  <div>
   
    <div id="chart_pay">
 
    </div>
  </div>
</template>
 
<script>
  import echarts from 'echarts'
  export default {
    data() {
      return {}
    },
    mounted() {
      let this_ = this;
      let myChart = echarts.init(document.getElementById('chart_pay'));
      let option = {
        color: ['#a4c2f4'],
        tooltip : {
          trigger: 'axis',
          axisPointer : {
            type : 'shadow'
          }
        },
        xAxis : [
          {
            type : 'category',
            data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月',],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis : [
          {
            type : 'value'
          }
        ],
        series : [
          {
            name:'每月花费',
            type:'bar',
            barWidth: '60%',
            data:[11995,6366,4244,8258,6354,2336,6435,5426,8246,5225,5427,5356]
          }
        ]
      };
      myChart.setOption(option);
 
      //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
      window.addEventListener('resize',function() {myChart.resize()});
    },
    methods: {},
    watch: {},
    created() {
 
    }
  }
</script>
<style scoped>
  #chart_pay{
    width: 300px;
    height: 300px;
    
    margin: 0 auto;
  }
</style>
 