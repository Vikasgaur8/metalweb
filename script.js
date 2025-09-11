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
document.addEventListener("DOMContentLoaded", initGallery);

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
      "a, button, .service-card, .gallery-item"
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
  "%c🏭 Sailco Metal & Tubes Industries",
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
