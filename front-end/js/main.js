var App  = {};

App.main_page = function(){
    var selector_for_show = null;
    var selector_right_col = null;

    var init  = function(){
        slider();
        goto_back();
    };

    var slider = function(){
        $('.js-item-nav').click(function(){
            var data_attr  = $(this).data('type');
            selector_for_show = '.show-content[data-filter=' + data_attr + ']';
            selector_right_col = '.right-col-info[data-type-task=' + data_attr+ ']';
            $('.js-item-nav').hide();
            $(this).show();
            if($(selector_for_show).hasClass('hidden')){
                $(selector_for_show).removeClass('hidden');
            }

            $('.slider').addClass('goto_left');

            $(selector_right_col).addClass('go_to_right');
            $('.go_to_back').removeClass('hidden');
        });
    };

    var goto_back = function(){
        $('.go_to_back').click(function(){
            $('.js-item-nav').show();
            $('.show-content').addClass('hidden');
            $('.slider').removeClass('goto_left');
            $('.right-col-info ').removeClass('go_to_right');
            $('.go_to_back').addClass('hidden');
        })
    };

    return {
        init: init
    };

}();

$(document).ready(function(){
    App.main_page.init();
});