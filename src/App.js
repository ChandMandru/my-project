import rooms from "./data"
import {RoomCard,HotelQuery} from "./Hotel Components/Hotel"

const App = () => {
  return (
    <div className="App">
      <Header />
      <Body rooms={rooms} />
      <Footer />
    </div>
  );
};

const Header = () => {
  return <h1>LovelyHotel.com</h1>;
};

const Body = ({ rooms }) => {
  return (
    <div style={{ overflow: "hidden" }}>
      <div style={{ float: "left" }}>
        {rooms.map((room) => (
          <RoomCard key={room.name} room={room} />
        ))}
      </div>
      <HotelQuery />
    </div>
  );
};

const Footer = () => {
  return (
    <div>
      <div style={{ float: "left" }}>Info + Contact</div>
      <div style={{ float: "right" }}>Copyright</div>
    </div>
  );
};






export default App;
