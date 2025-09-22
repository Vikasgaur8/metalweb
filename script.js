// ===== MAIN JAVASCRIPT FILE FOR SAILCO METAL & TUBES INDUSTRIES =====

// ===== HERO SLIDER FUNCTIONALITY =====
let currentSlideIndex = 0;
const slides = document.querySelectorAll(".hero-slide");
const indicators = document.querySelectorAll(".indicator");
let slideInterval;

// Initialize slider
function initHeroSlider() {
  if (slides.length === 0) return;

  // Start automatic sliding
  startAutoSlide();

  // Pause auto-slide on hover
  const heroSection = document.querySelector(".hero-section");
  heroSection.addEventListener("mouseenter", pauseAutoSlide);
  heroSection.addEventListener("mouseleave", startAutoSlide);
}

// Change slide function
function changeSlide(direction) {
  slides[currentSlideIndex].classList.remove("active");
  indicators[currentSlideIndex].classList.remove("active");

  currentSlideIndex += direction;

  if (currentSlideIndex >= slides.length) {
    currentSlideIndex = 0;
  }
  if (currentSlideIndex < 0) {
    currentSlideIndex = slides.length - 1;
  }

  slides[currentSlideIndex].classList.add("active");
  indicators[currentSlideIndex].classList.add("active");

  // Reset auto-slide timer
  resetAutoSlide();
}

// Go to specific slide
function currentSlide(index) {
  slides[currentSlideIndex].classList.remove("active");
  indicators[currentSlideIndex].classList.remove("active");

  currentSlideIndex = index - 1;

  slides[currentSlideIndex].classList.add("active");
  indicators[currentSlideIndex].classList.add("active");

  // Reset auto-slide timer
  resetAutoSlide();
}

// Auto-slide functions
function startAutoSlide() {
  slideInterval = setInterval(() => {
    changeSlide(1);
  }, 5000); // Change slide every 5 seconds
}

function pauseAutoSlide() {
  clearInterval(slideInterval);
}

function resetAutoSlide() {
  pauseAutoSlide();
  startAutoSlide();
}

// Initialize hero slider when DOM is loaded
document.addEventListener("DOMContentLoaded", initHeroSlider);

// ===== SMOOTH SCROLLING FOR NAVIGATION LINKS =====
document.addEventListener("DOMContentLoaded", function () {
  // Smooth scrolling for anchor links
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
});

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  // Observe all elements with scroll-animate class
  const animateElements = document.querySelectorAll(".scroll-animate");
  animateElements.forEach((el) => {
    observer.observe(el);
  });
}

// Initialize scroll animations when DOM is loaded
document.addEventListener("DOMContentLoaded", initScrollAnimations);

// ===== ACTIVE NAVIGATION HIGHLIGHTING =====
function updateActiveNav() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  let currentSection = "";
  const scrollPosition = window.scrollY + 100; // Offset for better detection

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
}

// Update active nav on scroll
window.addEventListener("scroll", updateActiveNav);

// ===== NAVBAR BACKGROUND ON SCROLL =====
function updateNavbarOnScroll() {
  const navbar = document.querySelector(".main-nav");
  const scrolled = window.scrollY;

  if (scrolled > 100) {
    navbar.style.background = "rgba(255, 255, 255, 0.95)";
    navbar.style.backdropFilter = "blur(10px)";
  } else {
    navbar.style.background = "var(--white)";
    navbar.style.backdropFilter = "none";
  }
}

window.addEventListener("scroll", updateNavbarOnScroll);

// ===== CONTACT FORM HANDLING =====
function initContactForm() {
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(this);
      const formValues = {};

      for (let [key, value] of formData.entries()) {
        formValues[key] = value;
      }

      // Validate form
      if (validateForm(formValues)) {
        // Show success message
        showMessage(
          "Thank you for your message! We will get back to you soon.",
          "success"
        );

        // Reset form
        this.reset();

        // In a real application, you would send the data to your server
        // Example: sendFormData(formValues);
      }
    });
  }
}

// Form validation function
function validateForm(data) {
  const requiredFields = ["name", "email", "message"];

  for (let field of requiredFields) {
    if (!data[field] || data[field].trim() === "") {
      showMessage(`Please fill in the ${field} field.`, "error");
      return false;
    }
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    showMessage("Please enter a valid email address.", "error");
    return false;
  }

  return true;
}

