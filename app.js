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
    const img = slide.querySelector("img");
    const title = slide.querySelector(".title");
    const heroDescP = slide.querySelector(".hero-desc p");
    const exp = slide.querySelector("svg");
    //GSAP
    const slideTl = gsap.timeline({
      defaults: {
        duration: 1,
        ease: "Power3.easeOut"
      }
    });
    slideTl.fromTo(img, 1.2, {
      width: "100%",
      translateY: "101%"
    }, {
      width: "100%",
      translateY: "0%"
    });
    slideTl.fromTo(title, 0.45, {
      opacity: 0,
      translateY: "100%"
    }, {
      opacity: 1,
      translateY: "0%"
    }, 0.15);
    slideTl.fromTo(heroDescP, 0.6, {
      opacity: 0,
      translateY: "100%"
    }, {
      opacity: 1,
      translateY: "0%"
    }, 0.3);
    slideTl.fromTo(exp, 0.75, {
      opacity: 0,
      translateY: "100%"
    }, {
      opacity: 1,
      translateY: "0%"
    }, 0.45);


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
    if (item.classList.contains("explore") || item.classList.contains("arrow-button") || item.classList.contains("skill")) {
      mouse.classList.add("explore-active");
      gsap.to(".title-swipe", 1, {
        y: "0%"
      });
      mouseTxt.innerText = "Tap";
    } else {
      mouse.classList.remove("explore-active");
      mouseTxt.innerText = "";
      gsap.to(".title-swipe", 1, {
        y: "100%"
      });
    }
  }
}

function navToggle(e) {
  if (!e.target.classList.contains("active")) {
    e.target.classList.add("active");
    gsap.to(".line", 0.25, {
      stroke: "white"
    });
    if (window.innerWidth < 1024) {
      gsap.to(".line1", 0.25, {
        rotate: "45",
        y: 10,
        stroke: "white"
      });
      gsap.to(".line2", 0.25, {
        rotate: "-45",
        x: -4,
        y: -4,
        stroke: "white"
      });
    } else {
      gsap.to(".line1", 0.25, {
        rotate: "45",
        y: 12,
        stroke: "white"
      });
      gsap.to(".line2", 0.25, {
        rotate: "-45",
        x: 1,
        y: -7,
        stroke: "white"
      });
    }
    gsap.to("#logo", 0.5, {
      color: "white"
    });
    gsap.to(".nav-bar", 0.5, {
      clipPath: "circle(3000px at 100% -10%)"
    });
    document.body.classList.add("hide");
  } else {
    e.target.classList.remove("active");
    gsap.to(".line", 0.25, {
      stroke: "rgb(5,5,5)"
    });
    gsap.to(".line1", 0.25, {
      rotate: "0",
      y: 0,
      stroke: "rgb(5,5,5)"
    });
    gsap.to(".line2", 0.25, {
      rotate: "0",
      x: 0,
      y: 0,
      stroke: "rgb(5,5,5)"
    });
    gsap.to("#logo", 0.5, {
      color: "rgb(5,5,5)"
    });
    gsap.to(".nav-bar", 0.5, {
      clipPath: "circle(50px at 100% -10%)"
    });
    document.body.classList.remove("hide");
  }
}

//Barba Page Transitions
const logo = document.querySelector("#logo");
barba.init({
  views: [{
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
  transitions: [{
    leave({
      current,
      next
    }) {
      let done = this.async();
      //An Animation
      const tl = gsap.timeline({
        defaults: {
          ease: "ease"
        }
      });
      tl.fromTo(current.container, 0.25, {
        opacity: 1
      }, {
        opacity: 0
      });
      tl.fromTo(
        ".swipe",
        0.4, {
          x: "-100%"
        }, {
          x: "0%",
          onComplete: done
        },
        "-=0.15"
      );
    },
    enter({
      current,
      next
    }) {
      let done = this.async();
      //Scroll to the top
      window.scrollTo(0, 0);
      //An Animation
      const tl = gsap.timeline({
        defaults: {
          ease: "power"
        }
      });
      tl.fromTo(
        ".swipe",
        0.5, {
          x: "0%"
        }, {
          x: "100%",
          stagger: 0.18,
          onComplete: done
        }
      );
      tl.fromTo(next.container, 0.4, {
        opacity: 0
      }, {
        opacity: 1
      });
      tl.fromTo(
        ".nav-header",
        0.3, {
          y: "-100%"
        }, {
          y: "0%",
          ease: "power"
        }
      );
    }
  }]
});

function detailAnimation() {
  controller = new ScrollMagic.Controller();
  const slides = document.querySelectorAll(".detail-slide");
  if (window.innerWidth > 1024) {
    slides.forEach((slide, index, slides) => {
      const slideTl = gsap.timeline({
        defaults: {
          duration: 1
        }
      });
      let nextSlide = slides.length - 1 === index ? "end" : slides[index + 1];
      const nextImg = nextSlide.querySelector("img");
      slideTl.fromTo(slide, {
        opacity: 1,
        scale: 1
      }, {
        opacity: 0,
        scale: 0.8
      });
      slideTl.fromTo(nextSlide, {
        opacity: 0
      }, {
        opacity: 1
      }, "-=2");
      slideTl.fromTo(nextImg, {
        scale: 0.98,
        x: "10%"
      }, {
        scale: 1,
        x: "0%"
      });
      //Scene
      detailScene = new ScrollMagic.Scene({
          triggerElement: slide,
          duration: "100%",
          triggerHook: 0.4
        })
        // .setPin(slide, { pushFollowers: false })
        .setTween(slideTl)
        // .addIndicators({
        //   colorStart: "white",
        //   colorTrigger: "white",
        //   name: "detailScene"
        // })
        .addTo(controller);
    });
  }
}

//EventListeners
burger.addEventListener("click", navToggle);
window.addEventListener("mousemove", cursor);
window.addEventListener("mouseover", activeCursor);