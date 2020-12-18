$(document).ready(function () {

    /* - question page - */
    if(window.location.href.indexOf("index.html") > -1) {
        console.log("question page initiated"); //debugging purpose
        setTimeout(function () {
            // ini sortable lists
            $(function  () {
                $("ol.sort-list").sortable();
            });

        }, 600); //600
    }
    /* - study-data page - */
    else if(window.location.href.indexOf("study-data.html") > -1) {
        console.log("study data page initiated"); //debugging purpose
        //save that current page is study-data page
        studyDataVisited[0] = true;

        // set pyramid graph bg-colors (fade effect)
        $('.pyramid-elem').each(function (index) {
            let r = 49 + (index * 5);
            let g = 55 + (index * 5);
            let b = 65 + (index * 5);
            let color = "rgb("+r+", "+g+","+b+")";
            $(this).css('background-color', color);
        });
        //ini bar graph bars width depending on regarding percentage
        iniBarGraph('#bar-graph-1');
    } // /study data page ini


    //make sure to start at the top after refresh
    $('html,body').scrollTop(0);

    //ini first slider
    orientationNav(1);

    //Eventhandler - Keyboard up / down clicked
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

    // eventHandler - smooth scroll while overflow is permanently 'hidden'
    $('a').click(function(){
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top
        }, 500);
        return false;
    });

    // eventHandler for AFTER resize event -> scroll to current slider
    $(window).bind('resizeEnd', function() {
        let currentSlider = getCurrentSlider();
        orientationNav(currentSlider);
        $('html, body').animate({
            scrollTop: $("#slide-" + currentSlider).offset().top
        }, 0);
    });

}); //  ready function

const questions = [
    "Which technologies will most influence your business model in the future?",
    "We can keep our sales for the next 3 years without digitization measures.",
    "What is more important?",
    "The qualifications of our employees are sufficient for the changes brought about by the digital transformation. Do you agree with the claim?",
    "What are your strongest competitive threats?",
    "What measures should the digital unit implement immediately?",
];

// [0] current page = study-data, [1-n] study-data page sliders
let studyDataVisited = [false, false, false, false, false];

function writeTitle(titleNumber,selector,underlineSelector) {
    //clear if page was visited already (text is already written)
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
        //ini current study-data slider graph animation
        if(studyDataVisited[0] && !studyDataVisited[orderNumber]) {
            studyDataVisited[orderNumber] = true;
            //check if slider contains a bar graph
            if(orderNumber === 1) {
                barGraphAnimation(orderNumber, "bar-graph-horizontal-effect");
            } else if(orderNumber === 3) {
                barGraphAnimation(orderNumber, "bar-graph-vertical-effect");
            }
        }
    }
    //remove all actives from the rest of the nav
    $(".or-nav-elem").each(function() {
        // "_" separator of the id for the respective orderNumber
        if(parseInt($(this).attr("id").split('_')[1]) !== orderNumber) {
           $(this).removeClass('or-nav-elem--active');
        }
    });
}

//returns currently active slider number
function getCurrentSlider() {
    return parseInt($('#orientation-nav-container').find('.or-nav-elem--active').attr('id').split('_')[1]);
}

//scroll function as <a> tag href replacment when key-up / down gets used
function scrollToAnchor(selector) {
    $('html,body').animate({scrollTop: $(selector).offset().top},500);
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
    let selectorElem = selector;

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

            // If we've reached our last frame, stop the animation
            if (frame === totalFrames) {
                clearInterval(counter);
            }
        }, frameDuration);
}

function barGraphAnimation(slideIndex,animation) {
    //basic delay after function call
    setTimeout(function () {
        //add animation class to each bar elem
        $('#bar-graph-'+ slideIndex +' .bar-display').each(function (index) {
            //bind current elem to timeout function
            let object = $(this);
            //increase delay of animation & countUp for each following bar
            setTimeout(function () {
                let timeLimit = object.addClass(animation).data("percentage");
                numberCountUp(object, timeLimit, 1450);
                }, 50 + (index * 100),object)
        });
    }, 600); //600
}

function iniBarGraph(selector) {
    $(selector + ' .bar-elem').each(function (index) {
        //calculate length: percentage-value * crunch-value(0.7) + min-value(10)
        $(this).css('width', ($($(selector + ' .bar-display')[index]).data("percentage"))*0.7+10+'vw');
    });

}

//to fix wrong scroll placement after resize -> scroll to current slides anchor AFTER resizing
$(window).resize(function() {
    if(this.resizeTO) clearTimeout(this.resizeTO);
    this.resizeTO = setTimeout(function() {
        $(this).trigger('resizeEnd');
    }, 100);
});
