// collection-products v7:
(function () {
  function initCollectionProductsSection(section) {
    if (section.dataset.initialized === "true") return;
    section.dataset.initialized = "true";
    
    const SECTION_ID = section.dataset.sectionId;
    console.log("SECTION_ID: ", SECTION_ID);

    const SELECTORS = {
      collectionProducts: "js-products-list",
      swiperContainer: `js-swiper-${SECTION_ID}`,
    };    

    function initSwiper() {
        const swiperElement = document.querySelector(`.${SELECTORS.swiperContainer}`);
        if (!swiperElement) return;

        const swiperSettings = {
          loop: false,
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },
          spaceBetween: 16,

          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },

          breakpoints: {
            320: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            992: { slidesPerView: 2 },
            1200: { slidesPerView: 3 },
          },
        };

        if (swiperElement && typeof Swiper !== "undefined") {
          const swiper = new Swiper(swiperElement, swiperSettings);
        }
      
    }

    initSwiper();
  }

  document.addEventListener("DOMContentLoaded", (event) => {
    const sections = document.querySelectorAll(".js-product-list[data-section-id]");
    sections.forEach((section) => {
      initCollectionProductsSection(section);
    });
  });

})();