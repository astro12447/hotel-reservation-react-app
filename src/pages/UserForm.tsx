import React, { useState } from 'react';
import { guest } from '../interfaces/guest';
import "../css/userForm.css"
interface UserFormProps {
  onNext: () => void;
  onPrevious: () => void;
  onUserData:(guest:guest)=>void;
}

export const UserForm: React.FC<UserFormProps> = ({ onNext, onPrevious, onUserData}) => {
  const [user, setUser] = useState<guest>({
    name: '', lastName: '', email: '', phone: ''
  });
  const [error, setError] = useState<Partial<guest>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validación del formulario
    if (validationForm()) {
      // Actualizar el estado bookingData solo si la validación es exitosa
      onUserData(user);
      onNext();
    }
  };

  const validationForm = () => {
    const newErrors: Partial<guest> = {};
    if (!user.name)     newErrors.name     = 'Name is required';
    if (!user.lastName) newErrors.lastName = 'Last Name is required';
    if (!user.email)    newErrors.email    = 'Email is required';
    if (!user.phone)    newErrors.phone    = 'Phone is required';
    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  return (
    <div className='UserFormConteiner'>
      <div className="userForm">
        <form onSubmit={handleSubmit}>
          <div className='Title'>BOOKING USER FORM</div>
          <div>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={user.name}
              onChange={handleUserChange}
              className='user'
              required
            />
            {error.name && <span>{error.name}</span>}
          </div>
          <div>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={user.lastName}
              onChange={handleUserChange}
              required
              className='user'
            />
            {error.lastName && <span>{error.lastName}</span>}
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={user.email}
              onChange={handleUserChange}
              required
              className='user'
            />
            {error.email && <span>{error.email}</span>}
          </div>
          <div>
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={user.phone}
              onChange={handleUserChange}
              required
              className='user'
            />
            {error.phone && <span>{error.phone}</span>}
          </div>
          <button type="submit">Submit</button>
          <button
            type="button"
            onClick={onPrevious}
          >Previous
          </button>
        </form>
      </div>
    </div>
  );
};