import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const LoadingSpinner = ({ 
  size = 'default', 
  tip = 'Loading...', 
  spinning = true, 
  children,
  style = {},
  className = ''
}) => {
  const antIcon = <LoadingOutlined style={{ fontSize: size === 'large' ? 24 : 16 }} spin />;

  // If no children provided, show just the spinner
  if (!children) {
    return (
      <div className={`loading-spinner-container ${className}`} style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '200px',
        ...style 
      }}>
        <Spin indicator={antIcon} size={size} tip={tip} />
      </div>
    );
  }

  // Wrap children with spinner
  return (
    <Spin 
      indicator={antIcon} 
      size={size} 
      tip={tip} 
      spinning={spinning}
      className={className}
      style={style}
    >
      {children}
    </Spin>
  );
};

// Different loading states for specific use cases
export const PageLoader = ({ message = 'Loading page...' }) => (
  <div className="page-loader" style={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    zIndex: 9999
  }}>
    <LoadingSpinner size="large" tip={message} />
  </div>
);

export const CardLoader = ({ height = '200px' }) => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height,
    backgroundColor: '#f5f5f5',
    borderRadius: '8px'
  }}>
    <LoadingSpinner />
  </div>
);

export const ButtonLoader = ({ loading = false, children, ...props }) => (
  <button {...props} disabled={loading}>
    {loading && <LoadingOutlined style={{ marginRight: '8px' }} />}
    {children}
  </button>
);

export default LoadingSpinner;