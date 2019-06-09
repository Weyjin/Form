; (function($, window, document, undefined) {
    //定义Expanded的构造函数
    var Expanded = function(ele, opt) {
        this.$element = ele,
        this.defaults = {
            parentData: [],
            childrenData: [],
            expandedAll: false,
            parentResult: function(index, expanded, value) {},
            childrenResult: function(pIndex, cIndex, value) {}
        },
        this.options = $.extend({},
        this.defaults, opt)
    }
    //定义Expanded的方法
    Expanded.prototype = {

        //初始化Expanded
        init: function() {
            var that = this;
            var $parents = '';
            for (var i = 0; i < that.options.parentData.length; i++) {

                var $childrenCount = '';

                try {
                    $childrenCount = '<i class="count">' + that.options.childrenData[i].length + '</i>';
                } catch(error) {
                    $childrenCount = '<i class="count">0</i>';
                }

                var $parent_title = '<div class="parent-title">' + that.options.parentData[i] + $childrenCount + '</div>';
                var icon_expanded = this.options.expandedAll == true ? 'rotate': '';

                var $parent_icon = '<div class="parent-icon ' + icon_expanded + '">></div>';

                $parent = '<div class="expanded-parent">' + $parent_title + $parent_icon + '</div>';
                var childrens_expanded = this.options.expandedAll == true ? 'block': 'none';
                var $childrens = '<div class="expanded-childrens" style="display:' + childrens_expanded + '">';

                if (i <= that.options.childrenData.length - 1) {
                    for (var j = 0; j < that.options.childrenData[i].length; j++) {
                        var info = that.options.childrenData[i][j];
                        var $img = '<img src="' + info.img + '" class="head-photo"/>';

                        var $name = '<div class="name">' + info.name + '</div>';
                        var $describe = '<div class="describe">' + info.describe + '</div>';
                        var $info = '<div class="info">' + $name + $describe + '</div>';
                        var $children = '<div class="expanded-children">' + $img + $info + '</div>';

                        $childrens += $children;
                    }
                }
                $childrens += '</div>';

                $parents += '<div class="expanded-panel">' + $parent + $childrens + '</div>';
            }
            that.$element.html($parents);

        },
        bindParentClick: function() {
            var that = this;
            $(this.$element).find('.expanded-parent').each(function(i) {

                var childrens = $(this).parent().find('.expanded-childrens');
                $(this).click(function() {
                    var parent_icon = $(this).find('.parent-icon');

                    var hidden = $(childrens).is(":hidden");
                    if (hidden) {
                        that.options.parentResult(i, true, that.options.parentData[i]);
                        $(parent_icon).addClass('rotate');
                        $(childrens).show("slow");
                    } else {
                        that.options.parentResult(i, false, that.options.parentData[i]);
                        $(parent_icon).removeClass('rotate');
                        $(childrens).hide("slow");
                    }

                });
                that.bindChildrenClick(childrens, i);
            })
        },
        bindChildrenClick: function($childrens, pIndex) {
            var that = this;
            $($childrens).find('.expanded-children').each(function(i) {
                $(this).click(function() {
                    that.options.childrenResult(pIndex, i, that.options.childrenData[pIndex][i]);
                });
            });
        },
        show: function() {
            this.init();
            this.bindParentClick();
        }
    }
    $.fn.Expanded = function(options) {
        //创建Expanded的实体
        var expanded = new Expanded(this, options);
        //调用其方法
        return expanded.show();
    }

    $(function() {

})
})(jQuery, window, document);