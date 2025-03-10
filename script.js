// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Elements selection
  const navbar = document.querySelector(".navbar");
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const sections = document.querySelectorAll("section");
  const formGroups = document.querySelectorAll(".form-group");

  // Create scroll to top button
  const scrollTopButton = document.createElement("a");
  scrollTopButton.classList.add("scroll-top");
  scrollTopButton.href = "#";
  scrollTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
  document.body.appendChild(scrollTopButton);

  // Navbar scroll effect
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Handle scroll to top button visibility
    if (window.scrollY > 500) {
      scrollTopButton.classList.add("visible");
    } else {
      scrollTopButton.classList.remove("visible");
    }

    // Animate sections on scroll
    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (sectionTop < windowHeight * 0.75) {
        section.classList.add("animate");
      }
    });
  });

  // Mobile menu toggle
  menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("active");
    document.body.classList.toggle("menu-open");
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", function (event) {
    if (
      navLinks.classList.contains("active") &&
      !event.target.closest(".navbar")
    ) {
      navLinks.classList.remove("active");
      document.body.classList.remove("menu-open");
    }
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      // Close mobile menu if open
      if (navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
        document.body.classList.remove("menu-open");
      }

      const targetId = this.getAttribute("href");
      if (targetId === "#") return; // Ignore empty links

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth"
        });
      }
    });
  });

  // Handle form inputs focus
  formGroups.forEach((group) => {
    const input = group.querySelector("input, textarea, select");

    if (!input) return;

    // Check if input has value on load
    if (input.value.trim() !== "") {
      group.classList.add("focused");
    }

    input.addEventListener("focus", () => {
      group.classList.add("focused");
    });

    input.addEventListener("blur", () => {
      if (input.value.trim() === "") {
        group.classList.remove("focused");
      }
    });
  });

  // Handle form submission
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        service: document.getElementById("service").value,
        message: document.getElementById("message").value
      };

      // Simulate form submission with a success message
      console.log("Form Data:", formData);

      // Show success message
      const successMessage = document.createElement("div");
      successMessage.classList.add("form-success");
      successMessage.innerHTML = `
                <div class="success-icon"><i class="fas fa-check-circle"></i></div>
                <h3>Message Sent!</h3>
                <p>Thank you for contacting us. We'll get back to you shortly.</p>
            `;

      // Replace form with success message
      contactForm.innerHTML = "";
      contactForm.appendChild(successMessage);

      // Add success message styling
      const style = document.createElement("style");
      style.textContent = `
                .form-success {
                    text-align: center;
                    padding: 2rem;
                }
                .success-icon {
                    font-size: 3rem;
                    color: var(--primary-color);
                    margin-bottom: 1rem;
                    animation: scaleUp 0.5s forwards;
                }
                @keyframes scaleUp {
                    from { transform: scale(0); }
                    to { transform: scale(1); }
                }
                .form-success h3 {
                    color: var(--primary-color);
                    margin-bottom: 1rem;
                }
            `;
      document.head.appendChild(style);
    });
  }

  // Service card hover effects
  const serviceCards = document.querySelectorAll(".service-card");
  serviceCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "";
    });
  });

  // Initialize animations on load
  setTimeout(() => {
    document.querySelectorAll("section").forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        section.classList.add("animate");
      }
    });
  }, 300);

  // Add active class to nav links based on scroll position
  const updateActiveNavLink = () => {
    const scrollPosition = window.scrollY;

    document.querySelectorAll("section").forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        document.querySelectorAll(".nav-links a").forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  };

  // Call on scroll and load
  window.addEventListener("scroll", updateActiveNavLink);
  updateActiveNavLink();

  // Initialize AOS-like scroll animations
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(".animate-on-scroll");

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementPosition < windowHeight * 0.85) {
        element.classList.add("animate");
      }
    });
  };

  window.addEventListener("scroll", animateOnScroll);
  setTimeout(animateOnScroll, 500); // Initial check

  // Add loading animation for images
  document.querySelectorAll("img").forEach((img) => {
    img.addEventListener("load", function () {
      this.classList.add("loaded");
    });

    // Add this class to images that are already loaded
    if (img.complete) {
      img.classList.add("loaded");
    }
  });

  // Add CSS for the loaded class to images
  const imgStyle = document.createElement("style");
  imgStyle.textContent = `
        img {
            opacity: 0;
            transition: opacity 0.5s ease;
        }
        img.loaded {
            opacity: 1;
        }
    `;
  document.head.appendChild(imgStyle);

  // Add parallax effect
  let lastScrollY = window.scrollY;

  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;
    const scrollDirection = currentScrollY > lastScrollY ? "down" : "up";
    const heroImage = document.querySelector(".hero-image");

    if (heroImage) {
      const speed = 0.05;
      const yPos =
        scrollDirection === "down"
          ? -currentScrollY * speed
          : -currentScrollY * speed;

      heroImage.style.transform = `translateY(${yPos}px)`;
    }

    lastScrollY = currentScrollY;
  });

  // Add preloader (optional)
  const preloader = document.createElement("div");
  preloader.classList.add("preloader");
  preloader.innerHTML = `
        <div class="loader">
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
        </div>
    `;
  document.body.appendChild(preloader);

  // Add preloader styles
  const preloaderStyle = document.createElement("style");
  preloaderStyle.textContent = `
        .preloader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--dark-bg);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            transition: opacity 0.5s ease, visibility 0.5s ease;
        }
        .loader {
            display: flex;
            gap: 10px;
        }
        .circle {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: var(--primary-color);
            animation: pulse 1.5s infinite ease-in-out;
        }
        .circle:nth-child(2) {
            animation-delay: 0.2s;
        }
        .circle:nth-child(3) {
            animation-delay: 0.4s;
        }
        @keyframes pulse {
            0%, 100% {
                transform: scale(0.5);
                opacity: 0.5;
            }
            50% {
                transform: scale(1);
                opacity: 1;
            }
        }
        .preloader.hidden {
            opacity: 0;
            visibility: hidden;
        }
    `;
  document.head.appendChild(preloaderStyle);

  // Hide preloader after page loads
  window.addEventListener("load", function () {
    setTimeout(() => {
      preloader.classList.add("hidden");
      setTimeout(() => {
        preloader.remove();
      }, 500);
    }, 1000);
  });
});