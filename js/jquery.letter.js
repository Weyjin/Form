;(function($, window, document,undefined) {

    var Letter = function(ele,opt) {
        this.$element = ele,
        this.defaults = {
			offset:5,
			result:function(bool){}
        },
        this.options = $.extend({}, this.defaults, opt);
		this.init();
		return {}
    }
    Letter.prototype = {
		$Letter:0,
		styles:['tip-teal','tip-cyan','tip-pink','tip-yellow','tip-purple'],
		
	    init:function(){
		  $(this.$element).before(this._create());
		  var top=this.$elementTop();
		  var left=this.$elementLeft();
		  var width=this.$elementWidth();
		  var height=this.$elementHeight(true);
          var fontSize=this.$fontSize();
		  var lineHeight=this.$lineHeight();
		  console.log("top:"+top+" left:"+left+" width:"+width+" height:"+height+" fontSize:"+fontSize+" lineHeight:"+lineHeight);
		},
		_create:function(){
			var id=this.getId();
			this.$Letter='#'+id;
			 var top=this.$elementTop();
		     var left=this.$elementLeft();
		     var width=this.$elementWidth();
		     var height=this.$elementHeight();
			var _style='top:'+top+'px;'+'left:'+left+'px;'+'width:'+width+'px;'+'height:'+height+'px';
			return '<div class="letter-lines" id="'+id+'" style="'+_style+'">'+this.$lines()+'</div>';
		},
	    $lines:function(){
			var arr=new Array();
			var height=this.$elementHeight();
			var fontSize=this.$fontSize();
			var count=parseInt((height/(fontSize+2)));
			for(var i=0;i<count;i++){
				var top=(fontSize+1)*(i+1);
                var _style='top:'+(top)+'px;';
			  arr.push('<div class="letter-line" style="'+_style+'"></div>');
			}
		  return arr.join('');
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
		$elementHeight:function(bool){
			var height='';
            if(bool==undefined){
			  height=$(this.$element).height();
			}else{
			    height=$(this.$element).outerHeight(true);
			}				
		  return height;
		},
		$fontSize:function(){
		  var fontSize=$(this.$element).css('font-size');
		  fontSize=fontSize.replace(/px/,'');
		  return parseInt(fontSize);
		},
		$lineHeight:function(){
		  var lineHeight=$(this.$element).css('line-height');
		
		  return lineHeight;
		},
	    getId:function(){
		  var timestamp =new Date().getTime();
		  var random=(((1+Math.random())*0x10000)|0).toString(16).substring(1);
		  return '_t'+timestamp+random;	
		},
		bindEvent:function(){

		}
		
    }


$.fn.letter = function(options) {       
        
		var _letter = new Letter(this, options);
        return _letter;
    }

})(jQuery, window, document);