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
            $this._initType();
            console.log($this.nowYear+"----"+$this.nowMonth+"-----"+$this.nowDay);
            console.log($this.whatDay);
            console.log($this.monthDay);
            $this.calendarShow();
        },

        /**
         * 日历展示
         */
        calendarShow : function(){
            var $this = this;
            var $calendar = $this.$element.find($this.ops.calendarBody);
            var calendarWidth = $calendar.innerWidth();
            $calendar.append("")
        },

        /**
         * @private
         * 初始化各项参数
         */
        _initType : function(){
            var $this = this;
            $this._getNowDay();
            $this._whatDay();
            $this._isLeap();
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
                $this.Month = $this.nowMonth = date.getMonth();
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
            var date = new Date($this.Year,$this.Month,1);
            $this.whatDay = date.getDay() == 0 ? 7 : date.getDay();
        }
    };
    $.fn.calendar = function(opstion){
        var calendar = new Calendar(this,opstion);
        return calendar;
    };
    $.fn.calendar.default = {
        nowDate : "" ,                      //日历中显示的当前日期
        calendarBody : "#calendarBody"   //日历主体展示部分容器
    }
})(jQuery,window,document);