import React,{useState, useEffect} from "react";
import { Button,Table } from "reactstrap";
import axios from "axios";

function ViewAllBooks(){

    const [bookList,setBookList]=useState([]);
    const [message,setMessage]=useState([]);
    const [error,setError]=useState('');

    useEffect(() => {
        axios.get(`http://localhost:8080/member/viewAllBooks`)
            .then(res => {
                setBookList(res.data);

                if(res.data.length===0){
                    setError('No books in the library !');
                    setMessage('');
                }else{
                    setError('');
                    setMessage('');
                }
            }).catch(err => {
                console.log(err);
                setError(err.response.data);
                setBookList([]);
                setMessage('');
            })
        },[bookList]);

        const removeBook = (book) =>{
        
            var proceed = window.confirm("All copies of the book will be removed. Do you want to proceed ?");
            if (proceed) {
                  axios.delete(`http://localhost:8080/admin/removeBook/${book.bookName}/${book.bookAuthor}`)
                .then(res => {
                    if(res.data===true){
                        setMessage('All copies of: '+book.bookName+' by '+book.bookAuthor+'!');
                        setError('');
                    }else{
                        setMessage('');
                        setError('Could not delete the book.');
                    }
                }).catch(err => {
                    console.log(err);
                    setError(err.response.data);
                    setMessage('');
                });
            }  
        }   

    return(
        <div>
            <h4 className="m-3 text-center">List of All Books</h4><br/>

            <center style={{paddingTop:"1rem"}}>
                    {
                        error === '' ? <div></div> : <div class="alert alert-danger" role="alert" style={{width: 600}}>
                            {error}
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
        
            <Table striped>
                <thead>
                    <tr>
                    <th>Book Name</th>
                    <th>Book Author</th>
                    <th>Category</th>
                    <th>Total Books</th>
                    <th>Available Books</th>
                    <th>Language</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {
                    bookList.map((book)=>{
                        return (
                            <tr>
                                <th scope="row">{book.bookName}</th>
                                <td>{book.bookAuthor}</td>
                                <td>{book.category}</td>
                                <td>{book.totalBooks}</td>
                                <td>{book.availableBooks}</td>
                                <td>{book.language}</td>
                                <td>
                                    <Button outline color="danger" onClick={()=> removeBook(book)}>Remove Book</Button>
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

export default ViewAllBooks