let controller;
let slideScene;
let pageScene;
let detailScene;


function animateSlides() {
  //Init Controller
  controller = new ScrollMagic.Controller();
  //Select some things
  const sliders = document.querySelectorAll(".slide");
  const nav = document.querySelector(".nav-header");

  //Loop over each slide
  sliders.forEach((slide, index, slides) => {
    const revealImg = slide.querySelector(".reveal-img");
    const img = slide.querySelector("img");
    const revealText = slide.querySelector(".reveal-text");
    const scrollPrompt = slide.querySelector(".arrow-desc");
    const title = slide.querySelector(".title");
    const heroDescP = slide.querySelector(".hero-desc p");
    const exp = slide.querySelector("svg");

    //GSAP
    const slideTl = gsap.timeline({
      defaults: { duration: 1, ease: "Power3.easeOut" }
    });
    slideTl.fromTo(img, 1.6, { width: "100%", translateY: "101%" }, { width: "100%", translateY: "0%" });
    slideTl.fromTo(title, 0.6, { opacity: 0, translateY: "100%" }, { opacity: 1, translateY: "0%" }, 0.2);
    slideTl.fromTo(heroDescP, 0.8, { opacity: 0, translateY: "100%" }, { opacity: 1, translateY: "0%" }, 0.4);
    slideTl.fromTo(exp, 1, { opacity: 0, translateY: "100%" }, { opacity: 1, translateY: "0%" }, 0.6);
    // slideTl.fromTo(revealText, { height: "100%", x: "0%", width: "100%" }, { height: "100%", x: "-100%", width: "0%" }, "-1.5");
    // slideTl.fromTo(scrollPrompt, { opacity: 0, scale: 1 }, { opacity: 1, scale: 1 }, "+=2");
    // slideTl.to(scrollPrompt, {
    //   scale: 1.1,
    //   repeat: -1,
    //   yoyo: true,
    //   ease: "power"
    // });

    //Create Scene
    slideScene = new ScrollMagic.Scene({
      triggerElement: slide,
      triggerHook: 0.7,
      reverse: false
    })
      .setTween(slideTl)
      // .addIndicators({
      //   colorStart: "white",
      //   colorTrigger: "white",
      //   name: "slide"
      // })
      .addTo(controller);
    //New ANimation
    const pageTl = gsap.timeline();
    let nextSlide = slides.length - 1 === index ? "end" : slides[index + 1];
    // pageTl.fromTo(nextSlide, { y: "0%" }, { y: "50%" });
    // pageTl.fromTo(slide, { opacity: 1, scale: 1 }, { opacity: 0, scale: 0.5 });
    // pageTl.fromTo(nextSlide, { y: "50%" }, { y: "0%" }, "-=0.5");

    // Create new scene
    pageScene = new ScrollMagic.Scene({
      triggerElement: slide,
      duration: "70%",
      triggerHook: 0
    })
      // .addIndicators({
      // colorStart: "black",
      // colorTrigger: "white",
      // name: "page",
      // indent: 200
      // })
      // .setPin(slide, { pushFollowers: false })
      .setTween(pageTl)
      .addTo(controller);
  });
}
const mouse = document.querySelector(".cursor");
const mouseTxt = mouse.querySelector("span");
const burger = document.querySelector(".burger");
function cursor(e) {
  mouse.style.top = e.pageY + "px";
  mouse.style.left = e.pageX + "px";
}
function activeCursor(e) {
  const item = e.target;
  if (window.innerWidth > 1024) {
    if (item.id === "logo" || item.classList.contains("burger") ||
      item.classList.contains("footer-text") || item.classList.contains("cya-email")) {
      mouse.classList.add("nav-active");
    } else {
      mouse.classList.remove("nav-active");
    }
    if (item.classList.contains("explore") || item.classList.contains("arrow-button")) {
      mouse.classList.add("explore-active");
      gsap.to(".title-swipe", 1, { y: "0%" });
      mouseTxt.innerText = "Tap";
    } else {
      mouse.classList.remove("explore-active");
      mouseTxt.innerText = "";
      gsap.to(".title-swipe", 1, { y: "100%" });
    }
  }
}
function navToggle(e) {
  if (!e.target.classList.contains("active")) {
    e.target.classList.add("active");
    gsap.to(".line", 0.5, { stroke: "white" });
    if (window.innerWidth < 1024) {
      gsap.to(".line1", 0.5, { rotate: "45", y: 10, stroke: "white" });
      gsap.to(".line2", 0.5, { rotate: "-45", x: -4, y: -4, stroke: "white" });
    }
    else {
      gsap.to(".line1", 0.5, { rotate: "45", y: 12, stroke: "white" });
      gsap.to(".line2", 0.5, { rotate: "-45", x: 1, y: -7, stroke: "white" });
    }
    gsap.to("#logo", 1, { color: "white" });
    gsap.to(".nav-bar", 1, { clipPath: "circle(2500px at 100% -10%)" });
    document.body.classList.add("hide");
  } else {
    e.target.classList.remove("active");
    gsap.to(".line", 0.5, { stroke: "rgb(5,5,5)" });
    gsap.to(".line1", 0.5, { rotate: "0", y: 0, stroke: "rgb(5,5,5)" });
    gsap.to(".line2", 0.5, { rotate: "0", x: 0, y: 0, stroke: "rgb(5,5,5)" });
    gsap.to("#logo", 1, { color: "rgb(5,5,5)" });
    gsap.to(".nav-bar", 1, { clipPath: "circle(50px at 100% -10%)" });
    document.body.classList.remove("hide");
  }
}

