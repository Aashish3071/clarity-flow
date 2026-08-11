import React from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";

/* ============================================================
   DESIGN TOKENS
   ============================================================ */
const COLORS = {
  bg: "#0B132B",
  bgCard: "#1C2541",
  primary: "#2563EB",
  primaryLight: "#60A5FA",
  accent: "#0EA5E9",
  accentGreen: "#10B981",
  white: "#FFFFFF",
  gray100: "#F1F5F9",
  gray300: "#CBD5E1",
  gray400: "#94A3B8",
  gray600: "#475569",
  gray900: "#0F172A",
  gradientStart: "#2563EB",
  gradientEnd: "#0EA5E9",
};

const FONT = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

/* ============================================================
   UTILITY COMPONENTS
   ============================================================ */

const FadeIn: React.FC<{
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
}> = ({ children, delay = 0, duration = 20, direction = "up" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame - delay, [0, duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const offsets = { up: [40, 0], down: [-40, 0], left: [40, 0], right: [-40, 0], none: [0, 0] };
  const [from, to] = offsets[direction];

  const translate = interpolate(frame - delay, [0, duration], [from, to], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const prop = direction === "left" || direction === "right" ? "translateX" : "translateY";

  return (
    <div style={{ opacity, transform: `${prop}(${translate}px)` }}>
      {children}
    </div>
  );
};

const GlowOrb: React.FC<{
  color: string;
  size: number;
  x: string;
  y: string;
  delay?: number;
}> = ({ color, size, x, y, delay = 0 }) => {
  const frame = useCurrentFrame();
  const pulse = interpolate(
    Math.sin(((frame - delay) / 60) * Math.PI),
    [-1, 1],
    [0.4, 0.7]
  );

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        opacity: pulse,
        pointerEvents: "none",
        filter: "blur(40px)",
      }}
    />
  );
};

/* ============================================================
   SCENE 1: LOGO REVEAL (0-120 frames = 0-4s)
   ============================================================ */
const SceneLogoReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({ frame, fps, config: { damping: 12, stiffness: 80 } });

  const lineWidth = interpolate(frame, [30, 70], [0, 600], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const taglineOpacity = interpolate(frame, [60, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(170deg, ${COLORS.bg} 0%, ${COLORS.bgCard} 50%, ${COLORS.gray900} 100%)`,
        justifyContent: "center",
        alignItems: "center",
        fontFamily: FONT,
      }}
    >
      <GlowOrb color="rgba(37,99,235,0.15)" size={600} x="-10%" y="-20%" />
      <GlowOrb color="rgba(14,165,233,0.1)" size={500} x="60%" y="50%" delay={15} />

      <div style={{ textAlign: "center", transform: `scale(${logoScale})` }}>
        {/* Logo mark */}
        <div
          style={{
            width: 90,
            height: 90,
            borderRadius: 22,
            background: `linear-gradient(135deg, ${COLORS.gradientStart}, ${COLORS.gradientEnd})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 32px",
            boxShadow: "0 20px 60px rgba(37,99,235,0.4)",
          }}
        >
          <span style={{ fontSize: 44, fontWeight: 800, color: COLORS.white, letterSpacing: -2 }}>
            C
          </span>
        </div>

        {/* Brand name */}
        <h1
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: COLORS.white,
            letterSpacing: -3,
            margin: 0,
          }}
        >
          Credstacks
        </h1>

        {/* Gradient line */}
        <div
          style={{
            width: lineWidth,
            height: 3,
            background: `linear-gradient(90deg, ${COLORS.gradientStart}, ${COLORS.gradientEnd})`,
            margin: "20px auto",
            borderRadius: 2,
          }}
        />

        {/* Tagline */}
        <p
          style={{
            fontSize: 26,
            color: COLORS.gray400,
            fontWeight: 500,
            opacity: taglineOpacity,
            letterSpacing: 1,
          }}
        >
          Smart CRM
        </p>
      </div>
    </AbsoluteFill>
  );
};

/* ============================================================
   SCENE 2: PROBLEM STATEMENT (120-240 frames = 4-8s)
   ============================================================ */
