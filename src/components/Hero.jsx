import React from 'react';
import PhoneMockup from './PhoneMockup';

function Hero() {
  const scrollToWaitlist = () => {
    const waitlistSection = document.getElementById('waitlist');
    if (waitlistSection) {
      waitlistSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-left">
          <div className="hero-logo">
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
              <circle cx="40" cy="40" r="40" fill="#FFFFFF"/>
              <path d="M40 23C36.3 23 33.3 26 33.3 29.7V43.7C33.3 47.4 36.3 50.4 40 50.4C43.7 50.4 46.7 47.4 46.7 43.7V29.7C46.7 26 43.7 23 40 23Z" fill="#000000"/>
              <path d="M53.3 37C53.3 44.3636 47.3636 50.3 40 50.3C32.6364 50.3 26.7 44.3636 26.7 37H23.3C23.3 46.2045 30.7952 53.7 40 53.7C49.2048 53.7 56.7 46.2045 56.7 37H53.3Z" fill="#000000"/>
              <rect x="38.3" y="53.7" width="3.4" height="6.7" fill="#000000"/>
            </svg>
          </div>
          <h1 className="hero-headline fade-up">InOneButton</h1>
          <p className="hero-subheadline fade-up delay-1">Meetings. Made effortless.</p>
          <div className="hero-microtext fade-up delay-2">
            <p>One tap.</p>
            <p>Zero setup.</p>
            <p>Clarity begins.</p>
            <p>Automation follows.</p>
          </div>
          <button className="hero-cta fade-up delay-3" onClick={scrollToWaitlist}>
            Join the waitlist
          </button>
        </div>
        <div className="hero-right fade-up delay-4">
          <PhoneMockup />
        </div>
      </div>
    </section>
  );
}

export default Hero;
