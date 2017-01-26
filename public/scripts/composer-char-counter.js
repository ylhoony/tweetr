console.log('loaded');

$(document).ready( () => {
  console.log('document ready');

  // $('.new-tweet').find('textarea').on('change', () => {
  //   console.log(this.val());
  // });


  // $('.new-tweet').find('textarea').on('change', () => {
  //   console.log('change!');
  //   console.log($(this).val());
  // });
  $('.new-tweet').on('input', 'textarea', function () {
    // console.log('keydown!');
    // const initLength = $(this).siblings('.counter').text();
    const charLength = $(this).val().length;

    const diff = 140 - charLength;

    if (diff >= 0) {
      $(this).closest('.new-tweet').find('.counter').text(diff).css('color', 'black');
    } else {
      $(this).closest('.new-tweet').find('.counter').text(diff).css('color', 'red');
    }

  });
  // $('.new-tweet').find('textarea').on('keyup', () => {
  //   console.log('keyup!');
  //       console.log($(this).val());
  // });
  // $('.new-tweet').find('textarea').on('keypress', function () {
    // let input = $(this).val();
    // console.log('keypress!');
    // console.log($(this).val().length);
    // console.log(input);
  // });
  // $('.new-tweet').find('textarea').on('blur', () => {
  //   console.log('blur!');
  //       console.log($(this).val());
  // });
});