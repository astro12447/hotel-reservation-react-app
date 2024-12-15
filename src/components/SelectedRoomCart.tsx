import React, { useState } from 'react';
import { Data } from '../interfaces/Data';
import "../css/SelectedRoomCart.css";

interface SelectedRoomCartProps {
    roomSelected: Data;
    onSelectedRoom?: () => void;
    text?: string;
}

export const SelectedRoomCart: React.FC<SelectedRoomCartProps> = ({ roomSelected, onSelectedRoom, text }) => {
    const [imageIndex, setImageIndex] = useState<number>(0);

    const handleNextIndex = () => {
        let nextIndex = (imageIndex + 1) % roomSelected.images.length;
        setImageIndex(nextIndex);
    }

    const handlePrevIndex = () => {
        let prevIndex = (imageIndex - 1 + roomSelected.images.length) % roomSelected.images.length;
        setImageIndex(prevIndex);
    }

    return (
        <div key={roomSelected.id} className='SelectedRoomItem grid'>
            <div className='SelectedImage'>
                <div style={{ position: "relative" }} >
                    <img
                        src={roomSelected.images[imageIndex]}
                        alt={roomSelected.category}
                        style={{ 
                                minWidth: "40rem", 
                                height: "20rem", 
                                objectFit: "cover", 
                                zIndex: "1", 
                                position: "relative"
                            }}
                    />
                    <div
                        className='ImagesList'
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            position: "absolute",
                            zIndex: "2",
                            top: "80%",
                            width: "100%",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: "1rem"
                        }}
                    >
                        {roomSelected.images.map((_, index) => (
                            
                            <button
                                key={index}
                                onClick={() => setImageIndex(index)}
                                style={{
                                    margin: "1px", 
                                    backgroundColor: index === imageIndex ? "rgb(54, 52, 52)": "rgb(126, 121, 121)",
                                    opacity:"0.5"
                                }}
                            >
                            </button>
                        ))}
                    </div>
                    <div 
                        className='NextImageButton' 
                        style={{zIndex:"3" , position:"absolute", right:"4rem", top:"50%"}}>
                        <button
                            onClick={handleNextIndex}
                            style={{backgroundColor:"rgb(54, 52, 52)", opacity:"0.8"}}
                        >
                        </button>
                    </div>
                    <div 
                        className='PrevImageButton' 
                        style={{zIndex:"4", position:"absolute", left:"1rem", top:"50%"}}>
                        <button
                            onClick={handlePrevIndex}
                            style={{backgroundColor:"rgb(54, 52, 52)", opacity:"0.8"}}
                        >
                        </button>
                    </div>
                </div>
            </div>
            <div className='SelectedRoomsDescription'>
                <h2>{roomSelected.category}</h2>
                <p>Description: {roomSelected.description}</p>
                <p>Price: {roomSelected.price}$</p>
                <p>Max Guests: {roomSelected.maxGuest}</p>
                <div>
                    <button
                        onClick={onSelectedRoom}
                        style={{
                            padding: "0.7rem",
                            border: "none",
                            marginTop: "4em",
                            cursor: "pointer",
                            minWidth: "8rem",
                            fontWeight: "bold",
                            borderRadius: "3rem"
                        }}
                    >
                        {text}
                    </button>
                </div>
            </div>
        </div>
    );
}