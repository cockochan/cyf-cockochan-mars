import React,{useState} from 'react';
import DayPicker from './Datapicker'
function Table(props){
  const [clicked,setClicked]=useState(null)
  
  
  
  let allanding = [];

  props.rovers.map((rover) => allanding.push(rover.landing_date));
 
  let sortedLandings = allanding.sort();
  const firstYear = sortedLandings[0].slice(0, 4);

const onShowDate=(event)=>{
  setClicked(event.target.value)
}

 let allStopped = [];

  
  props.rovers.map((rover) => allStopped.push(rover.max_date));
 
  let sortedStops = allStopped.sort().reverse();
  const lastYear = sortedStops[0].slice(0, 4);

  const numYears = lastYear-firstYear;
  console.log(numYears);

  return(
    <div>
      {clicked!=null?<DayPicker month={new Date(clicked, 8)} />:<div></div>}
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
      return(<tr key={rover.name+rover.max_date.slice(0, 4)}><th>{rover.name}</th>
      {cells.reverse().map(cell=>{let stat
        if(thisRoverDeathYear>=cell&&cell>=thisRoverLandingYear){stat='active'}else{stat = 'passive';}
        return(<th><button key={rover.name+cell} value={cell} onClick={onShowDate} className={stat}>{cell}</button></th>)})}
      </tr>)})}
    
    </thead>
 <tbody>
  </tbody>
 
</table> <div>
{clicked?<div>{clicked}</div>:<div></div>}
  {clicked!=null?<DayPicker month={new Date(parseInt(clicked), 8)} />:<div></div>}
  {clicked?<div>{parseInt(clicked)}</div>:<div></div>}
 </div></div> )}
export default Table