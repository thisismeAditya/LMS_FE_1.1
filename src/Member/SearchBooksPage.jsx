import React, { useState } from "react";
import { useHistory, useLocation } from "react-router";
import axios from "axios";

function SearchBookBy(){
    const [content, setContent] = useState(undefined);
    const [searchBy, setSearchBy] = useState('Name');

    const [allBookList, setAllBookList] = useState([]);

    const [error, setError] = useState('');

    const location = useLocation();
    const [memberMail, setMemberMail] = useState(location.state.email);

    const handleClick = (e) => {
        e.preventDefault();

        if(content === undefined || content.size === 0){
            setError(`Search Book By ${searchBy} cannot be EMPTY!`);
        }else{
            if(content == null || content === undefined || content.size === 0){
                alert("Please Enter a Valid Feild Value");
            }else{
                axios.get(`http://localhost:8080/member/searchBy${searchBy}/${content}`)
                    .then(res => {
                        try{
                            if(res.data === undefined){
                                alert("Please Enter a Valid Feild Value")
                            }else{
                                setAllBookList(res.data);
                            }
                            setError('');
                            setContent(undefined);
                        }catch(e){
                            setError("Please Try again!");
                        }
                    }).catch(err => {
                        err.response.data === undefined || content === undefined || content === ''? setError("Cannot be Empty") : setError(err.response.data);
                        setAllBookList([]);
                        setContent(undefined)
                    })
            }
        }

        setContent('');
    };

    const history = useHistory();
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
            <center><h1 className="text-muted">Search Books By</h1></center>
            <center style={{"padding":"2rem"}}>
                <figure>
                    <figcaption class="blockquote-footer">
                        Search books by <cite title="Source Title"><b>Name</b></cite>, <cite title="Source Title"><b>Author</b></cite> and <cite title="Source Title"><b>Genre</b></cite> by clicking on the drop-down below.<br/>
                        You can request to issue a book here itself.<br/>
                        If your issue request is accepted. It would be automatically visible inside your <cite title="Source Title">View Issues</cite> tab.
                    </figcaption>
                </figure>
            </center>
            <div class="input-group mb-3" style={{padding : "1rem", justifyContent:"center"}}>
                <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">{`Book by ${searchBy}`}</button>
                <ul class="dropdown-menu">
                    <li><a className="dropdown-item" href="/" onClick= { e => {
                        e.preventDefault();
                        setSearchBy('Name');
                    } }>Book Name</a></li>
                    <li><a className="dropdown-item" href="/" onClick= { e => {
                        e.preventDefault();
                        setSearchBy('Author');
                    } }>Book Author</a></li>
                    <li><a className="dropdown-item" href="/" onClick= { e => {
                        e.preventDefault();
                        setSearchBy('Category');
                    } }>Book Category (Genre)</a></li>
                </ul>
                <input type="text" class="form-control" id="validationCustom01" value={content} onChange= { e=> {
                    e.target.value !== undefined || e.target.value !== null ? setContent(e.target.value) : setError("Cannot be Empty")
                }} required/>
                {content !== undefined ? <button class="btn btn-outline-secondary" type="button" onClick = {handleClick}>Search</button> : <button class="btn btn-outline-secondary" type="button">Search</button>}
                </div>
            </div>
            <center className="card-group" style={{"justifyContent" : "center"}}>
                {allBookList.map((book, i) => {
                    return(
                        <div style={{"padding":"2rem"}}>
                            <div className="card-group">
                                <div className="card mb-3">
                                    <div className="row g-0">
                                        <div className="col-md-8" style={{"width":"20rem"}}>
                                        <div class="card-header">
                                            {book.bookName}
                                        </div>
                                            <div className="card-body">
                                                <p className="card-text"><b>Genre : </b>{book.category}</p>
                                                <p className="card-text"><b>Author : </b>{book.bookAuthor}</p>
                                                <p className="card-text"><b>Language : </b>{book.language}</p>
                                                <p class="card-text"><small class="text-muted"><b>{book.availableBooks}</b> Books Available</small></p>
                                                <div style={{paddingTop : "0.5rem"}}>
                                                    {book.availableBooks !== 0 ? <button type="button" className="btn btn-outline-primary" onClick = { e => {
                                                    e.preventDefault();

                                                    axios.post(`http://localhost:8080/member/addIssueRequest/${memberMail}/${book.bookName}/${book.bookAuthor}`)
                                                        .then(res => {
                                                            if(res.data){
                                                                alert(`Your request to issue ${book.bookName} has been placed.`);
                                                                console.log(book.bookAuthor);
                                                            }
                                                        }).catch(err => alert(`Your request to issue ${book.bookName} has already been Submitted.`));

                                                }}>Request For Issue</button> : <button type="button" class="btn btn-outline-danger">No Books available</button>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </center>
            <center style={{paddingTop:"1rem"}}>
                    {
                        error === '' ? <div></div> : <div class="alert alert-danger" role="alert" style={{width: "50%"}}>
                            {error}
                        </div>
                    }
            </center>
        </div>
    );
}

export default SearchBookBy;



