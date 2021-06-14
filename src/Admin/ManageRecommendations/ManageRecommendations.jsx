import React,{useState,useEffect} from "react";
import axios from "axios";
import {Form,Input,Button,Table, Container,Col,Row} from "reactstrap";

function ManageRecommendations(){

    const [requestsList,setRequestsList]=useState([]);
    const [error,setError]=useState('');
    const [message,setMessage]=useState('');

    useEffect(() => {
        axios.get(`http://localhost:8080/admin/viewRequest`)
            .then(res => {
                setRequestsList(res.data);

                if(res.data.length===0){
                    setError('');
                    setMessage('No Request to show !');
                }else{
                    setMessage('');
                    setError('');
                }
            }).catch(err => {
                console.log(err);
                setMessage('');
                setError(err.response.data);
                setRequestsList([]);
            })
    },[requestsList]);

    const removeRequest=(book)=> {

        var proceed = window.confirm("All requests made for the book will be removed. Do you want to proceed ?");
        axios.delete(`http://localhost:8080/admin/removeRequest/${book.bookName}/${book.bookAuthor}`)
            .then(res=> {
                if(res.data===true)
                {
                    setMessage('All requests for: '+book.bookName+' by '+book.bookAuthor+' removed successfully!');
                    setError('');
                }
                else{
                    setMessage('');
                    setError('Request could not be deleted.');
                }
            }).catch(err => {
                console.log(err);
                setMessage('');
                setError(err.response.data);
            })
    }


    return(
        <div>
            <h3 className="m-3 text-center">Manage Recommendations</h3><br/>
            <h4 className="mt-1 text-center">List of All Requests made by Members</h4><br/>
            
            <center style={{paddingTop:"1rem"}}>
                    {
                        error === '' ? <></> : <div class="alert alert-danger" role="alert" style={{width: 600}}>
                            {error}
                        </div>
                    }
            </center>
            <center style={{paddingTop:"1rem"}}>
                    {
                        message === '' ? <></> : <div class="alert alert-primary" role="alert" style={{width: 600}}>
                            {message}
                        </div>
                    }
            </center>
           
            <Table striped>
                <thead>
                    <tr>
                    <th>Member Email-Id (Requester)</th>
                    <th>Book Name</th>
                    <th>Book Author</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {
                    requestsList.map((book)=>{
                        return (
                            <tr>
                                <td>{book.requesterMailId}</td>
                                <td >{book.bookName}</td>
                                <td>{book.bookAuthor}</td>
                                <td>
                                    <Button outline color="danger" onClick={()=> removeRequest(book)}>Remove Request</Button>
                                </td>
                            </tr>
                        );
                    })
                }
                </tbody>
        </Table>

        </div>
    );
}

export default ManageRecommendations