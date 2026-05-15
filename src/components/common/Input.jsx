// src/components/common/Input.jsx

import React from 'react';

const Input = ({ 
    label, 
    error, 
    type = 'text', 
    className = '', 
    ...props 
}) => {
    return (
        <div className={`form-group ${className}`}>
            {label && <label className="form-label">{label}</label>}
            <input 
                type={type} 
                className={`form-input ${error ? 'error' : ''}`} 
                {...props} 
            />
            {error && <p className="form-error">{error}</p>}
        </div>
    );
};

export default Input;
