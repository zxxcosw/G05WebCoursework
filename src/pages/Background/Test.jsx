import BackNav from "../../components/BackNav";
import {useParams} from 'react-router-dom';
import {db} from "../../config/firebase";
import React, {useState,useEffect } from 'react';
import {getDocs,collection,query, where, doc, updateDoc} from "firebase/firestore";

const Test = () => {
    let {id}=useParams();
    const [tests,setTests]=useState([]);
    const CollectionRef = collection(db,"Tests");
    let q;
    if(localStorage.getItem("type")=="1"){
      q=query(CollectionRef, where("State","==",{id}.id), where("Practitioner","==",localStorage.getItem("uid")));
    }else{
      q=query(CollectionRef, where("State","==",{id}.id),where("Practice","==",localStorage.getItem("practice")), 
    where("Speciality","==",localStorage.getItem("speciality")));

    }

    useEffect(() =>{
        const getTList = async () =>{
          try{
            const data =await getDocs(q);
            const filteredData=data.docs.map((doc)=>({...doc.data(),id:doc.id,}));
            setTests(filteredData);
          } catch(err){
            console.error(err);
          }
    };
  
        getTList();
    },[]);

    const updateState= async(id)=>{
        try{
            const docRef=doc(db,"Tests",id);
            await updateDoc(docRef,{State:"1"});
            window.location.reload();


        }catch(e){
            console.error(e);
        }

    }

    let tab;

    if({id}.id=="0"){
      tab=(
          <ul class="nav nav-tabs">
          <li role="presentation" class="active"><a href="/Test/0">Upcoming</a></li>
          <li role="presentation"><a href="/Test/1">Waiting for result</a></li>
          <li role="presentation"><a href="/Test/2">Past</a></li>
          </ul>
        );
    }else if({id}.id=="1"){
      tab=(
        <ul class="nav nav-tabs">
        <li role="presentation"><a href="/Test/0">Upcoming</a></li>
        <li role="presentation" class="active"><a href="/Test/1">Waiting for result</a></li>
        <li role="presentation"><a href="/Test/2">Past</a></li>
        </ul>
        )
    }else{
        tab=(
            <ul class="nav nav-tabs">
            <li role="presentation"><a href="/Test/0">Upcoming</a></li>
            <li role="presentation"><a href="/Test/1">Waiting for result</a></li>
            <li role="presentation" class="active"><a href="/Test/2">Past</a></li>
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
                                <li><a href="/Appointments/3">Appointments</a></li>
                                <li class="active"><a href="/Test/0">Tests<span class="sr-only">(current)</span></a></li>
                            </ul>
                        </div>
                        <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
                            <ol class="breadcrumb">
                                <li class="active">Tests</li>
                            </ol>
                            {tab}

                            <div class="table-responsive">
                                <table class="table table-hover">
                                    <thead>
                                        <tr>
                                        <th>Test Content</th>
                                        <th>Patient</th>
                                        <th>Create by</th>
                                        {{id}.id=="2"?(<th>Result</th>):(<th>options</th>)}
                                        
                                        
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {tests.map((t) =>(
                                     <tr>
                                        <td>{t.Content}</td>
                                        <td>{t.PatientName}</td>
                                        <td>{t.PractitionerName}</td>
                                        {{id}.id=="2"?(<td>{t.Result}</td>):
                                        (<>{{id}.id=="1"?(
                                        <td>
                                        <a href={"/TestDetails/"+t.id}>Set result</a>
                                        </td>)
                                        :(<td>
                                            <button class="btn btn-default" onClick={() => updateState(t.id)}>Complete</button>
                                        </td>)}</>)}
                                        
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

export default Test