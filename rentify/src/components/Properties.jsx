import React, { useState, useEffect } from "react";
import { Popover } from 'react-tiny-popover'

const Properties = ({properties,user}) => {
  const [isPopoverOpen,setIsPopoverOpen]=useState(false)
  const [showId,setId]=useState(null)
  const [isLaptop, setIsLaptop] = useState(window.innerWidth >= 768);

  // Update state on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsLaptop(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const show=(id)=>{
    if(!user){
    window.location.href="/login"
    return;
    }
    setIsPopoverOpen(!isPopoverOpen)
    setId(id)
    alert("Details sent to email")
  }
  

  return <div style={{display:"flex",marginLeft:"5vw",flexWrap:"wrap"}}>{properties.map((property) => {
    return (
        <>
      <div style={{border:"1px solid black",display:"flex",marginLeft:"10px",marginTop:"10px",flexDirection:"column",  minWidth:"20vw",...(isLaptop ? { maxWidth: '22vw' } : {}),}}>
        <img src="https://tse1.mm.bing.net/th?id=OIP.7IOOK8MFeX7SErZsLIXrDwHaHa&pid=Api&rs=1&c=1&qlt=95&w=121&h=121" style={{height:"60%",width:"60%",marginLeft:"20%"}}></img>
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
