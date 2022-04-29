import HotelPicture from "../images/hotel.jpg";

const RoomCard = ({ room }) => {
  const people = getPeople(room.beds);

  return (
    <>
    <div style={{ overflow: "hidden", padding: "5px" }}>
      <img
        style={{
          float: "left",
          maxWidth: "250px",
          maxHeight: "300px",
          marginRight: "15px",
        }}
        src={HotelPicture}
        alt="Hotel Room"
      />
      <div style={{ float: "right" }}>
        <b>{room.name}</b>
        <p>Adults : {people.adults}</p>
        <p>Kids : {people.children}</p>
        <p>Price : {room.price}/night</p>
        <p>Availability : {room.amount}</p>
      </div>
    </div>
    </>
  );
};

const HotelQuery = () => {
  function handleSubmit(e) {
    getHotel();
    e.preventDefault();
  }

  return (
    <>
    <div style={{ textAlign: "left", padding: "10px", float: "right" }}>
      <form
        style={{ overflow: "hidden" }}
        name="HotelSearch"
        onSubmit={handleSubmit}
      >
        <div style={{ float: "left" }}>
          <label htmlFor="adult">Num. Of Adults</label>
          <br />
          <input type="text" id="adult" name="adult" />
          <br />
        </div>
        <div style={{ float: "left", marginLeft: "15px" }}>
          <label htmlFor="child">Num. Of Children</label>
          <br />
          <input type="text" id="child" name="child" />
          <br />
        </div>
        <div style={{ float: "left", marginLeft: "15px" }}>
          <label htmlFor="duration">Duration</label>
          <br />
          <input type="text" id="duration" name="duration" />
          <br />
        </div>
        <div style={{ float: "left", marginLeft: "15px" }}>
          <br />
          <input type="submit" value="Search" />
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

async function getHotel() {
  try {
    const adult = document.forms["HotelSearch"]["adult"].value;
    const child = document.forms["HotelSearch"]["child"].value;
    const duration = document.forms["HotelSearch"]["duration"].value;

    const response = await fetch(
      "https://hsrm-hotel-api.herokuapp.com/rooms?" +
        new URLSearchParams({ adults: adult, children: child })
    );
    const json = await response.json();
    const divElement = document.getElementById("result");
    let content = "";

    console.log(json);

    for (const key of Object.keys(json)) {
      content += `${json[key].amount}x ${json[key].name}, ${
        json[key].price
      }/Night Total Cost: ${json[key].price * duration}\n`;
    }

    const res2 = content.split(/[\r\n]+/);
    let counter = 1;

    divElement.replaceChildren();

    res2.forEach((item) => {
      if (item !== "") {
        const newDiv = document.createElement("div");
        newDiv.appendChild(document.createTextNode(item));
        divElement.appendChild(newDiv);
        newDiv.setAttribute("id", "result" + counter++);
      }
    });
  } catch (error) {
    console.log("The Request Failed");
  }
}

export { RoomCard, HotelQuery };
