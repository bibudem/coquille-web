import React from 'react';
import PropTypes from 'prop-types';


// Arrow SVG Components
const ArrowLeft = ({ color }) => (
    <svg width="36" height="20" viewBox="0 0 36 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
        <path d="M36 10H3M3 10L9 3M3 10L9 17" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const ArrowRight = ({ color }) => (
    <svg width="36" height="20" viewBox="0 0 36 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
        <path d="M0 10H33M33 10L27 3M33 10L27 17" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

ArrowLeft.propTypes = { color: PropTypes.string.isRequired };
ArrowRight.propTypes = { color: PropTypes.string.isRequired };

// Timeline Card Component
const TimelineCard = ({ item, index }) => {
    const isLeft = item.side === 'left';

    return (
        <div className={`timeline-row ${isLeft ? 'row-left' : 'row-right'}`} data-index={index}>
            {/* Left side container */}
            <div className="timeline-side timeline-side-left">
                {isLeft ? (
                    <div className="timeline-card-wrapper">
                        <div
                            className="timeline-card"
                            style={{
                                '--card-color': item.color,
                                '--card-gradient': item.gradient
                            }}
                        >
                            <div className="card-header">
                                <span className="card-icon">{item.subtitle.charAt(0)}</span>
                                <div>
                                    <div className="card-subtitle">{item.subtitle}</div>
                                    <h3 className="card-title">{item.title}</h3>
                                </div>
                            </div>
                            <p className="card-description">{item.description}</p>
                            <div className="card-tags">
                                {item.tags.map((tag, idx) => (
                                    <span key={idx} className="tag">{tag}</span>
                                ))}
                            </div>
                        </div>
                        <div className="arrow-connector arrow-left">
                            <ArrowLeft color={item.color} />
                        </div>
                    </div>
                ) : (
                    <div className="timeline-placeholder"></div>
                )}
            </div>

            {/* Center date badge */}
            <div className="timeline-center">
                <div className="date-badge" style={{ '--badge-color': item.color }}>
                    <span className="date-text">{item.date}</span>
                    <div className="date-dot"></div>
                </div>
            </div>

            {/* Right side container */}
            <div className="timeline-side timeline-side-right">
                {!isLeft ? (
                    <div className="timeline-card-wrapper">
                        <div className="arrow-connector arrow-right">
                            <ArrowRight color={item.color} />
                        </div>
                        <div
                            className="timeline-card"
                            style={{
                                '--card-color': item.color,
                                '--card-gradient': item.gradient
                            }}
                        >
                            <div className="card-header">
                                <span className="card-icon">{item.subtitle.charAt(0)}</span>
                                <div>
                                    <div className="card-subtitle">{item.subtitle}</div>
                                    <h3 className="card-title">{item.title}</h3>
                                </div>
                            </div>
                            <p className="card-description">{item.description}</p>
                            <div className="card-tags">
                                {item.tags.map((tag, idx) => (
                                    <span key={idx} className="tag">{tag}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="timeline-placeholder"></div>
                )}
            </div>
        </div>
    );
};

TimelineCard.propTypes = {
    item: PropTypes.shape({
        date: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        subtitle: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        tags: PropTypes.arrayOf(PropTypes.string).isRequired,
        side: PropTypes.oneOf(['left', 'right']).isRequired,
        color: PropTypes.string.isRequired,
        gradient: PropTypes.string.isRequired
    }).isRequired,
    index: PropTypes.number.isRequired
};

// Default compact timeline data
const defaultTimelineData = [
    {
        date: "MAY 2022",
        title: "OmniCloud Platform",
        subtitle: "🚀 Product Launch",
        description: "First major release of our enterprise cloud suite with AI-driven analytics.",
        tags: ["💡 12 team members", "🏆 Innovation award"],
        side: "left",
        color: "#2c7da0",
        gradient: "linear-gradient(135deg, #2c7da0, #1e5a77)"
    },
    {
        date: "OCT 2022",
        title: "$32M Series B",
        subtitle: "📈 Funding Round",
        description: "Led by Crestview Ventures, valuation reached $210M.",
        tags: ["💰 Strategic partners", "🌍 EMEA expansion"],
        side: "right",
        color: "#5e548e",
        gradient: "linear-gradient(135deg, #5e548e, #3d2b6b)"
    },
    {
        date: "MAR 2023",
        title: "Nexify Analytics",
        subtitle: "🤝 Acquisition",
        description: "Acquired leading BI startup, adding +45 enterprise clients.",
        tags: ["🧠 IP integration", "📊 +11% market share"],
        side: "left",
        color: "#e76f51",
        gradient: "linear-gradient(135deg, #e76f51, #c95a3a)"
    },
    {
        date: "SEP 2023",
        title: "Carbon Neutral",
        subtitle: "🌱 Sustainability",
        description: "Achieved net-zero scope 1 & 2 emissions.",
        tags: ["♻️ ISO 14001", "🌿 ESG top tier"],
        side: "right",
        color: "#2a9d8f",
        gradient: "linear-gradient(135deg, #2a9d8f, #1e7a6e)"
    },
    {
        date: "JAN 2024",
        title: "Best SaaS 2024",
        subtitle: "🏅 Industry Award",
        description: "Named 'Enterprise Product of the Year' by Cloud Insights.",
        tags: ["🏆 9.4/10 rating", "⭐ Gartner"],
        side: "left",
        color: "#e9c46a",
        gradient: "linear-gradient(135deg, #e9c46a, #d4b03a)"
    },
    {
        date: "JUN 2024",
        title: "Singapore R&D Hub",
        subtitle: "🧪 Global Expansion",
        description: "New research facility for generative AI and edge computing.",
        tags: ["🌏 APAC HQ", "🔬 3 partnerships"],
        side: "right",
        color: "#9c89b8",
        gradient: "linear-gradient(135deg, #9c89b8, #7c6a9a)"
    },
    {
        date: "NOV 2024",
        title: "Mobile Suite 3.0",
        subtitle: "📱 Mobile First",
        description: "Redesigned experience with offline-first sync and AI assistant.",
        tags: ["📲 4.8⭐", "⚡ 40% faster"],
        side: "left",
        color: "#ef476f",
        gradient: "linear-gradient(135deg, #ef476f, #c62a50)"
    },
    {
        date: "FEB 2025",
        title: "1,000 Clients",
        subtitle: "🚀 Milestone",
        description: "Crossed 1,000 enterprise customers with 98% retention.",
        tags: ["📊 ARR $187M", "🎯 46% YoY"],
        side: "right",
        color: "#06d6a0",
        gradient: "linear-gradient(135deg, #06d6a0, #05b38a)"
    }
];

// Main Timeline Component - Compact Version
const TimelineDefault = ({
    data = defaultTimelineData,
    title = "Professional Timeline",
    subtitle = "Centered vertical axis · alternating left/right · colored cards",
    showFooter = true,
    compact = true,
    customStyles = {}
}) => {
    return (
        <div className="timeline-container-compact" style={customStyles.container}>
            <style>{`
        /* Compact Timeline Styles */
        .timeline-container-compact {
          max-width: 1200px;
          margin: 0 auto;
          padding: 1.5rem 1.5rem 2rem 1.5rem;
          position: relative;
          background: linear-gradient(145deg, #f8fafc 0%, #eff3f8 100%);
          border-radius: 1rem;
        }

        /* Heading Styles - Compact */
        .timeline-heading-compact {
          text-align: center;
          margin-bottom: 2rem;
        }

        .timeline-heading-compact h1 {
          font-size: 1.8rem;
          font-weight: 700;
          background: linear-gradient(135deg, #1a2c3e, #2b5f7a);
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          letter-spacing: -0.01em;
          margin-bottom: 0.25rem;
        }

        .timeline-heading-compact p {
          font-size: 0.9rem;
          color: #5a7a8c;
          font-weight: 400;
        }

        /* Main Timeline Layout */
        .timeline-compact {
          position: relative;
        }

        /* STRONGER CENTER AXIS */
        .timeline-compact::before {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          left: 50%;
          width: 3px;
          background: linear-gradient(180deg, #2c7da0, #5e548e, #e76f51, #2a9d8f, #e9c46a, #9c89b8, #ef476f, #06d6a0);
          transform: translateX(-50%);
          border-radius: 3px;
          box-shadow: 0 0 12px rgba(44, 125, 160, 0.3);
          z-index: 1;
        }

        /* Timeline Rows - Compact */
        .timeline-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.75rem;
          position: relative;
          gap: 1rem;
        }

        .timeline-side {
          flex: 1;
          position: relative;
        }

        .timeline-center {
          width: 100px;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-shrink: 0;
          position: relative;
          z-index: 10;
        }

        /* Date Badge - Compact */
        .date-badge {
          background: white;
          border-radius: 40px;
          padding: 0.35rem 1rem;
          font-weight: 700;
          font-size: 0.75rem;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08), 0 0 0 3px var(--badge-color, #2c7da0);
          border: 1px solid white;
          color: var(--badge-color, #2c7da0);
          display: flex;
          align-items: center;
          justify-content: center;
          white-space: nowrap;
          background: linear-gradient(135deg, #ffffff, #f9fbfd);
          position: relative;
          transition: all 0.2s ease;
          z-index: 15;
        }

        .date-badge:hover {
          transform: scale(1.02);
          box-shadow: 0 6px 14px rgba(0, 0, 0, 0.1), 0 0 0 3px var(--badge-color, #2c7da0);
        }

        .date-text {
          font-weight: 800;
          letter-spacing: 0.3px;
          font-size: 0.7rem;
        }

        .date-dot {
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 6px;
          height: 6px;
          background: var(--badge-color, #2c7da0);
          border-radius: 50%;
          border: 1.5px solid white;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
        }

        /* Enhanced Colored Cards - Compact */
        .timeline-card-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .timeline-side-left .timeline-card-wrapper {
          flex-direction: row;
        }

        .timeline-side-right .timeline-card-wrapper {
          flex-direction: row;
        }

        .timeline-card {
          background: white;
          border-radius: 0.875rem;
          padding: 0.875rem 1rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
          transition: all 0.25s ease;
          border-left: 4px solid var(--card-color);
          position: relative;
          overflow: hidden;
          flex: 1;
          cursor: pointer;
        }

        .timeline-card::before {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 60px;
          height: 60px;
          background: radial-gradient(circle, var(--card-color) 0%, transparent 70%);
          opacity: 0.06;
          border-radius: 50%;
          pointer-events: none;
        }

        .timeline-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        }

        .card-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }

        .card-icon {
          width: 28px;
          height: 28px;
          background: var(--card-gradient);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
          color: white;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
        }

        .card-subtitle {
          font-size: 0.6rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          color: var(--card-color);
          margin-bottom: 0.1rem;
        }

        .card-title {
          font-size: 0.9rem;
          font-weight: 700;
          color: #1a2c3e;
          margin: 0;
          line-height: 1.25;
        }

        .card-description {
          color: #4a6272;
          line-height: 1.4;
          font-size: 0.75rem;
          margin: 0.4rem 0 0.5rem 0;
        }

        .card-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }

        .tag {
          background: #f0f4f9;
          padding: 0.15rem 0.5rem;
          border-radius: 20px;
          font-size: 0.6rem;
          font-weight: 500;
          color: #3a6b84;
          transition: all 0.15s ease;
        }

        .tag:hover {
          background: var(--card-color);
          color: white;
        }

        /* Arrow Connectors - Compact */
        .arrow-connector {
          opacity: 0.6;
          transition: all 0.25s ease;
        }

        .timeline-card-wrapper:hover .arrow-connector {
          opacity: 1;
          transform: translateX(var(--arrow-shift, 3px));
        }

        .timeline-side-left .arrow-connector {
          --arrow-shift: 3px;
        }

        .timeline-side-right .arrow-connector {
          --arrow-shift: -3px;
        }

        /* Placeholder for spacing */
        .timeline-placeholder {
          min-height: 5px;
        }

        /* Responsive Design */
        @media (max-width: 900px) {
          .timeline-container-compact {
            padding: 1rem;
          }
          
          .timeline-row {
            gap: 0.75rem;
            margin-bottom: 1.5rem;
          }
          
          .timeline-center {
            width: 85px;
          }
          
          .date-badge {
            padding: 0.3rem 0.75rem;
          }
          
          .date-text {
            font-size: 0.65rem;
          }
        }

        @media (max-width: 768px) {
          .timeline-compact::before {
            left: 24px;
          }
          
          .timeline-row {
            flex-direction: column;
            align-items: flex-start;
            margin-left: 1.5rem;
            gap: 0.75rem;
            margin-bottom: 1.25rem;
          }
          
          .timeline-side {
            width: 100%;
          }
          
          .timeline-center {
            position: absolute;
            left: 24px;
            top: -12px;
            transform: translateX(-50%);
            width: auto;
          }
          
          .date-badge {
            transform: scale(0.85);
          }
          
          .date-dot {
            display: none;
          }
          
          .timeline-card-wrapper {
            flex-direction: row !important;
          }
          
          .arrow-connector {
            display: none;
          }
          
          .timeline-card {
            margin-left: 0.75rem;
          }
        }

        @media (max-width: 480px) {
          .timeline-heading-compact h1 {
            font-size: 1.4rem;
          }
          
          .timeline-heading-compact p {
            font-size: 0.75rem;
          }
          
          .timeline-card {
            padding: 0.7rem;
          }
          
          .card-title {
            font-size: 0.8rem;
          }
          
          .card-description {
            font-size: 0.7rem;
          }
          
          .card-icon {
            width: 24px;
            height: 24px;
            font-size: 0.75rem;
          }
        }

        /* Footer - Compact */
        .footer-note-compact {
          text-align: center;
          margin-top: 2rem;
          padding-top: 1rem;
          border-top: 1px solid #e2e8f0;
          color: #7a9bb0;
          font-size: 0.7rem;
        }
      `}</style>

            <div className="timeline-heading-compact">
                <h1>{title}</h1>
                <p>{subtitle}</p>
            </div>

            <div className="timeline-compact">
                {data.map((item, index) => (
                    <TimelineCard key={index} item={item} index={index} />
                ))}
            </div>

            {showFooter && (
                <div className="footer-note-compact">
                    ✦ Compact Timeline | Center axis | Animated arrows | Colored cards ✦
                </div>
            )}
        </div>
    );
};

TimelineDefault.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            date: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            subtitle: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            tags: PropTypes.arrayOf(PropTypes.string).isRequired,
            side: PropTypes.oneOf(['left', 'right']).isRequired,
            color: PropTypes.string,
            gradient: PropTypes.string
        })
    ),
    title: PropTypes.string,
    subtitle: PropTypes.string,
    showFooter: PropTypes.bool,
    compact: PropTypes.bool,
    customStyles: PropTypes.shape({
        container: PropTypes.object
    })
};

export default TimelineDefault;