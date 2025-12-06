import React, { useState, useRef } from 'react';

function PhoneMockup() {
  const [state, setState] = useState('idle');       // idle | pressing | recording | ended
  const rippleRef = useRef(null);

  const handlePress = () => {
    setState('pressing');

    // Ripple restart
    if (rippleRef.current) {
      rippleRef.current.classList.remove('active');
      void rippleRef.current.offsetWidth;
      rippleRef.current.classList.add('active');
    }

    setTimeout(() => {
      if (state !== 'recording') {
        startRecording();
      } else {
        stopRecording();
      }
    }, 90);
  };

  const startRecording = () => {
    setState('recording');
  };

  const stopRecording = () => {
    setState('ended');

    // After 2s return to idle
    setTimeout(() => {
      setState('idle');
    }, 2000);
  };

  const getStatusText = () => {
    switch (state) {
      case 'recording':
        return 'Listening…';
      case 'ended':
        return 'Meeting ended';
      default:
        return 'Tap to record';
    }
  };

  return (
    <div className="phone-mockup">
      <div className="phone-frame">
        <div className="phone-notch"></div>

        <div className="phone-screen" onClick={handlePress}>
          <div className="mic-interface">

            <button
              className={`mic-button ${state}`}
              onClick={(e) => {
                e.stopPropagation(); // Avoid double trigger when clicking the button
                handlePress();
              }}
              aria-label="Toggle recording"
            >
              <div className="ripple" ref={rippleRef}></div>

              <svg className="mic-icon" viewBox="0 0 24 24" fill="none">
                <path d="M12 7C10.9 7 10 7.9 10 9V13C10 14.1 10.9 15 12 15C13.1 15 14 14.1 14 13V9C14 7.9 13.1 7 12 7Z" fill="currentColor"/>
                <path d="M16 11C16 13.2091 14.2091 15 12 15C9.79086 15 8 13.2091 8 11H7C7 13.7614 9.23858 16 12 16C14.7614 16 17 13.7614 17 11H16Z" fill="currentColor"/>
                <rect x="11.5" y="16" width="1" height="2" fill="currentColor"/>
              </svg>
            </button>

            <div className={`equalizer ${state === 'recording' ? 'visible' : ''}`}>
              <div className="bar bar-1"></div>
              <div className="bar bar-2"></div>
              <div className="bar bar-3"></div>
            </div>

            <div className={`status-text ${state}`}>
              {getStatusText()}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default PhoneMockup;
