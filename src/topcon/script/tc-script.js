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

    // ini bar graphs for first slider
    for(let i=0; i <= $('#fs1 .bar').length; i++) {
        setTimeout(function () {
            //add animation class and get specific percentage value
            let timeLimit = $('#bg'+ i +' .bar-display').addClass("bar-graph-effect").data("percentage");
            //call the percentage counter function
            numberCountUp('#bg'+i,timeLimit,1450);
            //delay each new bar longer than the previous one
        }, 650+(i*100))
    }


}); //  ready function

const questions = [
    "Which technologies will most influence your business model in the future?",
    "We can keep our sales for the next 3 years without digitization measures.",
    "What is more important?",
    "The qualifications of our employees are sufficient for the changes brought about by the digital transformation. Do you agree with the claim?",
    "What are your strongest competitive threats?",
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
function scrollToAnchor(selector) {
    $('html,body').animate({scrollTop: $(selector).offset().top},500);
}

function studyDataNewSlide(oldSlide,newSlide,color) {
    //activate transition placeholder to scale over current content
    $('#transition-placeholder').css('background-color',color).removeClass("disabled").addClass("square-scale-effect");
    //delay for 'square-scale-effect's' duration plus a little margin
    setTimeout(function () {
        //hide old slider
        $('#'+oldSlide).addClass("disabled");
        //change slider background to new slider background color
        $('#study-data-slide').css('background-color',color);
        //put placeholder into the back to still have the new backgroundcolor but not block the fade in of the new slide
        $('#transition-placeholder').css('z-index','-1');
        //fade in new slide
        $('#'+newSlide).removeClass("disabled").addClass("fade-in-slide-effect");
        setTimeout(function () {
            //after fade in disable placeholder again and but back into front for next use
            $('#transition-placeholder').addClass("disabled").css('z-index','10');
        },600);
    },1400);
}

function numberCountUp(selector,limit, duration) {
    // How long you want the animation to take, in ms
    const animationDuration = duration;
    // Calculate how long each ‘frame’ should last if we want to update the animation 60 times per second
    const frameDuration = 1000 / 60;
    // Use that to calculate how many frames we need to complete the animation
    const totalFrames = Math.round(animationDuration / frameDuration);
    // An ease-out function that slows the count as it progresses
    const easeOutQuad = t => t * (2 - t);
    //selector
    let selectorElem = $(selector +' .bar-display');

    // The animation function, which takes an Element
        let frame = 0;
        const countTo = parseInt(limit);
        // Start the animation running 60 times per second
        const counter = setInterval(() => {
            frame++;
            // Calculate our progress as a value between 0 and 1
            // Pass that value to our easing function to get our
            // progress on a curve
            const progress = easeOutQuad(frame / totalFrames);
            // Use the progress value to calculate the current count
            const currentCount = Math.round(countTo * progress);

            // If the current count has changed, update the element
            if (parseInt(selectorElem.html().split("%")[0], 10) !== currentCount) {
                selectorElem.html(currentCount + "%");
            }

            // If we’ve reached our last frame, stop the animation
            if (frame === totalFrames) {
                clearInterval(counter);
            }
        }, frameDuration);
}