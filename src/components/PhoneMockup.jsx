import React, { useState, useRef } from 'react';

function PhoneMockup() {
  const [state, setState] = useState('idle');
  const [isRecording, setIsRecording] = useState(false);
  const rippleRef = useRef(null);

  const handleMicPress = () => {
    setState('pressing');

    if (rippleRef.current) {
      rippleRef.current.classList.remove('active');
      void rippleRef.current.offsetWidth;
      rippleRef.current.classList.add('active');
    }

    setTimeout(() => {
      if (!isRecording) {
        startRecording();
      } else {
        stopRecording();
      }
      setState(isRecording ? 'recording' : 'idle');
    }, 80);
  };

  const startRecording = () => {
    setIsRecording(true);
    setState('recording');
  };

  const stopRecording = () => {
    setIsRecording(false);
    setState('ended');

    setTimeout(() => {
      setState('idle');
    }, 2000);
  };

  const getStatusText = () => {
    if (state === 'recording') return 'Listening';
    if (state === 'ended') return 'Meeting ended';
    return 'Tap to record';
  };

  return (
    <div className="phone-mockup">
      <div className="phone-frame">
        <div className="phone-notch"></div>
        <div className="phone-screen">
          <div className="mic-interface">
            <button
              className={`mic-button ${state}`}
              onClick={handleMicPress}
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

            <div className={`status-text ${state === 'recording' ? 'listening' : ''}`}>
              {getStatusText()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PhoneMockup;
