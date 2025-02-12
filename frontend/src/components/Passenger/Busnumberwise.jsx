import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../config";

function PassengerCount() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [busNumber, setBusNumber] = useState("");
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [tableData, setTableData] = useState(null);
  const [busOptions, setBusOptions] = useState([]);
  const [sourceOptions, setSourceOptions] = useState([]);
  const [destinationOptions, setDestinationOptions] = useState([]);

  useEffect(() => {
    if (selectedFile) {
      axios
        .post(`${BASE_URL}/get_bus_numbers`, {
          filename: selectedFile.name,
        })
        .then((response) => {
          setBusOptions(response.data.busNumbers);
        })
        .catch((error) => {
          console.log("error");
          console.error("Error fetching bus numbers:", error);
        });
    }
  }, [selectedFile]);

  useEffect(() => {
    if (selectedFile && busNumber) {
      axios
        .post(`${BASE_URL}/get_source`, {
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
    if (selectedFile && busNumber && source) {
      axios
        .post(`${BASE_URL}/get_destination`, {
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
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("file", selectedFile);
    data.append("busNumber", busNumber);
    data.append("source", source);
    data.append("destination", destination);

    try {
      const response = await axios.post(
        `${BASE_URL}/process_data`,
        data
      );
      setTableData(response.data);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <div className="container mx-auto justify-center items-center h-screen">
      <div>
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col items-start w-50 mt-16">
          <form onSubmit={handleSubmit} className="w-full">
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

            <div className="w-full mb-4">
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
                {sourceOptions &&
                  sourceOptions.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
              </select>
            </div>

            <div className="mb-4">
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
                {destinationOptions &&
                  destinationOptions.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
              </select>
            </div>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </form>
        </div>

        <div className="flex">
          <div className="w-full lg:w-1/9">
            {tableData && tableData.length > 0 && (
              <table className="table-auto bg-white shadow-md rounded mt-4 w-full">
                <thead>
                  <tr className="bg-gray-200">
                    {Object.keys(tableData[0]).map((colName, index) => (
                      <th key={index} className="px-4 py-2">
                        {colName}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((item, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-gray-100" : ""}
                    >
                      {Object.values(item).map((val, index) => (
                        <td key={index} className="border px-4 py-2">
                          {val}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PassengerCount;
