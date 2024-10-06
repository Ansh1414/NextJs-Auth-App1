import { useState } from 'react';

const RightNav = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative">
            <button 
                className="bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none"
                onClick={toggleMenu}
            >
                Account
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-black border border-gray-200 rounded-md shadow-lg z-10">
                    <ul className="py-2">
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profile</li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Transactions</li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Logout</li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default RightNav;
