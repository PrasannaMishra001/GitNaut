import React, { useState, useEffect, useRef } from 'react';

const bootSequence = [
  'Initializing terminal environment...',
  'Loading system modules...',
  'Mounting file systems...',
  'Starting network services...',
  'Loading GitNaut data...',
  'Configuring user interface...',
  'Establishing secure connection...',
  'Terminal ready!'
];

export const LoadingScreen: React.FC = () => {
  const [stage, setStage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [bootText, setBootText] = useState<string[]>([]);
  const progressRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 15 + 5;
        return Math.min(newProgress, 100);
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progressRef.current) {
      progressRef.current.style.setProperty('--progress-width', `${progress}%`);
    }
  }, [progress]);

  useEffect(() => {
    const textInterval = setInterval(() => {
      if (stage < bootSequence.length) {
        setBootText(prev => [...prev, bootSequence[stage]]);
        setStage(prev => prev + 1);
      }
    }, 350);

    return () => clearInterval(textInterval);
  }, [stage]);

  return (
    <div className="min-h-screen bg-terminal text-terminal-text flex items-center justify-center">
      <div className="text-center max-w-4xl px-4">
        {/* Boot Sequence */}
        <div className="mb-8 text-left bg-terminal-hover p-6 rounded-lg border border-terminal-border max-w-2xl mx-auto">
          <div className="text-terminal-accent mb-4 font-bold">
            gitnaut@terminal:~$ boot --verbose
          </div>
          <div className="space-y-1 text-sm font-mono">
            {bootText.map((text, index) => (
              <div key={index} className="flex items-center space-x-2">
                <span className="text-terminal-success">✓</span>
                <span className="text-terminal-text">{text}</span>
                {index === bootText.length - 1 && (
                  <span className="blinking-cursor text-terminal-accent">_</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2 text-sm">
            <span className="text-terminal-muted">Loading Progress</span>
            <span className="text-terminal-accent">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-terminal-border rounded-full h-3 overflow-hidden">
            <div ref={progressRef} className="loading-bar-fill" />
          </div>
          <div className="mt-2 flex justify-between text-xs text-terminal-muted">
            <span>0%</span>
            <span>25%</span>
            <span>50%</span>
            <span>75%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Animated Loading Dots */}
        <div className="loading-dots flex justify-center space-x-1 mb-4">
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* System Info */}
        <div className="text-xs text-terminal-muted space-y-1">
          <div>GitNaut v0.1.0</div>
          <div>Built with React + TypeScript</div>
          <div>Initializing interactive shell...</div>
        </div>
      </div>
    </div>
  );
};
