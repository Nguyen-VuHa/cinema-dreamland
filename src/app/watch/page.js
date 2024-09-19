import React from 'react';
import dynamic from 'next/dynamic';
import Recommend from '~/components/pages/Watch/Recommend';
const ScreenView = dynamic(() => import('~/components/pages/Watch/ScreenView'), { ssr: false });

function WatchPage() {
    return (
        <div className='grid lg:grid-flow-row-dense lg:grid-cols-4 gap-2'>
            <div className='lg:col-span-3'>
                <ScreenView />
            </div>
            <div>
                <Recommend />
            </div>
        </div>
    );
}

export default WatchPage;