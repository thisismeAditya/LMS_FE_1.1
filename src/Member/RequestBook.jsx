import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import axios from "axios";

function RequestBook(){
    const history = useHistory();
    const location = useLocation();
    const [memberMail, setMemberMail] = useState(location.state.email);

    const [bookName, setBookName] = useState('');
    const [bookAuthor, setBookAuthor] = useState('');

    const [requestedBookList, setRequestedBookList] = useState([]);

    const [error, setError] = useState('');

    useEffect(() => {

        axios.get(`http://localhost:8080/member/viewRequests/${memberMail}`)
            .then(res => {
                setRequestedBookList(res.data);
                setError('');
            }).catch(err => setError(err.response.data));


    }, [requestedBookList, memberMail, error])

    const handleRequest = (e) => {
        e.preventDefault();

        if(bookName.length === 0 || bookAuthor.length===0 || bookName === undefined || bookAuthor === undefined){

            alert("Both Book Name and Book Author is required to Submit a Request!");

        }else{

            axios.post(`http://localhost:8080/member/addRequestBook/${memberMail}/${bookName}/${bookAuthor}`)
                .then(res => {
                    if(res.data){
                        alert(`Your request for ${bookName} by ${bookAuthor} has been placed.`);
                    }
                    axios.get(`http://localhost:8080/member/viewRequests/${memberMail}`)
                        .then(res => {
                            setRequestedBookList(res.data);
                            setError('');
                        }).catch(err => setError(err.response.data));
                }).catch(err => alert(err.response.data));
        }

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
            <div style={{justifyContent : "center", "padding" : "1.5rem"}}>
                <center><h1 className="text-muted">Request a Book</h1></center>
                <center style={{"padding" : "2rem"}}><figure>
                    <figcaption class="blockquote-footer">
                        Didn't find the book you were searching for? Request that book to your admin from here, for it to be added in the library.<br/>
                        Start of by giving the <cite title="Source Title"><b>Book Name</b></cite> and <cite title="Source Title"><b>Book Author</b></cite> in the form below, and click on <cite title="Source Title">Submit Request</cite>.<br/>
                    </figcaption>
                </figure></center>
                <div className="input-group mb-3" style={{"paddingTop" : "2rem"}}>
                    <span class="input-group-text">Enter Book Name</span>
                    <input type="text" className="form-control" placeholder="Book Name" aria-label="bookName" value={bookName} onChange={ e => setBookName(e.target.value)}/>
                    <span class="input-group-text">Enter Author Name</span>
                    <input type="text" className="form-control" placeholder="Book Author" aria-label="bookAuthor" value={bookAuthor} onChange = { e => setBookAuthor(e.target.value)}/>
                    <button class="btn btn-outline-secondary" type="button" id="button-addon2" onClick = {handleRequest}>Submit Request</button>
                </div>
            </div>
            <center style={{justifyContent : "center", "padding" : "1.5rem"}}>
                {error !== '' ? <center class="alert alert-primary d-flex align-items-center" role="alert" style={{"width" : "50%", "justifyContent" : "center"}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                        </svg>
                        <center>
                            <center>You have not requested for any book yet.</center>
                        </center>
                        </center> : <center className="card-group" style={{"justifyContent" : "center"}}>
                            {requestedBookList.map((book, i) => {
                                return(
                                    <div style={{"padding":"2rem"}}>
                                        <div className="card-group">
                                            <div className="card mb-3">
                                                <div className="row g-0">
                                                    <div className="col-md-8" style={{"width":"20rem"}}>
                                                    <div class="card-header">
                                                        <b>Book Name: </b>{book.bookName}
                                                    </div>
                                                        <div className="card-body">
                                                            <p className="card-text"><b>Author : </b>{book.bookAuthor}</p>
                                                            <p className="card-text"><button type="button" class="btn btn-outline-danger" onClick = { e => {
                                                                e.preventDefault();

                                                                axios.delete(`http://localhost:8080/member/removeRequest/${memberMail}/${book.bookName}/${book.bookAuthor}`)
                                                                    .then(res => {
                                                                        alert("Book Was removed from Request!");
                                                                        setError('');
                                                                        axios.get(`http://localhost:8080/member/viewRequests/${memberMail}`)
                                                                            .then(res => {
                                                                                setRequestedBookList(res.data);
                                                                                setError('');
                                                                            }).catch(err => setError(err.response.data));
                                                                })

                                                            }}>Remove Requested</button></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </center>
                }
            </center>
            
        </div>
    );

}

export default RequestBook;

