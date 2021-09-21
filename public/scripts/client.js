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
<p class="tweet-text"> ${tweetData.content.text}</p>
<footer>
  <p>Tweeted ${timeago.format(tweetData.created_at)}</p>
  
  <div class="tweet-buttons">
    <i class="fa fa-flag"></i>
    <i class="fa fa-retweet"></i>
    <i class="fa fa-heart"></i>            
  </div>
</footer>
</article>`)

return tweet
}

const renderTweets=(tweets)=>{
  tweets.forEach(element => {
    $newTweet=createTweetElement(element);
    $('#tweets-container').append($newTweet); 

  });
}
const loadTweets=()=>{
  console.log("loading....")
  $.ajax('/tweets', { method: 'GET' })
  .then(function (tweets) {
      renderTweets(tweets)
    });
}
const getRecentTweet=()=>{
  console.log('recent')
  $.ajax('/tweets', { method: 'GET' })
  .then(function (tweets) {
    newestTweet=tweets[0]
    for(let tweet in tweets){
      if(tweets[tweet].created_at>newestTweet.created_at){
        newestTweet=tweets[tweet]
      }
    }
    $newTweet=createTweetElement(newestTweet);
    $('#tweets-container').prepend($newTweet);
    });

}

$(document).ready(function(){
loadTweets()
  $("#tweet-form").on('submit', function( event ) {
    event.preventDefault();
    let formText=event.target[0].value
  const text=$("#tweet-text").val();
    if(text===""|| text===null){
      alert("You must enter a tweet to submit")
    }else if(text.length>140){
      alert('tweet must be longer than 140 characters')
    }else{
      console.log($("#tweet-form").serialize())
    $.ajax({
      url: '/tweets',
      type: 'POST',
      data: $("#tweet-form").serialize(),

      success:getRecentTweet(),
      
      error: function(error){
          console.log(error);
      }
  });
  
  }

});

})
