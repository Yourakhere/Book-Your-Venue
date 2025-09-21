import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";
<<<<<<< HEAD
import { days } from "../utils/dayTimeSlot";

export default function MyCalendar({ onDateChange }) {
  const now = new Date();
  const [date, setDate] = useState(now);
  // console.log(date)
  const handleChange = (newDate) => {
    // console.log("new",newDate)
    setDate(newDate); // keep as Date object

    const dayName = days[newDate.getDay()];
    const formattedDate = format(newDate, "yyyy-MM-dd");

    // Send both to parent
    onDateChange(formattedDate, dayName);
    // setDate("new Sat Aug 30 2025 00:00:00 GMT+0530 (India Standard Time)")
  };

  return (
    <div className="p-2">
      <Calendar
        onChange={handleChange}
        value={date}   // must be a Date, not string
        minDate={new Date()}
        className="w-full"
      />

      <div className="mt-2 text-center">
        <p className="text-sm text-gray-600">
          Selected:{" "}
          <span className="font-medium">
            {format(date, "yyyy-MM-dd")} ({days[date.getDay()]})
          </span>
        </p>
      </div>
=======

export default function MyCalendar({onDateChange}) {
  const now = new Date();
  const [date, setDate] = useState(now);
const handleChange=(newDate)=>{
  setDate(newDate)
onDateChange(format(date, "yyyy-MM-dd"))
}
  return (
    <div className="p-4">
      <Calendar onChange={handleChange} value={date} />
      {/* Show formatted date */}
      <p className="mt-2">
        Selected Date: {format(date, "yyyy-MM-dd")}
      </p>
>>>>>>> 37946e52a67d0a2a78bafc7e2c5d4ac816add528
    </div>
  );
}
