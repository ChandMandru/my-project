import rooms from "./data"
import {RoomCard,HotelQuery} from "./Hotel Components/Hotel"


const App = () => {
  return (
    <>
    <div className="App">
      <Header />
      <Body rooms={rooms} />
      <Footer />
    </div>
    </>
  );
};

const Header = () => {
  return(
    <>
    <h1>LovelyHotel.com</h1>
    <hr/>
    </>
    ); 
};


const Body = ({ rooms }) => {
  return (
    <>
    <div className="grid grid-cols-2">
      <div >
      <h2>These Rooms are Available</h2>
        {rooms.map((room) => (
          <RoomCard key={room.name} room={room} />
        ))}
      </div>
      <HotelQuery />
    </div>
    </>
  );
};


const Footer = () => {
  return (
    <>
    <div>
      <div >Info + Contact</div>
      <div >Copyright</div>
    </div>
    </>
  );
};

export default App;
