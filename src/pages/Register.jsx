import React from 'react'
import{auth,db} from "../config/firebase"
import {createUserWithEmailAndPassword} from 'firebase/auth'
import {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom'; 
import { doc, setDoc, getDocs,collection} from "firebase/firestore"; 



const Register = () => {
    const [practices, setPractices] = useState([]);
    const pCollectionRef = collection(db,"Practices");
    const [wrong,setWrong]=useState("hidden");

    useEffect(() =>{
        const getpList = async () =>{
          try{
            const data =await getDocs(pCollectionRef);
            const filteredData=data.docs.map((doc)=>({...doc.data(),id:doc.id,}));
            setPractices(filteredData);
            
          } catch(err){
            console.error(err);
          }
    };
  
        getpList();
    },[]);


    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        conPassword: "",
        name:"",
        practice:"Practice A",
        birth:"",
        address:""
      });

      const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      };

      const navigate = useNavigate();

    const Regist= async () =>{
        if(inputs.conPassword==inputs.password&&inputs.practice!=""){
        try{
        await createUserWithEmailAndPassword(auth,inputs.email, inputs.password);
        await setDoc(doc(db,"Patients",auth.currentUser.uid),{Email:inputs.email, MedicalHistory:[], Name:inputs.name, 
            PracticeRegistered:inputs.practice, Approval:"0", Birth:inputs.birth, Address:inputs.address, NewTest:"0"});
        localStorage.setItem("pid",auth.currentUser.uid);
        localStorage.setItem("practiceRegistered",inputs.practice);
        localStorage.setItem("patient",inputs.name);
        localStorage.setItem("approval","0");
        navigate("/FillMedicalHistory");
        
        }catch(err){
            setWrong("visible")
            console.error(err);
        }
        }else{
            console.log("Password not the same.");
            setWrong("visible");

        }

    };

    return(
        <div class="container">
            <div class="form-horizontal form-signin">
            
            <div class="form-group">
            <label for="inputName" class="col-sm-2 control-label">User Name</label>
            <div class="col-sm-10">
            <input class="form-control" placeholder="Name" name="name" onChange={handleChange}/>
            </div>
            </div>

            <div class="form-group">
            <label for="inputBirth" class="col-sm-2 control-label">Date of birth</label>
            <div class="col-sm-10">
            <input class="form-control" placeholder="dd/mm/yyyy" name="birth" onChange={handleChange}/>
            </div>
            </div>

            <div class="form-group">
            <label for="inputAddress" class="col-sm-2 control-label">Address</label>
            <div class="col-sm-10">
            <input class="form-control" placeholder="Address" name="address" onChange={handleChange}/>
            </div>
            </div>

            <div class="form-group">
            <label for="inputEmail" class="col-sm-2 control-label">Email</label>
            <div class="col-sm-10">
            <input class="form-control" placeholder="Email" name="email" onChange={handleChange}/>
            </div>
            </div>

            <div class="form-group">
            <label for="inputPassword" class="col-sm-2 control-label">Password</label>
            <div class="col-sm-10">
            <input class="form-control" placeholder="Password" name="password" onChange={handleChange}/>
            </div>
            </div>

            <div class="form-group">
            <label for="inputPassword" class="col-sm-2 control-label">Confirm Password</label>
            <div class="col-sm-10">
            <input class="form-control" placeholder="Password" name="conPassword" onChange={handleChange}/>
            </div>
            </div>

            <div class="form-group">
            <label for="inputPractice" class="col-sm-2 control-label">Select a health practice</label>
            <div class="col-sm-10">
            <select class="form-control" name="practice" onChange={handleChange} >
            {practices.map((p)=>(<option>{p.id}</option>))}
            </select>
            </div>
            </div>
            <span style={{width:"100px", display: "inline-block"}}></span>
            <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
            <button class="btn btn-lg btn-primary btn-block" onClick={Regist}>Register</button>
            </div>
            </div>

            <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
            <Link to="/Login">Already have an account? Login here</Link>
            </div>
            </div>

            <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
            <div class="alert alert-danger" role="alert" style={{visibility:wrong}}>All inputs should not be null! Confirm your password again!</div>
            </div>
            </div>

            </div>
        </div>
    );
};

export default Register;