// Show message function
function showMessage(message, type) {
  // Remove existing messages
  const existingMessage = document.querySelector(".form-message");
  if (existingMessage) {
    existingMessage.remove();
  }

  // Create message element
  const messageElement = document.createElement("div");
  messageElement.className = `form-message alert alert-${
    type === "success" ? "success" : "danger"
  }`;
  messageElement.style.cssText = `
        padding: 1rem;
        margin-bottom: 1rem;
        border-radius: var(--border-radius-md);
        background-color: ${type === "success" ? "#d4edda" : "#f8d7da"};
        border: 1px solid ${type === "success" ? "#c3e6cb" : "#f5c6cb"};
        color: ${type === "success" ? "#155724" : "#721c24"};
    `;
  messageElement.textContent = message;

  // Insert message at the top of the form
  const contactForm = document.getElementById("contactForm");
  contactForm.insertBefore(messageElement, contactForm.firstChild);

  // Auto-remove message after 5 seconds
  setTimeout(() => {
    messageElement.remove();
  }, 5000);
}

// Initialize contact form when DOM is loaded
document.addEventListener("DOMContentLoaded", initContactForm);

// ===== GALLERY LIGHTBOX (Simple Implementation) =====
function initGallery() {
  const galleryItems = document.querySelectorAll(".gallery-item");

  galleryItems.forEach((item) => {
    item.addEventListener("click", function () {
      const img = this.querySelector("img");
      if (img) {
        createLightbox(img.src, img.alt);
      }
    });
  });
}

function intiCertificate() {
  const certificateImage = document.querySelectorAll(".certificateViewBtn");
  console.log("-->", certificateImage);
  certificateImage.forEach((item) => {
    item.addEventListener("click", function () {
      const img = this.querySelector("img");
      console.log("img->", img);
      if (img) {
        createLightbox(img.src, img.alt);
      }
    });
  });
}

// Create lightbox modal
function createLightbox(imageSrc, imageAlt) {
  // Create lightbox elements
  const lightbox = document.createElement("div");
  lightbox.className = "lightbox-overlay";
  lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        cursor: pointer;
    `;

  const lightboxImg = document.createElement("img");
  lightboxImg.src = imageSrc;
  lightboxImg.alt = imageAlt;
  lightboxImg.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        object-fit: contain;
        border-radius: var(--border-radius-lg);
        box-shadow: var(--shadow-xl);
    `;

  const closeButton = document.createElement("button");
  closeButton.innerHTML = "&times;";
  closeButton.style.cssText = `
        position: absolute;
        top: 20px;
        right: 30px;
        background: none;
        border: none;
        color: white;
        font-size: 40px;
        cursor: pointer;
        z-index: 10000;
    `;

  // Add elements to lightbox
  lightbox.appendChild(lightboxImg);
  lightbox.appendChild(closeButton);
  document.body.appendChild(lightbox);

  // Close lightbox functionality
  const closeLightbox = () => {
    document.body.removeChild(lightbox);
  };

  lightbox.addEventListener("click", closeLightbox);
  closeButton.addEventListener("click", closeLightbox);

  // Prevent image click from closing lightbox
  lightboxImg.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  // Close with Escape key
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      closeLightbox();
      document.removeEventListener("keydown", handleKeyDown);
    }
  };
  document.addEventListener("keydown", handleKeyDown);
}

// Initialize gallery when DOM is loaded
// document.addEventListener("DOMContentLoaded", initGallery);
document.addEventListener("DOMContentLoaded", intiCertificate);

// ===== COUNTER ANIMATION =====
function initCounters() {
  const counters = document.querySelectorAll("[data-count]");

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.dataset.count);
          const duration = 2000; // 2 seconds
          const step = target / (duration / 16); // 60 FPS

          let current = 0;
          const timer = setInterval(() => {
            current += step;
            counter.textContent = Math.round(current);

            if (current >= target) {
              counter.textContent = target;
              clearInterval(timer);
            }
          }, 16);

          counterObserver.unobserve(counter);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => {
    counterObserver.observe(counter);
  });
}

// Initialize counters when DOM is loaded
document.addEventListener("DOMContentLoaded", initCounters);

// ===== MOBILE MENU HANDLING =====
function initMobileMenu() {
  const navbarToggler = document.querySelector(".navbar-toggler");
  const navbarNav = document.querySelector("#navbarNav");
  const navLinks = document.querySelectorAll(".nav-link");

  // Close mobile menu when clicking on nav links
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navbarNav.classList.contains("show")) {
        navbarToggler.click(); // Trigger Bootstrap's collapse
      }
    });
  });
}

