import React, {useState,useEffect } from 'react'
import {useParams} from 'react-router-dom';
import {db} from "../config/firebase";
import {getDocs,collection,query, where, doc, updateDoc,orderBy} from "firebase/firestore";
import ApprovedPatientNav from '../components/ApprovedPatientNav';

const Appointments = () => {
    let {id}=useParams();

    const [apList, setApList] = useState([]);
    const apCollectionRef = collection(db,"Appointments");
    let q1=query(apCollectionRef, where("State","==",{id}.id), where("Patient","==",localStorage.getItem("pid")),orderBy("Date"),orderBy("Slot"));


    useEffect(() =>{
        const getApList = async () =>{
          try{
            const data =await getDocs(q1);
            const filteredData=data.docs.map((doc)=>({...doc.data(),id:doc.id,}));
            setApList(filteredData);
          } catch(err){
            console.error(err);
          }
    };
  
        getApList();
    },[]);

      const update = async (id,state) => {
        const docRef=doc(db,"Appointments",id);
        await updateDoc(docRef,{State:state});
        window.location.reload();
      }

      let tab;

      if({id}.id=="3"){
        tab=(
            <ul class="nav nav-tabs">
            <li role="presentation"><a href="/MyAppointments/2">Upcoming</a></li>
            <li role="presentation" class="active"><a href="/MyAppointments/3">Pending</a></li>
            <li role="presentation"><a href="/MyAppointments/1">Past</a></li>
            <li role="presentation"><a href="/MyAppointments/0">Cancelled</a></li>
            
            </ul>
          );
      }else{
        if({id}.id=="1"){
        tab=(
            <ul class="nav nav-tabs">
            <li role="presentation"><a href="/MyAppointments/2">Upcoming</a></li>
            <li role="presentation"><a href="/MyAppointments/3">Pending</a></li>
            <li role="presentation" class="active"><a href="/MyAppointments/1">Past</a></li>
            <li role="presentation"><a href="/MyAppointments/0">Cancelled</a></li>
            </ul>
          )            
        }else{
          if({id}.id=="2"){
            tab=(
              <ul class="nav nav-tabs">
              <li role="presentation" class="active"><a href="/MyAppointments/2">Upcoming</a></li>
              <li role="presentation"><a href="/MyAppointments/3">Pending</a></li>
              <li role="presentation"><a href="/MyAppointments/1">Past</a></li>
              <li role="presentation"><a href="/MyAppointments/0">Cancelled</a></li>
              </ul>
            ) 

          }else{
            tab=(
                <ul class="nav nav-tabs">
                <li role="presentation"><a href="/MyAppointments/2">Upcoming</a></li>
                <li role="presentation"><a href="/MyAppointments/3">Pending</a></li>
                <li role="presentation"><a href="/MyAppointments/1">Past</a></li>
                <li role="presentation" class="active"><a href="/MyAppointments/0">Cancelled</a></li>
                </ul>
              ) 
          }


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
                    
                    <h1>My appointments</h1>
                    <span style={{width:"100px", display: "inline-block"}}></span>
                                                         

                            {tab}

                            <div class="table-responsive">
                                <table class="table table-hover">
                                    <thead>
                                        <tr>
                                        <th>Practice</th>
                                        <th>Speciality</th>
                                        <th>Doctor</th>
                                        <th>Complaint</th>
                                        <th>Date</th>
                                        <th>Options</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {apList.map((ap) =>(
                                     <tr>
                                        <td>{ap.Practice}</td>
                                        <td>{ap.Speciality}</td>
                                        <td>{ap.PractitionerName}</td>
                                        <td>{ap.Complaint}</td>
                                        <td>{ap.Date+" "+ap.Slot}</td>
                                        <td><a href={"/MyApDetails/"+ap.id}>Details</a></td>
                                    </tr>
                                    ))} 

                                    </tbody>
                                </table>
                            </div>
                        
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

export default Appointments