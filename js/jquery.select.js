;(function($, window, document,undefined) {

    var Select = function(ele,opt) {
		this.$select=0,
        this.$element = ele,
		this.$submitvalue='submitvalue',
        this.defaults = {
			editable:false,
			defaultStyle:'',
			data:[],
			defaultValue:'',
			submitvalue:'',
			enterEvent:function(text,value){},
			result:function(index,text,value){}
        },
        this.options = $.extend({}, this.defaults, opt);
		this.throws();
		this.init();
		var that=this;
		return {val:function(){
		     return that.options.defaultValue;
		     },
			submitValue:function(){
		       return that.options.submitvalue;
		    }}
    }
    Select.prototype = {
		
		styles:['select-teal','select-cyan','select-pink','select-yellow','select-purple'],
		
	    init:function(){
		  
		  $(document.body).append(this._create());
		  this.options.defaultValue=$(this.$element).val();
		  this.options.submitvalue=$(this.$element).attr('submitvalue');
		  this.bindEvent();
		},
		_create:function(){
			
		    var id=this.getId();
			this.$select='#'+id;
		   return '<div class="select" id="'+id+'" style="'+this.reckonStyle()+'">'+this.$option()+'</div>';
		},
		reckonStyle:function(){
		    var top=this.$elementTop();
			var left=this.$elementLeft();
			var width=this.$elementWidth();
			var height=this.$elementHeight();
            var borderWidth=this.$elementBorder();
            var style='top:'+(top+height)+'px;'+'left:'+left+'px;'+'width:'+(width-borderWidth*2)+'px;'+'border:solid #eee '+borderWidth+'px;';
			return style;
		},
		$option:function(){
			var option='';
		    for(var i=0;i<this.options.data.length;i++){
			    option+='<div class="option '+this.options.defaultStyle+'" value="'+this.options.data[i].value+'">'+this.options.data[i].text+'</div>';
			}
			return option;
		},
		$elementBorder:function(){
		 var borderWidth= $(this.$element).css('borderWidth');
             borderWidth=borderWidth.replace(/px/g,'');
		 return parseInt(borderWidth);
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
	    getId:function(){
		  var timestamp =new Date().getTime();
		  var random=(((1+Math.random())*0x10000)|0).toString(16).substring(1);
		  return '_s'+timestamp+random;		
		},
	    bindEvent:function(){
			var that=this;
		   $(this.$select).on('click','div.option',function(){
		         var value=$(this).attr('value');
				 var text=$(this).text();
                 $(that.$element).val(text);
				 $(that.$element).attr(that.$submitvalue,value);
				 let index = $(this).index();
				 that.options.defaultValue=text;
				 that.options.submitvalue=value;
				 that.options.result(index,text,value);
		   });

            $(this.$element).click(function(event){
				if($(that.$select).is(':hidden')){
				　　$(that.$select).fadeIn();
				}else{
				　　$(that.$select).fadeOut();
				}
				 event.stopPropagation();
			});

			that.editableEvent();
			
			$(window).click(function(){
			    if(!$(that.$select).is(':hidden')){
					$(that.$select).fadeOut();
				}
				
			});
			var n=0;
			$(window).resize(function () {
			
			if(n%2==0){
				var top=that.$elementTop();
				var left=that.$elementLeft();
				var width=that.$elementWidth();
				var height=that.$elementHeight();
				var borderWidth=that.$elementBorder();
                 $(that.$select).css({"top":(top+height)+'px',"left":left+"px","width":(width-borderWidth*2)+"px","border":"solid #eee"+borderWidth+"px"});
			  }

            });
		},
		editableEvent:function(){
			var that=this;
		   $(this.$element).bind('paste',function(){
				return that.options.editable;
			});
			$(this.$element).bind('cut',function(){
			    return that.options.editable;
			});
			
			$(this.$element).keydown(function(event){
				var value=$(that.$element).val();
				var submitvalue=$(that.$element).attr('submitvalue');
				switch(event.keyCode) {
				    case 13:						
                        that.options.enterEvent(value,submitvalue);
					default:
						if(!that.options.editable){
					      $(this).val(that.options.defaultValue);
					      $(this).attr('submitvalue',that.options.submitvalue);
					    }                        
						return that.options.editable;
				}  
			});
		    $(this.$element).keyup(function(event){
				
				switch(event.keyCode) {
				    case 13:
						var value=$(that.$element).val();
					    var submitvalue=$(that.$element).attr('submitvalue');
                        that.options.enterEvent(value,submitvalue);
					default:
						if(!that.options.editable){
					      $(this).val(that.options.defaultValue);
					      $(this).attr('submitvalue',that.options.submitvalue);
					    }  
						return that.options.editable;
				}	     
			});
		},
		throws:function(){
			var id=$(this.$element).attr('id');
			var excend
            if (typeof(id) == "undefined")
			{ 			
				throw new SelectError('id is not defined');
			}
		    var submitValue=$(this.$element).attr('submitvalue');
			if (typeof(submitValue) == "undefined")
			{ 
				throw new SelectError('submitvalue is not defined');
			}

			if(!$(this.$element).is("input")){
			    throw new SelectError('this element is not input');
			}
			if($(this.$element).attr('type') != 'text'){
			     throw new SelectError('this element type is not text');
			}
         
		}

    }

var SelectError=function(msg){
    this.msg=msg;
	this.name='SelectError';
}
 SelectError.prototype = new Error();

$.fn.Select = function(options) {       
        
		var _select = new Select(this, options);
        return _select;
    }

})(jQuery, window, document);