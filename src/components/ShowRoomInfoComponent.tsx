import React, { useState } from 'react'
import { useBookingContext } from './ContexApplication';
import "../css/showRoomInfoComponent.css";
interface ShowRoomInfoComponentProps {
    onClickedInput: (input: boolean) => void;
}
export const ShowRoomInfoComponent: React.FC<ShowRoomInfoComponentProps> = ({ onClickedInput }) => {
    const [inputVisible, setInputVisible] = useState<boolean>(false);
    const { getGuestInfo } = useBookingContext();

    const StatGuestFormatted = getGuestInfo("stat");
    const handleInputClick = () => {
        setInputVisible(true);
        onClickedInput(inputVisible);
    }
    return (
        <section className='ShowRoomInfoComponent'>
            <input
                type="text"
                readOnly
                value={StatGuestFormatted}
                onClick={handleInputClick}
                style={{ border: "none", paddingLeft: "1em", cursor: "pointer", position: "relative" }}
            />
            <div className='toogleInner'
                onClick={handleInputClick}
                style={{
                    transform: `rotate(180deg)`,
                    transition: 'transform 0.3s ease',
                    position: "absolute",
                    top: "50%",
                    right: "4rem"
                }}
            ></div>

        </section>
    )
}
