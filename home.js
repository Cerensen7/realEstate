// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all main functionalities
  initSwiper();
  initLocations();
  initContactForm();
  initSmoothScroll();
});

// Initialize Swiper Sliders
function initSwiper() {
  // Featured Properties Slider Configuration
  const featuredSwiper = new Swiper(".featured-swiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    grabCursor: true,
    width: null,
    centeredSlides: true,
    observer: true,
    observeParents: true,
    watchOverflow: true,

    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
      enabled: false,
    },

    // Pagination
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },

    // Responsive breakpoints
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
        width: null,
        centeredSlides: false,
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 30,
        navigation: {
          enabled: true,
        },
        centeredSlides: false,
      },
    },

    // Enhanced Autoplay
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },

    // Effect
    effect: "slide",
    speed: 800,

    // Added features
    preloadImages: false,
    lazy: {
      loadPrevNext: true,
      loadOnTransitionStart: true,
    },
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
  });

  // Luxury Collection Slider Configuration
  const luxurySwiper = new Swiper(".luxury-collection-swiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    grabCursor: true,
    width: null,
    centeredSlides: true,
    observer: true,
    observeParents: true,
    watchOverflow: true,

    // Navigation arrows
    navigation: {
      nextEl: ".luxury-collection .swiper-button-next",
      prevEl: ".luxury-collection .swiper-button-prev",
      enabled: false,
    },

    // Pagination
    pagination: {
      el: ".luxury-collection .swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },

    // Responsive breakpoints
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
        width: null,
        centeredSlides: false,
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 30,
        navigation: {
          enabled: true,
        },
        centeredSlides: false,
      },
    },

    // Enhanced Autoplay
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },

    // Effect
    effect: "slide",
    speed: 800,

    // Added features
    preloadImages: false,
    lazy: {
      loadPrevNext: true,
      loadOnTransitionStart: true,
    },
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
  });

  // Swiper event listeners
  [featuredSwiper, luxurySwiper].forEach((swiper) => {
    // Resume autoplay after touch end
    swiper.on("touchEnd", function () {
      if (swiper.autoplay.running) {
        swiper.autoplay.start();
      }
    });
  });

  // Pause luxury swiper autoplay on hover
  const luxurySwiperContainer = document.querySelector(
    ".luxury-collection-swiper"
  );
  if (luxurySwiperContainer) {
    luxurySwiperContainer.addEventListener("mouseenter", () => {
      luxurySwiper.autoplay.stop();
    });
    luxurySwiperContainer.addEventListener("mouseleave", () => {
      luxurySwiper.autoplay.start();
    });
  }
}

