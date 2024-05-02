import React from 'react'
import BackNav from "../../components/BackNav";

const Profile = () => {

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
                                <li class="active">Profile</li>
                            </ol>
                            <div class="panel panel-default">
                                <div class="panel-body">
                                <dl class="dl-horizontal">
                                    <dt>Name</dt>
                                    <dd>{localStorage.getItem("isLogin")}</dd>
                                    <dt>Practice</dt>
                                    <dd>{localStorage.getItem("practice")}</dd>
                                    <dt>Identity</dt>
                                    <dd>{localStorage.getItem("type")=="1"?(<>Doctor</>):(<>{localStorage.getItem("type")=="0"?(<>Admin</>):(<>Nurse</>)}</>)}</dd>                                  
                                    {localStorage.getItem("type")=="0"?(<></>):
                                    (<><dt>Speciality</dt>
                                    <dd>{localStorage.getItem("speciality")}</dd></>)}
                                    
                                    
                                </dl>
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

export default Profile