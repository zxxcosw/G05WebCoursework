import React from 'react'
import BackNav from "../../components/BackNav";
import{auth,db} from "../../config/firebase"
import {createUserWithEmailAndPassword} from 'firebase/auth'
import {useState,useEffect} from 'react';
import { doc, setDoc,getDocs,getDoc,collection,query, where,orderBy} from "firebase/firestore"; 

const CreateAccount=()=>{
    const [practitioners, setPractitioners] =useState([]);
    const [practice, setPractice] = useState({});
    
    const pCollectionRef = collection(db,"Practitioners");
    const q=query(pCollectionRef,where("Practice","==",localStorage.getItem("practice")),orderBy("Type"));
    const [wrong,setWrong] = useState("hidden");

    useEffect(() =>{
        const getpList = async () =>{
          try{
            const data =await getDocs(q);
            const filteredData=data.docs.map((doc)=>({...doc.data(),id:doc.id,}));
            const docRef=doc(db,"Practices",localStorage.getItem("practice"));
            const docSnap = await getDoc(docRef);
            setPractitioners(filteredData);
            setPractice(docSnap.data());
            
          } catch(err){
            console.error(err);
          }
    };
  
        getpList();
    },[]);

    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        name:"",
        speciality:"",
        type:""
      });

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      };
    
    const Regist= async () =>{
        try{
           if(inputs.speciality!=""&&inputs.type!=""&&inputs.name!=""){
                await createUserWithEmailAndPassword(auth,inputs.email, inputs.password);
                let type;
                if(inputs.type=="Doctor"){
                    type="1"
                }
             else{
                    type="2"
                }
                await setDoc(doc(db,"Practitioners",auth.currentUser.uid),{Email:inputs.email, Name:inputs.name, 
                Practice:localStorage.getItem("practice"),Speciality:inputs.speciality, Type:type});
                window.location.reload();            
           }else{
            setWrong("visible");
           }

        
        }catch(err){
            console.error(err);
            setWrong("visible");
        }


    };

    

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
                              <li><a href="/Admin/0">Patients</a></li>
                              <li class="active"><a href="/CreateAccount">Practitioners<span class="sr-only">(current)</span></a></li>
                          </ul>
                      </div>
                      <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
                          <ol class="breadcrumb">
                              <li class="active">Practitioner accounts</li>
                          </ol>
                          <div class="form-horizontal">
                            <div class="form-group">
                                <label for="inputName" class="col-sm-1 control-label">Name</label>
                                <div class="col-sm-9">
                                <input class="form-control" placeholder="Name" name="name" onChange={handleChange}/>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="inputSpeciality" class="col-sm-1 control-label">Speciality</label>
                                <div class="col-sm-9">
                                <select class="form-control" name="speciality" onChange={handleChange} >
                                <option></option>
                                {practice.Specialities?.map((item,index)=>(<option>{item}</option>))}
                                

                                </select>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="inputIdentity" class="col-sm-1 control-label">Identity</label>
                                <div class="col-sm-9">
                                <select class="form-control" name="type" onChange={handleChange} >
                                <option></option>
                                <option>Doctor</option>
                                <option>Nurse</option>
                                </select>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="inputEmail" class="col-sm-1 control-label">Email</label>
                                <div class="col-sm-9">
                                <input class="form-control" placeholder="Email" name="email" onChange={handleChange}/>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="inputPassword" class="col-sm-1 control-label">Password</label>
                                <div class="col-sm-9">
                                <input class="form-control" placeholder="Password" name="password" onChange={handleChange}/>
                                </div>
                            </div>

                            <span style={{width:"100px", display: "inline-block"}}></span>
                            <div class="form-group">
                            <div class="col-md-offset-1 col-sm-9">
                            <button onClick={Regist}>Create account</button>
                            </div>
                            </div>

                            <div class="form-group">
                            <div class="col-md-offset-1 col-sm-9">
                            <div class="alert alert-danger" role="alert" style={{visibility:wrong}}>All inputs should not be null!</div>
                            </div>
                            </div>

                          </div>

                          <div class="table-responsive">
                                <table class="table table-hover">
                                    <thead>
                                        <tr>
                                        <th>Practitioner name</th>
                                        <th>Speciality</th>
                                        <th>Identity</th>
                                        
                                        
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {practitioners.map((p) =>(
                                     <tr>
                                        <td>{p.Name}</td>
                                        <td>{p.Speciality}</td>
                                        <td>{p.Type=="1"?(<>Doctor</>):(<>{p.Type=="0"?(<>Admin</>):(<>Nurse</>)}</>)}</td>
                                    
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
export default CreateAccount