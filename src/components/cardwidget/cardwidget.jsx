import React from 'react';
import { Badge } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';

const badgeStyle = {
    fontSize: '12px',
    padding: '2px 6px',
};

const CardWidget = ({ cantidad }) => {
    return (
        <div className="text-center position-relative">
            <FaShoppingCart size={20} />
            {cantidad > 0 && (
                <Badge bg="danger" pill style={badgeStyle} className="position-absolute top-0 start-100 translate-middle">
                    {cantidad}
                </Badge>
            )}
        </div>
    );
};

export default CardWidget;
