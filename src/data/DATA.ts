import { Data } from "../interfaces/Data";
import room1 from '../assets/images/room1.jpg'
import room2 from '../assets/images/room2.jpg'
import room3 from '../assets/images/room3.jpg'
import room4 from '../assets/images/room4.jpg'
import room5 from '../assets/images/room5.jpg'
import room6 from '../assets/images/room5.jpg'
import room7 from '../assets/images/room8.jpg'

export const DATA: Data[] = [
    {
        id: 100,
        price:300,
        category: "Category A",
        description: "Our Deluxe Twin/Large Double also provides views over landscaped gardens. It has a seating area, digital safe and mini fridge. This room can be configured with either 2 single beds or zip and linked to provide a large double bed",
        images:[room1, room2, room3, room4, room5, room6, room7],
        maxGuest: 2,
        booked: false
    },
    {
        id: 101,
        price:300,
        category: "Category B",
        description: "Our Deluxe Twin/Large Double also provides views over landscaped gardens. It has a seating area, digital safe and mini fridge. This room can be configured with either 2 single beds or zip and linked to provide a large double bed",
        images:[room1, room2, room3, room4, room5, room6, room7],
        maxGuest: 3,
        booked: true
    },
    {
        id: 102,
        price:300,
        category: "Category C",
        description: "Our Deluxe Twin/Large Double also provides views over landscaped gardens. It has a seating area, digital safe and mini fridge. This room can be configured with either 2 single beds or zip and linked to provide a large double bed",
        images:[room1, room2, room3, room4, room5, room6, room7],
        maxGuest: 1,
        booked: false
    },
    {
        id: 103,
        price:300,
        category: "Category D",
        description: "Our Deluxe Twin/Large Double also provides views over landscaped gardens. It has a seating area, digital safe and mini fridge. This room can be configured with either 2 single beds or zip and linked to provide a large double bed",
        images:[room1, room2, room3, room4, room5, room6, room7],
        maxGuest: 2,
        booked: false
    },
    {
        id: 104,
        price:300,
        category: "Category F",
        description: "Our Deluxe Twin/Large Double also provides views over landscaped gardens. It has a seating area, digital safe and mini fridge. This room can be configured with either 2 single beds or zip and linked to provide a large double bed",
        images:[room1, room2, room3, room4, room5, room6, room7],
        maxGuest: 4,
        booked: false
    },
    {
        id: 105,
        price:300,
        category: "Category G",
        description: "Our Deluxe Twin/Large Double also provides views over landscaped gardens. It has a seating area, digital safe and mini fridge. This room can be configured with either 2 single beds or zip and linked to provide a large double bed",
        images:[room1, room2, room3, room4, room5, room6, room7],
        maxGuest: 3,
        booked: false
    },
    {
        id: 106,
        price:300,
        category: "Category H",
        description: "Our Deluxe Twin/Large Double also provides views over landscaped gardens. It has a seating area, digital safe and mini fridge. This room can be configured with either 2 single beds or zip and linked to provide a large double bed",
        images:[room1, room2, room3, room4, room5, room6, room7],
        maxGuest: 3,
        booked: false
    },
];