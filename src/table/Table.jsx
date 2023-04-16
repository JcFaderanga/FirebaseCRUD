import { useState, useEffect} from "react";
import React from 'react';
import './table.css';
import {db} from '../firebase-config';

import {collection , getDocs, addDoc} from 'firebase/firestore';

function Table(){
    
    const [users, setUsers] = useState([]);
    const usersCollectionRef = collection(db,"users");
    
    useEffect(() =>{ 
		const getUsers = async ()=>{
		   const data = await getDocs(usersCollectionRef);
		   setUsers(data.docs.map((doc)=>({...doc.data(), id: doc.id})));
		};
		getUsers();

    }, []);
  let List = document.querySelectorAll('.box');
   
  List.forEach((box) =>{
      box.addEventListener('click', ()=>{
        box.style.height ="200px";
      }); 
  });
    return(
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
                                    <div className="box" id={user.id}>
                                        <span>{user.name}</span>
                                        <span>{user.lastname}</span>
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

    )
}
export default Table