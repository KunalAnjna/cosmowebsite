/* ================= SLIDER ================= */
let slides = document.querySelectorAll(".slide");
let slideIndex = 0;

if (slides.length > 0) {
  setInterval(() => {
    slides[slideIndex].classList.remove("active");
    slideIndex = (slideIndex + 1) % slides.length;
    slides[slideIndex].classList.add("active");
  }, 6000);
}


/* ================= LEARN MORE ================= */
function toggleText() {
  let moreText = document.getElementById("moreText");
  let btn = document.getElementById("learnBtn");

  if (!moreText || !btn) return;

  if (
    moreText.style.display === "none" ||
    moreText.style.display === ""
  ) {
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


/* ================= TESTIMONIAL DATA ================= */
const data = [
  {
    imgs: ["event1.jpg", "event2.jpg", "event3.jpg"],
    quote:
      "We are excited to present our latest innovation designed to redefine precision and reliability in air leak testing."
  },
  {
    imgs: ["event2.jpg", "event3.jpg", "event1.jpg"],
    quote:
      "Our Bengaluru manufacturing expansion boosts faster delivery and customized solutions."
  },
  {
    imgs: ["event3.jpg", "event1.jpg", "event2.jpg"],
    quote:
      "ISO certification renewed, reaffirming commitment to quality and precision engineering."
  }
];


/* ================= EVENTS DATA ================= */
const EVENTS = [
  {
    tag: "Summit",
    date: "April 2025",
    title: "MODEX-2026",
    desc:
      "Cosmo Instruments India and Muvro Technologies Pvt. Ltd. successfully concluded their participation at 𝐌𝐎𝐃𝐄𝐗 𝟐𝟎𝟐𝟔, presenting advanced solutions in material handling, parcel, and postal automation.\n At the event, we proudly showcased our 3D Smart Sorter, demonstrating speed, precision, and efficiency in modern logistics operations.\nIt was a great opportunity to collaborate as one global team—𝑪𝒐𝒔𝒎𝒐 𝑼𝑺𝑨, 𝑪𝒐𝒔𝒎𝒐 𝑫𝒆 𝑴𝒆𝒙𝒊𝒄𝒐, 𝑪𝒐𝒔𝒎𝒐 𝑰𝒏𝒅𝒊𝒂, 𝒂𝒏𝒅 𝑴𝒖𝒗𝒓𝒐 𝑻𝒆𝒄𝒉𝒏𝒐𝒍𝒐𝒈𝒚—while connecting with industry leaders and exploring future possibilities.\nA sincere thank you to everyone who visited us, shared insights, and engaged with our solutions. We look forward to building stronger partnerships ahead. ",
    link: "#",
    images: ["event1.jpg"]
  },
  {
    tag: "Expansion",
    date: "April-2026 2025",
    title: " leak testing laboratory setup ",
    desc:"  Connecting classrooms with real-world industry to shape future engineers.\nWe as a Cosmo Instruments India provided a state-of-the-art leak testing laboratory setup to the students of Government Polytechnic Manesar as part of our CSR initiative, enabling hands-on learning with real-world industrial technologies and equipment.\n Our motto for this initiative was to continuously collaborate with educational institutes to bridge the gap between industry and academia.\nThe program was accompanied by plantation program to promote sustainability and environmental responsibility. 💐 👏 ,",
    link: "#",
    images: ["event2.2.jpg", "event2.3.jpg", "event2.1.jpg"]
  },
  {
    tag: "Certification",
    date: "November 2024",
    title: "ISO Certification Renewed",
    desc:
      "Successfully renewed ISO certification reaffirming commitment to quality.",
    link: "#",
    images: ["event3.jpg", "event1.jpg", "event2.jpg"]
  }
];


/* ================= EVENT SLIDER ================= */
const EVENT_DURATION = 7000;
const IMAGE_DURATION = 2800;

const stage = document.getElementById("eventStage");
const navDots = document.getElementById("evNavDots");
const evProgress = document.getElementById("evProgressBar");
const evCur = document.getElementById("ev-cur");
const evTotal = document.getElementById("ev-total");

let currentEvent = 0;
let currentImage = {};
let eventTimer = null;
let imageTimers = {};

if (stage && navDots && evCur && evTotal) {
  evTotal.textContent = EVENTS.length;

  EVENTS.forEach((ev, ei) => {
    const card = document.createElement("div");
    card.className = "event-card";
    card.id = `evcard-${ei}`;

    const imgPane = document.createElement("div");
    imgPane.className = "ev-images";

    ev.images.forEach((src, ii) => {
      const img = document.createElement("img");
      img.className = "ev-img-slide" + (ii === 0 ? " current" : "");
      img.src = src;
      img.alt = ev.title;
      imgPane.appendChild(img);
    });

    const imgDots = document.createElement("div");
    imgDots.className = "img-dots";
    imgDots.id = `imgdots-${ei}`;

    ev.images.forEach((_, ii) => {
      const d = document.createElement("button");
      d.className = "img-dot" + (ii === 0 ? " active" : "");
      d.addEventListener("click", () => jumpImage(ei, ii));
      imgDots.appendChild(d);
    });

    imgPane.appendChild(imgDots);

    const imgBar = document.createElement("div");
    imgBar.className = "img-progress-bar";
    imgBar.id = `imgbar-${ei}`;
    imgPane.appendChild(imgBar);

    const info = document.createElement("div");
    info.className = "ev-info";
    info.innerHTML = `
      <span class="ev-tag">${ev.tag}</span>
      <h3>${ev.title}</h3>
      <div class="ev-date">${ev.date}</div>
      <p>${ev.desc}</p>
      <a href="${ev.link}" class="ev-readmore">Read Full Story</a>
    `;

    card.appendChild(imgPane);
    card.appendChild(info);
    stage.appendChild(card);

    const dot = document.createElement("button");
    dot.className = "ev-nav-dot" + (ei === 0 ? " active" : "");
    dot.addEventListener("click", () => goToEvent(ei));
    navDots.appendChild(dot);

    currentImage[ei] = 0;
  });

  function goToEvent(idx) {
    const old = currentEvent;
    currentEvent = (idx + EVENTS.length) % EVENTS.length;

    const oldCard = document.getElementById(`evcard-${old}`);
    const newCard = document.getElementById(`evcard-${currentEvent}`);

    if (oldCard) oldCard.classList.remove("active");
    if (newCard) newCard.classList.add("active");

    evCur.textContent = currentEvent + 1;

    document.querySelectorAll(".ev-nav-dot").forEach((dot, i) => {
      dot.classList.toggle("active", i === currentEvent);
    });

    stopImageCycle(old);
    startImageCycle(currentEvent);
    restartEventProgress();

    clearTimeout(eventTimer);
    eventTimer = setTimeout(() => {
      goToEvent(currentEvent + 1);
    }, EVENT_DURATION);
  }

  function restartEventProgress() {
    if (!evProgress) return;

    evProgress.style.transition = "none";
    evProgress.style.width = "0%";

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        evProgress.style.transition = `width ${EVENT_DURATION}ms linear`;
        evProgress.style.width = "100%";
      });
    });
  }

  function startImageCycle(ei) {
    if (EVENTS[ei].images.length <= 1) return;
    cycleImage(ei);
  }

  function cycleImage(ei) {
    clearTimeout(imageTimers[ei]);

    imageTimers[ei] = setTimeout(() => {
      const next =
        (currentImage[ei] + 1) % EVENTS[ei].images.length;

      jumpImage(ei, next);
      cycleImage(ei);
    }, IMAGE_DURATION);
  }

  function jumpImage(ei, targetIdx) {
    const card = document.getElementById(`evcard-${ei}`);
    if (!card) return;

    const slides = card.querySelectorAll(".ev-img-slide");
    const dots = card.querySelectorAll(".img-dot");

    slides[currentImage[ei]]?.classList.remove("current");
    dots[currentImage[ei]]?.classList.remove("active");

    currentImage[ei] = targetIdx;

    slides[targetIdx]?.classList.add("current");
    dots[targetIdx]?.classList.add("active");
  }

  function stopImageCycle(ei) {
    clearTimeout(imageTimers[ei]);
  }

  document.getElementById("evPrev")?.addEventListener("click", () => {
    goToEvent(currentEvent - 1);
  });

  document.getElementById("evNext")?.addEventListener("click", () => {
    goToEvent(currentEvent + 1);
  });

  goToEvent(0);
}


