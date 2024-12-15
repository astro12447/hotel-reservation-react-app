import React from 'react';
import { useBookingContext } from './ContexApplication';
import "../css/dataComponent.css";
export const DateComponent:React.FC = () => {
    
    const { bookingData ,handleDateUpdate} = useBookingContext();
    return (
        <section className='DateComponent flex'>
            <input
                type="date"
                value={bookingData.date.checkIn.toISOString().split('T')[0]}
                name='CheckIn'
                onChange={(e) => handleDateUpdate('checkIn', e)}
                max={bookingData.date.checkOut.toISOString().split('T')[0]}
                style={{border:"none"}}
            />
            <input
                type="date"
                value={bookingData.date.checkOut.toISOString().split('T')[0]}
                name='CheckOut'
                onChange={(e) => handleDateUpdate('checkOut', e)}
                min={bookingData.date.checkIn.toISOString().split('T')[0]}
                style={{border:"none", height:""}}
            />
            
        </section>
    );
};