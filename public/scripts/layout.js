$(document).ready(function () {

  $('.tweets-container').on('mouseenter', '.tweet', function() {

    // display icons when hover on .tweet
    $(this).find('header').css('opacity','1'); //remove opacity
    // // show icons
    $(this).find('footer').append('<span class="fa fa-heart" aria-hidden="true"></span>');
    $(this).find('footer').append('<span class="fa fa-retweet" aria-hidden="true"></span>');
    $(this).find('footer').append('<span class="fa fa-flag" aria-hidden="true"></span>');
  });

    // display icons when hover on .tweet
  $('.tweets-container').on('mouseleave', '.tweet', function() {
    console.log("hello");
      // event.preventDefault();

      $(this).find('.fa').remove();
      $(this).find('header').css('opacity','0.3'); //back to normal opacity

  });

  $('#compose-btn').mouseenter( function() {
    $(this).css('background-color','#fff');
  });

  $('#compose-btn').mouseleave( function() {
    $(this).css('background-color','#eee');
  });


  $('#compose-btn').click(function() {
    $('.new-tweet').slideToggle('slow');
    $('.new-tweet').find('textarea').focus();
  });


// $('.tweet').on('mouseleave', function() {
//   $(this).find('.fa').show();
//   console.log(mouseleave);
// });

// $('.tweet').on('mouseenter', function() {
//   $(this).find('.fa').show();
//     console.log(mouseenter);
// });

});