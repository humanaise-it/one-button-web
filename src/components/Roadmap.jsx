import React from 'react';

function Roadmap() {
  const milestones = [
    { icon: '🚀', quarter: 'Q1 2025', milestone: 'Launch & onboarding' },
    { icon: '⚡', quarter: 'Q2 2025', milestone: 'Automations (Slack/Gmail)' },
    { icon: '📊', quarter: 'Q3 2025', milestone: 'Team dashboards' },
    { icon: '👥', quarter: 'Q4 2025', milestone: 'Shared workspaces' }
  ];

  return (
    <section className="roadmap">
      <div className="section-container">
        <h2 className="section-title">Roadmap</h2>
        <div className="roadmap-grid">
          {milestones.map((item, index) => (
            <div key={index} className="roadmap-card">
              <div className="roadmap-icon">{item.icon}</div>
              <div className="roadmap-quarter">{item.quarter}</div>
              <div className="roadmap-milestone">{item.milestone}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Roadmap;
