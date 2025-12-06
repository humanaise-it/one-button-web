import React from 'react';
import MicIcon from './MicIcon';

function Navbar() {
  const scrollToWaitlist = () => {
    const waitlistSection = document.getElementById('waitlist');
    if (waitlistSection) {
      waitlistSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <MicIcon width={24} height={24} />
          <span>InOneButton</span>
        </div>
        <button className="nav-btn" onClick={scrollToWaitlist}>
          Join waitlist
        </button>
      </div>
    </header>
  );
}

export default Navbar;
