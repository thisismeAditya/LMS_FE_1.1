import axios from "axios";
import React, { useContext , useState} from "react";
import {AdminContext} from "../AdminContext";

function RequestForIssue({item}){

    const [admin,setAdmin]=useContext(AdminContext);
    const [error, setError]=useState('');

    const confirmIssue=(e)=>{
        e.preventDefault();
      
        axios.post(`http://localhost:8080/admin/confirmRequestForIssue/${item.memberMailId}/${item.bookName}/${item.bookAuthor}/${admin.adminMailId}`)
        .then(response => {
            setError('');
            if(response.data===true){
                alert('Request For Issue Confirmed. '+item.bookName+' is now issued for '+item.memberMailId);
            }
        }).catch(err => {
            console.log(err);
            alert(err.response.data);
        } );
    }

    const deleteRequest=(e)=>{
        e.preventDefault();

        axios.delete(`http://localhost:8080/admin/deleteRequestForIssue/${item.memberMailId}/${item.bookName}/${item.bookAuthor}`)  
            .then(res => {
                if(res===true){
                    alert('Request made by '+item.memberMailId+' removed.');
                }
            }).catch(err => {
                console.log(err);
                alert(err.response.data);
            } );
    }

    return(
        
        <div className="col-sm-3 m-1">
            <div className="card"  style={{width: 250}}>
                <div className="card-body">
                    <h5 className="card-title">Requester Id: {item.memberMailId}</h5>
                    <p className="card-text">Book Name: {item.bookName}</p>
                    <p className="card-text">Book Author: {item.bookAuthor}</p>
                    <a onClick={confirmIssue} className="btn btn-outline-primary m-1" style={{width: 200}}>Confirm Issue</a>
                    <a onClick={deleteRequest} className="btn btn-outline-danger m-1" style={{width: 200}}>Remove Request</a>
                </div>
            </div>

            
            <div style={{paddingTop:"1rem"}}>
                    {
                        error === '' ? <div></div> : <div class="alert alert-danger" role="alert" style={{width: 600}}>
                            {error}
                        </div>
                    }
                </div>
        </div>
    );
}

export default RequestForIssue