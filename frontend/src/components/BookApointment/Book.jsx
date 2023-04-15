import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {useState} from "react";



function Book(){

    const [date, setDate] = useState(new Date());

    function handleDateChange(date) {
        setDate(date);
    }

    return(
        <div>
            <Calendar value={date} onChange={handleDateChange} />
        </div>
    )
}


export default Book;