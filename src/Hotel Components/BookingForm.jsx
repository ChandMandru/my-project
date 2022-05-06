import { useState } from "react";
import { RoomCard } from "./Hotel";
import { useRoomContext } from "./useRoomContext";

const StyledInput = ({helpText,onChange,value,label,...rest})=> {
    return (
        <>
        <label>{label}</label>
        <input
          className="w-full h-8 px-2 text-sm text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
          type="text"
          onChange={(e) => onChange(e.target.value)}
          value={value}
          {...rest}
        />
        {helpText && <span className="text-xs text-gray-600">{helpText}</span>}
        </>
      );

}

const StyledSelect = () => {
    return (
        <>
        <div className="relative inline-block w-full text-gray-700">
            <select className="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline" placeholder="Regular input">
                <option>inp 1</option>
                <option>inp 2</option>
                <option>inp 3</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
            </div>
        </div>
        </>
    );
}

export const Form = () => {

    const RoomContext = useRoomContext();
    const {room,duration} = RoomContext.room;

    const [Titel, setTitel] = useState("");
    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [nationality, setNationality] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = (event) => {
      console.log("Test");
      event.preventDefault();
    };
  
    return (

      <>
      {console.log(room)}
      <RoomCard room={room[0]} duration={duration} bookable={false}/>
      <form onSubmit={handleSubmit} className="row-span-2">
        <StyledSelect />
        <StyledInput value={firstName} label="First Name" onChange={setFirstName} /> <br />
        <StyledInput value={lastName} label="Last Name" onChange={setLastName} /> <br />
        <StyledSelect /> <br />
        <StyledSelect /> <br />
        <StyledInput value={phoneNumber} label="Phone Number" onChange={setPhoneNumber} /> <br />
        <StyledInput value={email} label="E-Mail" onChange={setEmail} />

        <textarea className="w-full h-16 px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"></textarea>
      </form>
      </>  
    );
  };