;(function($, window, document,undefined) {
   
    var Barrage = function(ele, opt) {
        this.$element = ele,
        this.defaults = {
			height:21,
			speed:1000,
			data:[],
			result:function(index){}
        },
        this.options = $.extend({}, this.defaults, opt);
		this.init();
		var that=this;
		return {
		stop:function(){
			that.stop();
		},
		start:function(){
			that.start();
			
		}}
    }
    Barrage.prototype = {
		$Barrage:0,
		$Interval:0,
		$i:0,
		init:function(){		
		      var that=this;
			 $(document.body).append(this._create()); 
			 if(typeof that.options.speed !== 'number'){
				 that.options.speed=1000
			   }
			 this.createBarrage();
					
		},
		_create:function(){
			var width="width:"+this.$elementWidth()+"px;";
			var height="height:"+this.$elementHeight()+"px;";
			var top="top:"+this.$elementTop()+"px;";
			var left="left:"+this.$elementLeft()+"px;";
			var _style=width+height+top+left;
			var id=this.getId();
			this.$Barrage="#"+id;
		   return '<div class="barrage" id="'+id+'" style="'+_style+'"></div>';
		},
		lastRandom:-1,
		getLastRandom:function(){
			return this.lastRandom;
			
		},
		setLastRandom:function(random){
			this.lastRandom=random;
		},
		createBarrage:function(){
			 var that=this;
			 var i=0;
			 var interval =setInterval(function(){	      
			 that._createBarrage(that.options.data[i])
			 
			  if(i==that.options.data.length-1){
			     clearInterval(interval);
			  }
			  i++; 	 
			  that.$i=i;
			  },that.options.speed);
			  this.$Interval=interval;		
			
		},
		stop:function(){
			clearInterval(this.$Interval);
			$(this.$Barrage).find('span').hide();
		},
		start:function(){
			var that=this;
			if(this.$i<this.options.data.length){
				var i=this.$i;
				$(this.$Barrage).find('span').show();
				this.$Interval=setInterval(function(){
					 that._createBarrage(that.options.data[i])
					
					 if(i==that.options.data.length-1){
						clearInterval(that.$Interval);
					 }
				  i++; 
				  that.$i=i;
				}, that.options.speed);
				this.$Interval=this.$Interval;
			}
						
		},
		_createBarrage:function(message){
			    var number=parseInt(Math.random()*this.spacing().length);			    
				var _style="top:"+this.spacing()[number]+'px;';
				var span=$('<span style="'+_style+'">'+message+'</span>');
				var left=this.$elementWidth();
				var lastRandom=this.getLastRandom();
				var offset=message.length*16;
				if(lastRandom==number&&lastRandom!=-1){
					
					$(span).css({'transition':'left 10s ease-in-out 1s','left':(left+offset)+'px'});
				}else{
					$(span).css({'transition':'left 10s ease-in-out 1s','left':left+'px'});
				}

				this.setLastRandom(number);
				$(this.$Barrage).append(span);
				$(span).animate({left:(-offset)+'px'},function(e){
					
				});		
       
              $(span).one('transitionend oTransitionEnd transitionend webkitTransitionEnd', function(){
				  this.remove();
			  });
			
		},
		spacing:function(){
			var height=this.$elementHeight();
			var spacing=parseInt(height/this.options.height);
			var spac=[];
			for(var i=0;i<spacing;i++){
				spac[i]=i*this.options.height;
			}
			return spac;
			
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
		   var width=$(this.$element).outerWidth(false);
		   return width;
		},
		$elementHeight:function(){
		  var height=$(this.$element).outerHeight(true);
		  return height;
		},
		getId:function(){
		  var timestamp =new Date().getTime();
		  var random=(((1+Math.random())*0x10000)|0).toString(16).substring(1);
		  return '_b'+timestamp+random;	
		}
		
    }
 $.fn.barrage = function(options) {
        var _barrage = new Barrage(this, options);
        return _barrage;
    }

})(jQuery, window, document);
