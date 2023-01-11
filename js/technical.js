const preloadImages = (selector = "img") => {
  return new Promise((resolve) => {
    imagesLoaded(
      document.querySelectorAll(selector),
      { background: true },
      resolve
    );
  });
};

// Preload images
const preloadFonts = (id) => {
  return new Promise((resolve) => {
    WebFont.load({
      typekit: {
        id: id,
      },
      active: resolve,
    });
  });
};

const backtopEl = document.querySelector(".backtop");
const headerEl = document.querySelector("#header");

// Preload  images and fonts
Promise.all([preloadImages(".tiles__line-img"), preloadFonts("rmd7deq")]).then(
  () => {
    // Remove loader (loading class)
    document.body.classList.remove("loading");

    // Initialize the Locomotive scroll
    const scroll = new LocomotiveScroll({
      el: document.querySelector("[data-scroll-container]"),
      smooth: true,
    });

    backtopEl.addEventListener("click", () => scroll.scrollTo(headerEl));
  }
);
