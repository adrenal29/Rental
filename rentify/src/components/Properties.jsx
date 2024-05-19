import React, { useState, useEffect } from "react";
import { Popover } from 'react-tiny-popover'

const Properties = ({properties}) => {
  const [isPopoverOpen,setIsPopoverOpen]=useState(false)
  const [showId,setId]=useState(null)
  const show=(id)=>{
    setIsPopoverOpen(!isPopoverOpen)
    setId(id)
    alert("Details sent to email")
  }
  

  return <div style={{display:"flex",marginLeft:"5vw",flexWrap:"wrap"}}>{properties.map((property) => {
    return (
        <>
      <div style={{border:"1px solid black",display:"flex",marginLeft:"10px",marginTop:"10px",flexDirection:"column",maxWidth:"20vw",minWidth:"20vw"}}>
        <img src="../../public/assets/home.jpg" style={{height:"160px",width:"180px",marginLeft:"20%"}}></img>
        <div style={{textAlign:"left",paddingLeft:"20%"}}>
        <h3>Property Price{" "}Rs{property.price}</h3>
        <h3>Property Location{" "}{property.place}</h3>
        <h3>Number of Rooms{" "}{property.numRooms}</h3>
        <h3>Number of Bathhrooms{" "}{property.numBathrooms}</h3>
        <h3>School Nearby{" "}{property.schoolsNearby
}</h3>
<button style={{marginBottom:"10px",backgroundColor:"black",color:"white"}} onClick={()=>show(property._id)}>I am interested</button>
{
 isPopoverOpen && property._id==showId?<h3>Property Owner Email{" "}Rs{property.email}</h3>:""
}
        </div>
      </div>
      </>
    )
  })}</div>;
};

export default Properties;
