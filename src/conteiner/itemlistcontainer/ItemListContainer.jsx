import React from 'react';

const ItemListContainer = ({ greeting }) => {
    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        border: '1px solid #ccc',
        borderRadius: '4px',
        backgroundColor: '#f5f5f5',
        padding: '20px',
    };

    const greetingStyle = {
        fontSize: '46px',
        color: 'black',
        textAlign: 'center',
        fontStyle: 'italic',
    };

    return (
        <div style={containerStyle}>
            <p style={greetingStyle}>{greeting}</p>
        </div>
    );
};

export default ItemListContainer;
