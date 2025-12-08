
import React, { useState, useRef, useEffect } from 'react';

// Audio setup
const startSound = new Audio("/sounds/start_recording.mp3");
const stopSound = new Audio("/sounds/stop_recording.mp3");
const visionSound = new Audio("/sounds/visionos_notification.mp3");
const emailSound = new Audio("/sounds/email_notification.mp3");
const slackSound = new Audio("/sounds/slack_notification.mp3");
const tickSound = new Audio("/sounds/tick.mp3");

// Set volume for all sounds
[startSound, stopSound, visionSound, emailSound, slackSound, tickSound].forEach(sound => {
  sound.volume = 0.35;
  sound.load();
});

const SAMPLE_LINES = [
  "Good point — I'll adjust that.",
  "Can we clarify the deliverables for tomorrow's meeting?",
  "Okay, let me walk you through the next steps.",
  "Let's quickly recap what we agreed on.",
  "We should document this decision.",
  "Can you repeat that last part?",
  "Yes, that works for me.",
  "Perfect, let's move forward.",
  "I'll follow up with an email summary.",
  "Let me check on that and get back to you."
];

function getRandomLine() {
  return SAMPLE_LINES[Math.floor(Math.random() * SAMPLE_LINES.length)];
}

const MAX_VISIBLE = 12; // Increased to fill the viewport gradually
const LINE_HEIGHT = 32;

