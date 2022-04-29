import HotelPicture from "../images/hotel.jpg";
import "../index.css";
import { useRoomData } from "./useRoomData";
import { useEffect, useState } from "react";

const RoomCard = ({ room, duration }) => {
  const people = getPeople(room.beds);

  return (
    <>
      <div className="grid grid-cols-2 p-3 gap-4 max-w-md max-h-md">
        <img className="rounded-md" src={HotelPicture} alt="Hotel Room" />
        <div>
          <b>{room.name}</b>
          <p>Adults : {people.adults}</p>
          <p>Kids : {people.children}</p>
          <p>Price : {room.price}/night</p>
          <p>Availability : {room.amount}</p>
          <p>{duration && `Total Price = ${duration * room.price}`}</p>
        </div>
      </div>
    </>
  );
};

const HotelQuery = ({ setRooms, filter, setFilter }) => {
  const [clicked, setClicked] = useState();

  const hotelRoom = useRoomData(filter, clicked);
  const { data, loading, error } = hotelRoom;

  useEffect(() => {
    setRooms(data);
    console.table(data);
  }, [data, setRooms]);

  if (loading) {
    return <div>Loading data...</div>;
  }

  if (error) {
    alert(
      "Error - Errorcode [ " +
        error +
        " ]\n The Request Failed ... \n Please Try again in a couple of Seconds !"
    );
  }

  return (
    <>
      <div className="border-2 p-5 rounded-md max-w-md min-h-full place-self-end">
        <form
          name="HotelSearch"
          onSubmit={(e) => {
            setClicked((prev) => !prev);
            e.preventDefault();
          }}
        >
          <div className="grid grid-cols-2 grid-rows-2 gap-4 pt-3">
            <div>
              <label htmlFor="arrival">Arrival</label>
              <br />
              <input
                className="border-2 rounded-md"
                type="text"
                id="arrival"
                name="arrival"
                onChange={(e) =>
                  setFilter((prevState) => ({
                    ...prevState,
                    arrival: e.target.value,
                  }))
                }
                value={filter.arrival}
              />
            </div>
            <div>
              <label htmlFor="adult">Num. Of Adults</label>
              <br />
              <input
                className="border-2 rounded-md"
                type="text"
                id="adult"
                name="adult"
                onChange={(e) =>
                  setFilter((prevState) => ({
                    ...prevState,
                    adult: e.target.value,
                  }))
                }
                value={filter.adult}
              />
            </div>
            <div>
              <label htmlFor="child">Num. Of Children</label>
              <br />
              <input
                className="border-2 rounded-md"
                type="text"
                id="child"
                name="child "
                onChange={(e) =>
                  setFilter((prevState) => ({
                    ...prevState,
                    child: e.target.value,
                  }))
                }
                value={filter.child}
              />
            </div>

            <div>
              <label htmlFor="duration">Duration</label>
              <br />
              <input
                className="border-2 rounded-md"
                type="text"
                id="duration"
                name="duration"
                onChange={(e) =>
                  setFilter((prevState) => ({
                    ...prevState,
                    duration: e.target.value,
                  }))
                }
                value={filter.duration}
              />
            </div>
          </div>
          <div className="pt-5 pb-5 flex flex-row text-center">
            <input
              className="w-full border-2 p-1 shadow-lg rounded-lg bg-sky-500 text-white"
              type="submit"
              value="Show Availability"
            />
          </div>
        </form>
        <div>
          <p>Available Rooms:</p>
          <div id="result"></div>
        </div>
      </div>
    </>
  );
};

const getPeople = (beds) => {
  let AdultCounter = 0;
  let ChildCounter = 0;

  beds.forEach((bed) => {
    if (bed.forChildren) {
      ChildCounter++;
    }
    if (bed.doubleBed) {
      AdultCounter++;
    }
  });

  const result = {
    adults: AdultCounter,
    children: ChildCounter,
  };

  return result;
};

export { RoomCard, HotelQuery };
