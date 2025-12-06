import React from 'react';

function Features() {
  const features = [
    {
      image: 'https://images.unsplash.com/photo-1551836022-4c4c79ecde51?q=80&w=1200',
      title: 'Live Transcription',
      description: 'Real-time accuracy. No delays.',
      alt: 'Live meeting transcription in real-time'
    },
    {
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200',
      title: 'AI Summary',
      description: 'Clear. Structured. Instant.',
      alt: 'AI-generated meeting summaries'
    },
    {
      image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=1200',
      title: 'Action Items',
      description: 'Decisions extracted automatically.',
      alt: 'Automatic action items extraction'
    }
  ];

  return (
    <section className="features">
      <div className="section-container">
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-image">
                <img src={feature.image} alt={feature.alt} />
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
