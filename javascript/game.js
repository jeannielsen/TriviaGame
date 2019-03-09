
// Hide all cards except for the start card

$( document ).ready(function() {
    $("#card1, #card2, #card3, #card4, #card5, #card6, #incorrectCard, #correctCard, #timeoutCard,#finalCard").hide();
});

// 
var $startBtn = document.getElementById("startBtn");

// Start game function
function startGame() {
   
  incorrectBank = [];
  correctBank = [];
  timeoutBank = [];
  isGameRunning = true;

$("#card1").show();



//(function() {
  //$('#card1').fadeOut('fast');
//}, 1000);


//(function() {
  //$('#card1').fadeOut('fast');
//}, 1000);

//if (condition) {
 // $element.show();
//} else {
  //$element.hide();
//}



//    $("#card1, #card2, #card3, #card4, #card5, #card6").hide();
//});

//$("#card1, #card2, #card3, #card4, #card5, #card6, #startCard").delay(2000).fadeOut('fast');

