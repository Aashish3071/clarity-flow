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
   DESIGN TOKENS & COLOR PALETTE
   ============================================================ */
const COLORS = {
  bgDark: "#0B132B",
  bgDarkAlt: "#0F172A",
  cardDark: "#1E293B",
  cardBorderDark: "rgba(255, 255, 255, 0.12)",
  bgLight: "#F8FAFC",
  cardLight: "#FFFFFF",
  cardBorderLight: "#E2E8F0",
  primary: "#4F46E5",
  primaryGradient: "linear-gradient(135deg, #4F46E5 0%, #06B6D4 100%)",
  accentCyan: "#06B6D4",
  accentBlue: "#2563EB",
  accentGreen: "#10B981",
  accentPurple: "#8B5CF6",
  accentAmber: "#F59E0B",
  white: "#FFFFFF",
  textDark: "#0F172A",
  textMuted: "#64748B",
  textLight: "#F8FAFC",
  textLightMuted: "#94A3B8",
};

const FONT = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

/* ============================================================
   EXACT WEBSITE LOGO SVG COMPONENT
   ============================================================ */
const CredstacksLogo: React.FC<{ size?: number; showText?: boolean; textColor?: string }> = ({
  size = 40,
  showText = true,
  textColor = COLORS.white,
}) => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: size * 0.35 }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="logoGradVideo" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#4F46E5" />
            <stop offset="1" stopColor="#06B6D4" />
          </linearGradient>
          <filter id="logoShadowVideo" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="rgba(79,70,229,0.3)" />
          </filter>
        </defs>
        {/* Top stack */}
        <rect x="12" y="1" width="27" height="11" rx="3.5" fill="url(#logoGradVideo)" fillOpacity="0.35" />
        {/* Middle stack */}
        <rect x="6" y="15" width="27" height="11" rx="3.5" fill="url(#logoGradVideo)" fillOpacity="0.65" />
        {/* Bottom stack */}
        <rect x="0" y="29" width="27" height="11" rx="3.5" fill="url(#logoGradVideo)" filter="url(#logoShadowVideo)" />
      </svg>
      {showText && (
        <span
          style={{
            fontSize: size * 0.8,
            fontWeight: 800,
            color: textColor,
            letterSpacing: "-0.03em",
            fontFamily: FONT,
          }}
        >
          Credstacks
        </span>
      )}
    </div>
  );
};

/* ============================================================
   ANIMATION HELPER
   ============================================================ */
