import React, { useState } from 'react';
import '../App.css';

const LeftSidebar = ({ onTableClick, onLayoutChange }) => {
  const [layoutType, setLayoutType] = useState('inside');

  const handleLayoutChange = (layout) => {
    setLayoutType(layout);
    onLayoutChange(layout);
  };

  return (
    <div className="left-sidebar">
      <h2>Tables</h2>
      <div className="layout-option" onClick={() => handleLayoutChange('inside')}>
        Inside Layout
      </div>
      <div className="layout-option" onClick={() => handleLayoutChange('outside')}>
        Outside Layout
      </div>
      <h3>Table Sizes</h3>
      <div className="table-option" onClick={() => onTableClick && onTableClick(2, layoutType)}>
        Table 2
      </div>
      <div className="table-option" onClick={() => onTableClick && onTableClick(4, layoutType)}>
        Table 4
      </div>
      <div className="table-option" onClick={() => onTableClick && onTableClick(6, layoutType)}>
        Table 6
      </div>
      <div className="table-option" onClick={() => onTableClick && onTableClick(8, layoutType)}>
        Table 8
      </div>
    </div>
  );
};

export default LeftSidebar;
