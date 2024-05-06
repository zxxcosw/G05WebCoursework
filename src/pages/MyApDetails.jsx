import React from 'react'
import {useParams,useNavigate} from 'react-router-dom';
import {getDoc,doc, getDocs,collection, query, where,updateDoc} from "firebase/firestore";
import{db} from "../config/firebase"
import {useState,useEffect} from 'react';
import ApprovedPatientNav from '../components/ApprovedPatientNav';

const MyApDetails = () => {

    let {id}=useParams();
    const [ap, setAp]=useState({ap:{},patient:{}});
    const [tests, setTests]=useState([]);
  
    useEffect(() =>{
        const getAp = async () =>{
          try{
            const docRef=doc(db,"Appointments",{id}.id);
            const docSnap = await getDoc(docRef);

            const docPRef=doc(db,"Patients",docSnap.data().Patient);
            const docPSnap=await getDoc(docPRef);

            const tCollectionRef = collection(db,"Tests");
            const q=query(tCollectionRef,where("Appointment","==",{id}.id));
            const Tdata =await getDocs(q);
            const TfilteredData=Tdata.docs.map((doc)=>({...doc.data(),id:doc.id,}));
            
            setAp({...ap, ap:docSnap.data(),patient:docPSnap.data() })
            setTests(TfilteredData);

          } catch(err){
            console.error(err);
          }
    }; 
        getAp();
        
    },[]);

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
                        <ol class="breadcrumb">
                        <li><a href="/MyAppointments/2">My Appointments</a></li>
                        <li class="active">Appointment details</li>
                        </ol>
                        <div class="panel panel-default">
                                <div class="panel-body">
                                <dl class="dl-horizontal">
                                    <dt>Practice</dt>
                                    <dd>{ap.ap.Practice}</dd>
                                    <dt>Speciality</dt>
                                    <dd>{ap.ap.Speciality}</dd>
                                    <dt>My Complaint</dt>
                                    <dd>{ap.ap.Complaint}</dd> 
                                    <dt>Doctor</dt> 
                                    <dd>{ap.ap.PractitionerName}</dd>
                                    {ap.ap.Prescription=="0"?(<></>):(
                                    <>
                                    <dt>Prescription</dt>
                                    <dd>{ap.ap.Prescription}</dd>                                   
                                    </>)}
                                </dl>
                                </div>
                        </div>

                        {ap.ap.Prescription=="0"?
                        (<></>)
                        :(
                        <>
                        <div class="panel panel-default">
                            <div class="panel-heading">
                            <h3 class="panel-title">Tests</h3>
                            </div>
                            <div class="panel-body">
                            <div class="table-responsive">
                                <table class="table table-hover">
                                    <thead>
                                        <tr>
                                        <th>Test content</th>
                                        <th>Result</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {tests.map((t) =>(
                                     <tr>
                                        <td>{t.Content}</td>
                                        <td>{t.State=="2"?(<>{t.Result}</>):(<></>)}</td>                                    
                                    </tr>
                                    ))} 

                                    </tbody>
                                </table>
                            </div>
                            </div>
                        </div>
                        </>
                                    )}
                        
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

export default MyApDetails