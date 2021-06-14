import React, { useEffect, useState } from "react";
import RequestForIssue from "./RequestForIssue";
import axios from "axios";

function ManageRequestForIssues(){
    
    const [requestsForIssue,setRequestsForIssue]=useState([]);
    const [error,setError]=useState('');

    useEffect(() => {
        axios.get(`http://localhost:8080/admin/viewAllRequestForIssues`)
            .then(res => {
                setRequestsForIssue(res.data);

                if(res.data.length===0){
                    setError('No Request For Issues to show !');
                }else{
                    setError('');
                }
            }).catch(err => {
                console.log(err);
                setError(err.response.data);
                setRequestsForIssue([]);
            })
        },[requestsForIssue]);
    return(
        <div>
            <h3 className="m-3 text-center">List of Requests For Issue:</h3>
            <div class="row">
                {
                    requestsForIssue.map( (requestForIssue) => 
                        <RequestForIssue item={requestForIssue} />
                        )
                }
            
            </div>
            <center style={{paddingTop:"1rem"}}>
                    {
                        error === '' ? <div></div> : <div class="alert alert-danger" role="alert" style={{width: 600}}>
                            {error}
                        </div>
                    }
            </center>
        </div>
    );
}

export default ManageRequestForIssues