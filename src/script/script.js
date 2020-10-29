
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

    // -- landing page --
    //initiate title animation after some delay
    if(window.location.href.indexOf("index.html") > -1) {
        console.log("landing page initiated"); //debugging purpose
        setTimeout(function () {
            let typeWritter = new TypeWritter(["people", "life", "love", "project"], '#typewriterText', '#header-underline',true);
            typeWritter.typeWriter().delay(10000);
        }, 600); //600
    }
    // -- project page --
    else if(window.location.href.indexOf("projekte.html") > -1) {
        console.log("project page initiated"); //debugging purpose
        setTimeout(function () {
            let typeWritter = new TypeWritter(["Projekte"], '#typewriterText', '#header-underline',false);
            typeWritter.typeWriter().delay(10000);
        }, 600); //600
    }

    /* project page box hover image change */
    $('.collage-elem').hover(
        function () {
            let url = $(this).find('img').attr('src');
            let format = "";
            if(url.indexOf(".png") > -1) {
                format = ".png";
            } else if(url.indexOf(".svg") > -1) {
                format = ".svg"
            } else {
                console.error("project_nav_elem hover - wrong image format");
            }
            $(this).find('img').attr('src',url.replace(format,"")+"-hover"+format);
    }, function () {
            let url = $(this).find('img').attr('src').replace("-hover","");
            $(this).find('img').attr('src',url);
    });

    /* proejct collage nav eleme hover + mark associated collage-elems */
    $('.collage-nav-item').hover(function() {
        $(this).find('.underline').addClass("underline--hover");
        /* get data value, which contains info about which collage-elems need to be shown active (apply hover state)*/
        let activeElems = String($(this).data("value")).split("");
        for(let i=0; i < activeElems.length; i++) {
            $('#ce'+activeElems[i]+ ' .box-link').addClass("box-link--hover");
        }
    }, function() {
        $(this).find('.underline').removeClass("underline--hover");
        let activeElems = String($(this).data("value")).split("");
        for(let i=0; i < activeElems.length; i++) {
            $('#ce'+activeElems[i]+ ' .box-link').removeClass("box-link--hover");
        }
    });

    /* smooth scroll */
    $('a').click(function(){
        $('html, body').animate({
            scrollTop: $( $(this).attr('href') ).offset().top
        }, 500);
        return false;
    });

});