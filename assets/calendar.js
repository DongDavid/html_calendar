"use strict";
var sm_calendar = {
	el:'',
	days_count:42,  //共有42个格子
	year:'',
	month:'', // 从0开始 9指8月
	day:'',
	current:'',
	current_date:'',
	weekends:['日','一','二','三','四','五','六'],
	months:['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
	callback:function(date){},
	init:function(element,date,callback){
		this.el = $('#'+element);
		if (!this.el) {
			return false;
		}
		if (date) {
			this.current = new Date(date);
		}else{
			this.current = new Date();
		}
		if (callback) {
			this.callback = function(date){callback(date)};
		}
		this.current_date = this.current;
		// console.log(this.current.toLocaleString());
		
		// console.log('init,当前日期:'+this.current.toLocaleString());
		// 获取月份天数 月份不需要减1
		this.tpl();
		this.dateinit();
		this.jsinit();
	},
	tpl:function() {
		var tpl = '<div class="sm-calendar-row"> <div class="sm-calendar-select"> <span class="sm-calendar-btn sm-calendar-btn-last-year"> &lt; </span> <span class="sm-calendar-year"> </span> <span class="sm-calendar-btn sm-calendar-btn-next-year"> &gt; </span> </div> <div class="sm-calendar-select"> <span class="sm-calendar-btn sm-calendar-btn-last-month"> &lt; </span> <span class="sm-calendar-month"> </span> <span class="sm-calendar-btn sm-calendar-btn-next-month"> &gt; </span> </div> </div> <div class="sm-calendar-row sm-calendar-week-days"> <div class="sm-calendar-week sm-calendar-day-weekend"> <span> 日 </span> </div> <div class="sm-calendar-week"> <span> 一 </span> </div> <div class="sm-calendar-week"> <span> 二 </span> </div> <div class="sm-calendar-week"> <span> 三 </span> </div> <div class="sm-calendar-week"> <span> 四 </span> </div> <div class="sm-calendar-week"> <span> 五 </span> </div> <div class="sm-calendar-week sm-calendar-day-weekend"> <span> 六 </span> </div> </div> <div class="sm-calendar-row"> <div class="sm-calendar-day sm-calendar-day-weekend"  name="p1"> <span> </span> </div> <div class="sm-calendar-day"  name="p2"> <span> </span> </div> <div class="sm-calendar-day"  name="p3"> <span> </span> </div> <div class="sm-calendar-day" name="p4"> <span> </span> </div> <div class="sm-calendar-day" name="p5"> <span> </span> </div> <div class="sm-calendar-day" name="p6"> <span> </span> </div> <div class="sm-calendar-day sm-calendar-day-weekend" name="p7"> <span> </span> </div> </div> <div class="sm-calendar-row"> <div class="sm-calendar-day sm-calendar-day-weekend" name="p8"> <span> </span> </div> <div class="sm-calendar-day" name="p9"> <span> </span> </div> <div class="sm-calendar-day" name="p10"> <span> </span> </div> <div class="sm-calendar-day" name="p11"> <span> </span> </div> <div class="sm-calendar-day" name="p12"> <span> </span> </div> <div class="sm-calendar-day" name="p13"> <span> </span> </div> <div class="sm-calendar-day sm-calendar-day-weekend" name="p14"> <span> </span> </div> </div> <div class="sm-calendar-row"> <div class="sm-calendar-day sm-calendar-day-weekend" name="p15"> <span> </span> </div> <div class="sm-calendar-day" name="p16"> <span> </span> </div> <div class="sm-calendar-day" name="p17"> <span> </span> </div> <div class="sm-calendar-day" name="p18"> <span> </span> </div> <div class="sm-calendar-day" name="p19"> <span> </span> </div> <div class="sm-calendar-day" name="p20"> <span> </span> </div> <div class="sm-calendar-day sm-calendar-day-weekend" name="p21"> <span> </span> </div> </div> <div class="sm-calendar-row"> <div class="sm-calendar-day sm-calendar-day-weekend" name="p22"> <span> </span> </div> <div class="sm-calendar-day" name="p23"> <span> </span> </div> <div class="sm-calendar-day" name="p24"> <span> </span> </div> <div class="sm-calendar-day" name="p25"> <span> </span> </div> <div class="sm-calendar-day" name="p26"> <span> </span> </div> <div class="sm-calendar-day" name="p27"> <span> </span> </div> <div class="sm-calendar-day sm-calendar-day-weekend" name="p28"> <span> </span> </div> </div> <div class="sm-calendar-row"> <div class="sm-calendar-day sm-calendar-day-weekend" name="p29"> <span> </span> </div> <div class="sm-calendar-day" name="p30"> <span> </span> </div> <div class="sm-calendar-day" name="p31"> <span> </span> </div> <div class="sm-calendar-day" name="p32"> <span> </span> </div> <div class="sm-calendar-day" name="p33"> <span> </span> </div> <div class="sm-calendar-day" name="p34"> <span> </span> </div> <div class="sm-calendar-day sm-calendar-day-weekend" name="p35"> <span> </span> </div> </div> <div class="sm-calendar-row"> <div class="sm-calendar-day sm-calendar-day-weekend" name="p36"> <span> </span> </div> <div class="sm-calendar-day" name="p37"> <span> </span> </div> <div class="sm-calendar-day" name="p38"> <span> </span> </div> <div class="sm-calendar-day" name="p39"> <span> </span> </div> <div class="sm-calendar-day" name="p40"> <span> </span> </div> <div class="sm-calendar-day" name="p41"> <span> </span> </div> <div class="sm-calendar-day sm-calendar-day-weekend" name="p42"> <span> </span> </div> </div> ';
		this.el.html(tpl);
	},	
	dateinit:function(){
		this.month = this.current.getMonth();
		this.year = this.current.getFullYear();
		this.day = this.current.getDate();
		// 获取月份天数 月份 需要加1
		var daysOfMonth = new Date(this.year,this.month+1,0).getDate();
		var tmp;
		// 
		tmp = new Date(this.year,this.month-1,1);
		var last = tmp.getFullYear()+'-'+(tmp.getMonth()+1)+'-';
		tmp = new Date(this.year,this.month+1,1);
		// 
		var next = tmp.getFullYear()+'-'+(tmp.getMonth()+1)+'-';
		var current = this.year+'-'+(this.month+1)+'-';
		var lastDays = this.getLastDays();
		// console.log(last,current,next);
		var k = 1;
		var i = 0;
		this.el.find("span.sm-calendar-year").text(this.year+'年');
		this.el.find("span.sm-calendar-month").text(this.months[this.month]);
		this.el.find(".sm-calendar-day span").removeClass('selected');
		this.el.find('.sm-calendar-day').removeClass('current');
		this.el.find('.sm-calendar-day').removeClass('next');
		this.el.find('.sm-calendar-day').removeClass('last');
		for(i = 0;i<lastDays.length;i++){
			this.el.find("div[name='p"+k+"'] span").text(lastDays[i]);
			this.el.find("div[name='p"+k+"']").attr('data-date',last+lastDays[i]);
			this.el.find("div[name='p"+k+"']").addClass('last');
			k++;
			// console.log(last+lastDays[i]);
		}
		for(i = 1;i<=daysOfMonth;i++){
			this.el.find("div[name='p"+k+"'] span").text(i);
			this.el.find("div[name='p"+k+"']").attr('data-date',current+i);
			this.el.find("div[name='p"+k+"']").addClass('current');
			k++;
			// console.log(current+i);
		}
		for(i=1;k<=42;i++){
			this.el.find("div[name='p"+k+"'] span").text(i);
			this.el.find("div[name='p"+k+"']").attr('data-date',next+i);
			this.el.find("div[name='p"+k+"']").addClass('next');
			k++;
		}
		var _this = this;
		$('.sm-calendar .sm-calendar-day').unbind('click');
		$('.sm-calendar .current').click(function(event){
			_this.current_date = new Date($(this).attr('data-date'));
			_this.onselect();
		})
		$('.sm-calendar .last,.next').click(function(event){
			_this.current_date = new Date($(this).attr('data-date'));
			// console.log(_this.dateformate(_this.current_date));
			_this.current = new Date($(this).attr('data-date'));
			_this.dateinit();
			_this.onselect();
		})
		
	},
	getLastDays:function(){
		var first = new Date(this.year,this.month,1).getDay();
		if (first == 0) {
			return [];
		}
		var start = new Date(this.year,this.month,1-first).getDate();
		// var start = new Date(this.year,this.month-1,1-1).getDate();
		var end = new Date(this.year,this.month,0).getDate(); // 上个月的最后一天
		// console.log(start,end);
		var list = [];
		for(var i = start;i<=end;i++){
			list.push(i);
		}
		return list;
	},
	dateformate:function(date,formate) {
		// date = new Date(date);
		switch(formate){
			case 'Y':
				return date.getFullYear();
				break;
			case 'm':
				var tmp = date.getMonth()+1;
				if (tmp.length == 1) {tmp = '0'+tmp};
				break;
			case 'd':
				return date.getDate();
				break;
			default:
				return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
				break;
		}
	},
	jsinit:function(){
		var _this = this;
		$('.sm-calendar .sm-calendar-select .sm-calendar-btn-last-month').click(function(){
			_this.current = new Date(_this.year,_this.month-1,_this.day);
			console.log(_this.dateformate(_this.current));
			_this.dateinit();
			_this.onselect();
		});
		$('.sm-calendar .sm-calendar-select .sm-calendar-btn-next-month').click(function(){
			_this.current = new Date(_this.year,_this.month+1,_this.day);
			console.log(_this.dateformate(_this.current));
			_this.dateinit();
			_this.onselect();
		})
		$('.sm-calendar .sm-calendar-select .sm-calendar-btn-last-year').click(function(){
			_this.current = new Date(_this.year-1,_this.month,_this.day);
			_this.dateinit();
			_this.onselect();
		});
		$('.sm-calendar .sm-calendar-select .sm-calendar-btn-next-year').click(function(){
			_this.current = new Date(_this.year+1,_this.month,_this.day);
			_this.dateinit();
			_this.onselect();
		})
		
	},
	onselect:function(){
		var selected = this.dateformate(this.current_date);
		this.el.find(".sm-calendar-day span").removeClass('selected');
		this.el.find("div[data-date='"+selected+"'] span").addClass('selected');
		this.callback(selected);
	}

};