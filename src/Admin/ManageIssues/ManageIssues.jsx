import React,{useEffect, useState} from "react";
import { Button , Form, Input} from "reactstrap";
import axios from "axios";
import IssueRecordForMember from "./IssueRecordForMember";

function ManageIssues(){
    const [memberMailId,setMemberMailId]=useState('');
    const [issueHistory,setIssueHistory]=useState([]);
    const [error,setError]=useState('');

    useEffect(() => {
        if(memberMailId!==''){
            axios.get(`http://localhost:8080/admin/viewMemberIssueHistory/${memberMailId}`)
            .then(res => {
                setIssueHistory(res.data);
                if(res.data.length===0){
                    setError('No issues found for member :'+ memberMailId+'!');
                }else{
                    setError('');
                }
            }).catch(err => {
                console.log(err);
                setError(err.response.data);
                setIssueHistory([]);
            });
        }
        
        },[issueHistory]);

    const getIssueHistory=(e)=>{
    e.preventDefault();    
        if(memberMailId===''){
            alert('Member email-id cannot be null !');
        }else{
            axios.get(`http://localhost:8080/admin/viewMemberIssueHistory/${memberMailId}`)
            .then(res => {
                setIssueHistory(res.data);
                if(res.data.length===0){
                    setError('No issues found for member :'+ memberMailId+'!');
                }else{
                    setError('');
                }
            }).catch(err => {
                console.log(err);
                setError(err.response.data);
                setIssueHistory([]);
            });
        }
    }

    return(
        <div>
            <h3 className="m-3 text-center">Manage Issues</h3><br/>
            <center>
                <Form className="m-3 ">
                    <Input type="email" className="m-2" style={{width: 300}} value={memberMailId} id="memberMailId" placeholder="Enter Member Email-id" className="form-control" 
                        onChange={ (e) => {setMemberMailId(e.target.value)}} />
                    <Button type="Submit" outline color="primary" className="btn m-2" 
                        onClick={ getIssueHistory }>Search for Issue History</Button>    
                </Form>
            </center>
            <hr/>
            <center>
                {

                    issueHistory.map( (issueRecord) =>
                        <IssueRecordForMember issue={issueRecord} key={issueRecord.issueId}/>
                    )
                }
            </center>
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

export default ManageIssues