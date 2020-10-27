class TypeWritter {
    i;
    j;
    functionTransition;
    speed;
    selector;
    udSelector;
    txt;     //array

    constructor(text,css_selector,underline_selector) {
        this.txt = text;
        this.selector = css_selector;
        this.udSelector = underline_selector;
        this.speed = 100;
        this.speedR = 70;
        this.functionTransition = 400;
        this.i = 0;
        this.j = 0;
    }

    typeWriter() {
        //check if current word is completly written
        if (this.i < (this.txt)[this.j].length) {
            let currText = $(this.selector);
            //add next char to current word
            currText.html(currText.html() + this.txt[this.j].charAt(this.i));
            this.i++;
            //loop function
            setTimeout(this.typeWriter.bind(this), this.speed);
        } else {
            //go to the next word in the array
            this.j++;
            //delete current word again before writting next one
            setTimeout(this.typeWriterRemove.bind(this),this.functionTransition);
        }
    }
// TO DO: wenn project getyped wird dann erst menü punkte gleichzeitig mit rausrollen
    typeWriterRemove() {
        //check if last word was written
        if(this.j >= this.txt.length) {
            jQuery(this.udSelector).removeClass('underline--hover');
            return;
        }
        this.i = 0;
        let currText = $(this.selector);
        //check char length of current word
        if ( this.i < currText.html().length) {
            //remove last char of the current word
            currText.html(currText.html().substring(0,currText.html().length-1));
            this.i++;
            //loop function
            setTimeout(this.typeWriterRemove.bind(this), this.speedR);
        } else {
            //reset index
            this.i=0;
            //write next word
            setTimeout(this.typeWriter.bind(this),this.functionTransition)
        }
    }
}