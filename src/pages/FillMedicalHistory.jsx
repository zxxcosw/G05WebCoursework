import React from 'react'
import{db} from "../config/firebase"
import {useState, useEffect} from 'react';
import {Link,useNavigate} from 'react-router-dom';
import PatientNav from "../components/PatientNav";
import MedicalHistoryForm from "../components/MedicalHistoryForm";
import { doc, setDoc, getDocs,collection} from "firebase/firestore"; 
import ApprovedPatientNav from '../components/ApprovedPatientNav';



const FillMedicalHistory = () => {
    let content

    if(localStorage.getItem("patient")==null){
        content= (
        <div>
        <p class="text-center" >Please login first!</p>     
        <p class="text-center"><a href="/Login/1">Login</a></p> 
        </div>)
    }else{
        if(localStorage.getItem("approval")=="1"){
            content=(<div>

                <ApprovedPatientNav/>
                <MedicalHistoryForm/>
    
            </div>)

        }else{
        content=(<div>

            <PatientNav/>
            <MedicalHistoryForm/>

        </div>)
        }



    }




    return(
        <div>
            {content}
        </div>
            
    )
}

export default FillMedicalHistory