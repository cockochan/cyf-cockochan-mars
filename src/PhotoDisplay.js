import React, { useState, useEffect } from "react";

import "react-calendar/dist/Calendar.css";
function PhotoDisplay(props) {
  const [photosMade2, setPhotosMade2] = useState({});
  if(photosMade2!=null){console.log(photosMade2);}
  useEffect(
    (props) => {
      async function getPhotosForThisDate(props) {
        let photoJson2 = await fetch(
          `https://api.nasa.gov/mars-photos/api/v1/rovers/${props.rName}/photos?earth_date=${props.dayClicked.toISOString().substring(0, 10)}&api_key=CYFZK0yMFOc4xf2zANKOJXcgXJRp0s65c0RFgFy9`
        );
        let photoData2 = await photoJson2.json();

        setPhotosMade2(photoData2);
      }
    },
    [props.dayClicked]
  );
  
  if(photosMade2.photos){return(<img className='photoDisplay col-6'src={photosMade2.photos[0].img_src}/>)}else{return<div></div>}
  }
export default PhotoDisplay;
