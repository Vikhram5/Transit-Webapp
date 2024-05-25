import React, { useState } from "react";
import LoadingProfile from "./LPschedule";
import LoadingTicket from "./LPticketissue";
import LoadingProf1 from "./LPbusnumber";

function LoadingBus() {
  const [activeComponent, setActiveComponent] = useState("LoadingProf1");

  const handleClick = (component) => {
    setActiveComponent(component);
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-center pt-10">
        <div className="w-full md:w-1/9 lg:w-2/9 xl:w-1/8">
          <h1 className="text-4xl font-bold mb-6 text-center text-black-500">
            Loading Profiles
          </h1>

          <div className="flex items-start justify-evenly">
            <button
              className={`${
                activeComponent === "LoadingProf1"
                  ? "bg-blue-700 hover:bg-blue-800 text-white"
                  : "bg-blue-500 hover:bg-blue-600 text-gray-800"
              } font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline`}
              onClick={() => handleClick("LoadingProf1")}
            >
              Route-wise
            </button>
            <button
              className={`${
                activeComponent === "LoadingProfile"
                  ? "bg-blue-700 hover:bg-blue-800 text-white"
                  : "bg-blue-500 hover:bg-blue-600 text-white-800"
              } font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline`}
              onClick={() => handleClick("LoadingProfile")}
            >
              Schedule-wise
            </button>
            <button
              className={`${
                activeComponent === "LoadingTicket"
                  ? "bg-blue-700 hover:bg-blue-800 text-white"
                  : "bg-blue-500 hover:bg-blue-600 text-white-800"
              } font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline`}
              onClick={() => handleClick("LoadingTicket")}
            >
              Ticket-Issued Time
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-full md:w-3/9 lg:w-2/9 xl:w-1/9">
          {activeComponent === "LoadingProf1" && <LoadingProf1 />}
          {activeComponent === "LoadingProfile" && <LoadingProfile />}
          {activeComponent === "LoadingTicket" && <LoadingTicket />}
        </div>
      </div>
    </div>
  );
}

export default LoadingBus;
