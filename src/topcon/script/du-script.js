$(document).ready(function () {
    $('.circle-elem').on( "click", function() {
        //one elem already got clicked
        if($('#circle-container').find('.active-circle').length > 0) {
            //the clicked elem is the active one
            if($(this).hasClass('active-circle')) return;
            //turn active back to regular
            let active = $('.active-circle');
            active.animate({backgroundColor: '#3bba9c', padding: '6vw', bottom:circleSettings[active.attr('id').split('-')[1]-1][0]}, 400, 'swing');
            active.removeClass('active-circle');
            //add active to new elem
            $(this).animate({backgroundColor: '#2C323C', padding: '7.4vw', bottom:circleSettings[$(this).attr('id').split('-')[1]-1][1]}, 400, 'swing');
            $(this).addClass('active-circle');

            //first click instance
        } else {
            $(this).addClass('active-circle');
            transformCircleSize();
        }
        toggleContentWindow();
    });
});

// circle settings [regular[bottom],active[bottom]]
const circleSettings = [['13vw','13vw'],['6.5vw','5.1vw'],[0,'-3vw'],['13vw','13vw'],['6.5vw','5.1vw'],[0,'-3vw']];


function transformCircleSize() {
    setTimeout(function () {
        $('.circle-elem').each(function () {
            //all circle elems
            if($(this).attr('id') === 'circle-2' || $(this).attr('id') === 'circle-5') {
                $(this).animate({padding: '6vw', bottom: '6.5vw'}, 400, 'swing');
                //check if active
                if($(this).hasClass('active-circle')) $(this).animate({bottom: '5.1vw', padding: '7.4vw', backgroundColor: '#2C323C'}, 400, 'swing');
            } else if($(this).attr('id') === 'circle-1' || $(this).attr('id') === 'circle-4') {
                $(this).animate({padding: '6vw', bottom: '13vw'}, 400, 'swing');
                //check if active
                if($(this).hasClass('active-circle')) $(this).delay(350).animate({padding: '7.4vw', backgroundColor: '#2C323C'}, 400, 'swing');
            } else {
                $(this).animate({padding: '6vw'}, 400, 'swing');
                //check if active
                if($(this).hasClass('active-circle')) $(this).delay(350).animate({bottom: '-3vw', padding: '7.4vw', backgroundColor: '#2C323C'}, 400, 'swing');
            }
        });

        //circle container
        $('.circle').each(function () {
            $(this).animate({height: '25vw'}, 400, 'swing');
        });
        //center circles
        $('.right .filler').animate({left: '-6.9vw', width: '12vw', height: '12vw'}, 400, 'swing');
        $('.left .filler').animate({right: '-5.7vw', width: '12vw', height: '12vw'}, 400, 'swing');
        $('.filler h2').animate({fontSize: '2.5vw'}, 400, 'swing');
    }, 150)
}

// show specified content window
function toggleContentWindow() {
    let firstClick = false;
    //remove old frame if existing
    let active = $('body').find('.frame-active');
    if(active.length > 0) {
        active.removeClass('frame-active');
        active.delay(1100).animate({right: '-69%'}, 0);
    } else firstClick = true;

    //show new frame by gettings the active elems id number and combine this with to get the proper content frame by his id
    let idNumber = $('#circle-container').find('.active-circle');
    let selector = $('#content-'+ idNumber.attr('id').split('-')[1]);
    selector.addClass('frame-active');
    //check for first click instance
    if(firstClick) {
        $('#circle-container').animate({marginLeft: '-69%'}, 500, 'swing');
    }
    setTimeout(function () {
        selector.animate({right: 0}, 700, 'swing');
    },300);

}