import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { THEME } from '../styles/theme';

export const Scene5Forecasting: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const containerScale = spring({ frame, fps, config: THEME.springs.snappy });
  const chartProgress = interpolate(frame, [15, 80], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

  // Key metrics springs
  const m1 = spring({ frame: frame - 40, fps, config: THEME.springs.bouncy });
  const m2 = spring({ frame: frame - 55, fps, config: THEME.springs.bouncy });
  const m3 = spring({ frame: frame - 70, fps, config: THEME.springs.bouncy });

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
      }}
    >
      {/* Tag */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          background: 'rgba(6, 182, 212, 0.15)',
          border: '1px solid rgba(6, 182, 212, 0.4)',
          color: '#22D3EE',
          padding: '8px 22px',
          borderRadius: 999,
          fontSize: 16,
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: 20,
        }}
      >
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#06B6D4', boxShadow: '0 0 10px #06B6D4' }} />
        Capability 04 • Predictive Revenue Forecasting
      </div>

      <h2
        style={{
          fontFamily: THEME.fonts.heading,
          fontSize: 50,
          fontWeight: 800,
          color: THEME.colors.textPrimary,
          letterSpacing: '-0.03em',
          marginBottom: 32,
          textAlign: 'center',
        }}
      >
        Predictable Revenue & 3x Accelerated Cycles
      </h2>

      <div
        style={{
          width: '100%',
          maxWidth: 1080,
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr',
          gap: 24,
          transform: `scale(${containerScale})`,
        }}
      >
        {/* Left: Animated SVG Revenue Chart */}
        <div
          style={{
            background: 'rgba(15, 23, 42, 0.9)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: 20,
            padding: '28px 32px',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div>
              <span style={{ fontSize: 13, color: '#94A3B8', textTransform: 'uppercase', fontWeight: 600 }}>Closed Revenue Growth</span>
              <div style={{ fontSize: 26, fontWeight: 800, color: '#FFFFFF', marginTop: 2 }}>$284,500 <span style={{ fontSize: 14, color: '#34D399', fontWeight: 700 }}>+42.8%</span></div>
            </div>
            <span style={{ fontSize: 12, background: 'rgba(16, 185, 129, 0.2)', color: '#34D399', padding: '4px 10px', borderRadius: 6, fontWeight: 700 }}>
              AI ACCELERATED
            </span>
          </div>

          {/* SVG Chart */}
          <svg width="100%" height="160" viewBox="0 0 500 160" fill="none">
            <defs>
              <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="160" gradientUnits="userSpaceOnUse">
                <stop stopColor="#3B82F6" stopOpacity="0.4" />
                <stop offset="1" stopColor="#3B82F6" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Grid horizontal lines */}
            <line x1="0" y1="40" x2="500" y2="40" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
            <line x1="0" y1="90" x2="500" y2="90" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
            <line x1="0" y1="140" x2="500" y2="140" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />

            {/* Area Fill */}
            <path
              d={`M0 140 Q 120 120, 240 70 T 500 20 L 500 160 L 0 160 Z`}
              fill="url(#chartGrad)"
              opacity={chartProgress}
            />

            {/* Trendline */}
            <path
              d={`M0 140 Q 120 120, 240 70 T 500 20`}
              stroke="#3B82F6"
              strokeWidth="4"
              strokeDasharray="600"
              strokeDashoffset={600 * (1 - chartProgress)}
              strokeLinecap="round"
            />

            {/* Glowing Peak Dot */}
            {chartProgress >= 0.9 && (
              <circle cx="500" cy="20" r="6" fill="#38BDF8" style={{ filter: 'drop-shadow(0 0 8px #38BDF8)' }} />
            )}
          </svg>
        </div>

        {/* Right: 3 Metric Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div
            style={{
              background: 'rgba(15, 23, 42, 0.9)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 16,
              padding: '18px 22px',
              transform: `scale(${m1})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <span style={{ fontSize: 12, color: '#94A3B8', fontWeight: 600 }}>WIN RATE IMPROVEMENT</span>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#34D399' }}>+42%</div>
            </div>
            <div style={{ fontSize: 24 }}>🚀</div>
          </div>

          <div
            style={{
              background: 'rgba(15, 23, 42, 0.9)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 16,
              padding: '18px 22px',
              transform: `scale(${m2})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <span style={{ fontSize: 12, color: '#94A3B8', fontWeight: 600 }}>SALES CYCLE VELOCITY</span>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#60A5FA' }}>3.2x Faster</div>
            </div>
            <div style={{ fontSize: 24 }}>⚡</div>
          </div>

          <div
            style={{
              background: 'rgba(15, 23, 42, 0.9)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 16,
              padding: '18px 22px',
              transform: `scale(${m3})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <span style={{ fontSize: 12, color: '#94A3B8', fontWeight: 600 }}>DATA & PIPELINE ACCURACY</span>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#A78BFA' }}>99.9%</div>
            </div>
            <div style={{ fontSize: 24 }}>🎯</div>
          </div>
        </div>
      </div>
    </div>
  );
};
