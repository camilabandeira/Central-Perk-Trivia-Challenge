
// Quiz questions logic
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; 
    }
}


document.addEventListener('DOMContentLoaded', function () {
    const questions = [
        {
            question: "What word does Ross repeatedly yell when moving his couch up the stairs?",
            choices: ["Pivot!", "Shift!", "Up!", "Turn!"],
            answer: 0
        },
        {
            question: "What is Joey's favorite type of sandwich?",
            choices: ["Ham and cheese", "Meatball sub", "Turkey", "Salami"],
            answer: 1
        },
        {
            question: "In Monica's apartment, what is famously corrected from 'Clean' to 'Cleaner'?",
            choices: ["The kitchen counter", "The windows", "The bathroom", "The fridge"],
            answer: 2
        },
        {
            question: "What does Ross claim to have that makes him ready for anything?",
            choices: ["Karate", "Unagi", "A black belt", "Judo skills"],
            answer: 1
        },
        {
            question: "Which character famously works at Central Perk?",
            choices: ["Rachel", "Monica", "Phoebe", "Gunther"],
            answer: 3
        },
        {
            question: "Who is known for their iconic line, 'We were on a break'?",
            choices: ["Ross", "Chandler", "Joey", "Monica"],
            answer: 0
        },
        {
            question: "What type of animal is Ross's pet, Marcel?",
            choices: ["A dog", "A monkey", "A rabbit", "A cat"],
            answer: 1
        },
        {
            question: "What does Joey never share?",
            choices: ["His books", "His food", "His clothes", "His DVDs"],
            answer: 1
        },
        {
            question: "Which character tries to teach Joey French?",
            choices: ["Phoebe", "Ross", "Rachel", "Monica"],
            answer: 0
        },
        {
            question: "What is the name of the recliners that Joey and Chandler famously own?",
            choices: ["Rosita and Josephine", "Rosita and Marisol", "Rosita and Consuela", "Rosita and the Chairy"],
            answer: 0
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;
    let timer;
    let timeLeft = 15;
    const questionElement = document.querySelector('.question h2');
    const questionNumberElement = document.querySelector('.question span');
    const choicesElement = document.querySelector('.choices');
    const nextButton = document.querySelector('.next-btn');
    const resultBox = document.querySelector('.result-box');
    const timerElement = document.querySelector('.timer_sec');

    shuffleArray(questions);

    function displayQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        questionElement.textContent = currentQuestion.question;
        questionNumberElement.textContent = `${currentQuestionIndex + 1}.`;
        choicesElement.innerHTML = '';
        currentQuestion.choices.forEach((choice, index) => {
            const button = document.createElement('button');
            button.classList.add('choice');
            button.textContent = choice;
            button.onclick = function () {
                selectAnswer(index, currentQuestion.answer);
            };
            choicesElement.appendChild(button);
        });

        
        if (timer) clearInterval(timer);
        timeLeft = 15;
        timerElement.textContent = timeLeft;
        timer = setInterval(updateTimer, 1000);
    }

    function selectAnswer(selectedIndex, correctIndex) {
        Array.from(choicesElement.children).forEach((button, index) => {
            button.classList.remove('selected');
            if (index === selectedIndex) {
                button.classList.add('selected');
            }
        });
        if (selectedIndex === correctIndex) {
            score++;
        }
        nextQuestion();
    }

    function nextQuestion() {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            displayQuestion();
        } else {
            showResults();
        }
    }

    function showResults() {
        clearInterval(timer); 
        document.querySelector('.timer').style.display = 'none';
        resultBox.classList.remove('hidden-result');
        document.querySelector('.quiz-message p').innerHTML = `You scored ${score} out of ${questions.length}.<br><br>` +
        `Whether you nailed those questions or learned something new along the way, we hope you enjoyed this ` +
        `nostalgic trip through "Friends."`;
        document.querySelector('.question-container').style.display = 'none';
        document.getElementById('back-to-homepage').style.display = 'none'; 
    }

    function updateTimer() {
        timeLeft--;
        timerElement.textContent = timeLeft;
        if (timeLeft <= 0) {
            if (currentQuestionIndex < questions.length - 1) {
                nextQuestion();
            } else {
                showResults();
            }
        }
    }

    nextButton.onclick = nextQuestion;
    displayQuestion();
});
