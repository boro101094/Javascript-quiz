//JS where all the topScores of the quiz will be stored
//the scores will reset every time the web application is initialized or refresh
/*
example of object

var topScores = {
    score1: {
        initial: "BC",
        score: 100
    },
    score2: {
        initial: "BC",
        score: 90
    }
    .
    .
    .
    scoreN: {
        initial: "BC",
        score: 1
    }

};

*/
var topScores = [];
var currentScore = 0;

function saveScore() {
    var score = ((currentScore * 100) / numQuestions).toFixed(2);

    //topScores[Object.keys(topScores).length] = { initial: $("#initial").val(), score: score };
    topScores[topScores.length]={ initial: $("#initial").val(), score: score };
    $('#questions-tab a[href="#highScores"]').tab('show');
    currentScore = 0;
    checkHighScores();

}

function checkHighScores() {
    $('#questions-tab a[href="#highScores"]').tab('show');
    $("#tblHighScores > tbody > tr").remove();

    console.log('antes sort');
    //topScores.sort((a, b) => (a.score > b.score) ? 1 : (a.score === b.score) ? ((a.initial > b.initial) ? 1 : -1) : -1 );
    topScores.sort((a, b) => parseFloat(b.score) - parseFloat(a.score));

    
    var newRowContent;
    for (let i = 0; i < topScores.length; i++) {
        newRowContent= "<tr><td>"+(+i+1)+"</td><td>"+topScores[i].initial+"</td><td>"+topScores[i].score+"</td></tr>";
        $(newRowContent).appendTo($("#tblHighScores"));        
    }

}

function compare( a, b ) {
    if ( a.score < b.score ){
      return -1;
    }
    if ( a.score > b.score ){
      return 1;
    }
    return 0;
  }
  
  //falta sort de los puntos

function fillSubmitScoreTab() {
    $("#submitScore").empty();
    $("#submitScore").append(`<div class="container mt-sm-5 my-1">
          <div class="question ml-sm-5 pl-sm-5 pt-2" >
              <h1>Your score is: ${((currentScore * 100) / numQuestions).toFixed(2)}/100.00</h1>
              <div class="form-group mx-sm-3 mb-2">
                <input type="text" class="form-control" id="initial" placeholder="Insert Name">
              </div>
              <button class="btn btn-primary mb-2" onClick="saveScore()">Save Score</button>
              <button class="btn btn-primary mb-2" onClick="checkHighScores()">Check High Scores</button>
          </div>

      </div>`);

}

function startOver() {
    selectQuestions();
    $("#questions-list").empty();
    createQuestionsHTML();


    $('#questions-tab a[href="#question0"]').tab('show');

    timing = 60;
    myTimer = setInterval(function () {
        --timing;
        $('#timing').html(timing);
        if (timing <= 0) {
            fillSubmitScoreTab();

            $('#questions-tab a[href="#submitScore"]').tab('show');
            clearInterval(myTimer);
        }
    }, 1000);


    $('.btnNext').click(function () {
        var questionId = $('input[type="radio"]:checked').parent().parent().parent().parent().parent().attr('id').trim().slice(-1);
        var response = $('input[type="radio"]:checked').parent().text().trim()
    
        $('#alert').attr('hidden', false);
        if (quizQuestions[questionId].ans === response) {
          $("#alert").removeClass("incorrect");
          $("#alert").addClass("correct");
          $("#alert").append("<strong>CORRECT!!!</strong>");
          currentScore++;
    
        } else {
          $("#alert").addClass("incorrect");
          $("#alert").removeClass("correct");
          $("#alert").append("<strong>WRONG!!! 10 second penalty</strong>");
          if (timing < 10 ){
            timing=2;
          }else{
            timing= timing - 10;
    
          }
          
        }
    
        if($('.nav-tabs > .active').next('li').find('a').attr('href') === '#submitScore'){
          fillSubmitScoreTab();
          clearInterval(myTimer);
    
        }
    
        //time out to change of question
        setTimeout(() => {
          $('#alert').attr('hidden', true);
          $("#alert").empty();
          $('.nav-tabs > .active').next('li').find('a').trigger('click');
        }, "1000");
    
    
      });
}
