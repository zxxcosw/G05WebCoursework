import React from 'react'
import{auth} from "../config/firebase"
import{signOut} from "firebase/auth";
import {Link,useNavigate} from 'react-router-dom';
import PatientNav from "../components/PatientNav";

const Home = () => {

    let content
    if(localStorage.getItem("patient")==null){
        content= (
        <div>
        <p class="text-center" >Please login first!</p>     
        <p class="text-center"><a href="/Login/1">Login</a></p> 
        </div>)
    }else{
        content=(<div>
            <PatientNav/>
        </div>)

    }


    return(
        <div>
            {content}
        </div>
            
    )
}

export default Home