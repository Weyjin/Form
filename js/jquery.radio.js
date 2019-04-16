;(function($, window, document,undefined) {

    var Radio = function(ele,opt) {
		if(Radio.unique !== undefined ){
           return Radio.unique; 
        }
        this.$element = ele,
        this.defaults = {
			defaultStyle:'radio-yellow',
			result:function(bool){}
        },
        this.options = $.extend({}, this.defaults, opt)
		
    }
    Radio.prototype = {
		$radio:0,
		ids:[],
		rDisable:false,
        rDisables:new Map(),
		styles:['radio-teal','radio-cyan','radio-pink','radio-yellow','radio-purple'],
		
	    init:function(){
		  var id=this.getId();
          
          
		  $(this.$element).hide();
          var name=$(this.$element).prop('name');
		 
		  var _class='',_defaultStyle='';
		  if ($(this.$element).prop("checked")) {
			  if($(this.$element).prop("disabled")){				
				 this.rDisables.put(name,true);
			  }else{
				this.rDisables.put(name,false);
			  }
			  
             _class='radio-on '+this.options.defaultStyle+'-on';
			 _defaultStyle=this.options.defaultStyle;
          } else {
             _class='radio-off';
			 this.rDisables.put(name,false);
          }
		
          var _radio='<div class="'+_class+'"id="'+id+'">'+
                        '<div class="'+_defaultStyle+'"></div>'+
                      '</div>';
          this.$radio='#'+id;
		  this.ids.push(this.$radio);
		  $(this.$element).after(_radio);
		  
          $(this.$radio).prop('name',name);
          if($(this.$element).prop("disabled")){
		         $(this.$radio).unbind();
				 $(this.$radio).css('opacity','0.5');
				 $(this.$radio).css('cursor','not-allowed');
		  }else{
		        $(this.$radio).css('cursor','pointer');
		  }

		 
		},
	    getId:function(){
		  var timestamp =new Date().getTime();
		  var random=(((1+Math.random())*0x10000)|0).toString(16).substring(1);
		  return '_r'+timestamp+random;
		
		},
		
		event:function(){
		    var that=this;
			
		    $(this.$radio).click(function(e){
				var name=$(that.$element).prop('name');
				that.selectSingleRadio(name);
			   if($(that.$radio).hasClass('radio-off')){
				   $(that.$radio).removeClass('radio-off');			
				   $(that.$radio).addClass('radio-on');
				   $(that.$radio).addClass(that.options.defaultStyle+'-on');
				   $(that.$radio).find('div').addClass(that.options.defaultStyle);
				   $(that.$element).prop("checked", true);
				   that.options.result(true);				   
			    }  
			   }   
			 );
             
			
		   
		   $(that.$element).change(function(e) { 
                var name=$(that.$element).prop('name');
			    that.selectSingleRadio(name);
			   if($(that.$element).prop("checked")==true){
				   
				   
			       $(that.$radio).removeClass('radio-off');
				   $(that.$radio).find('div').addClass(that.options.defaultStyle);
				   $(that.$radio).addClass('radio-on');
				   $(that.$radio).addClass(that.options.defaultStyle+'-on');
				   $(that.$element).prop("checked", true);
                   that.options.result(true);
				   
				  
			   }else{
			      
			       $(that.$radio).removeClass('radio-on');
				   $(that.$radio).removeClass(that.options.defaultStyle+'-on');
				   $(that.$radio).removeClass(that.options.defaultStyle);
				   $(that.$radio).addClass('radio-off');
				   $(that.$element).prop("checked", false);
				   that.options.result(false);
				   
			   }
			  
			});

		},
		selectSingleRadio:function(radioName){
		    for(var i=0;i<this.ids.length;i++){
				var s=$(this.ids[i]);
				   var name=$(this.ids[i]).prop("name");
				   if(name==radioName){
					                  
					   $(this.ids[i]).removeClass();
					   $(this.ids[i]).find('div').removeClass();
					   $(this.ids[i]).addClass('radio-off'); 
				   }
			}
		},
		allDisabled:function(name){
			
			$('input[name="'+name+'"]').prop("disabled",'disabled');
			$('input[name="'+name+'"]').css('opacity','0.5');		
			this.rDisable=true;
			//循环查找相同name的radio
			for(var i=0;i<this.ids.length;i++){
			    var radioName=$(this.ids[i]).prop('name');
			   if(radioName==name){
			     $(this.ids[i]).unbind();
				 $(this.ids[i]).css('opacity','0.5');
				 $(this.ids[i]).css('cursor','not-allowed');
			   }else{
			   
				   $(this.ids[i]).css('cursor','pointer');
			   }
			  
			}
			
		},
		show:function(){
		   this.init();	
		   var name=$(this.$element).prop("name");
		   if($(this.$element).prop("disabled")==true){
			   if($(this.$element).prop("checked")==true){
				   //当radio有disabled和checked属性时，设置name相同的radio为disabled
                   this.allDisabled(name);
			   }else{
				   if(this.rDisables.get(name).contains('true')){
				   
					
                     this.allDisabled(name);
				   }else{
					 if($(this.$element).prop("disabled")==false){
					   this.event();
					 }else{
					  $(this.$radio).css('opacity','0.5');
					 }
				     
				   }
			      
			   }
		     
		   }else{
			   if(this.rDisables.get(name).contains('true')){
			        
                    this.allDisabled(name);
			   }else{
			    this.event();
			   }
			   
		   }
		 
		  return this;
		}
    }
Array.prototype.contains = function ( needle ) {
  for (i in this) {
    if (this[i] == needle) return true;
  }
  return false;
}

$.fn.Radio = function(options) {       
        
		var _radio = new Radio(this, options);
        return _radio.show();
    }

})(jQuery, window, document);