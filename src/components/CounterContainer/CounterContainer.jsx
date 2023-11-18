import React from 'react';

const CounterContainer = ({ quantity, setQuantity }) => {
    const handleIncrease = () => {
        setQuantity(quantity + 1);
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const counterWrapperStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '150px',
        margin: '0 auto',
    };

    const counterButtonStyle = {
        padding: '8px 12px',
        fontSize: '1.2em',
        border: 'none',
        borderRadius: '4px',
        backgroundColor: '#3498db',
        color: 'white',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    };

    const counterValueStyle = {
        fontSize: '1.5em',
        fontWeight: 'bold',
    };

    return (
        <div style={counterWrapperStyle}>
            <button style={counterButtonStyle} onClick={handleDecrease}>-</button>
            <span style={counterValueStyle}>{quantity}</span>
            <button style={counterButtonStyle} onClick={handleIncrease}>+</button>
        </div>
    );
};

export default CounterContainer;
