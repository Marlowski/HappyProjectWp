// circle page transition
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