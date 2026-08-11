import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { THEME } from '../styles/theme';

interface LogoProps {
  size?: number;
  showText?: boolean;
  subtitle?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 48, showText = true, subtitle }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame,
    fps,
    config: THEME.springs.bouncy,
  });

  const glowPulse = interpolate(Math.sin(frame / 15), [-1, 1], [0.8, 1.2]);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: size * 0.35,
        transform: `scale(${scale})`,
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          filter: `drop-shadow(0 0 ${16 * glowPulse}px rgba(79, 70, 229, 0.6))`,
        }}
      >
        <defs>
          <linearGradient id="logoGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#4F46E5" />
            <stop offset="0.5" stopColor="#2563EB" />
            <stop offset="1" stopColor="#06B6D4" />
          </linearGradient>
        </defs>
        <rect x="12" y="1" width="27" height="11" rx="3.5" fill="url(#logoGrad)" fillOpacity="0.4" />
        <rect x="6" y="15" width="27" height="11" rx="3.5" fill="url(#logoGrad)" fillOpacity="0.75" />
        <rect x="0" y="29" width="27" height="11" rx="3.5" fill="url(#logoGrad)" />
      </svg>

      {showText && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span
            style={{
              fontFamily: THEME.fonts.heading,
              fontSize: size * 0.65,
              fontWeight: 800,
              color: THEME.colors.textPrimary,
              letterSpacing: '-0.03em',
              lineHeight: 1,
            }}
          >
            Credstacks
          </span>
          {subtitle && (
            <span
              style={{
                fontFamily: THEME.fonts.heading,
                fontSize: size * 0.28,
                fontWeight: 600,
                color: THEME.colors.primaryLight,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginTop: 4,
              }}
            >
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
