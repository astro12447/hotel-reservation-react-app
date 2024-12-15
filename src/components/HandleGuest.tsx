import React from 'react';
import { Room } from '../interfaces/Room';
import { useBookingContext } from './ContexApplication';
import { AgeCartComponent } from './AgeCartComponent';
import "../css/handleguest.css";
interface HandleGuestProps {
    room: Room;
    roomIndex: number;
}
export const HandleGuest: React.FC<HandleGuestProps> = ({ room, roomIndex }) => {
    const {
        adultQuantityDecrement,
        adultQuantityIncrement,
        childrenQuantityDecrement,
        childrenQuantityIncrement,
        handleDeleteRoom
    }
        = useBookingContext();
    return (
        <section className='HandleGuestConteiner' >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <p style={{ fontWeight: "bold" }} className='HandleGuestConteinerTitle'> Room  {roomIndex}</p>
                {roomIndex > 1 &&
                    <button
                        onClick={() => handleDeleteRoom(roomIndex)}
                        style={{ padding: "0.5em", border: "none", fontWeight: "bold", borderRadius: "1rem", cursor: "pointer" }}
                    > Delete Room
                    </button>
                }
            </div>
            <div>
                <h4 style={{ marginBottom: "0.25em", marginTop: "0.25em" }}> Select Adult quantity</h4>

                <button
                    style={{ minWidth: "4rem", border: "none", padding: "0.5em", cursor: "pointer", borderRadius: "0.6em" }}
                    onClick={() => adultQuantityIncrement(roomIndex)}
                >+
                </button>

                <input
                    style={{ maxWidth: "6rem", textAlign: "center", padding: "0.4em", border: "none", fontWeight: "bold" }}
                    type="text"
                    value={room.adultCount}
                    readOnly
                />
                <button
                    style={{ minWidth: "4rem", border: "none", padding: "0.5em", cursor: "pointer", borderRadius: "0.6em" }}
                    onClick={() => adultQuantityDecrement(roomIndex)}
                    disabled={room.adultCount === 1}
                >-
                </button>

            </div>
            <div>
                <h4 style={{ marginBottom: "0.5em", marginTop: "0.5em" }}>Select Children quantity</h4>
                <button
                    style={{ minWidth: "4rem", border: "none", padding: "0.5em", cursor: "pointer", borderRadius: "0.6em" }}
                    onClick={() => childrenQuantityIncrement(roomIndex)}
                >+
                </button>

                <input
                    style={{ maxWidth: "6rem", textAlign: "center", padding: "0.4em", border: "none", fontWeight: "bold" }}
                    type="text"
                    value={room.child.childCount}
                    readOnly
                />

                <button
                    style={{ minWidth: "4rem", border: "none", padding: "0.5em", cursor: "pointer", borderRadius: "0.6em" }}
                    onClick={() => childrenQuantityDecrement(roomIndex)}
                    disabled={room.child.childCount === 0}
                >-
                </button>

            </div>
            <div style={{ marginTop: "1em" }}>
                <section style={{ maxWidth: "13rem" }}>
                    <h4 style={{ marginBottom: "1em" }}>Select Age of Children</h4>
                    <AgeCartComponent
                        childrenCount={room.child.childCount!}
                        roomIndex={roomIndex}
                        room={room}
                        key={roomIndex}
                    />
                </section>

            </div>
        </section>
    )
}
