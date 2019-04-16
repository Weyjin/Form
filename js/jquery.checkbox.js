;(function($, window, document,undefined) {

    var Checkbox = function(ele,opt) {
        this.$element = ele,
        this.defaults = {
			disable:false,
			defaultStyle:'checkbox-yellow',
			result:function(bool){}
        },
        this.options = $.extend({}, this.defaults, opt)
    }
    Checkbox.prototype = {
		$checkbox:0,
		styles:['checkbox-teal','checkbox-cyan','checkbox-pink','checkbox-yellow','checkbox-purple'],
		
	    init:function(){
		  var id=this.getId();       
		  $(this.$element).hide();
		  var _class='';
		  if ($(this.$element).prop("checked")) {
             _class='checkbox-on '+this.options.defaultStyle;
          } else {
             _class='checkbox-off';
          }
		
          var _checkbox='<div class="'+_class+'" id="'+id+'"></div>';
                     
          this.$checkbox='#'+id;
		  $(this.$element).after(_checkbox);
            

		},
	    getId:function(){
		  var timestamp =new Date().getTime();
		  var random=(((1+Math.random())*0x10000)|0).toString(16).substring(1);
		  return '_c'+timestamp+random;
		
		},
		event:function(){
		    var that=this;
		    $(this.$checkbox).click(function(e){
			   if($(that.$checkbox).hasClass('checkbox-on')){
				   $(that.$checkbox).removeClass('checkbox-on');
				   $(that.$checkbox).removeClass(that.options.defaultStyle);
				   $(that.$checkbox).addClass('checkbox-off');
				   $(that.$element).prop("checked", false);
				   that.options.result(false);
			   }else{
				   
				  $(that.$checkbox).addClass(that.options.defaultStyle);
                  			
			   }      
			   }   
			 );
             
			$(that.$checkbox).on("webkitAnimationend msAnimationend mozAnimationend animationend", function(e) {	  
               $(that.$element).prop("checked", true);
			   that.options.result(true);
			   $(that.$checkbox).removeClass('checkbox-off');			
			   $(that.$checkbox).addClass('checkbox-on');
			   $(that.$checkbox).addClass(that.options.defaultStyle);
			   
           });
		   
		   $(that.$element).change(function(e) { 
			   if($(that.$element).prop("checked")==true){
                   $(that.$checkbox).removeClass('checkbox-off');
			       $(that.$checkbox).addClass('checkbox-on');
				   $(that.$checkbox).addClass(that.options.defaultStyle);
                  that.options.result(true);
			   }else{
			   
			    $(that.$checkbox).removeClass('checkbox-on');
				   $(that.$checkbox).removeClass(that.options.defaultStyle);
				   $(that.$checkbox).addClass('checkbox-off');
				   $(that.$element).attr("checked", false);
				   that.options.result(false);
			   }
			  
			});

		},
		
		show:function(){
		   this.init();	
		   if($(this.$element).prop("disabled")==false){
              $(this.$checkbox).css('cursor','pointer');
		     this.event();
		   }else{
		     $(this.$checkbox).css('opacity','0.5');
			 $(this.$checkbox).css('cursor','not-allowed');
		   }
		   
		  return this;
		}
    }


$.fn.Checkbox = function(options) {       
        
		var _checkbox = new Checkbox(this, options);
        return _checkbox.show();
    }

})(jQuery, window, document);