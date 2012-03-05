(function ($) {          
    var pluginName = 'prettyCheckbox',
        defaults = {
            wrapperClass: 'pretty-checkbox',
            checkboxClass: 'checkbox',
            setErrorClass: function (nativeCheckbox, prettyCheckbox) {}
        };
 
    function PrettyCheckbox(element, options) {
        this.element = element;
        this.options = $.extend({}, defaults, options) ;
        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }
 
    PrettyCheckbox.prototype.init = function () {
        var options = this.options;
        
        this.each(function () {
            var $nativeCheckbox = $(this),
                $label = $nativeCheckbox.closest('label'),
                labelContent = $label.html(),
                $prettyCheckbox = $('<div class="' + options.wrapperClass + '"><div class="' + options.checkboxClass + '"></div>' + labelContent + '</div>');
                $prettyCheckbox.find('input').remove();

            // Determine if checkbox is checked by defualt
            if ($nativeCheckbox.is(':checked')) {
                $prettyCheckbox.addClass('checked');
            }
                
            // Toggle checked/unchecked on click    
            $prettyCheckbox.click(function (e) {
                $(this).toggleClass('checked');
                if ($nativeCheckbox.attr('checked')) {
                    $nativeCheckbox.removeAttr('checked').trigger('change');
                } else {
                    $nativeCheckbox.attr('checked', 'checked').trigger('change');               
                    if ($prettyCheckbox.hasClass('error')) {
                        $prettyCheckbox.removeClass('error');
                    }
                }
                
                e.preventDefault();
            }) // Prevent parent event from firing if labeltext has anchor inside
            .find('a').click(function (e) {
                e.stopPropagation();
            });
            
            options.setErrorClass($nativeCheckbox[0], $prettyCheckbox[0]);
            
            $label.hide().after($prettyCheckbox);
        });
    };

    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName,
                new PrettyCheckbox(this, options));
            }
        });
    }
})(jQuery);
