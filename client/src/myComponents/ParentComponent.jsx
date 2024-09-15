import React, { useState, useEffect } from 'react';
import RestaurantLeftSidebar from './RestaurantLeftSidebar';
import TableLayout from './TableLayout';
import '../App.css';

const ParentComponent = () => {
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [idCounter, setIdCounter] = useState(1);
  const [insideLayout, setInsideLayout] = useState(true);

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await fetch('/tables');
        if (!response.ok) {
          throw new Error('Failed to fetch tables');
        }
        const tables = await response.json();
        setTables(Array.isArray(tables) ? tables : []);
      } catch (error) {
        console.error(error);
        setTables([]);
      }
    };

    fetchTables();
  }, []);

  const handleTableClick = (tableSize, layoutType) => {
    // Generate a temporary id for new tables
    const newTable = {
      tempId: idCounter,
      size: tableSize,
      left: 0,
      top: 0,
      inside: layoutType === 'inside'
    };

    const newTables = [...tables];
    newTables.push(newTable);

    setTables(newTables);
    setSelectedTable(newTable.tempId);

    setIdCounter(prevId => prevId + 1);
  };

  const handleLayoutChange = (layout) => {
    setInsideLayout(layout === 'inside');
  };

  const handleTableMove = (id, newPosition) => {
    const newTables = [...tables];
    const index = newTables.findIndex(table => table.id === id || table.tempId === id);
    if (index !== -1) {
      newTables[index] = { ...newTables[index], ...newPosition };
      setTables(newTables);
    }
  };

  const handleDeleteTable = async (id) => {
    try {
      const table = tables.find(t => t.id === id || t.tempId === id);
      if (table && table.id) {
        const response = await fetch(`/tables/delete/${table.id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          setTables(tables.filter(t => t.id !== id));
        } else {
          const responseData = await response.json();
          console.error(responseData.message);
        }
      } else {
        setTables(tables.filter(t => t.tempId !== id));
      }
    } catch (error) {
      console.error('Failed to delete the table:', error);
    }
  };

  const handleSaveTables = async (e) => {
    e.preventDefault();

    try {
      for (const table of tables) {
        if (table.id) {
          // If the table has an ID, update it
          const response = await fetch(`/tables/update/${table.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              left: table.left,
              top: table.top
            }),
          });

          if (!response.ok) {
            throw new Error('Failed to update table');
          }
        } else if (table.tempId) {
          // If the table doesn't have an ID but has a tempId, create it
          const response = await fetch('/tables/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify([table]), // Send the table as an array
          });

          if (!response.ok) {
            throw new Error('Failed to create table');
          }
        }
      }

      console.log('Tables saved successfully');
    } catch (error) {
      console.error('Failed to save tables:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSaveTables} className="save">
        <RestaurantLeftSidebar onTableClick={handleTableClick} onLayoutChange={handleLayoutChange} />
        <TableLayout
          selectedTable={selectedTable}
          tables={tables.filter(table => table.inside === insideLayout)}
          onTableMove={handleTableMove}
          onDeleteTable={handleDeleteTable}
        />
        <button type='submit'>Save Tables</button>
      </form>
    </div>
  );
};

export default ParentComponent;
