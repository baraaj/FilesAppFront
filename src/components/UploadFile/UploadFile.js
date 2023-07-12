import React, { useEffect, useState } from 'react';
import uploadfile from "../../assets/images/gestion.png";
import axios from 'axios';
import "./UploadFile.css";

export default function UploadFile() {
  const [file, setFile] = useState(null);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const username = localStorage.userName;
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`https://localhost:7213/api/Account/users/${username}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userData.role !== "User") {
      alert("Only users are allowed to upload files.");
      return;
    }

    if (!file) {
      alert("Please select a file.");
      return;
    }

    if (file.type !== "text/plain") {
      alert("Please select a text file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    //formData.append("userId", userData.id); 

    try {
      const response = await axios.post(`https://localhost:7268/api/FileAPI?userId=${userData.id}`, formData);
      console.log(response.data);
      alert("File uploaded successfully!");
    } catch (error) {
      console.error('Error:', error);
      alert("An error occurred while uploading the file.");
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}>
        <section id="Get-loan">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <form onSubmit={handleSubmit}>
                  <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                  <button className="nav-link btn border-0 mt-2 bt1 bg-primary text-white" type="submit">Submit file for traceability</button>
                </form>
              </div>
              <div className="col-md-6">
                <div className="choose-img">
                  <img src={uploadfile} alt="" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
