// EmployeeList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        // Use axios to make a GET request to the server to fetch employee data
        const response = await axios.get('http://localhost:3001/get-employees');
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div>
      <h2>Employee List</h2>
      <ul>
        {employees.map((employee) => (
          <li key={employee._id}>
            <strong>Name:</strong> {employee.name}, 

          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;
