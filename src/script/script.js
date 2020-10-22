
$(document).ready(function () {
    //first initiation add class to first nav elem
    if($('.nav-item').find('.underline--hover').length === 0) {
        let firstItem = $('.nav-item').first();
        firstItem.addClass("nav-item--hover");
        firstItem.find('.underline').addClass("underline--hover");
        //add background that belongs to current hover
        $('.main-banner-container:nth-child(1)').addClass("main-banner-image--active");
    }
        $('.nav-item').hover(function () {
            //- remove active hover effects with a for loop -
            $('.nav-item--hover').each(function() {
                $(this).removeClass("nav-item--hover");
                $(this).find('.underline').removeClass("underline--hover");
                //get data value of current activ elem and parse it into an integer
                let activeElemDataValueREMOVE = parseInt($(this).data("value"));
                //get nth child of banner class using the just retrieved data value and remove the active class
                $('.main-banner-container:nth-child('+activeElemDataValueREMOVE+')').removeClass("main-banner-image--active");
            });
            //- add hover effect to current hover -
            $(this).find('.underline').addClass("underline--hover");
            $(this).addClass("nav-item--hover");
            //get data value of the just hoverdd elem and parse it into an integer
            let activeElemDataValueADD = parseInt($(this).data("value"));
            //get nth child of banner class using the just retrieved data value and remove the active class
            $('.main-banner-container:nth-child('+activeElemDataValueADD+')').addClass("main-banner-image--active");
        });
});