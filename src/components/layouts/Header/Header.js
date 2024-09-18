import React from 'react';
import SearchBar from './SearchBar';
import Control from './Control';

function Header() {
    return (
        <div className='w-full flex justify-between items-center py-8'>
            {/* Search bar */}
            <div className='w-full'>
                <SearchBar />
            </div>
            {/* Group control */}
            <Control />
        </div>
    );
}

export default Header;