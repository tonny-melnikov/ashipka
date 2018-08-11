/* eslint-disable no-undef */
$( document ).ready(function() {
  $(window).on('resize', onresize);
  onresize();
});

function onresize() {
  $('main').removeAttr("style");
  var winhei = $(window).height();
  var navhei = $('nav').height();
  var mainhei = $('main').height();
  while (winhei > navhei + $('main').height()) {
    mainhei += 1;
    $('main').css('height', mainhei + 'px');
  }
}
