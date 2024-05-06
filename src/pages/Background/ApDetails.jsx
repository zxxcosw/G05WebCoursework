import React from 'react'
import {useParams,useNavigate} from 'react-router-dom';
import {getDoc,doc, getDocs,collection, query, where,updateDoc} from "firebase/firestore";
import{db} from "../../config/firebase"
import {useState,useEffect} from 'react';
import BackNav from "../../components/BackNav";

const ApDetails = () => {

    let {id}=useParams();
    
    const [ap, setAp]=useState({ap:{},patient:{}});
    const [practices, setPractices] = useState([]);
    const [practice,setPractice]=useState({Specialities:[]});
    const [Doctors, setDoctors]=useState([]);
    const [tests, setTests]=useState([]);
    const navigate = useNavigate();

    const [wrong,setWrong]=useState("hidden");
  
    useEffect(() =>{
        const getAp = async () =>{
          try{
            const docRef=doc(db,"Appointments",{id}.id);
            const docSnap = await getDoc(docRef);

            const docPRef=doc(db,"Patients",docSnap.data().Patient);
            const docPSnap=await getDoc(docPRef);

            const pCollectionRef = collection(db,"Practices");
            const data =await getDocs(pCollectionRef);
            const filteredData=data.docs.map((doc)=>({...doc.data(),id:doc.id,}));

            const tCollectionRef = collection(db,"Tests");
            const q=query(tCollectionRef,where("Appointment","==",{id}.id));
            const Tdata =await getDocs(q);
            const TfilteredData=Tdata.docs.map((doc)=>({...doc.data(),id:doc.id,}));
            
            setAp({...ap, ap:docSnap.data(),patient:docPSnap.data() })
            setPractices(filteredData);
            setTests(TfilteredData);

          } catch(err){
            console.error(err);
          }
    }; 
        getAp();
        
    },[]);

    const [inputs, setInputs] = useState({
      practice:"",
      speciality:"",
      doctor:""
    });

    useEffect(()=>{
      const getSandD=async()=>{
        try{
          if(inputs.practice!=""){
            const docRef=doc(db,"Practices",inputs.practice);
            const docSnap = await getDoc(docRef);
            setPractice(docSnap.data());
            }
          if(inputs.practice!=""&&inputs.speciality!=""){
              const pCollectionRef = collection(db,"Practitioners");
              const q=query(pCollectionRef,where("Practice","==",inputs.practice),where("Type","==","1"),where("Speciality","==",inputs.speciality));
              const data =await getDocs(q);
              const filteredData=data.docs.map((doc)=>({...doc.data(),id:doc.id,}));
              setDoctors(filteredData);
              }
        
      
        }catch(e){
          console.error(e);
        }
      }
      getSandD();

    },[inputs])



    const handleChange = (e) => {
      setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      if(inputs.practice==""){
        setPractice({Specialities:[]});
        setDoctors([]);
      }
      if(inputs.Specialities==""){
        setDoctors([]);

      }

    };

    const alter = async () => {
      try{
      const docRef=doc(db,"Appointments",{id}.id);
      const PdocRef=doc(db,"Practitioners",inputs.doctor);
      const docSnap = await getDoc(PdocRef);
      await updateDoc(docRef,{Practice:inputs.practice, Speciality:inputs.speciality, Practitioner:inputs.doctor, PractitionerName:docSnap.data().Name});
      navigate("/Appointments/3");
      }
      catch(e){
        console.error(e);
        setWrong("visible");

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
                            <li><a href="/Dashboard">Dashboard </a></li>
                            <li class="active"><a href="/Appointment/3">Appointments<span class="sr-only">(current)</span></a></li>
                            <li><a href="/Test/0">Tests</a></li>
                        </ul>
                    </div>
                    <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
                        <ol class="breadcrumb">
                        <li><a href="/Appointments/3">Appointments</a></li>
                        <li class="active">Appointment details</li>
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
                                </div>
                        </div>

                        {ap.ap.Prescription=="0"?
                        (
                        <div class="panel panel-default">
                            <div class="panel-heading">
                            <h3 class="panel-title">Offer an alternative</h3>
                            </div>
                            <div class="panel-body">
                            
                           

                            <div class="form-group">
                                <label for="inputPractice" class="col-sm-offset-1 col-sm-1 control-label">Practice</label>
                                <div class="col-sm-10">
                                <select class="form-control" name="practice" onChange={handleChange}>
                                <option></option>
                                {practices.map((p)=>(<option>{p.id}</option>))}
                                
                                </select>
                                </div>
                            </div>
                            <span style={{width:"100px", display: "inline-block"}}></span>

                            <div class="form-group">
                                <label for="inputSpeciality" class="col-sm-offset-1 col-sm-1 control-label">Speciality</label>
                                <div class="col-sm-10">
                                <select class="form-control" name="speciality" onChange={handleChange}>
                                <option></option>
                                {practice.Specialities.map((item,index)=>(<option>{item}</option>))}
                                </select>
                                </div>
                            </div>
                            <span style={{width:"100px", display: "inline-block"}}></span>

                            <div class="form-group">
                                <label for="inputDoctor" class="col-sm-offset-1 col-sm-1 control-label">Doctor</label>
                                <div class="col-sm-10">
                                <select class="form-control" name="doctor" onChange={handleChange}>
                                <option></option>
                                {Doctors.map((d)=>(<option value={d.id}>{d.Name}</option>))}
                                
                                </select>
                                </div>
                            </div>

                            <span style={{width:"100px", display: "inline-block"}}></span>
                            <div class="form-group">
                            <div class="col-md-offset-1 col-sm-9">
                            <button onClick={alter}>Speciality refer</button>
                            </div>
                            </div>

                            <div class="form-group">
                            <div class="col-md-offset-1 col-sm-9">
                            <div class="alert alert-danger" role="alert" style={{visibility:wrong}}>All inputs should not be null!</div>
                            </div>
                            </div>

                            </div>
                        </div>
                        )
                        :(
                        <>
                        <div class="panel panel-default">
                            <div class="panel-body">
                                <dl class="dl-horizontal">
                                    <dt>Prescription</dt>
                                    <dd>{ap.ap.Prescription}</dd>
  
                                </dl>
                            </div>
                        </div>
                        <div class="panel panel-default">
                            <div class="panel-heading">
                            <h3 class="panel-title">Ordered tests</h3>
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

export default ApDetails