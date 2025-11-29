// Example: simple console message
console.log("Introspect Myanmar website loaded successfully!");

// Global variable to track current testimonial
let currentTestimonial = 1;
const totalTestimonials = 7;

// ========== TESTIMONIAL CAROUSEL ==========
// Testimonial carousel function
function showTestimonial(n) {
  const testimonials = document.querySelectorAll('.testimonial-card-featured');
  const dots = document.querySelectorAll('.dot');
  
  // Hide all testimonials
  testimonials.forEach(testimonial => {
    testimonial.style.display = 'none';
  });
  
  // Remove active class from all dots
  dots.forEach(dot => {
    dot.classList.remove('active');
  });
  
  // Show the selected testimonial
  if (testimonials[n - 1]) {
    testimonials[n - 1].style.display = 'flex';
  }
  
  // Add active class to the clicked dot
  if (dots[n - 1]) {
    dots[n - 1].classList.add('active');
  }
  
  // Update current testimonial
  currentTestimonial = n;
}

// Next testimonial function
function nextTestimonial() {
  currentTestimonial++;
  if (currentTestimonial > totalTestimonials) {
    currentTestimonial = 1;
  }
  showTestimonial(currentTestimonial);
}

// Previous testimonial function
function previousTestimonial() {
  currentTestimonial--;
  if (currentTestimonial < 1) {
    currentTestimonial = totalTestimonials;
  }
  showTestimonial(currentTestimonial);
}

// ========== ANIMATED COUNTERS ==========
function animateCounter(element, target, duration = 2000) {
  let current = 0;
  const increment = target / (duration / 16);
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target + (element.classList.contains('percentage') ? '%' : '+');
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current) + (element.classList.contains('percentage') ? '%' : '+');
    }
  }, 16);
}

function startCounters() {
  const counters = document.querySelectorAll('.counter');
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    if (!counter.classList.contains('animated')) {
      animateCounter(counter, target);
      counter.classList.add('animated');
    }
  });
}

// ========== SCROLL REVEAL ANIMATIONS ==========
function revealOnLoad() {
  const reveals = document.querySelectorAll('.reveal');
  let delay = 0;
  reveals.forEach(reveal => {
    setTimeout(() => {
      reveal.classList.add('active');
    }, delay);
    delay += 100; // 100ms stagger between each element
  });
}

function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');
  reveals.forEach(reveal => {
    const windowHeight = window.innerHeight;
    const elementTop = reveal.getBoundingClientRect().top;
    const elementVisible = 150;
    
    if (elementTop < windowHeight - elementVisible) {
      reveal.classList.add('active');
    }
  });
}

// ========== BACK TO TOP BUTTON ==========
function showBackToTopButton() {
  const backToTop = document.getElementById('backToTop');
  if (window.pageYOffset > 300) {
    backToTop.style.display = 'block';
  } else {
    backToTop.style.display = 'none';
  }
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// ========== FORM VALIDATION ==========
function validateForm(form) {
  let isValid = true;
  const inputs = form.querySelectorAll('input[required], textarea[required]');
  
  inputs.forEach(input => {
    if (!input.value.trim()) {
      input.classList.add('error');
      isValid = false;
    } else {
      input.classList.remove('error');
    }
  });
  
  return isValid;
}

// ========== CONTACT FORM HANDLER ==========
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(this);
      const messageDiv = document.getElementById('formMessage');
      
      fetch(this.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          messageDiv.style.display = 'block';
          messageDiv.style.background = '#4CAF50';
          messageDiv.style.color = 'white';
          messageDiv.textContent = '✓ Message sent successfully! We will get back to you soon.';
          contactForm.reset();
          
          // Hide message after 5 seconds
          setTimeout(function() {
            messageDiv.style.display = 'none';
          }, 5000);
        } else {
          throw new Error('Form submission failed');
        }
      })
      .catch(error => {
        messageDiv.style.display = 'block';
        messageDiv.style.background = '#f44336';
        messageDiv.style.color = 'white';
        messageDiv.textContent = '✗ Error sending message. Please try again.';
      });
    });
  }
  
  // Initialize back to top button
  const backToTopButton = document.createElement('button');
  backToTopButton.id = 'backToTop';
  backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
  backToTopButton.className = 'back-to-top';
  backToTopButton.onclick = scrollToTop;
  document.body.appendChild(backToTopButton);
  
  // Trigger counters when page loads
  setTimeout(startCounters, 500);
  
  // Show all content with staggered animations on page load
  setTimeout(revealOnLoad, 300);
});

// ========== EVENT LISTENERS ==========
window.addEventListener('scroll', function() {
  showBackToTopButton();
  revealOnScroll();
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});
