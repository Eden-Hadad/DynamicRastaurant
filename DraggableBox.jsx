

import React, { useState } from 'react';

const DraggableBox = () => {
    const [newPosX, setNewPosX] = useState(0);
    const [newPosY, setNewPosY] = useState(0);
    const [startPosX, setStartPosX] = useState(0);
    const [startPosY, setStartPosY] = useState(0);

    const handleMouseDown = (e) => {
        e.preventDefault();
        setStartPosX(e.clientX);
        setStartPosY(e.clientY);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', handleMouseMove);
        });
    };

    const handleMouseMove = (e) => {
        const deltaX = startPosX - e.clientX;
        const deltaY = startPosY - e.clientY;
        setNewPosX(deltaX);
        setNewPosY(deltaY);
        setStartPosX(e.clientX);
        setStartPosY(e.clientY);
    };

    return (
        <span
            className="box"
            onMouseDown={handleMouseDown}
            style={{
                position: 'relative',
                top: -newPosY + 'px', // Invert the value of newPosY
                left: -newPosX + 'px', // Invert the value of newPosX
                border: '1px solid black',
                padding: '20px',
            }}
        >
            Drag me
        </span>
    );
};

export default DraggableBox;
