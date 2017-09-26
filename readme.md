## 日历选择器  
这是一个日历选择器  
它依赖于zepto或者jquery  没区别只有能用$就可以了  

使用时要引入   
```
<link rel="stylesheet" href="./assets/calendar-min.css" />
<script charset="utf-8" src="https://g.alicdn.com/sj/lib/zepto/zepto.min.js" type="text/javascript"></script>
<script src="./assets/calendar-min.js"></script>
```
调用代码  
```
/**
 * [init 初始化方法]
 * @param  {string}   element  [容器id]
 * @param  {string}   date     [默认日期 为空则默认当天]
 * @param  {Function} callback [回调方法 会传入选择的日期]
 */
sm_calendar.init('calendar','',function(date){
	console.log('回调获取'+date);
});

```
## 结尾  
为什么我的js文件压缩了之后从10kb变成了8kb啊。。。。  
是我的代码太优秀还是太垃圾啊  


这个算是我自己写的第一个插件吧。。。我现在连前端构建工具都不会用啊 心塞  
开源许可证什么的让它见鬼去吧，这玩意会有人用 ？？？