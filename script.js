// Import Supabase client
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

// Initialize Supabase
const SUPABASE_URL = 'https://dasfryojsgssxkqxudzv.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRhc2ZyeW9qc2dzc3hrcXh1ZHp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5NzExNzgsImV4cCI6MjA4MDU0NzE3OH0.D1OmUnSVQcTTUW93Tz_AufEYSigP5CfNlWaG5hhBlws';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Scroll smoothly to waitlist section
 */
function scrollToWaitlist() {
  const waitlistSection = document.getElementById('waitlist');
  if (waitlistSection) {
    waitlistSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });

    setTimeout(() => {
      const emailInput = document.getElementById('emailInput');
      if (emailInput) {
        emailInput.focus();
      }
    }, 800);
  }
}

/**
 * Toggle recording state on mic button
 */
function toggleRecording() {
  const micButton = document.getElementById('micButton');
  if (micButton) {
    micButton.classList.toggle('recording');
  }
}

/**
 * Validate email format
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Show feedback message with animation
 */
function showFeedback(message, type) {
  const feedback = document.getElementById('feedback');
  if (!feedback) return;

  feedback.textContent = message;
  feedback.className = `feedback ${type}`;
  feedback.style.opacity = '1';

  if (type === 'success') {
    setTimeout(() => {
      feedback.style.opacity = '0';
      setTimeout(() => {
        feedback.textContent = '';
        feedback.className = 'feedback';
      }, 300);
    }, 5000);
  }
}

/**
 * Handle waitlist form submission
 */
async function handleWaitlistSubmit(event) {
  event.preventDefault();

  const emailInput = document.getElementById('emailInput');
  const submitBtn = event.target.querySelector('.submit-btn');
  const email = emailInput.value.trim();

  if (!email) {
    showFeedback('Please enter your email address.', 'error');
    return;
  }

  if (!isValidEmail(email)) {
    showFeedback('Please enter a valid email address.', 'error');
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = 'Joining...';

  try {
    const { data, error } = await supabase
      .from('waitlist')
      .insert([{ email, source: 'landing' }]);

    if (error) {
      if (error.code === '23505') {
        showFeedback('You are already on the waitlist.', 'error');
      } else {
        showFeedback('Something went wrong. Please try again.', 'error');
      }
    } else {
      showFeedback('Success! You are on the waitlist.', 'success');
      emailInput.value = '';
    }
  } catch (err) {
    console.error('Error submitting to waitlist:', err);
    showFeedback('Network error. Please try again.', 'error');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Join waitlist';
  }
}

/**
 * Initialize all interactions on page load
 */
document.addEventListener('DOMContentLoaded', function() {

  // Mic button toggle
  const micButton = document.getElementById('micButton');
  if (micButton) {
    micButton.addEventListener('click', toggleRecording);
  }

  // Waitlist form submission
  const waitlistForm = document.getElementById('waitlistForm');
  if (waitlistForm) {
    waitlistForm.addEventListener('submit', handleWaitlistSubmit);
  }

  // Clear error feedback on input
  const emailInput = document.getElementById('emailInput');
  if (emailInput) {
    emailInput.addEventListener('input', function() {
      const feedback = document.getElementById('feedback');
      if (feedback && feedback.classList.contains('error')) {
        feedback.style.opacity = '0';
        setTimeout(() => {
          feedback.textContent = '';
          feedback.className = 'feedback';
        }, 300);
      }
    });
  }

  // Add keyboard support for buttons
  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => {
    button.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  });
});

// Make scrollToWaitlist globally accessible
window.scrollToWaitlist = scrollToWaitlist;
