//since scrollTop doesnt work for safari, refresh page if page gets refreshed manually to start at top again (server version)
window.onload = function() {
    if(window.matchMedia("(max-width: 800px)").matches) {
        //hash was added -> reload
        setTimeout(function () {
            if(window.location.hash == '#ini') {
                let url = window.location;
                url = (url.toString()).split('#')[0];
                //calling window.location already reloads page
                window.location = url;
            } else {
                window.location = window.location + '#ini';
            }
        },200);
    }
};
