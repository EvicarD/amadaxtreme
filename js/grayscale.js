(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      if (target.length) {
        $("html, body").animate(
          {
            scrollTop: target.offset().top - 70
          },
          1000,
          "easeInOutExpo"
        );
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $(".js-scroll-trigger").click(function() {
    $(".navbar-collapse").collapse("hide");
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $("body").scrollspy({
    target: "#mainNav",
    offset: 100
  });

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);
})(jQuery); // End of use strict

$(document).ready(function(e) {
  $(".arrow").toggleClass("bounceAlpha");
});

var d = new Date();
var n = d.getFullYear();
document.getElementById("year").innerHTML = n;
// Lazy loading image
!(function(window) {
  var $q = function(q, res) {
      if (document.querySelectorAll) {
        res = document.querySelectorAll(q);
      } else {
        var d = document,
          a = d.styleSheets[0] || d.createStyleSheet();
        a.addRule(q, "f:b");
        for (var l = d.all, b = 0, c = [], f = l.length; b < f; b++)
          l[b].currentStyle.f && c.push(l[b]);

        a.removeRule(0);
        res = c;
      }
      return res;
    },
    addEventListener = function(evt, fn) {
      window.addEventListener
        ? this.addEventListener(evt, fn, false)
        : window.attachEvent
        ? this.attachEvent("on" + evt, fn)
        : (this["on" + evt] = fn);
    },
    _has = function(obj, key) {
      return Object.prototype.hasOwnProperty.call(obj, key);
    };
  function loadImage(el, fn) {
    var img = new Image(),
      src = el.getAttribute("data-src");
    img.onload = function() {
      if (!!el.parent) el.parent.replaceChild(img, el);
      else el.src = src;

      fn ? fn() : null;
    };
    img.src = src;
  }

  function elementInViewport(el) {
    var rect = el.getBoundingClientRect();

    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.top <= (window.innerHeight || document.documentElement.clientHeight)
    );
  }

  var images = new Array(),
    query = $q("img.lazy"),
    processScroll = function() {
      for (var i = 0; i < images.length; i++) {
        if (elementInViewport(images[i])) {
          loadImage(images[i], function() {
            images.splice(i, i);
          });
        }
      }
    };
  // Array.prototype.slice.call is not callable under our lovely IE8
  for (var i = 0; i < query.length; i++) {
    images.push(query[i]);
  }

  processScroll();
  addEventListener("scroll", processScroll);
})(this);

// Include html inside html
