import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import axios from "axios";

//location.state.email
function MemberLandingPage(props){
    const history = useHistory();

    const [allBookList, setAllBookList] = useState([]);

    const location = useLocation();

    const [memberMail, setMemberMail] = useState(location.state.email);


    useEffect(() => {

        axios.get(`http://localhost:8080/member/viewAllBooks`)
            .then(res => {
                setAllBookList(res.data);
            })


    }, [allBookList])

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
            <center style={{padding:"2rem"}}>
                <figure>
                    <blockquote class="blockquote">
                        <p>Your are currently viewing entire library Catalouge</p>
                    </blockquote>
                    <figcaption class="blockquote-footer">
                        Just click on <cite title="Source Title">Request For Issue</cite> should you wish to issue that book.<br/>
                        If your issue request is accepted. It would be automatically visible inside your <cite title="Source Title">View Issues</cite> tab.
                    </figcaption>
                </figure>
                <center className="card-group" style={{justifyContent : "center"}}>
                    {allBookList.map((book, i) => {
                        return(
                            <div style={{"padding":"2rem"}}>
                                <div className="card-group">
                                    <div className="card mb-3">
                                        <div className="row g-0">
                                            <div className="col-md-8"  style={{"width":"20rem"}}>
                                            <div class="card-header">
                                                {book.bookName}
                                            </div>
                                                <div className="card-body">
                                                    <p className="card-text"><b>Genre : </b>{book.category}</p>
                                                    <p className="card-text"><b>Author : </b>{book.bookAuthor}</p>
                                                    <p className="card-text"><b>Language : </b>{book.language}</p>
                                                    <p class="card-text"><small class="text-muted"><b>{book.availableBooks}</b> Books Availavle</small></p>
                                                    <div style={{paddingTop : "0.5rem"}}>
                                                    {book.availableBooks !== 0 ? <button type="button" className="btn btn-outline-primary" onClick = { e => {
                                                    e.preventDefault();

                                                    axios.post(`http://localhost:8080/member/addIssueRequest/${memberMail}/${book.bookName}/${book.bookAuthor}`)
                                                        .then(res => {
                                                            if(res.data){
                                                                alert(`Your request to issue ${book.bookName} has been placed.`);
                                                            }
                                                        }).catch(err => alert(`Your request to issue ${book.bookName} has already been Submitted.`));

                                                }}>Request For Issue</button> : <button type="button" class="btn btn-outline-danger">No Book available</button>}
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
            </center>
        </div>
    );
}

export default MemberLandingPage;


{/* <table className="table table-bordered">
    <tr>
        <td><b>Author</b></td>
        <td>{book.bookAuthor}</td>
    </tr>
    <tr>
        <td><b>Language</b></td>
        <td>{book.language}</td>
    </tr>
</table> */}
