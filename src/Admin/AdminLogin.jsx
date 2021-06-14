import React, {useState, useContext} from "react";
import { useHistory } from "react-router";
import LoginInputForm from "../Components/LoginInputForm";
import {Container,Row,Col} from "reactstrap";
import axios from "axios";
import {AdminContext} from "./AdminContext";


function AdminLogin(){
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [admin, setAdmin] = useContext(AdminContext);
    const [error, setError] = useState('');

    const handleLogin = (e) => {
       
        if(email==='' || password===''){

            if(email===''){
                setError("Email ID cannot be empty!");
            }else if(password===''){
                setError("Password cannot be empty");
            }else{
                setError("Feilds are Empty")
            }
            e.stopPropagation();
        }else{
            axios.get(`http://localhost:8080/adminLogin/${email}/${password}`)
            .then((response) => {
                setAdmin(response.data);
                setError('');
                history.push("/adminDashboard");
            }).catch(err => {
                console.log(err);
                setError(err.response.data);
            });
        }
    }

    return(
        <div style={{padding: "2rem"}}>
                    <center>
                        <h4 className="display-5">Admin Login</h4>
                        <div style={{"width" : "80%", "paddingTop" : "2rem"}}>
                        <form className="row g-3 needs-validation" style={{"justifyContent" : "left"}} noValidate>
                            <LoginInputForm
                                role="Admin"
                                email={email}
                                password={password}
                                setEmail={setEmail}
                                setPassword={setPassword}
                            />
                        </form>
                        <div className="col-12">
                            <button className="btn btn-primary" type="submit" onClick={handleLogin}>Login</button>
                        </div>
                        </div>
                        <div style={{paddingTop:"1rem"}}>
                            {
                                error === '' ? <div></div> : <div class="alert alert-danger" role="alert" style={{width: 600}}>
                                    {error}
                                </div>
                            }
                        </div>
                    </center>
            
        </div>
    );

}

export default AdminLogin;