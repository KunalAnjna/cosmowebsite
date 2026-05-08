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

/* ================= DATA ================= */
const data = [

{
imgs:["event1.jpg","event2.jpg","event3.jpg"],

quote:`Connecting classrooms with real-world industry to shape future engineers.

We as a Cosmo Instruments India provided a state-of-the-art leak testing laboratory setup to the students of Government Polytechnic Manesar.

Our motto was to bridge the gap between industry and academia.`

},

{
imgs:["event4.jpg","event5.jpg","event6.jpg"],

quote:`International Women’s Day celebration at Cosmo Instruments India.

We proudly celebrated the incredible women in our office who contribute their talent and hard work every day.`

},

{
imgs:["event7.jpg","event8.jpg","event9.jpg"],

quote:`Free Eye Check-Up Camp organized in Pune.

This initiative promoted better eye health and distributed spectacles to people in need.`

},

{
imgs:["event10.jpg","event11.jpg","event12.jpg"],

quote:`Latest innovation LS-R701X launched.

High accuracy, budget friendly, user-friendly and suitable for multiple industries.`

}

];


/* ================= VARIABLES ================= */
let testimonialIndex = 0;

const track = document.getElementById("imageTrack");
const quote = document.getElementById("quote");
const dots = document.querySelectorAll(".dot");


/* ================= UPDATE FUNCTION ================= */
function updateSlide(i){

    track.style.opacity = 0;
    quote.style.opacity = 0;

    setTimeout(()=>{

        track.innerHTML = `
            <img src="${data[i].imgs[0]}">
            <img src="${data[i].imgs[1]}">
            <img src="${data[i].imgs[2]}">
        `;

        // restart animation
        track.style.animation = "none";
        track.offsetHeight;
        track.style.animation = "verticalScroll 30s infinite";

        quote.innerText = data[i].quote;

        track.style.opacity = 1;
        quote.style.opacity = 1;

    },300);


    dots.forEach(dot => dot.classList.remove("active"));
    dots[i].classList.add("active");
}


/* ================= AUTO SLIDE ================= */
setInterval(()=>{

    testimonialIndex++;
    
    if(testimonialIndex >= data.length){
        testimonialIndex = 0;
    }

    updateSlide(testimonialIndex);

},20000);


/* ================= DOT CLICK ================= */
dots.forEach((dot,i)=>{

    dot.addEventListener("click",()=>{

        testimonialIndex = i;
        updateSlide(i);

    });

});


/* FIRST LOAD */
updateSlide(0);


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