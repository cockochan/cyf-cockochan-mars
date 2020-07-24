import React, { useState } from "react";

import "react-calendar/dist/Calendar.css";
function PhotoDisplay(props) {
  const [photosMade, setPhotosMade] = useState({});
  if(photosMade!=null){console.log(photosMade);}
  useEffect(
    (props) => {
      async function getPhotosForThisDate(props) {
        let photoJson = await fetch(
          `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${props.dayClicked.toISOString().substring(0, 10)}&api_key=CYFZK0yMFOc4xf2zANKOJXcgXJRp0s65c0RFgFy9`
        );
        let photoData = await photoJson.json();

        setPhotosMade(photoData);
      }
    },
    [props.date]
  );
  getPhotosForThisDate()
  return photosMade ? <div>huiak</div> : <div>pidyk</div>;
}
export default PhotoDisplay;
