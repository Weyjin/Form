;(function($, window, document,undefined) {

    var Tips = function(ele,opt) {
        this.$element = ele,
        this.defaults = {
			disable:false,
			html:true,
			defaultStyle:'',
			title:'标题',
			content:'内容',
			result:function(bool){}
        },
        this.options = $.extend({}, this.defaults, opt);
		this.init();
		return {}
    }
    Tips.prototype = {
		$Tip:0,
		styles:['tip-teal','tip-cyan','tip-pink','tip-yellow','tip-purple'],
		
	    init:function(){

		  this.encode();
		  $(document.body).append(this._create());
		  this._createTipStyle();
		  $(this.$Tip).hide();
		  $(this.$element).css('cursor','pointer');
          this.bindEvent();
		  

		},
		_create:function(){
			var id=this.getId();
			this.$Tip='#'+id;
		   return '<div class="tip '+this.options.defaultStyle+'" id="'+id+'">'+this.$title()+this.$content()+this.$arrow()+'</div>';
		},
		_createTipStyle:function(){
			var top=this.$elementTop()-this.$tipHeight()-10;
			var left=this.$elementLeft()-this.$tipWidth()/2+(this.$elementWidth()/2);
		    $(this.$Tip).css('top',top+'px');
            $(this.$Tip).css('left',left+'px');
		},
		$title:function(){
		   return '<div class="title">'+this.options.title+'</div>';
		},
		$content:function(){
		   return '<div class="content">'+this.options.content+'</div>';
		},
		$arrow:function(){
		   return '<div class="arrow"></div>';
		},
		$elementTop:function(){
		 var top= $(this.$element).offset().top;
		 return top;
		},
		$elementLeft:function(){
		  var left = $(this.$element).offset().left;
		  return left;
		},
		$elementWidth:function(){
		   var width=$(this.$element).outerWidth(true);
		   return width;
		},
		$elementHeight:function(){
		  var height=$(this.$element).outerHeight(true);
		  return height;
		},

		$tipTop:function(){
		 var top= $(this.$Tip).offset().top;
		 return top;
		},
		$tipLeft:function(){
		var left = $(this.$Tip).offset().left;
		return left;
		},
		$tipWidth:function(){	   
		   var width=$(this.$Tip).outerWidth(true);
		   return width;
		},
		$tipHeight:function(){
		  var height=$(this.$Tip).outerHeight(true);
		  return height;
		},
	    getId:function(){
		  var timestamp =new Date().getTime();
		  var random=(((1+Math.random())*0x10000)|0).toString(16).substring(1);
		  return '_t'+timestamp+random;	
		},
		bindEvent:function(){
			var that=this;
		   $(this.$element).hover(function(){
		       $(that.$Tip).fadeToggle();
			   that.options.result(true);
		   },function(){
		       $(that.$Tip).fadeToggle();
			   that.options.result(false);
		   });
			
		},
		encode:function(){
		   if(this.options.html){
			  var title=this.options.title.replace(/</g,"&lt;").replace(/>/g,"&gt;");           
			  var content=this.options.content.replace(/>/g,"&gt;").replace(/</g,"&lt;");
		      this.options.title=title;
			  this.options.content=content;
		  }
		}
		
    }


$.fn.Tips = function(options) {       
        
		var _tips = new Tips(this, options);
        return _tips;
    }

})(jQuery, window, document);