// Initialize Locations Section
function initLocations() {
  // Elements
  const officeMarker = document.querySelector(".office-marker");
  const locationLabel = document.querySelector(".location-label");
  const mapContainer = document.querySelector(".locations__map-container");
  const contactBtn = document.querySelector(".location-info__btn");
  const directionsBtn = document.querySelector(".location-info__btn--outline");

  // Interactive marker effects
  if (officeMarker) {
    officeMarker.addEventListener("mouseenter", () => {
      locationLabel.style.opacity = "1";
      locationLabel.style.transform = "translateY(0)";
    });

    officeMarker.addEventListener("mouseleave", () => {
      locationLabel.style.opacity = "0";
      locationLabel.style.transform = "translateY(10px)";
    });

    officeMarker.addEventListener("click", () => {
      const locationInfo = document.querySelector(".location-info");
      locationInfo.classList.add("active");

      // Smooth scroll on mobile
      if (window.innerWidth < 1024) {
        locationInfo.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    });
  }

  // Contact button functionality
  if (contactBtn) {
    contactBtn.addEventListener("click", () => {
      scrollToSection("contact");
    });
  }

  // Directions button functionality
  if (directionsBtn) {
    directionsBtn.addEventListener("click", () => {
      window.open(
        `https://www.google.com/maps/dir/?api=1&destination=E+52nd+St+%26+Madison+Ave+New+York+NY+10022`,
        "_blank"
      );
    });
  }

  // Map pan functionality
  if (mapContainer) {
    let isPanning = false;
    let startX, startY, scrollLeft, scrollTop;

    const handleMouseDown = (e) => {
      isPanning = true;
      mapContainer.style.cursor = "grabbing";
      startX = e.pageX - mapContainer.offsetLeft;
      startY = e.pageY - mapContainer.offsetTop;
      scrollLeft = mapContainer.scrollLeft;
      scrollTop = mapContainer.scrollTop;
    };

    const handleMouseUp = () => {
      isPanning = false;
      mapContainer.style.cursor = "default";
    };

    const handleMouseMove = (e) => {
      if (!isPanning) return;
      e.preventDefault();
      const x = e.pageX - mapContainer.offsetLeft;
      const y = e.pageY - mapContainer.offsetTop;
      const moveX = x - startX;
      const moveY = y - startY;
      mapContainer.scrollLeft = scrollLeft - moveX;
      mapContainer.scrollTop = scrollTop - moveY;
    };

    mapContainer.addEventListener("mousedown", handleMouseDown);
    mapContainer.addEventListener("mouseleave", handleMouseUp);
    mapContainer.addEventListener("mouseup", handleMouseUp);
    mapContainer.addEventListener("mousemove", handleMouseMove);

    // Responsive behavior
    window.addEventListener("resize", () => {
      mapContainer.style.overflow =
        window.innerWidth < 1024 ? "auto" : "hidden";
    });
  }

  // Map text hover effects
  const enhanceMapText = (elements) => {
    elements.forEach((text) => {
      text.addEventListener("mouseenter", () => {
        text.style.opacity = "1";
        text.style.fontWeight = "bold";
      });
      text.addEventListener("mouseleave", () => {
        text.style.opacity = "0.6";
        text.style.fontWeight = "normal";
      });
    });
  };

  enhanceMapText(document.querySelectorAll(".street-names text"));
  enhanceMapText(document.querySelectorAll(".landmarks text"));
}

// Initialize Contact Form
function initContactForm() {
  const contactForm = document.getElementById("contactForm");
  const submitButton = contactForm?.querySelector(".contact__submit");
  const inputs = contactForm?.querySelectorAll("input, textarea, select");

  if (!contactForm) return;

  // Form submission handler
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!validateForm(inputs)) return;

    submitButton.classList.add("loading");

    try {
      await simulateFormSubmission();
      showFormMessage(
        "success",
        "Thank you! Your message has been sent successfully."
      );
      contactForm.reset();
    } catch (error) {
      showFormMessage(
        "error",
        "Oops! Something went wrong. Please try again later."
      );
    } finally {
      submitButton.classList.remove("loading");
    }
  });

  // Input handlers
  if (inputs) {
    inputs.forEach((input) => {
      input.addEventListener("blur", () => {
        input.classList.toggle("filled", input.value.length > 0);
      });

      input.addEventListener("input", () => {
        validateInput(input);
      });
    });
  }

  // Phone number formatting
  const phoneInput = document.getElementById("phone");
  if (phoneInput) {
    phoneInput.addEventListener("input", (e) => {
      let x = e.target.value
        .replace(/\D/g, "")
        .match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
      e.target.value = !x[2]
        ? x[1]
        : `(${x[1]}) ${x[2]}${x[3] ? "-" + x[3] : ""}`;
    });
  }
}

// Form Validation Functions
function validateForm(inputs) {
  if (!inputs) return false;
  return Array.from(inputs).every((input) => validateInput(input));
}

function validateInput(input) {
  const inputWrapper = input.closest(".input-wrapper");
  let isValid = true;
  let errorMessage = "";

  // Clear existing errors
  const existingError = inputWrapper?.querySelector(".error-message");
  if (existingError) existingError.remove();

  // Validation rules
  if (input.required && !input.value) {
    isValid = false;
    errorMessage = "This field is required";
  } else if (input.type === "email" && !validateEmail(input.value)) {
    isValid = false;
    errorMessage = "Please enter a valid email address";
  } else if (input.type === "tel" && !validatePhone(input.value)) {
    isValid = false;
    errorMessage = "Please enter a valid phone number";
  }

  // Update input status
  inputWrapper?.classList.toggle("error", !isValid);
  inputWrapper?.classList.toggle("success", isValid);

  // Show error if any
  if (!isValid && errorMessage) {
    const errorDiv = document.createElement("div");
    errorDiv.className = "error-message";
    errorDiv.textContent = errorMessage;
    inputWrapper?.appendChild(errorDiv);
  }

  return isValid;
}

// Initialize Smooth Scroll
function initSmoothScroll() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      if (targetId === "#") return;
      scrollToSection(targetId.substring(1));
    });
  });
}

// Utility Functions
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());
}

function validatePhone(phone) {
  return /^[\d\s-+()]+$/.test(String(phone));
}

function simulateFormSubmission() {
  return new Promise((resolve) => setTimeout(resolve, 2000));
}

function showFormMessage(type, message) {
  const formMessage = document.createElement("div");
  formMessage.className = `form-message ${type}`;
  formMessage.innerHTML = `
    <i class="fas fa-${
      type === "success" ? "check" : "exclamation"
    }-circle"></i>
    <p>${message}</p>
  `;

  const form = document.getElementById("contactForm");
  const existingMessage = form?.querySelector(".form-message");
  if (existingMessage) existingMessage.remove();

  form?.insertAdjacentElement("afterend", formMessage);
  setTimeout(() => formMessage.remove(), 5000);
}

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (!section) return;

  const headerHeight = document.querySelector(".header")?.offsetHeight || 0;
  const elementPosition = section.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });
}
