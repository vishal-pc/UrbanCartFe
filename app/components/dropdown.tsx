import React from 'react';
import '@/app/style/globelColor.css';

export const Dropdown = ({ isOpen }: { isOpen: boolean }) => {
    return (
        <div
            className={`absolute transition-[opacity,margin] duration-300 ${isOpen ? 'opacity-100 block' : 'opacity-0 hidden'
                } min-w-40 bg-white shadow-md rounded-lg p-2 mt-2`}
            style={{ top: '100%', left: 0 }}
        >
            <a
                className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm custom-text-color focus:outline-none focus:bg-gray-100 custom-text-color custom-bg-color"
                href="/login"
            >
                Login
            </a>
        </div>
    );
};
