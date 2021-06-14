import React,{useContext,useState} from "react";
import {AdminContext} from "../AdminContext";
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from "axios";

function AddMember(){

    const [admin,setAdmin]=useContext(AdminContext);

    const [memberDetails,setMemberDetails]=useState({
        memberMailId:'',
        memberName:'',
        memberPassword:'',
        adminMailId:admin.adminMailId
    });
    const [error,setError]=useState('');
    const [message,setMessage]=useState('');

    const add = () =>{

        if(typeof admin.adminMailId === 'undefined'){
            setError('Admin needs to login first.');
            setMessage('');
        }else{
            if( (memberDetails.memberMailId==='') || (memberDetails.memberName==='') || (memberDetails.memberPassword==='') ){
                setError('Every field must be filled !');
                setMessage('');
            }else{
                console.log(memberDetails);
                axios.post(`http://localhost:8080/admin/memberSignUp`,memberDetails)
                    .then(res => {
                        if(res.data===true){
                        setMessage('New Member: '+memberDetails.memberName+' added successfully !');
                        setError('');
                        setMemberDetails( {memberMailId:'',
                                        memberName:'',
                                        memberPassword:'',
                                        adminMailId:admin.adminMailId
                        });
                        }else{
                            setError('Member Could not be added!');
                            setMessage('');
                            setMemberDetails( {memberMailId:'',
                                            memberName:'',
                                            memberPassword:'',
                                            adminMailId:admin.adminMailId
                            });
                    }
                    }).catch(err => {
                        console.log(err);
                        setError(err.response.data);
                        setMemberDetails( {memberMailId:'',
                                        memberName:'',
                                        memberPassword:'',
                                        adminMailId:admin.adminMailId
                        });
                        setMessage('');
                    });
        }
        }
    }

    return(
        <div>
            <h4 className="m-3 text-center">Add a New Member</h4><br/>

            <Form>
            <FormGroup row className="m-2">
                <Label for="memberMailId" sm={2}>Member Email-id</Label>
                <Col sm={10}>
                <Input type="email" value={memberDetails.memberMailId} id="memberMailId" required 
                    onChange={(e) => {  setMemberDetails({ ... memberDetails, memberMailId:e.target.value}) }}/>
                </Col>
            </FormGroup>
            <FormGroup row className="m-2">
                <Label for="memberName" sm={2}>Member Name</Label>
                <Col sm={10}>
                <Input type="text" value={memberDetails.memberName} id="memberName" required 
                    onChange={(e) => {  setMemberDetails({ ... memberDetails, memberName:e.target.value}) }}/>
                </Col>
            </FormGroup>
            <FormGroup row className="m-2">
                <Label for="memberPassword" sm={2}>Member Password</Label>
                <Col sm={10}>
                <Input type="password" value={memberDetails.memberPassword} id="memberPassword" required
                    onChange={(e) => {  setMemberDetails({ ... memberDetails, memberPassword: e.target.value})  }}/>
                </Col>
            </FormGroup>
            
            <FormGroup check row>
                <Col sm={{ size: 10, offset: 2 }}>
                <Button outline color="primary" onClick={add}>Add Member</Button>
                </Col>
            </FormGroup>
            </Form>

            <center style={{paddingTop:"1rem"}}>
                        {
                            message === '' ? <div></div> : <div class="alert alert-primary" role="alert" style={{width: 600}}>
                                {message}
                            </div>
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
    )
}

export default AddMember