let questions=["what is diddys real name?"]
let answer=[
    [
        "sean", "YOUR MUM"
    ]
]
let RightAnswer=[
    'sean'
]

let question=document.getElementById('question')
let answer1= document.getElementById('answer1')
let answer2= document.getElementById('wronganswer1')

question.innerText=questions[0]
answer1.innerText=answer[0][0]
answer2.innerText=answer[0][1]

answer1.addEventListener("click", function (e) {
    if (answer1.innerText===RightAnswer[0]) {
        document.location = "yougotitright.html"
        alert('You got it correct!')
    } else{
        alert(' YOU GOT IT WRONG! EMOTIONAL DAMAGE!')
        document.open('yougotitwrong.html')
        document.location = "yougotitwrong.html"
    }
  });
  answer2.addEventListener("click", function (e) {
    if (answer2.innerText===RightAnswer[0]) {
        alert('You got it correct!')
        document.location = "yougotitright.html"
    } else{
        alert(' YOU GOT IT WRONG! EMOTIONAL DAMAGE!')
        document.location = "yougotitwrong.html"
    }
  });