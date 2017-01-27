/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

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
  }


  $('#composer').on('submit', function(event) {
    event.preventDefault();
    const charLength = $(this).find('textarea').val().length;

    function validation (num) {
      if (num === 0 || num > 140) {
        return false;
      } else {
        return true;
      }
    }

    if (validation(charLength)) {       // var validation = validateMessage( message )
      $.ajax({                          // if valid
        url: '/tweets',                 // $.ajax
        method: 'post',
        data: $(this).serialize()
      }).then(function () {
        $('.tweets-container').empty();
        loadtweets();
      });
      $(this).find('textarea').val('');
      $(this).closest('.new-tweet').find('.counter').text('140');
    } else {                            // else
      $('.new-tweet').find('p').css('display', 'contents').slideDown().delay(3000).slideUp(); // display error message
      return false;
    }
  });


  function loadtweets () {
    $.ajax({
      method: 'get',
      dataType: 'json',
      url: '/tweets'
    }).then(function(tweets) {
      renderTweets(tweets);
    });
  }
  loadtweets();

});
