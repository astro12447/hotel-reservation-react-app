import React from 'react'
import { useBookingContext } from './ContexApplication';
import "../css/SelectedRoomHeader.css";
interface SelectedRoomHeaderProps {
    handleNext: () => void;
    onPrevious: () => void;
}
export const SelectedRoomHeader: React.FC<SelectedRoomHeaderProps> = ({ handleNext, onPrevious }) => {
    const { getGuestInfo } = useBookingContext();
    const StatGuestFormatted = getGuestInfo("stat");
    return (
        <header className='Header flex'>
            <div>
                <button
                    onClick={onPrevious}
                    style={{ padding: "1em", border: "none", width: "6rem", fontWeight: "bold" , borderRadius:"1rem"}}
                >Prev
                </button>
            </div>
            <div style={{display:"flex"}}>
                <div>
                    <input type="text"
                        value={StatGuestFormatted}
                        readOnly
                        style={{ padding: "1em", fontWeight: "bold", minWidth: "40rem", border:"none" }}
                    />
                </div>

                <div>
                    <button
                        onClick={handleNext}
                        style={{ padding: "1em", border: "none", width: "6rem", fontWeight: "bold" }}
                    >
                        Booking
                    </button>
                </div>
            </div>
        </header>
    )
}
