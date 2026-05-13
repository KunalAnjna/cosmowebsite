/* ================= SLIDER ================= */
let slides = document.querySelectorAll(".slide");
let slideIndex = 0;

setInterval(() => {
  slides[slideIndex].classList.remove("active");
  slideIndex = (slideIndex + 1) % slides.length;
  slides[slideIndex].classList.add("active");
}, 6000);


/* ================= LEARN MORE ================= */
function toggleText() {
  let moreText = document.getElementById("moreText");
  let btn = document.getElementById("learnBtn");

  if (moreText.style.display === "none" || moreText.style.display === "") {
    moreText.style.display = "block";
    btn.innerText = "SHOW LESS";
  } else {
    moreText.style.display = "none";
    btn.innerText = "LEARN MORE";
  }
}

/* ================= IMAGE LOAD ANIMATION ================= */
window.addEventListener("load", () => {
  const images = document.querySelectorAll(".img");

  images.forEach((img, index) => {
    setTimeout(() => {
      img.classList.add("show");
    }, index * 300);
  });
});



/* ================= COUNTER (FINAL FIXED) ================= */
const counters = document.querySelectorAll(".counter");
const section = document.querySelector(".stats");
function startCounter(counter) {
  const target = +counter.getAttribute("data-target");
  const duration = +counter.getAttribute("data-duration") || 1200;
  let start = null;

  function animate(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    const current = Math.min(Math.floor((progress / duration) * target), target);
    counter.innerText = current.toLocaleString() + "+";

    if (progress < duration) {
      requestAnimationFrame(animate);
    } else {
      counter.innerText = target.toLocaleString() + "+";
    }
  }

  requestAnimationFrame(animate);
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {

    if (entry.isIntersecting) {
      counters.forEach(counter => {
        counter.innerText = "0";
        startCounter(counter);
      });
    } else {
      counters.forEach(counter => {
        counter.innerText = "0";
      });
    }

  });
}, {
  threshold: 0.4
});

observer.observe(section);














/*dropdown*/


const dropdowns = document.querySelectorAll(".dropdown");

dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector(".dropdown-toggle");

    toggle.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation(); // mobile fix

        // Close others
        dropdowns.forEach(d => {
            if (d !== dropdown) {
                d.classList.remove("active");
            }
        });

        // Toggle current
        dropdown.classList.toggle("active");
    });
});

// Outside click (mobile + desktop)
document.addEventListener("click", () => {
    dropdowns.forEach(dropdown => {
        dropdown.classList.remove("active");
    });
});