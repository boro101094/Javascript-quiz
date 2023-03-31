//JS where all the questions of the quiz will be stored
//object will contain 10 questions, the web application will select random questions for the quiz
//this object will act like a Data Base for questions, flexible to add new questions anytime
var questions = {
    q0: {
        question: "Javascript is an ___ language?",
        op1: "Object-Oriented",
        op2: "Object-Based",
        op3: "Procedural",
        op4: "None of the above",
        ans: "Object-Oriented"
    },
    q2: {
        question: "Wich of the following keywords is used to define a variable in Javacript?",
        op1: "var",
        op2: "let",
        op3: "Both A and B",
        op4: "None of the above",
        ans: "Both A and B"
    },
    q3: {
        question: "Which of the folloing methods are used to access HTML elements using Javascript?",
        op1: "getElementbyId()",
        op2: "getElementsByClassName()",
        op3: "Both A and B",
        op4: "None of the above",
        ans: "Both A and B"
    },
    q4: {
        question: "Upon encountering empty statements, what does the javascript interpreter do?",
        op1: "Throws an error",
        op2: "Ignores the statements",
        op3: "Gives a warning",
        op4: "None of the above",
        ans: "Ignores the statements"
    },
    q5: {
        question: "Which of the following methods can be used to display data in some form using Javascript?",
        op1: "document.write()",
        op2: "console.log()",
        op3: "windows.alert()",
        op4: "All of the above",
        ans: "All of the above"
    },
    q6: {
        question: "How can a datatype be declared to be a constant type?",
        op1: "const",
        op2: "var",
        op3: "let",
        op4: "constant",
        ans: "const"
    },
    q7: {
        question: "What keyword is used to check whether a gven property is valid or not?",
        op1: "in",
        op2: "is in",
        op3: "exists",
        op4: "lies",
        ans: "in"
    },
    q8: {
        question: "When an operator's value is NULL, the typeof returned by the unary operator is",
        op1: "Boolean",
        op2: "Undefined",
        op3: "Object",
        op4: "Integer",
        ans: "Object"
    },
    q9: {
        question: "Which function is used to serialize an object into a JSON string in Javadcript?",
        op1: "stringify()",
        op2: "parse()",
        op3: "convert()",
        op4: "None of the above",
        ans: "stringify()"
    },
    q10: {
        question: "Which of the following are closures in Javascript?",
        op1: "Variables",
        op2: "Functions",
        op3: "Objects",
        op4: "All of the above",
        ans: "All of the above"
    }
};


//object that will store the questions showed to the user
var quizQuestions = {};

//variable to select how many questions are displayed on the quiz
var numQuestions = 5;


//function that obtains random questions from the object of questions
function selectQuestions() {
    //deep copy of questions, so that the "questions" object is not affected.
    var questionsCopy = JSON.parse(JSON.stringify(questions));

    var element;
    for (let i = 0; i < numQuestions; i++) {

        element = (randomQuestion(questionsCopy));
        quizQuestions[i] = element[1];
        delete questionsCopy[element[0]];
    }
}

function randomQuestion(questionList) {
    var keys = Object.keys(questionList);
    var numQuestion = keys[keys.length * Math.random() << 0];
    //return key of question and the object for that key
    return [numQuestion, questionList[numQuestion]];

};

function createQuestionsHTML() {
    for (let i = 0; i < (numQuestions); i++) {

        //create tabs for questions
        $("#questions-tab").append(
            `<li ${i == 0 ? `class="active"` : `class=""`}><a href="#question` + i + `" data-toggle="tab">t</a></li>`);

        //insert content on all tabs
        if(i==0){
            $("#questions-list").append(`<div class="container timer"> Time Remaining: <span id="timing"></span> seconds </div>`);
        }
        $("#questions-list").append(`<div class="tab-pane ${i == 0 ? ` active` : ` `} " id="question` + i + `">
            
            <div class="container mt-sm-5 my-1">
                <div class="question ml-sm-5 pl-sm-5 pt-2" >
                    <div class="py-2 h5"><b>`+ quizQuestions[i].question + `</b></div>
                    <div class="ml-md-3 ml-sm-3 pl-md-5 pt-sm-0 pt-3 questions">
                        <label class="options">`+ quizQuestions[i].op1 + `
                            <input type="radio" class="btnNext" name="radio">
                            <span class="checkmark"></span>
                        </label>
                        <label class="options">`+ quizQuestions[i].op2 + `
                            <input type="radio" class="btnNext" name="radio">
                            <span class="checkmark"></span>
                        </label>
                        <label class="options">`+ quizQuestions[i].op3 + `
                            <input type="radio" class="btnNext" name="radio">
                            <span class="checkmark"></span>
                        </label>
                        <label class="options ">`+ quizQuestions[i].op4 + `
                            <input type="radio" class="btnNext" name="radio">
                            <span class="checkmark"></span>
                        </label>
                    </div>
                </div>
            </div>
        </div>`);

    }

    //tab creating for submitting scores and showing high scores
    $("#questions-tab").append(
        `<li><a href="#submitScore" data-toggle="tab">Submit Score</a></li>`);

    $("#questions-tab").append(
        `<li><a href="#highScores" data-toggle="tab">High Scores</a></li>`);


    //Tab - submit score of quiz
    $("#questions-list").append(`<div class="tab-pane" id="submitScore">
    </div>`);


    //Tab - show high scores
    $("#questions-list").append(`<div class="tab-pane" id="highScores">
            
            <div class="container mt-sm-5 my-1">
                <div class="question ml-sm-5 pl-sm-5 pt-2" >
                    <table class="table" id="tblHighScores">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Initials</th>
                            <th scope="col">Score</th>
                        </tr>
                        </thead>
                        <tbody> 
                        </tbody>
                    </table>
                </div>
                <button class="btn btn-primary mb-2" onClick="startOver()">Try Again!!</button>
            </div>
        </div>`);

}