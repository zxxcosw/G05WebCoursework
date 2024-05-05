import React from 'react'
import{db} from "../config/firebase"
import {useState, useEffect} from 'react';
import {Link,useNavigate} from 'react-router-dom';
import PatientNav from "../components/PatientNav";
import { doc, updateDoc, getDoc,collection} from "firebase/firestore"; 

const MedicalHistoryForm = () => {

    const [patient,setPatient]=useState();

    const [Asthma,setAsthma]=useState();
    const [Diabetes,setDiabetes]=useState();
    const [Epilepsy,setEpilepsy]=useState();
    const [Cancer,setCancer]=useState();
    const [RAO,setRAO]=useState();
    const [RBP,setRBP]=useState();
    const [HD,setHD]=useState();
    const [Angina,setAngina]=useState();
    const [HA,setHA]=useState();
    const [HF,setHF]=useState();
    const [AF,setAF]=useState();
    const [CKD,setCKD]=useState();
    const [Schizophrenia,setSchizophrenia]=useState();
    const [Stroke,setStroke]=useState();

    const changeAsthma=()=>{setAsthma(!Asthma)}
    const changeDiabetes=()=>{setDiabetes(!Diabetes)}
    const changeEpilepsy=()=>{setEpilepsy(!Epilepsy)}
    const changeCancer=()=>{setCancer(!Cancer)}
    const changeRAO=()=>{setRAO(!RAO)}
    const changeRBP=()=>{setRBP(!RBP)}
    const changeHD=()=>{setHD(!HD)}
    const changeAngina=()=>{setAngina(!Angina)}
    const changeHA=()=>{setHA(!HA)}
    const changeHF=()=>{setHF(!HF)}
    const changeAF=()=>{setAF(!AF)}
    const changeCKD=()=>{setCKD(!CKD)}
    const changeSchizophrenia=()=>{setSchizophrenia(!Schizophrenia)}
    const changeStroke=()=>{setStroke(!Stroke)}

    useEffect(() =>{
        const getP = async () =>{
          try{
            const docPRef=doc(db,"Patients",localStorage.getItem("pid"));
            const docPSnap=await getDoc(docPRef);
            setPatient(docPSnap.data());
            setAsthma(docPSnap.data().MedicalHistory.includes("Asthma"));
            setCancer(docPSnap.data().MedicalHistory.includes("Cancer"));
            setDiabetes(docPSnap.data().MedicalHistory.includes("Diabetes"));
            setEpilepsy(docPSnap.data().MedicalHistory.includes("Epilepsy"));
            setRAO(docPSnap.data().MedicalHistory.includes("Rheumatoid Arthritis or Osteoporosis"));
            setRBP(docPSnap.data().MedicalHistory.includes("Raised blood pressure"));
            setHD(docPSnap.data().MedicalHistory.includes("Ischaemic heart disease/coronary heart disease"));
            setAngina(docPSnap.data().MedicalHistory.includes("Angina"));
            setHA(docPSnap.data().MedicalHistory.includes("Heart attack"));
            setHF(docPSnap.data().MedicalHistory.includes("Heart failure"));
            setAF(docPSnap.data().MedicalHistory.includes("Atrial fibrillation"));
            setCKD(docPSnap.data().MedicalHistory.includes("Chronic kidney disease"));
            setSchizophrenia(docPSnap.data().MedicalHistory.includes("Schizophrenia"));
            setStroke(docPSnap.data().MedicalHistory.includes("Stroke or mini-strokes"));

          } catch(err){
            console.error(err);
          }
    }; 
        getP();
        
    },[]);

    const navigate = useNavigate();

    const confirm = async() =>{
        const medicalList=[];
        if(Asthma){
            medicalList.push("Asthma");
        }
        if(Cancer){
            medicalList.push("Cancer");
        }
        if(Diabetes){
            medicalList.push("Diabetes");
        }
        if(Epilepsy){
            medicalList.push("Epilepsy");
        }
        if(RAO){
            medicalList.push("Rheumatoid Arthritis or Osteoporosis");
        }
        if(RBP){
            medicalList.push("Raised blood pressure");
        }
        if(HD){
            medicalList.push("Ischaemic heart disease/coronary heart disease");
        }
        if(Angina){
            medicalList.push("Angina");
        }
        if(HA){
            medicalList.push("Heart attack");
        }
        if(HF){
            medicalList.push("Heart failure");
        }
        if(AF){
            medicalList.push("Atrial fibrillation");
        }
        if(CKD){
            medicalList.push("Chronic kidney disease");
        }
        if(Schizophrenia){
            medicalList.push("Schizophrenia");
        }
        if(Stroke){
            medicalList.push("Stroke or mini-strokes"); 
        }
        try{
        const docPRef=doc(db,"Patients",localStorage.getItem("pid"));
        await updateDoc(docPRef,{MedicalHistory:medicalList});
        if(patient.Approval=="1"){
            navigate("/PatientInfo")
        }else{
            navigate("/Home")
        }
        
        }catch(e){
            console.error(e);
        }


        


    }
    return(
        <div class="reservation-w3laits py-5">
        <div class="container py-3 py-md-3">
            <div class="w3-head-all text-center mb-3">
                <h3>Your medical history</h3>
            </div>
            <div class="booking-content clearfix">
                <div class="left-table leftFloat">

                    <table id="myTable" class="table table-bordered">
                        <thead>
                            <tr>
                            <th>Please tick if you in</th>
                            <th>√</th>                           
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td>Asthma (only if using inhalers in the last year)</td>
                            <td><input type="checkbox" name="Asthma" checked={Asthma} key={Number(Asthma)} onChange={changeAsthma}/></td>                           
                            </tr>

                            <tr>
                            <td>Diabetes (with or without insulin)</td>
                            <td><input type="checkbox" name="Diabetes" checked={Diabetes} key={Number(Diabetes)} onChange={changeDiabetes}/></td>
                            </tr>

                            <tr>
                            <td>Epilepsy</td>
                            <td><input type="checkbox" name="Epilepsy" checked={Epilepsy} key={Number(Epilepsy)} onChange={changeEpilepsy} /></td>
                            </tr>

                            <tr>
                            <td>Rheumatoid Arthritis or Osteoporosis</td>
                            <td><input type="checkbox" name="RAO" checked={RAO} key={Number(RAO)} onChange={changeRAO} /></td>
                            </tr>

                            <tr>
                            <td>Raised blood pressure</td>
                            <td><input type="checkbox" name="RBP" checked={RBP} key={Number(RBP)} onChange={changeRBP}/></td>
                            </tr>

                            <tr>
                            <td>Ischaemic heart disease/coronary heart disease</td>
                            <td><input type="checkbox" name="HD" checked={HD} key={Number(HD)} onChange={changeHD}/></td>
                            </tr>

                            <tr>
                            <td>Angina (heart.NOT throat related)</td>
                            <td><input type="checkbox" name="Angina" checked ={Angina} key={Number(Angina)} onChange={changeAngina}/></td>
                            </tr>

                            <tr>
                            <td>Heart attack(myocardial infarction)</td>
                            <td><input type="checkbox" name="HA" checked={HA} key={Number(HA)} onChange={changeHA}/></td>
                            </tr>

                            <tr>
                            <td>Heart failure</td>
                            <td><input type="checkbox" name="HF" checked={HF} key={Number(HF)} onChange={changeHF}/></td>
                            </tr>

                            <tr>
                            <td>Atrial fibrillation (AF)</td>
                            <td><input type="checkbox" name="AF"  checked={AF} key={Number(AF)} onChange={changeAF}/></td>
                            </tr>

                            <tr>
                            <td>Chronic kidney disease</td>
                            <td><input type="checkbox" name="CKD" checked={CKD} key={Number(CKD)} onChange={changeCKD}/></td>
                            </tr>

                            <tr>
                            <td>Schizophrenia</td>
                            <td><input type="checkbox" name="Schizophrenia" checked={Schizophrenia} key={Number(Schizophrenia)} onChange={changeSchizophrenia}/></td>
                            </tr>

                            <tr>
                            <td>Stroke or mini-strokes (TIA's)</td>
                            <td><input type="checkbox" name="Stroke" checked={Stroke} key={Number(Stroke)} onChange={changeStroke}/></td>
                            </tr>

                            <tr>
                            <td>Cancer</td>
                            <td><input type="checkbox" name="Cancer" checked={Cancer} key={Number(Cancer)} onChange={changeCancer}/></td>
                            </tr>
                        </tbody>
                    </table>


                    <div class="form-group">
            
            <button class="btn btn-default center-block" onClick={confirm}>Confirm</button>
            
            </div>

                </div>

    </div>
</div>
</div>
            
    )
}

export default MedicalHistoryForm