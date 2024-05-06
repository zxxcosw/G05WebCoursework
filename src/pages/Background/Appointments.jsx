import React, {useState,useEffect } from 'react'
import {useParams} from 'react-router-dom';
import {db} from "../../config/firebase";
import {getDocs,collection,query, where, doc, updateDoc,orderBy} from "firebase/firestore";
import BackNav from "../../components/BackNav";

const Appointments = () => {
    let {id}=useParams();

    const [apList, setApList] = useState([]);
    const apCollectionRef = collection(db,"Appointments");
    let q1;
    if(localStorage.getItem("type")=="1"){
      q1=query(apCollectionRef, where("State","==",{id}.id), where("Practitioner","==",localStorage.getItem("uid")),orderBy("Date"),orderBy("Slot"));
    }else{
      q1=query(apCollectionRef, where("State","==",{id}.id),where("Practice","==",localStorage.getItem("practice")), 
    where("Speciality","==",localStorage.getItem("speciality")),orderBy("Date"),orderBy("Slot"));

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

      const update = async (id,state) => {
        const docRef=doc(db,"Appointments",id);
        await updateDoc(docRef,{State:state});
        window.location.reload();
      }

      let tab;

      if({id}.id=="3"){
        tab=(
            <ul class="nav nav-tabs">
            <li role="presentation" class="active"><a href="/Appointments/3">Received</a></li>
            <li role="presentation"><a href="/Appointments/1">Past</a></li>
            </ul>
          );
      }else{
        tab=(
            <ul class="nav nav-tabs">
            <li role="presentation"><a href="/Appointments/3">Received</a></li>
            <li role="presentation" class="active"><a href="/Appointments/1">Past</a></li>
            </ul>
          )
      }

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
                                <li><a href="/Dashboard">Dashboard </a></li>
                                <li class="active"><a href="/Appointments/3">Appointments<span class="sr-only">(current)</span></a></li>
                                <li><a href="/Test/0">Tests</a></li>
                            </ul>
                        </div>
                        <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
                            <ol class="breadcrumb">
                                <li class="active">Appointments</li>
                            </ol>
                            {tab}

                            <div class="table-responsive">
                                <table class="table table-hover">
                                    <thead>
                                        <tr>
                                        <th>Patient</th>
                                        <th>Doctor</th>
                                        <th>Complaint</th>
                                        <th>Date</th>
                                        <th>Options</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {apList.map((ap) =>(
                                     <tr>
                                        <td>{ap.PatientName}</td>
                                        <td>{ap.PractitionerName}</td>
                                        <td>{ap.Complaint}</td>
                                        <td>{ap.Date+" "+ap.Slot}</td>
                                        <td><a href={"/ApDetails/"+ap.id}>Details</a>
                                        {ap.State=="3"?
                                        (<span><button class="btn btn-default" style={{marginLeft:"10px"}} onClick={() => update(ap.id,"2")}>Accept</button>
                                        <button class="btn btn-default" style={{marginLeft:"10px"}} onClick={() => update(ap.id,"0")}>Reject</button>

                                        </span>)
                                        :(<></>)}</td>
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