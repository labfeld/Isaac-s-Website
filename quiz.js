let questions = ["what is diddys real name?", "Am I good at bedwars", "Am I a boy?", "Why do I play Bedwars?",
    "Where was I born", "Am I bald"
]
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
        "Cuz I feel like it", "Because Wallibear plays bedwars.", 'Cuz Im bald', 'My IQ is 69'
    ],
    [
        "America", "China", "IDK", "Australia"
    ],
    [
        "Ya", "No"
    ]

]
let RightAnswer = [
    'sean',
    'good',
    'Yes',
    'Because Wallibear plays bedwars.',
    'America',
    'Ya'
]

let huzz = document.getElementById('question')
let answer1 = document.getElementById('answer1')
let answer2 = document.getElementById('answer2')
let answer3 = document.getElementById('answer3')
let answer4 = document.getElementById('answer4')
let secondRowButtons = document.getElementById('secondRowButtons')


let score = 0
let QuestionNumber = 0
let numOfQuest = questions.length
let answer = ''

function showQuestion(question) {
    huzz.innerText = questions[question]
    let QuestionAnswers = answers[question]
    answer1.innerText = QuestionAnswers[0]
    answer2.innerText = QuestionAnswers[1]

    if (QuestionAnswers.length == 2) {
        secondRowButtons.classList.add("hide")
    } else if (
        QuestionAnswers.length == 4
    ) {
        secondRowButtons.classList.remove("hide")
        answer3.innerText = QuestionAnswers[2]
        answer4.innerText = QuestionAnswers[3]
    }

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

function ButtonSetup(button) {
    button.addEventListener("click", function (e) {
        if (button.innerText === answer) {
            score = score + 1
        }
        QuestionNumber = QuestionNumber + 1
        if (isLastQuestionOrSomething() == true) {
            checkScore()
        } else {

setTimeout(function() {
    showQuestion(QuestionNumber)  }, 1);
            
        }
    });
}
 ButtonSetup(answer1)
 ButtonSetup(answer2)
 ButtonSetup(answer3)
 ButtonSetup(answer4)

function resetVariables() {
    score = 0
    QuestionNumber = 0
    numOfQuest = questions.length
    answer = ''
    showQuestion(0)

}