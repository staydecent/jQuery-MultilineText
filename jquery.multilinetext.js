/*
 * jQuery Multi Line Text Input
 * Version 0.0.1
 * http://github.com/staydecent/jquery-multilinetext
 *
 * Replaces a textarea with multiple text inputs, automatically 
 * appending a new input when the last is filled with content.
 *
 * Copyright (c) 2011 Adrian Unger (http://staydecent.ca)
 * Released under the MIT license.
*/

(function($) {

    $.fn.multilineText = function(options, callback) {

        var settings = {
            // Not sure what (if any) settings will be helpful
            'error-element' : '#error_message'
        };

        var create_multilines = function(element) {
            /*
            Removes a textarea element, replacing it 
            with text inputs for each line.
            */
            var $this = $(element);

            var parent = $this.parent();
            var name = $this.attr('name');
            var text = $this.val();

            // Remove double newlines and create an array
            var lines = text.replace("\n\n", "\n").split("\n");
            // remove the textarea and inputs
            $this.remove();
            $('.'+name+'-mlText').remove();

            // create a textfield for each line 
            for (line in lines) {
                var value = $.trim(lines[line])
                if (value != "") {
                    parent.append('<input type="text" class="'+name+'-mlText" name="'+name+'" value="'+value+'">');
                }
            }

            // add blank input
            parent.append('<input type="text" class="'+name+'-mlText" name="'+name+'" value="">');

            $('.'+name+'-mlText').live('focus', function() {
                // wait for keypress and check this is the last input
                // and is empty and previous input has content
                $(this).keypress(function() {
                    if ($(this).is(':last-child') && 
                        $(this).val() == "" && 
                        $(this).prev('.mlText').val() != "") {
                        // then clone the blank input
                        $(this).after( $(this).clone() );
                    }
                });
            });
        };

        return this.each(function() {
            if (options) { 
                $.extend(settings, options);
            }

            var handler_set = false;

            // only operate on an element if it's a textarea
            if (this.tagName == "TEXTAREA") {
                create_multilines(this);

                // Grab the parent form of this textarea
                // and attach a submit handler.
                var form_element = $('label[for='+$(this).attr('name')+']').closest('form');
                var name = $(this).attr('name');

                form_element.bind('submit.multilineText', function() {
                    var $this = $(this);
                    var blob = "";

                    // Iterate each input and combine values into
                    // a single string, then disable the input.
                    $('.'+name+'-mlText').each(function() {
                        var text = $(this).val();
                        if (text != "") {
                            blob = blob+"\n"+text;
                            $(this).attr('disabled', true);
                        }
                    });

                    // Now recreate a textarea with the blob string
                    // as it's value. Ready for processing.
                    var label = $.find('label[for='+name+']');
                    var parent = $(label).parent();
                    if (blob.length > 0) {
                        parent.append('<textarea name="'+name+'" cols="40" rows="10" class="multiline" id="'+name+'">'+blob+'</textarea>');
                        $('textarea[name='+name+']').hide();
                    }
                });
            }

            if (typeof callback == 'function') {
                callback.call(this); // brings the scope to the callback
            }
        });

    };

})(jQuery);