function PhoneMockup() {
  const [state, setState] = useState('idle');
  const [transcript, setTranscript] = useState([]);
  const [showVisionToast, setShowVisionToast] = useState(false);
  const [showEmailNotif, setShowEmailNotif] = useState(false);
  const [showSlackNotif, setShowSlackNotif] = useState(false);
  const [showEmailBadge, setShowEmailBadge] = useState(false);
  const [showSlackBadge, setShowSlackBadge] = useState(false);
  const [animOffset, setAnimOffset] = useState(0);
  const rippleRef = useRef(null);
  const intervalRef = useRef(null);
  const animTimeoutRef = useRef(null);
  const nextId = useRef(0);
  const speakerRef = useRef(1);

  // Infinite transcription effect with typing animation
  // Nell'useEffect, cambia questa parte:
  useEffect(() => {
    if (state === 'recording') {
      setTranscript([]);
      setAnimOffset(0);
      nextId.current = 0;
      speakerRef.current = 1; // Corretto: inizia da 1
      let running = true;
      
      function addLine() {
        if (!running) return;
        const currentSpeaker = speakerRef.current;
        speakerRef.current = currentSpeaker === 1 ? 2 : 1;
        setTranscript(prev => {
          const newLine = {
            id: nextId.current++,
            speaker: currentSpeaker, // USA il valore corrente
            text: getRandomLine(),
            ts: Date.now()
          };
          // Alterna DOPO aver usato il valore

          let arr = [...prev, newLine];
          if (arr.length > MAX_VISIBLE) {
            arr = arr.slice(arr.length - MAX_VISIBLE);
          }
          return arr;
        });

        intervalRef.current = setTimeout(addLine, 900 + Math.random() * 500);
      }
      addLine();
      return () => { running = false; clearTimeout(intervalRef.current); };
    } else {
      clearTimeout(intervalRef.current);
    }
    return () => clearTimeout(intervalRef.current);
  }, [state]);

  // Reset animOffset when transcript is cleared
  useEffect(() => {
    if (transcript.length === 0) setAnimOffset(0);
  }, [transcript]);

  // Handle press logic
  const handlePress = () => {
    if (state === 'idle') {
      setState('pressing');
      if (rippleRef.current) {
        rippleRef.current.classList.remove('active');
        void rippleRef.current.offsetWidth;
        rippleRef.current.classList.add('active');
      }
      setTimeout(() => {
        startRecording();
      }, 90);
    } else if (state === 'recording') {
      stopRecording();
    }
  };

  const startRecording = () => {
    setState('recording');
    setTranscript([]);
    setAnimOffset(0);
    // Play start sound
    startSound.play().catch(e => console.log('Audio play failed:', e));
  };
  
  const stopRecording = () => {
    setState('ended');
    clearTimeout(intervalRef.current);

    // Play stop sound
    stopSound.play().catch(e => console.log('Audio play failed:', e));

    //
    // ──────────────────────────────────────────────────────────────
    //  BOTTOM NOTIFICATIONS (toast + badges) — lasciate come erano
    // ──────────────────────────────────────────────────────────────
    //

    // 1. VisionOS toast (0.4s)
    setTimeout(() => {
      setShowVisionToast(true);
      visionSound.play().catch(e => console.log("Audio play failed:", e));
      setTimeout(() => setShowVisionToast(false), 3000);
    }, 400);

    // 2. Email badge (3.6s)
    setTimeout(() => {
      setShowEmailBadge(true);
      tickSound.play().catch(e => console.log("Audio play failed:", e));
      setTimeout(() => setShowEmailBadge(false), 3000);
    }, 3600);

    // 3. Slack badge (6.8s)
    setTimeout(() => {
      setShowSlackBadge(true);
      tickSound.play().catch(e => console.log("Audio play failed:", e));
      setTimeout(() => setShowSlackBadge(false), 3000);
    }, 6800);

    //
    // ──────────────────────────────────────────────────────────────
    //  TOP IPHONE-STYLE NOTIFICATION SEQUENCE (Email → Slack → fade)
    // ──────────────────────────────────────────────────────────────
    //

    // 4. EMAIL enters (top) at 10.0s
    setTimeout(() => {
      setShowEmailNotif(true);
      emailSound.play().catch(e => console.log("Audio play failed:", e));
    }, 10000);

    // 5. SLACK enters BELOW Email at 11.0s
    setTimeout(() => {
      setShowSlackNotif(true);
      slackSound.play().catch(e => console.log("Audio play failed:", e));
    }, 11000);

    // 6. EMAIL fades out at 13.0s → Slack automatically moves into its position
    setTimeout(() => {
      setShowEmailNotif(false);
    }, 13000);

    // 7. SLACK fades out at 15.0s
    setTimeout(() => {
      setShowSlackNotif(false);
    }, 15000);

    // 8. Reset UI to idle
    setTimeout(() => {
      setTranscript([]);
      setAnimOffset(0);
      setState("idle");
    }, 15500);
  };


  // Cleanup notification timer
  useEffect(() => {
    return () => clearTimeout(animTimeoutRef.current);
  }, []);

  // Compute transform for transcript viewport
  const getTranscriptTransform = () => {
    // No transform needed - just let flex-end handle it
    return 'translateY(0)';
  };

  // Mic button classes
  const getMicButtonClass = () => {
    let base = 'mic-button';
    if (state === 'idle' || state === 'pressing') base += ' idle';
    if (state === 'recording') {
      base += ' recording';
      // Always dock when recording (desktop and mobile)
      base += ' docked';
    }
    if (state === 'ended') base += ' ended';
    return base;
  };

  // Equalizer classes
  const getEqClass = () => {
    let base = 'equalizer visible';
    // Always dock when recording
    base += ' eq-docked';
    return base;
  };

  // Status text
  const getStatusText = () => {
    switch (state) {
      case 'recording':
        return 'Listening…';
      case 'ended':
        return 'Processing...';
      default:
        return 'Tap to record';
    }
  };

  return (
    <div className="phone-mockup">
      <div className="phone-frame">
        <div className="phone-notch"></div>
        <div className="phone-screen">
          <div className="mic-interface">
            <button
              className={getMicButtonClass()}
              onClick={handlePress}
              aria-label="Toggle recording"
            >
              <div className="ripple" ref={rippleRef}></div>
              <svg className="mic-icon" viewBox="0 0 24 24" fill="none">
                <path d="M12 7C10.9 7 10 7.9 10 9V13C10 14.1 10.9 15 12 15C13.1 15 14 14.1 14 13V9C14 7.9 13.1 7 12 7Z" fill="currentColor"/>
                <path d="M16 11C16 13.2091 14.2091 15 12 15C9.79086 15 8 13.2091 8 11H7C7 13.7614 9.23858 16 12 16C14.7614 16 17 13.7614 17 11H16Z" fill="currentColor"/>
                <rect x="11.5" y="16" width="1" height="2" fill="currentColor"/>
              </svg>
            </button>

            {state === 'idle' && (
              <div className="status-text idle">
                {getStatusText()}
              </div>
            )}

            {state === 'recording' && (
              <>
                <div className="transcript-panel">
                  <div className="mask-top"></div>
                  <div className="mask-bottom"></div>
                  <div
                    className="transcript-lines"
                    style={{
                      transform: getTranscriptTransform(),
                      transition: 'transform 0.3s ease-out',
                    }}
                  >
                    {transcript.map((line) => (
                      <div
                        key={line.id}
                        className="transcript-line typing-reveal"
                      >
                        <span className="transcript-speaker">Speaker {line.speaker}:</span>
                        <span className="transcript-text"> {line.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={getEqClass()}>
                  <div className="bar bar-1"></div>
                  <div className="bar bar-2"></div>
                  <div className="bar bar-3"></div>
                </div>
              </>
            )}

            {/* VisionOS Toast Notification */}
            {showVisionToast && (
              <div className="visionos-toast">
                <div className="visionos-toast-content">
                  <div className="visionos-toast-title">Meeting processed</div>
                  <div className="visionos-toast-desc">Summarizing...</div>
                </div>
              </div>
            )}

            {/* Email Notification */}
            {showEmailNotif && (
              <div className="email-notification">
                <div className="notif-icon email-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="#007AFF"/>
                  </svg>
                </div>
                <div className="notif-content">
                  <div className="notif-title">InOneButton</div>
                  <div className="notif-desc">New meeting summary received</div>
                </div>
              </div>
            )}

            {/* Slack Notification */}
            {showSlackNotif && (
              <div className="slack-notification">
                <div className="notif-icon slack-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M6 15C6 16.1 5.1 17 4 17C2.9 17 2 16.1 2 15C2 13.9 2.9 13 4 13H6V15ZM7 15C7 13.9 7.9 13 9 13C10.1 13 11 13.9 11 15V20C11 21.1 10.1 22 9 22C7.9 22 7 21.1 7 20V15Z" fill="#E01E5A"/>
                    <path d="M9 6C7.9 6 7 5.1 7 4C7 2.9 7.9 2 9 2C10.1 2 11 2.9 11 4V6H9ZM9 7C10.1 7 11 7.9 11 9C11 10.1 10.1 11 9 11H4C2.9 11 2 10.1 2 9C2 7.9 2.9 7 4 7H9Z" fill="#36C5F0"/>
                    <path d="M18 9C18 7.9 18.9 7 20 7C21.1 7 22 7.9 22 9C22 10.1 21.1 11 20 11H18V9ZM17 9C17 10.1 16.1 11 15 11C13.9 11 13 10.1 13 9V4C13 2.9 13.9 2 15 2C16.1 2 17 2.9 17 4V9Z" fill="#2EB67D"/>
                    <path d="M15 18C16.1 18 17 18.9 17 20C17 21.1 16.1 22 15 22C13.9 22 13 21.1 13 20V18H15ZM15 17C13.9 17 13 16.1 13 15C13 13.9 13.9 13 15 13H20C21.1 13 22 13.9 22 15C22 16.1 21.1 17 20 17H15Z" fill="#ECB22E"/>
                  </svg>
                </div>
                <div className="notif-content">
                  <div className="notif-title">InOneButton</div>
                  <div className="notif-desc">Posted in #meeting-notes</div>
                </div>
              </div>
            )}

            {/* Email Badge */}
            {showEmailBadge && (
              <div className="badge email-badge">
                Email sent ✓
              </div>
            )}

            {/* Slack Badge */}
            {showSlackBadge && (
              <div className="badge slack-badge">
                Slack posted ✓
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PhoneMockup;
