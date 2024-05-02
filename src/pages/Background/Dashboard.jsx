import React, { useState,useEffect } from 'react'
import {useNavigate} from 'react-router-dom';
import {db} from "../../config/firebase";
import {getDocs,collection,query, where} from "firebase/firestore";
import BackNav from "../../components/BackNav";



const Dashboard = () => {
  const [apList, setApList] = useState([]);
  const apCollectionRef = collection(db,"Appointments");
  let q1;
  if(localStorage.getItem("type")=="1"){
    q1=query(apCollectionRef, where("State","==","2"), where("Practitioner","==",localStorage.getItem("uid")));

  }else{
    q1=query(apCollectionRef,where("Practice","==",localStorage.getItem("practice")), where("State","==","2"), 
    where("Speciality","==",localStorage.getItem("speciality")));

  }
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

  let content;
  if(localStorage.getItem("isLogin")==null){
    content=(
      <div>
        <p class="text-center" >Please login first!</p>     
        <p class="text-center"><a href="/Login/2">Login</a></p> 
      </div>
    )
  }else{
    content=(
      <div>
      <BackNav/>
      <div class="container-fluid">
          <div class="row">
              <div class="col-sm-3 col-md-2 sidebar" style={{position:'fixed'}}>
                  <ul class="nav nav-sidebar">
                      <li class="active"><a href="/Dashboard">Dashboard <span class="sr-only">(current)</span></a></li>
                      <li><a href="/Appointments/3">Appointments</a></li>
                      <li><a href="/Test/0">Tests</a></li>
                  </ul>
              </div>
              <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
                <ol class="breadcrumb">
                  <li class="active">Dashboard</li>
                </ol>
                  <h4 class="sub-header">Upcoming appointments</h4>
                  <div class="table-responsive">
                    <table class="table table-hover">
                      <thead>
                        <tr>
                          <th>Patient</th>
                          <th>Compliant</th>
                          {localStorage.getItem("type")=="1"?(<th>Options</th>):(<></>)}
                          

                        </tr>
                      </thead>
                      <tbody>                       
                          {apList.map((ap) =>(
                            <tr>
                            <td>{ap.PatientName}</td>
                            <td>{ap.Complaint}</td>
                            {localStorage.getItem("type")=="1"?(<td><a href={"/StartAp/"+ap.id}>Start Appointment</a></td>):(<></>)}
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

export default Dashboard