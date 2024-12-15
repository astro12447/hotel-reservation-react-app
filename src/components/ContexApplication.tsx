import React, { createContext, useState, useContext, useCallback } from "react";
import { resevationData } from "../interfaces/ReservationData";
import { Room } from "../interfaces/Room";
import { date } from "../interfaces/BookedDate";
import { guest } from "../interfaces/guest";
type field = "adultCount" | "childCount";

interface BookingContextProps {
    bookingData: resevationData;
    setBookingData: React.Dispatch<React.SetStateAction<resevationData>>;
    handleAddNewRoom: () => void;
    handleDeleteRoom: (index: number) => void;
    handleAgesChange: (roomIndex: number, newAges: string[]) => void;
    handleAgeByIndex: (roomIndex: number, value: string[]) => Map<number, Room>;
    handleDateUpdate: (field: keyof date, e: React.ChangeEvent<HTMLInputElement>) => void;
    getGuestInfo: (input: string) => string | number;
    handleDataUser: (guestData: guest) => void;
    checkAges: () => string | true;
    childrenQuantityIncrement: (index: number) => void;
    childrenQuantityDecrement: (index: number) => void;
    adultQuantityIncrement: (index: number) => void;
    adultQuantityDecrement: (index: number) => void;
    handleAgesChanges: (roomIndex: number, childrenIndex: number, value: number) => void;
    updateAges: (roomIndex: number, childrenCount: number) => void;
};
interface bookingProviderProps {
    children: React.ReactNode;
}

const BookingContext = createContext<BookingContextProps | undefined>(undefined);

