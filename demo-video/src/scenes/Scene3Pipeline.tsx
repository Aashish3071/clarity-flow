import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { THEME } from '../styles/theme';

export const Scene3Pipeline: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance
  const boardScale = spring({ frame, fps, config: THEME.springs.snappy });

  // Cursor drag timeline
  // Frame 40-70: Cursor moves to card in Column 3
  // Frame 70-130: Drag card from Column 3 to Column 4
  const cursorX = interpolate(frame, [30, 60, 80, 130], [200, 520, 520, 780], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  const cursorY = interpolate(frame, [30, 60, 80, 130], [500, 360, 360, 360], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  const isDragging = frame >= 70 && frame <= 130;

  // Card movement
  const cardX = interpolate(frame, [70, 130], [0, 260], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  const cardLift = isDragging ? 10 : 0;

  // Revenue counter jump at frame 130
  const revCounter = Math.round(
    interpolate(frame, [130, 180], [199500, 284500], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' })
  );

  const winCelebration = spring({ frame: frame - 130, fps, config: THEME.springs.bouncy });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 60px',
        position: 'relative',
        zIndex: 10,
      }}
    >
      {/* Header Badge */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          background: 'rgba(16, 185, 129, 0.15)',
          border: '1px solid rgba(16, 185, 129, 0.4)',
          color: '#34D399',
          padding: '8px 22px',
          borderRadius: 999,
          fontSize: 16,
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: 16,
        }}
      >
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981', boxShadow: '0 0 10px #10B981' }} />
        Capability 02 • High Velocity Sales Pipeline
      </div>

      {/* Title & Live Metric */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', maxWidth: 1200, marginBottom: 28 }}>
        <h2 style={{ fontFamily: THEME.fonts.heading, fontSize: 44, fontWeight: 800, color: THEME.colors.textPrimary, margin: 0 }}>
          Visual Deal Tracking & Automated Stage Gates
        </h2>

        <div
          style={{
            background: 'rgba(15, 23, 42, 0.9)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: 16,
            padding: '12px 24px',
            textAlign: 'right',
            boxShadow: frame >= 130 ? '0 0 30px rgba(16, 185, 129, 0.4)' : 'none',
            transform: frame >= 130 ? `scale(${1 + winCelebration * 0.05})` : 'scale(1)',
          }}
        >
          <span style={{ fontSize: 12, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
            Closed Revenue (MTD)
          </span>
          <div style={{ fontFamily: THEME.fonts.heading, fontSize: 28, fontWeight: 800, color: frame >= 130 ? '#34D399' : '#FFFFFF' }}>
            ${revCounter.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Kanban Pipeline Columns */}
      <div
        style={{
          width: '100%',
          maxWidth: 1200,
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 18,
          transform: `scale(${boardScale})`,
        }}
      >
        {/* Col 1: Discovery */}
        <div style={{ background: 'rgba(15, 23, 42, 0.75)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 18, padding: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#94A3B8' }}>Discovery (3)</span>
            <span style={{ fontSize: 12, color: '#64748B' }}>$62k</span>
          </div>
          <div style={{ background: '#1E293B', borderRadius: 12, padding: 14, border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#FFFFFF' }}>Meridian Tech</div>
            <div style={{ fontSize: 13, color: '#60A5FA', marginTop: 4, fontWeight: 600 }}>$24,000</div>
          </div>
        </div>

        {/* Col 2: Demo Scheduled */}
        <div style={{ background: 'rgba(15, 23, 42, 0.75)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 18, padding: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#60A5FA' }}>Demo Scheduled (2)</span>
            <span style={{ fontSize: 12, color: '#64748B' }}>$90k</span>
          </div>
          <div style={{ background: '#1E293B', borderRadius: 12, padding: 14, border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#FFFFFF' }}>BrightEdge Labs</div>
            <div style={{ fontSize: 13, color: '#60A5FA', marginTop: 4, fontWeight: 600 }}>$45,000</div>
          </div>
        </div>

        {/* Col 3: Proposal Sent */}
        <div style={{ background: 'rgba(15, 23, 42, 0.75)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 18, padding: 16, position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#A78BFA' }}>Proposal Sent</span>
            <span style={{ fontSize: 12, color: '#64748B' }}>$85k</span>
          </div>

          {/* Draggable Apex MFG Deal Card */}
          <div
            style={{
              background: '#1E293B',
              borderRadius: 14,
              padding: 16,
              border: isDragging ? '2px solid #3B82F6' : '1px solid rgba(255,255,255,0.12)',
              boxShadow: isDragging ? '0 25px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(59, 130, 246, 0.5)' : '0 10px 20px rgba(0,0,0,0.3)',
              transform: `translate(${cardX}px, -${cardLift}px) scale(${isDragging ? 1.05 : 1})`,
              zIndex: isDragging ? 50 : 1,
              transition: 'border 0.2s',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: '#FFFFFF' }}>Apex MFG Corp</div>
              <span style={{ fontSize: 10, fontWeight: 700, background: 'rgba(16, 185, 129, 0.2)', color: '#34D399', padding: '2px 8px', borderRadius: 4 }}>
                Score: 96
              </span>
            </div>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#34D399', marginTop: 8 }}>$85,000 ARR</div>
            <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 4 }}>Decision: VP of Ops</div>
          </div>
        </div>

        {/* Col 4: Closed Won */}
        <div
          style={{
            background: frame >= 130 ? 'rgba(16, 185, 129, 0.12)' : 'rgba(15, 23, 42, 0.75)',
            border: frame >= 130 ? '1px solid rgba(16, 185, 129, 0.5)' : '1px solid rgba(255,255,255,0.08)',
            borderRadius: 18,
            padding: 16,
            transition: 'all 0.3s',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#34D399' }}>Closed Won 🏆</span>
            <span style={{ fontSize: 12, color: '#34D399', fontWeight: 700 }}>+1 New</span>
          </div>

          <div style={{ minHeight: 90, border: '2px dashed rgba(16, 185, 129, 0.3)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981', fontSize: 12, fontWeight: 600 }}>
            {frame >= 130 ? '🎉 Deal Won Successfully!' : 'Drop won deal here'}
          </div>
        </div>
      </div>

      {/* Floating Animated Cursor */}
      {frame <= 150 && (
        <div
          style={{
            position: 'absolute',
            left: cursorX,
            top: cursorY,
            pointerEvents: 'none',
            zIndex: 100,
            filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.5))',
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z" fill="#3B82F6" stroke="#FFFFFF" strokeWidth="1.5" />
          </svg>
        </div>
      )}
    </div>
  );
};
