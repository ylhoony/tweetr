/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
// var tweetData = {
//   "user": {
//     "name": "Newton",
//     "avatars": {
//       "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
//       "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
//       "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
//     },
//     "handle": "@SirIsaac"
//   },
//   "content": {
//     "text": "If I have seen further it is by standing on the shoulders of giants"
//   },
//   "created_at": 1461116232227
// }


// Fake data taken from tweets.json

$(document).ready(function () {

  function calculateTime (date) {
    const timeInMs = Date.now();
    const timeDiff = timeInMs - date;
    if (timeDiff < 3600000) {
      return Math.round(timeDiff / 60000) + ' minutes ago';
    } else if (timeDiff < 86400000) {
      return Math.round(timeDiff / 3600000) + ' hours ago';
    } else {
      return Math.round(timeDiff / 86400000) + ' days ago';
    }
  }

  // function to create article html
  function createTweetElement(obj) {
    let $tweetArticle = $('<article>').addClass('tweet');

    // structure header
    let $tweetArtHeader = $('<header>');

    let $headerImg = $('<img>').addClass('tweet-photo').attr('src', obj.user.avatars.small);
    $tweetArtHeader.append($headerImg);
    let $headerName = $('<span>').addClass('tweet-name').text(obj.user.name);
    $tweetArtHeader.append($headerName);
    let $headerHandle = $('<span>').addClass('tweet-handle').text(obj.user.handle);
    $tweetArtHeader.append($headerHandle);

    // append to article
    $tweetArticle.append($tweetArtHeader);

    // structure main
    let $tweetArtMain = $('<main>');
    $tweetArtMain.text(obj.content.text);

    //append main to article
    $tweetArticle.append($tweetArtMain);

    // structure footer
    let $tweetArtFooter = $('<footer>');

    let $footerDate = $('<span>');
    $footerDate.addClass('tweet-date').text(calculateTime(obj.created_at));
    $tweetArtFooter.append($footerDate);


    //append footer to article
    $tweetArticle.append($tweetArtFooter);

    return $tweetArticle;

  }

  // var $tweet = createTweetElement(tweetData); //should be html

  // Test / driver code (temporary)
  // console.log($tweet); // to see what it looks like
  // $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.

  // render tweet function
  function renderTweets(tweets) {
    // loops through tweets
      // calls createTweetElement for each tweet
      // takes return value and appends it to the tweets container

    for (let i = 0; i < tweets.length; i++) {
      let $eachArt = createTweetElement(tweets[i]);
      $('.tweets-container').prepend($eachArt);
      console.log($eachArt);
    }

    // tweets.forEach(createTweetElement(data).prepend('.tweets-container'));
  }


  $('#composer').on('submit', function(event) {
    event.preventDefault();
    const charLength = $(this).find('textarea').val().length;

    console.log(charLength);

    // var validation = validateMessage( message )
    // if valid
      // $.ajax
    // else
      // display error message

    function validation (num) {
      if (num === 0 || num > 140) {
        return false;
      } else {
        return true;
      }
    }

    if (validation(charLength)) {
          $.ajax({
            url: '/tweets',
            method: 'post',
            data: $(this).serialize()
          }).then(function () {
            $('.tweets-container').empty();
            loadtweets();
          })
    } else {
      alert('Look at the numbers!');
      // $('.new-tweet').append("<p color=red>Look at the numbers!</p>");
      return false;
    }
  });


  function loadtweets () {
    $.ajax({
      method: 'get',
      dataType: 'JSON',
      url: '/tweets'
    }).then(function(tweets) {
      renderTweets(tweets);
    });
  }
  loadtweets();

});
