import React, { useState, useEffect } from "react";
import SellerSideBar from "../components/SellerSideBar";
import "../styles/seller.scss";
import axios from "axios";

const Seller = () => {
  const [option, setOption] = useState("post");
  const [price, setPrice] = useState("");
  const [place, setPlace] = useState("");
  const [numBathrooms, setNumBathrooms] = useState("");
  const [numRooms, setNumRooms] = useState("");
  const [schoolsNearby, setSchoolsNearby] = useState("");
  const [sellerProperties, setSellerProperties] = useState([]);
  const [editedProperties, setEditedProperties] = useState({});
  const [editingPropertyId, setEditingPropertyId] = useState(null);
  const [deletedPropertyId, setDeletedPropertyId] = useState(null);

  const handleEdit = (propertyId) => {
    setEditingPropertyId(propertyId);
    // You can add more logic here for handling the edit action
  };
  const handleSave = (propertyId) => {
    setEditingPropertyId(null);
    setEditedProperties({ ...editedProperties, [propertyId]: sellerProperties.find(property => property.id === propertyId) });
  };

  const handleInputChange = (propertyId, field, value) => {
    const updatedProperty = { ...editedProperties[propertyId], [field]: value };
    setEditedProperties({ ...editedProperties, [propertyId]: updatedProperty });
  };
  const handleDelete = (propertyId) => {
    setDeletedPropertyId(propertyId);
    console.log(`Property with ID ${propertyId} will be deleted`);
  };

  const user = localStorage.getItem("email");
  console.log(user)
  useEffect(() => {
    const user = localStorage.getItem("email");
    axios
      .get("http://localhost:3001/getSellerProperties", {
        params: { email: user },
  }).then((result) => {
        setSellerProperties(result.data);
        console.log(result.data)
      })
      .catch((err) => alert("Error fetching property:", error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3001/postProperty", {
        email: user,
        price,
        place,
        numBathrooms,
        numRooms,
        schoolsNearby,
      })
      .then((result) => {
        alert("Property posted successfully");
        window.location.reload();
        console.log(result);
      })
      .catch((error) => alert("Error posting property:", error));
  };

  return (
    <div className="sellerDashboard">
      <SellerSideBar setOption={setOption} />
      <div>
        {option == "post" ? (
          <>
            <h2>Post Property</h2>
            <form className="form-container" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="price">Price:</label>
                <input
                  type="text"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="place">Place:</label>
                <input
                  type="text"
                  id="place"
                  value={place}
                  onChange={(e) => setPlace(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="numBathrooms">Number of Bathrooms:</label>
                <input
                  type="number"
                  id="numBathrooms"
                  value={numBathrooms}
                  onChange={(e) => setNumBathrooms(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="numRooms">Number of Rooms:</label>
                <input
                  type="number"
                  id="numRooms"
                  value={numRooms}
                  onChange={(e) => setNumRooms(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="schoolsNearby">Schools Nearby:</label>
                <input
                  type="text"
                  id="schoolsNearby"
                  value={schoolsNearby}
                  onChange={(e) => setSchoolsNearby(e.target.value)}
                  required
                />
              </div>
              <button type="submit">Post Property</button>
            </form>
          </>
        ) : (
          <>
             <div className="property-list-container">
      <h2>View your listed Properties</h2>
      <table className="property-table">
        <thead>
          <tr>
            <th>Price</th>
            <th>Place</th>
            <th>Number of Bathrooms</th>
            <th>Number of Rooms</th>
            <th>Schools Nearby</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sellerProperties.map((property, index) => (
            <tr key={index}>
              <td>
                {editingPropertyId === property.id ? (
                  <input
                    type="text"
                    value={editedProperties[property.id]?.price || property.price}
                    onChange={(e) => handleInputChange(property.id, 'price', e.target.value)}
                  />
                ) : (
                  property.price
                )}
              </td>
              <td>
                {editingPropertyId === property.id ? (
                  <input
                    type="text"
                    value={editedProperties[property.id]?.place || property.place}
                    onChange={(e) => handleInputChange(property.id, 'place', e.target.value)}
                  />
                ) : (
                  property.place
                )}
              </td>
              <td>
                {editingPropertyId === property.id ? (
                  <input
                    type="text"
                    value={editedProperties[property.id]?.numBathrooms || property.numBathrooms}
                    onChange={(e) => handleInputChange(property.id, 'numBathrooms', e.target.value)}
                  />
                ) : (
                  property.numBathrooms
                )}
              </td>
              <td>
                {editingPropertyId === property.id ? (
                  <input
                    type="text"
                    value={editedProperties[property.id]?.numRooms || property.numRooms}
                    onChange={(e) => handleInputChange(property.id, 'numRooms', e.target.value)}
                  />
                ) : (
                  property.numRooms
                )}
              </td>
              <td>
                {editingPropertyId === property.id ? (
                  <input
                    type="text"
                    value={editedProperties[property.id]?.schoolsNearby || property.schoolsNearby}
                    onChange={(e) => handleInputChange(property.id, 'schoolsNearby', e.target.value)}
                  />
                ) : (
                  property.schoolsNearby
                )}
              </td>
              <td>
                {editingPropertyId === property.id ? (
                  <button onClick={() => handleSave(property.id)}>Save</button>
                ) : (
                  <button onClick={() => handleEdit(property.id)}>Edit</button>
                  
                )}
              </td>
              <td>
              <button onClick={() => handleDelete(property.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Seller;
