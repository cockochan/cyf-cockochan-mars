import React, { useState } from "react";

import "react-calendar/dist/Calendar.css";
function PhotoDisplay(props) {
  // if(photosMade!=null){console.log(photosMade);}
  // useEffect(
  //   (props) => {
  //     async function getPhotosForThisDate() {
  //       let photoJson = await fetch(
  //         `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${props.date}&api_key=CYFZK0yMFOc4xf2zANKOJXcgXJRp0s65c0RFgFy9`
  //       );
  //       let photoData = await photoJson.json();

  //       setPhotosMade(photoData);
  //     }
  //   },
  //   [props.date]
  // );
  // getPhotosForThisDate()
  return photosMade ? <div>huiak</div> : <div>pidyk</div>;
}
export default PhotoDisplay;
