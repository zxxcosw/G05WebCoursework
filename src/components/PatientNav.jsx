import {useNavigate} from 'react-router-dom';
import React from 'react';


const PatientNav = ()=>{
    const navigate = useNavigate();
    
    const logout = async () =>{
        try{
            localStorage.removeItem("Patient");
            localStorage.removeItem("practiceRegistered");
            localStorage.removeItem("pid");
            navigate("/Login/1");
            
    
        }catch(err){
            console.error(err);
    
        }
      }

    return (
        <nav class="navbar navbar-inverse navbar-fixed-top">
        <div class="container-fluid">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                </button>
                <h class="navbar-brand">{localStorage.getItem("practiceRegistered")}</h>
            </div>
            <div id="navbar" class="navbar-collapse collapse">
                <ul class="nav navbar-nav navbar-right">
                    <li><a href="#"> {localStorage.getItem("patient")}</a></li>
                    <li><a onClick={logout}>Logout</a></li>
                </ul>
  
            </div>
        </div>
    </nav>
    )
}

export default PatientNav