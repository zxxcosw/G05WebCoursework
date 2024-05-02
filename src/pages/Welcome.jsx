import React from 'react'
import {Link} from 'react-router-dom'; 
const Welcome=()=>{

    return(
        <div>
            <h1 class="text-center">Welcome to Health Network!</h1> 
            <p class="text-center" ><Link to="/Login/1">Login as a patient.</Link></p>
            <p class="text-center" ><Link to="/Login/2">Login as a practitioner.</Link></p>
        </div>
    )
}

export default Welcome