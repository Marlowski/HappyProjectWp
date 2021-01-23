// circle settings [regular[top],active[top]]
const circleSettings = [[0,'-2.1vw'],['10vw','8.9vw'],['19.9vw','19.9vw'],[0,'-2.1vw'],['10vw','8.9vw'],['19.9vw','19.9vw']];

$(document).ready(function () {
    $('.circle-elem').on( "click", function() {
        //check if clicked elem is already activ
        if($(this).hasClass('active-circle')) return;
        //animation - turn active back to regular if exist
        if($('#circle-container').find('.active-circle').length > 0) {
            let active = $('.active-circle');
            active.animate({backgroundColor: '#3bba9c', padding: '9.2vw', top:circleSettings[active.attr('id').split('-')[1]-1][0]}, 300, 'swing');
            active.removeClass('active-circle');
        }
        //animation - add active to new elem
        $(this).animate({backgroundColor: '#2C323C', padding: '10.3vw', top:circleSettings[$(this).attr('id').split('-')[1]-1][1]}, 300, 'swing');
        $(this).addClass('active-circle');

        toggleContentWindow();
        markNavMenuElem();
    });

    //prevent tab switch focus
    $(document).on('keydown', function(e) {
        if(e.which === 9) {
            void(0);
        }
        e.preventDefault();
    });

    //ini sliders
    iniSlider("#content-4");
    iniSlider("#content-6");

    //ini nav Button
    iniNavButton();

    //move margin nav menu when resized
    $(window).bind('resize', function() {
        if(window.matchMedia("(max-width: 400px)").matches) {
            if($('#navigation-toggle').css('margin-left') !== '0px') {
                let marginleftValue = '-100vw';
                $('#navigation-toggle').css('marginLeft', marginleftValue);
            }
        } else if(window.matchMedia("(max-width: 800px)").matches) {
            if($('#navigation-toggle').css('margin-left') !== '0px') {
                let marginleftValue = '-55vw';
                $('#navigation-toggle').css('marginLeft', marginleftValue);
            }
        }
    });
});


// show specified content window
let firstClick = true;
function toggleContentWindow(specificSelectorId = null) {
    //if specficSelectorId = current frame, return
    if(specificSelectorId !== null && specificSelectorId.toString() === $('.frame-active').attr('id').split('-')[1]) return;

    //remove current activ frame
    let active = $('body').find('.frame-active');
    //stop video playing if window gets changed
    $('.frame-active').find('video').each(function () {
        $(this).trigger('pause');
    });
    active.removeClass('frame-active');
    active.delay(1100).animate({right: '-100%'}, 0);

    //show new frame by gettings the active elems id number and combine this with to get the proper content frame by his id
    let selector;
    if(specificSelectorId === null) {
        let idNumber = $('#circle-container').find('.active-circle');
        selector = $('#content-'+ idNumber.attr('id').split('-')[1]);
    } else {
        selector = $('#content-'+specificSelectorId);
    }
    selector.addClass('frame-active');
    //check for first click instance and move circle to the right if so
    if(firstClick) {
        firstClick = false;
        //show burger menu toggle icon
        $('#navigator-menu-icon').animate({opacity: 1}, 400, 'swing');
        $('.nav-menu-icon').trigger('click');
    }

    //show fitting content slide
    setTimeout(function () {
        selector.animate({right: 0}, 700, 'swing');
    },300);

}

