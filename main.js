// All answer options

const option1  = document.querySelector('.option1'),
      option2  = document.querySelector('.option2'), 
      option3  = document.querySelector('.option3'),
      option4  = document.querySelector('.option4'); 


// All our options

const optionElements = document.querySelectorAll('.option');

const question = document.getElementById('question'); // сам вопрос 

const numberOfQuestion = document.getElementById('number-of-question'), // номер вопроса
      numberOfAllQuestions = document.getElementById('number-of-all-questions'); // количество всех вопросов


let indexOfQuestion, // Индекс текущего вопроса
indexOfPage = 0; // Индекс страницы

const answersTracker = document.getElementById('answers-tracker'); // обертка для трекера
const btnNext = document.getElementById('btn-next'); // кнопка далее

let score = 0; // итоговый результат викторины
const correctAnswer = document.getElementById('correct-answer'), // количество правильных ответов
      numberOfAllQuestions2 = document.getElementById('number-of-all-questions-2'), // количество всех вопросов (в модальном окне)
      btnTryAgain = document.getElementById('btn-try-again'); // кнопка "начать викторину заново"

const questions = [
    {
        question: 'Какая планета в Солнечной системе самая маленькая?',
        options: [
            'Меркурий',
            'Марс',
            'Нептун',
            'Венера',
        ],
        rightAnswer: 0
    },
    {
        question: 'Какая планета в Солнечной системе самая большая?',
        options: [
            'Уран',
            'Сатурн',
            'Марс',
            'Юпитер',
        ],
        rightAnswer: 3
    },
    {
        question: 'Какая планета в Солнечной системе самая горячая?',
        options: [
            'Земля',
            'Меркурий',
            'Венера',
            'Марс',
        ],
        rightAnswer: 2
    },
    {
        question: 'Какая планета является самой яркой на ночном небе?',
        options: [
            'Сатурн',
            'Юпитер',
            'Венера',
            'Марс',
        ],
        rightAnswer: 2
    },
    {
        question: 'Какая планета в Солнечной системе находится дальше всего от Солнца?',
        options: [
            'Меркурий',
            'Нептун',
            'Уран',
            'Юпитер',
        ],
        rightAnswer: 1
    },
    {
        question: 'Какая из этих планет вращается вокруг своей оси в другую сторону, в отличии от других планет?',
        options: [
            'Нептун',
            'Сатурн',
            'Уран',
            'Меркурий',
        ],
        rightAnswer: 2
    },
    {
        question: 'Шестая планета от Солнца имеет обширную кольцевую систему, как называется эта планета?',
        options: [
            'Нептун',
            'Уран',
            'Юпитер',
            'Сатурн',
        ],
        rightAnswer: 3
    },
];

numberOfAllQuestions.innerHTML = questions.length; //выводим количество вопросов

const load = () => {
question.innerHTML = questions[indexOfQuestion].question; //сами вопросы

//мапим ответы
option1.innerHTML = questions[indexOfQuestion].options[0];
option2.innerHTML = questions[indexOfQuestion].options[1];
option3.innerHTML = questions[indexOfQuestion].options[2];
option4.innerHTML = questions[indexOfQuestion].options[3];

numberOfQuestion.innerHTML = indexOfPage + 1; //установка номера текущей страницы
indexOfPage++; //увеличение индекса страницы
};


let completedAnswers = []; //массив уже заданнвх вопросов

const randomQuestion = () => {
    let randomNumber = Math.floor(Math.random() * questions.length);
    let hitDuplicate =  false; //якорь для проверки одинаковых вопросов

    if(indexOfPage == questions.length) {
        quizOver()
     } else {
            if(completedAnswers.length > 0) {
                completedAnswers.forEach(item => {
                    if(item == randomNumber) {
                        hitDuplicate = true;
                    }
                });
                if(hitDuplicate) {
                    randomQuestion();
                }else {
                    indexOfQuestion = randomNumber;
                    load();
                }

            }
            if(completedAnswers.length == 0) {
                indexOfQuestion = randomNumber;
                load();
            }

        }

    completedAnswers.push(indexOfQuestion);
};

    const checkAnswer = el => {

        if(el.target.dataset.id == questions[indexOfQuestion].rightAnswer) {

            el.target.classList.add('correct');
            updateAnswerTracker('correct');
            score++;
    } else {
        el.target.classList.add('wrong');
        updateAnswerTracker('wrong');
    }
    disabledOptions();
}

    for (option of optionElements) {

        option.addEventListener('click' , e => checkAnswer(e));
    }

const disabledOptions = () => {
optionElements.forEach(item => {
    item.classList.add('disabled');
    if(item.dataset.id == questions[indexOfQuestion].rightAnswer) {
item.classList.add('correct');


    }
})
}

const enableOptions = () => {
optionElements.forEach(item => {
    item.classList.remove('disabled','correct','wrong')
})
}

const answerTracker = () => {
questions.forEach(() => {
    const div = document.createElement('div');
    answersTracker.appendChild(div);
})
}

const updateAnswerTracker = status => {
    answersTracker.children[indexOfPage - 1].classList.add(`${status}`)


}




const validate = () => {
 if(!optionElements[0].classList.contains('disabled')){
        alert('Вам нужно выбрать один из вариантов ответа');
} else {
        randomQuestion();
        enableOptions();
}
}



const quizOver = () => {
    document.querySelector('.quiz-over-modal').classList.add('active');
    correctAnswer.innerHTML = score;
    numberOfAllQuestions2.innerHTML = questions.length;
};

const tryAgain = () => {
    window.location.reload();
};

btnTryAgain.addEventListener('click' , tryAgain);


btnNext.addEventListener('click' , () => {
    validate();
})



window.addEventListener('load', () => {
    randomQuestion();
    answerTracker();
})








