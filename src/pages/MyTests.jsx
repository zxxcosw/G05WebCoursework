import {useParams} from 'react-router-dom';
import {db} from "../config/firebase";
import React, {useState,useEffect } from 'react';
import {getDocs,collection,query, where, doc, updateDoc,orderBy} from "firebase/firestore";
import ApprovedPatientNav from "../components/ApprovedPatientNav";

const MyTests = () => {
    let {id}=useParams();
    const [tests,setTests]=useState([]);
    const CollectionRef = collection(db,"Tests");
    const q1=query(CollectionRef, where("State","==",{id}.id), where("Patient","==",localStorage.getItem("pid")),orderBy("Date"));

    useEffect(() =>{
        const getTList = async () =>{
          try{
            const data =await getDocs(q1);
            const filteredData=data.docs.map((doc)=>({...doc.data(),id:doc.id,}));
            setTests(filteredData);

            if({id}.id=="2"){
            const docPRef=doc(db,"Patients",localStorage.getItem("pid"));
            await updateDoc(docPRef,{NewTest:"0"});
            }

          } catch(err){
            console.error(err);
          }
    };
  
        getTList();
    },[]);


    let tab;

    if({id}.id=="0"){
      tab=(
          <ul class="nav nav-tabs">
          <li role="presentation" class="active"><a href="/MyTests/0">Upcoming</a></li>
          <li role="presentation"><a href="/MyTests/1">Waiting for result</a></li>
          <li role="presentation"><a href="/MyTests/2">Result</a></li>
          </ul>
        );
    }else if({id}.id=="1"){
      tab=(
        <ul class="nav nav-tabs">
        <li role="presentation"><a href="/MyTests/0">Upcoming</a></li>
        <li role="presentation" class="active"><a href="/MyTests/1">Waiting for result</a></li>
        <li role="presentation"><a href="/MyTests/2">Result</a></li>
        </ul>
        )
    }else{
        tab=(
            <ul class="nav nav-tabs">
            <li role="presentation"><a href="/MyTests/0">Upcoming</a></li>
            <li role="presentation"><a href="/MyTests/1">Waiting for result</a></li>
            <li role="presentation" class="active"><a href="/MyTests/2">Result</a></li>
            </ul>
            )

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
                        <h1>My tests</h1>
                        <span style={{width:"100px", display: "inline-block"}}></span>

                            {tab}

                            <div class="table-responsive">
                                <table class="table table-hover">
                                    <thead>
                                        <tr>
                                        <th>Test Content</th>
                                        <th>Practice</th>
                                        <th>Created by</th>
                                        <th>Created on</th>
                                        {{id}.id=="2"?(<th>Result</th>):(<></>)}
                                        
                                        
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {tests.map((t) =>(
                                     <tr>
                                        <td>{t.Content}</td>
                                        <td>{t.Practice}</td>
                                        <td>{t.PractitionerName}</td>
                                        <td>{t.Date}</td>
                                        {{id}.id=="2"?(<td>{t.Result}</td>):
                                        (<></>)}
                                        
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

export default MyTests