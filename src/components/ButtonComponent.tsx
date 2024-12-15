import React from 'react'

interface ButtonComponentProps {
    onClickButton:() => void;
    padding? : string;
    minWidth?: string;
    children?: React.ReactNode;
}
export const ButtonComponent: React.FC<ButtonComponentProps> = ({ onClickButton, padding, children, minWidth }) => {
    return (
        <button className='ButtonNext' onClick={onClickButton}
            style={{ padding, border: "none", minWidth: minWidth, fontWeight: "bold", cursor:"pointer"}}>
            {children}
        </button>
    )
}
