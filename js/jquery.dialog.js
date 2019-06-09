;(function($, window, document,undefined) {

    var Dialog = function(opt) {
        this.$element=document.body;
        this.defaults = {
			title:'标题',
			content:'内容',
			button_ok:'确定',
			button_canel:'取消',
			confirm:true,
			Cancelable:true,//可被外部点击取消
			result:function(ok){}
        },
        this.options = $.extend({}, this.defaults, opt)
    }
    Dialog.prototype = {
      
		//初始化
	    init:function(){
          
		   var $head_dialog='<div class="head-dialog">'+this.options.title+'</div>';
		   var $content_dialog='<div class="content-dialog">'+this.options.content+'</div>';			
		   var buttons='';
		   if(this.options.confirm){
			   buttons+='<button class="button-dialog">'+this.options.button_canel+'</button>';
			   buttons+='<button class="button-dialog button-ok">'+this.options.button_ok+'</button>';
			}else{
			   buttons+='<button class="button-dialog button-ok">'+this.options.button_ok+'</button>';	 
			}
		   var $buttons='<div class="buttons-dialog">'+buttons+'</button>';
		   var $dialog='<div class="dialog">'+$head_dialog+$content_dialog+$buttons+'</div>';
		   var $wrapper_dialog='<div class="wrapper"><div class="wrapper-dialog">'+$dialog+'</div></div>';
		   $(this.$element).append($wrapper_dialog);
		   $(this.$element).find('.wrapper').fadeIn();
	 
		},
		canel:function(){
		   var that=this;
		   $(that.$element).find('.wrapper').fadeOut(function(){
		       $(that.$element).find('.wrapper').remove();
		   });
		},
		open:function(){
		   $(this.$element).find('.wrapper').fadeIn();
		},
		bindButtonClick:function(){
			var that=this;
		   $(that.$element).find('.wrapper .wrapper-dialog .buttons-dialog .button-dialog').click(function(){
			   if($(this).hasClass('button-ok')){
				  that.options.result(true);
			   }else{
				  that.options.result(false);
			   }
		       that.canel();
		   });
		},
		bindScreenClick:function(){
		   var that=this;
		   
		   $(this.$element).find('.wrapper').click(function(){		        
				if(that.options.Cancelable){
			       that.canel();
				}
		   });
		},
		show:function(){
		   this.init();		   
		   this.bindButtonClick();
		   this.bindScreenClick();
		}
    }

$.extend({
    dialog: function(options) {
        var dialog = new Dialog(options);
        //调用其方法
        return dialog.show();
    }
})

})(jQuery, window, document);