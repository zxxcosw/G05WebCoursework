import React from 'react'
import {useParams,useNavigate} from 'react-router-dom';
import {getDoc,doc, getDocs,collection, query, where,updateDoc} from "firebase/firestore";
import{db} from "../../config/firebase"
import {useState,useEffect} from 'react';
import BackNav from "../../components/BackNav";

const TestDetails = () => {

    let {id}=useParams();
    const [test,setTest]=useState({});
    const [result,setResult]=useState("");
    const navigate = useNavigate();

    useEffect(() =>{
        const getT = async () =>{
          try{
            const docRef=doc(db,"Tests",{id}.id);
            const docSnap = await getDoc(docRef);
            setTest(docSnap.data());

          } catch(err){
            console.error(err);
          }
    };
  
        getT();
    },[]);

    const updateResult=async()=>{
        try{
        const docRef=doc(db,"Tests",{id}.id);
        await updateDoc(docRef,{State:"2", Result:result});
        navigate("/Test/2")

        }catch(e){
            console.error(e);
        }


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
                      {localStorage.getItem("type")=="0"?(
                      <>
                          <li><a href="/Admin/0">Patients</a></li>
                          <li><a href="/CreateAccount">Practitioners</a></li>
                      
                      </>):
                      (<>
                          <li><a href="/Dashboard">Dashboard </a></li>
                          <li><a href="/Appointments/3">Appointments</a></li>
                          <li><a href="/Test/0">Tests</a></li>
                      </>)}
                      </ul>
                      </div>

                      <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
                          <ol class="breadcrumb">
                              <li class="active">Test details</li>
                          </ol>

                          <div class="panel panel-default">
                                <div class="panel-body">
                                <dl class="dl-horizontal">
                                    <dt>Test content</dt>
                                    <dd>{test.Content}</dd>
                                    <dt>Create by</dt>
                                    <dd>{test.PractitionerName}</dd>
                                    <dt>Patient</dt>
                                    <dd>{test.PatientName}</dd>
                                </dl>
                                </div>
                            </div>

                            <div class="panel panel-default">
                                <div class="panel-heading">
                                <h3 class="panel-title">Set result</h3>
                                </div>
                                <div class="panel-body">

                                <div class="form-group">
                                <label class="col-sm-1 control-label">Result</label>
                                <div class="col-sm-9">
                                <input class="form-control" placeholder="Test result" name="result" onChange={(e) => setResult(e.target.value)}/>
                                </div>
                                </div>

                                <div class="form-group">
                                <div class="col-md-offset-1 col-sm-9">
                                <button onClick={updateResult}>Set result</button>
                                </div>
                                </div>

                                </div>
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
export default TestDetails
