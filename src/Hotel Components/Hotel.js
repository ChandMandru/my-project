import HotelPicture from "../images/hotel.jpg";
import "../index.css";
import { useRoomData } from "./useRoomData";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "./LoginContextProvider";
import { useRoomContext } from "./useRoomContext";

const RoomCard = ({ room, duration,bookable=true}) => {
  const people = getPeople(room.beds);
  const roomContex = useRoomContext();

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
      {bookable && <button onClick={()=>roomContex.setRoomContext({room:[room],duration:[duration]})}>Book Me!</button>}
    </>
  );
};

const HotelQuery = ({ setRooms, filter, setFilter }) => {
  
  const [clicked, setClicked] = useState();

  const hotelRoom = useRoomData(filter, clicked);
  const { data, loading, error } = hotelRoom;

  useEffect(() => {
    setRooms(data);
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

  function handleSubmit(event){
    setClicked((prev) => !prev);
    event.preventDefault();
  }

  return (
    <>
      <div className="border-2 p-5 rounded-md max-w-md min-h-full place-self-end">
        <form
          name="HotelSearch"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-2 grid-rows-2 gap-4 pt-3">
            <HotelSearchField id="arrival" text="Arrival" filter ={filter} setFilter={setFilter} />
            <HotelSearchField id="adult" text="Num. Of Adults" filter ={filter} setFilter={setFilter} />
            <HotelSearchField id="child" text="Num. Of Children" filter ={filter} setFilter={setFilter} />
            <HotelSearchField id="duration" text="Duration" filter ={filter} setFilter={setFilter} />
          </div>
          <div className="pt-5 pb-5 flex flex-row text-center">
            <input
              className="w-full border-2 p-1 shadow-lg rounded-lg bg-sky-500 text-white"
              type="submit"
              value="Show Availability"
            />
          </div>
        </form>
      </div>
    </>
  );
};

const HotelSearchField = ({id,text,filter,setFilter}) => {

  function handleChange(event){
    setFilter((prevState) => (
      {...prevState,[id]: event.target.value,}
    ))
  }

  return (
    <>
    <div>
      <label htmlFor={id}>{text}</label>
      <br />
      <input
        className="border-2 rounded-md"
        type="text"
        id={id}
        name={id}
        onChange={handleChange}
        value={filter[id]}
      />
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

export const LoginButton = () => {
  const userLoginState = useContext(LoginContext)

  return userLoginState.isLoggedIn ? (
    <>
    <p>Chand Mandru</p>
    <br/>
    <button onClick={userLoginState.logOut}>LogOut</button>
    </>
  ) : (
    <button onClick={userLoginState.logIn}>LogIn</button>
  )
}

export { RoomCard, HotelQuery };
