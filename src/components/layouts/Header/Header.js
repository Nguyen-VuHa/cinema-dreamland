import React from 'react';
import SearchBar from './SearchBar';
import Control from './Control';

function Header() {
    return (
        <div className='z-[10] backdrop-blur-lg sticky top-0 left-0 w-full flex justify-between items-center py-8'>
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