import { useBookingContext } from './ContexApplication';
import { HandleGuest } from './HandleGuest';
import "../css/roomManagemantComponent.css";
import { useState } from 'react';
interface GuestManagementPrpos {
    isSchildrenMenuDisplay: () => void;
}

export const GuestManagemant: React.FC<GuestManagementPrpos> = ({ isSchildrenMenuDisplay }) => {
    const { bookingData, handleAddNewRoom, checkAges } = useBookingContext();
    const [errorMessage, setErrorMessage] = useState('');

    const handleNextClick = () => {
        const result = checkAges();
        console.log(result);
        if (result!==true) {
            setErrorMessage(result)
        } else {
            setErrorMessage('');
            isSchildrenMenuDisplay();
        }
    };

    console.log(bookingData);

    return (
        <section className='RoomManagemantComponent flex'>
            {Array.from(bookingData.rooms.entries()).map(([roomIndex, room]) => (
                <section
                    key={roomIndex}
                    className='Guest'
                    style={{
                        padding: "0.5em",
                        backgroundColor: "#fff"
                    }}
                >
                    <HandleGuest
                        room={room}
                        roomIndex={roomIndex}
                    />
                </section>
            ))}

            <div style={{marginTop:"1em"}}>
                <button
                    style={{padding:"0.8rem", 
                            width:"8rem",
                            backgroundColor:"rgb(73, 72, 72)", 
                            border:"none",
                            fontWeight:"bold",
                            color:"#fff",
                     }}
                    onClick={handleAddNewRoom}
                >Add Room
                </button>
                {errorMessage && <div className='error-message'>{errorMessage}</div>}
                <button
                    style={{
                        padding:"0.8rem", 
                        width:"9rem", 
                        backgroundColor:"rgb(73, 72, 72)", 
                        border:"none", 
                        marginLeft:"0.4rem",
                        color:"#fff",
                        fontWeight:"bold"
                    }}
                    onClick={handleNextClick}
                >
                    Next
                </button>

            </div>
        </section>
    );
};