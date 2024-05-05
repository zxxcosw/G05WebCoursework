import {useNavigate} from 'react-router-dom';
import React from 'react';
import{db} from "../config/firebase";
import { doc, updateDoc, getDoc, getDocs,collection} from "firebase/firestore"; 
import {useState, useEffect} from 'react';


const ApprovedPatientNav = ()=>{
    const navigate = useNavigate();
    const [patient,setPatient]=useState({NewTest:"0"});

    useEffect(() =>{
      const getpList = async () =>{
        try{         
          const docRef=doc(db,"Patients",localStorage.getItem("pid"));
          const docSnap = await getDoc(docRef);
          setPatient(docSnap.data());
          
        } catch(err){
          console.error(err);
        }
  };

      getpList();
  },[]);
    
    const logout = async () =>{
        try{
            localStorage.removeItem("Patient");
            localStorage.removeItem("practiceRegistered");
            localStorage.removeItem("pid");
            localStorage.removeItem("approval");
            navigate("/Login/1");
            
    
        }catch(err){
            console.error(err);
    
        }
      }

    return (<div>
            <nav class="navbar navbar-default navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">{localStorage.getItem("practiceRegistered")}</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
          <ul class="nav navbar-nav">
            <li><a href="/Home">Home</a></li>
            <li><a href="/MyAppointments/2">My Appointments</a></li>
            <li><a href="/MyTests/0">My tests{patient.NewTest=="1"?(<><span class="label label-default">New</span></>):(<></>)}</a></li>
            <li><a href="/PatientInfo">Personal information</a></li>

          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li><a>{localStorage.getItem("patient")}</a></li>
            <li><a onClick={logout}>Log out</a></li>
          </ul>
        </div>
      </div>
    </nav>
    </div>

    )
}

export default ApprovedPatientNav