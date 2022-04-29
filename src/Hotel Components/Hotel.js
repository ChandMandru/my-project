import HotelPicture from "../images/hotel.jpg";
import "../index.css"



const RoomCard = ({ room }) => {
  const people = getPeople(room.beds);

  return (
    <>
      <div className="grid grid-cols-2 content-center">
        <img
          className="rounded-md max-h-[80%] max-w-[80%]"
          src={HotelPicture}
          alt="Hotel Room"
        />
        <div>
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
      <div className="border-2 p-5 rounded-md container max-w-[500px] h-fit">
        <form
          name="HotelSearch"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-2 grid-rows-2 place-items-center pt-3">


            <div >
              <label htmlFor="arrival">Arrival</label>
              <br />
              <input className="border-2 rounded-md" type="text" id="arrival" name="arrival" />
            </div>
            <div>
              <label htmlFor="adult">Num. Of Adults</label>
              <br />
              <input className="border-2 rounded-md" type="text" id="adult" name="adult" />
            </div>
            <div >
              <label htmlFor="child">Num. Of Children</label>
              <br />
              <input className="border-2 rounded-md" type="text" id="child" name="child" />
            </div>

            <div >
              <label htmlFor="duration">Duration</label>
              <br />
              <input className="border-2 rounded-md" type="text" id="duration" name="duration" />
            </div>


          </div>
          <div className="pt-5 pb-5 flex flex-row text-center justify-center">
            <input className="w-full border-2 p-1 shadow-lg rounded-lg bg-sky-500 text-white" type="submit" value="Show Availability" />
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

    for (const key of Object.keys(json)) {
      content += `${json[key].amount}x ${json[key].name}, ${json[key].price
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
