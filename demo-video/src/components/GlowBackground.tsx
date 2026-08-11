import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { THEME } from '../styles/theme';

export const GlowBackground: React.FC = () => {
  const frame = useCurrentFrame();

  const glow1X = interpolate(Math.sin(frame / 45), [-1, 1], [20, 45]);
  const glow1Y = interpolate(Math.cos(frame / 50), [-1, 1], [15, 40]);
  const glow2X = interpolate(Math.cos(frame / 60), [-1, 1], [60, 85]);
  const glow2Y = interpolate(Math.sin(frame / 55), [-1, 1], [50, 80]);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: THEME.colors.bgDark,
        overflow: 'hidden',
        zIndex: 0,
      }}
    >
      {/* Background Mesh Gradients */}
      <div
        style={{
          position: 'absolute',
          top: `${glow1Y}%`,
          left: `${glow1X}%`,
          width: 700,
          height: 700,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(79, 70, 229, 0.28) 0%, rgba(37, 99, 235, 0.1) 50%, transparent 70%)',
          filter: 'blur(90px)',
          transform: 'translate(-50%, -50%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: `${glow2Y}%`,
          left: `${glow2X}%`,
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.22) 0%, rgba(16, 185, 129, 0.08) 50%, transparent 70%)',
          filter: 'blur(100px)',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Grid Pattern */}
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0.12,
        }}
      >
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="rgba(255, 255, 255, 0.4)"
              strokeWidth="0.75"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
};
