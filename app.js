(function () {
    var questions = [{
        question: "Who was the creator of Mario?",
        choices: ['Satoru Iwata', 'Shiguru Miyamoto', 'Yves Guillemot', 'Reggie Fils-Aime'],
        correctAnswer: 1
    }, {
        question: "Who was Mario's first love interest?",
        choices: ['Pauline', 'Peach', 'Cherry', 'Anna'],
        correctAnswer: 0
    }, {
        question: "Mario was first introduced AS Mario in what year?",
        choices: [1985, 1983, 1989, 1982],
        correctAnswer: 3
    }, {
        question: "Mario has a brother, what is his name?",
        choices: ['Clarance', 'Luigi', 'Yoshi', 'Giovanni'],
        correctAnswer: 1
    }, {
        question: "Mario is owned by what company?",
        choices: ['Microsoft', 'Sony', 'Nintendo', 'Mojang'],
        correctAnswer: 2
    }, {
        question: "What is the name of Mario's sidekick?",
        choices: ['Yoshi', 'Professor E. Gadd', 'Toad', 'Luigi'],
        correctAnswer: 0
    }, {
        question: "What is the name of Mario's main love interest?",
        choices: ['Anna', 'Peach', 'Cherry', 'Pauline'],
        correctAnswer: 1
    }, {
        question: "What multi-player fighting game is Mario a part of?",
        choices: ['Cartoon Network: Punchtime Explosion', 'Playstation All Stars', 'Super Smash Bros.', 'Punch Out'],
        correctAnswer: 2
    }, {
        question: "What is Mario's profession?",
        choices: ['Construction Worker', 'Singer', 'Car Salesman', 'Plumber'],
        correctAnswer: 3
    }, {
        question: "What is the name of Mario's Nemesis?",
        choices: ['Bowser', 'King Dedede', 'Sephiroth', 'Ganondorf'],
        correctAnswer: 0
    }, ];

    var questionCounter = 0;
    var selections = [];
    var quiz = $('#quiz');
    displayNext();
    $('#next').on('click', function (e) {
        e.preventDefault();
        if (quiz.is(':animated')) {
            return false;
        }
        choose();
        if (isNaN(selections[questionCounter])) {
            alert('Please make a selection!');
        } else {
            questionCounter++;
            displayNext();
        }
    });
    $('#prev').on('click', function (e) {
        e.preventDefault();

        if (quiz.is(':animated')) {
            return false;
        }
        choose();
        questionCounter--;
        displayNext();
    });
    $('#start').on('click', function (e) {
        e.preventDefault();

        if (quiz.is(':animated')) {
            return false;
        }
        questionCounter = 0;
        selections = [];
        displayNext();
        $('#start').hide();
    });
    $('.button').on('mouseenter', function () {
        $(this).addClass('active');
    });
    $('.button').on('mouseleave', function () {
        $(this).removeClass('active');
    });

    function createQuestionElement(index) {
        var qElement = $('<div>', {
            id: 'question'
        });

        var header = $('<h2>Question ' + (index + 1) + ':</h2>');
        qElement.append(header);

        var question = $('<p>').append(questions[index].question);
        qElement.append(question);

        var radioButtons = createRadios(index);
        qElement.append(radioButtons);

        return qElement;
    }

    function createRadios(index) {
        var radioList = $('<ul>');
        var item;
        var input = '';
        for (var i = 0; i < questions[index].choices.length; i++) {
            item = $('<li>');
            input = '<input type="radio" name="answer" value=' + i + ' />';
            input += questions[index].choices[i];
            item.append(input);
            radioList.append(item);
        }
        return radioList;
    }

    function choose() {
        selections[questionCounter] = +$('input[name="answer"]:checked').val();
    }

    function displayNext() {
        quiz.fadeOut(function () {
            $('#question').remove();

            if (questionCounter < questions.length) {
                var nextQuestion = createQuestionElement(questionCounter);
                quiz.append(nextQuestion).fadeIn();
                if (!(isNaN(selections[questionCounter]))) {
                    $('input[value=' + selections[questionCounter] + ']').prop('checked', true);
                }
                if (questionCounter === 1) {
                    $('#prev').show();
                } else if (questionCounter === 0) {

                    $('#prev').hide();
                    $('#next').show();
                }
            } else {
                var scoreElem = displayScore();
                quiz.append(scoreElem).fadeIn();
                $('#next').hide();
                $('#prev').hide();
                $('#start').show();
            }
        });
    }

    function displayScore() {
        var score = $('<p>', {
            id: 'question'
        });

        var numCorrect = 0;
        for (var i = 0; i < selections.length; i++) {
            if (selections[i] === questions[i].correctAnswer) {
                numCorrect++;
            }
        }

        score.append('You got ' + numCorrect + ' questions out of ' +
            questions.length + ' right!!!');
        return score;
    }
})();
