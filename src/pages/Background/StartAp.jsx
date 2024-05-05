import React from 'react'
import {useParams,useNavigate} from 'react-router-dom';
import {getDoc,doc,updateDoc,setDoc,getDocs,collection,query, where,addDoc, orderBy} from "firebase/firestore";
import{db} from "../../config/firebase"
import {useState,useEffect} from 'react';
import BackNav from "../../components/BackNav";
import moment from 'moment';

const StartAp = () => {

    let {id}=useParams();

    const [prescription,setPrescription]=useState();
    const [tests, setTests]=useState([]);
    const [test, setTest]=useState("");
    const [newTest,setNewTest]=useState("");

    const update = async () => {
        const docRef=doc(db,"Appointments",{id}.id);
        await updateDoc(docRef,{Prescription:prescription,State:"1"});
        navigate("/Dashboard")

      }

    const [ap, setAp]=useState({ap:{},patient:{}});
    useEffect(() =>{
        const getAp = async () =>{
          try{
            const docRef=doc(db,"Appointments",{id}.id);
            const docSnap = await getDoc(docRef);
            const docPRef=doc(db,"Patients",docSnap.data().Patient);
            const docPSnap=await getDoc(docPRef);
            setAp({...ap, ap:docSnap.data(),patient:docPSnap.data() })
          } catch(err){
            console.error(err);
          }
    };
  
        getAp();
    },[]);

    const addTest = async()=>{
      try{
        await addDoc(collection(db,"Tests"),{Appointment:{id}.id, Content:test, Patient:ap.ap.Patient, PatientName:ap.ap.PatientName,
      Practice:ap.ap.Practice, Practitioner:localStorage.getItem("uid"),Speciality:ap.ap.Speciality, PractitionerName:localStorage.getItem("isLogin"),
    Result:"0",State:"0", Date:moment().format('YYYY-MM-DD')});
      setNewTest(test);

      }catch(e){
        console.error(e);

      }
    }

    useEffect(() =>{
      const getTests=async()=>{
        try{
          const tCollectionRef = collection(db,"Tests");
          const q=query(tCollectionRef,where("Appointment","==",{id}.id));
          const data =await getDocs(q);
          const filteredData=data.docs.map((doc)=>({...doc.data(),id:doc.id,}));
          setTests(filteredData);

        }catch(e){
          console.error(e);
        }


      };

      getTests();

    },[newTest])

      const navigate = useNavigate();

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
                                <li class="active"><a href="/Dashboard">Dashboard<span class="sr-only">(current)</span></a></li>
                                <li><a href="/Appointments/3">Appointments</a></li>
                                <li><a href="/Test/0">Tests</a></li>
                            </ul>
                        </div>
                        <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
                            <ol class="breadcrumb">
                            <li><a href="/Dashboard">Dashboard</a></li>
                            <li class="active">Start appointment</li>
                            </ol>

                            <div class="panel panel-default">
                                <div class="panel-body">
                                <dl class="dl-horizontal">
                                    <dt>Patient</dt>
                                    <dd>{ap.ap.PatientName}</dd>
                                    <dt>Medical History</dt>
                                    <dd>{ap.patient.MedicalHistory?.map((item,index)=>(item+" " ))}</dd>
                                    <dt>Complaint</dt>
                                    <dd>{ap.ap.Complaint}</dd>  
                                </dl>

                                <a class="btn btn-default" href={"/UpdateMH/"+{id}.id}>Update Medical History</a>
                                </div>
                            </div>

                            <div class="form-group">
                                <label >Prescription</label>
                                <textarea class="form-control" rows="3" placeholder="Text input" onChange={(e) => setPrescription(e.target.value)}>
                                </textarea>
                            </div>



                            <div class="panel panel-default">
                            <div class="panel-heading">
                            <h3 class="panel-title">Order tests</h3>
                            </div>
                            <div class="panel-body">
                              <div class="form-inline">
                              <div class="form-group">
                              <input class="form-control" placeholder="Test content" name="test" onChange={(e) => setTest(e.target.value)}></input>
                              </div>
                              <button onClick={addTest} class="btn btn-default">Order test</button>
                              </div>

                              <span style={{width:"100px", display: "inline-block"}}></span>

                              <div class="table-responsive">
                                <table class="table table-hover">
                                    <thead>
                                        <tr>
                                        <th>Test content</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {tests.map((t) =>(
                                     <tr>
                                        <td>{t.Content}</td>                                    
                                    </tr>
                                    ))} 

                                    </tbody>
                                </table>
                            </div>

                            </div>
                            </div>



                            <span style={{width:"100px", display: "inline-block"}}></span>

                            <button class="btn btn-default center-block" onClick={() => update()}  >Complete appointment</button>

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

export default StartAp