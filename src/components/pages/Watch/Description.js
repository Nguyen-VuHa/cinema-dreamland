import React, { useState } from 'react';

const maxLength = 300
function Description({ description }) {
    
    const [isExpanded, setIsExpanded] = useState(false);

    // Hàm toggle để chuyển giữa "Xem thêm" và "Ẩn bớt"
    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    // Kiểm tra nếu text dài hơn maxLength
    const shouldTruncate = description.length > maxLength;

    return (
        <>
            <p>
                {isExpanded || !shouldTruncate ? description : `${description.slice(0, maxLength)}...`}
            </p>
            {shouldTruncate && (
                <button className='text-primary underline mt-2' onClick={toggleExpand}>
                    {isExpanded ? 'Ẩn bớt' : 'Xem thêm'}
                </button>
            )}
        </>
    );
}

export default Description;