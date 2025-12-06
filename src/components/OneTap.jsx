import React from 'react';

function OneTap() {
  return (
    <section className="one-tap">
      <div className="section-container">
        <h2 className="section-title">One-Tap Experience</h2>
        <div className="one-tap-flow">
          <div className="flow-item">Press.</div>
          <div className="flow-arrow">→</div>
          <div className="flow-item">Record.</div>
          <div className="flow-arrow">→</div>
          <div className="flow-item">Transcribe.</div>
          <div className="flow-arrow">→</div>
          <div className="flow-item">Summaries.</div>
          <div className="flow-arrow">→</div>
          <div className="flow-item">Action items.</div>
        </div>
        <p className="one-tap-subtitle">All from one button.</p>
      </div>
    </section>
  );
}

export default OneTap;
