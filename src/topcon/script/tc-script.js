$(document).ready(function () {
    console.log("ini");
    //make sure to start at the top
    $('html,body').scrollTop(0);

    //ini first slider
    orientationNav(1);

    // ini sortable lists
    $(function  () {
        $("ol.sort-list").sortable();
    });

    //ini keyboard listener
    $(document).on('keydown', function(e) {
        switch(e.which) {
            // up
            case 38:
                let csUp = getCurrentSlider();
                if(csUp-1 > 0) {
                orientationNav(csUp-1);
                scrollToAnchor('#slide-'+(csUp-1));
            }
                break;
            // down
            case 40:
                let csDown = getCurrentSlider();
                if(csDown+1 < 7) {
                    orientationNav(csDown+1);
                    scrollToAnchor('#slide-'+(csDown+1));
                }
                break;

            default: return; // exit this handler for other keys
        }
        e.preventDefault(); // prevent the default action (scroll / move caret)
    });

    // smooth scroll while overflow is permanently 'hidden'
    $('a').click(function(){
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top
        }, 500);
        return false;
    });
}); //  ready function

const questions = [
    "Which technologies will most influence your business model in the future?",
    "We can keep our sales for the next 3 years without digitization measures.",
    "What is more important? Digitization of existing business models or development of new business models.",
    "The qualifications of our employees are sufficient for the changes brought about by the digital transformation. Do you agree with the claim?",
    "What are your strongest competitive threats? StartUps, tech companies, competitors from your own industry",
    "What measures should the digital unit implement immediately?",
];

function writeTitle(titleNumber,selector,underlineSelector) {
    //clear if page was visited already
    if($(selector).html() !== "") return;
    let typeWriter = new TypeWriter([questions[titleNumber-1]], selector, underlineSelector,false);
    setTimeout(typeWriter.typeWriter.bind(typeWriter),550);
}

function orientationNav(orderNumber) {
    // check if already activ elem got clicked and add active elem to correct nav elem
    if($('#or-nav_'+orderNumber).hasClass('or-nav-elem--active')) {
        return;
    } else {
        $('#or-nav_'+ orderNumber).addClass('or-nav-elem--active');
        writeTitle(orderNumber,'#typewriterText'+orderNumber,'#hu-slide'+orderNumber);
    }
    //remove all actives from the rest of the nav
    $(".or-nav-elem").each(function() {
        // "_" separator of the id for the respective orderNumber
        if(parseInt($(this).attr("id").split('_')[1]) !== orderNumber) {
           $(this).removeClass('or-nav-elem--active');
        }
    });
}

//returns currently active slider
function getCurrentSlider() {
    return parseInt($('#orientation-nav-container').find('.or-nav-elem--active').attr('id').split('_')[1]);
}

//scroll function as <a> tag href replacment when key-up / down gets used
function scrollToAnchor(selector){
    $('html,body').animate({scrollTop: $(selector).offset().top},500);
}