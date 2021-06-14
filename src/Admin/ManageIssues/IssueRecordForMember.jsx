import React from "react";
import {Container,Col,Row, Button, NavItem} from "reactstrap";
import axios from "axios";

function IssueRecordForMember({issue}){

    const closeIssue= (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8080/admin/closeIssue/${issue.issueId}`)
        .then( response => {
                console.log(response.data);
            }).catch( (err) =>{
                alert(err.response.data);
            });
    }

    const renewIssue= (e) => {
        e.preventDefault();

        axios.get(`http://localhost:8080/admin/renewIssue/${issue.issueId}`)
            .then(response => {
                console.log(response.data);
            }).catch(err => {
                console.log(err);
                alert(err.response.data);
            })
        };
    

    const settlePenalty= (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8080/admin/settlePenalties/${issue.memberMailId}/${issue.issueId}`)
        .then( response => {
                console.log(response.data);
            }).catch( (err) =>{
                alert(err.response.data);
            });
    }
    
    return(
        <div>
            <div className="card m-3">
                <div className="card-header" >
                    <Container>
                        <Row>
                            <Col xs="6"><b>Issue Id: </b>{issue.issueId}</Col>
                            <Col xs="6"><b>Member Id: </b>{issue.memberMailId}</Col>
                        </Row>
                    </Container>
                </div>
                <div class="card-body ">
                    <Row>
                        <Col xs="6" sm="4" >
                            <Row className="m-1">Book Name: {issue.bookName}</Row>
                            <Row className="m-1">Book Author:{issue.bookAuthor}</Row>
                            
                        </Col>
                        <Col xs="6" sm="4">
                            <Row className="m-1">Date Of Issue: {issue.dateOfIssue}</Row>
                            <Row className="m-1">Date Of Return: {issue.dateOfReturn}</Row>
                            <Row className="m-1">Returned on: {issue.returnedOn}</Row>
                          
                        </Col>
                        <Col sm="4">
                            <Row className="m-1">Penalty: {issue.penalty}</Row>
                        </Col>
                    </Row>
                </div>
                <div class="card-footer">
                    <Row>
                        <Col xs="6" sm="4" >
                            {  issue.returnedOn===null? <Button outline color="primary" onClick={closeIssue}>Close Issue</Button>:<div></div>  }</Col>
                        <Col xs="6" sm="4">
                            {  issue.returnedOn===null? <Button outline color="primary" onClick={renewIssue}>Renew Issue</Button>:<div></div>  }</Col>
                        <Col sm="4">
                            {  issue.penalty!==0? <Button outline color="primary" onClick={settlePenalty}>Settle Penalty</Button>:<div></div>  }</Col>
                    </Row>            
                </div>
            </div>
        </div>
    );
}
export default IssueRecordForMember