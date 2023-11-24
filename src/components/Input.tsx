'use client'
import React from 'react';

interface MyComponentProps {
    label: string;
    placeholder: string;
}

const Input: React.FC<MyComponentProps> = ({ label, placeholder }) => {
    return (
        <div className="mb-4" >
            <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
            <input
                placeholder={placeholder}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
        </div>
    );
};

export default Input;