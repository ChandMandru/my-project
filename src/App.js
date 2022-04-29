import { RoomCard, HotelQuery } from "./Hotel Components/Hotel";
import { useState } from "react";

const App = () => {
  return (
    <>
      <div className="App min-h-full">
        <Header />
        <Body />
        <Footer />
      </div>
    </>
  );
};

const Header = () => {
  return (
    <>
      <h1 className="text-[35px] text-center font-mono p-4 ">
        LovelyHotel.com
      </h1>
      <hr />
    </>
  );
};

const Body = () => {
  const [rooms, setRooms] = useState([]);
  const [filter, setFilter] = useState({
    adult: "",
    child: "",
    duration: "",
    arrival: "",
  });

  return (
    <>
      <div className="grid grid-cols-2 pt-6 gap-5 ml-20 mr-20">
        <div className="border-2 rounded-md">
          <h2 className="text-[25px] font-bold text-center font-mono pb-7">
            These Rooms are Available
          </h2>
          <div className="grid grid-cols-2 min-w-auto">
            {rooms &&
              rooms.map((room) => (
                <RoomCard
                  key={room.name}
                  room={room}
                  duration={filter.duration}
                />
              ))}
          </div>
        </div>
        <HotelQuery setRooms={setRooms} filter={filter} setFilter={setFilter} />
      </div>
    </>
  );
};

const Footer = () => {
  return (
    <>
      <footer className="absolute inset-x-0 bottom-0 grid grid-cols-2 p-6 ml-20 mr-20 min-w-auto bg-blue-700 text-white">
        <div className="text-left p-3">
          We hope that you will enjoy your stay at our hotel! <br />
          if you have any questions or concerns <br />
          just give us a call <br />
          0172 34589 <br />
          or{" "}
          <a
            className="underline"
            href="https://www.google.com/"
            target="_blank"
            rel="noreferrer"
          >
            write us
          </a>{" "}
          <br />
        </div>
        <p className="place-self-end">Copyright 2022 LovelyHotel.com</p>
      </footer>
    </>
  );
};

export default App;
