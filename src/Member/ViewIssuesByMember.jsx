import React, {useState, useEffect} from "react";
import { useHistory, useLocation } from "react-router";
import axios from "axios";

function ViewIssuesByMember(){

    const history = useHistory();
    const location = useLocation();

    const [memberMail, setMemberMail] = useState(location.state.email);

    const [penalty, setPenalty] = useState('0.0');

    const [issueList, setIssueList] = useState([]);
    const [requestIssueList, setRequestIssueList] = useState([]);

    const [error, setError] = useState('');

    const [errorReq, setErrorReq] = useState('');

    useEffect(() => {

        axios.get(`http://localhost:8080/member/viewIssues/${memberMail}`)
            .then(res => {
                setIssueList(res.data);
            }).catch(err => setError(err.response.data))
        
    }, [issueList, memberMail])


    const handleGetIssueList = (e) => {
        e.preventDefault();

        axios.get(`http://localhost:8080/member/viewIssues/${memberMail}`)
            .then(res => {
                setIssueList(res.data);
            }).catch(err => setError(err.response.data))
    };

    const handlePenalty = (e) => {
        e.preventDefault();

        axios.get(`http://localhost:8080/member/viewTotalPenalty/${memberMail}`)
            .then(res => {
                setPenalty(res.data);
            }).catch(err => setErrorReq(err.response.data))
    };


    return(
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand">LMS</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="/" onClick={e => {
                            e.preventDefault();
                            history.push({
                                pathname : "/memberLandingPage",
                                state : {email : memberMail }
                            });
                        }}>View All Books</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link active" href="/" onClick={e => {
                            e.preventDefault();
                            history.push({
                                pathname : "/searchBooksBy",
                                state : {email : memberMail }
                            })
                        }}>Search Books</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link active" href="/" onClick = { e => {
                            e.preventDefault();
                            history.push({
                                pathname : "/viewIssuesByMember",
                                state : {email : memberMail }
                            });

                        }}>View Issues</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link active" href="/" onClick = { e => {
                            e.preventDefault();
                            history.push({
                                pathname : "/viewAndSubmitRequest",
                                state : {email : memberMail}
                            });
                        }}>Request Book</a>
                        </li>
                    </ul>
                    <form className="d-flex">
                        <label className="nav-link" style={{color : "grey"}}>Hello, {memberMail}</label>
                        <button className="btn btn-outline-danger" type="submit" onClick={ e => {
                            e.preventDefault();
                            history.push("/member")
                        }}>Logout</button>
                    </form>
                    </div>
                </div>
            </nav>
            <center style={{"paddingTop":"2rem"}}>
                <figure>
                    <figcaption class="blockquote-footer">
                        Your issues are listed down below. Your penalties would be updated here itself.<br/>
                        After settling the imposed penalties, please click on <cite title="Source Title">Display Penalty</cite> to view updated penalty.<br/>
                        <p class="link-warning">Please contact your admin for issues regarding penalties</p>
                    </figcaption>
                </figure>
            </center>
            <div style={{"padding" : "2rem"}}>
                <ul class="list-group list-group-horizontal-xxl">
                <li class="list-group-item d-flex justify-content-between align-items-start">
                    <div class="ms-2 me-auto">
                    <div class="fw-bold">Your Pending Fine</div>
                        <p class="fst-normal">{` Rs. ${penalty} is the amount to be paid.`}</p>
                    </div>
                    <span><button type="button" class="btn btn-outline-danger" onClick={handlePenalty}>Display Penalty</button></span>
                </li>
                </ul>
                <center><h1 class="display-6" style={{paddingTop : "2rem"}}>Your Issues</h1></center>
                <center className="card-group" style={{"justifyContent" : "center"}}>
                {issueList.length !== 0 ? issueList.map((issue, i) => {
                    return(
                        <div style={{"padding":"2rem"}}>
                            <div className="card-group">
                                <div className="card mb-3">
                                    <div className="row g-0">
                                        <div className="col-md-8" style={{"width":"20rem"}}>
                                        <div class="card-header">
                                            <b>Book Name: </b>{issue.bookName}
                                        </div>
                                            <div className="card-body">
                                                <p className="card-text"><b>Author : </b>{issue.bookAuthor}</p>
                                                <p className="card-text"><b>Issue Date : </b>{issue.dateOfIssue}</p>
                                                <p className="card-text"><b>Return Date : </b>{issue.dateOfReturn}</p>
                                                <p className="card-text"><b>Return Status : </b>{issue.returnedOn === null || issue.returnedOn === '' ? <p class="text-danger"><b>Not Returned</b></p> : <p class="text-success"><b>Returned</b></p>}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                }) : <center class="alert alert-primary d-flex align-items-center" role="alert" style={{"width" : "50%", "justifyContent" : "center"}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                        </svg>
                        <center>
                            <center>You currently have no issues! Please Issue a book for it to be displayed Here!</center>
                        </center>
                        </center>}
            </center>
            </div>
        </div>
    );

}

export default ViewIssuesByMember;