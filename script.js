
let slides = document.querySelectorAll(".slide");
let slideindex = 0;

setInterval(() => {
    slides[index].classList.remove("active");
    index = (index + 1) % slides.length;
    slides[index].classList.add("active");
}, 6000);
/*learn more*/
function toggleText() {
    let moreText = document.getElementById("moreText");
    let btn = document.getElementById("learnBtn");

    if (moreText.style.display === "none") {
        moreText.style.display = "block";
        btn.innerText = "SHOW LESS";
    } else {
        moreText.style.display = "none";
        btn.innerText = "LEARN MORE";
    }
}

/*aboutimagr*/
// IMAGE ANIMATION ON PAGE LOAD
window.addEventListener("load", () => {
    const images = document.querySelectorAll(".img");

    images.forEach((img, index) => {
        setTimeout(() => {
            img.classList.add("show");
        }, index * 300); // delay for smooth entry
    });
});


const counters = document.querySelectorAll('.counter');

counters.forEach(counter => {
  const updateCount = () => {
    const target = +counter.getAttribute('data-target');
    const current = +counter.innerText;

    const increment = target / 100;

    if (current < target) {
      counter.innerText = Math.ceil(current + increment);
      setTimeout(updateCount, 20);
    } else {
      counter.innerText = target.toLocaleString() + "+";
    }
  };

  updateCount();
});


/*------------------------------*/
const data = [
    {
        img: "sandeepkumar.jpeg",
        quote: "We develop and optimize application solutions that ensure seamless system integration, reliable performance.",
        name: "Mr Sandeep Kumar",
        role: "Sales Head                                                                                                                                                                                                                                                                                                                                                 - 10+ YRS"
    },
    {
        img: "saneetkumar.png",
        quote: "We build scalable web systems and dashboards for modern businesses.",
        name: "saneet kumar",
        role: "WEB DEVELOPER - 8 YRS"
    },
    {
        img: "https://i.pravatar.cc/200?img=45",
        quote: "AI-powered automation helps companies grow faster and smarter.",
        name: "Ankit Verma",
        role: "AI ENGINEER - 6 YRS"
    },
    {
        img: "https://i.pravatar.cc/200?img=22",
        quote: "We ensure secure and reliable infrastructure systems.",
        name: "Priya Singh",
        role: "DEVOPS ENGINEER - 7 YRS"
    }
    
];

let index = 0;

const img = document.getElementById("profileImg");
const quote = document.getElementById("quote");
const name = document.getElementById("name");
const role = document.getElementById("role");
const dots = document.querySelectorAll(".dot");

function updateSlide(i){
    img.style.opacity = 0;
    quote.style.opacity = 0;

    setTimeout(()=>{
        img.src = data[i].img;
        quote.innerText = data[i].quote;
        name.innerText = data[i].name;
        role.innerText = data[i].role;

        img.style.opacity = 1;
        quote.style.opacity = 1;
    },300);

    dots.forEach(dot => dot.classList.remove("active"));
    dots[i].classList.add("active");
}

/* AUTO SLIDE */
setInterval(()=>{
    index = (index + 1) % data.length;
    updateSlide(index);
},3000);

/* DOT CLICK */
dots.forEach((dot, i)=>{
    dot.addEventListener("click", ()=>{
        index = i;
        updateSlide(index);
    });
});