// Initialize mobile menu when DOM is loaded
document.addEventListener("DOMContentLoaded", initMobileMenu);

// ===== PERFORMANCE OPTIMIZATIONS =====
// Throttle scroll events
function throttle(func, limit) {
  let lastFunc;
  let lastRan;
  return function () {
    const context = this;
    const args = arguments;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function () {
        if (Date.now() - lastRan >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}

// Apply throttling to scroll events
window.addEventListener(
  "scroll",
  throttle(function () {
    updateActiveNav();
    updateNavbarOnScroll();
  }, 100)
);

// ===== LAZY LOADING FOR IMAGES =====
function initLazyLoading() {
  const images = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
}

// Initialize lazy loading when DOM is loaded
document.addEventListener("DOMContentLoaded", initLazyLoading);

// ===== LOADING SCREEN =====
function initLoadingScreen() {
  const loadingScreen = document.querySelector(".loading-screen");

  window.addEventListener("load", () => {
    if (loadingScreen) {
      loadingScreen.classList.add("fade-out");
      setTimeout(() => {
        loadingScreen.remove();
      }, 500);
    }
  });
}

// Initialize loading screen
document.addEventListener("DOMContentLoaded", initLoadingScreen);

// ===== CUSTOM CURSOR (Optional Enhancement) =====
function initCustomCursor() {
  const cursor = document.createElement("div");
  cursor.className = "custom-cursor";
  cursor.style.cssText = `
        width: 20px;
        height: 20px;
        border: 2px solid var(--secondary-color);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 10000;
        transition: all 0.1s ease;
        display: none;
    `;

  document.body.appendChild(cursor);

  // Only show custom cursor on desktop
  if (window.innerWidth > 768) {
    document.addEventListener("mousemove", (e) => {
      cursor.style.display = "block";
      cursor.style.left = e.clientX - 10 + "px";
      cursor.style.top = e.clientY - 10 + "px";
    });

    // Hide cursor when leaving window
    document.addEventListener("mouseleave", () => {
      cursor.style.display = "none";
    });

    // Enlarge cursor on hover over clickable elements
    const clickableElements = document.querySelectorAll(
      "a, button, .service-card, .gallery-item",
      ".certificateImage"
    );

    clickableElements.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursor.style.transform = "scale(1.5)";
        cursor.style.backgroundColor = "rgba(212, 168, 83, 0.2)";
      });

      el.addEventListener("mouseleave", () => {
        cursor.style.transform = "scale(1)";
        cursor.style.backgroundColor = "transparent";
      });
    });
  }
}

// Initialize custom cursor when DOM is loaded (optional)
// document.addEventListener('DOMContentLoaded', initCustomCursor);

// ===== CONSOLE MESSAGE =====
console.log(
  "%c🏭 Developed by Vikas Gaur",
  "color: #d4a853; font-size: 24px; font-weight: bold;"
);
console.log(
  "%cWebsite loaded successfully! 🚀",
  "color: #2c5f7a; font-size: 16px;"
);
console.log(
  "%cBuilt with ❤️ for excellence in steel manufacturing",
  "color: #666; font-size: 12px;"
);

var slider = document.getElementById("slider"),
  sliderItems = document.getElementById("slides"),
  prev = document.getElementById("prev"),
  next = document.getElementById("next");

