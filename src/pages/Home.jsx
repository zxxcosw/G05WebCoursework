import React from 'react'
import{db} from "../config/firebase"
import {useState, useEffect} from 'react';
import {Link,useNavigate} from 'react-router-dom';
import PatientNav from "../components/PatientNav";
import { doc, updateDoc, getDoc, getDocs,collection} from "firebase/firestore"; 
import ApprovedPatientNav from '../components/ApprovedPatientNav';

const Home = () => {

    const [practices,setPractices]=useState([]);
    const [practice,setPractice]=useState();

    const [patient,setPatient]=useState({
        Name:"",
        Birth:"",
        Address:"",
        Approval:""
    });

    useEffect(() =>{
        const getpList = async () =>{
          try{
            const pCollectionRef = collection(db,"Practices");
            const data =await getDocs(pCollectionRef);
            const filteredData=data.docs.map((doc)=>({...doc.data(),id:doc.id,}));
            
            const docRef=doc(db,"Patients",localStorage.getItem("pid"));
            const docSnap = await getDoc(docRef);

            setPractices(filteredData);
            setPatient(docSnap.data());
            
          } catch(err){
            console.error(err);
          }
    };
  
        getpList();
    },[]);

    const apply=async()=>{
        const docPRef=doc(db,"Patients",localStorage.getItem("pid"));
        await updateDoc(docPRef,{PracticeRegistered:practice,Approval:"0"});
        localStorage.setItem("practiceRegistered",practice);
        localStorage.setItem("approval","0");
        window.location.reload();
    }

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

      let info=(
      <div>
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
        </dl>

        <span style={{width:"100px", display: "inline-block"}}></span>
        <div class="form-group">                                 
          <button class="btn btn-default center-block" onClick={update}>Save</button>
        </div>
        </div>
    </div>

      </div>
      )



    
    let content
    if(localStorage.getItem("patient")==null){
        content= (
        <div>
        <p class="text-center" >Please login first!</p>     
        <p class="text-center"><a href="/Login/1">Login</a></p> 
        </div>)
    }else{
        if(localStorage.getItem("approval")=="1"){
            content=(
            <div>
                <ApprovedPatientNav/>
                <p class="text-center"><a href="/CreateAp">Booking appointment</a></p>


            </div>)

        }else{
            if(localStorage.getItem("approval")=="0"){

            content=(
            <div>
            <PatientNav/>
            <h1 class="text-center">Your registration for {localStorage.getItem("practiceRegistered")} is waiting for admin to approve.</h1>
            <div class="row">
                <div class="col-sm-8 col-md-offset-2  main">
                {info}
                <p class="text-center"><a href="/FillMedicalHistory">My medical history form</a></p>
                </div>
            </div>
            </div>)}
        else {
            content=(
            <div>
            <PatientNav/>
            <h1 class="text-center">Your registration for {localStorage.getItem("practiceRegistered")} was rejected.</h1>
            <h1 class="text-center">You can try another practice.</h1>

            <span style={{width:"100px", display: "inline-block"}}></span>

            <div class="row">
                <div class="col-sm-8 col-md-offset-2  main">

            <div class="form-group">
            <label for="inputPractice" class="col-sm-2 control-label">Select a health practice</label>
            <div class="col-sm-10">
            <select class="form-control" name="practice" onChange={(e) => setPractice(e.target.value)} >
            <option></option>
            {practices.map((p)=>(<option>{p.id}</option>))}
            </select>
            </div>
            </div>

            <span style={{width:"100px", display: "inline-block"}}></span>

            <div class="form-group">
            <div>
            <button class="btn btn-default center-block" onClick={apply}>Apply</button>
            </div>
            </div>

            {info}
            <p class="text-center"><a href="/FillMedicalHistory">My medical history form</a></p>
            </div>
            </div>


            </div>)

        }}
        
      


    }


    return(
        <div>
            {content}
        </div>
            
    )
}

export default Home