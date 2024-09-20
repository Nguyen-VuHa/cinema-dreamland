import React from 'react';
import SearchBar from './SearchBar';
import Control from './Control';
import Button from '~/components/ui/Button';
import { CiMenuFries } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import { configAction } from '~/redux/reducers/configReducer';

function Header() {
    const dispatch = useDispatch()
    const { isMenuSideBar } = useSelector(state => state.configState)

    return (
        <div className='z-[10] backdrop-blur-lg sticky top-0 left-0 w-full flex justify-between items-center py-8  space-x-2'>
            {/* Button Menu */}
            <div className='flex w-full'>
                <Button 
                    className="!w-fit hidden mr-2 max-md:block"
                    onClick={() => {
                        dispatch(configAction.setIsMenuSideBar(!isMenuSideBar))
                    }}
                >
                    <CiMenuFries 
                        className='text-[18px]'
                    />
                </Button>
                {/* Search bar */}
                <div className='w-full'>
                    <SearchBar />
                </div>
            </div>
            {/* Group control */}
            <Control />
        </div>
    );
}

export default Header;