const SceneProblem: React.FC = () => {
  const frame = useCurrentFrame();

  const problems = [
    "Scattered leads across spreadsheets",
    "Missed follow-ups costing deals",
    "No visibility into pipeline health",
    "Hours wasted on manual reporting",
  ];

  return (
    <AbsoluteFill
      style={{
        background: COLORS.white,
        justifyContent: "center",
        alignItems: "center",
        fontFamily: FONT,
        padding: 120,
      }}
    >
      <FadeIn delay={0} duration={15}>
        <p
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: COLORS.primary,
            textTransform: "uppercase",
            letterSpacing: 4,
            marginBottom: 16,
            textAlign: "center",
          }}
        >
          Sound Familiar?
        </p>
      </FadeIn>

      <FadeIn delay={5} duration={18}>
        <h2
          style={{
            fontSize: 56,
            fontWeight: 800,
            color: COLORS.gray900,
            textAlign: "center",
            lineHeight: 1.2,
            marginBottom: 56,
            letterSpacing: -2,
          }}
        >
          Your sales team deserves better.
        </h2>
      </FadeIn>

      <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 800 }}>
        {problems.map((problem, i) => {
          const itemDelay = 20 + i * 15;
          const opacity = interpolate(frame - itemDelay, [0, 15], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const translateX = interpolate(frame - itemDelay, [0, 15], [-30, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.cubic),
          });

          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                opacity,
                transform: `translateX(${translateX}px)`,
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: "#FEF2F2",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  flexShrink: 0,
                }}
              >
                ✕
              </div>
              <span style={{ fontSize: 26, color: COLORS.gray600, fontWeight: 500 }}>
                {problem}
              </span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

/* ============================================================
   SCENE 3: SOLUTION INTRO (240-360 frames = 8-12s)
   ============================================================ */
const SceneSolution: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({ frame: frame - 15, fps, config: { damping: 14, stiffness: 60 } });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(170deg, ${COLORS.bg} 0%, ${COLORS.bgCard} 100%)`,
        justifyContent: "center",
        alignItems: "center",
        fontFamily: FONT,
      }}
    >
      <GlowOrb color="rgba(37,99,235,0.2)" size={700} x="20%" y="10%" />
      <GlowOrb color="rgba(16,185,129,0.12)" size={500} x="60%" y="60%" delay={10} />

      <div style={{ textAlign: "center", zIndex: 2, position: "relative" }}>
        <FadeIn delay={0} duration={15}>
          <p
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: COLORS.accentGreen,
              textTransform: "uppercase",
              letterSpacing: 4,
              marginBottom: 24,
            }}
          >
            Introducing
          </p>
        </FadeIn>

        <FadeIn delay={10} duration={20}>
          <h2
            style={{
              fontSize: 64,
              fontWeight: 800,
              color: COLORS.white,
              letterSpacing: -2,
              lineHeight: 1.15,
              marginBottom: 24,
            }}
          >
            Credstacks{" "}
            <span
              style={{
                background: `linear-gradient(135deg, ${COLORS.primaryLight}, ${COLORS.accent})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Smart CRM
            </span>
          </h2>
        </FadeIn>

        <FadeIn delay={20} duration={18}>
          <p
            style={{
              fontSize: 28,
              color: COLORS.gray300,
              fontWeight: 400,
              maxWidth: 700,
              margin: "0 auto 48px",
              lineHeight: 1.5,
            }}
          >
            Simple, powerful sales and pipeline management built for teams that want to close more deals.
          </p>
        </FadeIn>

        {/* Feature pills */}
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          {["Leads & Deals", "Kanban Views", "Email Integration", "AI Assistant", "Automation"].map(
            (label, i) => {
              const pillDelay = 35 + i * 8;
              const pillOpacity = interpolate(frame - pillDelay, [0, 12], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
              const pillY = interpolate(frame - pillDelay, [0, 12], [20, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.out(Easing.cubic),
              });

              return (
                <div
                  key={i}
                  style={{
                    background: "rgba(37, 99, 235, 0.15)",
                    border: "1px solid rgba(37, 99, 235, 0.3)",
                    borderRadius: 100,
                    padding: "10px 24px",
                    fontSize: 18,
                    fontWeight: 600,
                    color: COLORS.primaryLight,
                    opacity: pillOpacity,
                    transform: `translateY(${pillY}px)`,
                  }}
                >
                  {label}
                </div>
              );
            }
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ============================================================
   FEATURE CARD SCENE (reusable)
   ============================================================ */
const SceneFeature: React.FC<{
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
  accentColor: string;
  bgStyle: "light" | "dark";
  icon: string;
}> = ({ eyebrow, title, description, bullets, accentColor, bgStyle, icon }) => {
  const frame = useCurrentFrame();

  const isDark = bgStyle === "dark";

  return (
    <AbsoluteFill
      style={{
        background: isDark
          ? `linear-gradient(170deg, ${COLORS.bg} 0%, ${COLORS.bgCard} 100%)`
          : COLORS.white,
        fontFamily: FONT,
        padding: 120,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 80,
      }}
    >
      {isDark && <GlowOrb color={`${accentColor}30`} size={500} x="60%" y="20%" />}

      {/* Left: Content */}
      <div style={{ flex: 1, zIndex: 2, position: "relative" }}>
        <FadeIn delay={0} duration={12}>
          <p
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: accentColor,
              textTransform: "uppercase",
              letterSpacing: 4,
              marginBottom: 16,
            }}
          >
            {eyebrow}
          </p>
        </FadeIn>

        <FadeIn delay={5} duration={15}>
          <h2
            style={{
              fontSize: 48,
              fontWeight: 800,
              color: isDark ? COLORS.white : COLORS.gray900,
              letterSpacing: -2,
              lineHeight: 1.15,
              marginBottom: 20,
            }}
          >
            {title}
          </h2>
        </FadeIn>

        <FadeIn delay={12} duration={15}>
          <p
            style={{
              fontSize: 22,
              color: isDark ? COLORS.gray300 : COLORS.gray600,
              lineHeight: 1.6,
              marginBottom: 36,
              maxWidth: 540,
            }}
          >
            {description}
          </p>
        </FadeIn>

        {bullets.map((bullet, i) => {
          const d = 22 + i * 10;
          const op = interpolate(frame - d, [0, 12], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const tx = interpolate(frame - d, [0, 12], [-20, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.cubic),
          });
          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                marginBottom: 14,
                opacity: op,
                transform: `translateX(${tx}px)`,
              }}
            >
              <span style={{ color: accentColor, fontSize: 22, fontWeight: 800 }}>✓</span>
              <span
                style={{
                  fontSize: 20,
                  color: isDark ? COLORS.gray300 : COLORS.gray600,
                  fontWeight: 500,
                }}
              >
                {bullet}
              </span>
            </div>
          );
        })}
      </div>

      {/* Right: Icon card */}
      <FadeIn delay={10} duration={20} direction="right">
        <div
          style={{
            width: 460,
            height: 380,
            borderRadius: 28,
            background: isDark
              ? "rgba(30, 41, 59, 0.6)"
              : COLORS.gray100,
            border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "#E2E8F0"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 120,
            boxShadow: isDark
              ? "0 24px 48px rgba(0,0,0,0.4)"
              : "0 20px 40px rgba(0,0,0,0.08)",
          }}
        >
          {icon}
        </div>
      </FadeIn>
    </AbsoluteFill>
  );
};

