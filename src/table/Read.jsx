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
         alert(box.id);
      });
  });
    return(
        <div className="table-container">
            <table>
                <tr>
                    <td>
                        <h1>View Record</h1>
                    </td>
                </tr>
                <div className="recordRead">
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
                </div>
             </table>
        </div>

    )
}
export default Table