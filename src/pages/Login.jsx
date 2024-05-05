import React from 'react'
import{auth,db} from "../config/firebase"
import {signInWithEmailAndPassword } from 'firebase/auth'
import {useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom'; 
import {getDoc,doc} from "firebase/firestore";

const Login = () => {
  let {id}=useParams();

    const [inputs, setInputs] = useState({
        email: "",
        password: ""
        
      });


      const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      };

      const navigate = useNavigate();

      const login= async () =>{
        try{
        await signInWithEmailAndPassword (auth,inputs.email, inputs.password);

        if({id}.id==1){
          localStorage.setItem("pid",auth.currentUser.uid)
          const docRef=doc(db,"Patients",auth.currentUser.uid);
          const docSnap = await getDoc(docRef);
          localStorage.setItem("practiceRegistered",docSnap.data().PracticeRegistered);
          localStorage.setItem("patient",docSnap.data().Name);
          localStorage.setItem("approval",docSnap.data().Approval);
          navigate("/Home");

        }else{
        localStorage.setItem("uid",auth.currentUser.uid)
        const docRef=doc(db,"Practitioners",auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        localStorage.setItem("practice",docSnap.data().Practice);
        localStorage.setItem("isLogin",docSnap.data().Name);
        localStorage.setItem("type", docSnap.data().Type);
        localStorage.setItem("speciality", docSnap.data().Speciality);

        if(docSnap.data().Type=="0"){
          navigate("/Admin/0");
        }else{
          navigate("/Dashboard");
        }
        
        }

        }catch(err){
            console.error(err);
        }
    };

    return(
        <div class="container">

          <h1 class="text-center">Health network</h1>

          <div class="form-signin">
          <label for="inputEmail" class="sr-only">Email address</label>
          <input class="form-control" placeholder="Email..." name="email" onChange={handleChange}/>
          <label for="inputPassword" class="sr-only">Password</label>
          <input class="form-control" placeholder="Password..." name="password" onChange={handleChange}/>          
          <button style={{marginTop:"10px"}} class="btn btn-lg btn-primary btn-block" onClick={login}>Login</button>
          {{id}.id==1 ?(<Link to="/Register">Register for an account</Link>):(<></>)}
          </div>
          
        </div>
    )
}

export default Login