/* ============================================================
   SCENE 7: AI BOT DEMO (600-750 frames = 20-25s)
   ============================================================ */
const SceneAIBot: React.FC = () => {
  const frame = useCurrentFrame();

  const userMsgOpacity = interpolate(frame, [25, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const typingDotsOpacity = interpolate(frame, [45, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const botMsgOpacity = interpolate(frame, [65, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const botMsgY = interpolate(frame, [65, 80], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(170deg, ${COLORS.bg} 0%, ${COLORS.bgCard} 100%)`,
        fontFamily: FONT,
        padding: 120,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 80,
      }}
    >
      <GlowOrb color="rgba(37,99,235,0.15)" size={600} x="-5%" y="20%" />

      {/* Left: Description */}
      <div style={{ flex: 1, zIndex: 2, position: "relative" }}>
        <FadeIn delay={0} duration={12}>
          <p
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: COLORS.accent,
              textTransform: "uppercase",
              letterSpacing: 4,
              marginBottom: 16,
            }}
          >
            AI Support Bot
          </p>
        </FadeIn>

        <FadeIn delay={5} duration={15}>
          <h2
            style={{
              fontSize: 48,
              fontWeight: 800,
              color: COLORS.white,
              letterSpacing: -2,
              lineHeight: 1.15,
              marginBottom: 20,
            }}
          >
            Your intelligent sales assistant
          </h2>
        </FadeIn>

        <FadeIn delay={12} duration={15}>
          <p
            style={{
              fontSize: 22,
              color: COLORS.gray300,
              lineHeight: 1.6,
              marginBottom: 36,
              maxWidth: 480,
            }}
          >
            Ask in natural language. Get instant answers on lead counts, pending follow-ups, and draft outreach emails.
          </p>
        </FadeIn>
      </div>

      {/* Right: Chat mockup */}
      <div
        style={{
          width: 520,
          borderRadius: 24,
          background: "#0F172A",
          border: "1px solid rgba(255,255,255,0.1)",
          padding: 28,
          boxShadow: "0 24px 48px rgba(0,0,0,0.5)",
          zIndex: 2,
        }}
      >
        {/* Chat header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            paddingBottom: 16,
            marginBottom: 24,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: COLORS.accentGreen,
              }}
            />
            <span style={{ color: COLORS.white, fontSize: 16, fontWeight: 700 }}>
              Credstacks AI Assistant
            </span>
          </div>
          <span
            style={{
              fontSize: 12,
              color: COLORS.gray400,
              background: "rgba(255,255,255,0.06)",
              padding: "4px 12px",
              borderRadius: 6,
            }}
          >
            Live
          </span>
        </div>

        {/* User message */}
        <div
          style={{
            opacity: userMsgOpacity,
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: 16,
          }}
        >
          <div
            style={{
              background: "rgba(30,41,59,0.8)",
              borderRadius: 14,
              padding: 16,
              maxWidth: "85%",
            }}
          >
            <p style={{ margin: 0, fontSize: 16, color: "#E2E8F0", lineHeight: 1.5 }}>
              "How many active leads need follow-ups this week?"
            </p>
          </div>
        </div>

        {/* Typing indicator */}
        {frame >= 45 && frame < 65 && (
          <div style={{ opacity: typingDotsOpacity, marginBottom: 16 }}>
            <div
              style={{
                display: "flex",
                gap: 6,
                padding: "12px 18px",
                background: "rgba(37,99,235,0.1)",
                borderRadius: 14,
                width: "fit-content",
              }}
            >
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: COLORS.primaryLight,
                    opacity: interpolate(
                      Math.sin(((frame - 45 + i * 5) / 10) * Math.PI),
                      [-1, 1],
                      [0.3, 1]
                    ),
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Bot response */}
        <div
          style={{
            opacity: botMsgOpacity,
            transform: `translateY(${botMsgY}px)`,
          }}
        >
          <div
            style={{
              background: "rgba(37,99,235,0.12)",
              border: "1px solid rgba(37,99,235,0.25)",
              borderRadius: 14,
              padding: 18,
              maxWidth: "92%",
            }}
          >
            <p style={{ margin: 0, fontSize: 16, color: "#93C5FD", lineHeight: 1.6 }}>
              You have <strong>14 leads</strong> with scheduled follow-ups this week. 6 are in
              Proposal Sent stage. Would you like me to draft follow-up templates for the top 3?
            </p>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ============================================================
   SCENE 8: CTA / CLOSING (750-900 frames = 25-30s)
   ============================================================ */
const SceneCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const badgeScale = spring({ frame: frame - 30, fps, config: { damping: 10, stiffness: 80 } });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(170deg, ${COLORS.bg} 0%, ${COLORS.bgCard} 50%, ${COLORS.gray900} 100%)`,
        justifyContent: "center",
        alignItems: "center",
        fontFamily: FONT,
      }}
    >
      <GlowOrb color="rgba(37,99,235,0.2)" size={800} x="30%" y="20%" />
      <GlowOrb color="rgba(16,185,129,0.12)" size={400} x="70%" y="60%" delay={10} />

      <div style={{ textAlign: "center", zIndex: 2, position: "relative" }}>
        <FadeIn delay={0} duration={15}>
          <h2
            style={{
              fontSize: 64,
              fontWeight: 800,
              color: COLORS.white,
              letterSpacing: -2,
              lineHeight: 1.15,
              marginBottom: 20,
            }}
          >
            Start Closing More Deals
          </h2>
        </FadeIn>

        <FadeIn delay={10} duration={15}>
          <p
            style={{
              fontSize: 28,
              color: COLORS.gray300,
              maxWidth: 600,
              margin: "0 auto 48px",
              lineHeight: 1.5,
            }}
          >
            Experience the full platform free for 14 days. No credit card required.
          </p>
        </FadeIn>

        {/* CTA button */}
        <div style={{ transform: `scale(${badgeScale})` }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              background: `linear-gradient(135deg, ${COLORS.gradientStart}, ${COLORS.gradientEnd})`,
              color: COLORS.white,
              fontSize: 24,
              fontWeight: 700,
              padding: "18px 48px",
              borderRadius: 16,
              boxShadow: "0 16px 48px rgba(37,99,235,0.4)",
            }}
          >
            Start Your 14-Day Free Trial →
          </div>
        </div>

        <FadeIn delay={45} duration={15}>
          <p style={{ fontSize: 18, color: COLORS.gray400, marginTop: 28 }}>
            credstacks.com
          </p>
        </FadeIn>
      </div>
    </AbsoluteFill>
  );
};

/* ============================================================
   MAIN COMPOSITION
   ============================================================ */
export const CRMDemoVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.bg }}>
      {/* Scene 1: Logo Reveal (0-4s) */}
      <Sequence from={0} durationInFrames={120}>
        <SceneLogoReveal />
      </Sequence>

      {/* Scene 2: Problem Statement (4-8s) */}
      <Sequence from={120} durationInFrames={120}>
        <SceneProblem />
      </Sequence>

      {/* Scene 3: Solution Intro (8-12s) */}
      <Sequence from={240} durationInFrames={120}>
        <SceneSolution />
      </Sequence>

      {/* Scene 4: Leads & Deals (12-15s) */}
      <Sequence from={360} durationInFrames={90}>
        <SceneFeature
          eyebrow="Lead Management"
          title="Leads & Deals Pipeline"
          description="Track every prospect and opportunity in one place with rich notes, call logs, tasks, and complete context."
          bullets={[
            "Capture leads from web, email, and phone",
            "Log phone calls and set follow-up tasks",
            "Full conversation history per contact",
          ]}
          accentColor={COLORS.primary}
          bgStyle="light"
          icon="📊"
        />
      </Sequence>

      {/* Scene 5: Kanban & Views (15-18s) */}
      <Sequence from={450} durationInFrames={90}>
        <SceneFeature
          eyebrow="Visual Pipeline"
          title="List & Kanban Views"
          description="Work on a structured list or drag-and-drop Kanban board. Filter, sort, and pin your daily workspaces."
          bullets={[
            "Drag and drop deals between stages",
            "Custom filters and saved views",
            "Real-time pipeline health at a glance",
          ]}
          accentColor={COLORS.accentGreen}
          bgStyle="dark"
          icon="📋"
        />
      </Sequence>

      {/* Scene 6: Communication (18-20s) */}
      <Sequence from={540} durationInFrames={60}>
        <SceneFeature
          eyebrow="Unified Communication"
          title="Email, Templates & Team Collaboration"
          description="Send emails from lead records, use templates, leave comments, and @tag teammates."
          bullets={[
            "Email sync directly inside CRM",
            "Pre-built outreach templates",
            "Team comments and @mentions",
          ]}
          accentColor={COLORS.accent}
          bgStyle="light"
          icon="✉️"
        />
      </Sequence>

      {/* Scene 7: AI Bot (20-25s) */}
      <Sequence from={600} durationInFrames={150}>
        <SceneAIBot />
      </Sequence>

      {/* Scene 8: CTA / Closing (25-30s) */}
      <Sequence from={750} durationInFrames={150}>
        <SceneCTA />
      </Sequence>
    </AbsoluteFill>
  );
};
