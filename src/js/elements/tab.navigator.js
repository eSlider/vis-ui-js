(function($) {

    /**
     * jQuery tabs with bootstrap styles
     */
    $.widget("vis-ui-js.tabNavigator", $.ui.tabs, {
        options: {
        },
        _create: function() {
            var widget = this;
            var options = widget.options;
            var el = widget.element;
            var activeTab = options.hasOwnProperty('active') ? options.active : -1;
            var ul = $('<ul class="nav nav-tabs" role="tablist"/>');

            el.append(ul);

            var r = this._super();
            //var wrapper = navigation.closest('.ui-tabs');
            el.addClass('mapbender-element-tab-navigator');

            if(options.hasOwnProperty('children')){
                $.each(options.children,function(){
                    var tab = widget._add(this);
                });
            }

            el.on('tabnavigatoractivate',function(e,ui){
                var item = $(ui.newTab).data('item');
                if(item.hasOwnProperty('active')){
                    item.active(e,ui);
                }
            });

           if(activeTab > -1) {
                widget.option('active', activeTab);
            }

            return r;
        },

        _add: function (item){

            var el = this.element;
            var navigation = $("> .ui-tabs-nav",el);
            var id = 'tabs-' + guid();
            var href = '#' + id;
            var label = $('<li><a role="tab" data-toggle="tab" href="' + href+ '">' + item.title + '</a></li>');
            var contentHolder = $("<div id='" + id + "' class='tab-content'/>");

            label.data('item',item);

            navigation.append(label);
            contentHolder.append(item.html);
            el.append(contentHolder);
            this.refresh();
            return contentHolder;
        },

        add: function(title, htmlElement, activate) {
            var content = this._add({
                html:  htmlElement,
                title: title
            });
            if(activate) {
                this.option('active', this.size() - 1);
            }
            return content;
        },

        size: function() {
            return $(">ul>li", this.element).size();
        }
    });

    var guid = (function() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }

        return function() {
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        };
    })();
})(jQuery);
