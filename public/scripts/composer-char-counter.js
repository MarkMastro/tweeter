
$(document).ready(function() {
  // --- our code goes here ---
  console.log('ready')
  $("#tweet-text").on('keyup', (e)=> {
    // your code here
    lettersLeft=140-e.target.value.length
    if(lettersLeft<0){
      $(".counter").removeClass("black-text")    
      $(".counter").addClass('red-text')
     
    }else if(lettersLeft>0){
        $(".counter").addClass("black-text")    
        $("#error-div").slideUp( "slow")

      }
    $(".counter").text(lettersLeft);
  });
});

