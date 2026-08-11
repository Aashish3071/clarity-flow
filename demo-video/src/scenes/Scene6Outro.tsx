import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { THEME } from '../styles/theme';
import { Logo } from '../components/Logo';

export const Scene6Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({ frame, fps, config: THEME.springs.bouncy });
  const ctaScale = spring({ frame: frame - 25, fps, config: THEME.springs.snappy });
  const pulse = interpolate(Math.sin(frame / 12), [-1, 1], [0.97, 1.03]);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 80px',
        position: 'relative',
        zIndex: 10,
        textAlign: 'center',
      }}
    >
      <div style={{ transform: `scale(${logoScale})`, marginBottom: 32 }}>
        <Logo size={96} subtitle="SMART CRM" />
      </div>

      <h2
        style={{
          fontFamily: THEME.fonts.heading,
          fontSize: 64,
          fontWeight: 800,
          color: THEME.colors.textPrimary,
          letterSpacing: '-0.03em',
          marginBottom: 16,
          lineHeight: 1.15,
        }}
      >
        Grow Smarter. <br />
        <span
          style={{
            background: THEME.colors.primaryGradient,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Close Deals Faster.
        </span>
      </h2>

      <p
        style={{
          fontFamily: THEME.fonts.heading,
          fontSize: 22,
          color: THEME.colors.textSecondary,
          marginBottom: 40,
          maxWidth: 640,
        }}
      >
        Transform your sales pipeline with AI-driven qualification and autonomous workflows today.
      </p>

      {/* CTA Button */}
      <div
        style={{
          transform: `scale(${ctaScale * pulse})`,
          background: THEME.colors.primaryGradient,
          boxShadow: '0 20px 40px -10px rgba(37, 99, 235, 0.6), 0 0 30px rgba(79, 70, 229, 0.4)',
          padding: '20px 48px',
          borderRadius: 16,
          color: '#FFFFFF',
          fontSize: 22,
          fontWeight: 800,
          fontFamily: THEME.fonts.heading,
          letterSpacing: '-0.01em',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          border: '1px solid rgba(255, 255, 255, 0.3)',
          marginBottom: 28,
        }}
      >
        <span>Schedule Your Live CRM Demo</span>
        <span>→</span>
      </div>

      <div
        style={{
          fontFamily: THEME.fonts.heading,
          fontSize: 16,
          fontWeight: 600,
          color: THEME.colors.primaryLight,
          letterSpacing: '0.05em',
        }}
      >
        credstacks.com/crm
      </div>
    </div>
  );
};
