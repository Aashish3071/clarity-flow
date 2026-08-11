import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { THEME } from '../styles/theme';

export const Scene4AiCopilot: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const windowScale = spring({ frame, fps, config: THEME.springs.snappy });

  // Typing simulation
  const fullText = "Hi Mark, following up on Apex's 250-user enterprise requirements. Credstacks CRM natively integrates with your ERP ledger and automates your pipeline stages. Are you free tomorrow at 2:00 PM for our solutions architect walkthrough?";
  const typedLength = Math.min(Math.floor(interpolate(frame, [25, 140], [0, fullText.length], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' })), fullText.length);
  const currentText = fullText.substring(0, typedLength);

  // Auto-schedule pop
  const scheduleCard = spring({ frame: frame - 150, fps, config: THEME.springs.bouncy });

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
          background: 'rgba(139, 92, 246, 0.15)',
          border: '1px solid rgba(139, 92, 246, 0.4)',
          color: '#A78BFA',
          padding: '8px 22px',
          borderRadius: 999,
          fontSize: 16,
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: 20,
        }}
      >
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#8B5CF6', boxShadow: '0 0 10px #8B5CF6' }} />
        Capability 03 • Autonomous AI Sales Copilot
      </div>

      <h2
        style={{
          fontFamily: THEME.fonts.heading,
          fontSize: 48,
          fontWeight: 800,
          color: THEME.colors.textPrimary,
          letterSpacing: '-0.03em',
          marginBottom: 32,
          textAlign: 'center',
        }}
      >
        Personalized AI Follow-Ups & Automated Booking
      </h2>

      {/* AI Copilot Card */}
      <div
        style={{
          width: '100%',
          maxWidth: 980,
          background: 'rgba(15, 23, 42, 0.95)',
          border: '1px solid rgba(139, 92, 246, 0.3)',
          boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.7), 0 0 40px rgba(139, 92, 246, 0.15)',
          borderRadius: 22,
          padding: '32px 40px',
          transform: `scale(${windowScale})`,
          backdropFilter: 'blur(24px)',
        }}
      >
        {/* Copilot Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: 16, marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                fontWeight: 800,
                fontSize: 16,
              }}
            >
              AI
            </div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#FFFFFF' }}>AI Contextual Draft Generator</div>
              <div style={{ fontSize: 12, color: '#94A3B8' }}>Recipient: Mark Vance (VP Ops @ Apex MFG)</div>
            </div>
          </div>
          <span style={{ fontSize: 12, fontWeight: 700, background: 'rgba(59, 130, 246, 0.2)', color: '#60A5FA', padding: '4px 12px', borderRadius: 6 }}>
            ANALYZED RECENT CHATS & DEAL STAGE
          </span>
        </div>

        {/* Dynamic Typing Body */}
        <div
          style={{
            background: '#1E293B',
            borderRadius: 14,
            padding: '22px 26px',
            fontFamily: THEME.fonts.heading,
            fontSize: 18,
            lineHeight: 1.6,
            color: '#E2E8F0',
            minHeight: 110,
            border: '1px solid rgba(255, 255, 255, 0.06)',
            marginBottom: 20,
          }}
        >
          {currentText}
          {frame < 140 && <span style={{ borderLeft: '2px solid #60A5FA', marginLeft: 2, animation: 'blink 1s infinite' }}>&nbsp;</span>}
        </div>

        {/* Auto Scheduled Meeting Result */}
        {frame >= 150 && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid rgba(16, 185, 129, 0.4)',
              borderRadius: 14,
              padding: '16px 24px',
              transform: `scale(${scheduleCard})`,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{ fontSize: 24 }}>📅</span>
              <div>
                <div style={{ fontSize: 16, fontWeight: 800, color: '#34D399' }}>Meeting Confirmed Automatically</div>
                <div style={{ fontSize: 13, color: '#94A3B8' }}>Thursday, Aug 8 @ 2:00 PM EST • Zoom Link Sent</div>
              </div>
            </div>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#10B981', background: 'rgba(16, 185, 129, 0.2)', padding: '6px 14px', borderRadius: 8 }}>
              CALENDAR LOCKED
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
