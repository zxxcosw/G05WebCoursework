import React from 'react'
import{db} from "../config/firebase"
import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import ApprovedPatientNav from '../components/ApprovedPatientNav';
import { doc, addDoc,getDoc, getDocs,collection,query, where} from "firebase/firestore"; 
import moment from 'moment';

const CreateAp = () => {

    const [practice,setPractice]=useState({Specialities:[]});
    const [Doctors, setDoctors]=useState([]);
    const [slots, setSlots]=useState([]);
    const [day,setDay]=useState("");
    const navigate = useNavigate();
    const [wrong,setWrong]=useState("hidden");

    
    let days=[];
    for(let i=1;i<=7;i++){
      days.push(moment().add('days',i).format('YYYY-MM-DD'));
    }


    useEffect(() =>{
        const getAp = async () =>{
          try{
            const docRef=doc(db,"Practices",localStorage.getItem("practiceRegistered"));
            const docSnap = await getDoc(docRef);
            setPractice(docSnap.data());
          } catch(err){
            console.error(err);
          }
    }; 
        getAp();
        
    },[]);

    const [inputs, setInputs] = useState({
        complaint: "",
        
        doctor:"",
        speciality:"",
        slot:""
      });
    
      useEffect(()=>{
        const getSandD=async()=>{
          try{
            if(inputs.speciality!=""){
                const pCollectionRef = collection(db,"Practitioners");
                const q=query(pCollectionRef,where("Practice","==",localStorage.getItem("practiceRegistered")),where("Type","==","1"),where("Speciality","==",inputs.speciality));
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

      useEffect(()=>{
        const getS=async()=>{
          try{
            if(inputs.doctor!=""&&day!=""){
                const aCollectionRef = collection(db,"Appointments");
                const q=query(aCollectionRef,where("Practitioner","==",inputs.doctor),where("State","==","3"),where("Date","==",day));
                const data =await getDocs(q);
                const filteredData=data.docs.map((doc)=>({...doc.data(),id:doc.id,}));

                const q1=query(aCollectionRef,where("Practitioner","==",inputs.doctor),where("State","==","2"),where("Date","==",day));
                const data1 =await getDocs(q1);
                const filteredData1=data1.docs.map((doc)=>({...doc.data(),id:doc.id,}));

                let unavailableSlot=[];
                filteredData.map((a)=>{
                  unavailableSlot.push(a.Slot);
                });

                filteredData1.map((a)=>{
                  unavailableSlot.push(a.Slot);
                });
              
                let availableSlots=[];
                if(!unavailableSlot.includes("09:00")){
                  availableSlots.push("09:00");
                }

                if(!unavailableSlot.includes("10:00")){
                  availableSlots.push("10:00");
                }

                if(!unavailableSlot.includes("11:00")){
                  availableSlots.push("11:00");
                }

                if(!unavailableSlot.includes("14:00")){
                  availableSlots.push("14:00");
                }

                if(!unavailableSlot.includes("15:00")){
                  availableSlots.push("15:00");
                }

                if(!unavailableSlot.includes("16:00")){
                  availableSlots.push("16:00");
                }

                setSlots(availableSlots);  
                          
            }
          
        
          }catch(e){
            console.error(e);
          }
        }
        getS();
  
      },[day])

      

      const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        if(inputs.Specialities==""){
          setDoctors([]);
          setSlots([]);
  
        }
        if(inputs.doctor==""||inputs.date==""){
          setSlots([]);
        }
       
      };

      const apply =async()=>{
        try{
          if(inputs.complaint!=""&&inputs.slot!=""){
            const PdocRef=doc(db,"Practitioners",inputs.doctor);
            const docSnap = await getDoc(PdocRef);
            await addDoc(collection(db,"Appointments"),{Complaint:inputs.complaint, Date:day, Patient:localStorage.getItem("pid"),
            PatientName:localStorage.getItem("patient"), Practice:localStorage.getItem("practiceRegistered"), Practitioner:inputs.doctor, PractitionerName:docSnap.data().Name,
            Prescription:"0", Slot:inputs.slot, Speciality:inputs.speciality, State:"3"});
            navigate("/MyAppointments/3")           
          }else{
            setWrong("visible")

          }

          }catch(e){
            console.error(e);
            setWrong("visible")
          }

      };


    const ApForm=(
    <div>

      <h1 class="text-center">Booking appointment</h1>
      
        <div class="form-horizontal">


            <span style={{width:"100px", display: "inline-block"}}></span>

            <div class="form-group">
                                <label for="inputSpeciality" class="col-sm-2 control-label">Speciality</label>
                                <div class="col-sm-9">
                                <select class="form-control" name="speciality" onChange={handleChange}>
                                <option></option>
                                {practice.Specialities.map((item,index)=>(<option>{item}</option>))}
                                </select>
                                </div>
            </div>
            

            <div class="form-group">
                                <label for="inputDoctor" class="col-sm-2 control-label">Doctor</label>
                                <div class="col-sm-9">
                                <select class="form-control" name="doctor" onChange={handleChange}>
                                <option></option>
                                {Doctors.map((d)=>(<option value={d.id}>{d.Name}</option>))}
                                
                                </select>
                                </div>
            </div>

            <div class="form-group">
                <label for="inputName" class="col-sm-2 control-label">Date</label>
                <div class="col-sm-9">
                <select class="form-control" name="date" onChange={(e) => setDay(e.target.value)}>
                  <option></option>
                  {days.map((d)=>(<option value={d}>{d}</option>))}
                                
                </select>
                </div>
            </div>

          
            <div class="form-group">
                <label for="inputName" class="col-sm-2 control-label">Slot</label>
                <div class="col-sm-9">
                <select class="form-control" name="slot" onChange={handleChange}>
                <option></option>
                {slots.map((s)=>(<option value={s}>{s}</option>))}                               
              </select>

               


                </div>
            </div>

           

            <div class="form-group">
                <label for="inputName" class="col-sm-2 control-label">Complaint</label>
                <div class="col-sm-9">
                    <input class="form-control" placeholder="Complaint" name="complaint" onChange={handleChange}/>
                </div>
            </div>

            <div class="form-group">
                            <div class="col-sm-offset-2 col-sm-10">
                            <button onClick={apply}>Apply</button>
                            </div>
            </div>

            <div class="form-group">
                            <div class="col-sm-offset-2 col-sm-10">
                            <div class="alert alert-danger" role="alert" style={{visibility:wrong}}>All inputs should not be null!</div>
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
        content=(<div>
            <ApprovedPatientNav/>
            {ApForm}

        </div>)

    }

    return(
        <div>
            {content}
        </div>
            
    )
}

export default CreateAp