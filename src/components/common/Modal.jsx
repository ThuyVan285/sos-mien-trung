// src/components/common/Modal.jsx

import React from 'react';
import { X } from 'lucide-react';

const Modal = ({ 
    isOpen, 
    onClose, 
    title, 
    children, 
    footer,
    maxWidth = '600px'
}) => {
    if (!isOpen) return null;

    return (
        <div className="sos-overlay" onClick={onClose}>
            <div 
                className="sos-modal" 
                style={{ maxWidth }} 
                onClick={(e) => e.stopPropagation()}
            >
                <div className="sos-modal-header">
                    <div className="sos-modal-title">
                        <h2>{title}</h2>
                    </div>
                    <button className="sos-close-btn" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>
                <div className="sos-modal-body">
                    {children}
                </div>
                {footer && (
                    <div className="sos-modal-footer">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Modal;
