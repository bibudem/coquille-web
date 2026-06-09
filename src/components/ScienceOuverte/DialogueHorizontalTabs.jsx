import { useState, Children, isValidElement } from 'react';


export const DialogueOuverteHorizontalTabs = ({
  tabs = [],
  verticalSpacing = '1.5rem',
  showDividers = true,
  maxHeight = '800px' //'600px'
}) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="vertical-content-tabs">
      {/* Horizontal Tab Headers */}
      <div className="tab-headers">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`tab-header ${activeTab === index ? 'active' : ''}`}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Vertical Content */}
      <div className="vertical-content-area">
        {tabs[activeTab].content}
      </div>

      <style>{`
        .vertical-content-tabs {
          border: 1px solid #00407;
          border-radius: 12px;
          overflow: hidden;
          background: #00407;
          color: #02090f;
        }

        .tab-headers {
          display: flex;
          background: #cce2f3;
          border-bottom: 2px solid #cce2f3;
        }

        .tab-header {
          flex: 1;
          padding: 16px 24px;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 16px;
          font-weight: 600;
          color: #02090f;
          transition: all 0.3s;
          text-align: center;
        }

        .tab-header.active {
          color: #00407;
          background: white;
          position: relative;
        }

        .tab-header.active::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 2px;
          background: #00407f;
        }

        .vertical-content-area {
          padding: 0.5px 0.5px 0.5px 0.5px;
          max-height: ${maxHeight};
          /*overflow-y: auto; padding: 24px;*/
        }

        /* Vertical content styling */
        .vertical-content-area > * {
          margin-bottom: ${verticalSpacing};
        }

        .vertical-content-area > *:last-child {
          margin-bottom: 0;
        }

        ${showDividers && `
          .vertical-content-area > *:not(:last-child) {
            border-bottom: 1px solid #00407f;
            padding-bottom: ${verticalSpacing};
          }
        `}

        /* Responsive */
        @media (max-width: 768px) {
          .tab-header {
            padding: 12px 16px;
            font-size: 14px;
          }
          
          .vertical-content-area {
            padding: 16px;
          }
        }

        @media (max-width: 480px) {
          .tab-headers {
            flex-direction: column;
          }
          
          .tab-header.active::after {
            bottom: auto;
            left: 0;
            top: 0;
            height: 100%;
            width: 3px;
          }
        }
      `}</style>
    </div>
  );
};


export default DialogueOuverteHorizontalTabs;