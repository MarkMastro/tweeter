/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement=(tweetData)=>{

let tweet=(  
` <article> 
<header class="tweet-header">
  <div>
  <img class="tweet-avatar" src=${tweetData.user.avatars}> 
  <p>${tweetData.user.name}</p>
  </div>
  <p>${tweetData.user.handle}</p>
  
</header>
<p class="tweet-text"> ${escape(tweetData.content.text)}</p>
<footer>
  <p>Tweeted ${timeago.format(tweetData.created_at)}</p>
  
  <div class="tweet-buttons tweet-icons">
    <i class="fa fa-flag single-tweet-icon"></i>
    <i class="fa fa-retweet single-tweet-icon"></i>
    <i class="fa fa-heart single-tweet-icon"></i>            
  </div>
</footer>
</article>`)

return tweet
}

const renderTweets=(tweets)=>{
  $('#tweets-container').empty();
  tweets.forEach(element => {
    $newTweet=createTweetElement(element);
    $('#tweets-container').prepend($newTweet); 

  });
}
const loadTweets=()=>{
  
  $.ajax('/tweets', { method: 'GET' })
  .then(function (tweets) {
      renderTweets(tweets)
    });
}
//Checks if any errors in the tweet, if there is shows the relevant error information. If not error, posts to ajax

const errorFunction=(text)=>{
   if(text===""|| text===null){
      $("#error-msg").text("You have tried to submit an empty tweet")

      $("#error-div").slideDown( "slow")

    }else if(text.length>140){
      $("#error-msg").text("tweet must be shorter than 140 characters")

      $("#error-div").slideDown( "slow")

      }else{
    $.ajax({
      url: '/tweets',
      type: 'POST',
      data: $("#tweet-form").serialize(),      
      error: function(error){
          console.log(error);
      },
      success: function(){
        loadTweets();
        
      }
  })
  
  }
}

$(document).ready(function(){
  loadTweets()//load tweets for user when page loads
  $("#tweet-form").on('submit', function( event ) {//when tweet form is submitted, prevents default page load and checks for errors before tweeting 
    event.preventDefault();
    const text=$("#tweet-text").val();
    errorFunction(text)
    $("#tweet-form")[0].reset();


});

})
