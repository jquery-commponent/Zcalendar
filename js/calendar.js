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
            $this.calendarShow();
        },
        /**
         * 日历展示
         */
        calendarShow : function(){
            var $this = this;
        },
        /**
         * @private
         * 初始化各项参数
         */
        _initType : function(){
            var $this = this;
            $this._getNowDay();
        },
        /**
         * @private
         * 获取当前日期
         * 如果设置了nowDay,则获取设置的值为日历的当前日期，否则获取系统日期作为日历的当前时间
         */
        _getNowDay : function(){
            var $this = this;
            if($this.ops.nowDate){
                $this.nowYear = $this.ops.nowDate.split("-")[0];
                $this.nowMonth = $this.ops.nowDate.split("-")[1];
                $this.nowDay = $this.ops.nowDate.split("-")[2];
            }else{
                var date = new Date();
                $this.nowYear = date.getFullYear();
                $this.nowMonth = date.getMonth()+1;
                $this.nowDay = date.getDate();
            }
        }
    };
    $.fn.calendar = function(opstion){
        var calendar = new Calendar(this,opstion);
        return calendar;
    };
    $.fn.calendar.default = {
        nowDate : "" //日历中显示的当前日期
    }
})(jQuery,window,document);