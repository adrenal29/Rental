import Navbar from "../components/Navbar";
import Properties from "../components/Properties";
import Slide from "../components/Slide";
import { useState ,useEffect} from "react";
import axios from "axios";
// import Categories from "../components/Categories"
// import Listings from "../components/Listings"
// import Footer from "../components/Footer"

const HomePage = () => {
  const [filters, setFilters] = useState({
    minRooms: 0,
    minBathrooms: 0,
    maxPrice: 1000000,
  });
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  useEffect(() => {
    const user = localStorage.getItem("email");
    axios
      .get("http://localhost:3001/getProperties", {})
      .then((result) => {
        setProperties(result.data);
        setFilteredProperties(result.data);
        console.log(result.data);
      })
      .catch((err) => alert("Error fetching property:", error));
  }, []);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };
  const applyFilters = () => {
    const filtered = properties.filter(property => {
      const meetsRoomCriteria = property.numRooms >= filters.minRooms;
      const meetsBathroomCriteria = property.numBathrooms >= filters.minBathrooms;
      const meetsPriceCriteria = property.price <= filters.maxPrice;
      return meetsRoomCriteria && meetsBathroomCriteria && meetsPriceCriteria;
    });
    setFilteredProperties(filtered);
  };

  return (
    <>
      <Navbar />
      <Slide />
      <h2>View Properties</h2>
      <h3 style={{ marginLeft: "10vw" }}>Apply Filters:</h3>
      <div style={{ marginLeft: "10vw" ,display:"flex",justifyContent:"space-between", width:"80vw"}}>
        <div>
          <label htmlFor="minRooms">Minimum Rooms:</label>
          <input
            type="number"
            id="minRooms"
            name="minRooms"
            value={filters.minRooms}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="minBathrooms">Minimum Bathrooms:</label>
          <input
            type="number"
            id="minBathrooms"
            name="minBathrooms"
            value={filters.minBathrooms}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="maxPrice">Maximum Price:</label>
          <input
            type="number"
            id="maxPrice"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleInputChange}
          />
        </div>
        <button onClick={applyFilters}>Apply Filters</button>
      </div>
      <Properties properties={filteredProperties}/>
    </>
  );
};

export default HomePage;
