import React, { useState, useRef, useEffect } from 'react';
import FlipCardWithImage from './FlipCardWithImage';
import HeroWithText2 from '@/components/HeroWithText2';

// Styles par défaut
const defaultStyles = {
  container: {
    marginBottom: '2rem',
    position: 'relative'
  },
  clickableArea: {
    cursor: 'pointer'
  },
  tutuContainer: {
    marginTop: '1rem',
    animation: 'slideDown 0.3s ease-out'
  }
};

// Animation CSS
const animationStyles = `
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const ClickableFlipCard = ({
  cardProps,
  tutuProps,
  customStyles = {},
  showAnimation = true,
  closeOnSecondClick = true,
  onOpen = () => { },
  onClose = () => { },
  onToggle = () => { }
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCardClick = () => {
    const newState = closeOnSecondClick ? !isOpen : true;
    setIsOpen(newState);

    if (newState && !isOpen) {
      onOpen();
    } else if (!newState && isOpen) {
      onClose();
    }
    onToggle(newState);
  };

  const mergedStyles = {
    container: { ...defaultStyles.container, ...customStyles.container },
    clickableArea: { ...defaultStyles.clickableArea, ...customStyles.clickableArea },
    tutuContainer: { ...defaultStyles.tutuContainer, ...customStyles.tutuContainer }
  };

  return (
    <>
      <style>{showAnimation && animationStyles}</style>
      <div style={mergedStyles.container}>
        <div onClick={handleCardClick} style={mergedStyles.clickableArea}>
          <FlipCardWithImage {...cardProps} />
        </div>

        {isOpen && (
          <div style={mergedStyles.tutuContainer}>
            <HeroWithText2 {...tutuProps} />
          </div>
        )}
      </div>
    </>
  );
};

export const CompactInteractiveFlipCard = ({
  cardProps,
  showIndicator = true,
  isExpanded,
  onToggle
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div style={{ width: '100%', minWidth: '280px', flex: '0 0 auto' }}>
      <div
        onClick={onToggle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          cursor: 'pointer',
          position: 'relative',
          transition: 'all 0.2s ease',
          transform: isHovered ? 'scale(1.03)' : 'scale(1)',
          borderRadius: '10px',
          overflow: 'hidden',
          boxShadow: isHovered
            ? '0 10px 20px rgba(0,0,0,0.15)'
            : '0 2px 6px rgba(0,0,0,0.1)'
        }}
      >
        <FlipCardWithImage {...cardProps} />

        {showIndicator && (
          <div style={{
            position: 'absolute',
            bottom: '10px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(0,0,0,0.75)',
            color: '#fff',
            padding: '5px 14px',
            borderRadius: '20px',
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <span>{isExpanded ? '▲' : '▼'}</span>
            <span>{isExpanded ? 'Fermer' : 'Détails'}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export const HorizontalCardList = ({ items = [] }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const detailRef = useRef(null);

  const handleToggle = (index) => {
    setExpandedIndex(prev => (prev === index ? null : index));
  };

  const activeItem = expandedIndex !== null ? items[expandedIndex] : null;

  // ✅ Smooth scroll to detail panel
  useEffect(() => {
    if (activeItem && detailRef.current) {
      detailRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, [activeItem]);

  return (
    <div style={{ width: '100%' }}>

      {/* Horizontal scroll */}
      <div style={{
        display: 'flex',
        overflowX: 'auto',
        gap: '1.5rem',
        padding: '1rem 0.5rem',
        scrollBehavior: 'smooth',
        WebkitOverflowScrolling: 'touch'
      }}>
        {items.map((item, index) => (
          <div key={index} style={{
            minWidth: '320px',
            maxWidth: '350px',
            flex: '0 0 auto'
          }}>
            <CompactInteractiveFlipCard
              cardProps={item.cardProps}
              showIndicator
              isExpanded={expandedIndex === index}
              onToggle={() => handleToggle(index)}
            />
          </div>
        ))}
      </div>

      {/* ✅ Shared bottom panel */}
      {activeItem && (
        <div
          ref={detailRef}
          style={{
            width: '100%',
            marginTop: '1rem',
            background: '#00407f',
            borderTop: '1px solid #e2e8f0',
            borderBottom: '1px solid #e2e8f0',
            padding: '2rem 0',
            animation: 'fadeIn 0.25s ease'
          }}
        >
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 1rem',
            display: 'flex',
            justifyContent: 'center'
          }}>
            <div style={{ width: '100%' }}>
              <HeroWithText2
                leftColl={activeItem.leftColl}
                rightColl={activeItem.rightColl}
                leftFooter={
                  activeItem.leftFooter || activeItem.bottomCenterContent
                }
              />
            </div>
          </div>
        </div>
      )}

      {/* Optional animation */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
};

export default ClickableFlipCard;