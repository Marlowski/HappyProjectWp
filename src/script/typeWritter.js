var j = 0;
var i = 0;
var txt = ['Lorem.','Ipsum'];
var speed = 70;
var functionTransition = 400;

function typeWriterRemove() {
    i = 0;
    let currText = document.getElementById("typewriterText").innerHTML;
    if ( i < currText.length) {
        document.getElementById("typewriterText").innerHTML = currText.substring(0,currText.length-1);
        i++;
        setTimeout(typeWriterRemove, speed);
    } else {
        //reset index
        i=0;
        if(j < txt.length) {
            setTimeout(typeWriter,functionTransition)
        } else {
            //testing purposes
            alert("done");
            i=0;
            j=0;
        }
    }
}

function typeWriter() {
    if (i < txt[j].length) {
        document.getElementById("typewriterText").innerHTML += txt[j].charAt(i);
        i++;
        setTimeout(typeWriter, speed);
        //word is written progress in the word array to get the next entity
    } else {
        j++;
        //delete word again
        setTimeout(typeWriterRemove,functionTransition);
    }
}

/* applied to following html elems
<div id=tpContainer>
    <div id="typewriterText"></div>
    <span class="typewriter">_</span>
    </div>
    <button onclick="typeWriter()">Write</button>
    <button onclick="typeWriterRemove()">Delete</button>
*/