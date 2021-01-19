$(document).ready(function () {
    $('.circle-elem').on( "click", function() {
        //one elem already got clicked
        if($('#circle-container').find('.active-circle').length > 0) {
            //the clicked elem is the active one
            if($(this).hasClass('active-circle')) return;
            //turn active back to regular
            let active = $('.active-circle');
            active.animate({backgroundColor: '#3bba9c', padding: '3vw', top:circleSettings[active.attr('id').split('-')[1]-1][0]}, 400, 'swing');
            active.removeClass('active-circle');
            //add active to new elem
            $(this).animate({backgroundColor: '#2C323C', padding: '4vw', top:circleSettings[$(this).attr('id').split('-')[1]-1][1]}, 400, 'swing');
            $(this).addClass('active-circle');

            //first click instance
        } else {
            $(this).addClass('active-circle');
            transformCircleSize();
        }
        toggleContentWindow();
    });

    //prevent tab switch focus
    $(document).on('keydown', function(e) {
        if(e.which === 9) {
            void(0);
        }
        e.preventDefault();
    });

    //ini sliders
    iniSlider();

    //ini nav Button
    iniNavButton();
});

// circle settings [regular[bottom],active[bottom]]
const circleSettings = [[0,'-2.1vw'],['3.5vw','2.5vw'],['7vw','7vw'],[0,'-2.1vw'],['3.5vw','2.5vw'],['7vw','7vw']];


function transformCircleSize() {
    setTimeout(function () {
        $('.circle-elem').each(function () {
            //all circle elems
            if($(this).attr('id') === 'circle-2' || $(this).attr('id') === 'circle-5') {
                $(this).animate({padding: '3vw', top: '3.5vw'}, 400, 'swing');
                //check if active
                if($(this).hasClass('active-circle')) $(this).animate({top: '2.5vw', padding: '4vw', backgroundColor: '#2C323C'}, 400, 'swing');
            } else if($(this).attr('id') === 'circle-1' || $(this).attr('id') === 'circle-4') {
                $(this).animate({padding: '3vw'}, 400, 'swing');
                //check if active
                if($(this).hasClass('active-circle')) $(this).delay(350).animate({top: '-2.1vw', padding: '4vw', backgroundColor: '#2C323C'}, 400, 'swing');
            } else {
                $(this).animate({padding: '3vw', top: '7vw'}, 400, 'swing');
                //check if active
                if($(this).hasClass('active-circle')) $(this).delay(350).animate({top: '7vw', padding: '4vw', backgroundColor: '#2C323C'}, 400, 'swing');
            }
        });

        //circle container
        $('.circle').each(function () {
            $(this).animate({height: '13vw', width: '7vw'}, 400, 'swing');
        });
        //center circle
        $('.left .filler').animate({right: '-3.7vw', top: '3vw', width: '7vw', height: '7vw'}, 400, 'swing');
        $('.filler h2').animate({fontSize: '1.4vw', marginRight: '0px'}, 400, 'swing');
        $('.filler code').animate({fontSize: '0.7vw'}, 400, 'swing');

        //tagline
        if(!window.matchMedia("(max-width: 800px)").matches) {
            $('#circle-container h4').animate({fontSize: '0.75vw'}, 400, 'swing');
        } else {
            $('#circle-container h4').animate({fontSize: '0.75vw',marginTop: '3px'}, 400, 'swing');
        }
        $('#circle-container h4').html('click on one of the circle elements<br/>to get further information');
        //elem titles
        $('.circle-title-class').each(function () {
            $(this).animate({fontSize: '.75vw'}, 400, 'swing');
        });
        $('#circle-title-4').css({'top': '31%', 'left': '8%', 'line-height': '1vw'});
        $('#circle-title-5').css({'top': '36%', 'left': '30%', 'width': '100%', 'line-height': '0.8vw'});
        $('#circle-title-6').css({'top': '49%', 'left': '8%'});

    }, 150)
}

// show specified content window
function toggleContentWindow() {
    let firstClick = false;
    //remove old frame if existing
    let active = $('body').find('.frame-active');
    if(active.length > 0) {
        //stop video playing if window gets changed
        $('.frame-active').find('video').each(function () {
            $(this).trigger('pause');
        });
        active.removeClass('frame-active');
        active.delay(1100).animate({right: '-100%'}, 0);
    } else firstClick = true;

    //show new frame by gettings the active elems id number and combine this with to get the proper content frame by his id
    let idNumber = $('#circle-container').find('.active-circle');
    let selector = $('#content-'+ idNumber.attr('id').split('-')[1]);
    selector.addClass('frame-active');
    //check for first click instance and move circle to the right if so
    if(firstClick) {
        $('#circle-container').animate({marginLeft: '-83%', paddingTop: '110px'}, 500, 'swing');
        //show nav toggle button (menu open)
        setTimeout(function () {
            $('#navigation-toggle').animate({opacity: 1, paddingLeft: '20%'}, 400, 'swing');
        },450);
        //trigger eventListener to close menu after being shown for some seconds
        setTimeout(function () {
            $('#navigation-toggle').trigger('click');
        },1900);
    }

    //show fitting content slide
    setTimeout(function () {
        selector.animate({right: 0}, 700, 'swing');
    },300);

}

