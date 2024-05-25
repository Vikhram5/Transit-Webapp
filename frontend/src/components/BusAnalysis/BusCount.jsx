import React, { useState, useEffect } from "react";
import axios from "axios";
import BusChart from "./BusChart"; // Import BusChart component


function BusCount() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [busNumber, setBusNumber] = useState("");
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [tableData, setTableData] = useState(null); // State to store table data
  const [showChart, setShowChart] = useState(false); // State to control visibility of BusChart
  const [busOptions, setBusOptions] = useState([]); // State to store bus options
  const [sourceOptions, setSourceOptions] = useState([]); // State to store source options
  const [destinationOptions, setDestinationOptions] = useState([]); // State to store destination options

  useEffect(() => {
    // Fetch bus numbers when selectedFile changes
    if (selectedFile) {
      axios
        .post("http://127.0.0.1:5000/get_bus_numbers", {
          filename: selectedFile.name,
        })
        .then((response) => {
          setBusOptions(response.data.busNumbers);
        })
        .catch((error) => {
          console.error("Error fetching bus numbers:", error);
        });
    }
  }, [selectedFile]);

  useEffect(() => {
    // Fetch source options when both selectedFile and busNumber change
    if (selectedFile && busNumber) {
      axios
        .post("http://127.0.0.1:5000/get_source", {
          filename: selectedFile.name,
          busNumber,
        })
        .then((response) => {
          setSourceOptions(response.data.sources);
        })
        .catch((error) => {
          console.error("Error fetching sources:", error);
        });
    }
  }, [selectedFile, busNumber]);

  useEffect(() => {
    // Fetch destination options when selectedFile, busNumber, and source change
    if (selectedFile && busNumber && source) {
      axios
        .post("http://127.0.0.1:5000/get_destination", {
          filename: selectedFile.name,
          busNumber,
          source,
        })
        .then((response) => {
          setDestinationOptions(response.data.destinations);
        })
        .catch((error) => {
          console.error("Error fetching destinations:", error);
        });
    }
  }, [selectedFile, busNumber, source]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleShowChart = async () => {
    const data = new FormData();
    data.append("file", selectedFile);
    data.append("busNumber", busNumber);
    data.append("source", source);
    data.append("destination", destination);

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/process_bus",
        data
      );
      setTableData(response.data); // Set table data received from the backend
      setShowChart(true); // Show BusChart component
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };


  return (
    <div className="container mx-auto">
      <div className="flex justify-center pt-10">
        <div className="w-full lg:w-3/4 xl:w-2/3">
          <h1 className="text-blue-900 text-3xl font-bold mb-6 text-center rounded-lg bg-blue-200 p-4">
            Bus Count
          </h1>
        

          <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label
                htmlFor="file"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Choose CSV File:
              </label>
              <input
                type="file"
                id="file"
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={handleFileChange}
              />
            </div>
  
            <div className="mb-4">
              <label
                htmlFor="busNumber"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Bus Number:
              </label>
              <select
                id="busNumber"
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={busNumber}
                onChange={(e) => setBusNumber(e.target.value)}
              >
                <option value="">Select Bus Number</option>
                {busOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
  
            <div className="mb-4">
              <label
                htmlFor="source"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Source:
              </label>
              <select
                id="source"
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={source}
                onChange={(e) => setSource(e.target.value)}
              >
                <option value="">Select Source</option>
                {sourceOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
  
            <div className="mb-6">
              <label
                htmlFor="destination"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Destination:
              </label>
              <select
                id="destination"
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              >
                <option value="">Select Destination</option>
                {destinationOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
  
            {/* Show Chart button */}
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleShowChart}
            >
              Show Chart
            </button>
          </div>
        </div>
      </div>
 
  
      {showChart && (
        <div className="flex justify-center items-center">
    
          <BusChart data={tableData} />
        </div>
      )}
    </div>
  );
}

export default BusCount;