function slide(wrapper, items, prev, next) {
  let posX1 = 0,
    posX2 = 0,
    posInitial,
    posFinal,
    slides = items.getElementsByClassName("slide"),
    slidesLength = slides.length,
    slideSize = window.innerWidth,
    firstSlide = slides[0],
    lastSlide = slides[slidesLength - 1],
    cloneFirst = firstSlide.cloneNode(true),
    cloneLast = lastSlide.cloneNode(true),
    index = 0,
    allowShift = true,
    autoSlideInterval,
    threshold = slideSize / 4; // dynamic threshold

  // Clone first and last slide
  items.appendChild(cloneFirst);
  items.insertBefore(cloneLast, firstSlide);

  // Set initial position
  items.style.left = -slideSize + "px";
  wrapper.classList.add("loaded");

  // Mouse events
  items.onmousedown = dragStart;

  // Touch events
  items.addEventListener("touchstart", dragStart);
  items.addEventListener("touchend", dragEnd);
  items.addEventListener("touchmove", dragAction);

  // Click events
  prev.addEventListener("click", () => {
    shiftSlide(-1);
    resetAutoSlide();
  });
  next.addEventListener("click", () => {
    shiftSlide(1);
    resetAutoSlide();
  });

  // Transition events
  items.addEventListener("transitionend", checkIndex);

  // Auto slide every 3s
  startAutoSlide();

  // Recalculate on resize
  window.addEventListener("resize", () => {
    slideSize = window.innerWidth;
    threshold = slideSize / 4;
    items.style.left = -((index + 1) * slideSize) + "px";
  });

  function dragStart(e) {
    e = e || window.event;
    // e.preventDefault();
    posInitial = items.offsetLeft;

    if (e.type === "touchstart") {
      posX1 = e.touches[0].clientX;
    } else {
      posX1 = e.clientX;
      document.onmouseup = dragEnd;
      document.onmousemove = dragAction;
    }
    stopAutoSlide();
  }

  function dragAction(e) {
    e = e || window.event;
    if (e.type === "touchmove") {
      posX2 = posX1 - e.touches[0].clientX;
      posX1 = e.touches[0].clientX;
    } else {
      posX2 = posX1 - e.clientX;
      posX1 = e.clientX;
    }
    items.style.left = items.offsetLeft - posX2 + "px";
  }

  function dragEnd() {
    posFinal = items.offsetLeft;
    if (posFinal - posInitial < -threshold) {
      shiftSlide(1, "drag");
    } else if (posFinal - posInitial > threshold) {
      shiftSlide(-1, "drag");
    } else {
      items.style.left = posInitial + "px";
    }
    document.onmouseup = null;
    document.onmousemove = null;
    startAutoSlide();
  }

  function shiftSlide(dir, action) {
    if (!allowShift) return; // prevent double shift
    items.classList.add("shifting");

    if (!action) posInitial = items.offsetLeft;
    if (dir === 1) {
      items.style.left = posInitial - slideSize + "px";
      index++;
    } else if (dir === -1) {
      items.style.left = posInitial + slideSize + "px";
      index--;
    }
    allowShift = false;
  }

  function checkIndex() {
    items.classList.remove("shifting");
    if (index === -1) {
      items.style.left = -(slidesLength * slideSize) + "px";
      index = slidesLength - 1;
    }
    if (index === slidesLength) {
      items.style.left = -(1 * slideSize) + "px";
      index = 0;
    }
    allowShift = true;
  }

  function startAutoSlide() {
    autoSlideInterval = setInterval(() => shiftSlide(1), 3000);
  }
  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }
  function resetAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
  }
}

slide(slider, sliderItems, prev, next);

const track = document.querySelector(".carousel-track");
const indSlides = Array.from(track.children);
const slideCount = indSlides.length;

let slideWidth = indSlides[0].offsetWidth + 16; // Slide width + margin

// Clone first and last slides for seamless looping
const firstClone = indSlides[0].cloneNode(true);
const lastClone = indSlides[slideCount - 1].cloneNode(true);

track.appendChild(firstClone);
track.insertBefore(lastClone, indSlides[0]);

const allSlides = Array.from(track.children);
const totalSlides = allSlides.length;

let currentPos = 1; // Start at first original slide

// Center track based on current position
function setPosition(pos) {
  const offset =
    -slideWidth * pos +
    (track.parentElement.offsetWidth - indSlides[0].offsetWidth) / 2;
  track.style.transform = `translateX(${offset}px)`;
}

// Update active slide styling
function updateActive() {
  allSlides.forEach((slide) => slide.classList.remove("active"));
  allSlides[currentPos].classList.add("active");
}

// Initialize position and active slide
setPosition(currentPos);
updateActive();

// Move to slide with transition
function moveToSlide(pos) {
  currentPos = pos;
  track.style.transition = "transform 0.6s cubic-bezier(.42,0,.58,1)";
  setPosition(currentPos);
  updateActive();
}

// Slide to next image
function nextSlide() {
  if (currentPos >= totalSlides - 1) return;
  moveToSlide(currentPos + 1);
}

