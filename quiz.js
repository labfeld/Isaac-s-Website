let questions = ["what is diddys real name?", "Am I good at bedwars", "Am I a boy?", "Why do I play Bedwars?"]
let answers = [
    [
        "sean", "YOUR MUM"
    ],
    ["good", "bad"

    ],
    [
        "Yes", "No"
    ],
    [
        "Cuz I feel like it", "Because Wallibear plays bedwars.", 'Cuz Im bald', 'My IQ is 50'
    ]
    
]
let RightAnswer = [
    'sean',
    'good',
    'Yes',
    'Cuz I feel like it',
    'Because Wallibear plays bedwars.'
]   

let huzz = document.getElementById('question')
let answer1 = document.getElementById('answer1')
let answer2 = document.getElementById('wronganswer1')

let score = 0
let QuestionNumber = 0
let numOfQuest = questions.length
let answer = ''

function showQuestion(question) {
    huzz.innerText = questions[question]
    answer1.innerText = answers[question][0]
    answer2.innerText = answers[question][1]
    answer = RightAnswer[question]
}

showQuestion(0)

function checkScore() {
    if (score == numOfQuest) {
        right()
    } else {
        wrong()
    }
}

function right() {
    document.location = "yougotitright.html"
}

function wrong() {
    document.location = "yougotitwrong.html"
}

function isLastQuestionOrSomething() {
    if (
        QuestionNumber >= numOfQuest
    ) {
        return true
    } else {
        return false
    }
}


answer1.addEventListener("click", function (e) {
    if (answer1.innerText === answer) {
        score = score + 1
    }
    QuestionNumber = QuestionNumber + 1
    if (isLastQuestionOrSomething() == true) {
        checkScore()
    } else {
        showQuestion(QuestionNumber)
    }
});
answer2.addEventListener("click", function (e) {
    if (answer2.innerText === answer) {
        score = score + 1
    }
    QuestionNumber = QuestionNumber + 1
    if (isLastQuestionOrSomething() == true) {
        checkScore()
    } else {
        showQuestion(QuestionNumber)
    }
});


window.addEventListener('pageshow', function (event) {
    if (event.persisted) {
        // This page was restored from the cache, reset variables here
        resetVariables();
    }
});

function resetVariables() {
    score = 0
    QuestionNumber = 0
    numOfQuest = questions.length
    answer = ''
    showQuestion(0)

}