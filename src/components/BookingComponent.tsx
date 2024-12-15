import React, { useState } from 'react';
import { DateComponent } from './DateComponent';
import { GuestManagemant } from './GuestManagemant';
import { ShowRoomInfoComponent } from './ShowRoomInfoComponent';
import "../css/bookingComponent.css";
interface bookingComponentProps {
    onNext: () => void;
}
export const BookingComponent: React.FC<bookingComponentProps> = ({ onNext }) => {
    const [inputClicked, setInputClicked] = useState<boolean>(false);
    const handleClickedInput = (inputClick: boolean) => {
        setInputClicked(inputClick);
    }

    return (

        <section className='BookingHeader  flex'>
            <div className='BookingHeaderInner ' style={{ display: "flex", alignContent: "center", justifyContent: "center" }}>
                <DateComponent />
                <ShowRoomInfoComponent
                    onClickedInput={handleClickedInput}
                />
                {inputClicked && (
                    <div>

                        <GuestManagemant
                            isSchildrenMenuDisplay={() => setInputClicked(!inputClicked)}
                        />
                    </div>
                )}
                <button
                    onClick={onNext}
                    disabled={inputClicked}
                    style={{ border: "none", minWidth: "9rem", fontWeight: "bold", cursor: "pointer" }}
                >
                    Search
                </button>
            </div>

        </section>

    )
}