// Handle transition end for seamless loop without jump
track.addEventListener("transitionend", () => {
  if (currentPos === totalSlides - 1) {
    track.style.transition = "none";
    currentPos = 1;
    setPosition(currentPos);
    track.offsetHeight; // force reflow
    setTimeout(() => {
      track.style.transition = "transform 0.6s cubic-bezier(.42,0,.58,1)";
      updateActive();
    }, 0);
  } else if (currentPos === 0) {
    track.style.transition = "none";
    currentPos = totalSlides - 2;
    setPosition(currentPos);
    track.offsetHeight;
    setTimeout(() => {
      track.style.transition = "transform 0.6s cubic-bezier(.42,0,.58,1)";
      updateActive();
    }, 0);
  }
});

// Update slide width and position on resize
window.addEventListener("resize", () => {
  slideWidth = indSlides[0].offsetWidth + 16;
  setPosition(currentPos);
  track.style.transition = "none";
});

// Auto slide every 1800ms (adjust as needed)
setInterval(() => {
  nextSlide();
}, 1800);



//------------------------------Product data array----------------------
const products = [
  {
    id: 'product1',
    name: 'SLIP ON FLANGES',
    img: './images/flangs/SLIP ON FLANGES/Alloy-Steel-Slip-On-Flanges.webp',
    alt: 'Stainless Steel Tubes'
  },
  {
    id: 'product2',
    name: 'WELD NECK FLANGES',
    img: './images/flangs/WELD NECK FLANGES/Alloy Steel WNRF Flanges.webp',
    alt: 'Carbon Steel Pipes'
  },
  {
    id: 'product3',
    name: 'LONG_WELD',
    img: './images/flangs/LONG_WELD/Alloy Steel Long Weld Neck Flanges.jpg',
    alt: 'Alloy Steel Products'
  },
  {
    id: 'product4',
    name: 'AWWA_FLANGES',
    img: './images/flangs/AWWA_FLANGES/Awwa Flanges.jpg',
    alt: 'Cold Drawn Precision Tubes'
  },
  {
    id: 'product5',
    name: 'Body Flanges',
    img: './images/flangs/Body Flanges/Body Flanges.jpg',
    alt: 'Industrial Steel Pipes'
  },
  {
    id: 'product6',
    name: 'BLIND FLANGES',
    img: './images/flangs/BLIND FLANGES/BLIND FLANGES.jpg',
    alt: 'Custom Steel Solutions'
  },
  {
    id: 'product7',
    name: 'THREADED FLANGES',
    img: './images/flangs/THREADED FLANGES/Stainless Threaded Flanges.jpg',
    alt: 'Custom Steel Solutions'
  },
  {
    id: 'product8',
    name: 'DIN FLANGES',
    img: './images/flangs/DIN FLANGES/DIN PN6 PN40 Flanges.jpg',
    alt: 'Custom Steel Solutions'
  },
  {
    id: 'product9',
    name: 'PADDLE BLANK FLANGES',
    img: './images/flangs/PADDLE BLANK FLANGES/Hydrotest Flanges.jpg',
    alt: 'Custom Steel Solutions'
  },
  {
    id: 'product10',
    name: 'PADDLE SPACER FLANGES',
    img: './images/flangs/PADDLE SPACER FLANGES/Paddle Spacer Flanges.jpg',
    alt: 'Custom Steel Solutions'
  },
  {
    id: 'product11',
    name: 'SPECTACLE BLIND FLANGES',
    img: './images/flangs/SPECTACLE BLIND FLANGES/Spectacle Blind Flanges_.jpg',
    alt: 'Custom Steel Solutions'
  },
  {
    id: 'product12',
    name: 'RING TYPE JOINT FLANGES',
    img: './images/flangs/RING TYPE JOINT FLANGES/ring-type-joint-flanges.jpg',
    alt: 'Custom Steel Solutions'
  },
  {
    id: 'product13',
    name: 'Nipo Flange',
    img: './images/flangs/Nipo Flange/Steel Nipoflange.jpg',
    alt: 'Custom Steel Solutions'
  }
];

// Dynamically render gallery
const gallery = document.getElementById('productGallery');
products.forEach(product => {
  const col = document.createElement('div');
  col.className = 'col-lg-4 col-md-6';
  col.innerHTML = `
    <div class="gallery-item scroll-animate">
      <a href="product-details.html?product=${product.id}" target="_self">
        <img src="${product.img}" alt="${product.alt}" />
        <div class="gallery-overlay">${product.name}</div>
      </a>
    </div>
  `;
  gallery.appendChild(col);
});

// Optional: animation if using scroll-animate, add JS for that.
