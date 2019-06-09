;(function($, window, document,undefined) {
    //定义Tabs的构造函数
    var Tabs = function(ele, opt) {
        this.$element = ele,
        this.defaults = {
            defaultValue: 0,
			lineColor:'#ffcc12',
			result:function(index){}
        },
        this.options = $.extend({}, this.defaults, opt)
    }
    //定义Tabs的方法
    Tabs.prototype = {
        selectItemIndex:0,
		init:function(){
		    this.getLine().css({'width':this.getOffset()+'%','background':this.options.lineColor});
		},
		//绑定点击事件
		bindClick:function(){
			var that=this;
		    that.$element.find('.navbar>.navbar__item').each(function(index){
				$(this).on('click',function(){
					that.selectBar(index);
					that.selectContent(index);
				})
			  });
		},
		 //选中导航栏
		  selectBar:function(index){
			  var that=this;
			 
			  that.options.result(index);
			  that.selectItemIndex=index;
			  that.$element.find('.navbar>.navbar__item').each(function(i){
				 if(index==i){					   
					   $(this).css('color',that.options.lineColor);
					   that.setLineOffset(index);
				 }else{
					   $(this).css('color','#000');
				 }

			 })
		  },
		  //选中内容
		  selectContent:function(index){
			 this.$element.find('.tab__panel>.tab__content').each(function(i){
				  if(index==i){
					 $(this).css('display','block'); 
				  }else{					 
					 $(this).css('display','none'); 
				  }
			 });
		  },
		  //获得当前选中的下标
		  getSelectItem:function(){
		     return this.selectItemIndex;
		  },
		  //获得最大的下标
		  getMaxIndex:function(){
		     return this.getItemCount()-1;
		  },
		  getLine:function(){
		   return this.$element.find('.tab__lines .tab__line');
		  },
		  setLineOffset:function(index){
			var value=index*this.getOffset();
			var $line=this.getLine();				
				$line.animate({right:'-'+value+'%'});
		  },
		  getOffset:function(){
		    var offset=100/this.getItemCount();
			return offset;
		  },
		  getItemCount:function(){
		    var count=this.$element.find('.navbar').children('.navbar__item').length;
			return count;
		  },
		  onTouch:function(){
            var that=this;
		    //左右滑动翻页
			this.$element.find(".tab__panel").on('touchstart', function (e) {
			   //touchstart事件
				var $tb = $(this);
				var startX = e.touches[0].clientX,//手指触碰屏幕的x坐标
				    startY = e.touches[0].clientY,
					x=0,
					y=0,
					pullDeltaX = 0;
                    pullDeltaY = 0;
				$tb.on('touchmove', function (e) {
					//touchmove事件
					 x = e.touches[0].clientX;//手指移动后所在的坐标
					 y = e.touches[0].clientY;
					pullDeltaX = x - startX;//移动后的位移
					pullDeltaY = y - startY;
					if (!pullDeltaX|!pullDeltaY){
						return;
					}
					//e.preventDefault();//阻止手机浏览器默认事件
				});
				$tb.on('touchend', function (e) {
					//touchend事件
					$tb.off('touchmove touchend');//解除touchmove和touchend事件
					//所要执行的代码
					e.stopPropagation();

                                        var c=Math.sqrt(Math.pow(startY-y,2)+Math.pow(pullDeltaX,2));
                                        var cosb=Math.abs(pullDeltaX)/c;
					 if(cosb>0.95){
					   				 
					 //判断移动距离是否大于30像素
					 //向左滑
					if (pullDeltaX > 30 ){
						var index=that.getSelectItem();
						if(index!=0){
						   that.selectBar(index-1);
						   that.selectContent(index-1);
						   console.log("向左划...");
						}
						
						
					}
					//向右滑
					if(pullDeltaX<-30){
					   var index=that.getSelectItem();
						var maxIndex=that.getMaxIndex();
						if(index!=maxIndex){
						   that.selectBar(index+1);
						   that.selectContent(index+1);
						   console.log("向右划...");
						}				   			
					}
					 }


				
				   });
				});
		  },
		showTabs:function(){
		   this.init();
		   this.bindClick();
		   this.onTouch();
            var defaultValue=this.options.defaultValue;
		    if(defaultValue>this.getMaxIndex()||defaultValue<0){
			    throw 'the default value out of range'
			  }
			  if(isNaN(defaultValue)){
			    throw 'the default value is not a number'
			  }

		   this.selectBar(defaultValue);
		   this.selectContent(defaultValue);
		}
    }
 $.fn.tabs = function(options) {
        //创建Tabs的实体
        var tabs = new Tabs(this, options);
        //调用其方法
        return tabs.showTabs();
    }

})(jQuery, window, document);
