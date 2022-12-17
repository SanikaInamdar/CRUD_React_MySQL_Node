import { useState } from 'react';
import './App.css';
import Axios from 'axios';
function App() {
  const [name, setName] = useState(""); //variable that can be changed and be sent to our database.
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);
  //Making a state to store the array containing the list of all emp info
  const [employeeList, setEmployeeList] = useState([]);
  //State for new Wage
  const [newWage, setNewWage] = useState(0); // grab value from input and set it to newWage
  const addEmployee = () => {
    console.log(name);
    //making post request to server through the endpopints
    //{key(same as in backend for catching the frontend):value(it is the variable name in state in frontend)}-> body objects
    Axios.post('http://localhost:3001/create', {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage
    }).then(() => {
      console.log("Success");
    });
  };

  const getEmployees = () => {
    Axios.get('http://localhost:3001/employees').then((response) => {
      //console.log(response);
      setEmployeeList(response.data);
    });
  };

  const updateEmployeeWage = (id) => {
    Axios.put('http://localhost:3001/update', { wage: newWage, id: id }).then((response) => {
      //alert("Updated");
      setEmployeeList(employeeList.map((val) => {
        return val.id == id ? { id: val.id, name: val.name, country: val.country, position: val.position, age: val.age, wage: newWage } : val;
      }
      ))
    });
  };

  const deleteEmployee = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setEmployeeList(employeeList.filter((val) => {
        return val.id != id
      }));
    });
  };
  return (
    <div className="App">
      <div className="info">
        <label>Name</label>
        <input type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <label>Age</label>
        <input type="number"
          onChange={(event) => {
            setAge(event.target.value);
          }}
        />
        <label>Country</label>
        <input type="text"
          onChange={(event) => {
            setCountry(event.target.value);
          }}
        />
        <label>Position</label>
        <input type="text"
          onChange={(event) => {
            setPosition(event.target.value);
          }}
        />
        <label>Wage/yr</label>
        <input type="number"
          onChange={(event) => {
            setWage(event.target.value);
          }}
        />
        <button onClick={addEmployee}>Add Employee</button>
        <hr />
        <div className="employees">
          <button onClick={getEmployees}>Show Employees</button>
          {employeeList.map((val, key) => {
            return <div className="employee">
              <div>
                <h3>Name: {val.name}</h3>
                <h3>Age: {val.age}</h3>
                <h3>Country: {val.country}</h3>
                <h3>Position: {val.position}</h3>
                <h3>Wage: {val.wage}</h3>
              </div>
              <div>

                <input type="text" placeholder="Enter new wage" onChange={(event) => {
                  setNewWage(event.target.value);
                }} />
                <button onClick={() => { updateEmployeeWage(val.id) }}>Update</button>
                <button onClick={() => { deleteEmployee(val.id) }}>Delete</button>

              </div>
            </div>
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
