import React from "react";
import axios from "axios";

const ScheduleGen = () => {
  const handleGenerateCSV = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/generate-csv/", {
        responseType: "blob", // Set the response type to 'blob' to handle binary data
      });

      // Create a blob object from the response data
      const blob = new Blob([response.data], { type: "text/csv" });

      // Create a temporary URL for the blob
      const url = window.URL.createObjectURL(blob);

      // Create a link element and simulate a click to trigger the download
      const link = document.createElement("a");
      link.href = url;
      link.download = "generated.csv"; // Specify the file name
      document.body.appendChild(link);
      link.click();

      // Clean up by revoking the URL
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating CSV:", error);
    }
  };

  return (
    <div>
      <button
        className="btn btn-wide btn-primary mx-auto mt-6"
        onClick={handleGenerateCSV}
      >
        Generate CSV
      </button>
    </div>
  );
};

export default ScheduleGen;