function iniSlider() {
    $('#slider-container').find('.slider-elem').each(function (index) {
        $(this).css({'left': 100*index + 'vw'});
    });

    let runningRight = false;
    $('.slider-right').on('click', function () {
        if(runningRight === false) {
            runningRight = true;

        let currActiveIndex = undefined;
        let newActive = undefined;
        //get current & new active slide | range for index: 2 - n | range for nth-child: 3 - n
        $('.slider-elem').each(function () {
            if($(this).hasClass('active-slide')) {
                currActiveIndex = $(this).index();

                //stop slide if trying to go OOB
                if(currActiveIndex >= ($('.slider-elem').length+1)) {
                    return;
                }
                //if moving in the opposit direction from a dead end, set button free again
                if(currActiveIndex === 2) {
                    $('.slider-left').removeClass('slider-nav-limit');
                }
                //change right-nav button if last slide is reached
                if(currActiveIndex >= ($('.slider-elem').length)) {
                    $('.slider-right').addClass('slider-nav-limit');
                }
                newActive = $('#slider-container .slider-elem:nth-child('+ (currActiveIndex+2) +')');
            }
        });

        //set new and old active slide class
        if(newActive !== undefined) {
            //set new left values
            $('.slider-elem').each(function () {
                //get current left value, transform to a number and subtract 100vw to change current slider by 1
                let value = parseInt($(this).css('left'),10);
                //change from px value to vw value
                value = (value*(100/($(window).width())))-100;
                $(this).animate({'left': value + 'vw'}, 400, 'swing');
            });

            $('#slider-container .slider-elem:nth-child('+ (currActiveIndex+1) +')').removeClass('active-slide');
            newActive.addClass('active-slide');
        }

            setTimeout(function () {
                runningRight = false;
            }, 500);
        }
    }); //right nav eventListener

    let runningLeft = false;
    $('.slider-left').on('click', function () {
        let currActiveIndex = undefined;
        let newActive = undefined;

        if(runningLeft === false) {
            runningLeft = true;

        //get current & new active slide | range for index: 2 - n | range for nth-child: 3 - n
        $('.slider-elem').each(function () {
            if($(this).hasClass('active-slide')) {
                currActiveIndex = $(this).index();
                //stop slide if trying to go OOB
                if(currActiveIndex <= 2) {
                    return;
                }
                if(currActiveIndex-1 === 2) {
                    //change left nav-button if last slide is reached
                    $('.slider-left').addClass('slider-nav-limit');
                }
                //if moving in the opposit direction from a dead end, set button free again
                if(currActiveIndex === $('.slider-elem').length+1) {
                    $('.slider-right').removeClass('slider-nav-limit');
                }
                newActive = $('#slider-container .slider-elem:nth-child('+ (currActiveIndex) +')');
            }

            if(newActive !== undefined) {
            }
        });

        //set new and old active slide class
        if(newActive !== undefined) {
            //set new left values
            $('.slider-elem').each(function () {
                //get current left value, transform to a number and subtract 100vw to change current slider by 1
                let value = parseInt($(this).css('left'),10);
                //change from px value to vw value
                value = (value*(100/($(window).width())))+100;
                $(this).animate({'left': value + 'vw'}, 400, 'swing');
            });

            $('#slider-container .slider-elem:nth-child('+ (currActiveIndex+1) +')').removeClass('active-slide');
            newActive.addClass('active-slide');
        }

            setTimeout(function () {
                runningLeft = false;
            }, 500);
        }
    }); //left nav eventListener

    //add right-nav trigger to S3 'ideas' button
    $('#slider-ideas-btn').on('click', function () {
        $('.slider-right').trigger('click');
    });
}

function iniNavButton() {
    let toggle = true;
    $('#navigation-toggle').on('click',function () {
        //show nav
        if(toggle === false) {
            toggle = true;
            $('#circle-container').animate({marginLeft: '-83%'}, 500, 'swing');
            $('#navigation-toggle').animate({paddingLeft: '20%'}, 500, 'swing').html('<');
        } else {
            //hide nav
           toggle = false;
            $('#circle-container').animate({marginLeft: '-120%'}, 500, 'swing');
            $('#navigation-toggle').animate({paddingLeft: '15px'}, 500, 'swing').html('>');
        }
    });
}

//if(!window.matchMedia("(max-width: 800px)").matches) {