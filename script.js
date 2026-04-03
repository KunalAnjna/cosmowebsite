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

const toggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

toggle.addEventListener("click", () => {
    menu.classList.toggle("active");
});

/* ================= IMAGE LOAD ANIMATION ================= */
window.addEventListener("load", () => {
  const images = document.querySelectorAll(".img");

  images.forEach((img, index) => {
    setTimeout(() => {
      img.classList.add("show");
    }, index * 300);
  });
});


/* ================= TESTIMONIAL SLIDER ================= */
const data = [
  {
    img: "sandeepkumar.jpeg",
    quote: "We develop and optimize application solutions that ensure seamless system integration, reliable performance.",
    name: "Mr Sandeep Kumar",
    role: "Sales Head - 10+ YRS"
  },
  {
    img: "saneetkumar.png",
    quote: "We build scalable web systems and dashboards for modern businesses.",
    name: "Saneet Kumar",
    role: "Web Developer - 8 YRS"
  },
  {
    img: "https://i.pravatar.cc/200?img=45",
    quote: "AI-powered automation helps companies grow faster and smarter.",
    name: "Ankit Verma",
    role: "AI Engineer - 6 YRS"
  },
  {
    img: "https://i.pravatar.cc/200?img=22",
    quote: "We ensure secure and reliable infrastructure systems.",
    name: "Priya Singh",
    role: "DevOps Engineer - 7 YRS"
  }
];

let testimonialIndex = 0;

const img = document.getElementById("profileImg");
const quote = document.getElementById("quote");
const name = document.getElementById("name");
const role = document.getElementById("role");
const dots = document.querySelectorAll(".dot");

function updateSlide(i) {
  img.style.opacity = 0;
  quote.style.opacity = 0;

  setTimeout(() => {
    img.src = data[i].img;
    quote.innerText = data[i].quote;
    name.innerText = data[i].name;
    role.innerText = data[i].role;

    img.style.opacity = 1;
    quote.style.opacity = 1;
  }, 300);

  dots.forEach(dot => dot.classList.remove("active"));
  dots[i].classList.add("active");
}

/* AUTO SLIDE */
setInterval(() => {
  testimonialIndex = (testimonialIndex + 1) % data.length;
  updateSlide(testimonialIndex);
}, 3000);

/* DOT CLICK */
dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    testimonialIndex = i;
    updateSlide(testimonialIndex);
  });
});


/* ================= COUNTER (FINAL FIXED) ================= */
const counters = document.querySelectorAll(".counter");
const section = document.querySelector(".stats");

function startCounter(counter) {
  const target = +counter.getAttribute("data-target");
  let count = 0;

  const duration = 1200;
  const step = Math.ceil(target / (duration / 16));

  const interval = setInterval(() => {
    count += step;

    if (count >= target) {
      count = target;
      clearInterval(interval);
    }

    counter.innerText = count.toLocaleString() + "+";
  }, 16);
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