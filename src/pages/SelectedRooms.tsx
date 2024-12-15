import React, { useEffect, useState } from 'react';
import { Data } from '../interfaces/Data';
import { useBookingContext } from '../components/ContexApplication';
import { SelectedRoomCart } from '../components/SelectedRoomCart';
import { SelectedRoomHeader } from '../components/SelectedRoomHeader';
import "../css/selectedRoom.css";
interface SelectedRoomsProps {
    data: Data[];
    onNext: () => void;
    onPrevious: () => void;
}

export const SelectedRooms: React.FC<SelectedRoomsProps> = ({ data, onNext, onPrevious }) => {
    const { getGuestInfo, setBookingData, bookingData } = useBookingContext();
    const totalGuest = getGuestInfo('sum') as number;
    const [selectedRooms, setSelectedRooms]   = useState<Data[]>([]);
    const [availableRooms, setAvailableRooms] = useState<Data[]>([]);

    useEffect(() => {
        const filteredRooms = data.filter(room => !room.booked);
        setAvailableRooms(filteredRooms);
    }, [data]);

    const handleRoomSelection = (room: Data) => {
        const isSelected = selectedRooms.some((selectedRoom) => selectedRoom.id === room.id);
        if (isSelected) {
            setSelectedRooms(selectedRooms.filter((selectedRoom) => selectedRoom.id !== room.id));
        } else {
            const totalGuestSelected = selectedRooms.reduce((sum, selectedRoom) => sum + selectedRoom.maxGuest, 0);
            const newTotalGuest = totalGuestSelected + room.maxGuest;
            if (newTotalGuest <= totalGuest) {
                setSelectedRooms([...selectedRooms, room]);
            } else {
                alert('Cannot select more rooms than the total number of guests.');
            }
        }
    };
    const handleNext = () => {
        const totalSelectedGuests = selectedRooms.reduce((sum, selectedRoom) => sum + selectedRoom.maxGuest, 0);
        if (totalSelectedGuests >= totalGuest) {
            onNext();
            setBookingData(prev => ({
                ...prev,
                roomSelected: [...(prev.roomSelected || []), ...selectedRooms]
            }));
        } else {
            alert('You must select enough rooms to accommodate all guests.');
        }
    };
    return (
        <div className="SelectedRoomHeaderConteiner">
            <SelectedRoomHeader
                onPrevious={onPrevious}
                handleNext={handleNext}
            />
            <section>
                {availableRooms.map((room) => (
                    <div className='RoomItem' key={room.id}>
                        <SelectedRoomCart
                            roomSelected={room}
                            key={room.id}
                            text={selectedRooms.some((selectedRoom) => selectedRoom.id === room.id) ? 'Deselect' : 'Select'}
                            onSelectedRoom={() => handleRoomSelection(room)}
                        />
                    </div>
                ))}
            </section>
        </div>
    );
};