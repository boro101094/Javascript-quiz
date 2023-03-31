var myTimer, timing = 60; 
//function that executes it self when page is loaded
$(document).ready(function () {
    myTimer = setInterval(function () {
        --timing;
        $('#timing').html(timing);
        if (timing <= 0) {
            fillSubmitScoreTab();

            $('#questions-tab a[href="#submitScore"]').tab('show');
            clearInterval(myTimer);
        }
    }, 1000);

});  