//Barba Page Transitions
const logo = document.querySelector("#logo");
barba.init({
  views: [
    {
      namespace: "home",
      beforeEnter() {
        animateSlides();
        logo.href = "./index.html";
      },
      beforeLeave() {
        slideScene.destroy();
        pageScene.destroy();
        controller.destroy();
      }
    },
    {
      namespace: "fashion",
      beforeEnter() {
        logo.href = "../index.html";
        detailAnimation();
      },
      beforeLeave() {
        controller.destroy();
        detailScene.destroy();
      }
    }
  ],
  transitions: [
    {
      leave({ current, next }) {
        let done = this.async();
        //An Animation
        const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
        tl.fromTo(current.container, 1, { opacity: 1 }, { opacity: 0 });
        tl.fromTo(
          ".swipe",
          0.75,
          { x: "-100%" },
          { x: "0%", onComplete: done },
          "-=0.5"
        );
      },
      enter({ current, next }) {
        let done = this.async();
        //Scroll to the top
        window.scrollTo(0, 0);
        //An Animation
        const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
        tl.fromTo(
          ".swipe",
          1,
          { x: "0%" },

          { x: "100%", stagger: 0.2, onComplete: done }
        );
        tl.fromTo(next.container, 1, { opacity: 0 }, { opacity: 1 });
        tl.fromTo(
          ".nav-header",
          1,
          { y: "-100%" },
          { y: "0%", ease: "power2.inOut" },
          "-=1.5"
        );
      }
    }
  ]
});

function detailAnimation() {
  controller = new ScrollMagic.Controller();
  const slides = document.querySelectorAll(".detail-slide");
  slides.forEach((slide, index, slides) => {
    const slideTl = gsap.timeline({ defaults: { duration: 1 } });
    let nextSlide = slides.length - 1 === index ? "end" : slides[index + 1];
    const nextImg = nextSlide.querySelector("img");
    slideTl.fromTo(slide, { opacity: 1, scale: 1 }, { opacity: 0, scale: 0.8 });
    slideTl.fromTo(nextSlide, { opacity: 0 }, { opacity: 1 }, "-=1.5");
    slideTl.fromTo(nextImg, { scale: 0.7, x: "50%" }, { scale: 1, x: "0%" });
    //Scene
    detailScene = new ScrollMagic.Scene({
      triggerElement: slide,
      duration: "100%",
      triggerHook: 0.15
    })
      .setPin(slide, { pushFollowers: false })
      .setTween(slideTl)
      // .addIndicators({
      //   colorStart: "white",
      //   colorTrigger: "white",
      //   name: "detailScene"
      // })
      .addTo(controller);
  });
}


//EventListeners
burger.addEventListener("click", navToggle);
window.addEventListener("mousemove", cursor);
window.addEventListener("mouseover", activeCursor);

