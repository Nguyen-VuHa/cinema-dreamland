'use client'
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidV4 } from 'uuid';
import { toastifyAction } from '~/redux/reducers/toastReducer';

function useToastify() {
    const dispatch = useDispatch();

    const handlePutToastToStore = useCallback((message, type, position) => {
        dispatch(toastifyAction.createToastMessage({
            uuid: uuidV4(),
            position: position || 'top-right',
            duration: 3500,
            toastText: message,
            type: type,
        }));
    }, [dispatch]);
    
    const toastMessage = (action) => {
        const { payload } = action;

        if(action.type == 'NORMAL' || action.type == 'SUCCESS'  || action.type == 'INFO' || action.type == 'ERROR' || action.type == 'WARN') {
            handlePutToastToStore(payload.message, action.type, payload.position);
        }
    }

    return toastMessage;
}

export default useToastify;
