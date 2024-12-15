import React, { useState } from 'react';
import { BookingProvider } from './components/ContexApplication';
import { BookingComponent } from './components/BookingComponent';
import { SelectedRooms } from './pages/SelectedRooms';
import { DATA } from './data/DATA';
import { UserForm } from './pages/UserForm';
import { guest } from './interfaces/guest';
import "./css/app.css";

export const App: React.FC = () => {
  const [nextPage, setNextPage] = useState<number>(1);
  const handleNextPage = () => {
    setNextPage(prev => prev + 1);
  }
  const handlePrevoiusPage = () => {
    setNextPage(prev => prev - 1);
  }
  const handleDataUser = (guestData: guest) => {
    console.log(guestData);
  }
  const rederPage = () => {
    switch (nextPage) {
      case 1:
        return <section >
          <BookingComponent onNext={handleNextPage} />
        </section>
      case 2:
        return <section><SelectedRooms
          data={DATA}
          onPrevious={handlePrevoiusPage}
          onNext={handleNextPage}
          
        />
        </section>
      case 3:
        return <section>
          <UserForm
            onNext={handleNextPage}
            onPrevious={handlePrevoiusPage}
            onUserData={handleDataUser}
          />
        </section>
      default:
        return <div>Thank you for your reservation!</div>
    }
  }
  return (
    <main>
      <BookingProvider>
        <section>
          {rederPage()}
        </section>
      </BookingProvider>
    </main>

  );
}
