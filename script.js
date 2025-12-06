import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL = 'https://oeynuczvtwoorcyvfkxt.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9leW51Y3p2dHdvb3JjeXZma3h0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5OTg3ODcsImV4cCI6MjA4MDU3NDc4N30.lz8zgynUysmKmjA2RA08Y-lULh4U9XlQlsr0vG_rems';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

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

function toggleRecording() {
  const micButton = document.getElementById('micButton');
  const micGlow = document.getElementById('micGlow');
  const recordingText = document.getElementById('recordingText');

  if (micButton && micGlow && recordingText) {
    const isRecording = micButton.classList.contains('recording');

    if (isRecording) {
      micButton.classList.remove('recording');
      micGlow.classList.remove('active', 'recording');
      recordingText.classList.remove('visible');
    } else {
      micButton.classList.add('recording');
      micGlow.classList.add('active', 'recording');
      recordingText.classList.add('visible');
    }
  }
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

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

document.addEventListener('DOMContentLoaded', function() {
  const micButton = document.getElementById('micButton');
  if (micButton) {
    micButton.addEventListener('click', toggleRecording);
  }

  const waitlistForm = document.getElementById('waitlistForm');
  if (waitlistForm) {
    waitlistForm.addEventListener('submit', handleWaitlistSubmit);
  }

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

  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => {
    button.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  });

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll('.feature-card, .roadmap-card, .comparison-card');
  animatedElements.forEach(el => {
    observer.observe(el);
  });
});

window.scrollToWaitlist = scrollToWaitlist;
