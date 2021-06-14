import React from "react";

function LoginInputForm(props){
    return(
        <div>
            <div className="col-md-4" style={{"padding" : "1rem"}}>
                <label htmlFor="validationCustom01" className="form-label">Enter you {props.role} ID</label>
                <input type="email" placeholder="example@domain.com" className="form-control" id="validationCustom01" value={props.email} required 
                    onChange={e => props.setEmail(e.target.value)} />
                <div className="valid-feedback">
                    Looks good!
                </div>
            </div>
                <div className="col-md-4" style={{"padding" : "1rem"}}>
                    <label htmlFor="validationCustom02" className="form-label">Enter your Password</label>
                    <input type="password" className="form-control" id="validationCustom02" value={props.password} required 
                        onChange={e => props.setPassword(e.target.value)}
                    />
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                </div>
        </div>
    );
}

export default LoginInputForm;