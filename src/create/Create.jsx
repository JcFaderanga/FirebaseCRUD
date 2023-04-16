import { useState, useEffect} from "react";
import React from 'react';
import './create.css';
import {db} from '../firebase-config';
import {collection , getDocs, addDoc} from 'firebase/firestore';

function Create(){
    const [newName, setNewName] = useState("")
    const [newLastName, setNewLastName] = useState("")
    const [newAge, setNewAge] = useState(0)
    const [newAddress, setNewAddress] = useState("")


    const usersCollectionRef = collection(db,"users");
    const [users, setUsers] = useState([]);


	{/*-- Create event--*/}
	const createUser = async () => {
        await addDoc(usersCollectionRef,{name: newName,lastname: newLastName ,age: newAge, address: newAddress});
        window.location.reload();

	};
	useEffect(() =>{ 
		const getUsers = async ()=>{
		   const data = await getDocs(usersCollectionRef);
		   setUsers(data.docs.map((doc)=>({...doc.data(), id: doc.id})));
		};
		getUsers();

    }, []); 
    function inputsNULL(){
        document.getElementById('name').value = "";
        document.getElementById('lastname').value = "";
        document.getElementById('age').value = "";
        document.getElementById('address').value ="";
    }

    return(
        <div className="create-form">
            <div className="shadow">     
                 <h1> Create Record </h1>
                <div className="form-group">
                    <div className="details">
                        <span>Name:</span>
                        <input id="name" type="text" placeholder="Enter Name here"  
                        onChange={(event) =>{
                        setNewName(event.target.value);}}
                        autocomplete="off" required/>
                    </div>
                    <div className="details">
                        <span>Last Name:</span>
                        <input id="lastname" type="text" placeholder="Enter Last Name"
                        onChange={(event) =>{
                            setNewLastName(event.target.value);}}
                            autocomplete="off" required/>
                    </div>
                    <div  className="details">
                    <span>Age:</span>
                        <input id="age" type="number" placeholder="Enter Age"
                        onChange={(event) =>{
                            setNewAge(event.target.value);}}
                            autocomplete="off" required/>
                    </div>
                    <div className="details">
                        <span>Address:</span>
                        <input style={{height:"70px"}} id="address" placeholder="Enter Address here" 
                        onChange={(event) =>{
                            setNewAddress(event.target.value);}}autocomplete="off" required/>
                           
                    </div>
                    <div className="details">
                    <button onClick={createUser}> create </button>
                    </div>
                </div>
            </div>  
        </div>

    )
}
export default Create