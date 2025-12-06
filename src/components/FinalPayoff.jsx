import React from 'react';

function FinalPayoff() {
  const scrollToWaitlist = () => {
    const waitlistSection = document.getElementById('waitlist');
    if (waitlistSection) {
      waitlistSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="final-payoff">
      <div className="section-container">
        <h2 className="payoff-title">The world's simplest meeting tool.</h2>
        <p className="payoff-line">InOneButton — Where clarity begins.</p>
        <button className="cta-btn" onClick={scrollToWaitlist}>
          Join the waitlist
        </button>
      </div>
    </section>
  );
}

export default FinalPayoff;
