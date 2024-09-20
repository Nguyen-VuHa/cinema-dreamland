
import { Suspense } from 'react';

function LayoutWatch({ children }) {

    return (
        <Suspense fallback={<div>Loading layout...</div>}>
            {children}
        </Suspense>
    );
}

export default LayoutWatch;