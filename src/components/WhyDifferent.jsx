import React from 'react';

function WhyDifferent() {
  return (
    <section className="why-different">
      <div className="section-container">
        <h2 className="section-title">Why InOneButton is different</h2>
        <div className="comparison-grid">
          <div className="comparison-card">
            <div className="comparison-label">Competitors</div>
            <ul className="comparison-list">
              <li>bots</li>
              <li>integrations</li>
              <li>setup</li>
              <li>friction</li>
            </ul>
          </div>
          <div className="comparison-card highlight">
            <div className="comparison-label">InOneButton</div>
            <ul className="comparison-list">
              <li>works anywhere</li>
              <li>no bots</li>
              <li>no setup</li>
              <li>instant clarity</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyDifferent;
