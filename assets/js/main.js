const body = document.querySelector("body");
const menuBtn = document.querySelector(".burger");
const header = document.querySelector(".header");
const menuCurrent = document.querySelector(".menu-main .link.is-active");
const menuLinks = document.querySelectorAll(".menu-main .link:not(.is-active)");
const chapter = document.querySelector(".chapter");
const currentChapter = document.querySelector(".chapter .current");
const currentChapterDigit = document.querySelector(".chapter .current .digit");
const currentChapterTitle = document.querySelector(".chapter .current .title");
const nextChapter = document.querySelector(".chapter .next");
const nextChapterDigit = document.querySelector(".chapter .next .digit");
const nextChapterTitle = document.querySelector(".chapter .next .title");
const sectionElements = document.querySelectorAll("section[data-chapter]");

//lenis
const lenis = new Lenis();

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

//menu label
const menuLabelTl = gsap.timeline({ paused: true });

menuLabelTl.to(".burger .text", { yPercent: -100 });

window.addEventListener("scroll", function () {
  if (window.scrollY !== 0) {
    menuLabelTl.play();
    return;
  }
  menuLabelTl.reverse();
});

//menu color
const addHeaderLight = () => {
  header.classList.add("is-light");
};
const removeHeaderLight = () => {
  header.classList.remove("is-light");
};

ScrollTrigger.create({
  trigger: ".sc-projects",
  start: "top top",
  end: "bottom top",
  onEnter: addHeaderLight,
  onEnterBack: addHeaderLight,
  onLeave: removeHeaderLight,
  onLeaveBack: removeHeaderLight,
});

ScrollTrigger.create({
  trigger: ".footer",
  start: "top top",
  end: "bottom top",
  onEnter: addHeaderLight,
  onEnterBack: addHeaderLight,
  onLeave: removeHeaderLight,
  onLeaveBack: removeHeaderLight,
});

//menu
const menuOpenTl = gsap.timeline({ paused: true });
const menuCloseTl = gsap.timeline({ paused: true });

gsap.set(".menu", { yPercent: -100 });

menuCloseTl
  .to(
    ".menu",
    {
      yPercent: -100,
      ease: "power2.in",
      duration: 0.5,
    },
    "0"
  )
  .to(
    ".main",
    {
      y: "0",
      ease: "power2.in",
      duration: 0.5,
    },
    "0"
  );

menuOpenTl
  .to(
    ".menu",
    {
      yPercent: 0,
      ease: "power2.in",
      duration: 0.5,
    },
    "0"
  )
  .to(
    ".main",
    {
      y: "100vh",
      ease: "power2.in",
      duration: 0.5,
    },
    "0"
  )
  .from(
    ".menu-main .link",
    {
      y: -30,
      stagger: -0.1,
    },
    "<0.2"
  )
  .from(
    ".menu-services .link",
    {
      y: -20,
      stagger: -0.1,
    },
    "<0.2"
  )
  .from(
    ".menu .language, .menu .contact",
    {
      opacity: 0,
    },
    "<0.2"
  )
  .from(
    ".menu .video",
    {
      opacity: 0,
    },
    "1"
  );

menuBtn.addEventListener("click", () => {
  if (!menuBtn.classList.contains("is-menu")) {
    menuLabelTl.play();
    menuOpenTl.restart();
    body.classList.add("oh");
    menuBtn.classList.add("is-menu");
    header.classList.add("is-menu");
    return;
  }

  menuCloseTl.restart();
  body.classList.remove("oh");
  menuBtn.classList.remove("is-menu");
  header.classList.remove("is-menu");

  if (window.scrollY === 0) {
    menuLabelTl.reverse();
  }
});

menuLinks.forEach((item) => {
  item.addEventListener("mouseenter", () => {
    menuCurrent.classList.remove("is-current");
  });
  item.addEventListener("mouseleave", () => {
    menuCurrent.classList.add("is-current");
  });
});

//portfolio colorChange
const colorChangeTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".sc-portfolio",
    start: "top top",
    end: "bottom top",
    scrub: true,
  },
});

colorChangeTl.to(".main", {
  backgroundColor: "#f2ede4",
  duration: 1,
});

//service colorChange
const overlayTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".sc-services",
    start: "center top",
    end: "bottom top",
    scrub: true,
  },
});

overlayTl.to(".sc-services .overlay", {
  opacity: 0.3,
  duration: 1,
});

//chapter
const chapterNames = [];

sectionElements.forEach((element) => {
  const chapterName = element.dataset.chapter;
  chapterNames.push(chapterName);
});

const setChapter = (index) => {
  const formatNumber = (number) =>
    number < 9 ? "0" + (number + 1) : (number + 1).toString();

  currentChapterDigit.innerText = formatNumber(index);
  currentChapterTitle.innerText = chapterNames[index];
  nextChapterDigit.innerText = formatNumber(index);
  nextChapterTitle.innerText = chapterNames[index];

  gsap.to(currentChapter, { xPercent: -100 });
  gsap.from(nextChapter, { xPercent: 100 });
};

const resetChapter = () => {
  currentChapterDigit.innerText = "";
  nextChapterDigit.innerText = "";
  currentChapterTitle.innerText = "";
  nextChapterTitle.innerText = "";

  gsap.set(currentChapter, { xPercent: 0 });
  gsap.set(nextChapter, { xPercent: 0 });
};

const createChapterTrigger = (element, index) => {
  ScrollTrigger.create({
    trigger: element,
    start: "top bottom",
    end: "bottom bottom",
    scrub: true,
    onEnter: () => {
      setChapter(index);
    },
    onEnterBack: () => {
      setChapter(index);
    },
    onLeave: () => {
      resetChapter();
    },
    onLeaveBack: () => {
      resetChapter();
    },
  });
};

sectionElements.forEach((element, index) => {
  createChapterTrigger(element, index);

  if (index === sectionElements.length - 1) {
    gsap.to(chapter, {
      opacity: 0,
      scrollTrigger: {
        trigger: element,
        start: "80% bottom",
        end: "bottom bottom",
        scrub: true,
      },
    });
  }
});

//delay
