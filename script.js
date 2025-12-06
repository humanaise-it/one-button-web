/**
 * OneButton Landing Page - Interactive JavaScript
 * Handles smooth scrolling and waitlist form submission
 */

// Smooth scroll to waitlist section
function scrollToWaitlist() {
  const waitlistSection = document.getElementById('waitlist');
  if (waitlistSection) {
    waitlistSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });

    // Focus on email input after scrolling
    setTimeout(() => {
      const emailInput = document.getElementById('emailInput');
      if (emailInput) {
        emailInput.focus();
      }
    }, 800);
  }
}

// Handle waitlist form submission
function joinWaitlist(event) {
  event.preventDefault();

  const emailInput = document.getElementById('emailInput');
  const feedback = document.getElementById('feedback');
  const email = emailInput.value.trim();

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validation checks
  if (!email) {
    showFeedback(feedback, 'Inserisci la tua email per continuare.', 'error');
    return;
  }

  if (!emailRegex.test(email)) {
    showFeedback(feedback, 'Inserisci un indirizzo email valido.', 'error');
    return;
  }

  // Simulate successful submission
  // In production, this would send data to your backend API
  showFeedback(
    feedback,
    '✓ Perfetto! Sei nella lista d\'attesa. Controlla la tua inbox.',
    'success'
  );

  // Clear input field after successful submission
  emailInput.value = '';

  // Optional: Track conversion with analytics
  // trackWaitlistSignup(email);

  // Optional: Send to backend
  // sendToBackend(email);
}

// Show feedback message with appropriate styling
function showFeedback(feedbackElement, message, type) {
  feedbackElement.textContent = message;
  feedbackElement.style.color = type === 'success' ? '#4ade80' : '#f87171';
  feedbackElement.style.fontWeight = '600';

  // Auto-clear success messages after 5 seconds
  if (type === 'success') {
    setTimeout(() => {
      feedbackElement.textContent = '';
    }, 5000);
  }
}

// Optional: Function to send email to backend API
// Uncomment and configure when ready to integrate with your backend
/*
async function sendToBackend(email) {
  try {
    const response = await fetch('/api/waitlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        source: 'landing_page',
        timestamp: new Date().toISOString()
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log('Waitlist signup successful:', data);

    // Optional: trigger conversion tracking
    if (typeof gtag !== 'undefined') {
      gtag('event', 'conversion', {
        'send_to': 'YOUR_CONVERSION_ID',
        'value': 1.0,
        'currency': 'EUR'
      });
    }

  } catch (error) {
    console.error('Error submitting to waitlist:', error);
    showFeedback(
      document.getElementById('feedback'),
      'Si è verificato un errore. Riprova tra poco.',
      'error'
    );
  }
}
*/

// Optional: Analytics tracking function
/*
function trackWaitlistSignup(email) {
  // Google Analytics 4
  if (typeof gtag !== 'undefined') {
    gtag('event', 'generate_lead', {
      'event_category': 'Waitlist',
      'event_label': 'Email Signup',
      'value': email
    });
  }

  // Facebook Pixel
  if (typeof fbq !== 'undefined') {
    fbq('track', 'Lead');
  }
}
*/

// Initialize page interactions on load
document.addEventListener('DOMContentLoaded', function() {

  // Add keyboard navigation support for CTA buttons
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => {
    button.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  });

  // Enhance email input accessibility
  const emailInput = document.getElementById('emailInput');
  if (emailInput) {
    // Auto-trim on blur
    emailInput.addEventListener('blur', function() {
      this.value = this.value.trim();
    });

    // Submit on Enter key
    emailInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        const form = this.closest('form');
        if (form) {
          form.dispatchEvent(new Event('submit'));
        }
      }
    });

    // Clear error feedback on new input
    emailInput.addEventListener('input', function() {
      const feedback = document.getElementById('feedback');
      if (feedback && feedback.textContent && feedback.style.color === 'rgb(248, 113, 113)') {
        feedback.textContent = '';
      }
    });
  }

  // Add smooth scroll to "Come funziona" link if exists
  const scrollLinks = document.querySelectorAll('a[href^="#"]');
  scrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Intersection Observer for fade-in animations (optional enhancement)
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe feature blocks and benefit cards for animation
  const animatedElements = document.querySelectorAll('.feature-block, .benefit-card');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});
