import React from 'react';

const Popup = ({ message, onClose }) => {
    const popupStyle = {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: '999',
    };

    const popupContentStyle = {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '5px',
        position: 'relative',
    };

    const closeStyle = {
        position: 'absolute',
        top: '10px',
        right: '10px',
        cursor: 'pointer',
        fontSize: '20px',
        color: '#555',
    };

    return (
        <div style={popupStyle}>
            <div style={popupContentStyle}>
                <span style={closeStyle} onClick={onClose}>&times;</span>
                <p>{message}</p>
            </div>
        </div>
    );
};

export default Popup;
