import React, { useEffect } from 'react';
import { useBookingContext } from './ContexApplication';
import "../css/ageCartComponent.css"
import { Room } from '../interfaces/Room';

interface AgeCartComponentProps {
    childrenCount: number;
    roomIndex: number;
    room: Room;
}

export const AgeCartComponent: React.FC<AgeCartComponentProps> = ({ room, roomIndex, childrenCount }) => {
    const { updateAges, handleAgesChanges } = useBookingContext();

    useEffect(() => {
        updateAges(roomIndex, childrenCount);
    }, [childrenCount, roomIndex, updateAges]);

    return (
        <div className='AgeCartComponent'>
            {room.child.ages?.map((value, index) => (
                <div key={index}>
                    <select
                        className='custom-select'
                        style={{ width: "12rem", fontSize: "4rem", marginBottom: "0.2rem" }}
                        key={index}
                        value={value}
                        onChange={(e) => handleAgesChanges(roomIndex, index, Number(e.target.value))}
                    >
                        <option value="">
                            --Select child {index + 1} Age--
                        </option>
                        {[...Array(18)].map((_, optionIndex) => (
                            <option
                                key={optionIndex}
                                value={optionIndex}
                            >
                                {optionIndex} years old
                            </option>
                        ))}
                    </select>
                </div>
            ))}
        </div>
    );
};