function iniSlider(parentSelector) {
    $(parentSelector + ' .slider-container').find('.slider-elem').each(function (index) {
        $(this).css({'left': 100*index + 'vw'});
    });

    let runningRight = false;
    $(parentSelector + ' .slider-right').on('click', function () {
        if(runningRight === false) {
            runningRight = true;

        let currActiveIndex = undefined;
        let newActive = undefined;
        //get current & new active slide | range for index: 2 - n | range for nth-child: 3 - n
        $(parentSelector + ' .slider-elem').each(function () {
            if($(this).hasClass('active-slide')) {
                currActiveIndex = $(this).index();

                //stop slide if trying to go OOB
                if(currActiveIndex >= ($(parentSelector + ' .slider-elem').length+1)) {
                    return;
                }
                //if moving in the opposit direction from a dead end, set button free again
                if(currActiveIndex === 2) {
                    $(parentSelector + ' .slider-left').removeClass('slider-nav-limit');
                }
                //change right-nav button if last slide is reached
                if(currActiveIndex >= ($(parentSelector + ' .slider-elem').length)) {
                    $(parentSelector + ' .slider-right').addClass('slider-nav-limit');
                }
                newActive = $(parentSelector + ' .slider-container .slider-elem:nth-child('+ (currActiveIndex+2) +')');
            }
        });

        //set new and old active slide class
        if(newActive !== undefined) {
            //set new left values
            $(parentSelector + ' .slider-elem').each(function () {
                //get current left value, transform to a number and subtract 100vw to change current slider by 1
                let value = parseInt($(this).css('left'),10);
                //change from px value to vw value
                value = (value*(100/($(window).width())))-100;
                $(this).animate({'left': value + 'vw'}, 400, 'swing');
            });

            $(parentSelector + ' .slider-container .slider-elem:nth-child('+ (currActiveIndex+1) +')').removeClass('active-slide');
            newActive.addClass('active-slide');
        }

            setTimeout(function () {
                runningRight = false;
            }, 500);
        }
    }); //right nav eventListener

    let runningLeft = false;
    $(parentSelector + ' .slider-left').on('click', function () {
        let currActiveIndex = undefined;
        let newActive = undefined;

        if(runningLeft === false) {
            runningLeft = true;

        //get current & new active slide | range for index: 2 - n | range for nth-child: 3 - n
        $(parentSelector + ' .slider-elem').each(function () {
            if($(this).hasClass('active-slide')) {
                currActiveIndex = $(this).index();
                //stop slide if trying to go OOB
                if(currActiveIndex <= 2) {
                    return;
                }
                if(currActiveIndex-1 === 2) {
                    //change left nav-button if last slide is reached
                    $(parentSelector + ' .slider-left').addClass('slider-nav-limit');
                }
                //if moving in the opposit direction from a dead end, set button free again
                if(currActiveIndex === $(parentSelector + ' .slider-elem').length+1) {
                    $(parentSelector + ' .slider-right').removeClass('slider-nav-limit');
                }
                newActive = $(parentSelector + ' .slider-container .slider-elem:nth-child('+ (currActiveIndex) +')');
            }

            if(newActive !== undefined) {
            }
        });

        //set new and old active slide class
        if(newActive !== undefined) {
            //set new left values
            $(parentSelector + ' .slider-elem').each(function () {
                //get current left value, transform to a number and subtract 100vw to change current slider by 1
                let value = parseInt($(this).css('left'),10);
                //change from px value to vw value
                value = (value*(100/($(window).width())))+100;
                $(this).animate({'left': value + 'vw'}, 400, 'swing');
            });

            $(parentSelector + ' .slider-container .slider-elem:nth-child('+ (currActiveIndex+1) +')').removeClass('active-slide');
            newActive.addClass('active-slide');
        }

            setTimeout(function () {
                runningLeft = false;
            }, 500);
        }
    }); //left nav eventListener

    //add right-nav trigger to S3 'ideas' button
    $('#slider-ideas-btn').on('click', function () {
        $('#content-4 .slider-right').trigger('click');
    });
}

function iniNavButton() {
    let toggle = true; //false: closed | true: open
    $('.nav-menu-icon').on('click',function () {
        //show nav
        if(toggle === false) {
            toggle = true;
            $('#navigation-toggle').animate({marginLeft: '0'}, 500, 'swing');
        } else {
            //hide nav
           toggle = false;
           let marginleftValue = '-22vw';
            if(window.matchMedia("(max-width: 400px)").matches) {
                marginleftValue = '-100vw';
            } else if(window.matchMedia("(max-width: 800px)").matches) {
                marginleftValue = '-55vw';
            }
           $('#navigation-toggle').animate({marginLeft: marginleftValue}, 500, 'swing');
        }
    });
}

function triggerNavMenu(selectorId) {
    //homescreen #content-0 nav button got clicked. since there is no circle element for this slider, it cant be called
    //with an external trigger click
    if(selectorId === 0 && $('.active-circle').length > 0) {
        toggleContentWindow(selectorId);
        //remove active circle css
        let selector = $('.active-circle');
        selector.animate({backgroundColor: '#3bba9c', padding: '9.2vw', top:circleSettings[selector.attr('id').split('-')[1]-1][0]}, 300, 'swing');
        selector.removeClass('active-circle');
        //add active list elem to Home tab in menu
        $('.active-menu-li').removeClass('active-menu-li');
        $('#nav-menu-li-0').addClass('active-menu-li');
    } else {
        $('#circle-'+selectorId).trigger('click');
    }
    //close nav after click, if on phone size
    if(window.matchMedia("(max-width: 400px)").matches) {
        $('#navigator-menu-icon').trigger('click');
    }
}

function markNavMenuElem() {
    $('.active-menu-li').removeClass('active-menu-li');
    let value = $('.active-circle').attr('id').split('-')[1];
    $('#nav-menu-li-' + value).addClass('active-menu-li');
}