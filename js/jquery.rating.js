;(function($, window, document,undefined) {

    var Rating = function(ele,opt) {
        this.$element = ele,
        this.defaults = {
			leavl_msg:['未评分','较差','差','一般','好','较好','良好','优','棒','超棒','超级棒'],
			defaultLeavl:0,
			disable:false
        },
        this.options = $.extend({}, this.defaults, opt)
    }
    Rating.prototype = {
        clickActivate:false,
		stars:[0,6,13,24,31,42,49,60,66,78,84],
		//初始化
	    init:function(){

           $(this.$element).append('<i class="star"></i>');
           $(this.$element).append('<span class="rating-text"></span>');
           $(this.$element).addClass("rating");
		   this.defaultLeavl();
		   if(!this.options.disable){
		     this.mousemove();
		     this.hover();
		     this.click();
		   }
           
		},
		click:function(){
			var that=this;
		    $(this.$element).click(function(){
				that.clickActivate=true;
			});
		
		},
		hover:function(){
			var that=this;
		   $(this.$element).hover(function(e){
			
				that.clickActivate=false;			  
			        	
	         },function(){
			 
			   if(!that.clickActivate){
				   $(that.$element).find("i").css('width','0px');
                   $(that.$element).find("span").text(that.options.leavl_msg[0]);
				   that.options.defaultLeavl=0;
			   }
			 });

			 $(this.$element.find('span')).on('mousemove',function(e){
                e.stopPropagation();
             });
		
		},
		mousemove:function(){
		
			var current=this;
			$(this.$element).mousemove(function(e1){
				var offsetX=e1.offsetX;
				var offsetY=e1.offsetY;
                
				var that=this;
				var leavl_msg=current.options.leavl_msg;

				if(offsetY>10){
				   $(that).find("i").css('width','0px');
				   $(that).find("span").text(leavl_msg[0]);
				   current.options.defaultLeavl=0;
				}
                current.setLeavl(offsetX);
			   
		  });
		
		},
		defaultLeavl:function(){
			
            var leavl_msg=this.options.leavl_msg;
		    $(this.$element).find("i").css('width',this.stars[this.options.defaultLeavl]+'px');
			$(this.$element).find("span").text(leavl_msg[this.options.defaultLeavl]);
			
		},
		setLeavl:function(offsetX){
		 
          var leavl_msg=this.options.leavl_msg;
          
		  for(var i=1;i<this.stars.length;i++){
		       if(this.stars[i-1]<offsetX&offsetX<=this.stars[i]){
					$(this.$element).find("i").css('width',this.stars[i]+'px');
					$(this.$element).find("span").text(leavl_msg[i]);
					this.options.defaultLeavl=i;
					break;
				}
		  }
		
		},
	    getLeavl:function(){
		  return this.options.defaultLeavl;
		},
		show:function(){
		   this.init();		   
		  return this;
		}
    }


$.fn.rating = function(options) {       
        //调用其方法
		var rating = new Rating(this, options);
        return rating.show();
    }

})(jQuery, window, document);