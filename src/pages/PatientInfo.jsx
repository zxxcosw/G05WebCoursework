import React from 'react'
import ApprovedPatientNav from '../components/ApprovedPatientNav';
import {getDoc,doc, getDocs,collection, query, where,updateDoc} from "firebase/firestore";
import {useState,useEffect} from 'react';
import{db} from "../config/firebase"

const PatientInfo = () => {

    const [patient,setPatient]=useState({
        Name:"",
        Birth:"",
        Address:""
    });


    useEffect(() =>{
        const getP = async () =>{
          try{
            const docRef=doc(db,"Patients",localStorage.getItem("pid"));
            const docSnap = await getDoc(docRef);
            setPatient(docSnap.data());

          } catch(err){
            console.error(err);
          }
    };
  
        getP();
    },[]);

    const handleChange = (e) => {
      setPatient((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      console.log(patient);
    };

    const update=async()=>{
      try{
        const docPRef=doc(db,"Patients",localStorage.getItem("pid"));
        await updateDoc(docPRef,{Name:patient.Name, Birth:patient.Birth, Address:patient.Address});
        localStorage.setItem("patient",patient.Name);
        window.location.reload();

      }catch(e){

      }
    }



      let content;
      if(localStorage.getItem("pid")==null){
        content=(
          <div>
            <p class="text-center" >Please login first!</p>     
            <p class="text-center"><a href="/Login/1">Login</a></p> 
          </div>
        )
      }else{
        content=(
            <div>
                <ApprovedPatientNav/>
                <div class="container-fluid">
                    <div class="row">

                        <div class="col-sm-8 col-md-offset-2  main">
                        <h1>My information</h1>

                        <span style={{width:"100px", display: "inline-block"}}></span>

                            <div class="panel panel-default">
                                <div class="panel-body">
                                <dl class="dl-horizontal">

                                 <div class="form-horizontal form-signin">
                                 <div class="form-group">
                                    <label for="inputName" class="col-sm-2 control-label">User Name</label>
                                    <div class="col-sm-10">
                                    <input class="form-control" id="name" placeholder={patient.Name} name="Name" value={patient.Name} onChange={handleChange}/>
                                    </div>
                                  </div>

                                  <div class="form-group">
                                    <label for="inputBirth" class="col-sm-2 control-label">Date of birth</label>
                                    <div class="col-sm-10">
                                    <input class="form-control" id="birth" placeholder={patient.Birth} name="Birth" value={patient.Birth} onChange={handleChange}/>
                                    </div>
                                  </div>

                                  <div class="form-group">
                                  <label for="inputAddress" class="col-sm-2 control-label">Address</label>
                                  <div class="col-sm-10">
                                  <input class="form-control" id="address" placeholder={patient.Address} name="Address" value={patient.Address} onChange={handleChange}/>
                                  </div>
                                  </div>
                                  </div>

                                    <dt>Registered Practice</dt>
                                    <dd>{localStorage.getItem("practiceRegistered")}</dd>
                                   
                                </dl>

                                <span style={{width:"100px", display: "inline-block"}}></span>
                                <div class="form-group">                                 
                                  <button class="btn btn-default center-block" onClick={update}>Save</button>
                                </div>
                                </div>
                            </div>

                            <p class="text-center"><a href="/FillMedicalHistory">My medical history form</a></p>
                        </div>
                    </div>
                </div>
            </div>

        )
      }

    return(
        <div>
            {content}
        </div>
        
        
            
    )
}

export default PatientInfo