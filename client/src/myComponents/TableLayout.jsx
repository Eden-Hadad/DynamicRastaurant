import React, { useState } from 'react';
import '../App.css';

const TableLayout = ({ tables, onTableMove, onDeleteTable }) => {
  const [draggedTable, setDraggedTable] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleDragStart = (e, table) => {
    setDraggedTable(table);

    // Calculate and store the mouse offset relative to the table's top-left corner
    const rect = e.target.getBoundingClientRect();
    setOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });

    e.dataTransfer.effectAllowed = 'move';
    e.target.classList.add('dragging');
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Allow drop
  };

  const handleDrop = (e) => {
    e.preventDefault();

    if (draggedTable !== null) {
      const dropzoneRect = e.currentTarget.getBoundingClientRect();
      const newX = e.clientX - dropzoneRect.left - offset.x;
      const newY = e.clientY - dropzoneRect.top - offset.y;

      // Only update locally, do not save to the backend
      onTableMove(draggedTable.id, { left: newX, top: newY });
      setDraggedTable(null);
    }

    // Remove dragging class from all tables
    document.querySelectorAll('.table.dragging').forEach((el) => {
      el.classList.remove('dragging');
    });
  };

  const handleDragEnd = () => {
    setDraggedTable(null);

    // Remove dragging class from all tables
    document.querySelectorAll('.table.dragging').forEach((el) => {
      el.classList.remove('dragging');
    });
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    onDeleteTable(id); // Delete locally, do not save to backend yet
  };

  return (
    <div
      className="dropzone"
      style={{
        position: 'relative',
        width: '100%',
        height: '500px',
        border: '1px solid #ccc',
        marginTop: '20px',
      }}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {tables.map((table) => (
        <div
          key={table.id}
          className={`table table-${table.size}`}
          style={{
            left: `${table.left}px`,
            top: `${table.top}px`,
            position: 'absolute',
            cursor: 'move',
          }}
          draggable
          onDragStart={(e) => handleDragStart(e, table)}
          onDragEnd={handleDragEnd}
        >
          Table {table.size}
          <button
            type="button"
            onClick={(e) => handleDelete(e, table.id)}
            style={{ margin: '5px' }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default TableLayout;
