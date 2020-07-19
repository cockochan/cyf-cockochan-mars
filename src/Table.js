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
}
  return(
<table >
    <thead>
    {props.rovers.map((rover)=>{
      
      let cells=[]
    for(let i=0;i<=numYears){
      cells.push()
    }
      return(<tr><th>{rover.name}</th>
      {cells}</tr>)
      })
    }</thead>
{/* //  <tbody>
//   <tr>
//     <td>sat1</td>
//     <td>true</td>
//     <td>true</td>
//     <td>false</td>
//   </tr>
//   <tr>
//     <td>sat2</td>
//     <td>false</td>
//     <td>true</td>
//     <td>true</td>
//   </tr>
//   <tr>
//     <td>sat2</td>
//     <td>false</td>
//     <td>true</td>
//     <td>false</td>
//   </tr></tbody> */}
</table> )}
export default Table