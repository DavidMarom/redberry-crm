'use client'

import React from 'react'
import usePopupStore from '../store/popup';
// import { EditContactPopup } from '../components/popups/EditContactPopup';

export const PopupProvider = () => {
    const popId = usePopupStore((state) => state.popId);

    return (
        <>
            {/* {(popId === 1) && <EditContactPopup />} */}
        </>
    )
}