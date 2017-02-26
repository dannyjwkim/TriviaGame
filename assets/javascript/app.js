var loss = 0;
var win = 0;
var cardValue = Math.floor(Math.random() * (102)+ 19)
var cardArray = [];
var adder = 0;

$(document).ready(function(){
  function cardFunction() {
    for (var i = 0; i < 4; i++){
    var card = Math.floor(Math.random() * 12) + 1 ;
    cardArray.push(card);
  }
};

cardFunction();
$('.targetScore').html(cardValue);

$('.pic1').on("click", function(){
  var card1Value = (cardArray[0]);
  adder = adder + card1Value;
  $('.score').html(adder);
  checkIt();
});

$('.pic2').on("click", function(){
  var card2Value = (cardArray[1]);
  adder = adder + card2Value;
  $('.score').html(adder);
  checkIt();
});

$('.pic3').on("click", function(){
  var card4Value = (cardArray[2]);
  adder = adder + card4Value;
  $('.score').html(adder);
  checkIt();
});

$('.pic4').on("click", function(){
  var card4Value = (cardArray[3]);
  adder = adder + card4Value;
  $('.score').html(adder);
  checkIt();
});

function checkIt(){
  if (cardValue === adder) {
    alert("You win! Play again!");
    win = win + 1;
    $("#wins").html(win);
    reset();
  }
  else if (cardValue < adder) {
    alert("You lose! Try again!");
    loss = loss + 1;
    $("#losses").html(loss);
    reset();
  }
};

function reset(){
  cardArray.length = 0;
  cardFunction();
  cardValue = Math.floor(Math.random() * (102)+ 19)
  $('.targetScore').html(cardValue);
  adder = 0;
  $('.score').html(adder);
}

});