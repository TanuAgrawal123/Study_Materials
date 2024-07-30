import { useState } from "react";
import "./styles.css";

export default function App() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [bookingStatus, setBookingStatus] = useState(false);
  const [bookingConfirmation, setBookingConfirmation] = useState(null);
  const handleSubmit = (event) => {
    event.preventDefault();
    setBookingStatus(true);
    setTimeout(() => {
      setBookingConfirmation(
        `Flight booked from ${origin} to ${destination} on ${date}`
      );
      setBookingStatus(false);
    }, 1000); // Simulating network delay
  };
  return (
    <div className="flight-booking">
      <h2>Book Your Flight</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="origin">Origin:</label>
          <input
            type="text"
            id="origin"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="destination">Destination:</label>
          <input
            type="text"
            id="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Flight Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={bookingStatus}>
          {bookingStatus ? "Booking..." : "Book Flight"}
        </button>
      </form>
      {bookingConfirmation && <p>{bookingConfirmation}</p>}
    </div>
  );
}
