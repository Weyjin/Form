;(function($, window, document,undefined) {

    var StepBar = function(ele,opt) {
        this.$element = ele,
		this.$distance=[],
        this.defaults = {
			disable:false,
			defaultStyle:'step-cyan',
			defaultBackgroundColor:'default-color',
			defaultSize:75,
			defaultStep:1,
			textPosition:'bottom',
			data:[],
			nodeClick:true,
			tips:{defaultStyle:''},
			result:function(step,title){}
        },
        this.options = $.extend({}, this.defaults, opt);
		this.init();
		var that=this;	
	
		return {

		 getCurrentStep:function(){
			   return that.getCurrentStep();
			},
			prevStep:function(){
			   that.prevStep();
			},
			nextStep:function(){
			   that.nextStep();
			},
			setStep:function(step){
			   that.setStep(step);
			}	
		}
		
		
    }
    StepBar.prototype = {
		$stepBar:0,
		styles:['step-teal','step-cyan','step-pink','step-yellow','step-purple'],
	    init:function(){
		  var id=this.getId();
          this.initDistance();
          this.$stepBar='#'+id;
		  $(this.$element).append(this.$container());	   
          this.nodeEvent();
		  this.bindTips();
          this.options.result(this.options.defaultStep,this.options.data[this.options.defaultStep-1].title);  
          
		},
		$container:function(){
		   var style='width:'+(this.options.defaultSize*this.options.data.length)+'px';
		   return '<div class="step-container" style="'+style+'">'+this.$ul()+this.$line()+this.$msg()+'</div>';
		},
		$ul:function(){
		   return '<ul>'+this.$li()+'</ul>';
		},
		$li:function(){
		  var li='';
		  for(var i=0;i<this.options.data.length;i++){
			  if(this.options.defaultStep>i){
			  li+='<li style="width:'+this.options.defaultSize+'px"><div class="circular"><div class="inner-circle '+this.options.defaultStyle+'">'+(i+1)+'</div></div></li>';
			  }else{
			  li+='<li style="width:'+this.options.defaultSize+'px"><div class="circular"><div class="inner-circle">'+(i+1)+'</div></div></li>';
			  }
		     
		  }
		  return li;
		},
		$line:function(){
		   return '<div class="line" style="color:'+this.options.defaultBackgroundColor+'">'+this.$progress()+'</div>';
		},
		$msg:function(){
			
			var style='';
			if(this.options.textPosition!='bottom'){
			   style='msg-position';
			}
			var msg='<div class="msg '+style+'"><div class="msg-flex">';
		   for(var i=0;i<this.options.data.length;i++){
			   if(this.options.defaultStep>=(i+1)){
			     msg+='<span style="width:'+this.options.defaultSize+'px" class="'+this.options.defaultBackgroundColor+' '+this.options.defaultStyle+'-color">'+this.options.data[i].title+'</span>';
			   }else{
			     msg+='<span style="width:'+this.options.defaultSize+'px" class="'+this.options.defaultBackgroundColor+'">'+this.options.data[i].title+'</span>';
			   }
		       
		   }
		      msg+='</div></div>';
			  return msg;
		},
		$progress:function(){
			var width=this.$distance[this.options.defaultStep-1];
		   return '<div class="progress '+this.options.defaultStyle+'" style="width:'+width+'px"></div>';
		},
		prevStep:function(){
			var currentStep=this.getCurrentStep();
			var that=this;
			if(currentStep>1){
		   $(this.$element).find('div.progress').animate({width:this.$distance[currentStep-2]+'px'},"slow",function(){
		      
			  var circular=$(that.$element).find('ul li:nth-child('+(currentStep)+') .circular .inner-circle');
			  $(circular).removeClass(that.options.defaultStyle);
			  var msg=$(that.$element).find('.msg span:nth-child('+(currentStep)+')');
			  $(msg).removeClass(that.options.defaultStyle+'-color');
			    that.options.result(currentStep-1,that.options.data[currentStep-2].title);
		    
		   });
		   }
		},
		nextStep:function(){			
			var currentStep=this.getCurrentStep();
			var that=this;
			console.log(currentStep+'--'+this.$distance[currentStep]);
			if(currentStep<that.options.data.length){
		   $(this.$element).find('div.progress').animate({width:this.$distance[currentStep]+'px'},"slow",function(){
		      
			  var circular=$(that.$element).find('ul li:nth-child('+(currentStep+1)+') .circular .inner-circle');
			  $(circular).addClass(that.options.defaultStyle);
              var msg=$(that.$element).find('.msg span:nth-child('+(currentStep+1)+')');
			  $(msg).addClass(that.options.defaultStyle+'-color');
			  that.options.result(currentStep+1,that.options.data[currentStep].title);
			  
		   });
		   }
		},
		getCurrentStep:function(){
		  var step=0;
		  var progress=this.getCurrentProgress();
		  for(var i=0;i<this.$distance.length;i++){
		       if(progress==this.$distance[i]){
			      step=i+1;
				  break;
			   }
		  }
		  return step;
		},
		getCurrentProgress:function(){
		    var progress=$(this.$element).find('div.progress').width();
			return progress;
		},
		setStep:function(step){
		   var currentStep=this.getCurrentStep();
		   var that=this;
		   if(step!=currentStep){
		   $(this.$element).find('div.progress').animate({width:this.$distance[step-1]+'px'},"slow",function(){
		      if(currentStep>step){
			     
				    var circular=$(that.$element).find('ul li:nth-child(n'+(step+1)+') .inner-circle');
			        $(circular).removeClass(that.options.defaultStyle);
                    var msg=$(that.$element).find('.msg .msg-flex span:nth-child(n'+(step+1)+')');
			        $(msg).removeClass(that.options.defaultStyle+'-color');   
			
			  }else{
			        var circular=$(that.$element).find('ul li:nth-child(-n'+(step)+') .inner-circle');
			        $(circular).addClass(that.options.defaultStyle);
                    var msg=$(that.$element).find('.msg .msg-flex span:nth-child(-n'+(step)+')');
			        $(msg).addClass(that.options.defaultStyle+'-color'); 
			  }
			  that.options.result(step,that.options.data[step-1].title); 
		   });
		   }
		},
		
		
		initDistance:function(){
		   for(var i=0;i<=this.options.data.length-1;i++){
		        if(i==0){
				   this.$distance[i]=0;
				}else if(i==1){
				   this.$distance[i]=(this.options.defaultSize/2)+this.options.defaultSize; 
				}else if(i==this.options.data.length-1){
				   this.$distance[i]=this.options.defaultSize*(this.options.data.length)-10;
				}else{
				  this.$distance[i]=this.options.defaultSize*(i-1)+this.$distance[1];
				}
		   }
		},
	    getId:function(){
		  var timestamp =new Date().getTime();
		  var random=(((1+Math.random())*0x10000)|0).toString(16).substring(1);
		  return '_s'+timestamp+random;	
		},
		nodeEvent:function(){
			var that=this;
			
		   $(this.$element).find('ul li .inner-circle').css('cursor','pointer');
           if(this.options.nodeClick){   
		     $(this.$element).find('ul li .inner-circle').click(function(){
				var step=$(this).text();
				that.setStep(parseInt(step));
		     });
		   }
		},
		bindTips:function(){
			for(var i=1;i<=this.options.data.length;i++){
			   $(this.$element).find('ul li:nth-child('+i+') .inner-circle').Tips(Object.assign({title:this.options.data[i-1].title,content:this.options.data[i-1].content},this.options.tips));			
			}
		    
		}		
    }


$.fn.StepBar = function(options) {       
        
		var _stepBar = new StepBar(this, options);
           
		return _stepBar;
    }

})(jQuery, window, document);