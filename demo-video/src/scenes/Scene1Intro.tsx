import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { THEME } from '../styles/theme';
import { Logo } from '../components/Logo';

export const Scene1Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance springs
  const badgeScale = spring({ frame: frame - 5, fps, config: THEME.springs.snappy });
  const titleY = interpolate(frame, [10, 35], [40, 0], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  const titleOpacity = interpolate(frame, [10, 30], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

  // Floating problem cards entrance
  const card1Progress = spring({ frame: frame - 40, fps, config: THEME.springs.snappy });
  const card2Progress = spring({ frame: frame - 55, fps, config: THEME.springs.snappy });
  const card3Progress = spring({ frame: frame - 70, fps, config: THEME.springs.snappy });

  // Solution Reveal Transition (at frame 105)
  const solutionEntrance = spring({ frame: frame - 105, fps, config: THEME.springs.bouncy });
  const fadeOutProblems = interpolate(frame, [95, 115], [1, 0], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 10,
        padding: '0 80px',
        textAlign: 'center',
      }}
    >
      {/* PHASE A: THE PROBLEM (Frames 0 - 105) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: fadeOutProblems,
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            transform: `scale(${badgeScale})`,
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            color: '#F87171',
            padding: '8px 20px',
            borderRadius: 999,
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: 28,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#EF4444' }} />
          The Revenue Bottleneck
        </div>

        <h1
          style={{
            fontFamily: THEME.fonts.heading,
            fontSize: 64,
            fontWeight: 800,
            color: THEME.colors.textPrimary,
            letterSpacing: '-0.03em',
            lineHeight: 1.15,
            maxWidth: 1100,
            transform: `translateY(${titleY}px)`,
            opacity: titleOpacity,
            marginBottom: 44,
          }}
        >
          Are your sales deals lost in <br />
          <span
            style={{
              background: 'linear-gradient(135deg, #F87171 0%, #F43F5E 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            disconnected spreadsheets & emails?
          </span>
        </h1>

        {/* 3 Floating Pain Point Cards */}
        <div style={{ display: 'flex', gap: 24, maxWidth: 1100, width: '100%', justifyContent: 'center' }}>
          {[
            { text: 'Leads falling through the cracks', delay: card1Progress, icon: '⚠️' },
            { text: 'Manual data entry eating 4+ hrs/day', delay: card2Progress, icon: '⏳' },
            { text: 'Zero real-time revenue forecasting', delay: card3Progress, icon: '📉' },
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                flex: 1,
                background: 'rgba(15, 23, 42, 0.85)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(16px)',
                borderRadius: 20,
                padding: '24px 28px',
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                transform: `scale(${item.delay}) translateY(${interpolate(item.delay, [0, 1], [30, 0])}px)`,
                opacity: item.delay,
                boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.5)',
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: 'rgba(239, 68, 68, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 22,
                  flexShrink: 0,
                }}
              >
                {item.icon}
              </div>
              <span
                style={{
                  fontFamily: THEME.fonts.heading,
                  fontSize: 19,
                  fontWeight: 600,
                  color: THEME.colors.textSecondary,
                  textAlign: 'left',
                }}
              >
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* PHASE B: THE SOLUTION REVEAL (Frames 105 - 180) */}
      {frame >= 95 && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transform: `scale(${solutionEntrance})`,
            opacity: solutionEntrance,
          }}
        >
          <div style={{ marginBottom: 28 }}>
            <Logo size={72} subtitle="SMART CRM" />
          </div>

          <h2
            style={{
              fontFamily: THEME.fonts.heading,
              fontSize: 68,
              fontWeight: 800,
              color: THEME.colors.textPrimary,
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              marginBottom: 20,
            }}
          >
            Close Deals <br />
            <span
              style={{
                background: THEME.colors.primaryGradient,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              3x Faster with AI Automation.
            </span>
          </h2>

          <p
            style={{
              fontFamily: THEME.fonts.heading,
              fontSize: 24,
              color: THEME.colors.textSecondary,
              maxWidth: 820,
              lineHeight: 1.5,
            }}
          >
            Intelligent lead scoring, visual sales pipelines, and autonomous AI copilot in one unified suite.
          </p>
        </div>
      )}
    </div>
  );
};
