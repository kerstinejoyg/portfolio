
// PROJECT SLIDER
    const swiper = new Swiper(".project-slider", {
      loop: true,
      centeredSlides: true,
      slidesPerView: "auto",
      spaceBetween: 30,
      grabCursor: true,
      effect: "coverflow",
      coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 180,
        modifier: 1.5,
        slideShadows: false,
        scale: 0.85,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        0: {
          spaceBetween: 16,
          coverflowEffect: {
            depth: 80,
            scale: 0.9
          },
        },
        768: {
          spaceBetween: 30,
          coverflowEffect: {
            depth: 180,
            scale: 0.85
          },
        },
      },
    });



// HEADER MENU TOGGLE
    const navToggle = document.getElementById("navToggle");
    const nav = document.querySelector(".header__info");
    const body = document.body;

    const mobileBreakpoint = window.matchMedia("(max-width: 992px)");

    navToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("active");

      navToggle.classList.toggle("active", isOpen);
      body.classList.toggle("menu-open", isOpen);

      navToggle.setAttribute("aria-expanded", isOpen);
    });


    // CLOSE MOBILE MENU AFTER NAVIGATION CLICK
    const mobileNavLinks = document.querySelectorAll(".header__nav a");

    mobileNavLinks.forEach((link) => {

      link.addEventListener("click", function () {

        if (mobileBreakpoint.matches) {

          nav.classList.remove("active");
          navToggle.classList.remove("active");
          body.classList.remove("menu-open");
          navToggle.setAttribute("aria-expanded", "false");

        }

      });

    });



// ADD CLASS WHEN SCROLLED
    window.addEventListener("scroll", function () {

      const header = document.querySelector("header");

      if (window.scrollY > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }

    });



// ACTIVE NAVIGATION ON SCROLL
    const sections = document.querySelectorAll(
      "#home, #about, #projects, #services, #experiences, #skills, #contact"
    );

    const navLinks = document.querySelectorAll(".header__nav a");
    const header = document.querySelector("header");

    function updateActiveSection() {

      const headerHeight = header ? header.offsetHeight : 0;
      const scrollPosition = window.scrollY;

      const pageBottom =
        window.innerHeight + scrollPosition >=
        document.documentElement.scrollHeight - 10;

      let currentSection = sections[0];

      // CONTACT ACTIVE AT PAGE BOTTOM
      if (pageBottom) {

        currentSection = sections[sections.length - 1];

      } else {

        sections.forEach((section) => {

          const sectionTop = section.getBoundingClientRect().top;

          if (sectionTop <= headerHeight + 5) {
            currentSection = section;
          }

        });

      }

      navLinks.forEach((link) => {
        link.classList.remove("active");
      });

      const activeLink = document.querySelector(
        `.header__nav a[href="#${currentSection.id}"]`
      );

      if (activeLink) {
        activeLink.classList.add("active");
      }

      // UPDATE URL HASH
      // if (window.location.hash !== `#${currentSection.id}`) {
      //   history.replaceState(null, null, `#${currentSection.id}`);
      // }

    }

    window.addEventListener("scroll", updateActiveSection);
    window.addEventListener("load", updateActiveSection);
    window.addEventListener("resize", updateActiveSection);


// BIO SHOW-HIDE
    const readMoreBtn = document.getElementById("readMoreBtn");
    const bioContent = document.querySelector(".about__bio-hidden");
    const buttonText = readMoreBtn.querySelector("span");
    const arrow = readMoreBtn.querySelector(".read-more-icon");

    readMoreBtn.addEventListener("click", function () {

      bioContent.classList.toggle("is-open");

      const isOpen = bioContent.classList.contains("is-open");

      buttonText.textContent = isOpen ? "Read Less" : "Read More";
      arrow.classList.toggle("is-up", isOpen);

    });



// BACK TO TOP BUTTON
    const backToTop = document.getElementById("backToTop");

    window.addEventListener("scroll", function () {

      if (window.scrollY > 400) {
        backToTop.classList.add("show");
      } else {
        backToTop.classList.remove("show");
      }

    });

    backToTop.addEventListener("click", function () {

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    });



// FOOTER TAB
    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabContents = document.querySelectorAll(".tab-content");

    tabButtons.forEach(button => {

      button.addEventListener("click", () => {

        // Remove active state from all buttons
        tabButtons.forEach(btn => {
          btn.classList.remove("active");
        });

        // Hide all tab contents
        tabContents.forEach(content => {
          content.classList.remove("active");
        });

        // Activate clicked button
        button.classList.add("active");

        // Show corresponding content
        const tabId = button.dataset.tab;
        document.getElementById(tabId).classList.add("active");

      });

    });


    
// EXPERIENCE
    const startYear = 2017;
    const currentYear = new Date().getFullYear();
    const experience = currentYear - startYear;

    // COPYRIGHT
    document.getElementById("year-range").textContent =
      currentYear > startYear ? `${currentYear}` : "";

    // NUMBER OF YEARS - EXPERIENCE
    document.querySelectorAll(".num-experience").forEach(function (element) {
      element.textContent = experience + "+";
    });



// WHY WORK ACCORDION

    const whyWorkItems = document.querySelectorAll('.why-me__item');

    whyWorkItems.forEach(item => {
      const button = item.querySelector('.why-me__btn');

      if (!button) return;

      button.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        whyWorkItems.forEach(otherItem => {
          otherItem.classList.remove('active');

          const otherButton = otherItem.querySelector('.why-me__btn');

          if (otherButton) {
            otherButton.setAttribute('aria-expanded', 'false');
          }
        });

        if (!isActive) {
          item.classList.add('active');
          button.setAttribute('aria-expanded', 'true');
        }
      });
    });