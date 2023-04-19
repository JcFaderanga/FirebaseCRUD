import React from 'react'
import './app.css'
import './header/header.css'
import './create/create.css'
import './table/table.css'
import { useState, useEffect} from "react";
import {db} from './firebase-config';
import {collection , getDocs, addDoc,deleteDoc,doc,updateDoc} from 'firebase/firestore';
function App(){

const [newName, setNewName] = useState("")
const [newLastName, setNewLastName] = useState("")
const [newAge, setNewAge] = useState(0)
const [newAddress, setNewAddress] = useState("")

const [updateName , setUpdateName] = useState("")
const [updateLastName, setUpdateLastName] = useState("")
const [updateAge, setUpdateAge] = useState(0)
const [updateAddress, setUpdateAddress] = useState("")

const usersCollectionRef = collection(db,"users");
const [users, setUsers] = useState([]);


{/*-- Create event--*/}
const createUser = async () => {
	await addDoc(usersCollectionRef,{name: newName,lastname: newLastName ,age: newAge, address: newAddress});
	getUsers();
	inputsNULL();

};
	const getUsers = async ()=>{
	   const data = await getDocs(usersCollectionRef);
	   setUsers(data.docs.map((doc)=>({...doc.data(), id: doc.id})));
	};
useEffect(() =>{ 
	getUsers();
	deleteUser();
	updateUser();
}, []); 

function inputsNULL(){
	document.getElementById('name').value = "";
	document.getElementById('lastname').value = "";
	document.getElementById('age').value = "";
	document.getElementById('address').value ="";
}

{/*-- Delete event--*/}
const deleteUser = async (id) => {
	const userDoc = doc(db, "users", id);
	await deleteDoc(userDoc);
	window.location.reload();
	
  };
{/*-- Update event--*/}
  const updateUser = async (id) => {
	const userDoc = doc(db, "users", id);
	await updateDoc(userDoc,
		 {name: updateName, 
		  lastname: updateLastName,
		  age: updateAge,
		  address: updateAddress
		 });
		 inputsNULL();
		 window.location.reload();
  };
 
const updateData = async (id) =>{
	const userDoc = doc(db, "users", id);
    document.querySelector('.form-group-create').style.display ="none";
	document.querySelector('.form-group-update').classList.add('active');
	var btnUpdate = document.querySelectorAll('#update');
	btnUpdate.forEach((box,index) =>{
	box.addEventListener('click', ()=>{
	  inputsNULL();
	  var row = index++;
	  document.querySelectorAll('.box')[row].style.height="150px";  
	  var nameVal = document.querySelectorAll('#updateName')[row].innerHTML;
		 document.querySelector('#name').value = nameVal;
	 var lastnameVal = document.querySelectorAll('#updateLastname')[row].innerHTML;
		 document.querySelector('#lastname').value =  lastnameVal;
	 var ageVal = document.querySelectorAll('#updateAge')[row].innerHTML;
		 document.querySelector('#age').value = parseInt(ageVal);
	 var addressVal = document.querySelectorAll('#updateAddress')[row].innerHTML;
		 document.querySelector('#address').value =  addressVal;

		 
	});  
  });
}



	return(
		<div className="container">
			<ul>
			    <li>JC Faderanga</li>
		    </ul>
			<div className="content">
				<div className="create-form">
					<div className="shadow">     
						<div className="form-group-create">
						<h1 id="title"> Create Record </h1>
							<div className="details">
								<span>Name:</span>
								<input type="text" placeholder="Enter Name here"  
								onChange={(event) =>{
								setNewName(event.target.value);}}
								autocomplete="off" required />
							</div>
							<div className="details">
								<span>Last Name:</span>
								<input type="text" placeholder="Enter Last Name"
								onChange={(event) =>{
									setNewLastName(event.target.value);}}
									autocomplete="off" required/>
							</div>
							<div  className="details">
							<span>Age:</span>
								<input type="number" placeholder="Enter Age"
								onChange={(event) =>{
									setNewAge(event.target.value);}}
									autocomplete="off" required/>
							</div>
							<div className="details">
								<span>Address:</span>
								<input style={{height:"70px"}} placeholder="Enter Address here" 
								onChange={(event) =>{
									setNewAddress(event.target.value);}}autocomplete="off" required/>
							</div>
							<div className="details">
							<button className="btn-create" onClick={createUser}> create </button>
							</div>
						</div>

						
						<div className="form-group-update">
						<h1 id="title"> Update Record </h1>
							<div className="details">
								<span>Name:</span>
								<input id="name" type="text" placeholder="Enter Name here"  
								onChange={(event) =>{
								setUpdateName(event.target.value);}}
								autocomplete="off" required/>
							</div>
							<div className="details">
								<span>Last Name:</span>
								<input id="lastname" type="text" placeholder="Enter Last Name"
								onChange={(event) =>{
									setUpdateLastName(event.target.value);}}
									autocomplete="off" required/>
							</div>
							<div  className="details">
							<span>Age:</span>
								<input id="age" type="number" placeholder="Enter Age"
								onChange={(event) =>{
									setUpdateAge(event.target.value);}}
									autocomplete="off" required/>
							</div>
							<div className="details">
								<span>Address:</span>
								<input style={{height:"70px"}} id="address" placeholder="Enter Address here" 
								onChange={(event) =>{
									setUpdateAddress(event.target.value);}}autocomplete="off" required/>
							</div>
							<div className="details">
							</div>
						</div>
					</div>  
				</div>
				<div className="table-container">
            <div className="recordList">
            <table>
                <tr>
                    <td>
                        <h1>Record List</h1>
                    </td>
                </tr>
                    {users.map((user)=>{
                        return ( 
                            <tr>
                                <td>  
                                    {""}
                                    <div className="box" style={{cursor:"pointer"}}>
                                        <div className="Box-title">
                                            <div>
                                                <span id="updateName">{user.name}</span>
                                                <span id="updateLastname">{user.lastname}</span>
                                            </div>
                                            <span style={{color: "green", fontSize:"18px"}}>View record</span>
                                        </div>
                                        <div style={{display: "flex"}}>
                                            <div className="info">
                                                <span id="updateAge"> {user.age}</span>
                                                <span id="updateAddress">{user.address}</span>
                                            </div>
                                            <div id="edit"className="btn">
											<button onClick={() => {
                                                        updateUser(user.id);
                                                    }}> Update</button>
                                              <button id="update" onClick={() => {
                                                       updateData(user.id);
                                                    }}> Edit</button>
                                                <button
                                                    onClick={() => {
                                                        deleteUser(user.id);
                                                    }}
                                                    >
                                                    {" "}
                                                    Delete
                                                    </button>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                
             </table>
             </div>
             <div className="recordRead">
                   
                </div>
        </div>
			</div>
		</div>
	)
}
export default App