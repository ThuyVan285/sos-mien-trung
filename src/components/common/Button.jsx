// src/components/common/Button.jsx

import React from 'react';
import './Button.css'; // Nếu bạn có file CSS riêng

const Button = ({ 
    children, 
    onClick, 
    type = 'button', 
    variant = 'primary', // primary, secondary, danger, success, warning
    size = 'medium',    // small, medium, large
    disabled = false,
    className = '',
    icon: Icon,
    ...props 
}) => {
    return (
        <button
            type={type}
            className={`btn btn-${variant} btn-${size} ${className} ${disabled ? 'btn-disabled' : ''}`}
            onClick={!disabled ? onClick : undefined}
            disabled={disabled}
            {...props}
        >
            {Icon && <span className="btn-icon">{Icon}</span>}
            {children}
        </button>
    );
};

export default Button;
