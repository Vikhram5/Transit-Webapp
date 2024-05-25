import React, { useState } from "react";
import PassengerCount from "./Busnumberwise";
import PassCount1 from "./Schedulewise";

function ButtonContainer({ onRouteWiseClick, onScheduleWiseClick }) {
  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={onRouteWiseClick}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4 sm:mr-8 focus:outline-none focus:shadow-outline"
      >
        RouteWise
      </button>
      <button
        onClick={onScheduleWiseClick}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        ScheduleWise
      </button>
    </div>
  );
}

function MainComponent() {
  const [showPassengerCount, setShowPassengerCount] = useState(true);

  const handleRouteWiseClick = () => {
    setShowPassengerCount(true);
  };

  const handleScheduleWiseClick = () => {
    setShowPassengerCount(false);
  };

  return (
    <div className="container mx-auto flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-6">Time Table</h1>
      <ButtonContainer
        onRouteWiseClick={handleRouteWiseClick}
        onScheduleWiseClick={handleScheduleWiseClick}
      />

        < div className="w-full md:w-3/9 lg:w-2/9 xl:w-1/9">
        {showPassengerCount ? <PassengerCount /> : <PassCount1 />}
      </div>
    </div>
  );
}

export default MainComponent;
