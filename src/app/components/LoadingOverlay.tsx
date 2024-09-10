import React from 'react';

const LoadingOverlay: React.FC = () => {
  return (
    <div className="loading-overlay">
      <div className="loading-message">Loading...</div>
      <style jsx>{`
        .loading-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
        }
        .loading-message {
          color: white;
          font-size: 24px;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default LoadingOverlay;
