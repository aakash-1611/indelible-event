(function($) {

  "use strict";

  $(window).on('load', function() {

  /*Page Loader active
  ========================================================*/
  $('#preloader').fadeOut();

  // Sticky Nav
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 350) {
            $('.scrolling-navbar').addClass('top-nav-collapse');
            $('.icon-bar').addClass('active-sc');
        } else {
            $('.scrolling-navbar').removeClass('top-nav-collapse');
            $('.icon-bar').removeClass('active-sc');
        }
    });

    // one page navigation
    $('.navbar-nav').onePageNav({
      currentClass: 'active'
    });

    /* Auto Close Responsive Navbar on Click
    ========================================================*/
    function close_toggle() {
        if ($(window).width() <= 768) {
            $('.navbar-collapse a').on('click', function () {
                $('.navbar-collapse').collapse('hide');
            });
        }
        else {
            $('.navbar .navbar-inverse a').off('click');
        }
    }
    close_toggle();
    $(window).resize(close_toggle);

    /* WOW Scroll Spy
    ========================================================*/
     var wow = new WOW({
      //disabled for mobile
        mobile: false
    });

    wow.init();


    /* Back Top Link active
    ========================================================*/
      var offset = 200;
      var duration = 500;
      $(window).scroll(function() {
        if ($(this).scrollTop() > offset) {
          $('.back-to-top').fadeIn(400);
        } else {
          $('.back-to-top').fadeOut(400);
        }
      });

      $('.back-to-top').on('click',function(event) {
        event.preventDefault();
        $('html, body').animate({
          scrollTop: 0
        }, 600);
        return false;
      });

  });

}(jQuery));

$(document).ready(function(){
  $( '[data-fancybox="mygallery"]' ).fancybox({
    infobar : false,
    loop: true,
    buttons: [
    "share",
    "slideShow",
    "close"
  ],
  slideShow: {
  autoStart: true,
  speed: 3000
},
  });
});

$(document).ready(function(){
  $('.customer-logos').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    arrows: false,
    dots: false,
    pauseOnHover: true,
    responsive: [{
      breakpoint: 768,
      settings: {
        slidesToShow: 3
      }
    }, {
      breakpoint: 520,
      settings: {
        slidesToShow: 2
      }
    }]
  });
});

$(document).ready(function(){
  $('.customer-testimony').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: false,
    dots: true,
    pauseOnHover: true,
    responsive: [{
      breakpoint: 768,
      settings: {
        slidesToShow: 1
      }
    }, {
      breakpoint: 520,
      settings: {
        slidesToShow: 1
      }
    }]
  });
});

$(document).ready(function(){
  $('.work-log').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4500,
    arrows: false,
    dots: false,
    pauseOnHover: false,
    responsive: [{
      breakpoint: 768,
      settings: {
        slidesToShow: 1
      }
    }, {
      breakpoint: 520,
      settings: {
        slidesToShow: 1
      }
    }]
  });
});

var count = 0;
$(window).scroll(function() {
   if($(window).scrollTop() + $(window).height() > $(document).height() - 3000 && count === 0) {
     count = 1;
    $('#modalContactForm').modal('show');
   }
});

// INITIALIZE firebase
var config = {
   apiKey: "AIzaSyCiba1GcibtEq7dhyIrc7ncQVj1eQZPvBw",
   authDomain: "indelible-events.firebaseapp.com",
   databaseURL: "https://indelible-events.firebaseio.com",
   projectId: "indelible-events",
   storageBucket: "indelible-events.appspot.com",
   messagingSenderId: "682280791079"
 };
 firebase.initializeApp(config);

// REference messages collection
var messagesRef = firebase.database().ref('messages');

function validateForm() {
    var n = document.getElementById('name').value;
    var e = document.getElementById('email').value;
    var s = document.getElementById('subject').value;
    var m = document.getElementById('message').value;
    var onlyLetters =/^[a-zA-Z\s]*$/;
    var onlyNumbers =/^[0-9]*$/;
    var onlyEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


    if(n == "" || n == null){
        document.getElementById('nameLabel').innerHTML = ('Please enter your name');
        document.getElementById('name').style.borderColor = "red";
        return false;
    }


    if (!n.match(onlyLetters)) {
        document.getElementById('nameLabel').innerHTML = ('Please enter only letters');
        document.getElementById('name').style.borderColor = "red";
        return false;
    }

    if(e == "" || e == null ){
          document.getElementById('emailLabel').innerHTML = ('Please enter your email');
          document.getElementById('email').style.borderColor = "red";
          return false;
      }

    if (!e.match(onlyEmail)) {
        document.getElementById('emailLabel').innerHTML = ('Please enter a valid email address');
        document.getElementById('email').style.borderColor = "red";
        return false;
    }

    if(s == "" || s == null){
          document.getElementById('subjectLabel').innerHTML = ('Please enter your phone number');
          document.getElementById('subject').style.borderColor = "red";
          return false;
      }

    if (!s.match(onlyNumbers)) {
        document.getElementById('subjectLabel').innerHTML = ('Please enter only numbers');
        document.getElementById('subject').style.borderColor = "red";
        return false;
    }

    if (s.length != 10) {
      document.getElementById('subjectLabel').innerHTML = ('Please enter your 10 digit phone number');
      document.getElementById('subject').style.borderColor = "red";
      return false;
    }

    else{
          saveMessage(n,e,s,m);
          document.querySelector('.alert').style.display = 'block';

          // Hide alert after 3 section
          setTimeout(function() {
            document.querySelector('.alert').style.display = 'none';
          }, 3000);
          document.getElementById('contact-form').reset();
          return true;
      }
}

function saveMessage(name, email, subject, message) {
   var newMessageRef = messagesRef.push();
   newMessageRef.set({
     name: name,
     email: email,
     phone: subject,
     message: message
   });
}