export const BookingProvider: React.FC<bookingProviderProps> = ({ children }) => {
    const inicialRoom = new Map<number, Room>();
    inicialRoom.set(1, { adultCount: 1, child: { childCount: 0 } });

    const [bookingData, setBookingData] = useState<resevationData>({
        date: { checkIn: new Date(), checkOut: new Date() },
        rooms: inicialRoom
    });
    const handleAddNewRoom = () => {
        const newRoom: Room = { adultCount: 1, child: { childCount: 0 } }
        const updateRooms = new Map(bookingData.rooms);
        updateRooms.set(bookingData.rooms.size + 1, newRoom);
        setBookingData(prev => ({
            ...prev,
            rooms: updateRooms
        }))
    }

    const handleDeleteRoom = (index: number) => {
        setBookingData(prev => {
            const updateRooms = new Map(prev.rooms);
            updateRooms.delete(index); 
            return {
                ...prev,
                rooms: updateRooms
            }
        })
    }
    const handleDataUser = (guestData: guest) => {
        setBookingData(prev => ({
            ...prev,
            guest: guestData
        }))

    }
    const handleDateUpdate = (field: keyof date, e: React.ChangeEvent<HTMLInputElement>) => {
        const newDate = new Date(e.target.value);
        setBookingData(prev => ({
            ...prev,
            date: {
                ...prev.date,
                [field]: newDate,
            },
        }));
    };
    const handleAgesChanges = (roomIndex: number, childrenIndex: number, value: number) => {
        setBookingData(prev => {
            const newRooms = new Map(prev.rooms);
            const roomToUpdate = newRooms.get(roomIndex);
            if (roomToUpdate) {
                const updatedChild = {
                    ...roomToUpdate.child,
                    ages:
                        roomToUpdate.child.ages?.map((age, index) =>
                            index === childrenIndex ? value : age
                        )
                };
                const updatedRoom = {
                    ...roomToUpdate,
                    child: updatedChild
                };
                newRooms.set(roomIndex, updatedRoom);
            }
            return {
                ...prev,
                rooms: newRooms,
            };
        });
    };

    const childrenQuantityDecrement = (index: number) => {
        setBookingData((prev) => {
            const newRooms = new Map(prev.rooms);
            const roomToUpdate = newRooms.get(index);
            if (roomToUpdate && roomToUpdate.child.childCount! > 0) {
                console.log(roomToUpdate.child.childCount)
                const updateRoom = {
                    ...roomToUpdate,
                    child: {
                        ...roomToUpdate.child,
                        childCount: roomToUpdate.child.childCount! - 1
                    },
                };
                newRooms.set(index, updateRoom);
            }
            return {
                ...prev,
                rooms: newRooms,
            };
        });
    };

    const childrenQuantityIncrement = (index: number) => {
        setBookingData((prev) => {
            const newRooms = new Map(prev.rooms);
            const roomToUpdate = newRooms.get(index);
            if (roomToUpdate) {
                const updatedRoom = {
                    ...roomToUpdate,
                    child: {
                        ...roomToUpdate.child,
                        childCount: roomToUpdate.child.childCount! + 1,
                    },
                };
                newRooms.set(index, updatedRoom);
            }
            return {
                ...prev,
                rooms: newRooms,
            };
        });
    };

    const adultQuantityDecrement = (index: number) => {
        setBookingData((prev) => {
            const newRooms = new Map(prev.rooms);
            const roomToUpdate = newRooms.get(index);
            if (roomToUpdate && roomToUpdate.adultCount > 1) {
                const updateRoom = {
                    ...roomToUpdate,
                    adultCount: roomToUpdate.adultCount - 1
                };
                newRooms.set(index, updateRoom)
            }
            return {
                ...prev,
                rooms: newRooms,
            };
        });
    };

    const adultQuantityIncrement = (index: number) => {
        setBookingData((prev) => {
            const newRooms = new Map(prev.rooms);
            const roomToUpdate = newRooms.get(index);
            if (roomToUpdate) {
                const updateRoom = {
                    ...roomToUpdate,
                    adultCount: roomToUpdate.adultCount + 1
                }
                newRooms.set(index, updateRoom);
            }
            return {
                ...prev,
                rooms: newRooms,
            };
        });
    };

    const checkAges = (): string | true => {
        for (const room of Array.from(bookingData.rooms.values())) {
            if (room.child && Array.isArray(room.child.ages)) {
                let index = 0;
                for (const value of room.child.ages) {
                    if (value === "" || value === `--Select child ${index + 1} Age--`) {
                        return `Please select an age for child ${index + 1}.`;
                    }
                    index++;
                }
            }
        }
        return true;
    };

    const handleAgeByIndex = (roomIndex: number, value: string[]): Map<number, Room> => {
        const roomsUpdate: Map<number, Room> = new Map(bookingData.rooms);
        const roomToUpdate = roomsUpdate.get(roomIndex);
        if (roomToUpdate) {
            roomToUpdate.child.ages = value;
        }
        return roomsUpdate;
    };

    const handleAgesChange = (roomIndex: number, newAges: string[]) => {
        const updateRooms = new Map(bookingData.rooms);
        const room = updateRooms.get(roomIndex);
        if (room && room.child.childCount! > 0) {
            room.child.ages = newAges;
            updateRooms.set(roomIndex, room);
            setBookingData({ ...bookingData, rooms: updateRooms })
        }
    }
    const calculateSum = (key: field): number => {
        return Array.from(bookingData.rooms.values()).reduce((sum, room) => {
            if (key === 'adultCount') {
                return sum + room.adultCount;
            } else if (key === 'childCount') {
                return sum + room.child.childCount!;
            }
            return sum;
        }, 0);
    };

    const getGuestInfo = (input: string): string | number => {
        if (input !== 'stat' && input !== 'sum') {
            throw new Error("Input must be 'stat' or 'sum'");
        }
        const adultSum = calculateSum('adultCount');
        const childSum = calculateSum('childCount');
        const roomsSum = bookingData.rooms.size;
        if (input === 'stat') {
            const adultTitle = adultSum > 1 ? 'adults' : 'adult';
            const childTitle = childSum > 1 ? 'children' : 'child';
            const roomTitle = roomsSum > 1 ? 'rooms' : 'room';
            const StatGuestFormatted = childSum === 0 ?
                `${adultTitle} ${adultSum}, ${roomTitle}  ${roomsSum}` :
                `${adultTitle} ${adultSum}, ${childTitle} ${childSum}, ${roomTitle} ${roomsSum}`;
            return StatGuestFormatted;
        } else if (input === 'sum') {
            return (adultSum + childSum);
        }
        return 0
    }


    const updateAges = useCallback((roomIndex: number, childrenCount: number) => {
        setBookingData(prev => {
            const newRooms = new Map(prev.rooms);
            const roomToUpdate = newRooms.get(roomIndex);
            if (roomToUpdate) {
                const currentAges = roomToUpdate.child.ages || [];
                let updatedAges = [...currentAges];
                while (updatedAges.length < childrenCount) {
                    updatedAges.push("");
                }
                while (updatedAges.length > childrenCount) {
                    updatedAges.pop();
                }

                const updatedChild = {
                    ...roomToUpdate.child,
                    ages: updatedAges
                };
                const updatedRoom = {
                    ...roomToUpdate,
                    child: updatedChild
                };
                newRooms.set(roomIndex, updatedRoom);
            }
            return {
                ...prev,
                rooms: newRooms
            };
        });
    }, []);
    return (
        <BookingContext.Provider
            value={{
                bookingData, setBookingData, handleAddNewRoom, handleDeleteRoom,
                handleAgesChange, handleAgeByIndex, handleDateUpdate,
                getGuestInfo, handleDataUser, checkAges, childrenQuantityDecrement, childrenQuantityIncrement,
                adultQuantityDecrement, adultQuantityIncrement, handleAgesChanges, updateAges
            }}
        >
            {children}
        </BookingContext.Provider>
    );
};

export const useBookingContext = () => {
    const context = useContext(BookingContext);
    if (context === undefined) {
        throw new Error('useBookingContext must be used within a BookingProvider');
    }
    return context;
}