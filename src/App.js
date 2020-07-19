import React, { useState, useEffect } from "react";
import Table from "./Table";
import "./App.css";

function App() {
  const [satelliteData, setSatelliteData] = useState(null);



  async function getSatelliteData() {
    let satelliteJson = await fetch(
      "https://api.nasa.gov/mars-photos/api/v1/rovers/?api_key=CYFZK0yMFOc4xf2zANKOJXcgXJRp0s65c0RFgFy9"
    );
    let properData = await satelliteJson.json();

    setSatelliteData(properData);
  }
  useEffect(() => {
    getSatelliteData();
  }, []);


  return (
    <div className="App">
      {satelliteData ? <Table rovers={satelliteData.rovers}  /> : <div></div>}
    </div>
  );
}

export default App;
