$( document ).ready(function() {

  $("#audio").prop("volume", 0.2);

  var correct = 0;
  var wrong = 0;
  var unanswered = 0;
  var timer;
  var count;
  var isCorrect;
  var askedQuestion = [];

  var questionAnswers = [ 
    {
      question: 'The "Best Animated Feature Film" category debuted in 2001 and was won by:',
      choices: [ "Shrek", "Spirited Away", "Toy Story 2", "Monsters, Inc." ],
      answer: "Shrek" + "<br>" + "Hayao Miyazaki's Spirited Away won the following year in 2002" + "<br>" + "Toy Story 2 was released in 1999" + "<br>" + "Pixar's Monsters, Inc. was also nominated, but Dreamworks nabbed the upset inaugural win",
      answerValue: "Shrek", 
      image: "assets/images/shrek.gif"
    },
    {
      question: "The Moonlight/La La Land controversy puts to rest a false rumor that this actress'" + ' "win" was due to a presenter reading the wrong name:',
      choices: [ "Marisa Tomei", "Whoopi Goldberg", "Gwyneth Paltrow", "Renee Zellweger" ],
      answer: "Marisa Tomei" + "<br>" + "Though mostly said in jest, it's been rumored that Jack Palance misspoke in one of the biggest upsets in Oscar history" + "<br>" + "Whoopi Goldberg, Gwyneth Paltrow, and Renee Zellweger are also considered surprise winners",
      answerValue: "MarisaTomei",
      image: "assets/images/tomei.gif"
    },
    {
      question: "Star Wars: The Force Awakens is the highest domestic grossing film of all time period. However, what movie is the highest domestic grossing film of all time - adjusted for inflation?",
      choices: [ "Gone With The Wind", "Star Wars: A New Hope", "The Sound of Music", "Titanic" ],
      answer: "Gone With The Wind" + "<br>" + "Star Wars: The Force Awakens grossed $936.6 million in 2015, but only places 11th all-time" + "<br>" + "Titanic, The Sound of Music, and Star Wars: A New Hope are 5th, 3rd, and 2nd respectively" + "<br>" + "Gone With The Wind grossed nearly $200 million back in 1939, which would be about $1.75 billion today!",
      answerValue: "GoneWithTheWind",
      image: "assets/images/wind.gif"
    },
    {
      question: "Which actor has the most Oscar nominations with 12?",
      choices: [ "Al Pacino", "Jack Nicholson", "Marlon Brando", "Robert DeNiro" ],
      answer: "Jack Nicholson",
      answerValue: "JackNicholson",
      image: "assets/images/jack.gif"
    },
    {
      question: "Which actress has the most Oscar wins with 4?",
      choices: [ "Jane Fonda", "Judi Dench", "Meryl Streep", "Katharine Hepburn" ],
      answer: "Katharine Hepburn",
      answerValue: "KatharineHepburn",
      image: "assets/images/hepburn.gif"
    },
    {
      question: "All of these films tied the record for most Oscar nominations (14), except for:",
      choices: [ "La La Land", "All About Eve", "Titanic", "Forrest Gump" ],
      answer: "Forrest Gump",
      answerValue: "ForrestGump",
      image: "assets/images/gump.gif"
    },
    {
      question: "All of these films tied the record for most Oscar wins (11), except for:",
      choices: [ "West Side Story", "Titanic", "Ben-Hur", "The Lord of the Rings: The Return of the King" ],
      answer: "West Side Story",
      answerValue: "WestSideStory",
      image: "assets/images/west.gif"
    }, 
    {
      question: "Who is the only person to win an Oscar for playing a real-life Oscar winner?",
      choices: [ "Paul Newman", "Meryl Streep", "Cate Blanchett", "Elizabeth Taylor" ],
      answer: "Cate Blanchett",
      answerValue: "CateBlanchett",
      image: "assets/images/cate.gif"
    },
    {
      question: "Which Foreign Language Film holds the record for most Oscar nominations with 10?",
      choices: [ "Life is Beautiful", "Pan's Labyrinth", "Amour", "Crouching Tiger, Hidden Dragon" ],
      answer: "Crouching Tiger, Hidden Dragon",
      answerValue: "CrouchingTiger,HiddenDragon",
      image: "assets/images/crouching.gif"
    },
    {
      question: "Who is the only African-American woman to win an Oscar for Best Actress in a Leading Role?",
      choices: [ "Octavia Spencer", "Viola Davis", "Jennifer Hudson", "Halle Berry" ],
      answer: "Halle Berry",
      answerValue: "HalleBerry",
      image: "assets/images/halle.gif"
    },
  ];

  $("#start-button").on("click", function() {
    loadQuestion();
  });

  $(document).on("click", "#start-over", function() {
    startOver();
  });

  function loadQuestion() {
    var current = questionAnswers[0];
    timer = setInterval(countDown, 1000);
    count = 20;
    $("#game-section").html("<div id='timer'><h2>Time remaining: " + count + "</h2></div>");
    $("#game-section").append("<div id='question-section'></div>");
    $("#question-section").append("<h3 id='question'>" + current.question + "</h3></div>");
    $("#question-section").append("<ul id='choices'></ul>");
    for (i = 0; i < current.choices.length; i++) {
      $("#choices").append("<li value=" + current.choices[i].replace(/\s/g,'') + ">" + current.choices[i] + "</li>");
    }

    $("li").on("click", function() {
      clearInterval(timer);
      checkAnswer(this, current);
      loadAnswer(current);
      loadNext();
    });

    function countDown() {
      count--;
      $("#timer").html("<h2>Time remaining: " + count + "</h2>");
      if (count === 0) {
        isCorrect = false;
        clearInterval(timer);
        loadAnswer(current);
        loadNext();
      }
    }
  }

  function checkAnswer(choice, current) {
    if ($(choice).attr("value") === current.answerValue) {
      isCorrect = true;
    }
    else {
      isCorrect = false;
    }
  }

  var result = {
    correct: function(current) {
      $("#question-section").append("<div class='result'><h3>Way to go!</h3></div>");
      $(".result").append("<p>The correct answer is: " + current.answer + "</p>");
      $("#question-section").append("<div><img src='" + current.image + "'></div>");
    },
    wrong: function(current) {
      $("#question-section").append("<div class='result'><h3>Nice try!</h3><div>");
      $(".result").append("<p>But the correct answer is: " + current.answer + "</p>");
      $("#question-section").append("<div><img src='" + current.image + "'></div>");
    },
    timesUp: function(current) {
      $("#question-section").append("<div class='result'><h3>Time's up!</h3></div>");
      $(".result").append("<p>The correct answer is: " + current.answer + "</p>");
      $("#question-section").append("<div><img src='" + current.image + "'></div>");
    }
  }

  function loadAnswer(current) {
    $("#question-section").empty();
    if (isCorrect === true) {
      correct++;
      result.correct(current);
    }
    if ((count === 0) && (isCorrect === false)) {
      unanswered++;
      result.timesUp(current);
    }
    if ((count > 0) && (isCorrect === false)) {
      wrong++;
      result.wrong(current);
    }
  }

  function loadNext() {
    askedQuestion.push(questionAnswers.shift());
    if (questionAnswers.length === 0) {
      setTimeout(loadResults, 10000);
    }
    else {
      setTimeout(loadQuestion, 10000);
    }
  }

  function loadResults() {
    $("#question-section").empty();
    $("#question-section").append("<p id='results' class='result-msg'>YOUR RESULTS</p>");
    $("#results").append("<p class='result-msg'>Correct: " + correct + "</p>");
    $("#results").append("<p class='result-msg'>Wrong: " + wrong + "</p>");
    $("#results").append("<p class='result-msg'>Unanswered: " + unanswered + "</p>");
    $("#game-section").append("<button id='start-over' type='button' class='btn btn-secondary btn-lg'>Start Over</button>");
  }

  function startOver() {
    correct = 0;
    wrong = 0;
    unanswered = 0;
    questionAnswers = askedQuestion;
    askedQuestion = [];

    loadQuestion();
  }

});