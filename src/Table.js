import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import PhotoDisplay from "./PhotoDisplay";

function Table(props) {
  const [clicked, setClicked] = useState(null);
  const [dayClicked, setDayClicked] = useState();
  const [clickedId, setClickedId] = useState();
  const [photosMade, setPhotosMade] = useState({});
  const [camera, setCamera] = useState("FHAZ");
  const [hero, setHero] = useState(null);
  let allanding = [];

  props.rovers.map((rover) => allanding.push(rover.landing_date));

  let sortedLandings = allanding.sort();
  const firstYear = sortedLandings[0].slice(0, 4);
  const closeCalendar = () => {
    setClicked(null);
  };
  const setCam = (event) => setCamera(event.target.value);

  const onShowDate = (event) => {
    setClickedId(event.target.id);
    setClicked(event.target.value);
    console.log(event.target.id);
  };
  const onClickDay = (value, event) => {
    setHero(null);
    setDayClicked(value);
  };
  useEffect(() => {
    async function getPhotosForThisDate() {
      console.log("somethinghappened");
      console.log(dayClicked, clickedId);
      if (dayClicked) {
        let photoJson = await fetch(
          `https://api.nasa.gov/mars-photos/api/v1/rovers/${clickedId}/photos?earth_date=${dayClicked
            .toISOString()
            .substring(
              0,
              10
            )}&camera=${camera.toLowerCase()}&api_key=CYFZK0yMFOc4xf2zANKOJXcgXJRp0s65c0RFgFy9`
        );
        let photoData = await photoJson.json();

        setPhotosMade(photoData);
        if (photosMade.photos) {
          console.log(photosMade.photos[0]);
        }
      }
    }
    getPhotosForThisDate();
  }, [dayClicked, camera]);
  // https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2020-01-01&camera=fhaz&api_key=CYFZK0yMFOc4xf2zANKOJXcgXJRp0s65c0RFgFy9
  const setHeroSrc = (event) => {
    event.preventDefault();
    console.log(event.target.src);
    setHero(event.target.src);
  };
  if (hero) {
    console.log(hero);
  }
  let allStopped = [];

  props.rovers.map((rover) => allStopped.push(rover.max_date));

  let sortedStops = allStopped.sort().reverse();
  const lastYear = sortedStops[0].slice(0, 4);

  const numYears = lastYear - firstYear;

  return (
    <div>
      <h2>
        showing <strong>{camera}</strong> camera
      </h2>
      <h3>you can choose cameras using buttons next to rover name</h3>
      <table className="allSatsTab">
        <thead>
          {props.rovers.map((rover) => {
            let cells = [];
            let thisRoverLandingYear = rover.landing_date.slice(0, 4);
            let thisRoverDeathYear = rover.max_date.slice(0, 4);

            for (let i = 0; i <= numYears; i++) {
              cells.push(lastYear - i);
            }
            return (
              <tr key={rover.name + rover.max_date.slice(0, 4)}>
                <th>
                  {rover.name}
                  <select onClick={setCam}>
                    {rover.cameras.map((camera) => (
                      <option value={camera.name} onClick={setCam}>
                        {camera.name}
                      </option>
                    ))}{" "}
                  </select>
                </th>
                {cells.reverse().map((cell) => {
                  let stat;
                  let disable;
                  if (
                    thisRoverDeathYear >= cell &&
                    cell >= thisRoverLandingYear
                  ) {
                    stat = "active";
                    disable = false;
                  } else {
                    stat = "passive";
                    disable = true;
                  }
                  return (
                    <th>
                      <button
                        id={rover.name}
                        key={rover.name + cell}
                        value={cell}
                        onClick={onShowDate}
                        className={stat}
                        disabled={disable}
                      >
                        {cell}
                      </button>
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody></tbody>
      </table>{" "}
      <div>
        <div className="row">
          {clicked !== null ? (
            <Calendar
              calendarType="ISO 8601"
              defaultView="year"
              onChange={onClickDay}
              activeStartDate={new Date(parseInt(clicked), 0, 1)}
            />
          ) : (
            <div></div>
          )}

          {clicked ? (
            <div>
              <button onClick={closeCalendar} className="closeButton">
                x
              </button>
            </div>
          ) : (
            <div></div>
          )}
          <div className="col-6 thumbBlock">
            {hero ? <img className="photoDisplay " src={hero} /> : <div></div>}
            {photosMade.photos ? (
              photosMade.photos.map((photo) => {
                return (
                  <img
                    onClick={setHeroSrc}
                    value={photo.img_src}
                    className="thumb col-2"
                    src={photo.img_src}
                  />
                );
              })
            ) : (
              <div>
                *if you dont see anything after a couple of seconds,try another
                camera.
              </div>
            )}
          </div>
        </div>
      </div>
      {dayClicked ? (
        <div>
          selected date:{" "}
          <strong>{dayClicked.toISOString().substring(0, 10)}</strong>
        </div>
      ) : (
        <div></div>
      )}
      {/* {clickedId?<PhotoDisplay dayClicked={dayClicked} rName={clickedId}/>:<div></div>} */}
    </div>
  );
}
export default Table;
