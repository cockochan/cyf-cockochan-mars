import React from 'react';

function Table(props){
  
  
  
  
  let allanding = [];

  props.rovers.map((rover) => allanding.push(rover.landing_date));
 
  let sortedLandings = allanding.sort();
  const firstYear = sortedLandings[0].slice(0, 4);




 let allStopped = [];

  
  props.rovers.map((rover) => allStopped.push(rover.max_date));
 
  let sortedStops = allStopped.sort().reverse();
  const lastYear = sortedStops[0].slice(0, 4);

  const numYears = lastYear-firstYear;
  console.log(numYears);

  return(
<table className='allSatsTab' >
    <thead>
    {props.rovers.map((rover)=>{
      let cells=[];
     let thisRoverLandingYear = rover.landing_date.slice(0, 4);
     let thisRoverDeathYear = rover.max_date.slice(0, 4);
     console.log(rover.landing_date)
     console.log(thisRoverLandingYear)
     
     
    for(let i=0;i<=numYears;i++){
      cells.push(lastYear-i)
    }
      return(<tr><th>{rover.name}</th>
      {cells.reverse().map(cell=>{let stat
        if(thisRoverDeathYear>=cell&&cell>=thisRoverLandingYear){stat='active'}else{stat = 'passive';}
        return(<th className={stat}>{cell}</th>)})}
      </tr>)})}
    
    </thead>
 <tbody>
  </tbody>
</table> )}
export default Table