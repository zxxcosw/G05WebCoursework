import React,{useState,useEffect } from 'react'
import BackNav from "../../components/BackNav";
import {useParams} from 'react-router-dom';
import {db} from "../../config/firebase";
import {getDocs,collection,query, where, doc, updateDoc} from "firebase/firestore";

const Admin=()=>{
    let {id}=useParams();
    const [patients, setPatients] = useState([]);
    const pCollectionRef = collection(db,"Patients");
    const q=query(pCollectionRef,where("Approval","==",{id}.id),where("PracticeRegistered","==",localStorage.getItem("practice")));

    useEffect(() =>{
        const getpList = async () =>{
          try{
            const data =await getDocs(q);
            const filteredData=data.docs.map((doc)=>({...doc.data(),id:doc.id,}));
            setPatients(filteredData);
            
          } catch(err){
            console.error(err);
          }
    };
  
        getpList();
    },[]);

    const update = async (id,result) => {
        const docRef=doc(db,"Patients",id);
        await updateDoc(docRef,{Approval:result});
        window.location.reload();
      }
    

    let tab;
    if({id}.id=="0"){
        tab=(<ul class="nav nav-tabs">
        <li role="presentation" class="active"><a href="/Admin/0">Application</a></li>
        <li role="presentation"><a href="/Admin/1">Registered patients</a></li>
        </ul>)

    }else{
        tab=(<ul class="nav nav-tabs">
        <li role="presentation"><a href="/Admin/0">Application</a></li>
        <li role="presentation" class="active"><a href="/Admin/1">Registered patients</a></li>
        </ul>)

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
                              <li class="active"><a href="/Admin/0">Patients<span class="sr-only">(current)</span></a></li>
                              <li><a href="/CreateAccount">Practitioners</a></li>
                          </ul>
                      </div>
                      <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
                          <ol class="breadcrumb">
                              <li class="active">Patient accounts</li>
                          </ol>
                          {tab}

                          <div class="table-responsive">
                                <table class="table table-hover">
                                    <thead>
                                        <tr>
                                        <th>Patient name</th>
                                        <th>Address</th>
                                        {{id}.id=="0"?(<th>Options</th>):(<></>)}
                                        
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {patients.map((p) =>(
                                     <tr>
                                        <td>{p.Name}</td>
                                        <td>{p.Address}</td>
                                        {{id}.id=="0"?
                                        (<span><button class="btn btn-default" style={{marginLeft:"10px"}} onClick={() => update(p.id,"1")}>Approve</button>
                                        <button class="btn btn-default" style={{marginLeft:"10px"}} onClick={() => update(p.id,"2")}>Reject</button>
                                        </span>)
                                        :(<></>)}

                                    </tr>
                                    ))} 

                                    </tbody>
                                </table>
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
export default Admin