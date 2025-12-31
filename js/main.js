console.log("TopNotch Assets Loaded Successfully");

/* ================= SEARCH ================= */
function searchModels() {
  const inputEl = document.getElementById("searchInput");
  if (!inputEl) return;

  const input = inputEl.value.toLowerCase();
  const models = document.querySelectorAll(".model-card");

  models.forEach(card => {
    const titleEl = card.querySelector(".model-title");
    if (!titleEl) return;

    const title = titleEl.innerText.toLowerCase();
    card.style.display = title.includes(input) ? "block" : "none";
  });
}

/* ================= JQUERY SECTION ================= */
(function ($) {
  "use strict";
  if (typeof $ === "undefined") return;

  // Spinner
  setTimeout(function () {
    if ($('#spinner').length) {
      $('#spinner').removeClass('show');
    }
  }, 1);

  // WOW
  if (typeof WOW !== "undefined") {
    new WOW().init();
  }

  // Sticky Navbar
  $(window).on("scroll", function () {
    $('.navbar').toggleClass(
      'position-fixed bg-dark shadow-sm',
      $(this).scrollTop() > 0
    );
  });

  // Back to top
  $(window).on("scroll", function () {
    $('.back-to-top').toggle($(this).scrollTop() > 300);
  });

  $('.back-to-top').on("click", function () {
    $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
    return false;
  });

  // Testimonials
  if ($('.testimonial-carousel').length && $.fn.owlCarousel) {
    $('.testimonial-carousel').owlCarousel({
      autoplay: true,
      smartSpeed: 1000,
      loop: true,
      nav: false,
      dots: true,
      items: 1,
      dotsData: true,
    });
  }

})(jQuery);

/* ================= CUSTOM CURSOR (SAFE) ================= */

// ❗ Run ONLY if cursor element exists
const cursorEl = document.getElementById("cursor");
if (cursorEl && typeof TweenMax !== "undefined") {

  const amount = 12;
  const sineDots = Math.floor(amount * 0.3);
  const width = 26;
  const idleTimeout = 150;

  let lastFrame = 0;
  let mousePosition = { x: 0, y: 0 };
  let dots = [];
  let timeoutID;
  let idle = false;

  class Dot {
    constructor(index = 0) {
      this.index = index;
      this.anglespeed = 0.05;
      this.x = 0;
      this.y = 0;
      this.scale = 1 - 0.05 * index;
      this.range = width / 2 - width / 2 * this.scale + 2;

      this.element = document.createElement("span");
      TweenMax.set(this.element, { scale: this.scale });
      cursorEl.appendChild(this.element);
    }

    lock() {
      this.lockX = this.x;
      this.lockY = this.y;
      this.angleX = Math.PI * 2 * Math.random();
      this.angleY = Math.PI * 2 * Math.random();
    }

    draw() {
      TweenMax.set(this.element, { x: this.x, y: this.y });
    }
  }

  function buildDots() {
    for (let i = 0; i < amount; i++) {
      dots.push(new Dot(i));
    }
  }

  function goInactive() {
    idle = true;
    dots.forEach(dot => dot.lock());
  }

  function startIdleTimer() {
    timeoutID = setTimeout(goInactive, idleTimeout);
    idle = false;
  }

  function resetIdleTimer() {
    clearTimeout(timeoutID);
    startIdleTimer();
  }

  function onMouseMove(e) {
    mousePosition.x = e.clientX - width / 2;
    mousePosition.y = e.clientY - width / 2;
    resetIdleTimer();
  }

  function render(timestamp) {
    let x = mousePosition.x;
    let y = mousePosition.y;

    dots.forEach((dot, index) => {
      const nextDot = dots[index + 1] || dots[0];
      dot.x = x;
      dot.y = y;
      dot.draw();

      const dx = (nextDot.x - dot.x) * 0.35;
      const dy = (nextDot.y - dot.y) * 0.35;
      x += dx;
      y += dy;
    });

    lastFrame = timestamp;
    requestAnimationFrame(render);
  }

  window.addEventListener("mousemove", onMouseMove);
  buildDots();
  startIdleTimer();
  requestAnimationFrame(render);
}
