import { useState } from "react";
import { RoomCard } from "./Hotel";
import { useRoomContext } from "./useRoomContext";

const StyledInput = ({labelClass,helpText,onChange,value,label,className,...rest})=> {
    return (
        <>
        <div className={`w-full place-self-center ${className ? className : ""}`}>
        <label className={labelClass}>{label}</label>
        <input
          className={"w-full h-8 px-2 text-sm text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"}
          type="text"
          onChange={(e) => onChange(e.target.value)}
          value={value}
          {...rest}
        />
        {helpText && <span className={"text-xs text-gray-600"}>{helpText}</span>}
        </div>
        </>
      );

}

const StyledSelect = ({onChange,value,className,label,labelClass,options}) => {
    return (
        <>
        <div className={`relative inline-block w-full text-gray-700 place-self-center ${className ? className : ""}`}>
        <label className={labelClass +" "+className}>{label}</label>
          <select className="w-full h-8 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline" onChange={(e) => onChange(e.target.value)} value={value}>
            <option  value="" hidden>-</option>
            {options && options.map(
              (option)=> <option key={option}>{option}</option>
            )}
          </select>
        </div>
        </>
    );
}

export const Form = () => {

    const RoomContext = useRoomContext();
    const {room,duration} = RoomContext.room;

    const [titel, setTitel] = useState("");
    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [nationality, setNationality] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [countryCode,setCountryCode] = useState("");

    const titles = ["Ms","Mr","Mx"]
    const nationalitys = ["German","EU","Non-EU"]
    const countryCodes = ["+49","+82","+92","+11"]

    const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^.{2,42}$/;
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    const handleSubmit = (event) => {
      const errors = {};
      if (titel && firstName.match(nameRegex) && lastName.match(nameRegex) && nationality && phoneNumber.match(phoneRegex) && email.match(mailRegex)) {
      } else {
        if (!titel) {
          errors.titel = "no name provided";
        }
        if (!nationality) {
          errors.nationality = "no date provided";
        }
        if(!firstName.match(nameRegex)){
          errors.name = "not long enough";
        }
      }
      console.log(errors);
  
      event.preventDefault();
    };
  
    return (
      <>
      <div className="col-span-2 m-5 max-w-md p-2 fade-in">
      <RoomCard room={room[0]} duration={duration} bookable={false} className={"grid grid-cols-2 gap-4"}/>
      <CheckoutHeading />
      <div>
      <form onSubmit={handleSubmit} className="grid grid-rows-8 gap-x-1 gap-y-3 grid-cols-4">
        <StyledSelect value={titel} label="Title *" onChange={setTitel} className="col-span-2" options={titles}/>
        <StyledInput value={lastName} label="Last Name *" onChange={setLastName} className="col-span-4" helpText="must have between 2 and 42 characters in length"/>
        <StyledInput value={firstName} label="First Name *" onChange={setFirstName} className="col-span-4" helpText="must have between 2 and 42 characters in length"/>
        <StyledSelect value={nationality} label="Nationality *" onChange={setNationality} className="col-span-4" options={nationalitys}/>
        <label className="col-span-4 ">Phone Number</label>
        <StyledSelect value={countryCode} label="Country Code" labelClass="text-xs text-gray-600" onChange={setCountryCode} options={countryCodes}/>
        <StyledInput value={phoneNumber} label="Local Number" labelClass="text-xs text-gray-600" onChange={setPhoneNumber} className="col-span-3"/>
        <StyledInput value={email} label="E-Mail *" onChange={setEmail} className="col-span-4" helpText="Example : name@domain.com" />

        <textarea placeholder="Leave us some Feedback!" className="w-full h-16 px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline col-span-4"></textarea>
        <button type="submit">SUBMIT</button>
      </form>
      </div>
      </div>
      </>  
    );
  };


  const CheckoutHeading = () => {
    return (
        <>
        <div className="pt-7 pb-7">
          <p className="text-xl text-center font-bold">Your Details</p>
          <p>Inputs marked with an (*) must be filled out!</p>

        </div>
        </>
    );
  }
  