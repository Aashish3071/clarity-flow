import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { THEME } from '../styles/theme';

export const Scene2LeadScoring: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance
  const cardEntrance = spring({ frame, fps, config: THEME.springs.snappy });
  const scanProgress = interpolate(frame, [15, 75], [0, 100], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  const scoreCounter = Math.min(Math.round(interpolate(frame, [45, 110], [0, 96], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' })), 96);

  // Meter springs
  const meter1 = spring({ frame: frame - 65, fps, config: THEME.springs.snappy });
  const meter2 = spring({ frame: frame - 80, fps, config: THEME.springs.snappy });
  const meter3 = spring({ frame: frame - 95, fps, config: THEME.springs.snappy });

  // Routing badge pop
  const routingBadge = spring({ frame: frame - 120, fps, config: THEME.springs.bouncy });

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
      {/* Header Tag */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          background: 'rgba(37, 99, 235, 0.15)',
          border: '1px solid rgba(37, 99, 235, 0.4)',
          color: '#60A5FA',
          padding: '8px 22px',
          borderRadius: 999,
          fontSize: 16,
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: 20,
        }}
      >
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#3B82F6', boxShadow: '0 0 10px #3B82F6' }} />
        Capability 01 • Omnichannel AI Lead Intelligence
      </div>

      <h2
        style={{
          fontFamily: THEME.fonts.heading,
          fontSize: 52,
          fontWeight: 800,
          color: THEME.colors.textPrimary,
          letterSpacing: '-0.03em',
          marginBottom: 36,
          textAlign: 'center',
        }}
      >
        Instant Lead Qualification & Predictive Scoring
      </h2>

      {/* Main Interactive Lead Card */}
      <div
        style={{
          width: '100%',
          maxWidth: 960,
          background: 'rgba(15, 23, 42, 0.92)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.6), 0 0 40px rgba(37, 99, 235, 0.15)',
          borderRadius: 24,
          padding: '36px 44px',
          transform: `scale(${cardEntrance})`,
          backdropFilter: 'blur(20px)',
        }}
      >
        {/* Card Top: Lead Info & AI Score Ring */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 18,
                background: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 24,
                fontWeight: 800,
                color: '#60A5FA',
              }}
            >
              AM
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <h3 style={{ fontFamily: THEME.fonts.heading, fontSize: 26, fontWeight: 700, color: '#FFFFFF', margin: 0 }}>
                  Apex Manufacturing Corp
                </h3>
                <span
                  style={{
                    background: 'rgba(16, 185, 129, 0.2)',
                    color: '#34D399',
                    border: '1px solid rgba(16, 185, 129, 0.4)',
                    padding: '3px 12px',
                    borderRadius: 999,
                    fontSize: 12,
                    fontWeight: 700,
                  }}
                >
                  NEW INQUIRY
                </span>
              </div>
              <p style={{ fontFamily: THEME.fonts.heading, fontSize: 16, color: '#94A3B8', marginTop: 4, margin: 0 }}>
                Deal Potential: <strong style={{ color: '#FFFFFF' }}>$85,000 ARR</strong> • 250 Employees • Enterprise Tier
              </p>
            </div>
          </div>

          {/* AI Score Radial Counter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: 13, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
                AI Lead Score
              </span>
              <div style={{ fontSize: 14, color: '#34D399', fontWeight: 700 }}>
                🔥 Very High Intent
              </div>
            </div>
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: 'conic-gradient(#10B981 ' + (scoreCounter * 3.6) + 'deg, rgba(255, 255, 255, 0.08) 0deg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 6,
                boxShadow: '0 0 20px rgba(16, 185, 129, 0.3)',
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  background: '#0F172A',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: THEME.fonts.heading,
                  fontSize: 26,
                  fontWeight: 800,
                  color: '#FFFFFF',
                }}
              >
                {scoreCounter}
              </div>
            </div>
          </div>
        </div>

        {/* AI Analysis Meters */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 16,
            background: 'rgba(30, 41, 59, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            borderRadius: 16,
            padding: '20px 24px',
            marginBottom: 24,
          }}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 8, color: '#94A3B8' }}>
              <span>Budget Authority</span>
              <strong style={{ color: '#FFFFFF' }}>100%</strong>
            </div>
            <div style={{ height: 8, background: 'rgba(255, 255, 255, 0.1)', borderRadius: 999, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${meter1 * 100}%`, background: '#3B82F6', borderRadius: 999 }} />
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 8, color: '#94A3B8' }}>
              <span>Decision Maker</span>
              <strong style={{ color: '#FFFFFF' }}>VP Level</strong>
            </div>
            <div style={{ height: 8, background: 'rgba(255, 255, 255, 0.1)', borderRadius: 999, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${meter2 * 95}%`, background: '#10B981', borderRadius: 999 }} />
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 8, color: '#94A3B8' }}>
              <span>Timeline Urgency</span>
              <strong style={{ color: '#FFFFFF' }}>Immediate (Q3)</strong>
            </div>
            <div style={{ height: 8, background: 'rgba(255, 255, 255, 0.1)', borderRadius: 999, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${meter3 * 92}%`, background: '#8B5CF6', borderRadius: 999 }} />
            </div>
          </div>
        </div>

        {/* Bottom Routing Action */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            transform: `scale(${routingBadge})`,
            opacity: routingBadge,
            background: 'rgba(16, 185, 129, 0.12)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: 14,
            padding: '14px 20px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 18 }}>⚡</span>
            <span style={{ fontFamily: THEME.fonts.heading, fontSize: 15, fontWeight: 600, color: '#E2E8F0' }}>
              Automated Action: <strong style={{ color: '#34D399' }}>Auto-routed to Enterprise Account Exec: Sarah Jenkins</strong>
            </span>
          </div>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#34D399', background: 'rgba(16, 185, 129, 0.2)', padding: '4px 12px', borderRadius: 6 }}>
            INSTANT NOTIFICATION SENT
          </span>
        </div>
      </div>
    </div>
  );
};