/* ================= TESTIMONIAL ================= */
let testimonialIndex = 0;

const track = document.getElementById("imageTrack");
const quote = document.getElementById("quote");
const dots = document.querySelectorAll(".dot");

function updateSlide(i) {
  if (!track || !quote) return;

  track.style.opacity = "0";
  quote.style.opacity = "0";

  setTimeout(() => {
    track.innerHTML = `
      <img src="${data[i].imgs[0]}">
      <img src="${data[i].imgs[1]}">
      <img src="${data[i].imgs[2]}">
    `;

    track.style.animation = "none";
    track.offsetHeight;
    track.style.animation = "verticalScroll 30s infinite";

    quote.innerText = data[i].quote;

    track.style.opacity = "1";
    quote.style.opacity = "1";
  }, 300);

  dots.forEach(dot => dot.classList.remove("active"));
  dots[i]?.classList.add("active");
}

if (dots.length > 0) {
  setInterval(() => {
    testimonialIndex++;

    if (testimonialIndex >= data.length) {
      testimonialIndex = 0;
    }

    updateSlide(testimonialIndex);
  }, 20000);

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      testimonialIndex = i;
      updateSlide(i);
    });
  });

  updateSlide(0);
}


/* ================= COUNTER ================= */
const counters = document.querySelectorAll(".counter");
const section = document.querySelector(".stats");
let counterStarted = false;

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

if (section) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !counterStarted) {
          counterStarted = true;

          counters.forEach(counter => {
            counter.innerText = "0";
            startCounter(counter);
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  observer.observe(section);
}