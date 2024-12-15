import React from 'react';
import { useBookingContext } from './ContexApplication';
interface HandleDeleteRoomProps {
    roomIndex: number;
}
export const HandleDeleteRoom: React.FC<HandleDeleteRoomProps> = ({ roomIndex }) => {
    const { handleDeleteRoom } = useBookingContext();
    return (
        <section
            className='HandleDeleteRoom'
            style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
            {roomIndex > 1 &&
                <div>
                    <button
                        onClick={() => handleDeleteRoom(roomIndex)}
                        style={{ padding: "0.6em", fontWeight: "bold", border: "none", borderRadius: "3rem", cursor: "pointer" }}
                    > delete
                    </button>
                </div>
            }
        </section>
    )
}
