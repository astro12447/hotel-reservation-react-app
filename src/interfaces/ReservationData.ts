import { date } from "./BookedDate";
import { Room} from "./Room";
import { guest } from "./guest"
import { Data } from "./Data";
export interface resevationData {
    date:  date;
    rooms: Map<number, Room>;
    roomSelected?:Data[];
    guest?:guest;
} 

