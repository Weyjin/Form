;(function($, window, document,undefined) {

    var Switch = function(ele,opt) {
        this.$element = ele,
        this.defaults = {
			disable:false,
			defaultStyle:'switch-yellow',
			result:function(bool){}
        },
        this.options = $.extend({}, this.defaults, opt)
    }
    Switch.prototype = {
		$switch:0,
		styles:['switch-teal','switch-cyan','switch-pink','switch-yellow','switch-purple'],
		
	    init:function(){
		  var id=this.getId();

          
		  $(this.$element).hide();
		  var _class='';
		  if ($(this.$element).prop("checked")) {
             _class='switch-on '+this.options.defaultStyle;
          } else {
             _class='switch-off';
          }
		
          var _switch='<div class="'+_class+'" id="'+id+'">'+
                        '<div></div>'+
                      '</div>';
          this.$switch='#'+id;
		  $(this.$element).after(_switch);
            

		},
	    getId:function(){
		  var timestamp =new Date().getTime();
		  var random=(((1+Math.random())*0x10000)|0).toString(16).substring(1);
		  return '_s'+timestamp+random;
		
		},
		event:function(){
		    var that=this;
		    $(this.$switch).click(function(e){
			   if($(that.$switch).hasClass('switch-on')){
				   $(that.$switch).removeClass('switch-on');
				   $(that.$switch).removeClass(that.options.defaultStyle);
				   $(that.$switch).addClass('switch-off');
				   $(that.$element).prop("checked", false);
				   that.options.result(false);
			   }else{
				  $(that.$switch).find('div').addClass('animation-on');
                  that.options.result(true);			
			   }      
			   }   
			 );
             
			$(that.$switch).on("webkitAnimationend msAnimationend mozAnimationend animationend", function(e) {	  
               $(that.$switch).find('div').removeClass('animation-on');			
			   $(that.$switch).removeClass('switch-off');			
			   $(that.$switch).addClass('switch-on');
			   $(that.$switch).addClass(that.options.defaultStyle);
			    $(that.$element).prop("checked", true);
           });
		   
		   $(that.$element).change(function(e) { 
			   if($(that.$element).prop("checked")==true){
			       
				  $(that.$switch).find('div').addClass('animation-on');
                  that.options.result(true);
			   }else{
			   
			    $(that.$switch).removeClass('switch-on');
				   $(that.$switch).removeClass(that.options.defaultStyle);
				   $(that.$switch).addClass('switch-off');
				   $(that.$element).attr("checked", false);
				   that.options.result(false);
			   }
			  
			});

		},
		
		show:function(){
		   this.init();	
		   if($(this.$element).prop("disabled")==false){
              $(this.$switch).css('cursor','pointer');
		     this.event();
		   }else{
		     $(this.$switch).css('opacity','0.5');
			 $(this.$switch).css('cursor','not-allowed');
		   }
		   
		  return this;
		}
    }


$.fn.Switch = function(options) {       
        
		var _switch = new Switch(this, options);
        return _switch.show();
    }

})(jQuery, window, document);