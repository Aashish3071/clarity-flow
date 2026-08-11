import React from 'react';
import { Sequence } from 'remotion';
import { GlowBackground } from './components/GlowBackground';
import { Scene1Intro } from './scenes/Scene1Intro';
import { Scene2LeadScoring } from './scenes/Scene2LeadScoring';
import { Scene3Pipeline } from './scenes/Scene3Pipeline';
import { Scene4AiCopilot } from './scenes/Scene4AiCopilot';
import { Scene5Forecasting } from './scenes/Scene5Forecasting';
import { Scene6Outro } from './scenes/Scene6Outro';

export const CredstacksCrmDemo: React.FC = () => {
  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        backgroundColor: '#070B19',
        fontFamily: 'Inter, -apple-system, sans-serif',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Persistent Animated Ambient Particle & Mesh Glow */}
      <GlowBackground />

      {/* Top Floating Logo Watermark (During product scenes) */}
      <Sequence from={180} durationInFrames={930}>
        <div
          style={{
            position: 'absolute',
            top: 40,
            left: 60,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            zIndex: 50,
            opacity: 0.85,
          }}
        >
          <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
            <defs>
              <linearGradient id="wmGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                <stop stopColor="#4F46E5" />
                <stop offset="1" stopColor="#06B6D4" />
              </linearGradient>
            </defs>
            <rect x="12" y="1" width="27" height="11" rx="3.5" fill="url(#wmGrad)" fillOpacity="0.4" />
            <rect x="6" y="15" width="27" height="11" rx="3.5" fill="url(#wmGrad)" fillOpacity="0.75" />
            <rect x="0" y="29" width="27" height="11" rx="3.5" fill="url(#wmGrad)" />
          </svg>
          <span style={{ fontSize: 18, fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
            Credstacks <span style={{ color: '#60A5FA', fontSize: 13, fontWeight: 600 }}>SMART CRM</span>
          </span>
        </div>
      </Sequence>

      {/* ── SCENE 1: HOOK & INTRO (0 - 180 frames) ──────────────── */}
      <Sequence from={0} durationInFrames={180}>
        <Scene1Intro />
      </Sequence>

      {/* ── SCENE 2: LEAD CAPTURE & AI SCORING (180 - 450 frames) ─── */}
      <Sequence from={180} durationInFrames={270}>
        <Scene2LeadScoring />
      </Sequence>

      {/* ── SCENE 3: KANBAN SALES PIPELINE (450 - 720 frames) ────── */}
      <Sequence from={450} durationInFrames={270}>
        <Scene3Pipeline />
      </Sequence>

      {/* ── SCENE 4: AUTONOMOUS AI COPILOT (720 - 960 frames) ────── */}
      <Sequence from={720} durationInFrames={240}>
        <Scene4AiCopilot />
      </Sequence>

      {/* ── SCENE 5: REVENUE FORECASTING (960 - 1110 frames) ──────── */}
      <Sequence from={960} durationInFrames={150}>
        <Scene5Forecasting />
      </Sequence>

      {/* ── SCENE 6: OUTRO & CALL TO ACTION (1110 - 1200 frames) ──── */}
      <Sequence from={1110} durationInFrames={90}>
        <Scene6Outro />
      </Sequence>
    </div>
  );
};
