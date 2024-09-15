import React from 'react';
import '../App.css';

const ReservationTableDisplay = ({ tables, onTableReservation }) => {
    return (
        <div className="dropzone" style={{ position: 'relative', width: '100%', height: '500px', border: '2px dashed #aaa' }}>
            {tables.map(table => (
                <div
                    key={table.id}
                    className={`table table-${table.size} ${table.reserved ? 'reserved' : table.selected ? 'selected' : ''}`}
                    style={{ left: table.left, top: table.top, position: 'absolute' }}
                    onClick={() => !table.reserved && onTableReservation(table.id)}
                >
                    Table {table.size}
                </div>
            ))}
        </div>
    );
};

export default ReservationTableDisplay;
