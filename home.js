document.addEventListener("DOMContentLoaded", () => {
  initSwiper();
  initLocations();
  initContactForm();
  initSmoothScroll();
});

function initSwiper() {
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

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
      enabled: false,
    },

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },

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

    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },

    effect: "slide",
    speed: 800,

    preloadImages: false,
    lazy: {
      loadPrevNext: true,
      loadOnTransitionStart: true,
    },
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
  });

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

    navigation: {
      nextEl: ".luxury-collection .swiper-button-next",
      prevEl: ".luxury-collection .swiper-button-prev",
      enabled: false,
    },

    pagination: {
      el: ".luxury-collection .swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },

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

    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },

    effect: "slide",
    speed: 800,

    preloadImages: false,
    lazy: {
      loadPrevNext: true,
      loadOnTransitionStart: true,
    },
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
  });

  [featuredSwiper, luxurySwiper].forEach((swiper) => {
    swiper.on("touchEnd", function () {
      if (swiper.autoplay.running) {
        swiper.autoplay.start();
      }
    });
  });

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

function initLocations() {
  const officeMarker = document.querySelector(".office-marker");
  const locationLabel = document.querySelector(".location-label");
  const mapContainer = document.querySelector(".locations__map-container");
  const contactBtn = document.querySelector(".location-info__btn");
  const directionsBtn = document.querySelector(".location-info__btn--outline");

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

      if (window.innerWidth < 1024) {
        locationInfo.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    });
  }

  if (contactBtn) {
    contactBtn.addEventListener("click", () => {
      scrollToSection("contact");
    });
  }

  if (directionsBtn) {
    directionsBtn.addEventListener("click", () => {
      window.open(
        `https://www.google.com/maps/dir/?api=1&destination=E+52nd+St+%26+Madison+Ave+New+York+NY+10022`,
        "_blank"
      );
    });
  }

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

    window.addEventListener("resize", () => {
      mapContainer.style.overflow =
        window.innerWidth < 1024 ? "auto" : "hidden";
    });
  }

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

function initContactForm() {
  const contactForm = document.getElementById("contactForm");
  const submitButton = contactForm?.querySelector(".contact__submit");
  const inputs = contactForm?.querySelectorAll("input, textarea, select");

  if (!contactForm) return;

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

function validateForm(inputs) {
  if (!inputs) return false;
  return Array.from(inputs).every((input) => validateInput(input));
}

function validateInput(input) {
  const inputWrapper = input.closest(".input-wrapper");
  let isValid = true;
  let errorMessage = "";

  const existingError = inputWrapper?.querySelector(".error-message");
  if (existingError) existingError.remove();

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

  inputWrapper?.classList.toggle("error", !isValid);
  inputWrapper?.classList.toggle("success", isValid);

  if (!isValid && errorMessage) {
    const errorDiv = document.createElement("div");
    errorDiv.className = "error-message";
    errorDiv.textContent = errorMessage;
    inputWrapper?.appendChild(errorDiv);
  }

  return isValid;
}

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
const buyBtn = document.getElementById("buyBtn");
if (buyBtn) {
  buyBtn.addEventListener("click", () => {
    console.log("Buy butonuna tıklandı!");
    openPopup(
      "We Will Call You for Purchase",
      "Provide your details to start your purchase process."
    );
  });
}

const rentBtn = document.getElementById("rentBtn");
if (rentBtn) {
  rentBtn.addEventListener("click", () => {
    console.log("Rent butonuna tıklandı!");
    openPopup(
      "We Will Call You for Rent",
      "Provide your details to inquire about renting a property."
    );
  });
}

const sellBtn = document.getElementById("sellBtn");
if (sellBtn) {
  sellBtn.addEventListener("click", () => {
    console.log("Sell butonuna tıklandı!");
    openPopup(
      "Let Us Help Sell Your Property",
      "Provide your details, and we will contact you to assist with selling your property at the best price."
    );
  });
}

const helpBtn = document.getElementById("helpBtn");
if (helpBtn) {
  helpBtn.addEventListener("click", () => {
    console.log("Help butonuna tıklandı!");
    openPopup(
      "Help",
      "Home Page - Introduction Start your journey to find your dream home with 'Discover Your Dream Home' at the top of the homepage. The homepage introduces the platform's core services, supported by a stunning visual. Click the 'View Properties' button to explore detailed listings.\n 2. Navigation Menu The navigation menu at the top gives you access to the following services: Buy: Explore real estate listings available for purchase. Rent: Browse rental property options. Sell: Submit a request form to sell your property. Help Menu: Access the help section for FAQs and usage guidance.\n 3. Featured Properties Explore a curated selection of premium properties on the homepage under the Featured Properties section. Click 'View Details' on each listing for more information. Listings include key details such as: Number of bedrooms Number of bathrooms Total square footage Price 4.\n Luxury Collection Under the Luxury Collection, you can view exclusive, high-end properties. Discover properties designed for sophisticated living and submit a request for more details. 5. Our Location View the location of Quwu Estate’s main office on the interactive map. Click 'Get Directions' to access Google Maps for navigation to the office. Use the 'Contact Us' button to reach out directly.\n 6. Contact Section Use the contact form to get in touch with the support team. You need to fill in: Your full name Email address Phone number Your message Once submitted, the support team will get back to you promptly. \n7. Popup Features The platform includes interactive popup features for easy access: Buy, Rent, Sell: Click these buttons to open dedicated popups and submit requests. Help Menu: Access FAQs and guides for platform usage through the Help Menu popup. \n8. Account Information The platform currently does not require account creation. All transactions and requests are managed through forms or direct communication. \n9. Support and Assistance For any inquiries or issues: Visit the Help Menu for guides and FAQs. Fill out the Contact Us form to get in touch with the support team. Tips for Use The platform is fully mobile-friendly! Access it easily from your phone or tablet. Use the 'View Details' button on each property listing to access comprehensive information. Visit the relevant sections (Buy, Rent, Sell) to filter properties according to your needs."
    );
  });
}

const popupClose = document.getElementById("popupClose");
if (popupClose) {
  popupClose.addEventListener("click", () => {
    console.log("Popup kapatıldı!");
    closePopup();
  });
}

const popupOverlay = document.getElementById("popupOverlay");
if (popupOverlay) {
  popupOverlay.addEventListener("click", (e) => {
    if (e.target === popupOverlay) {
      console.log("Overlay tıklanarak popup kapatıldı!");
      closePopup();
    }
  });
}

function openPopup(title, subtitle) {
  const popupTitle = document.getElementById("popupTitle");
  const popupSubtitle = document.getElementById("popupSubtitle");

  if (popupTitle && popupSubtitle && popupOverlay) {
    popupTitle.innerText = title;
    popupSubtitle.innerText = subtitle;
    popupOverlay.classList.add("active");
    console.log("Popup açıldı!");
  } else {
    console.error("Popup elemanları bulunamadı!");
  }
}

function closePopup() {
  if (popupOverlay) {
    popupOverlay.classList.remove("active");
    console.log("Popup kapandı!");
  } else {
    console.error("Popup overlay bulunamadı!");
  }
}
document.addEventListener("scroll", () => {
  const header = document.querySelector(".header");
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});
