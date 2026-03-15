import React from 'react';
import { useToast } from '../context/ToastContext';

const Toast = () => {
    const { toast } = useToast();

    const getIcon = () => {
        switch (toast.type) {
            case 'success': return '✅';
            case 'info': return 'ℹ️';
            case 'error': return '❌';
            default: return '✅';
        }
    };

    return (
        <div className={`toast ${toast.show ? 'show' : ''}`} id="toast">
            <span className="toast-icon">{getIcon()}</span>
            <span className="toast-message" id="toast-message">{toast.message}</span>
        </div>
    );
};

export default Toast;
