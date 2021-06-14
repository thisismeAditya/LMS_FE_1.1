import React, { useState } from "react";
import LoginInputForm from "../Components/LoginInputForm";
import axios from "axios";
import { useHistory } from "react-router";
import { UserProvider } from "../UserContext";


function MemberLogin(){
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [memberDetails, setMemberDetails] = useState({});
    const [error, setError] = useState('');
    const [memberName, setMemberName] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

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
      
            axios.get(`http://localhost:8080/memberSignIn/${email}/${password}`)
            .then(res => {
              setMemberDetails(res.data);
              setError('');
              setMemberName(memberDetails.memberName);
              history.push({
                  pathname : "/memberLandingPage",
                  state : {email : email }
              });
            }).catch(err => setError(err.response.data))
      
          }
    };

    return(
        <div style={{padding: "2rem"}}>
            <center>
                <h1 className="display-5">Members Login</h1>
                <div style={{"width" : "80%", "paddingTop" : "2rem"}}>
                <form className="row g-3 needs-validation" style={{"justifyContent" : "center"}} noValidate>
                    <LoginInputForm
                        role="Member"
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
                        error === '' ? <div></div> : <div class="alert alert-danger" role="alert" style={{width: "50%"}}>
                            {error}
                        </div>
                    }
                </div>
                <div style={{paddingTop : "5rem"}}>
                    <div class="alert alert-warning" role="alert" style={{width : "50%"}}>
                        You cannot <b>Sign Up</b> here. Please Contact library Admin for your registration.
                    </div>
                </div>
            </center>
        </div>
    );
}

export default MemberLogin;