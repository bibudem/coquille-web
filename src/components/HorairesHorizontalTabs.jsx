import React, { useState, Children, isValidElement } from 'react';
import HoraireBibNoTitle from '@/components/HoraireBibNoTitle';
import FicheBibliothequeNoTitle from '@/components/FicheBibliothequeNoTitle';
import {ArrowSquareOutIcon} from '@phosphor-icons/react';


export const HorairesHorizontalTabs = ({ 
  defaultTab = 'A',
  codeBib='',
  onTabChange = null,
  children = null,
  componentA = null,
  componentB = null,
  componentAProps = {},
  componentBProps = {},
  tabALabel = 'Component A',
  tabBLabel = 'Component B',
  containerClassName = '',
  tabClassName = '',
  contentClassName = '',
  persistContent = false,
  animated = true
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (onTabChange && typeof onTabChange === 'function') {
      onTabChange(tab);
    }
  };

  const safeRenderComponent = (Component, props, defaultMessage, childComponent) => {
    if (childComponent && isValidElement(childComponent)) {
      return childComponent;
    }
    
    if (Component && typeof Component === 'function') {
      return React.createElement(Component, props);
    }
    
    if (Component && isValidElement(Component)) {
      return Component;
    }
    
    return (
      <div style={{ 
        padding: '20px', 
        background: '#fff3cd', 
        border: '1px solid #ffc107',
        borderRadius: '4px',
        color: '#856404'
      }}>
        <strong>⚠️ Warning:</strong> {defaultMessage}
      </div>
    );
  };

  // Now Children is properly imported
  const childrenArray = Children.toArray(children);
  let tabAChild = null;
  let tabBChild = null;

  if (childrenArray.length >= 2) {
    tabAChild = childrenArray[0];
    tabBChild = childrenArray[1];
  } else if (childrenArray.length === 1) {
    tabAChild = childrenArray[0];
  }

  const renderComponentA = () => {
    return safeRenderComponent(
      componentA,
      componentAProps,
      'No component provided for Tab A',
      tabAChild
    );
  };

  const renderComponentB = () => {
    return safeRenderComponent(
      componentB,
      componentBProps,
      'No component provided for Tab B',
      tabBChild
    );
  };

  return (
    <div className={`horizontal-tabs-container ${containerClassName}`}>
      <div className="tabs-header">
        <button
          className={`tab-button ${activeTab === 'A' ? 'active' : ''} ${tabClassName}`}
          onClick={() => handleTabChange('A')}
          type="button"
        >
          {tabALabel}
        </button>
        <button
          className={`tab-button ${activeTab === 'B' ? 'active' : ''} ${tabClassName}`}
          onClick={() => handleTabChange('B')}
          type="button"
        >
          {tabBLabel}
        </button>
      </div>
      
      <div className={`tabs-content ${contentClassName}`}>
        {persistContent ? (
          <>
            <div style={{ display: activeTab === 'A' ? 'block' : 'none' }}>
              {renderComponentA()}
            </div>
            <div style={{ display: activeTab === 'B' ? 'block' : 'none' }}>
              {renderComponentB()}
            </div>
          </>
        ) : (
          <>
            {activeTab === 'A' && renderComponentA()}
            {activeTab === 'B' && renderComponentB()}
          </>
        )}
      </div>

      <style>{`
        .horizontal-tabs-container {
          width: 100%;; {/*100%;*/}
          margin: 20px 0;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          {/*overflow: hidden;*/}
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: white;
        }

        .tabs-header {
          display: flex;
          background: #f8f9fa;
          border-bottom: 2px solid #e0e0e0;
          gap: 0;
        }

        .tab-button {
          flex: 1;
          padding: 14px 24px;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 16px;
          font-weight: 600;
          color: #666;
          transition: all 0.3s ease;
          text-align: center;
          position: relative;
        }

        .tab-button:hover {
          background-color: #e9ecef;
          color: #007bff;
        }

        .tab-button.active {
          color: #007bff;
          background: white;
        }

        .tab-button.active::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 2px;
          background-color: #007bff;
        }

        .tabs-content {
          padding: 18px;
          background: white;
          min-height: 300px;
          min-width: 350px;
          ${animated ? 'animation: fadeIn 0.3s ease;' : ''}
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};


// Export the component
export default HorairesHorizontalTabs;