import React from 'react';

function Automations() {
  const cards = [
    {
      // Summary icon: minimal document
      icon: (
        <svg className="automation-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="5" y="3" width="12" height="16" rx="2" stroke="#000" strokeWidth="1.5" />
          <path d="M8 8h6M8 11h6M8 14h4" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
      title: 'Instant Summaries',
      text: 'AI transforms your meeting into a clean, structured summary — delivered straight to your chosen channel.'
    },
    {
      // Action items icon: checklist
      icon: (
        <svg className="automation-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="4" width="16" height="16" rx="3" stroke="#000" strokeWidth="1.5" />
          <path d="M8 10h7" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M8 14h5" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M6.5 9l1.5 1.5L10.5 8" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      title: 'Action Items Extraction',
      text: 'Decisions and tasks extracted automatically. No typing, no copy-paste. Items appear where your team works.'
    },
    {
      // Automations icon: connected nodes
      icon: (
        <svg className="automation-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="6" cy="12" r="2" stroke="#000" strokeWidth="1.5" />
          <circle cx="12" cy="6" r="2" stroke="#000" strokeWidth="1.5" />
          <circle cx="18" cy="12" r="2" stroke="#000" strokeWidth="1.5" />
          <circle cx="12" cy="18" r="2" stroke="#000" strokeWidth="1.5" />
          <path d="M8 12h8M12 8v8" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
      title: 'Scalable Automations',
      text: 'Email. Slack. More soon. Set your destination once — every meeting triggers the workflow.'
    }
  ];

  return (
    <section className="automations-section">
      <div className="automations-container">
        <h2 className="section-title fade-up">Automations begin after the tap.</h2>
        <p className="automation-text fade-up fade-delay-1" style={{ textAlign: 'center', color: '#666' }}>
          Your meeting is captured once.<br />
          From that moment, automations take over.<br />
          Configure your email, Slack channel, or any workflow — and your meeting minutes are delivered automatically.<br />
          Start simple. Grow infinitely.
        </p>
        <div className="automations-grid fade-up fade-delay-2">
          {cards.map((card, i) => (
            <div key={i} className="automation-card">
              {card.icon}
              <h3 className="automation-title">{card.title}</h3>
              <p className="automation-text">{card.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Automations;
