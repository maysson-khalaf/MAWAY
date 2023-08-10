import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
import style from './MyCases.module.css';

function MyCases() {
  const [cases, setCases] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token);
    axios.get('http://localhost/APIS/MyCasesApi/get', {
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${token}`
        
      }
    })
    .then(response => {
      console.log(response.data);
      
      if (Array.isArray(response.data)) {
        setCases(response.data);
      } else {
        console.error('Response data is not an array:', response.data);
      }
    })
    .catch(error => {
      console.error('API request failed:', error);
    });
  }, []);

  if (cases.length === 0) {
    return <p>No cases found.</p>;
  }

  console.log('Cases:', cases);

  return (
    <div>
      <h1>My Cases</h1>
      <table>
        <thead>
          <tr>
            <th>Case ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>SSN</th>
            <th>Phone</th>
            <th>Lab Name</th>
          </tr>
        </thead>
        <tbody>
          {cases.map((caseData) => (
            <tr key={caseData.id}>
              <td>{caseData.id}</td>
              <td>{caseData.name}</td>
              <td>{caseData.address}</td>
              <td>{caseData.ssn}</td>
              <td>{caseData.phone}</td>
              <td>{caseData.lab_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MyCases;