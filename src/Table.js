import React,{useState} from 'react';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import PhotoDisplay from './PhotoDisplay'
function Table(props){
  const [clicked,setClicked]=useState(null)
  const [dayClicked,setDayClicked]=useState(null)
  
  
  let allanding = [];

  props.rovers.map((rover) => allanding.push(rover.landing_date));
 
  let sortedLandings = allanding.sort();
  const firstYear = sortedLandings[0].slice(0, 4);
const closeCalendar =()=>{
  setClicked(null)
}
const onShowDate=(event)=>{
  setClicked(event.target.value)
}
const onClickDay = (value, event) => {
setDayClicked(value)}
 let allStopped = [];

  
  props.rovers.map((rover) => allStopped.push(rover.max_date));
 
  let sortedStops = allStopped.sort().reverse();
  const lastYear = sortedStops[0].slice(0, 4);

  const numYears = lastYear-firstYear;


  return(
    <div>
 
<table className='allSatsTab' >
    <thead>
    {props.rovers.map((rover)=>{
      let cells=[];
     let thisRoverLandingYear = rover.landing_date.slice(0, 4);
     let thisRoverDeathYear = rover.max_date.slice(0, 4);
   
     
     
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

  {clicked!=null?<Calendar calendarType="ISO 8601"defaultView="year"  onChange={onClickDay}	activeStartDate={new Date(parseInt(clicked), 0, 1)} />:<div></div>}
  
  {clicked?<div><button onClick={closeCalendar}>close calendar</button></div>:<div></div>}
 </div>
 {dayClicked?<div>{dayClicked.toISOString().substring(0, 10)}</div>:<div></div>}
 {dayClicked?<PhotoDisplay date = {dayClicked.toISOString().substring(0, 10)}/>:<div></div>}
 </div> )}
export default Table