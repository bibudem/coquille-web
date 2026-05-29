// components/DisplayTimeline.jsx
import { useState, useRef, useEffect } from 'react';
import TimelineDefault from './TimelineDefault';
import HeroWithText from './HeroWithText';

const DisplayTimeline = ({
  // Tata99 props
  leftColl = {},
  rightColl = null,

  // Button props
  buttonText = "",
  buttonClassName = "",
  buttonStyle = {},

  // Timeline props
  timelineData,
  timelineTitle = "",
  timelineSubtitle = "",
  showFooter = true,

  // Behavior props
  autoScroll = true,
  onDisplay,
  onHide,
  toggleMode = false,
  initialVisible = false,

  // Additional children
  children
}) => {
  const [showTimeline, setShowTimeline] = useState(initialVisible);
  const timelineRef = useRef(null);
  const hasDisplayed = useRef(false);

  const handleDisplayClick = () => {
    console.log('Display button clicked - showing timeline');
    const newState = toggleMode ? !showTimeline : true;
    setShowTimeline(newState);

    if (newState) {
      // Timeline is being displayed
      if (onDisplay) onDisplay();

      if (autoScroll && !hasDisplayed.current) {
        setTimeout(() => {
          timelineRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          hasDisplayed.current = true;
        }, 100);
      }
    } else {
      // Timeline is being hidden (toggle mode)
      if (onHide) onHide();
      hasDisplayed.current = false;
    }
  };

  // Wrap the button click handler to work with any button inside rightColl
  const handleAnyButtonClick = (originalOnClick, e) => {
    // Call the original onClick if it exists
    if (originalOnClick) {
      originalOnClick(e);
    }
    // Always trigger the timeline display
    handleDisplayClick();
  };

  // Recursively find and wrap buttons with onClick handler
  const wrapButtonsWithHandler = (element) => {
    if (!element) return element;

    // If it's a button element or custom Button component
    if (element.type && (element.type === 'button' || element.type?.name === 'Button' || element.props?.onClick)) {
      const originalOnClick = element.props.onClick;
      return React.cloneElement(element, {
        onClick: (e) => handleAnyButtonClick(originalOnClick, e)
      });
    }

    // If it has children, recursively process them
    if (element.props && element.props.children) {
      const children = React.Children.map(element.props.children, child =>
        wrapButtonsWithHandler(child)
      );
      return React.cloneElement(element, { ...element.props, children });
    }

    return element;
  };

  // Build rightColl content with button handlers
  const renderRightColl = () => {
    // If custom rightColl is provided, wrap its buttons with the handler
    if (rightColl) {
      // Process the rightColl to add onClick handlers to all buttons
      const processedRightColl = wrapButtonsWithHandler(rightColl);
      return processedRightColl;
    }

    // Default button
    return (
      <button
        onClick={handleDisplayClick}
        className={`display-timeline-btn ${buttonClassName}`}
        style={buttonStyle}
      >
        {toggleMode && showTimeline ? 'Hide' : buttonText}
      </button>
    );
  };

  return (
    <div className="display-timeline">
      <HeroWithText
        leftColl={leftColl}
        rightColl={renderRightColl()}
      />

      {children && (
        <div className="controller-children">
          {children}
        </div>
      )}

      {showTimeline && (
        <div className="timeline-bottom" ref={timelineRef}>
          <TimelineDefault
            data={timelineData}
            title={timelineTitle}
            subtitle={timelineSubtitle}
            showFooter={showFooter}
          />
        </div>
      )}

      <style>{`
        .display-timeline {
          width: 100%;
          display: flex;
          flex-direction: column;
        }
        
        .controller-children {
          margin: 1rem 0;
        }
        
        .display-timeline-btn {
          background: linear-gradient(135deg, #2c7da0, #1e5a77);
          color: white;
          border: none;
          padding: 0.75rem 2rem;
          border-radius: 0.75rem;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: inherit;
          box-shadow: 0 4px 12px rgba(44, 125, 160, 0.3);
        }
        
        .display-timeline-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(44, 125, 160, 0.4);
          background: linear-gradient(135deg, #1e5a77, #2c7da0);
        }
        
        .display-timeline-btn:active {
          transform: translateY(1px);
        }
        
        .timeline-bottom {
          margin-top: 3rem;
          width: 100%;
          animation: slideUp 0.5s cubic-bezier(0.2, 0.9, 0.4, 1.1);
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Responsive */
        @media (max-width: 768px) {
          .display-timeline-btn {
            padding: 0.6rem 1.5rem;
            font-size: 0.9rem;
          }
          
          .timeline-bottom {
            margin-top: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default DisplayTimeline;