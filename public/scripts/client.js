// loops through tweets
// calls createTweetElement for each tweet
// takes return value and appends it to the tweets container

const renderTweets = function(tweets) {
  tweets.forEach(tweet => {
    console.log(tweet.content.text);
    //displays tweets in reverse-chronological order
    $('.tweets-container').prepend(createTweetElement(tweet));
  });
};

//taking values for dynamic tweeting
const createTweetElement = (data) => {
  let $tweet = `
  <article class="tweet-container">
  <header class="tweet-header">
    <section class="forAvatarsNameAndHandle">
      <div class="forAvatarsAndName"> 
        <img src="${data.user.avatars}"> 
        <h6>${data.user.name}</h6>
      </div>      
      <h6 class="forHandle">${data.user.handle}</h6>
      </div>
    </section>
  <article class="article">${escape(data.content.text)}</article>
</header>
<footer>10 days ago
  <div class="options">
  <span><i class="fa fa-flag" aria-hidden="true"></i></span>
  <span><i class="fa fa-retweet" aria-hidden="true"></i></span>
  <span<i class="fa fa-heart" aria-hidden="true"></i></span>
  </div>
  </footer>
</article>
`;
  return $tweet;
};

const loadTweets = function() {
  $('#tweet-text').val(''); //emptying the text area
  //ajax get request
  $.ajax({ url: '/tweets', method: 'GET' })
    .then(function(tweets) {
      renderTweets(tweets);
    });
};

//to handle xss attack
const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  console.log(div.innerHTML);
  return div.innerHTML;
};
 
$(document).ready(function() {
  //slides up the text area after an error message
  //refresh the tweets
  $('#tweet-text').keypress(() => {
    if ($('#tweet-text').val().length > 0) {
      $('.empty-tweet').slideUp();
    } else if ($('#tweet-text').val().length < 140) {
      $('.too-long').slideUp();
    }
  });
  loadTweets();

  $('.tweetform').on('submit', function(evt)  {
    evt.preventDefault();
    // .text needs to target an element and have within it the text itself
    let data = $(this).serialize();
    //to get value without text=
    let tweetValue = $('#tweet-text').val();
    //to check if user has not entered any text or exceeds the text limit
    if (tweetValue === '') {
      $('.empty-tweet').slideDown();
    } else if (tweetValue.length > 140) {
      $('.too-long').slideDown();
    } else {
      $.ajax({
        url: "/tweets",
        method: 'POST',
        data: data
      }).then(function(response) {
        console.log(response);
        //remove tweets from the tweet container
        //$(".tweet-container").empty();
        $("output.counter").text(140);
        //to slide up the tweet if condition of null and too long is invalid
        $('.too-long').slideUp();
        $('.empty-tweet').slideUp();
        // load tweets here using ajax
        loadTweets();
      }).catch((e) => console.log(e));
    }
  });
});



