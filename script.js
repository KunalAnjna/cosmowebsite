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


/* ================= TESTIMONIAL SLIDER ================= */
const data = [
  
  {
      img: "event2.jpg",
   
    quote: "We are excited to present our latest innovation designed to redefine precision and reliability in air leak testing.\nThe LS-R701X is built to deliver:\n ✔ Budget-friendly solution without compromising on quality\n✔ High accuracy and consistent performance\n✔ User-friendly operation for seamless testing\n✔ Advanced technology for modern industrial needs\n✔ Versatile applications across multiple industries\n\nAt Cosmo Instruments India, we continue to push the boundaries of quality and innovation, helping industries achieve superior leak testing standards.\n🔧 Whether it’s automotive, electronics, manufacturing, medical appliances — precision matters.\nExplore the next level of leak testing with LS-R701X."
  },
  {
      img: "event3.jpg",
   
    quote: "On this International Women’s Day, Cosmo Instruments India proudly celebrated the incredible women in our office who contribute their talent, hard work, and passion every day. The celebration was a small way to recognize their achievements and appreciate the positive impact they create in our workplace.\n Let’s continue to support, respect, and empower women—not just today, but every day.",
  },
  {
      img: "event4.jpg",
    quote: "Cosmo Instruments India, in collaboration with Inja Foundation, successfully organized a Free Eye Check-Up Camp and Spectacles Distribution Program in Pune.\nThis initiative aimed to promote better eye health by providing free eye examinations and distributing glasses to those in need, helping many individuals improve their vision and quality of life.\nWe are proud to contribute to community welfare and remain committed to supporting initiatives that create a positive and lasting impact on society.\nA heartfelt thank you to all the doctors, volunteers, and participants who made this program a meaningful success",
   
  },
  {
      img: "event1.jpg",
    quote: "Connecting classrooms with real-world industry to shape future engineers.\n                                                                           We as a Cosmo Instruments India provided a state-of-the-art leak testing laboratory setup to the students of Government Polytechnic Manesar as part of our CSR initiative, enabling hands-on learning with real-world industrial technologies and equipment.     \n                                                                        Our motto for this initiative was to continuously collaborate with educational institutes to bridge the gap between industry and academia. \n                                                                           The program was accompanied by plantation program to promote sustainability and environmental responsibility. 💐 👏",
  },
];


let testimonialIndex = 0;

const img = document.getElementById("profileImg");
const quote = document.getElementById("quote");

const dots = document.querySelectorAll(".dot");

function updateSlide(i) {
  img.style.opacity = 0;
  quote.style.opacity = 0;

  setTimeout(() => {
    img.src = data[i].img;
    quote.innerText = data[i].quote;
    
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