const FadeIn: React.FC<{
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
}> = ({ children, delay = 0, duration = 20, direction = "up" }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame - delay, [0, duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const offsets = { up: [35, 0], down: [-35, 0], left: [35, 0], right: [-35, 0], none: [0, 0] };
  const [from, to] = offsets[direction];

  const translate = interpolate(frame - delay, [0, duration], [from, to], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const transformProp = direction === "left" || direction === "right" ? "translateX" : "translateY";

  return (
    <div style={{ opacity, transform: `${transformProp}(${translate}px)` }}>
      {children}
    </div>
  );
};

/* ============================================================
   MOCKUP HEADER & SIDEBAR TEMPLATE
   ============================================================ */
const AppWindowMockup: React.FC<{
  title: string;
  activeNav: string;
  children: React.ReactNode;
}> = ({ title, activeNav, children }) => {
  return (
    <div
      style={{
        width: 1400,
        height: 780,
        borderRadius: 20,
        background: COLORS.white,
        border: "1px solid #CBD5E1",
        boxShadow: "0 25px 60px rgba(15, 23, 42, 0.25)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        fontFamily: FONT,
      }}
    >
      {/* Window Top Bar */}
      <div
        style={{
          height: 48,
          background: "#0F172A",
          display: "flex",
          alignItems: "center",
          padding: "0 20px",
          justifyContent: "space-between",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <div style={{ display: "flex", itemsCenter: "center", gap: 12 }}>
          <div style={{ display: "flex", gap: 7 }}>
            <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#EF4444" }} />
            <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#F59E0B" }} />
            <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#10B981" }} />
          </div>
          <span style={{ fontSize: 13, color: "#94A3B8", fontWeight: 500, marginLeft: 10 }}>
            credstacks.app/crm/{title.toLowerCase().replace(/\s+/g, "-")}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              borderRadius: 6,
              padding: "4px 12px",
              fontSize: 12,
              color: "#CBD5E1",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981" }} />
            Live Sync
          </div>
          <CredstacksLogo size={20} showText={true} textColor="#FFFFFF" />
        </div>
      </div>

      {/* Main UI Layout */}
      <div style={{ flex: 1, display: "flex" }}>
        {/* Left Sidebar */}
        <div
          style={{
            width: 240,
            background: "#0F172A",
            borderRight: "1px solid rgba(255, 255, 255, 0.08)",
            padding: "20px 14px",
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}
        >
          <div style={{ fontSize: 11, fontWeight: 700, color: "#64748B", textTransform: "uppercase", padding: "0 10px 8px" }}>
            Sales Workspace
          </div>
          {[
            { id: "leads", label: "Leads & Contacts", icon: "👥" },
            { id: "kanban", label: "Pipeline Kanban", icon: "📊" },
            { id: "deals", label: "Deals & Quotations", icon: "💼" },
            { id: "email", label: "Email & Activity", icon: "✉️" },
            { id: "ai", label: "AI Support Bot", icon: "✨" },
            { id: "analytics", label: "Sales Analytics", icon: "📈" },
          ].map((item) => {
            const isActive = activeNav === item.id;
            return (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "10px 14px",
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? "#FFFFFF" : "#94A3B8",
                  background: isActive ? "linear-gradient(135deg, #4F46E5 0%, #2563EB 100%)" : "transparent",
                  boxShadow: isActive ? "0 4px 12px rgba(79, 70, 229, 0.3)" : "none",
                }}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </div>
            );
          })}
        </div>

        {/* Right Content Area */}
        <div style={{ flex: 1, background: "#F8FAFC", display: "flex", flexDirection: "column" }}>
          {/* Top Bar */}
          <div
            style={{
              height: 60,
              background: COLORS.white,
              borderBottom: "1px solid #E2E8F0",
              padding: "0 28px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h3 style={{ fontSize: 18, fontWeight: 800, color: "#0F172A", margin: 0 }}>{title}</h3>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div
                style={{
                  background: "#F1F5F9",
                  borderRadius: 8,
                  padding: "6px 14px",
                  fontSize: 13,
                  color: "#64748B",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                🔍 Search leads, deals, or accounts...
              </div>
              <div
                style={{
                  background: COLORS.primary,
                  color: COLORS.white,
                  borderRadius: 8,
                  padding: "8px 16px",
                  fontSize: 13,
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                + New Lead
              </div>
            </div>
          </div>

          {/* Dynamic Content */}
          <div style={{ flex: 1, padding: 24, overflow: "hidden" }}>{children}</div>
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   SCENE 1: LOGO & BRAND REVEAL (0-120 frames / 0-4s)
   ============================================================ */
const SceneLogoReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({ frame, fps, config: { damping: 14, stiffness: 80 } });

  const lineWidth = interpolate(frame, [25, 65], [0, 520], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const taglineOpacity = interpolate(frame, [50, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(170deg, ${COLORS.bgDark} 0%, ${COLORS.bgDarkAlt} 100%)`,
        justifyContent: "center",
        alignItems: "center",
        fontFamily: FONT,
      }}
    >
      <div style={{ textAlign: "center", transform: `scale(${logoScale})` }}>
        <div style={{ display: "inline-block", marginBottom: 28 }}>
          <CredstacksLogo size={84} showText={false} />
        </div>

        <h1
          style={{
            fontSize: 76,
            fontWeight: 800,
            color: COLORS.white,
            letterSpacing: "-0.04em",
            margin: 0,
          }}
        >
          Credstacks
        </h1>

        <div
          style={{
            width: lineWidth,
            height: 4,
            background: "linear-gradient(90deg, #4F46E5 0%, #06B6D4 100%)",
            margin: "20px auto",
            borderRadius: 2,
          }}
        />

        <p
          style={{
            fontSize: 28,
            color: "#94A3B8",
            fontWeight: 600,
            opacity: taglineOpacity,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          Smart Sales & CRM Suite
        </p>
      </div>
    </AbsoluteFill>
  );
};

/* ============================================================
   SCENE 2: LEADS & DEALS TABLE UI (120-270 frames / 4-9s)
   ============================================================ */
const SceneLeadsTable: React.FC = () => {
  const frame = useCurrentFrame();

  const leads = [
    { name: "Acme Health Systems", contact: "Sarah Jenkins", value: "$120,000", status: "Qualified", source: "Inbound Web", rep: "Alex Morgan" },
    { name: "Apex Logistics Ltd", contact: "Michael Chen", value: "$85,000", status: "Proposal Sent", source: "Meta Ads", rep: "Jessica Reed" },
    { name: "Veritas Software", contact: "David Miller", value: "$45,000", status: "Negotiation", source: "LinkedIn", rep: "Alex Morgan" },
    { name: "Summit Financial", contact: "Emma Watson", value: "$210,000", status: "New Lead", source: "Direct Sales", rep: "David Ross" },
    { name: "Global Trade Co", contact: "Robert Paul", value: "$64,000", status: "Qualified", source: "Inbound Web", rep: "Jessica Reed" },
  ];

  const highlightRow = interpolate(frame, [60, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: COLORS.bgDark,
        justifyContent: "center",
        alignItems: "center",
        padding: 60,
      }}
    >
      <AppWindowMockup title="Leads & Pipeline Management" activeNav="leads">
        {/* Stat Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 20 }}>
          {[
            { label: "Total Open Deals", val: "$524,000", change: "+14% vs last mo", color: "#4F46E5" },
            { label: "Active Leads", val: "142", change: "+28 this week", color: "#06B6D4" },
            { label: "Win Rate", val: "38.5%", change: "+4.2%", color: "#10B981" },
            { label: "Avg Response Time", val: "18 mins", change: "SLA Compliant", color: "#8B5CF6" },
          ].map((st, i) => (
            <div
              key={i}
              style={{
                background: COLORS.white,
                border: "1px solid #E2E8F0",
                borderRadius: 12,
                padding: "16px 20px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.03)",
              }}
            >
              <div style={{ fontSize: 12, color: "#64748B", fontWeight: 600 }}>{st.label}</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: "#0F172A", margin: "4px 0" }}>{st.val}</div>
              <div style={{ fontSize: 12, color: st.color, fontWeight: 700 }}>{st.change}</div>
            </div>
          ))}
        </div>

        {/* Lead Table */}
        <div
          style={{
            background: COLORS.white,
            border: "1px solid #E2E8F0",
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1.5fr 1.2fr 1.2fr 1.2fr 1.2fr",
              padding: "12px 20px",
              background: "#F8FAFC",
              borderBottom: "1px solid #E2E8F0",
              fontSize: 12,
              fontWeight: 700,
              color: "#475569",
              textTransform: "uppercase",
            }}
          >
            <span>Company / Prospect</span>
            <span>Contact Person</span>
            <span>Est. Value</span>
            <span>Stage Status</span>
            <span>Source</span>
            <span>Assigned Rep</span>
          </div>

          {leads.map((ld, i) => {
            const isRowHighlighted = i === 1 && highlightRow > 0;
            return (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 1.5fr 1.2fr 1.2fr 1.2fr 1.2fr",
                  padding: "14px 20px",
                  borderBottom: i === leads.length - 1 ? "none" : "1px solid #F1F5F9",
                  alignItems: "center",
                  fontSize: 14,
                  background: isRowHighlighted
                    ? `rgba(79, 70, 229, ${highlightRow * 0.08})`
                    : i % 2 === 0
                    ? "#FFFFFF"
                    : "#FAFAFA",
                  transition: "background 300ms ease",
                }}
              >
                <span style={{ fontWeight: 700, color: "#0F172A" }}>{ld.name}</span>
                <span style={{ color: "#475569" }}>{ld.contact}</span>
                <span style={{ fontWeight: 700, color: "#10B981" }}>{ld.value}</span>
                <span>
                  <span
                    style={{
                      padding: "4px 10px",
                      borderRadius: 100,
                      fontSize: 12,
                      fontWeight: 700,
                      background:
                        ld.status === "Qualified"
                          ? "#EFF6FF"
                          : ld.status === "Proposal Sent"
                          ? "#FEF3C7"
                          : ld.status === "Negotiation"
                          ? "#F3E8FF"
                          : "#ECFDF5",
                      color:
                        ld.status === "Qualified"
                          ? "#2563EB"
                          : ld.status === "Proposal Sent"
                          ? "#D97706"
                          : ld.status === "Negotiation"
                          ? "#7C3AED"
                          : "#059669",
                    }}
                  >
                    {ld.status}
                  </span>
                </span>
                <span style={{ fontSize: 13, color: "#64748B" }}>{ld.source}</span>
                <span style={{ fontSize: 13, color: "#334155", fontWeight: 600 }}>{ld.rep}</span>
              </div>
            );
          })}
        </div>
      </AppWindowMockup>
    </AbsoluteFill>
  );
};

/* ============================================================
   SCENE 3: DRAG & DROP KANBAN BOARD (270-420 frames / 9-14s)
   ============================================================ */
const SceneKanbanBoard: React.FC = () => {
  const frame = useCurrentFrame();

  const moveProgress = interpolate(frame, [50, 110], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill
      style={{
        background: COLORS.bgDark,
        justifyContent: "center",
        alignItems: "center",
        padding: 60,
      }}
    >
      <AppWindowMockup title="Visual Pipeline (Kanban Board)" activeNav="kanban">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, height: "100%" }}>
          {/* Column 1: New Leads */}
          <div style={{ background: "#F1F5F9", borderRadius: 12, padding: 14, display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", justifyBetween: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 14, fontWeight: 800, color: "#0F172A" }}>New Leads (3)</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#64748B" }}>$115k</span>
            </div>
            {[
              { company: "Apex Corp", deal: "$45,000", tag: "Inbound" },
              { company: "Starlight Retail", deal: "$30,000", tag: "Web" },
              { company: "Zenith Tech", deal: "$40,000", tag: "Meta" },
            ].map((c, idx) => (
              <div key={idx} style={{ background: COLORS.white, borderRadius: 10, padding: 14, border: "1px solid #E2E8F0", boxShadow: "0 2px 4px rgba(0,0,0,0.04)" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#0F172A" }}>{c.company}</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: "#10B981", marginTop: 4 }}>{c.deal}</div>
                <span style={{ fontSize: 11, background: "#EFF6FF", color: "#2563EB", padding: "2px 8px", borderRadius: 4, fontWeight: 600, display: "inline-block", marginTop: 8 }}>{c.tag}</span>
              </div>
            ))}
          </div>

          {/* Column 2: Proposal Sent */}
          <div style={{ background: "#F1F5F9", borderRadius: 12, padding: 14, display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", justifyBetween: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 14, fontWeight: 800, color: "#0F172A" }}>Proposal Sent (2)</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#64748B" }}>$205k</span>
            </div>

            {/* Static Card */}
            <div style={{ background: COLORS.white, borderRadius: 10, padding: 14, border: "1px solid #E2E8F0", boxShadow: "0 2px 4px rgba(0,0,0,0.04)" }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#0F172A" }}>Titan Industries</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: "#10B981", marginTop: 4 }}>$120,000</div>
              <span style={{ fontSize: 11, background: "#FEF3C7", color: "#D97706", padding: "2px 8px", borderRadius: 4, fontWeight: 600, display: "inline-block", marginTop: 8 }}>High Priority</span>
            </div>

            {/* Animated Moving Card */}
            <div
              style={{
                background: COLORS.white,
                borderRadius: 10,
                padding: 14,
                border: "2px solid #4F46E5",
                boxShadow: moveProgress > 0 ? "0 12px 24px rgba(79, 70, 229, 0.3)" : "0 2px 4px rgba(0,0,0,0.04)",
                transform: `translateX(${moveProgress * 290}px) translateY(${moveProgress * -20}px)`,
                zIndex: 10,
              }}
            >
              <div style={{ fontSize: 14, fontWeight: 700, color: "#0F172A" }}>Horizon Health</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: "#10B981", marginTop: 4 }}>$85,000</div>
              <span style={{ fontSize: 11, background: "#ECFDF5", color: "#059669", padding: "2px 8px", borderRadius: 4, fontWeight: 600, display: "inline-block", marginTop: 8 }}>Ready to Close</span>
            </div>
          </div>

          {/* Column 3: Negotiation / Closing */}
          <div style={{ background: "#F1F5F9", borderRadius: 12, padding: 14, display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", justifyBetween: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 14, fontWeight: 800, color: "#0F172A" }}>Negotiation (2)</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#64748B" }}>$150k</span>
            </div>
            <div style={{ background: COLORS.white, borderRadius: 10, padding: 14, border: "1px solid #E2E8F0", boxShadow: "0 2px 4px rgba(0,0,0,0.04)" }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#0F172A" }}>Vanguard Logistics</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: "#10B981", marginTop: 4 }}>$65,000</div>
              <span style={{ fontSize: 11, background: "#F3E8FF", color: "#7C3AED", padding: "2px 8px", borderRadius: 4, fontWeight: 600, display: "inline-block", marginTop: 8 }}>Legal Review</span>
            </div>
          </div>

          {/* Column 4: Closed Won */}
          <div style={{ background: "#ECFDF5", border: "1px border #A7F3D0", borderRadius: 12, padding: 14, display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", justifyBetween: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 14, fontWeight: 800, color: "#065F46" }}>Closed Won (🎉)</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#047857" }}>$340k</span>
            </div>
            <div style={{ background: COLORS.white, borderRadius: 10, padding: 14, border: "1px solid #A7F3D0", boxShadow: "0 2px 4px rgba(0,0,0,0.04)" }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#0F172A" }}>Omni Global</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: "#10B981", marginTop: 4 }}>$180,000</div>
              <span style={{ fontSize: 11, background: "#D1FAE5", color: "#065F46", padding: "2px 8px", borderRadius: 4, fontWeight: 700, display: "inline-block", marginTop: 8 }}>Contract Signed</span>
            </div>
          </div>
        </div>
      </AppWindowMockup>
    </AbsoluteFill>
  );
};

/* ============================================================
   SCENE 4: UNIFIED COMMUNICATION & SLA ROUTING (420-570 frames / 14-19s)
   ============================================================ */
const SceneCommunication: React.FC = () => {
  const frame = useCurrentFrame();

  const commentOpacity = interpolate(frame, [45, 75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: COLORS.bgDark,
        justifyContent: "center",
        alignItems: "center",
        padding: 60,
      }}
    >
      <AppWindowMockup title="Unified Communication & SLA Automation" activeNav="email">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 20, height: "100%" }}>
          {/* Left: Lead Details Sidebar */}
          <div style={{ background: COLORS.white, border: "1px solid #E2E8F0", borderRadius: 12, padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#64748B", textTransform: "uppercase" }}>Lead Profile</span>
              <span style={{ background: "#ECFDF5", color: "#059669", fontSize: 12, fontWeight: 700, padding: "3px 10px", borderRadius: 100 }}>
                ⚡ SLA: 12m Response
              </span>
            </div>
            <h4 style={{ fontSize: 20, fontWeight: 800, color: "#0F172A", margin: 0 }}>Sarah Jenkins</h4>
            <p style={{ fontSize: 14, color: "#64748B", margin: "4px 0 16px" }}>VP of Operations at Acme Health</p>

            <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 13, borderTop: "1px solid #F1F5F9", paddingTop: 14 }}>
              <div><strong>Email:</strong> s.jenkins@acmehealth.com</div>
              <div><strong>Phone:</strong> +1 (555) 234-8901</div>
              <div><strong>Lead Source:</strong> Inbound Enterprise Web Form</div>
              <div><strong>Deal Value:</strong> <span style={{ color: "#10B981", fontWeight: 700 }}>$120,000</span></div>
            </div>
          </div>

          {/* Right: Email & Activity Center */}
          <div style={{ background: COLORS.white, border: "1px solid #E2E8F0", borderRadius: 12, padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #F1F5F9", paddingBottom: 12 }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: "#0F172A" }}>In-App Email Composer</span>
              <span style={{ background: "#EFF6FF", color: "#2563EB", fontSize: 12, fontWeight: 600, padding: "4px 10px", borderRadius: 6 }}>
                Template: Enterprise Proposal Follow-up
              </span>
            </div>

            {/* Email Preview */}
            <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 8, padding: 16, fontSize: 14, lineHeight: 1.6, color: "#334155" }}>
              <div style={{ fontWeight: 700, color: "#0F172A", marginBottom: 6 }}>Subject: Credstacks Custom Deployment & Migration Timeline</div>
              Hi Sarah, following up on our demonstration earlier today. Attached is the customized deployment plan outlining our 24-hour setup and automated data migration.
            </div>

            {/* Internal Team Comments Thread */}
            <div style={{ opacity: commentOpacity, background: "#FFFBEB", border: "1px solid #FDE68A", borderRadius: 8, padding: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 700, color: "#92400E" }}>
                <span>💬 Internal Team Note:</span>
                <span>@alex_morgan</span>
              </div>
              <p style={{ margin: "4px 0 0", fontSize: 13, color: "#78350F" }}>
                "Approved 10% annual discount structure for Acme Health. Ready to generate contract."
              </p>
            </div>
          </div>
        </div>
      </AppWindowMockup>
    </AbsoluteFill>
  );
};

/* ============================================================
   SCENE 5: AI SUPPORT BOT IN ACTION (570-750 frames / 19-25s)
   ============================================================ */
const SceneAIBotDemo: React.FC = () => {
  const frame = useCurrentFrame();

  const userMsgOpacity = interpolate(frame, [20, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const typingDotsOpacity = interpolate(frame, [40, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const botMsgOpacity = interpolate(frame, [60, 75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: COLORS.bgDark,
        justifyContent: "center",
        alignItems: "center",
        padding: 60,
      }}
    >
      <AppWindowMockup title="AI Support & Productivity Assistant" activeNav="ai">
        <div style={{ maxWidth: 840, margin: "0 auto", display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Header Banner */}
          <div
            style={{
              background: "linear-gradient(135deg, #1E293B 0%, #0F172A 100%)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: 14,
              padding: "16px 24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#10B981" }} />
              <span style={{ color: "#FFFFFF", fontSize: 16, fontWeight: 700 }}>Credstacks AI Sales Bot</span>
            </div>
            <span style={{ fontSize: 12, color: "#94A3B8", background: "rgba(255, 255, 255, 0.08)", padding: "4px 12px", borderRadius: 100 }}>
              Natural Language Assistant
            </span>
          </div>

          {/* User Input Prompt */}
          <div style={{ opacity: userMsgOpacity, alignSelf: "flex-end", maxWidth: "80%" }}>
            <div style={{ background: "#1E293B", borderRadius: 14, padding: 18, color: "#F8FAFC", fontSize: 16, border: "1px solid rgba(255, 255, 255, 0.08)" }}>
              "How many active leads need follow-ups this week?"
            </div>
          </div>

          {/* Typing Animation */}
          {frame >= 40 && frame < 60 && (
            <div style={{ opacity: typingDotsOpacity, alignSelf: "flex-start" }}>
              <div style={{ display: "flex", gap: 6, padding: "12px 20px", background: "rgba(79, 70, 229, 0.15)", borderRadius: 12 }}>
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "#60A5FA",
                      opacity: interpolate(Math.sin(((frame - 40 + i * 5) / 10) * Math.PI), [-1, 1], [0.3, 1]),
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Bot Response Card */}
          <div style={{ opacity: botMsgOpacity, alignSelf: "flex-start", width: "100%" }}>
            <div
              style={{
                background: "linear-gradient(135deg, rgba(79, 70, 229, 0.12) 0%, rgba(6, 182, 212, 0.12) 100%)",
                border: "1px solid rgba(79, 70, 229, 0.3)",
                borderRadius: 16,
                padding: 24,
              }}
            >
              <p style={{ margin: "0 0 16px", fontSize: 16, color: "#38BDF8", lineHeight: 1.6 }}>
                You have <strong>14 active leads</strong> with scheduled follow-ups this week totaling <strong>$410,000</strong> in pipeline value.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
                <div style={{ background: "rgba(15, 23, 42, 0.6)", borderRadius: 8, padding: 12, border: "1px solid rgba(255,255,255,0.05)" }}>
                  <div style={{ fontSize: 12, color: "#94A3B8" }}>Proposal Sent</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: "#FFFFFF" }}>6 Leads ($210k)</div>
                </div>
                <div style={{ background: "rgba(15, 23, 42, 0.6)", borderRadius: 8, padding: 12, border: "1px solid rgba(255,255,255,0.05)" }}>
                  <div style={{ fontSize: 12, color: "#94A3B8" }}>Negotiation</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: "#FFFFFF" }}>5 Leads ($145k)</div>
                </div>
                <div style={{ background: "rgba(15, 23, 42, 0.6)", borderRadius: 8, padding: 12, border: "1px solid rgba(255,255,255,0.05)" }}>
                  <div style={{ fontSize: 12, color: "#94A3B8" }}>Follow-up Due</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: "#10B981" }}>3 Today</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AppWindowMockup>
    </AbsoluteFill>
  );
};

/* ============================================================
   SCENE 6: CLOSING CTA (750-900 frames / 25-30s)
   ============================================================ */
const SceneCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const ctaScale = spring({ frame: frame - 25, fps, config: { damping: 10, stiffness: 80 } });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(170deg, ${COLORS.bgDark} 0%, ${COLORS.bgDarkAlt} 100%)`,
        justifyContent: "center",
        alignItems: "center",
        fontFamily: FONT,
      }}
    >
      <div style={{ textAlign: "center", zIndex: 2 }}>
        <FadeIn delay={0} duration={15}>
          <div style={{ display: "inline-block", marginBottom: 28 }}>
            <CredstacksLogo size={80} showText={true} textColor="#FFFFFF" />
          </div>
        </FadeIn>

        <FadeIn delay={10} duration={15}>
          <h2
            style={{
              fontSize: 60,
              fontWeight: 800,
              color: COLORS.white,
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              marginBottom: 20,
            }}
          >
            Start Closing More Deals Today
          </h2>
        </FadeIn>

        <FadeIn delay={20} duration={15}>
          <p
            style={{
              fontSize: 26,
              color: "#CBD5E1",
              maxWidth: 640,
              margin: "0 auto 44px",
              lineHeight: 1.5,
            }}
          >
            Full platform access free for 14 days. No credit card required.
          </p>
        </FadeIn>

        <div style={{ transform: `scale(${ctaScale})` }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              background: "linear-gradient(135deg, #4F46E5 0%, #06B6D4 100%)",
              color: COLORS.white,
              fontSize: 24,
              fontWeight: 700,
              padding: "18px 48px",
              borderRadius: 16,
              boxShadow: "0 16px 48px rgba(79, 70, 229, 0.4)",
            }}
          >
            Start Your 14-Day Free Trial →
          </div>
        </div>

        <FadeIn delay={45} duration={15}>
          <p style={{ fontSize: 18, color: "#94A3B8", marginTop: 28, fontWeight: 500 }}>
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
    <AbsoluteFill style={{ background: COLORS.bgDark }}>
      {/* 0-4s: Logo & Brand Reveal */}
      <Sequence from={0} durationInFrames={120}>
        <SceneLogoReveal />
      </Sequence>

      {/* 4-9s: Leads & Deals UI Screen */}
      <Sequence from={120} durationInFrames={150}>
        <SceneLeadsTable />
      </Sequence>

      {/* 9-14s: Drag & Drop Kanban Pipeline Screen */}
      <Sequence from={270} durationInFrames={150}>
        <SceneKanbanBoard />
      </Sequence>

      {/* 14-19s: Communication & SLA Routing Screen */}
      <Sequence from={420} durationInFrames={150}>
        <SceneCommunication />
      </Sequence>

      {/* 19-25s: AI Support & Productivity Assistant Screen */}
      <Sequence from={570} durationInFrames={180}>
        <SceneAIBotDemo />
      </Sequence>

      {/* 25-30s: Closing CTA */}
      <Sequence from={750} durationInFrames={150}>
        <SceneCTA />
      </Sequence>
    </AbsoluteFill>
  );
};
