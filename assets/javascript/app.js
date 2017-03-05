$( document ).ready(function() {

var timeRemaining = 0;
var questionObject;
var timer;
var rightAnswers = [];
var wrongAnswers = [];
var unanswered = [];
var remainingQuestions = [ 
    {
      question: 'The "Best Animated Feature Film" category debuted in 2001 and was won by:',
      answer: [ "Shrek", "Spirited Away", "Toy Story 2", "Monsters, Inc." ],
      correct: "Shrek",
      image: "assets/images/shrek.gif"
    },
    {
      question: "The Moonlight/La La Land controversy puts to rest a false rumor that this actress'" + ' "win" was due to a presenter reading the wrong name:',
      answer: [ "Marisa Tomei", "Whoopi Goldberg", "Gwyneth Paltrow", "Renee Zellweger" ],
      correct: "Marisa Tomei",
      image: "assets/images/tomei.gif"
    },
    {
      question: "Star Wars: The Force Awakens is the highest domestic grossing film of all time. What movie is the highest domestic grossing film of all time, but adjusted for inflation?",
      answer: [ "Gone With The Wind", "Star Wars: A New Hope", "The Sound of Music", "Titanic" ],
      correct: "Gone With The Wind",
      image: "assets/images/wind.gif"
    },
    {
      question: "Which actor has the most Oscar nominations with 12?",
      answer: [ "Al Pacino", "Jack Nicholson", "Marlon Brando", "Robert DeNiro" ],
      correct: "Jack Nicholson",
      image: "assets/images/jack.gif"
    },
    {
      question: "Which actress has the most Oscar wins with 4?",
      answer: [ "Jane Fonda", "Judi Dench", "Meryl Streep", "Katharine Hepburn" ],
      correct: "Katharine Hepburn",
      image: "assets/images/hepburn.gif"
    },
    {
      question: "All of these films tied the record for most Oscar nominations (14), except for:",
      answer: [ "La La Land", "All About Eve", "Titanic", "Forrest Gump" ],
      correct: "Forrest Gump",
      image: "assets/images/gump.gif"
    },
    {
      question: "All of these films tied the record for most Oscar wins (11), except for:",
      answer: [ "West Side Story", "Titanic", "Ben-Hur", "The Lord of the Rings: The Return of the King" ],
      correct: "West Side Story",
      image: "assets/images/west.gif"
    }, 
    {
      question: "Who is the only person to win an Oscar for playing a real-life Oscar winner?",
      answer: [ "Paul Newman", "Meryl Streep", "Cate Blanchett", "Elizabeth Taylor" ],
      correct: "Cate Blanchett",
      image: "assets/images/cate.gif"
    },
    {
      question: "Which Foreign Language Film holds the record for most Oscar nominations with 10?",
      answer: [ "Life is Beautiful", "Pan's Labyrinth", "Amour", "Crouching Tiger, Hidden Dragon" ],
      correct: "Crouching Tiger, Hidden Dragon",
      image: "assets/images/crouching.gif"
    },
    {
      question: "Who is the only African-American woman to win an Oscar for Best Actress in a Leading Role?",
      answer: [ "Octavia Spencer", "Viola Davis", "Jennifer Hudson", "Halle Berry" ],
      correct: "Halle Berry",
      image: "assets/images/halle.gif"
    },
  ];


  $("button").on("click",function() {
    $("#start").css("display", "none");
    $("#asked-question").css("display", "block");
    $("#choices").css("display", "block");
    $("#timer").css("display", "block");
  });

  function incrementTimer() {
    timer = setTimeout( function () {
      $( '#time-remaining' ).text( timeRemaining );
      if ( timeRemaining <= 0 ) {
        unanswered.push( questionObject );
        console.log( 'Time is UP' );
        // $("#question-container").html("<img src ='" + unanswered.image + "'>");
        askQuestion();
      } else {
        timeRemaining = timeRemaining - 1;
        incrementTimer();
      }
    }, 1000 );
  }

  function startTimer() {
    clearTimeout( timer );
    timeRemaining = 10;
    incrementTimer();
  }

  function askQuestion() {
    if ( remainingQuestions.length <= 0 ) {
      clearTimeout(timer);
      $("#question-container").html("Correct: " + rightAnswers.length + "<br>" + " Wrong: " + wrongAnswers.length + "<br>" + "Unanswered: " + unanswered.length);
    } 
    else {
      startTimer();
      $( '#choices' ).html( "" );
      questionObject = remainingQuestions.pop();

      var choices = questionObject.answer;
      $( '#asked-question' ).html( questionObject.question );
      for ( var i = 0; i < choices.length; i++ ) {
        var choice = $( '<div>' );
        choice.text( choices[ i ] );
        choice.attr( 'id', "choice-" + i );
        choice.attr( 'index', i );
        $( '#choices' ).append( choice );

        choice.click( function () {
          if ( this.innerHTML === questionObject.correct ) {
            console.log( "Correct!" );
            rightAnswers.push( questionObject );
            // $("#question-container").html("<img src ='" + "rightAnswers[0].image" + "'>");
            
            askQuestion();
          } 
          else {
            console.log( "Nope!" );
            wrongAnswers.push( questionObject );
            // $("#question-container").html("<img src ='" + "wrongAnswers[0].image" + "'>");

            askQuestion();
          }
        } );
      }
    }
  }

askQuestion();

});