import React,{useState} from "react";
import { Col, Button, Form, Input,  Container, Row} from 'reactstrap';
import axios from "axios";

function RemoveMember(){

    const [memberMailId,setMemberMailId]=useState('');
    const [error,setError]=useState('');
    const [message,setMessage]=useState('');
    const [memberDetails,setMemberDetails]=useState({
        memberMailId:'',
        memberName:'',
        memberPassword:'',
        adminMailId:''
    });

    const showMember = (e) => {
        e.preventDefault();
        if(memberMailId===''){
            setError('Email-id field cannot be empty !');
            setMessage('');
        }else{

        axios.get(`http://localhost:8080/admin/getMember/${memberMailId}`)
            .then(res => {
                console.log(res.data)
                setMemberDetails( {memberMailId: res.data.memberMailId,
                memberName: res.data.memberName,
                memberPassword: res.data.memberPassword,
                adminMailId: res.data.adminMailId
                });
                setError('');
                setMessage('');
                
            }).catch(err => {
                console.log(err);
                setError(err.response.data);
                setMemberDetails( {
                    memberMailId:'',
                    memberName:'',
                    memberPassword:'',
                    adminMailId: ''
                });
                setMessage('');
            });
        }
        
    }

    const remove = (e) => {
        e.preventDefault();

            console.log(memberDetails);

            if(memberDetails.memberMailId !==''){
                axios.delete(`http://localhost:8080/admin/deleteMember/${memberDetails.memberMailId}`)
                    .then(res => {
                        if(res.data===true)
                        setMemberDetails( {
                            memberMailId:'',
                            memberName:'',
                            memberPassword:'',
                            adminMailId: ''
                        });
                        setError('');
                        setMessage('Member with Email-id: '+memberDetails.memberMailId+' removed from system.');
                        
                    }).catch(err => {
                                    console.log(err);
                                    setError(err.response.data);
                                    setMemberDetails( {
                                        memberMailId:'',
                                        memberName:'',
                                        memberPassword:'',
                                        adminMailId: ''
                                    });
                                    setMessage('');
                                });
                    }
        
    }

    return(
        <div>
            <h4 className="m-3 text-center">Remove Member</h4><br/>

            <Container>
            <Row>
                <Col>
                    <center>
                        <Form className="m-3 ">
                            <Input type="email" className="m-2" style={{width: 300}} value={memberMailId}  placeholder="Enter Member's Email-id" className="form-control" 
                                onChange={ (e) => {setMemberMailId(e.target.value)}} />
                            <Button outline type="Submit" color="primary" className="btn m-2" 
                                onClick={ showMember }>Remove Member</Button>    
                        </Form>
                    </center>
                </Col>
            </Row>
            </Container>
            <center style={{paddingTop:"1rem"}}>
                    {
                        error === '' ? <div></div> : <div class="alert alert-danger" role="alert" style={{width: 600}}>
                            {error}
                        </div>
                    }
            </center>
            <center style={{paddingTop:"1rem"}}>
                    {
                        (memberDetails.memberMailId === '') ? <div></div> : <div role="alert" style={{width: 600}}>
                            <Container  >
                                <Row>
                                    <Col><b>Member Email-id</b></Col>
                                    <Col>{memberDetails.memberMailId}</Col>
                                </Row>
                                <Row>
                                    <Col><b>Member Name</b></Col>
                                    <Col>{memberDetails.memberName}</Col>
                                </Row>
                                <Row>
                                    <Col><b>Admin Email-id who registered</b></Col>
                                    <Col>{memberDetails.adminMailId}</Col>
                                </Row>
                                <Row>
                                    <center>
                                    <Button outline color="danger" onClick={remove} className="m-2" style={{width: 200}} >Cofirm Remove Member</Button>
                                    </center>
                                </Row>
                            </Container>
                        </div>
                    }
            </center>
            <center style={{paddingTop:"1rem"}}>
                    {
                        message === '' ? <div></div> : <div class="alert alert-primary" role="alert" style={{width: 600}}>
                            {message}
                        </div>
                    }
            </center>
        </div>
    )
}

export default RemoveMember