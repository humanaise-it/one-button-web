import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

function Waitlist() {
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState({ message: '', type: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setFeedback({ message: 'Please enter your email address.', type: 'error' });
      return;
    }

    if (!isValidEmail(trimmedEmail)) {
      setFeedback({ message: 'Please enter a valid email address.', type: 'error' });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('waitlist')
        .insert([{ email: trimmedEmail, source: 'landing' }]);

      if (error) {
        if (error.code === '23505') {
          setFeedback({ message: 'You are already on the waitlist.', type: 'error' });
        } else {
          setFeedback({ message: 'Something went wrong. Please try again.', type: 'error' });
        }
      } else {
        setFeedback({ message: 'Success! You are on the waitlist.', type: 'success' });
        setEmail('');

        setTimeout(() => {
          setFeedback({ message: '', type: '' });
        }, 5000);
      }
    } catch (err) {
      console.error('Error submitting to waitlist:', err);
      setFeedback({ message: 'Network error. Please try again.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (feedback.type === 'error') {
      setFeedback({ message: '', type: '' });
    }
  };

  return (
    <section id="waitlist" className="waitlist">
      <div className="section-container-narrow">
        <h2 className="section-title">Join the waitlist</h2>
        <p className="waitlist-subtitle">Be among the first to experience clarity.</p>

        <form className="waitlist-form" onSubmit={handleSubmit}>
          <input
            type="email"
            className="email-input"
            placeholder="your@email.com"
            value={email}
            onChange={handleEmailChange}
            required
            aria-label="Email address"
          />
          <button
            type="submit"
            className="submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Joining...' : 'Join waitlist'}
          </button>
        </form>

        {feedback.message && (
          <div className={`feedback ${feedback.type}`} role="status" aria-live="polite">
            {feedback.message}
          </div>
        )}

        <p className="waitlist-microtext">No spam. No noise. Just clarity.</p>
      </div>
    </section>
  );
}

export default Waitlist;
