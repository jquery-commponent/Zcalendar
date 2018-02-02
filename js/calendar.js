/**
 * Created by Administrator on 2017/10/13 0013.
 */
;(function($,window,document,undefined){
    var Calendar = function(element,opstion){
        this.$element = element;
        this.ops = $.extend({},$.fn.calendar.default,opstion);
        this.init();
    };
    Calendar.prototype = {
        /**
         * 初始化
         */
        init : function(){
            var $this = this;
            //初始化数据
            $this._initType();
            console.log($this.nowYear+"----"+$this.nowMonth+"-----"+$this.nowDay);
            console.log($this.Year+"----"+$this.Month);
            console.log($this.whatDay);
            console.log($this.monthDay);
            //展示日历
            $this.calendarShow();
        },

        /**
         * 日历展示
         * _fillingWeek  头部星期信息填充
         * _fillingHeader 头部年月信息填充
         * _fillingDate  日历主题信息填充
         */
        calendarShow : function(){
            var $this = this;
            $this._whatDay();
            //插入头部星期信息
            $this._fillingWeek();
            //插入头部年月信息
            $this._fillingHeader();
            //插入日历主体信息
            $this._fillingDate();

        },
        /**
         * 点击上个月按钮的事件
         * lastMonthBtn如果用户设置了，那就将事件绑定到lastMonthBtn上
         * 设置年月
         * 清空日历
         * 填充日历
         */
        lastMonth : function(){
            var $this = this;
            if($this.ops.lastMonthBtn){
                var $lastMonthBtn = $this.$element.find($this.ops.lastMonthBtn);
                $lastMonthBtn.on("click",function () {
                    if($this.Month > 1){
                        //将月数减一
                        $this.Month--;
                    }else{
                        //将月设置为12月，将年数减一年
                        $this.Month = 12;
                        $this.Year--;
                        //判断一下这个年是否是闰年
                        $this._isLeap();
                    }
                    $this.$element.find(".week").empty();
                    $this.calendarShow();
                });
            }
        },
        /**
         * 点击下个月按钮的事件
         * nextMonthBtn如果用户设置了，那就将事件绑定到nextMonthBtn上
         * 设置年月
         * 清空日历
         * 填充日历
         */
        nextMonth : function(){
            var $this = this;
            if($this.ops.nextMonthBtn){
                var $nextMonthBtn = $this.$element.find($this.ops.nextMonthBtn);
                $nextMonthBtn.on("click",function () {
                    if($this.Month < 12){
                        //将月数减一
                        $this.Month++;
                    }else{
                        //将月设置为12月，将年数减一年
                        $this.Month = 1;
                        $this.Year++;
                        //判断一下这个年是否是闰年
                        $this._isLeap();
                    }
                    $this.$element.find(".week").empty();
                    $this.calendarShow();
                });
            }
        },
        /**
         * 点击上一年按钮的事件
         * lastYearBtn如果用户设置了，那就将事件绑定到lastYearBtn上
         * 设置年
         * 清空日历
         * 填充日历
         */
        lastYear : function(){
            var $this = this;
            if($this.ops.lastYearBtn){
                var $lastYearBtn = $this.$element.find($this.ops.lastYearBtn);
                $lastYearBtn.on("click",function () {
                    //年份减一
                    $this.Year--;
                    //判断闰年
                    $this._isLeap();

                    $this.$element.find(".week").empty();
                    $this.calendarShow();
                });
            }
        },
        /**
         * 点击下一年按钮的事件
         * nextYearBtn如果用户设置了，那就将事件绑定到nextYearBtn上
         * 设置年
         * 清空日历
         * 填充日历
         */
        nextYear : function(){
            var $this = this;
            if($this.ops.nextYearBtn){
                var $nextYearBtn = $this.$element.find($this.ops.nextYearBtn);
                $nextYearBtn.on("click",function () {
                    //年份加一
                    $this.Year++;
                    //判断闰年
                    $this._isLeap();

                    $this.$element.find(".week").empty();
                    $this.calendarShow();
                });
            }
        },

        //------------------------------------------------------------------------------------------------------------------------------------------------------------+
        //------------------------------------------------------------------------三八线------------------------------------------------------------------------------+
        //------------------------------------------------------------------------------------------------------------------------------------------------------------+
        /**TODO
         * @private
         * 填充日历头部的星期信息
         * calendarDirection判断日历是横向显示的还是纵向显示的，vertical表示横向显示，horizontal表示纵向显示
         * 星期 1至7 分别 对应 id为 week-1至week-7，暂时先定死前缀week后期可以让用户自己设置前缀
         * 设置星期块的样式类为WeekHeaderClass
         */
        _fillingWeek : function () {
            var $this = this;
            var $calendar = $this.$element.find($this.ops.calendarBody);
            if(this.ops.calendarDirection == "vertical"){
                //横向
                $calendar.css({
                    display : "flex"
                });
            }else if($this.ops.calendarDirection == "horizontal"){
                //纵向
                $calendar.css({
                    display : "flex",
                    flexDirection : "column "
                });
            }
            //设置日历头部的星期栏
            for(var i=1;i<=7;i++){
                var weekDiv = "<div id='week-" + i + "' class='week'></div>";
                var weekHeader = "<div class='"+ $this.ops.WeekHeaderClass +"'>星期"+ i +"</div>";
                $calendar.append(weekDiv);
                $calendar.find("#week-"+i).append(weekHeader);
            }
        },

        /**
         * @private
         * 填充主体部分的日历
         */
        _fillingDate : function(){
            var $this = this;
            var y = $this.whatDay;
            //填充上个月的部分
            for(var i=1; i<y; i++){
                var dateDiv = "<div class='"+ $this.ops.dateDivClass +"'></div>";
                $this.$element.find($this.ops.calendarBody).find("#week-"+i).append(dateDiv);
            }
            //填充当前展示月的部分
            for(var k=1; k<=$this.monthDay[$this.Month-1]; k++){
                var dateDiv = "<div class='"+ $this.ops.dateDivClass +"'>"+ k +"</div>";
                $this.$element.find($this.ops.calendarBody).find("#week-"+y).append(dateDiv);
                if(y==7){
                    y=1;
                }else{
                    y++;
                }
            }
        },
        /**
         * @private
         * 头部信息的显示
         * isHeader判断日历是否显示头部的年月信息
         * 将年信息填充到yearItem中
         * 将月信息填充到monthItem中
         */
        _fillingHeader : function(){
            var $this = this;
            if($this.ops.yearItem){
                $this.$element.find($this.ops.yearItem).text($this.Year+"年");
            }
            if($this.ops.monthItem){
                $this.$element.find($this.ops.monthItem).text($this.Month+"月");
            }
        },
        /**
         * @private
         * 初始化各项参数
         */
        _initType : function(){
            var $this = this;
            //获取当前的年份，月份，日期
            $this._getNowDay();
            //判断当前年份是闰年还是非闰年
            $this._isLeap();
            //判断当前展示的月的第一天在日历中是星期几
            $this._whatDay();
            //计算当前展示的月在日历中显示几行
            $this._whatRow();

            //绑定事件
            $this.lastMonth();
            $this.nextMonth();
            $this.lastYear();
            $this.nextYear();
        },

        /**
         * @private
         * 获取当前日期
         * 如果设置了nowDay,则获取设置的值为日历的当前日期，否则获取系统日期作为日历的当前时间
         * Year     记录日历展示的年份
         * Month    记录日历展示的月份
         * nowYear  记录当前年份
         * nowMonth 记录当前月份
         * nowDay   记录当前天
         */
        _getNowDay : function(){
            var $this = this;
            if($this.ops.nowDate){
                $this.Year = $this.nowYear = $this.ops.nowDate.split("-")[0];
                $this.Month = $this.nowMonth = $this.ops.nowDate.split("-")[1];
                $this.nowDay = $this.ops.nowDate.split("-")[2];
            }else{
                var date = new Date();
                $this.Year = $this.nowYear = date.getFullYear();
                $this.Month = $this.nowMonth = date.getMonth()+1;
                $this.nowDay = date.getDate();
            }
        },

        /**
         * @private
         * 判断日历展示的年份是否是闰年
         * 如果是闰年则把月天数数组设置为闰年数组，否则设置为非闰年数组
         * monthDay     记录当前展示年份每个月的天数
         */
        _isLeap : function(){
           var $this = this;

            if ($this.Year % 4 == 0){
                if ($this.Year % 100 != 0){
                    $this.monthDay = [31,29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                }else{
                    $this.monthDay = [31,28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                }
                if($this.Year % 400 == 0){
                    $this.monthDay = [31,29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                }else{
                    $this.monthDay = [31,28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                }
            }else{
                $this.monthDay = [31,28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            }
        },
        /**
         * @private
         * 判断当月第一天是星期几
         */
        _whatDay : function () {
            var $this =this;
            var date = new Date($this.Year,$this.Month-1,1);
            $this.whatDay = date.getDay() == 0 ? 7 : date.getDay();
        },

        /**
         * @private
         * 判断当前展示月在日历中显示几行
         * 暂时不用，好久好久之前写的，忘了当时为什么要写这个方法，手动尴尬
         */
        _whatRow : function () {
            var $this = this;
            if($this.monthDay[$this.Month] % 7 == 0){
                $this.whatRow =Math.floor($this.monthDay[$this.Month] / 7)  ;
            }else{
                $this.whatRow =Math.floor($this.monthDay[$this.Month] / 7) + 1;
            }
        }
    };
    $.fn.calendar = function(opstion){
        var calendar = new Calendar(this,opstion);
        return calendar;
    };
    $.fn.calendar.default = {
        nowDate : "" ,                      //日历中显示的当前日期
        calendarDirection : "vertical",             //日历显示方向
        calendarBody : "#calendarBody",   //日历主体展示部分容器
        WeekHeaderClass : "week-header",       //日历头部的星期块的样式class
        dateDivClass : "date-div",           //日历主体部分的日期样式class

        yearItem : "",      //日历显示在头部的年信息
        monthItem : "",    //日历显示在头部的月信息

        lastMonthBtn : "",  //上个月按钮
        nextMonthBtn : "",   //下个月按钮

        lastYearBtn : "",   //上一年按钮
        nextYearBtn : ""    //下一年按钮
    }
})(jQuery,window,document);