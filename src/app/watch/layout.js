
import { Suspense } from 'react';

function LayoutWatch({ children }) {

    return (
        <Suspense>
            {children}
        </Suspense>
    );
}

export default LayoutWatch;