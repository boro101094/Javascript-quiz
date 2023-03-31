//function that executes it self when page is loaded
$(document).ready(function () {
  //create object with the selected questions for the quiz
  selectQuestions();
  createQuestionsHTML();

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


});



