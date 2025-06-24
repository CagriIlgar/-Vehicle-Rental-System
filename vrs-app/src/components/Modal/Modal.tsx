'use client';

import React, { useState, useEffect } from 'react';
import "../Modal/modal.css";

interface Business {
    SellerID: number;
    BusinessName: string;
    Industry: string;
    ContactPersonName: string;
    ContactPersonSurname: string;
    BusinessEmail: string;
    BusinessCity: string;
    BusinessAddress: string;
    BusinessPhone: string;
    Approved: boolean | null;
}

interface Customer {
    CustomerID: number;
    CustomerName: string;
    CustomerSurname: string;
    DateOfBirth: string;
    CustomerEmail: string;
    CustomerPhone: string;
}

type EditableEntity = Business | Customer;

interface ModalProps {
    type: 'business' | 'customer';
    data: EditableEntity;
    onClose: () => void;
    onUpdate: () => void;
}

const Modal: React.FC<ModalProps> = ({ type, data, onClose, onUpdate }) => {
    const [updatedItem, setUpdatedItem] = useState({ ...data });
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        setUpdatedItem({ ...data });
        setError('');
    }, [data]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUpdatedItem((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        setIsSaving(true);
        setError('');

        if ('DateOfBirth' in updatedItem && updatedItem.DateOfBirth?.includes('T')) {
            updatedItem.DateOfBirth = updatedItem.DateOfBirth.split('T')[0];
        }

        try {
            const response = await fetch('/api/admin', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedItem),
            });

            let result;
            try {
                result = await response.json();
            } catch {
                result = null;
            }

            if (!response.ok) {
                console.error('Server error:', result);
                throw new Error(result?.error || 'Update failed');
            }

            onUpdate();
            onClose();
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message || 'Error saving changes');
            } else {
                setError('Unknown error');
            }
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content-scrollable">
                <div className="modal-header">
                    <h3>Edit {type === 'business' ? 'Business' : 'Customer'}</h3>
                    <button onClick={onClose}>✖</button>
                </div>

                <div className="modal-body">
                    {Object.entries(updatedItem).map(([key, value]) => {
                        if (key === 'Approved' || key.toLowerCase().includes('password')) return null;

                        const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
                        const isDateField = key === 'DateOfBirth';
                        const inputType = isDateField ? 'date' : 'text';

                        let inputValue: string = '';

                        if (isDateField && typeof value === 'string') {
                            const date = new Date(value);
                            const correctedDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
                            inputValue = correctedDate.toISOString().split('T')[0];
                        } else {
                            inputValue = value?.toString() || '';
                        }

                        const isReadOnlyID = key === 'CustomerID' || key === 'SellerID';

                        return (
                            <div key={key}>
                                <label htmlFor={key}>{label}:</label>
                                <input
                                    id={key}
                                    name={key}
                                    value={inputValue}
                                    onChange={handleChange}
                                    type={inputType}
                                    disabled={isReadOnlyID}
                                />
                            </div>
                        );
                    })}
                </div>

                {error && <p className="error-message">{error}</p>}

                <div className="modal-footer">
                    <button onClick={onClose}>Cancel</button>
                    <button onClick={handleSave} disabled={isSaving}>
                        {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
